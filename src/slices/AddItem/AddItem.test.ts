import {DeciderSpecification} from '@event-driven-io/emmett';
import {AddItemCommand, AddItemState, decide, evolve} from "./AddItemCommand";
import {describe, it} from "node:test";


describe('AddItem Specification', () => {

    const given = DeciderSpecification.for({
        decide,
        evolve,
        initialState: () => ({})
    });

    it('spec: At most 3 Items', () => {

        const command: AddItemCommand = {
            type: 'AddItem',
            data: {
                aggregateId: "8ba5517e-d1fc-42d0-98d2-47dc149ac4ad",
                description: "d53ee0c1-527c-4092-93e7-f15b0faccdee",
                price: 778.2756352441495,
                itemId: "126f3f5d-7168-4df8-865d-649f16bb1ae6",
                name: "b2b66cbf-7e7f-4065-b999-e074260640c6",
                productId: "8eb5f88f-6908-4190-96cf-dc07010e551a"
            },
            metadata: {now: new Date()},
        }

        given([{
            type: 'ItemAdded',
            data: {
                aggregateId: "12896e34-e46d-443e-be53-f21f848986cb",
                description: "59e8f220-c396-4add-8e85-92da408023a1",
                itemId: "3d4003a7-f016-4b91-b1f8-000f5cd7e9d4",
                name: "6938bf15-dac2-42da-8ce2-0a5304e801c7",
                price: 949.6402082920357,
                productId: "6823c039-9705-45c4-9ab1-0939d39e247f"
            },
            metadata: {}
        },
            {
                type: 'ItemAdded',
                data: {
                    aggregateId: "63fed741-cbc5-4849-9cb1-f3238890483e",
                    description: "1187eb80-9c2c-4007-b2e1-824e06957a0c",
                    itemId: "40400595-370a-4a8d-9cad-809a156c63c8",
                    name: "86d6c7d3-28b8-43dd-bcde-59dd633ca031",
                    price: 500.12644575121936,
                    productId: "56b27bdc-2eb3-41e9-9317-f02ebbf2d1ea"
                },
                metadata: {}
            },
            {
                type: 'ItemAdded',
                data: {
                    aggregateId: "bbaf0fb9-f6df-4522-8dec-5b1e11a8caa3",
                    description: "4a240401-1b73-4432-b168-4ff9d1940d7a",
                    itemId: "dbe9e21f-d43e-4821-a046-7317a5e9c934",
                    name: "cb4c7afb-9ce8-4a13-8c0e-bbc1b0e41304",
                    price: 295.91241144774693,
                    productId: "0a2856f3-4536-48a0-a71a-729f048b0f95"
                },
                metadata: {}
            }])
            .when(command)
            .thenThrows()
    });
    it('spec: Add Item', () => {

        const command: AddItemCommand = {
            type: 'AddItem',
            data: {
                aggregateId: "86c6d6c3-b569-465a-b92d-196299646630",
                description: "c15ed334-697a-4fa1-ad3d-e93a7867ee3f",
                price: 210.02554802723995,
                itemId: "6c4db0ed-7435-4411-b379-98a3bbc425cc",
                name: "8463bf18-aade-43c3-9122-061efddfdc04",
                productId: "df7a219b-3235-4be3-9c6a-2101aca16735"
            },
            metadata: {now: new Date()},
        }

        given([])
            .when(command)
            .then([{
                type: 'ItemAdded',
                data: {
                    aggregateId: command.data.aggregateId,
                    description: command.data.description,
                    itemId: command.data.itemId,
                    name: command.data.name,
                    price: command.data.price,
                    productId: command.data.productId
                },
                metadata: {}
            }])
    });

});
