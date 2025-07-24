import type {Command} from '@event-driven-io/emmett'
import {CommandHandler} from '@event-driven-io/emmett';
import {CartEvents} from "../../events/CartEvents";
import {findEventstore} from "../../common/loadPostgresEventstore";

export type SubmitCartCommand = Command<'SubmitCart', {
    aggregateId: string,
}>;

export type SubmitCartState = {
    inventory?: Map<string, number>;
    items?: Array<{productId: string; itemId: string}>;
}

export const SubmitCartInitialState = (): SubmitCartState => ({
    items: []
});

export const evolve = (
    state: SubmitCartState,
    event: CartEvents,
): SubmitCartState => {
    const {type, data} = event;

    switch (type) {

        case "ItemAdded":
            return {
                ...state,
                items: [...(state.items ?? []), {productId: data.productId, itemId: data.itemId}]
            };
        case "ItemRemoved":
            return {
                ...state,
                items: (state.items ?? []).filter(item => item.itemId !== data.itemId)
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
    command: SubmitCartCommand,
    state: SubmitCartState,
): CartEvents[] => {
    const inventory = state.inventory ?? new Map();
    const items = state.items ?? [];
    
    return [{
        type: "CartSubmitted",
        data: {
            aggregateId: command.data.aggregateId
        }
    }]
};


const SubmitCartCommandHandler = CommandHandler<SubmitCartState, CartEvents>({
    evolve,
    initialState: SubmitCartInitialState
});

export const handleSubmitCart = async (id: string, command: SubmitCartCommand) => {
    const eventStore = await findEventstore()
    await SubmitCartCommandHandler(eventStore, id, (state: SubmitCartState) => decide(command, state))

}

