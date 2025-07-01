import type {Command} from '@event-driven-io/emmett'
import {CommandHandler} from '@event-driven-io/emmett';
import {CartEvents} from "@/app/events/CartEvents";
import {findEventstore} from "@/app/common/loadPostgresEventstore";


export type SubmitCartCommand = Command<'SubmitCart', {
    aggregateId: string,
    orderedProducts: Array<any>,
}>;

export type SubmitCartState = {
    cartExists?: boolean;
    cartSubmitted?: boolean;
    hasItems?: boolean;
    addedItems?: Array<{itemId: string, productId: string, price: number, description: string, image: string}>;
    inventory?: Record<string, number>; // productId -> inventory count
}

export const SubmitCartInitialState = (): SubmitCartState => ({});

export const evolve = (
    state: SubmitCartState,
    event: CartEvents,
): SubmitCartState => {
    const {type, data} = event;

    switch (type) {
        case "CartCreated":
            return {
                ...state,
                cartExists: true
            };

        case "CartSubmitted":
            return {
                ...state,
                cartSubmitted: true
            };

        case "ItemAdded":
            return {
                ...state,
                hasItems: true,
                addedItems: [
                    ...(state.addedItems || []),
                    {
                        itemId: data.itemId,
                        productId: data.productId,
                        price: data.price,
                        description: data.description,
                        image: data.image
                    }
                ]
            };

        case "ItemRemoved":
            return {
                ...state,
                addedItems: (state.addedItems || []).filter(item => item.itemId !== data.itemId),
                hasItems: (state.addedItems || []).filter(item => item.itemId !== data.itemId).length > 0
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
    command: SubmitCartCommand,
    state: SubmitCartState,
): CartEvents[] => {
    // Spec 1: Cannot submit cart twice
    if (state.cartSubmitted) {
        throw new Error("Cart has already been submitted");
    }

    // Spec 3: Submit empty cart - error case
    if (!state.hasItems || (state.addedItems || []).length === 0) {
        throw new Error("Cannot submit empty cart");
    }

    // Spec 2: Submit cart without quantity (zero inventory)
    // Check if any products in the cart have zero inventory
    const itemsWithZeroInventory = (state.addedItems || []).filter(item =>
        state.inventory?.[item.productId] === 0
    );

    if (itemsWithZeroInventory.length > 0) {
        throw new Error(`Cannot submit cart: products with zero inventory found: ${itemsWithZeroInventory.map(item => item.productId).join(', ')}`);
    }

    // Spec 4: Submit cart - success case
    return [{
        type: "CartSubmitted",
        data: {
            aggregateId: command.data.aggregateId,
            orderedProducts: command.data.orderedProducts,
            totalPrice: command.data.orderedProducts.reduce((acc, item) => acc + item.price, 0)
        }
    }];
};

const SubmitCartCommandHandler = CommandHandler<SubmitCartState, CartEvents>({
    evolve,
    initialState: SubmitCartInitialState
});

export const handleSubmitCart = async (id: string, command: SubmitCartCommand) => {
    const eventStore = await findEventstore()
    await SubmitCartCommandHandler(eventStore, id, (state: SubmitCartState) => decide(command, state))
}