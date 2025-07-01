import {pongoSingleStreamProjection} from '@event-driven-io/emmett-postgresql';
import {CartSubmitted} from '@/app/events/CartSubmitted';

export type SubmittedCartDataReadModelItem = {
    aggregateId?: string,
    orderedProducts?: Array<any>,
    totalPrice?: number,
};

export type SubmittedCartDataReadModel = {
    data: SubmittedCartDataReadModelItem
}


const evolve = (
    document: SubmittedCartDataReadModel | null,
    {type, data: event}: CartSubmitted
): SubmittedCartDataReadModel | null => {
    const state: CartItemsReadModel = {...document, data: [...document?.data ?? []]};
    switch (type) {
        /*
        AI-TODO start: implement according to the specifications provided.
        Remove the TODO Comment afterwards.

    # Spec Start
    Title: spec: empty submitted cart data
    Comments:
      - contains no data if cart was not submitted
    ### Given (Events):
      * Item Added
      * Cart Created
    ### When (Command): None
    ### Then:
      * Submitted Cart Data
      Fields:
     - orderedProducts: productId, price
    # Spec End

    # Spec Start
    Title: spec:  submitted cart data
    Comments:
      - contains submitted cart data
    ### Given (Events):
      * Cart Submitted
      Fields:
     - orderedProducts: productId, price
      * Item Added
      * Cart Created
    ### When (Command): None
    ### Then:
      * Submitted Cart Data
      Fields:
     - orderedProducts: productId, price
    # Spec End
        AI-TODO end
        */
        case "CartSubmitted":
            return {
                ...document,
                aggregateId: event.aggregateId,
                orderedProducts: event.orderedProducts,
                totalPrice: event.totalPrice
            }
        default:
            return {...state};
    }
};

const collectionName = 'SubmittedCartData-collection';

export const SubmittedCartDataProjection = pongoSingleStreamProjection({
    canHandle: ["CartSubmitted"],
    collectionName,
    evolve,
});