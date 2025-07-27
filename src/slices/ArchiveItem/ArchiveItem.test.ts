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
                aggregateId: "bc9d83f0-11b0-4757-b518-2dcb9d03ef4b",
                itemId: "f74bdd40-6728-4438-a387-a52773ebd570",
                productId: "4b8e76e6-dedd-458b-8daf-45d3038674d3"
            },
            metadata: {now: new Date()},
        }

        given([{
            type: 'PriceChanged',
            data: {
                productId: "5a5b7bb2-12fa-4abb-badb-4941b1c7d781",
                price: 373.0103096600805
            },
            metadata: {}
        },
            {
                type: 'ItemAdded',
                data: {
                    aggregateId: "3fc789a4-1540-4e0d-924d-a4af0e5f0540",
                    description: "4398f1b6-956c-4625-9488-26458300e6f0",
                    itemId: "1560d832-0c47-407f-a114-de83b0e04ad2",
                    name: "8094346d-75d6-483d-a9b8-8fc72f0786bd",
                    price: 309.12542433683467,
                    productId: "29927396-7a12-4365-a6c7-f3f24577c999"
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
