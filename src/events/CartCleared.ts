import type { Event } from '@event-driven-io/emmett'

export type CartCleared = Event<'CartCleared', {
          aggregateId: string,
        }, {
            correlation_id?:string,
causation_id?:string
        }|undefined>;