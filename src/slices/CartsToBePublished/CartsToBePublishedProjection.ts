import {pongoSingleStreamProjection} from '@event-driven-io/emmett-postgresql';
import {CartSubmitted} from '../../events/CartSubmitted';
import {CartCleared} from '../../events/CartCleared';
import {ItemRemoved} from '../../events/ItemRemoved';
import {ItemAdded} from '../../events/ItemAdded';
import {CartPublished} from '../../events/CartPublished';
import {ProcessorTodoItem} from "../../process/process";


export type CartsToBePublishedReadModelItem = {
    aggregateId?: string,
    totalPrice?: number,
    orderedProducts?: Array<any>,
}

export type CartsToBePublishedReadModel = {
    data: CartsToBePublishedReadModelItem,
    status?: string
} & Partial<ProcessorTodoItem>


const evolve = (
    document: CartsToBePublishedReadModel | null,
    {type, data: event}: CartSubmitted | CartCleared | ItemRemoved | ItemAdded | CartPublished
): CartsToBePublishedReadModel | null => {
    const state: CartsToBePublishedReadModel = {...document, data: {...document?.data}};
    switch (type) {
        /*
        AI-TODO start: implement according to the specifications provided.
        Stick to the specification, don´t add new fields, which are not specified.
        Remove the TODO Comment afterwards.

        AI-TODO end
        */
        case "CartSubmitted":
            return {
                ...document,
                data: {
                    aggregateId: event.aggregateId,
                },
                status: "OPEN"
            }
        case "CartCleared":
            return {
                ...document,
                data: {
                    aggregateId: event.aggregateId,
                },
                status: "PREPARE"
            }
        case "ItemRemoved":
            return {
                ...document,
                data: {
                    aggregateId: event.aggregateId,
                },
                status: "PREPARE"
            }
        case "ItemAdded":
            return {
                ...document,
                data: {
                    aggregateId: event.aggregateId,
                    totalPrice: event.price,
                },
                status: "PREPARE"
            }
        case "CartPublished":
            return {
                ...document,
                data: {
                    aggregateId: event.aggregateId,
                    orderedProducts: event.orderedProducts,
                    totalPrice: event.totalPrice,
                },
                status: "CLOSED"
            }
        default:
            return {...state};
    }
};

const collectionName = 'cartstobepublished-collection';

export const CartsToBePublishedProjection = pongoSingleStreamProjection({
    canHandle: ["CartSubmitted", "CartCleared", "ItemRemoved", "ItemAdded", "CartPublished"],
    collectionName,
    evolve,
});