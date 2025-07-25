import {pongoSingleStreamProjection} from '@event-driven-io/emmett-postgresql';
import {PriceChanged} from '../../events/PriceChanged';
import {ProcessorTodoItem} from "../../process/process";


export type ProductsWithPriceChangesReadModelItem = {
    productId?: string,
}

export type ProductsWithPriceChangesReadModel = {
    data: ProductsWithPriceChangesReadModelItem[],

}


const evolve = (
    document: ProductsWithPriceChangesReadModel | null,
    {type, data: event}: PriceChanged
): ProductsWithPriceChangesReadModel | null => {
    const state: ProductsWithPriceChangesReadModel = {...document, data: [...document?.data ?? []]};
    switch (type) {
        /*
        AI-TODO start: implement according to the specifications provided.
        Stick to the specification, don´t add new fields, which are not specified.
        Remove the TODO Comment afterwards.

        AI-TODO end
        */
        case "PriceChanged": {
            const existing = state.data?.find(item => item.productId === event.productId)

            if (existing) {
                Object.assign(existing, {
                    productId: event.productId
                })
            } else {
                state?.data?.push({
                    productId: event.productId
                })
            }
            return {...state};
        }
        default:
            return {...state};
    }
};

const collectionName = 'productswithpricechanges-collection';

export const ProductsWithPriceChangesProjection = pongoSingleStreamProjection({
    canHandle: ["PriceChanged"],
    collectionName,
    evolve,
});