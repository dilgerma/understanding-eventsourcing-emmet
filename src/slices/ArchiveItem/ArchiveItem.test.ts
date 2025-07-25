import {DeciderSpecification} from '@event-driven-io/emmett';
import {ArchiveItemCommand, ArchiveItemState, decide, evolve} from "./ArchiveItemCommand";
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
                aggregateId: "1ff4b2df-360f-4b59-96c8-ec6b0a95a68b",
                itemId: "8f46640f-1e8b-4a7e-9909-48690a72e930",
                productId: "e9e99eeb-2cd1-43d0-a33c-a0c29b7ce879"
            },
            metadata: {now: new Date()},
        }

        given([{
            type: 'PriceChanged',
            data: {
                productId: "fcd017c5-456f-47c3-990e-89c8bf530e29",
                price: 341.3028820651456
            },
            metadata: {}
        },
            {
                type: 'ItemAdded',
                data: {
                    aggregateId: "5b8ff3a4-6de5-4833-8a13-c7936b31c725",
                    description: "58ee121b-af6c-4fae-9cc2-65e260ffd15b",
                    itemId: "55132380-0c20-4b2b-8711-c0c35da26a39",
                    name: "fc11b960-893c-4f29-ae21-077c9290e33c",
                    price: 919.6755629597708,
                    productId: "c81b696b-4a02-4434-a1df-13cef75685ce"
                },
                metadata: {}
            }])
            .when(command)
            .then([{
                type: 'ItemArchived',
                data: {
                    aggregateId: command.data.aggregateId,
                    productId: command.data.productId,
                    itemId: command.data.itemId
                },
                metadata: {}
            }])
    });

});
