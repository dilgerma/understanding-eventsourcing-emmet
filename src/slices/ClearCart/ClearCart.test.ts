import {DeciderSpecification} from '@event-driven-io/emmett';
import {ClearCartCommand, ClearCartState, decide, evolve} from "./ClearCartCommand";
import {describe, it} from "node:test";


describe('ClearCart Specification', () => {

    const given = DeciderSpecification.for({
        decide,
        evolve,
        initialState: () => ({})
    });

    it('spec: Clear Cart', () => {

        const command: ClearCartCommand = {
            type: 'ClearCart',
            data: {
                aggregateId: "6f5df778-c5f0-4521-aba7-e70199009313"
            },
            metadata: {now: new Date()},
        }

        given([{
            type: 'ItemAdded',
            data: {
                aggregateId: "1465a457-e72e-4bb4-985e-21fe5a7083da",
                description: "d36d7170-2d1d-4d58-9c83-53d56290946d",
                itemId: "66131554-bc2b-4619-b723-4b35ddf6d9f8",
                name: "7718b9dc-6a23-44a5-8565-9036edba4bc4",
                price: 271.1610492896344,
                productId: "fab20ce2-deeb-4b31-8e66-411f22091af8"
            },
            metadata: {}
        }])
            .when(command)
            .then([{
                type: 'CartCleared',
                data: {
                    aggregateId: command.data.aggregateId
                },
                metadata: {}
            }])
    });

});
