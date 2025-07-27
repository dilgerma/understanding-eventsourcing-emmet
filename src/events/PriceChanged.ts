import type { Event } from '@event-driven-io/emmett'

export type PriceChanged = Event<'PriceChanged', {
          productId: string,
  price: number,
        }, {
            correlation_id?:string,
causation_id?:string,
now?:Date,
streamName?:string,
        }>;