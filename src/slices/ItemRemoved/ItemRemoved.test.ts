import {DeciderSpecification} from '@event-driven-io/emmett';
import {RemoveItemCommand, RemoveItemState, decide, evolve} from "./RemoveItemCommand";
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
                    aggregateId: "9ce13152-745a-4190-a699-5c7ec0abc464",
itemId: "132866be-fb12-4759-9535-ec681265d07d",
productId: "ed3f7640-6171-4a94-bda0-91e20b788954"
                },
                metadata: {now: new Date()},
            }

            given([])
                .when(command)
                .thenThrows()
        });

    });
