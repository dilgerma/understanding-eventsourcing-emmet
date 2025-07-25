import type {Command} from '@event-driven-io/emmett'
import {CommandHandler} from '@event-driven-io/emmett';
import {CartEvents} from "../../events/CartEvents";
import {findEventstore} from "../../common/loadPostgresEventstore";

export type AddItemCommand = Command<'AddItem', {
    aggregateId: string,
    description: string,
    price: number,
    itemId: string,
    name: string,
    productId: string,
}>;

export type AddItemState = {
    itemCount?: number;
}

export const AddItemInitialState = (): AddItemState => ({
    itemCount: 0
});

export const evolve = (
    state: AddItemState,
    event: CartEvents,
): AddItemState => {
    const {type, data} = event;

    switch (type) {
        case "ItemAdded":
            return {
                ...state,
                itemCount: (state.itemCount ?? 0) + 1
            };
        case "ItemRemoved":
            return {
                ...state,
                itemCount: Math.max(0, (state.itemCount ?? 0) - 1)
            };
        case "CartCleared":
            return {
                ...state,
                itemCount: 0
            };
        default:
            return state;
    }
};

export const decide = (
    command: AddItemCommand,
    state: AddItemState,
): CartEvents[] => {
    if ((state.itemCount ?? 0) >= 3) {
        throw new Error("Cannot add more than 3 items to the cart");
    }
    
    return [{
        type: "ItemAdded",
        data: {
            aggregateId: command.data.aggregateId,
            description: command.data.description,
            itemId: command.data.itemId,
            name: command.data.name,
            price: command.data.price,
            productId: command.data.productId
        },metadata:{
            correlationId:"1",
            tenant: "mueller"
        }
    }]
};


const AddItemCommandHandler = CommandHandler<AddItemState, CartEvents>({evolve, initialState: AddItemInitialState});

export const handleAddItem = async (id: string, command: AddItemCommand) => {
    const eventStore = await findEventstore()
    await AddItemCommandHandler(eventStore, id, (state: AddItemState) => decide(command, state))

}

