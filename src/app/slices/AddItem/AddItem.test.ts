import {DeciderSpecification} from '@event-driven-io/emmett';
import {AddItemCommand, decide, evolve} from "./AddItemCommand";
import {describe, it} from "node:test";


describe('AddItem Specification', () => {

    const given = DeciderSpecification.for({
        decide,
        evolve,
        initialState: () => ({})
    });

    it('spec:  add item max 3 items', () => {

        const command: AddItemCommand = {
            type: 'AddItem',
            data: {
                aggregateId: "ba7f6a85-2a5e-4a18-bdd5-c53496847d56",
                description: "66cd7123-ee28-4eed-872e-d28cbb4325cf",
                image: "853a5dda-d313-472f-8319-f0fd5a561c65",
                price: 39.855128636614,
                itemId: "fcf78b85-07be-4abb-92c6-e362dc10077b",
                productId: "2ebd48ad-ec87-4f46-8829-1dbbf6747073"
            },
            metadata: {now: new Date()},
        }

        given([{
            type: 'ItemAdded',
            data: {
                aggregateId: "85830363-4fa5-4529-9b4b-52bbcada0036",
                description: "8bf2ef32-d86b-4240-b655-c5ab4635efcb",
                image: "e2e16b2d-5f64-437d-8371-93eb908ef851",
                price: 70.02561534851348,
                itemId: "4807342c-7f61-4dbf-a64f-33aa55b43866",
                productId: "0f975ab8-82da-48bd-a9d3-4f215080e43d"
            },

        },
            {
                type: 'ItemAdded',
                data: {
                    aggregateId: "6dbf1f60-5ccb-435e-a5a2-68a136a691b8",
                    description: "5e6c4d2c-a8f5-4258-90b8-e8941a26e1aa",
                    image: "23a8a93a-4af6-4217-b059-5e9fcab517c1",
                    price: 746.3181786305908,
                    itemId: "30f1492c-8e22-4162-9c16-831c6629cea2",
                    productId: "6924055b-0a21-42f0-8808-4edb630499ba"
                },

            },
            {
                type: 'ItemAdded',
                data: {
                    aggregateId: "f042e76b-9050-4933-9630-40a3df56a0d4",
                    description: "a51f5587-8524-42e9-83cd-69e7f73b80d5",
                    image: "5bcd4aa9-17a1-4ce7-ba5a-1a7a978ea055",
                    price: 662.4966894645663,
                    itemId: "c49bebb7-60d5-432a-89e5-e0dcbfe2e5ab",
                    productId: "e5e48947-eb6e-43ed-ab21-446cc25dc4b4"
                },

            },
            {
                type: 'CartCreated',
                data: {
                    aggregateId: "7aa8dfe7-85f3-4462-be73-1c286ca666ee"
                },

            }])
            .when(command)
            .thenThrows()
    });
    it('spec:  add item', () => {

        const command: AddItemCommand = {
            type: 'AddItem',
            data: {
                aggregateId: "39bf4b9f-bc43-4cd6-9721-bef1e843ef92",
                description: "7232e02c-fa86-44fb-9a7e-b17f18dfda6c",
                image: "d3a53bfa-838b-4416-bb9b-0c681c02861e",
                price: 680.7434227429163,
                itemId: "51557ca8-f953-413b-aa3d-7825f8f09a69",
                productId: "945fc55b-3bc5-4fbf-a94d-55fb59151bd1"
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
                    image: command.data.image,
                    price: command.data.price,
                    itemId: command.data.itemId,
                    productId: command.data.productId
                },
            },
                {
                    type: 'CartCreated',
                    data: {
                        aggregateId: command.data.aggregateId
                    },
                }])
    });
    it('spec:  add item with empty inventory', () => {

        const command: AddItemCommand = {
            type: 'AddItem',
            data: {
                aggregateId: "b9d7bb07-f5f9-4002-a6f1-57054c668c81",
                description: "6300611f-3e18-4cad-9ff5-d4068be28628",
                image: "e608ba97-16a0-4810-81e3-264b9b934b19",
                price: 969.7690008298796,
                itemId: "19a60b77-8f94-48ec-ad64-87059af0d879",
                productId: "dcd4fd84-9f9d-486c-92de-926088ea8bb9"
            },
            metadata: {now: new Date()},
        }

        given([{
            type: 'InventoryChanged',
            data: {
                inventory: 585,
                productId: "e9550c6a-533f-4664-b8a6-e9bb70a6ace7"
            },

        }])
            .when(command)
            .thenThrows()
    });

});
