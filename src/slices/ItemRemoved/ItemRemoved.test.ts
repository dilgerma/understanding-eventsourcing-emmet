import {DeciderSpecification} from '@event-driven-io/emmett';
import {decide, evolve, RemoveItemCommand} from "./RemoveItemCommand";
import {describe, it} from "node:test";


describe('ItemRemoved Specification', () => {

        const given = DeciderSpecification.for({
            decide,
            evolve,
            initialState: ()=>({})
        });

        it('spec: Item removed', () => {

            const command: RemoveItemCommand = {
                type: 'RemoveItem',
                data: {
                    aggregateId: "aef3e953-03cf-4c0c-be69-dbecaf696384",
itemId: "5bd0dc3f-3c1a-4dce-8079-4250ea0c5421",
productId: "23ea5c2c-9ede-4873-a669-027d90f9d84b"
                },
                metadata: {now: new Date()},
            }

            given([])
                .when(command)
                .thenThrows()
        });

    });
