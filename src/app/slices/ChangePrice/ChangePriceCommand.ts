import type {Command} from '@event-driven-io/emmett'
import {CommandHandler} from '@event-driven-io/emmett';
import {CartEvents} from "@/app/events/CartEvents";
import {findEventstore} from "@/app/common/loadPostgresEventstore";


export type ChangePriceCommand = Command<'ChangePrice', {
    newPrice: number,
    oldPrice: number,
    productId: string,
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

in case an error is expected - throw an error

Remove the TODO Comment afterwards.


# Spec Start
Title: spec:  change price
### Given (Events): None
### When (Command):
  * Change Price
### Then:
  * Price Changed
# Spec End
AI-TODO end
*/
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

