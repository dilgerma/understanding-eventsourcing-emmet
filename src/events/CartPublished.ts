import type { Event } from '@event-driven-io/emmett'

export type CartPublished = Event<'CartPublished', {
          aggregateId: string,
  orderedProducts: Array<any>,
  totalPrice: number,
        }, {
            correlation_id?:string,
causation_id?:string,
now?:Date,
streamName?:string,
        }>;