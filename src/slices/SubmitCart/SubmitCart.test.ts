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
                aggregateId: "4591fed6-5aae-469d-a115-02cbb99f68d2"
            },
            metadata: {now: new Date()},
        }

        given([{
            type: 'InventoryUpdated',
            data: {
                inventory: 897,
                productId: "b913bd04-5855-4204-a8a4-bdda52cccea9"
            },
            metadata: {}
        },
            {
                type: 'ItemAdded',
                data: {
                    aggregateId: "6767fc5a-3131-4bcd-98ea-ee5cd387d145",
                    description: "c9e2d040-b54c-40f7-bf18-1ec3180151d2",
                    itemId: "448cb5cd-aa33-4f17-9428-b6d88e79a581",
                    name: "a09020f9-3c76-4d4c-ac5a-d5c263074346",
                    price: 470.541336980852,
                    productId: "3ac077c0-025a-4315-afac-ddeb21c6943e"
                },
                metadata: {}
            }])
            .when(command)
            .thenThrows()
    });

});
