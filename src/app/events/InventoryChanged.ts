import type {Event} from '@event-driven-io/emmett'

export type InventoryChanged = Event<'InventoryChanged', {
    inventory: number,
    productId: string,
}>;