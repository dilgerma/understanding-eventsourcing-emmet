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
                aggregateId: "51ab027f-4f7f-4046-b33f-2c4b7102ce95",
                productId: "04be5a68-6f8e-4540-9ca7-812fc247dc53"
            },
            metadata: {now: new Date()},
        }

        given([{
            type: 'ItemAdded',
            data: {
                aggregateId: "15b3762d-fe44-42a3-a403-798bf1057ac7",
                description: "af1ddc9f-4ed0-445f-a3e4-b06b5817e150",
                image: "69ba6e06-3be2-40b1-953d-495dfdbce376",
                price: 633.4583248415256,
                itemId: "45c8e394-c8dc-48ca-a04d-8566f5235dc4",
                productId: "97af0aba-e6b0-455e-ac75-6aa30630d723"
            },

        },
            {
                type: 'CartCreated',
                data: {
                    aggregateId: "2a721614-af5a-4fb3-b445-ea1bbdc96880"
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
