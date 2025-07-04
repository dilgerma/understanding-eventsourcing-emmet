import type {Event} from '@event-driven-io/emmett'

export type CartPublicationFailed = Event<'CartPublicationFailed', {
    aggregateId: string,
}>;