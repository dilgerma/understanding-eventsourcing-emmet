import type {Command} from '@event-driven-io/emmett'
import {CommandHandler} from '@event-driven-io/emmett';
import {CartEvents} from "../../events/CartEvents";
import {findEventstore} from "../../common/loadPostgresEventstore";

export type ChangePriceCommand = Command<'ChangePrice', {
    productId: string,
    price: number,
}>;

// TODO-AI keep attributes in state optional
export type ChangePriceState = {}

export const ChangePriceInitialState = (): ChangePriceState => ({});

export const evolve = (
    state: ChangePriceState,
    event: CartEvents,
): ChangePriceState => {
    const {type, data} = event;

    switch (type) {
        // case "..Event":
        default:
            return state;
    }
};

/*
AI-TODO start: implement according to the specifications provided.
Stick to the specification, don´t add new fields, which are not specified.

in case an error is expected - throw an error

Remove the TODO Comment afterwards.


AI-TODO end
*/
export const decide = (
    command: ChangePriceCommand,
    state: ChangePriceState,
): CartEvents[] => {
    return [{
        type: "PriceChanged",
        data: {
            productId: command.data.productId,
            price: command.data.price
        }
    }]
};


const ChangePriceCommandHandler = CommandHandler<ChangePriceState, CartEvents>({
    evolve,
    initialState: ChangePriceInitialState
});

export const handleChangePrice = async (id: string, command: ChangePriceCommand) => {
    const eventStore = await findEventstore()
    await ChangePriceCommandHandler(eventStore, id, (state: ChangePriceState) => decide(command, state))

}

