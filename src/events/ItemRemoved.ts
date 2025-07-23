import type {Event} from '@event-driven-io/emmett'

export type ItemRemoved = Event<'ItemRemoved', {
          aggregateId: string,
  itemId: string,
  productId: string,
        }>;