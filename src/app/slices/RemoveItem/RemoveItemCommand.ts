import type {Command} from '@event-driven-io/emmett'
import {CommandHandler} from '@event-driven-io/emmett';
import {CartEvents} from "@/app/events/CartEvents";
import {findEventstore} from "@/app/common/loadPostgresEventstore";


export type RemoveItemCommand = Command<'RemoveItem', {
    aggregateId: string,
    itemId: string,
}>;

// TODO-AI keep attributes in state optional
export type RemoveItemState = {}

export const RemoveItemInitialState = (): RemoveItemState => ({});

export const evolve = (
    state: RemoveItemState,
    event: CartEvents,
): RemoveItemState => {
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
Title: spec:  remove item which was already removed
### Given (Events):
  * Item Removed
  * Item Added
  * Cart Created
### When (Command):
  * Remove Item
### Then:
  * Error-Case
# Spec End

# Spec Start
Title: spec:  remove item
### Given (Events):
  * Item Added
  * Cart Created
### When (Command):
  * Remove Item
### Then:
  * Item Removed
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
            aggregateId: command.data.aggregateId,
            itemId: command.data.itemId
        }
    }]
};


const RemoveItemCommandHandler = CommandHandler<RemoveItemState, CartEvents>({
    evolve,
    initialState: RemoveItemInitialState
});

export const handleRemoveItem = async (id: string, command: RemoveItemCommand) => {
    const eventStore = await findEventstore()
    await RemoveItemCommandHandler(eventStore, id, (state: RemoveItemState) => decide(command, state))

}

