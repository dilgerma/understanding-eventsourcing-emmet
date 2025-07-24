import type {Command} from '@event-driven-io/emmett'
import {CommandHandler} from '@event-driven-io/emmett';
import {CartEvents} from "../../events/CartEvents";
import {findEventstore} from "../../common/loadPostgresEventstore";

export type RemoveItemCommand = Command<'RemoveItem', {
    aggregateId: string,
    itemId: string,
    productId: string,
}>;

export type RemoveItemState = {
    items?: string[];
}

export const RemoveItemInitialState = (): RemoveItemState => ({
    items: []
});

export const evolve = (
    state: RemoveItemState,
    event: CartEvents,
): RemoveItemState => {
    const {type, data} = event;

    switch (type) {
        case "ItemAdded":
            return {
                ...state,
                items: [...(state.items ?? []), data.itemId]
            };
        case "ItemRemoved":
            return {
                ...state,
                items: (state.items ?? []).filter(itemId => itemId !== data.itemId)
            };
        case "CartCleared":
            return {
                ...state,
                items: []
            };
        default:
            return state;
    }
};

export const decide = (
    command: RemoveItemCommand,
    state: RemoveItemState,
): CartEvents[] => {
    const items = state.items ?? [];
    
    if (!items.includes(command.data.itemId)) {
        throw new Error("Cannot remove item that doesn't exist in cart");
    }
    
    return [{
        type: "ItemRemoved",
        data: {
            aggregateId: command.data.aggregateId,
            itemId: command.data.itemId,
            productId: command.data.productId
        }
    }]
};


const RemoveItemCommandHandler = CommandHandler<RemoveItemState, CartEvents>({
    evolve,
    initialState: RemoveItemInitialState
});

export const handleRemoveItem = async (id: string, command: RemoveItemCommand) => {
    const eventStore = await findEventstore()
    await RemoveItemCommandHandler(eventStore, id, (state: RemoveItemState) => decide(command, state))

}

