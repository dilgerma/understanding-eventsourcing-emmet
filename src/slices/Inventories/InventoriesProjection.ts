import { pongoSingleStreamProjection } from '@event-driven-io/emmett-postgresql';
import { InventoryUpdated } from '../../events/InventoryUpdated';
import {ProcessorTodoItem} from "../../process/process";


export type InventoriesReadModelItem = {
          productId?: string,
  inventory?: number,
        }
        
        export type InventoriesReadModel = {
            data: InventoriesReadModelItem[],
            
        }
        

const evolve = (
  document: InventoriesReadModel | null,
  { type, data: event }: InventoryUpdated
): InventoriesReadModel | null => {
  const state: InventoriesReadModel = {...document, data: [...document?.data??[]]};
  switch (type) {
    /*
    AI-TODO start: implement according to the specifications provided.
    Stick to the specification, don´t add new fields, which are not specified.
    Remove the TODO Comment afterwards.
    
    AI-TODO end
    */
    case "InventoryUpdated": {
                                const existing = state.data?.find(item => item.productId === event.productId)
                                
                                if(existing) {
                                   Object.assign(existing,  {
                                     			productId:event.productId,
			inventory:event.inventory
                                   })
                                } else {
                                    state?.data?.push({
                                        			productId:event.productId,
			inventory:event.inventory
                                    })
                                }
                                return {...state};
                        }
    default: return {...state};
  }
};

const collectionName = 'inventories-collection';

export const InventoriesProjection = pongoSingleStreamProjection({
  canHandle: ["InventoryUpdated"],
  collectionName,
  evolve,
});