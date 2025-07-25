import type { Command } from '@event-driven-io/emmett'
import { CommandHandler } from '@event-driven-io/emmett';
import {CartEvents} from "../../events/CartEvents";
import {findEventstore} from "../../common/loadPostgresEventstore";

export type RemoveItemCommand = Command<'RemoveItem', {
          aggregateId: string,
  itemId: string,
  productId: string
        },
        {
            correlation_id?:string,
causation_id?:string
        }|undefined>;

// TODO-AI keep attributes in state optional
export type RemoveItemState = {
}

export const RemoveItemInitialState = (): RemoveItemState => ({
});

export const evolve = (
    state: RemoveItemState,
    event: CartEvents,
): RemoveItemState => {
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
Title: spec: Item removed
### Given (Events): None
### When (Command):
  * 'Remove Item' (SPEC_COMMAND)
Fields:
 - aggregateId: 
 - itemId: 
 - productId: 
### Then:
  * 'Error-Case' (SPEC_ERROR)
# Spec End
AI-TODO end
*/
    export const decide = (
    command: RemoveItemCommand,
    state: RemoveItemState,
): CartEvents[] => {
    return [{
        type: "ItemRemoved",
            data: {
        			aggregateId:command.data.aggregateId,
			itemId:command.data.itemId,
			productId:command.data.productId
    }, metadata: {
        correlation_id: command.metadata?.correlation_id,
        causation_id: command.metadata?.causation_id
    }}]
};


const RemoveItemCommandHandler = CommandHandler<RemoveItemState, CartEvents>({evolve,initialState:RemoveItemInitialState});

export const handleRemoveItem = async (id:string,command:RemoveItemCommand) => {
    const eventStore = await findEventstore()
    await RemoveItemCommandHandler(eventStore, id, (state:RemoveItemState)=>decide(command,state))

}

