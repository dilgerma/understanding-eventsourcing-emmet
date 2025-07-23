import type {Event} from '@event-driven-io/emmett'

export type PriceChanged = Event<'PriceChanged', {
    productId: string,
    price: number,
}>;