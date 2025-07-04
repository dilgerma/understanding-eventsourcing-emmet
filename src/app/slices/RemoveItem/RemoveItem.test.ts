import {DeciderSpecification} from '@event-driven-io/emmett';
import {decide, evolve, RemoveItemCommand} from "./RemoveItemCommand";
import {describe, it} from "node:test";


describe('RemoveItem Specification', () => {

    const given = DeciderSpecification.for({
        decide,
        evolve,
        initialState: () => ({})
    });

    it('spec:  remove item which was already removed', () => {

        const command: RemoveItemCommand = {
            type: 'RemoveItem',
            data: {
                aggregateId: "f6053460-ee2e-4b72-ac3d-d8307de35f0c",
                itemId: "110545bc-eec8-4b9b-8bf5-1a25eac1829e"
            },
            metadata: {now: new Date()},
        }

        given([{
            type: 'ItemRemoved',
            data: {
                aggregateId: "987eb060-4112-46ab-9cf2-a0a16cd8822b",
                itemId: "a713ccf9-ced0-4086-841c-caf74777e208"
            },

        },
            {
                type: 'ItemAdded',
                data: {
                    aggregateId: "76b6b43f-ac10-48b9-be9e-d7093631501d",
                    description: "06138ab1-82ee-43b7-b93a-2a4915010035",
                    image: "3653b8d1-147f-46c3-8daa-85b07e564703",
                    price: 235.68026067717196,
                    itemId: "d08130a6-06ef-47cc-bab4-8ee8d24c4a97",
                    productId: "a7d065b9-e46f-4c41-8969-3d7a79ce8fb9"
                },

            },
            {
                type: 'CartCreated',
                data: {
                    aggregateId: "cef2480c-74e8-462c-8f0f-20ac3850bfd2"
                },

            }])
            .when(command)
            .thenThrows()
    });
    it('spec:  remove item', () => {

        const command: RemoveItemCommand = {
            type: 'RemoveItem',
            data: {
                aggregateId: "c0658293-9712-4c56-8d4d-284b8091d7aa",
                itemId: "1bc0bd2d-577c-4d58-a577-bbae8ffc85be"
            },
            metadata: {now: new Date()},
        }

        given([{
            type: 'ItemAdded',
            data: {
                aggregateId: "67b42459-a6a4-4b25-893d-ccdbf91c2f26",
                description: "c0923220-e81a-41bf-a2de-463164aad2ed",
                image: "db70bd65-915b-4944-aafa-001856900241",
                price: 893.6561706685311,
                itemId: "3ab12c96-67a4-4b41-83ef-9abd8ae69f0b",
                productId: "7343d3d0-fac4-46dc-af74-8e297e5c42f4"
            },

        },
            {
                type: 'CartCreated',
                data: {
                    aggregateId: "f48d1072-1620-4395-a159-96a0d5035bc3"
                },

            }])
            .when(command)
            .then([{
                type: 'ItemRemoved',
                data: {
                    aggregateId: command.data.aggregateId,
                    itemId: command.data.itemId
                },
            }])
    });

});
