import type { Event } from '@event-driven-io/emmett'

export type InventoryUpdated = Event<'InventoryUpdated', {
          inventory: number,
  productId: string,
        }, {
            correlation_id?:string,
causation_id?:string
        }|undefined>;