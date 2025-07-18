import type {Command} from '@event-driven-io/emmett'
import {CommandHandler} from '@event-driven-io/emmett';
import {CartEvents} from "@/app/events/CartEvents";
import {findEventstore} from "@/app/common/loadPostgresEventstore";


export type ClearCartCommand = Command<'ClearCart', {
    aggregateId: string,
}>;

// TODO-AI keep attributes in state optional
export type ClearCartState = {}

export const ClearCartInitialState = (): ClearCartState => ({});

export const evolve = (
    state: ClearCartState,
    event: CartEvents,
): ClearCartState => {
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
Title: spec:  clear cart
### Given (Events):
  * Item Added
  * Cart Created
### When (Command):
  * Clear Cart
### Then:
  * Cart Cleared
# Spec End
AI-TODO end
*/
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

