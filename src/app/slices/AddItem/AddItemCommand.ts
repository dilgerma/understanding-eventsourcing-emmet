import type {Command} from '@event-driven-io/emmett'
import {CommandHandler} from '@event-driven-io/emmett';
import {CartEvents} from "@/app/events/CartEvents";
import {findEventstore} from "@/app/common/loadPostgresEventstore";


export type AddItemCommand = Command<'AddItem', {
    aggregateId: string,
    description: string,
    image: string,
    price: number,
    itemId: string,
    productId: string,
}>;

// TODO-AI keep attributes in state optional
export type AddItemState = {}

export const AddItemInitialState = (): AddItemState => ({});

export const evolve = (
    state: AddItemState,
    event: CartEvents,
): AddItemState => {
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
Title: spec:  add item max 3 items
### Given (Events):
  * Item Added
  * Item Added
  * Item Added
  * Cart Created
### When (Command):
  * Add Item
### Then:
  * Error-Case
# Spec End

# Spec Start
Title: spec:  add item
Comments:
  - Cart-Session is automatically created if an item is added and no session exists.
### Given (Events): None
### When (Command):
  * Add Item
### Then:
  * Item Added
  * Cart Created
# Spec End

# Spec Start
Title: spec:  add item with empty inventory
### Given (Events):
  * Inventory Changed
  Fields:
 - inventory: 0
### When (Command):
  * Add Item
### Then:
  * Cart Created
  * Error-Case
# Spec End
AI-TODO end
*/
export const decide = (
    command: AddItemCommand,
    state: AddItemState,
): CartEvents[] => {
    return [{
        type: "CartCreated",
        data: {
            aggregateId: command.data.aggregateId
        }
    }, {
        type: "ItemAdded",
        data: {
            aggregateId: command.data.aggregateId,
            description: command.data.description,
            image: command.data.image,
            price: command.data.price,
            itemId: command.data.itemId,
            productId: command.data.productId
        }
    }]
};


const AddItemCommandHandler = CommandHandler<AddItemState, CartEvents>({evolve, initialState: AddItemInitialState});

export const handleAddItem = async (id: string, command: AddItemCommand) => {
    const eventStore = await findEventstore()
    await AddItemCommandHandler(eventStore, id, (state: AddItemState) => decide(command, state))

}

