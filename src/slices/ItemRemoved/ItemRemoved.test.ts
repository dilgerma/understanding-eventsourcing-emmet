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
                    aggregateId: "26578883-74f6-4c55-97d6-e42f52d810ce",
itemId: "6d85a167-4d55-4844-a62b-f735a580f485",
productId: "2b66a45b-0232-4e37-9f69-082cb98976c1"
                },
                metadata: {now: new Date()},
            }

            given([])
                .when(command)
                .thenThrows()
        });

    });
