import type {Command} from '@event-driven-io/emmett'
import {CommandHandler} from '@event-driven-io/emmett';
import {CartEvents} from "../../events/CartEvents";
import {findEventstore} from "../../common/loadPostgresEventstore";

export type ClearCartCommand = Command<'ClearCart', {
    aggregateId: string,
}>;

export type ClearCartState = {}

export const ClearCartInitialState = (): ClearCartState => ({});

export const evolve = (
    state: ClearCartState,
    event: CartEvents,
): ClearCartState => {
    const {type, data} = event;

    switch (type) {
        case "CartCleared":
            return {...state};
        default:
            return state;
    }
};

export const decide = (
    command: ClearCartCommand,
    state: ClearCartState,
): CartEvents[] => {
    return [{
        type: "CartCleared",
        data: {
            aggregateId: command.data.aggregateId
        }
    }]
};


const ClearCartCommandHandler = CommandHandler<ClearCartState, CartEvents>({
    evolve,
    initialState: ClearCartInitialState
});

export const handleClearCart = async (id: string, command: ClearCartCommand) => {
    const eventStore = await findEventstore()
    await ClearCartCommandHandler(eventStore, id, (state: ClearCartState) => decide(command, state))

}

