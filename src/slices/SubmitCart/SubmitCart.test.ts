import {DeciderSpecification} from '@event-driven-io/emmett';
import {SubmitCartCommand, SubmitCartState, decide, evolve} from "./SubmitCartCommand";
import {describe, it} from "node:test";


describe('SubmitCart Specification', () => {

    const given = DeciderSpecification.for({
        decide,
        evolve,
        initialState: () => ({})
    });

    it('spec: submit cart items without inventory', () => {

        const command: SubmitCartCommand = {
            type: 'SubmitCart',
            data: {
                aggregateId: "40a64a11-50c3-43ad-9821-f85b70b2600a"
            },
            metadata: {now: new Date()},
        }

        given([{
            type: 'InventoryUpdated',
            data: {
                inventory: 677,
                productId: "1d7a28ed-c567-45ed-b137-9c8aca1edd7d"
            },
            metadata: {}
        },
            {
                type: 'ItemAdded',
                data: {
                    aggregateId: "f13a97ee-8b4e-4a9d-b494-114c065339e6",
                    description: "17c327fe-6f07-4406-aaf9-97004025dace",
                    itemId: "651e7f23-501a-4878-9444-9ff3f02007fb",
                    name: "64efcc7b-aee4-47be-85a3-256641b9b5d7",
                    price: 341.61616179284704,
                    productId: "5e16941b-b4c4-4dc2-b2bf-65c0fc3033a0"
                },
                metadata: {}
            }])
            .when(command)
            .thenThrows()
    });

});
