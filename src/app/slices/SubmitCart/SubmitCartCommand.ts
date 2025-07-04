import type {Command} from '@event-driven-io/emmett'
import {CommandHandler} from '@event-driven-io/emmett';
import {CartEvents} from "@/app/events/CartEvents";
import {findEventstore} from "@/app/common/loadPostgresEventstore";


export type SubmitCartCommand = Command<'SubmitCart', {
    aggregateId: string,
    orderedProducts: Array<any>,
}>;

// TODO-AI keep attributes in state optional
export type SubmitCartState = {}

export const SubmitCartInitialState = (): SubmitCartState => ({});

export const evolve = (
    state: SubmitCartState,
    event: CartEvents,
): SubmitCartState => {
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
Title: spec:  cannot submit cart twice
### Given (Events):
  * Cart Submitted
  Fields:
 - orderedProducts: productId, price
  * Item Added
  * Cart Created
### When (Command):
  * Submit Cart
### Then:
  * Error-Case
# Spec End

# Spec Start
Title: spec:  submit cart without quantity
Comments:
  - Cart with zero inventory cannot be submitted.
### Given (Events):
  * Inventory Changed
  Fields:
 - inventory: 0
  * Item Added
### When (Command):
  * Submit Cart
### Then:
  * Error-Case
# Spec End

# Spec Start
Title: spec:  submit empty cart
### Given (Events): None
### When (Command):
  * Submit Cart
### Then:
  * Error-Case
# Spec End

# Spec Start
Title: spec:  submit cart
### Given (Events):
  * Item Added
### When (Command):
  * Submit Cart
### Then:
  * Cart Submitted
  Fields:
 - orderedProducts: productId, price
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
            aggregateId: command.data.aggregateId,
            orderedProducts: command.data.orderedProducts,
            totalPrice: command.data.orderedProducts
        }
    }]
};


const SubmitCartCommandHandler = CommandHandler<SubmitCartState, CartEvents>({
    evolve,
    initialState: SubmitCartInitialState
});

export const handleSubmitCart = async (id: string, command: SubmitCartCommand) => {
    const eventStore = await findEventstore()
    await SubmitCartCommandHandler(eventStore, id, (state: SubmitCartState) => decide(command, state))

}

