import {pongoSingleStreamProjection} from '@event-driven-io/emmett-postgresql';
import {CartSubmitted} from '../../events/CartSubmitted';
import {ItemArchived} from '../../events/ItemArchived';
import {CartCleared} from '../../events/CartCleared';
import {ItemRemoved} from '../../events/ItemRemoved';
import {ItemAdded} from '../../events/ItemAdded';


export type CartsWithProductsReadModelItem = {
          aggregateId?: string,
  productId?: string,
  itemId?: string,
        }
        
        export type CartsWithProductsReadModel = {
            data: CartsWithProductsReadModelItem[],
            
        }
        

const evolve = (
  document: CartsWithProductsReadModel | null,
  { type, data: event }: CartSubmitted | ItemArchived | CartCleared | ItemRemoved | ItemAdded
): CartsWithProductsReadModel | null => {
  const state: CartsWithProductsReadModel = {...document, data: [...document?.data??[]]};
  switch (type) {
    /*
    AI-TODO start: implement according to the specifications provided.
    Stick to the specification, don´t add new fields, which are not specified.
    Remove the TODO Comment afterwards.
    
    AI-TODO end
    */
    case "CartSubmitted": {
                                const existing = state.data?.find(item => item.aggregateId === event.aggregateId)
                                
                                if(existing) {
                                   Object.assign(existing,  {
                                     			aggregateId:event.aggregateId
                                   })
                                } else {
                                    state?.data?.push({
                                        			aggregateId:event.aggregateId
                                    })
                                }
                                return {...state};
                        }
case "ItemArchived": {
                                const existing = state.data?.find(item => item.aggregateId === event.aggregateId)
                                
                                if(existing) {
                                   Object.assign(existing,  {
                                     			aggregateId:event.aggregateId,
			productId:event.productId,
			itemId:event.itemId
                                   })
                                } else {
                                    state?.data?.push({
                                        			aggregateId:event.aggregateId,
			productId:event.productId,
			itemId:event.itemId
                                    })
                                }
                                return {...state};
                        }
case "CartCleared": {
                                const existing = state.data?.find(item => item.aggregateId === event.aggregateId)
                                
                                if(existing) {
                                   Object.assign(existing,  {
                                     			aggregateId:event.aggregateId
                                   })
                                } else {
                                    state?.data?.push({
                                        			aggregateId:event.aggregateId
                                    })
                                }
                                return {...state};
                        }
case "ItemRemoved": {
                                const existing = state.data?.find(item => item.aggregateId === event.aggregateId)
                                
                                if(existing) {
                                   Object.assign(existing,  {
                                     			aggregateId:event.aggregateId,
			productId:event.productId,
			itemId:event.itemId
                                   })
                                } else {
                                    state?.data?.push({
                                        			aggregateId:event.aggregateId,
			productId:event.productId,
			itemId:event.itemId
                                    })
                                }
                                return {...state};
                        }
case "ItemAdded": {
                                const existing = state.data?.find(item => item.aggregateId === event.aggregateId)
                                
                                if(existing) {
                                   Object.assign(existing,  {
                                     			aggregateId:event.aggregateId,
			productId:event.productId,
			itemId:event.itemId
                                   })
                                } else {
                                    state?.data?.push({
                                        			aggregateId:event.aggregateId,
			productId:event.productId,
			itemId:event.itemId
                                    })
                                }
                                return {...state};
                        }
    default: return {...state};
  }
};

const collectionName = 'cartswithproducts-collection';

export const CartsWithProductsProjection = pongoSingleStreamProjection({
  canHandle: ["CartSubmitted" , "ItemArchived" , "CartCleared" , "ItemRemoved" , "ItemAdded"],
  collectionName,
  evolve,
});