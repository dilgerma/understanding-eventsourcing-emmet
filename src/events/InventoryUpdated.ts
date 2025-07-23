import type {Event} from '@event-driven-io/emmett'

export type InventoryUpdated = Event<'InventoryUpdated', {
    inventory: number,
    productId: string,
}>;