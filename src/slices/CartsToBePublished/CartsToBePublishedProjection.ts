import { pongoSingleStreamProjection } from '@event-driven-io/emmett-postgresql';
import { CartPublished } from '../../events/CartPublished';
import { CartSubmitted } from '../../events/CartSubmitted';
import { CartCleared } from '../../events/CartCleared';
import { ItemRemoved } from '../../events/ItemRemoved';
import { ItemAdded } from '../../events/ItemAdded';
import { ProcessorTodoItem } from "../../process/process";

export type CartsToBePublishedReadModelItem = {
    aggregateId?: string;
    totalPrice?: number;
    orderedProducts?: Array<{ productId: string; price: number }>;
};

export type CartsToBePublishedReadModel = {
    data: CartsToBePublishedReadModelItem;
    status?: string;
} & Partial<ProcessorTodoItem>;

const evolve = (
    document: CartsToBePublishedReadModel | null,
    { type, data: event }: CartPublished | CartSubmitted | CartCleared | ItemRemoved | ItemAdded
): CartsToBePublishedReadModel | null => {
    const existing = document ?? {
        data: {
            aggregateId: event.aggregateId,
            orderedProducts: [],
            totalPrice: 0,
        }
    };
    const products = existing.data.orderedProducts ?? [];

    switch (type) {
        case "ItemAdded": {
            const updated = [...products, { productId: event.productId, price: event.price }];
            return {
                ...existing,
                data: {
                    aggregateId: event.aggregateId,
                    orderedProducts: updated,
                    totalPrice: updated.reduce((sum, p) => sum + p.price, 0),
                },
                status: existing.status, // unchanged
            };
        }

        case "ItemRemoved": {
            const updated = products.filter((p) => p.productId !== event.productId);
            return {
                ...existing,
                data: {
                    aggregateId: event.aggregateId,
                    orderedProducts: updated,
                    totalPrice: updated.reduce((sum, p) => sum + p.price, 0),
                },
                status: existing.status, // unchanged
            };
        }

        case "CartCleared":
            return {
                ...existing,
                data: {
                    aggregateId: event.aggregateId,
                    orderedProducts: [],
                    totalPrice: 0,
                },
                status: existing.status, // unchanged
            };

        case "CartSubmitted":
            return {
                ...existing,
                data: {
                    ...existing.data,
                    aggregateId: event.aggregateId,
                },
                status: "OPEN",
            };

        case "CartPublished":
            return {
                ...existing,
                data: {
                    aggregateId: event.aggregateId,
                    orderedProducts: event.orderedProducts,
                    totalPrice: event.totalPrice,
                },
                status: "CLOSED",
            };

        default:
            return existing;
    }
};

const collectionName = 'cartstobepublished-collection';

export const CartsToBePublishedProjection = pongoSingleStreamProjection({
    canHandle: ["CartPublished", "CartSubmitted", "CartCleared", "ItemRemoved", "ItemAdded"],
    collectionName,
    evolve,
});
