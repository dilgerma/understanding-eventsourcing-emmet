import type {Event} from '@event-driven-io/emmett'

export type ItemRemoved = Event<'ItemRemoved', {
    aggregateId: string,
    itemId: string,
    productId: string,
}, {
    correlation_id?: string,
    causation_id?: string,
    now?: Date,
    streamName?: string,
}>;