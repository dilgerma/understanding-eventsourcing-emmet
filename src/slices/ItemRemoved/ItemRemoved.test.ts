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
                aggregateId: "70f04f43-3eb8-4c75-843b-c9b7ac6c87c8",
                itemId: "80c19b57-ba46-450b-8d7e-1fa186dc925c",
                productId: "49182329-5d4d-467c-8825-92655afd4acd"
            },
            metadata: {now: new Date()},
        }

        given([])
            .when(command)
            .thenThrows()
    });

});
