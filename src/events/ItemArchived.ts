import type {Event} from '@event-driven-io/emmett'

export type ItemArchived = Event<'ItemArchived', {
    aggregateId: string,
    productId: string,
    itemId: string,
}, {
    correlation_id?: string,
    causation_id?: string,
    now?: Date,
    streamName?: string,
}>;