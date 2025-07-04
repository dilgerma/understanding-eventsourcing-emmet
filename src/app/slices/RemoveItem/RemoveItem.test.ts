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
                aggregateId: "e9963cfe-2906-452c-8249-4de647c8acd6",
                itemId: "b208a9e2-6bdf-4e2a-b87f-cc9a8c754da2"
            },
            metadata: {now: new Date()},
        }

        given([{
            type: 'ItemRemoved',
            data: {
                aggregateId: "a998c0a9-c443-42a1-afe4-6e8035399ee3",
                itemId: "e2e6cec9-d463-469d-9b20-2457d6b65f6b"
            },

        },
            {
                type: 'ItemAdded',
                data: {
                    aggregateId: "bc46f5e3-f15f-49e1-9e57-cca4829cf901",
                    description: "8e913ced-3b03-4211-b91f-ade4fae3763e",
                    image: "a0199e75-79e5-4ca6-9811-23c382485f6f",
                    price: 636.0114793496871,
                    itemId: "a4e53bb9-72bf-4f27-8654-27883c885123",
                    productId: "96d92dc9-4568-4223-8e9f-95d88a7f6250"
                },

            },
            {
                type: 'CartCreated',
                data: {
                    aggregateId: "70871887-23c6-4aaa-a336-68a227b44e4b"
                },

            }])
            .when(command)
            .thenThrows()
    });
    it('spec:  remove item', () => {

        const command: RemoveItemCommand = {
            type: 'RemoveItem',
            data: {
                aggregateId: "ee10f51f-ea2f-4aeb-b6d1-cdd34c712a31",
                itemId: "df150b5d-2fa4-46f0-a843-6060b1af269e"
            },
            metadata: {now: new Date()},
        }

        given([{
            type: 'ItemAdded',
            data: {
                aggregateId: "32a609e5-549d-49ef-b0a3-d3e5f0e75272",
                description: "13e7ec81-46d9-4411-9fb5-f4c53fffafc3",
                image: "f43ed674-805a-4c12-a49c-4a223122daa0",
                price: 851.4552108723178,
                itemId: "3f9acf29-63ee-4219-8eae-94019637c2ed",
                productId: "ad5baf4f-821b-4533-8365-90ada4535b0d"
            },

        },
            {
                type: 'CartCreated',
                data: {
                    aggregateId: "53778285-407d-4137-86d2-7b7575fa204e"
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
