import type {Command} from '@event-driven-io/emmett'
import {CommandHandler} from '@event-driven-io/emmett';
import {CartEvents} from "../../events/CartEvents";
import {findEventstore} from "../../common/loadPostgresEventstore";

export type ArchiveItemCommand = Command<'ArchiveItem', {
    aggregateId: string,
    itemId: string,
    productId: string,
}>;

// TODO-AI keep attributes in state optional
export type ArchiveItemState = {}

export const ArchiveItemInitialState = (): ArchiveItemState => ({});

export const evolve = (
    state: ArchiveItemState,
    event: CartEvents,
): ArchiveItemState => {
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


# Spec Start
Title: spec: Archive Item
### Given (Events):
  * 'Price changed' (SPEC_EVENT)
Fields:
 - productId: 
 - price: 
  * 'Item Added' (SPEC_EVENT)
Fields:
 - aggregateId: 
 - description: 
 - itemId: 
 - name: 
 - price: 
 - productId: 
### When (Command):
  * 'Archive Item' (SPEC_COMMAND)
Fields:
 - aggregateId: 
 - itemId: 
 - productId: 
### Then:
  * 'Item Archived' (SPEC_EVENT)
Fields:
 - aggregateId: 
 - productId: 
 - itemId: 
# Spec End
AI-TODO end
*/
export const decide = (
    command: ArchiveItemCommand,
    state: ArchiveItemState,
): CartEvents[] => {
    return [{
        type: "ItemArchived",
        data: {
            aggregateId: command.data.aggregateId,
            productId: command.data.productId,
            itemId: command.data.itemId
        }
    }]
};


const ArchiveItemCommandHandler = CommandHandler<ArchiveItemState, CartEvents>({
    evolve,
    initialState: ArchiveItemInitialState
});

export const handleArchiveItem = async (id: string, command: ArchiveItemCommand) => {
    const eventStore = await findEventstore()
    await ArchiveItemCommandHandler(eventStore, id, (state: ArchiveItemState) => decide(command, state))

}

