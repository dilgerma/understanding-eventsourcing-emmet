import type {Event} from '@event-driven-io/emmett'

export type ItemAdded = Event<'ItemAdded', {
    aggregateId: string,
    description: string,
    image: string,
    price: number,
    itemId: string,
    productId: string,
}>;