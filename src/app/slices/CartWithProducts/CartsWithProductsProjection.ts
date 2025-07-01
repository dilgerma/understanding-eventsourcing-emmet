import {pongoSingleStreamProjection} from '@event-driven-io/emmett-postgresql';
import {ItemRemoved} from '@/app/events/ItemRemoved';
import {ItemArchived} from '@/app/events/ItemArchived';
import {CartCreated} from '@/app/events/CartCreated';
import {CartCleared} from '@/app/events/CartCleared';
import {ItemAdded} from '@/app/events/ItemAdded';

export type CartsWithProductsReadModelItem = {
    aggregateId?: string,
    productId?: string,
};

export type CartsWithProductsReadModel = {
    data: CartsWithProductsReadModelItem[]
}


const evolve = (
    document: CartsWithProductsReadModel | null,
    {type, data: event}: ItemRemoved | ItemArchived | CartCreated | CartCleared | ItemAdded
): CartsWithProductsReadModel | null => {
    const state: CartItemsReadModel = {...document, data: [...document?.data ?? []]};
    switch (type) {
        /*
        AI-TODO start: implement according to the specifications provided.
        Remove the TODO Comment afterwards.

    # Spec Start
    Title: spec:  cart with products and item archived
    Comments:
      - archived items should be removed from the list
    ### Given (Events):
      * Item Archived
      * Item Added
      * Cart Created
    ### When (Command): None
    ### Then:
      * Carts with Products
    # Spec End

    # Spec Start
    Title: spec:  cart with products
    Comments:
      - Cart should contain the exact product id of the added item
    ### Given (Events):
      * Item Added
      * Cart Created
    ### When (Command): None
    ### Then:
      * Carts with Products
    # Spec End
        AI-TODO end
        */
        case "ItemRemoved": {
            const existing = state.data?.find(item => item.aggregateId === event.aggregateId)

            if (existing) {
                Object.assign(existing, {
                    aggregateId: event.aggregateId
                })
            } else {
                state?.data?.push({
                    aggregateId: event.aggregateId
                })
            }
            return {...state};
        }
        case "ItemArchived": {
            const existing = state.data?.find(item => item.aggregateId === event.aggregateId)

            if (existing) {
                Object.assign(existing, {
                    aggregateId: event.aggregateId
                })
            } else {
                state?.data?.push({
                    aggregateId: event.aggregateId
                })
            }
            return {...state};
        }
        case "CartCreated": {
            const existing = state.data?.find(item => item.aggregateId === event.aggregateId)

            if (existing) {
                Object.assign(existing, {
                    aggregateId: event.aggregateId
                })
            } else {
                state?.data?.push({
                    aggregateId: event.aggregateId
                })
            }
            return {...state};
        }
        case "CartCleared": {
            const existing = state.data?.find(item => item.aggregateId === event.aggregateId)

            if (existing) {
                Object.assign(existing, {
                    aggregateId: event.aggregateId
                })
            } else {
                state?.data?.push({
                    aggregateId: event.aggregateId
                })
            }
            return {...state};
        }
        case "ItemAdded": {
            const existing = state.data?.find(item => item.aggregateId === event.aggregateId)

            if (existing) {
                Object.assign(existing, {
                    aggregateId: event.aggregateId,
                    productId: event.productId
                })
            } else {
                state?.data?.push({
                    aggregateId: event.aggregateId,
                    productId: event.productId
                })
            }
            return {...state};
        }
        default:
            return {...state};
    }
};

const collectionName = 'CartsWithProducts-collection';

export const CartsWithProductsProjection = pongoSingleStreamProjection({
    canHandle: ["ItemRemoved", "ItemArchived", "CartCreated", "CartCleared", "ItemAdded"],
    collectionName,
    evolve,
});