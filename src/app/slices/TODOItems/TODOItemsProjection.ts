import {pongoSingleStreamProjection} from '@event-driven-io/emmett-postgresql';
import {TODOItemCreated} from '@/app/events/TODOItemCreated';

export type TODOItemsReadModelItem = {
    itemId?: string,
};

const evolve = (
    document: TODOItemsReadModelItem | null,
    {type, data: event}: TODOItemCreated
): TODOItemsReadModelItem | null => {
    const state: TODOItemsReadModelItem = {...document};

    switch (type) {
        case "TODOItemCreated": {
            return {...state, itemId: event.itemId};
        }

        default:
            return {...state};
    }
};

const collectionName = 'TODOItems-collection';

export const TODOItemsProjection = pongoSingleStreamProjection({
    canHandle: ["TODOItemMarkedCompleted", "TODOItemCreated", "TODOItemDeleted"],
    collectionName,
    evolve,
});