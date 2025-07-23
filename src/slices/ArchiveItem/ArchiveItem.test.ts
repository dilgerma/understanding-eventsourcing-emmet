import {DeciderSpecification} from '@event-driven-io/emmett';
import {ArchiveItemCommand, decide, evolve} from "./ArchiveItemCommand";
import {describe, it} from "node:test";


describe('ArchiveItem Specification', () => {

    const given = DeciderSpecification.for({
        decide,
        evolve,
        initialState: () => ({})
    });

    it('spec: Archive Item', () => {

        const command: ArchiveItemCommand = {
            type: 'ArchiveItem',
            data: {
                aggregateId: "b40cf55d-286c-4044-8b11-7ca81b8befa6",
                itemId: "ab5f20e1-121c-409e-a8ed-18095369469c",
                productId: "2543f007-9afe-4142-b318-2ba70d016963"
            },
            metadata: {now: new Date()},
        }

        given([{
            type: 'PriceChanged',
            data: {
                productId: "69c78633-6815-4336-a883-b231ca8a3ef4",
                price: 764.9032739793748
            },

        },
            {
                type: 'ItemAdded',
                data: {
                    aggregateId: "d8612783-3d4a-4bdc-85a4-29edc598a9dd",
                    description: "a055d47e-45c7-4e9d-80bb-610eb9d1c3b8",
                    itemId: "7cafeceb-142b-4233-b417-1b904d52ce43",
                    name: "3859c0e4-d121-43a5-94b0-a8fb829aa1e4",
                    price: 755.5578840024531,
                    productId: "58caefc2-86f3-4f42-94f0-242ce70f5bbe"
                },

            }])
            .when(command)
            .then([{
                type: 'ItemArchived',
                data: {
                    aggregateId: command.data.aggregateId,
                    productId: command.data.productId,
                    itemId: command.data.itemId
                },
            }])
    });

});
