import type {Command} from '@event-driven-io/emmett'
import {CommandHandler} from '@event-driven-io/emmett';
import {CartEvents} from "@/app/events/CartEvents";
import {findEventstore} from "@/app/common/loadPostgresEventstore";


export type ChangePriceCommand = Command<'ChangePrice', {
    newPrice: number,
    oldPrice: number,
    productId: string,
}>;

export type ChangePriceState = {
    prices?: Record<string, number>; // productId -> current price
}

export const ChangePriceInitialState = (): ChangePriceState => ({});

export const evolve = (
    state: ChangePriceState,
    event: CartEvents,
): ChangePriceState => {
    const {type, data} = event;

    switch (type) {
        case "PriceChanged":
            return {
                ...state,
                prices: {
                    ...state.prices,
                    [data.productId]: data.newPrice
                }
            };
        default:
            return state;
    }
};

export const decide = (
    command: ChangePriceCommand,
    state: ChangePriceState,
): CartEvents[] => {
    return [{
        type: "PriceChanged",
        data: {
            newPrice: command.data.newPrice,
            oldPrice: command.data.oldPrice,
            productId: command.data.productId
        }
    }];
};

const ChangePriceCommandHandler = CommandHandler<ChangePriceState, CartEvents>({
    evolve,
    initialState: ChangePriceInitialState
});

export const handleChangePrice = async (id: string, command: ChangePriceCommand) => {
    const eventStore = await findEventstore()
    await ChangePriceCommandHandler(eventStore, id, (state: ChangePriceState) => decide(command, state))
}