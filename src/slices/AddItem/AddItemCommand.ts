import type {Command} from '@event-driven-io/emmett'
import {CommandHandler} from '@event-driven-io/emmett';
import {CartEvents} from "../../events/CartEvents";
import {findEventstore} from "../../common/loadPostgresEventstore";

export type AddItemCommand = Command<'AddItem', {
    aggregateId: string,
    description: string,
    price: number,
    itemId: string,
    name: string,
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
Stick to the specification, don´t add new fields, which are not specified.

in case an error is expected - throw an error

Remove the TODO Comment afterwards.


# Spec Start
Title: spec: At most 3 Items
Comments:
  - can only add 3 items to the cart
### Given (Events):
  * 'Item Added' (SPEC_EVENT)
Fields:
 - aggregateId: 
 - description: 
 - itemId: 
 - name: 
 - price: 
 - productId: 
  * 'Item Added' (SPEC_EVENT)
Fields:
 - aggregateId: 
 - description: 
 - itemId: 
 - name: 
 - price: 
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
  * 'Add Item' (SPEC_COMMAND)
Fields:
 - aggregateId: 
 - description: 
 - price: 
 - itemId: 
 - name: 
 - productId: 
### Then:
  * 'Error-Case' (SPEC_ERROR)
# Spec End

# Spec Start
Title: spec: Add Item
### Given (Events): None
### When (Command):
  * 'Add Item' (SPEC_COMMAND)
Fields:
 - aggregateId: 
 - description: 
 - price: 
 - itemId: 
 - name: 
 - productId: 
### Then:
  * 'Item Added' (SPEC_EVENT)
Fields:
 - aggregateId: 
 - description: 
 - itemId: 
 - name: 
 - price: 
 - productId: 
# Spec End
AI-TODO end
*/
export const decide = (
    command: AddItemCommand,
    state: AddItemState,
): CartEvents[] => {
    return [{
        type: "ItemAdded",
        data: {
            aggregateId: command.data.aggregateId,
            description: command.data.description,
            itemId: command.data.itemId,
            name: command.data.name,
            price: command.data.price,
            productId: command.data.productId
        }
    }]
};


const AddItemCommandHandler = CommandHandler<AddItemState, CartEvents>({evolve, initialState: AddItemInitialState});

export const handleAddItem = async (id: string, command: AddItemCommand) => {
    const eventStore = await findEventstore()
    await AddItemCommandHandler(eventStore, id, (state: AddItemState) => decide(command, state))

}

