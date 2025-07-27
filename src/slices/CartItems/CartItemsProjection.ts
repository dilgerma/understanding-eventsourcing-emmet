import { pongoSingleStreamProjection } from '@event-driven-io/emmett-postgresql';
import { ItemArchived } from '../../events/ItemArchived';
import { CartCleared } from '../../events/CartCleared';
import { ItemRemoved } from '../../events/ItemRemoved';
import { ItemAdded } from '../../events/ItemAdded';
import { ProcessorTodoItem } from "../../process/process";

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
    const currentItems = [...(document?.data ?? [])];

    switch (type) {
        case "ItemAdded": {
            return {
                data: [
                    ...currentItems,
                    {
                        aggregateId: event.aggregateId,
                        itemId: event.itemId,
                        name: event.name,
                        price: event.price,
                        productId: event.productId,
                    },
                ],
            };
        }

        case "ItemRemoved":
        case "ItemArchived": {
            return {
                data: currentItems.filter(item => item.itemId !== event.itemId),
            };
        }

        case "CartCleared": {
            return {
                data: currentItems.filter(item => item.aggregateId !== event.aggregateId),
            };
        }

        default:
            return { data: currentItems };
    }
};

const collectionName = 'cartitems-collection';

export const CartItemsProjection = pongoSingleStreamProjection({
    canHandle: ["ItemArchived", "CartCleared", "ItemRemoved", "ItemAdded"],
    collectionName,
    evolve,
});
