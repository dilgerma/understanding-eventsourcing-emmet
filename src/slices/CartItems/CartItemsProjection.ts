import {pongoSingleStreamProjection} from '@event-driven-io/emmett-postgresql';
import {ItemArchived} from '../../events/ItemArchived';
import {CartCleared} from '../../events/CartCleared';
import {ItemRemoved} from '../../events/ItemRemoved';
import {ItemAdded} from '../../events/ItemAdded';

export type CartItemsReadModelItem = {
    aggregateId?: string;
    itemId?: string;
    name?: string;
    price?: number;
    productId?: string;
};

export type CartItemsReadModel = {
    data: CartItemsReadModelItem[];
};

const evolve = (
    document: CartItemsReadModel | null,
    { type, data: event }: ItemArchived | CartCleared | ItemRemoved | ItemAdded
): CartItemsReadModel | null => {
    const state: CartItemsReadModel = { ...document, data: [...(document?.data ?? [])] };

    switch (type) {
        case "ItemAdded": {
            const existing = state.data.find(item => item.itemId === event.itemId);

            if (existing) {
                Object.assign(existing, {
                    aggregateId: event.aggregateId,
                    itemId: event.itemId,
                    name: event.name,
                    price: event.price,
                    productId: event.productId
                });
            } else {
                state.data.push({
                    aggregateId: event.aggregateId,
                    itemId: event.itemId,
                    name: event.name,
                    price: event.price,
                    productId: event.productId
                });
            }
            return { ...state };
        }

        case "ItemRemoved": {
            state.data = state.data.filter(item => item.itemId !== event.itemId);
            return { ...state };
        }

        case "ItemArchived": {
            state.data = state.data.filter(item => item.itemId !== event.itemId);
            return { ...state };
        }

        case "CartCleared": {
            state.data = [];
            return { ...state };
        }

        default:
            return { ...state };
    }
};

const collectionName = 'cartitems-collection';

export const CartItemsProjection = pongoSingleStreamProjection({
    canHandle: ["ItemArchived", "CartCleared", "ItemRemoved", "ItemAdded"],
    collectionName,
    evolve,
});
