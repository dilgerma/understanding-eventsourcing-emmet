import {pongoSingleStreamProjection} from '@event-driven-io/emmett-postgresql';
import {CartCleared} from '@/app/events/CartCleared';
import {ItemArchived} from '@/app/events/ItemArchived';
import {CartCreated} from '@/app/events/CartCreated';
import {ItemRemoved} from '@/app/events/ItemRemoved';
import {ItemAdded} from '@/app/events/ItemAdded';

export type CartItemsReadModelItem = {
    aggregateId?: string,
    description?: string,
    image?: string,
    price?: number,
    totalPrice?: number,
    productId?: string,
    itemId?: string,
};

export type CartItemsReadModel = {
    data: CartItemsReadModelItem[]
}


const evolve = (
    document: CartItemsReadModel | null,
    {type, data: event}: CartCleared | ItemArchived | CartCreated | ItemRemoved | ItemAdded
): CartItemsReadModel | null => {
    const state: CartItemsReadModel = {...document, data: [...document?.data ?? []]};
    switch (type) {
        /*
        AI-TODO start: implement according to the specifications provided.
        Remove the TODO Comment afterwards.

    # Spec Start
    Title: spec:  cart items with archived items
    Comments:
      - archived items should be removed from the list
    ### Given (Events):
      * Item Archived
      * Item Added
      * Cart Created
    ### When (Command): None
    ### Then:
      * cart items
    # Spec End

    # Spec Start
    Title: spec:  cart items with changed inventory
    Comments:
      - Changed Inventories should not alter the cart
    ### Given (Events):
      * Inventory Changed
      * Item Added
      * Cart Created
    ### When (Command): None
    ### Then:
      * cart items
    # Spec End

    # Spec Start
    Title: spec:  cart items with cleared cart
    Comments:
      - Read Model should display an empty list
    ### Given (Events):
      * Cart Cleared
      * Item Added
      * Cart Created
    ### When (Command): None
    ### Then:
      * cart items
    # Spec End

    # Spec Start
    Title: spec:  cart items with removed item
    Comments:
      - Read Model should display an empty list
    ### Given (Events):
      * Item Removed
      * Item Added
      * Cart Created
    ### When (Command): None
    ### Then:
      * cart items
    # Spec End

    # Spec Start
    Title: spec:  cart items
    Comments:
      - Should display one item in the cart
    ### Given (Events):
      * Item Added
      * Cart Created
    ### When (Command): None
    ### Then:
      * cart items
    # Spec End
        AI-TODO end
        */
        case "CartCleared": {
            const existing = state.data?.find(item => item.aggregateId === event.aggregateId && item.itemId === event.noFieldMatch)

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
            const existing = state.data?.find(item => item.aggregateId === event.aggregateId && item.itemId === event.itemId)

            if (existing) {
                Object.assign(existing, {
                    aggregateId: event.aggregateId,
                    itemId: event.itemId
                })
            } else {
                state?.data?.push({
                    aggregateId: event.aggregateId,
                    itemId: event.itemId
                })
            }
            return {...state};
        }
        case "CartCreated": {
            const existing = state.data?.find(item => item.aggregateId === event.aggregateId && item.itemId === event.noFieldMatch)

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
        case "ItemRemoved": {
            const existing = state.data?.find(item => item.aggregateId === event.aggregateId && item.itemId === event.itemId)

            if (existing) {
                Object.assign(existing, {
                    aggregateId: event.aggregateId,
                    itemId: event.itemId
                })
            } else {
                state?.data?.push({
                    aggregateId: event.aggregateId,
                    itemId: event.itemId
                })
            }
            return {...state};
        }
        case "ItemAdded": {
            const existing = state.data?.find(item => item.aggregateId === event.aggregateId && item.itemId === event.itemId)

            if (existing) {
                Object.assign(existing, {
                    aggregateId: event.aggregateId,
                    description: event.description,
                    image: event.image,
                    price: event.price,
                    totalPrice: event.price,
                    productId: event.productId,
                    itemId: event.itemId
                })
            } else {
                state?.data?.push({
                    aggregateId: event.aggregateId,
                    description: event.description,
                    image: event.image,
                    price: event.price,
                    totalPrice: event.price,
                    productId: event.productId,
                    itemId: event.itemId
                })
            }
            return {...state};
        }
        default:
            return {...state};
    }
};

const collectionName = 'CartItems-collection';

export const CartItemsProjection = pongoSingleStreamProjection({
    canHandle: ["CartCleared", "ItemArchived", "CartCreated", "ItemRemoved", "ItemAdded"],
    collectionName,
    evolve,
});