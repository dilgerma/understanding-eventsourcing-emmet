import {pongoSingleStreamProjection} from '@event-driven-io/emmett-postgresql';
import {InventoryChanged} from '@/app/events/InventoryChanged';

export type InventoriesReadModelItem = {
    inventory?: number,
    productId?: string,
};

export type InventoriesReadModel = {
    data: InventoriesReadModelItem
}


const evolve = (
    document: InventoriesReadModel | null,
    {type, data: event}: InventoryChanged
): InventoriesReadModel | null => {
    const state: CartItemsReadModel = {...document, data: [...document?.data ?? []]};
    switch (type) {
        /*
        AI-TODO start: implement according to the specifications provided.
        Remove the TODO Comment afterwards.

    # Spec Start
    Title: spec:  Inventories
    ### Given (Events):
      * Inventory Changed
    ### When (Command): None
    ### Then:
      * Inventories
    # Spec End
        AI-TODO end
        */
        case "InventoryChanged":
            return {
                ...document,
                inventory: event.inventory,
                productId: event.productId
            }
        default:
            return {...state};
    }
};

const collectionName = 'Inventories-collection';

export const InventoriesProjection = pongoSingleStreamProjection({
    canHandle: ["InventoryChanged"],
    collectionName,
    evolve,
});