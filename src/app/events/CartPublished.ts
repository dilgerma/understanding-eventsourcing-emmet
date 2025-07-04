import type {Event} from '@event-driven-io/emmett'

export type CartPublished = Event<'CartPublished', {
    aggregateId: string,
}>;