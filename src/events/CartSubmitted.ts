import type { Event } from '@event-driven-io/emmett'

export type CartSubmitted = Event<'CartSubmitted', {
          aggregateId: string,
        }, {
            correlation_id?:string,
causation_id?:string,
now?:Date,
streamName?:string,
        }>;