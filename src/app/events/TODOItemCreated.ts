import type {Event} from '@event-driven-io/emmett'

export type TODOItemCreated = Event<'TODOItemCreated', {
    createdAt: Date,
    itemId: string,
    name: string,
}>;