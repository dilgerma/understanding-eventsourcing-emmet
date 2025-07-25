import type {Event} from '@event-driven-io/emmett'

export type ItemAdded = Event<'ItemAdded', {
    aggregateId: string,
    description: string,
    itemId: string,
    name: string,
    price: number,
    productId: string,
}, {
    correlation_id?: string,
    causation_id?: string,
    now?: Date,
    streamName?: string,
}>;