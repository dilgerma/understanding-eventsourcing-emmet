import type {Event} from '@event-driven-io/emmett'

export type CartCreated = Event<'CartCreated', {
    aggregateId: string,
}>;