import type {Event} from '@event-driven-io/emmett'

export type CartSubmitted = Event<'CartSubmitted', {
    aggregateId: string,
    orderedProducts: Array<any>,
    totalPrice: number,
}>;