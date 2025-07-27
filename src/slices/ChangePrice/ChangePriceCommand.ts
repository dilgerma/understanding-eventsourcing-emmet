import type { Command } from '@event-driven-io/emmett'
import { CommandHandler } from '@event-driven-io/emmett';
import {CartEvents} from "../../events/CartEvents";
import {findEventstore} from "../../common/loadPostgresEventstore";

export type ChangePriceCommand = Command<'ChangePrice', {
          productId: string,
  price: number
        },
        {
            correlation_id?:string,
causation_id?:string,
now?:Date,
streamName?:string,
        }>;

// TODO-AI keep attributes in state optional
export type ChangePriceState = {
}

export const ChangePriceInitialState = (): ChangePriceState => ({
});

export const evolve = (
    state: ChangePriceState,
    event: CartEvents,
): ChangePriceState => {
    const { type, data } = event;

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
        			productId:command.data.productId,
			price:command.data.price
    }, metadata: {
        correlation_id: command.metadata?.correlation_id,
        causation_id: command.metadata?.causation_id
    }}]
};


const ChangePriceCommandHandler = CommandHandler<ChangePriceState, CartEvents>({evolve,initialState:ChangePriceInitialState});

export const handleChangePrice = async (id:string,command:ChangePriceCommand) => {
    const eventStore = await findEventstore()
    const result = await ChangePriceCommandHandler(eventStore, id, (state:ChangePriceState)=>decide(command,state))
    return {nextExpectedStreamVersion: result.nextExpectedStreamVersion, lastEventGlobalPosition: result.lastEventGlobalPosition}
}

