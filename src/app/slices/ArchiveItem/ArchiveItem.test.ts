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
                aggregateId: "6f93031c-3b75-49c5-9720-49b88cfe4768",
                productId: "6691c6be-7f9b-4836-9afc-ee77c6fbf847"
            },
            metadata: {now: new Date()},
        }

        given([{
            type: 'ItemAdded',
            data: {
                aggregateId: "a2a5679e-c5e8-4d8d-b39d-7be632a21ce2",
                description: "d1ed74ef-79b4-4c6d-a901-592cbdce3249",
                image: "8f504951-5309-4a56-9f50-6fc5e0e91f68",
                price: 527.1969914089321,
                itemId: "8d506e41-4300-4904-8c66-25d03f780a5c",
                productId: "37dde0d9-4f79-4e3f-8e53-2d1e3719858c"
            },
        },
            {
                type: 'CartCreated',
                data: {
                    aggregateId: "a09a9208-f532-45ff-b043-7599ff3f13ce"
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
