import type {Command} from '@event-driven-io/emmett'
import {CommandHandler} from '@event-driven-io/emmett';
import {CartEvents} from "@/app/events/CartEvents";
import {findEventstore} from "@/app/common/loadPostgresEventstore";


export type ArchiveItemCommand = Command<'ArchiveItem', {
    aggregateId: string,
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

in case an error is expected - throw an error

Remove the TODO Comment afterwards.


# Spec Start
Title: spec:  Archive Item Aggregate Test
### Given (Events):
  * Item Added
  * Cart Created
### When (Command):
  * Archive Item
### Then:
  * Item Archived
# Spec End

# Spec Start
Title: spec:  Archive Item
Comments:
  - cart containing the  product should react if the price of the product changes
### Given (Events):
  * Price Changed
  * Item Added
  * Cart Created
### When (Command): None
### Then:
  * Item Archived
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
            itemId: command.data.productId
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

