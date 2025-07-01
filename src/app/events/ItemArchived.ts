import type {Event} from '@event-driven-io/emmett'

export type ItemArchived = Event<'ItemArchived', {
    aggregateId: string,
    itemId: string,
}>;