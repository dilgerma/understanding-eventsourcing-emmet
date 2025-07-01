import type {Command} from '@event-driven-io/emmett'
import {CommandHandler} from '@event-driven-io/emmett';
import {CartEvents} from "@/app/events/CartEvents";
import {findEventstore} from "@/app/common/loadPostgresEventstore";


export type RemoveItemCommand = Command<'RemoveItem', {
    aggregateId: string,
    itemId: string,
}>;

export type RemoveItemState = {
    cartExists?: boolean;
    addedItems?: Set<string>; // itemIds that have been added
    removedItems?: Set<string>; // itemIds that have been removed
}

export const RemoveItemInitialState = (): RemoveItemState => ({});

export const evolve = (
    state: RemoveItemState,
    event: CartEvents,
): RemoveItemState => {
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
                addedItems: new Set([...(state.addedItems || []), data.itemId])
            };

        case "ItemRemoved":
            return {
                ...state,
                removedItems: new Set([...(state.removedItems || []), data.itemId])
            };

        default:
            return state;
    }
};

export const decide = (
    command: RemoveItemCommand,
    state: RemoveItemState,
): CartEvents[] => {
    const { itemId } = command.data;

    // Check if item was already removed
    if (state.removedItems?.has(itemId)) {
        throw new Error(`Item ${itemId} has already been removed`);
    }

    // Check if item was actually added to the cart
    if (!state.addedItems?.has(itemId)) {
        throw new Error(`Item ${itemId} was never added to the cart`);
    }

    // Item exists and hasn't been removed - proceed with removal
    return [{
        type: "ItemRemoved",
        data: {
            aggregateId: command.data.aggregateId,
            itemId: command.data.itemId
        }
    }];
};

const RemoveItemCommandHandler = CommandHandler<RemoveItemState, CartEvents>({
    evolve,
    initialState: RemoveItemInitialState
});

export const handleRemoveItem = async (id: string, command: RemoveItemCommand) => {
    const eventStore = await findEventstore()
    await RemoveItemCommandHandler(eventStore, id, (state: RemoveItemState) => decide(command, state))
}