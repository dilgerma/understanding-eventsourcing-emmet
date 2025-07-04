import type {Event} from '@event-driven-io/emmett'

export type PriceChanged = Event<'PriceChanged', {
    newPrice: number,
    oldPrice: number,
    productId: string,
}>;