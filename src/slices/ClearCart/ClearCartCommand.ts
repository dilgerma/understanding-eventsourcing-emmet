import type { Command } from '@event-driven-io/emmett'
import { CommandHandler } from '@event-driven-io/emmett';
import {CartEvents} from "../../events/CartEvents";
import {findEventstore} from "../../common/loadPostgresEventstore";

export type ClearCartCommand = Command<'ClearCart', {
          aggregateId: string
        },
        {
            correlation_id?:string,
causation_id?:string
        }|undefined>;

// TODO-AI keep attributes in state optional
export type ClearCartState = {
}

export const ClearCartInitialState = (): ClearCartState => ({
});

export const evolve = (
    state: ClearCartState,
    event: CartEvents,
): ClearCartState => {
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


# Spec Start
Title: spec: Clear Cart
### Given (Events):
  * 'Item Added' (SPEC_EVENT)
Fields:
 - aggregateId: 
 - description: 
 - itemId: 
 - name: 
 - price: 
 - productId: 
### When (Command):
  * 'Clear Cart' (SPEC_COMMAND)
Fields:
 - aggregateId: 
### Then:
  * 'Cart cleared' (SPEC_EVENT)
Fields:
 - aggregateId: 
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
        			aggregateId:command.data.aggregateId
    }, metadata: {
        correlation_id: command.metadata?.correlation_id,
        causation_id: command.metadata?.causation_id
    }}]
};


const ClearCartCommandHandler = CommandHandler<ClearCartState, CartEvents>({evolve,initialState:ClearCartInitialState});

export const handleClearCart = async (id:string,command:ClearCartCommand) => {
    const eventStore = await findEventstore()
    await ClearCartCommandHandler(eventStore, id, (state:ClearCartState)=>decide(command,state))

}

