import {pongoSingleStreamProjection} from '@event-driven-io/emmett-postgresql';
import {ItemArchived} from '../../events/ItemArchived';
import {CartCleared} from '../../events/CartCleared';
import {ItemRemoved} from '../../events/ItemRemoved';
import {ItemAdded} from '../../events/ItemAdded';
import {ProcessorTodoItem} from "../../process/process";


export type CartItemsReadModelItem = {
    aggregateId?: string,
    itemId?: string,
    name?: string,
    price?: number,
    productId?: string,
}

export type CartItemsReadModel = {
    data: CartItemsReadModelItem[],

}


const evolve = (
    document: CartItemsReadModel | null,
    {type, data: event}: ItemArchived | CartCleared | ItemRemoved | ItemAdded
): CartItemsReadModel | null => {
    const state: CartItemsReadModel = {...document, data: [...document?.data ?? []]};
    switch (type) {
        /*
        AI-TODO start: implement according to the specifications provided.
        Stick to the specification, don´t add new fields, which are not specified.
        Remove the TODO Comment afterwards.

    # Spec Start
    Title: spec: cart items
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
    ### When (Command): None
    ### Then:
      * 'cart items' (SPEC_READMODEL)
    Fields:
     - aggregateId:
     - itemId:
     - name:
     - price:
     - productId:
      * 'cart items' (SPEC_READMODEL)
    Fields:
     - aggregateId:
     - itemId:
     - name:
     - price:
     - productId:
    # Spec End
        AI-TODO end
        */
        case "ItemArchived": {
            const existing = state.data?.find(item => item.aggregateId === event.aggregateId)

            if (existing) {
                Object.assign(existing, {
                    aggregateId: event.aggregateId,
                    itemId: event.itemId,
                    productId: event.productId
                })
            } else {
                state?.data?.push({
                    aggregateId: event.aggregateId,
                    itemId: event.itemId,
                    productId: event.productId
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
        case "ItemRemoved": {
            const existing = state.data?.find(item => item.aggregateId === event.aggregateId)

            if (existing) {
                Object.assign(existing, {
                    aggregateId: event.aggregateId,
                    itemId: event.itemId,
                    productId: event.productId
                })
            } else {
                state?.data?.push({
                    aggregateId: event.aggregateId,
                    itemId: event.itemId,
                    productId: event.productId
                })
            }
            return {...state};
        }
        case "ItemAdded": {
            const existing = state.data?.find(item => item.aggregateId === event.aggregateId)

            if (existing) {
                Object.assign(existing, {
                    aggregateId: event.aggregateId,
                    itemId: event.itemId,
                    name: event.name,
                    price: event.price,
                    productId: event.productId
                })
            } else {
                state?.data?.push({
                    aggregateId: event.aggregateId,
                    itemId: event.itemId,
                    name: event.name,
                    price: event.price,
                    productId: event.productId
                })
            }
            return {...state};
        }
        default:
            return {...state};
    }
};

const collectionName = 'cartitems-collection';

export const CartItemsProjection = pongoSingleStreamProjection({
    canHandle: ["ItemArchived", "CartCleared", "ItemRemoved", "ItemAdded"],
    collectionName,
    evolve,
});