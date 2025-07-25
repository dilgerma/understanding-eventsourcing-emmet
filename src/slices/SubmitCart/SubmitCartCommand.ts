import type { Command } from '@event-driven-io/emmett'
import { CommandHandler } from '@event-driven-io/emmett';
import {CartEvents} from "../../events/CartEvents";
import {findEventstore} from "../../common/loadPostgresEventstore";

export type SubmitCartCommand = Command<'SubmitCart', {
          aggregateId: string
        },
        {
            correlation_id?:string,
causation_id?:string
        }|undefined>;

// TODO-AI keep attributes in state optional
export type SubmitCartState = {
}

export const SubmitCartInitialState = (): SubmitCartState => ({
});

export const evolve = (
    state: SubmitCartState,
    event: CartEvents,
): SubmitCartState => {
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
Title: spec: submit cart items without inventory
### Given (Events):
  * 'Inventory Updated' (SPEC_EVENT)
Fields:
 - inventory: 
 - productId: 
  * 'Item Added' (SPEC_EVENT)
Fields:
 - aggregateId: 
 - description: 
 - itemId: 
 - name: 
 - price: 
 - productId: 
### When (Command):
  * 'Submit Cart' (SPEC_COMMAND)
Fields:
 - aggregateId: 
### Then:
  * 'Error-Case' (SPEC_ERROR)
# Spec End
AI-TODO end
*/
    export const decide = (
    command: SubmitCartCommand,
    state: SubmitCartState,
): CartEvents[] => {
    return [{
        type: "CartSubmitted",
            data: {
        			aggregateId:command.data.aggregateId
    }, metadata: {
        correlation_id: command.metadata?.correlation_id,
        causation_id: command.metadata?.causation_id
    }}]
};


const SubmitCartCommandHandler = CommandHandler<SubmitCartState, CartEvents>({evolve,initialState:SubmitCartInitialState});

export const handleSubmitCart = async (id:string,command:SubmitCartCommand) => {
    const eventStore = await findEventstore()
    await SubmitCartCommandHandler(eventStore, id, (state:SubmitCartState)=>decide(command,state))

}

