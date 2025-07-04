import {DeciderSpecification} from '@event-driven-io/emmett';
import {ArchiveItemCommand, decide, evolve} from "./ArchiveItemCommand";
import {describe, it} from "node:test";


describe('ArchiveItem Specification', () => {

    const given = DeciderSpecification.for({
        decide,
        evolve,
        initialState: () => ({})
    });

    it('spec:  Archive Item Aggregate Test', () => {

        const command: ArchiveItemCommand = {
            type: 'ArchiveItem',
            data: {
                aggregateId: "d5563a8b-14be-4272-bacd-40a9a9ac9f3f",
                productId: "0e0dbb6d-367c-4870-b652-3e64cb766d3b"
            },
            metadata: {now: new Date()},
        }

        given([{
            type: 'ItemAdded',
            data: {
                aggregateId: "a6b5130f-1b78-4cb0-a368-ef41b70a63c0",
                description: "645b8ec1-65d1-42eb-8cd9-f9fb12e7abb5",
                image: "67891d0a-00f0-4eb0-a260-f5061dbc71c4",
                price: 468.7558990015528,
                itemId: "3e23551c-f1d1-47bb-b85a-1e693f24b922",
                productId: "6bd27811-da68-4c4b-b58c-b8199b6daee8"
            },

        },
            {
                type: 'CartCreated',
                data: {
                    aggregateId: "affd0a78-dfdd-47c7-8055-fdb2e77fac60"
                },

            }])
            .when(command)
            .then([{
                type: 'ItemArchived',
                data: {
                    aggregateId: command.data.aggregateId,
                    itemId: command.data.productId
                },
            }])
    });

});
