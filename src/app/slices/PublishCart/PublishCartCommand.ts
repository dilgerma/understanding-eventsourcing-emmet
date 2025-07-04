import type {Command} from '@event-driven-io/emmett'
import {CommandHandler} from '@event-driven-io/emmett';
import {CartEvents} from "@/app/events/CartEvents";
import {findEventstore} from "@/app/common/loadPostgresEventstore";


export type PublishCartCommand = Command<'PublishCart', {
    aggregateId: string,
    orderedProducts: Array<any>,
    totalPrice: number,
}>;

// TODO-AI keep attributes in state optional
export type PublishCartState = {}

export const PublishCartInitialState = (): PublishCartState => ({});

export const evolve = (
    state: PublishCartState,
    event: CartEvents,
): PublishCartState => {
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
Title: spec:  publish cart
Comments:
  - cannot republish a cart
### Given (Events):
  * Cart Published
  * Cart Submitted
  Fields:
 - orderedProducts: productId, price
  * Item Added
  * Cart Created
### When (Command):
  * Publish Cart
  Fields:
 - orderedProducts: productId, price
### Then:
  * Cart Publication Failed
# Spec End
AI-TODO end
*/
export const decide = (
    command: PublishCartCommand,
    state: PublishCartState,
): CartEvents[] => {
    return [{
        type: "CartPublicationFailed",
        data: {
            aggregateId: command.data.aggregateId
        }
    }, {
        type: "CartPublished",
        data: {
            aggregateId: command.data.aggregateId
        }
    }, {
        type: "ExternalCartPublished",
        data: {
            aggregateId: command.data.aggregateId,
            orderedProducts: command.data.orderedProducts,
            totalPrice: command.data.totalPrice
        }
    }]
};


const PublishCartCommandHandler = CommandHandler<PublishCartState, CartEvents>({
    evolve,
    initialState: PublishCartInitialState
});

export const handlePublishCart = async (id: string, command: PublishCartCommand) => {
    const eventStore = await findEventstore()
    await PublishCartCommandHandler(eventStore, id, (state: PublishCartState) => decide(command, state))

}

