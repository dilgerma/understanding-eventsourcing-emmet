import {pongoSingleStreamProjection} from '@event-driven-io/emmett-postgresql';
import {PriceChanged} from '@/app/events/PriceChanged';

export type ChangedPricesReadModelItem = {
    newPrice?: number,
    oldPrice?: number,
    productId?: string,
};

export type ChangedPricesReadModel = {
    data: ChangedPricesReadModelItem
}


const evolve = (
    document: ChangedPricesReadModel | null,
    {type, data: event}: PriceChanged
): ChangedPricesReadModel | null => {
    const state: CartItemsReadModel = {...document, data: [...document?.data ?? []]};
    switch (type) {
        /*
        AI-TODO start: implement according to the specifications provided.
        Remove the TODO Comment afterwards.

        AI-TODO end
        */
        case "PriceChanged":
            return {
                ...document,
                newPrice: event.newPrice,
                oldPrice: event.oldPrice,
                productId: event.productId
            }
        default:
            return {...state};
    }
};

const collectionName = 'ChangedPrices-collection';

export const ChangedPricesProjection = pongoSingleStreamProjection({
    canHandle: ["PriceChanged"],
    collectionName,
    evolve,
});