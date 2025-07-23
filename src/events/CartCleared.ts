import type {Event} from '@event-driven-io/emmett'

export type CartCleared = Event<'CartCleared', {
          aggregateId: string,
        }>;