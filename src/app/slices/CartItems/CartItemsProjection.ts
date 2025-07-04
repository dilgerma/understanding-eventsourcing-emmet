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
        case "CartCleared": {
            state.data = [];
            return {...state};
        }

        case "ItemArchived":
        case "ItemRemoved": {
            state.data = state.data.filter(item =>
                !(item.aggregateId === event.aggregateId && item.itemId === event.itemId)
            );
            return {...state};
        }

        case "CartCreated": {
            return {...state};
        }

        case "ItemAdded": {
            const existing = state.data.find(item =>
                item.aggregateId === event.aggregateId && item.itemId === event.itemId
            );

            if (existing) {
                existing.description = event.description;
                existing.image = event.image;
                existing.price = event.price;
                existing.totalPrice = (existing.totalPrice ?? 0) + event.price;
                existing.productId = event.productId;
                existing.itemId = event.itemId;
                existing.aggregateId = event.aggregateId;
            } else {
                state.data.push({
                    aggregateId: event.aggregateId,
                    description: event.description,
                    image: event.image,
                    price: event.price,
                    totalPrice: event.price,
                    productId: event.productId,
                    itemId: event.itemId
                });
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
