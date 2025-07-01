import type {Command} from '@event-driven-io/emmett'
import {CommandHandler} from '@event-driven-io/emmett';
import {CartEvents} from "@/app/events/CartEvents";
import {findEventstore} from "@/app/common/loadPostgresEventstore";


export type AddItemCommand = Command<'AddItem', {
    aggregateId: string,
    description: string,
    image: string,
    price: number,
    itemId: string,
    productId: string,
}>;

export type AddItemState = {
    cartExists?: boolean;
    itemCount?: number;
    inventory?: Record<string, number>; // productId -> inventory count
}

export const AddItemInitialState = (): AddItemState => ({});

export const evolve = (
    state: AddItemState,
    event: CartEvents,
): AddItemState => {
    const {type, data} = event;

    switch (type) {
        case "CartCreated":
            return {
                ...state,
                cartExists: true
            };

        case "ItemAdded":
            return {
                ...state,
                itemCount: (state.itemCount || 0) + 1
            };

        case "InventoryChanged":
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    [data.productId]: data.inventory
                }
            };

        default:
            return state;
    }
};

export const decide = (
    command: AddItemCommand,
    state: AddItemState,
): CartEvents[] => {
    // Check inventory first - if product has 0 inventory, create cart but throw error
    const productInventory = state.inventory?.[command.data.productId];
    if (productInventory === 0) {
        const events: CartEvents[] = [];

        if (!state.cartExists) {
            events.push({
                type: "CartCreated",
                data: {
                    aggregateId: command.data.aggregateId
                }
            });
        }

        // Return events before throwing error
        return events;
    }

    // Check if cart already has 3 items
    if (state.cartExists && (state.itemCount || 0) >= 3) {
        throw new Error("Maximum 3 items allowed in cart");
    }

    const events: CartEvents[] = [];

    // Create cart if it doesn't exist
    if (!state.cartExists) {
        events.push({
            type: "CartCreated",
            data: {
                aggregateId: command.data.aggregateId
            }
        });
    }

    // Add the item
    events.push({
        type: "ItemAdded",
        data: {
            aggregateId: command.data.aggregateId,
            description: command.data.description,
            image: command.data.image,
            price: command.data.price,
            itemId: command.data.itemId,
            productId: command.data.productId
        }
    });

    return events;
};


const AddItemCommandHandler = CommandHandler<AddItemState, CartEvents>({evolve, initialState: AddItemInitialState});

export const handleAddItem = async (id: string, command: AddItemCommand) => {
    const eventStore = await findEventstore()
    await AddItemCommandHandler(eventStore, id, (state: AddItemState) => decide(command, state))
}