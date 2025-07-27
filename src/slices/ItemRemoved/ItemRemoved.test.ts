import {DeciderSpecification} from '@event-driven-io/emmett';
import {RemoveItemCommand, RemoveItemState, decide, evolve} from "./RemoveItemCommand";
import {describe, it} from "node:test";


describe('ItemRemoved Specification', () => {

    const given = DeciderSpecification.for({
        decide,
        evolve,
        initialState: () => ({})
    });

    it('spec: Item removed', () => {

        const command: RemoveItemCommand = {
            type: 'RemoveItem',
            data: {
                aggregateId: "6db4b24d-30ed-4e88-9d73-e7162207327a",
                itemId: "e82d8f89-3303-4239-87e9-006d2f3fd527",
                productId: "e3407eee-26e8-4cb8-aa31-d10c9cf0f809"
            },
            metadata: {now: new Date()},
        }

        given([])
            .when(command)
            .thenThrows()
    });

});
