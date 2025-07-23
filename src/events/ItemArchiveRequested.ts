import type {Event} from '@event-driven-io/emmett'

export type ItemArchiveRequested = Event<'ItemArchiveRequested', {
    aggregateId: string,
    productId: string,
    itemId: string,
}>;