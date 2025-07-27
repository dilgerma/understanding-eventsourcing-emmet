import { pongoSingleStreamProjection } from '@event-driven-io/emmett-postgresql';
import { ItemArchived } from '../../events/ItemArchived';
import { ItemArchiveRequested } from '../../events/ItemArchiveRequested';
import {ProcessorTodoItem} from "../../process/process";


export type ItemsToBeArchivedReadModelItem = {
          aggregateId?: string,
  productId?: string,
  itemId?: string,
        }
        
        export type ItemsToBeArchivedReadModel = {
            data: ItemsToBeArchivedReadModelItem,
            status?:string
        }&Partial<ProcessorTodoItem>
        

const evolve = (
  document: ItemsToBeArchivedReadModel | null,
  { type, data: event }: ItemArchived | ItemArchiveRequested
): ItemsToBeArchivedReadModel | null => {
  const state: ItemsToBeArchivedReadModel = {...document, data: {...document?.data}};
  switch (type) {
    /*
    AI-TODO start: implement according to the specifications provided.
    Stick to the specification, don´t add new fields, which are not specified.
    Remove the TODO Comment afterwards.
    
    AI-TODO end
    */
    case "ItemArchived": 
                        return {
                            ...document,
                            data: {
                                			aggregateId:event.aggregateId,
			itemId:event.itemId,
			productId:event.productId,
                            },
                            status: "OPEN"
                        }
case "ItemArchiveRequested": 
                        return {
                            ...document,
                            data: {
                                			aggregateId:event.aggregateId,
			itemId:event.itemId,
			productId:event.productId,
                            },
                            status: "OPEN"
                        }
    default: return {...state};
  }
};

const collectionName = 'itemstobearchived-collection';

export const ItemsToBeArchivedProjection = pongoSingleStreamProjection({
  canHandle: ["ItemArchived" , "ItemArchiveRequested"],
  collectionName,
  evolve,
});