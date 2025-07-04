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
                aggregateId: "4540d92f-635b-4cff-982f-707c643185af",
                description: "df0ae01e-663c-4601-83a0-6d93404cabc7",
                image: "6509e945-6f2d-47d4-8c51-66e5aaed864d",
                price: 532.8143168049694,
                itemId: "d2a589c5-0131-45c2-a270-ddb37482b0ae",
                productId: "fee93991-dad9-43bf-bb81-d026b8c4016f"
            },
            metadata: {now: new Date()},
        }

        given([{
            type: 'ItemAdded',
            data: {
                aggregateId: "d69acfd9-41bf-494f-9e54-43cdadf67452",
                description: "024d2124-fd99-4b2a-a14b-b6b5a0686128",
                image: "dafd5689-0768-4d8c-b2d5-c4cca0fba349",
                price: 288.05005399999686,
                itemId: "b441715f-0d79-4316-af0d-5518b62a0947",
                productId: "98baa952-3995-4857-b63c-e6a0a33614fd"
            },

        },
            {
                type: 'ItemAdded',
                data: {
                    aggregateId: "ed890b63-cb97-4f4d-85fc-b9bb2af9e6fa",
                    description: "7f3ebb32-47a1-4a4e-8bcb-e08ba79a40eb",
                    image: "73d91e5c-22f8-4c8f-a1c6-188110e7e08c",
                    price: 213.30689976461792,
                    itemId: "8b95e76a-7162-41e1-8b71-716f0094716c",
                    productId: "11ddddc0-285c-4b04-bf9b-7c03005c3a98"
                },

            },
            {
                type: 'ItemAdded',
                data: {
                    aggregateId: "ed840b5d-1153-4f16-bf6c-5d81c27e9852",
                    description: "68a08247-e381-4f2c-b2c8-137ae9a828e3",
                    image: "19743da1-748f-4c96-aafe-b1f5c99a2edc",
                    price: 924.1305085398371,
                    itemId: "5e6f5382-8136-4ad0-af32-e92cf0597837",
                    productId: "f4cc38dd-ee5b-40c7-a706-ef7945cdf93b"
                },

            },
            {
                type: 'CartCreated',
                data: {
                    aggregateId: "76800872-a30b-43fd-9e41-881eae871971"
                },

            }])
            .when(command)
            .thenThrows()
    });
    it('spec:  add item', () => {

        const command: AddItemCommand = {
            type: 'AddItem',
            data: {
                aggregateId: "476a6e0b-4789-4a8a-95c2-d980b470dced",
                description: "ef87a975-ae6f-4480-b6e7-9cf913911ad7",
                image: "589ff5ff-b154-484f-af41-31199eca5330",
                price: 713.6263161533888,
                itemId: "84f8491a-d43d-4f29-9cd7-b26371641bad",
                productId: "0e19fcf4-736f-4e53-bb4a-4e4ee625d62b"
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
                aggregateId: "34ee4102-110d-4650-9261-5976de429b1f",
                description: "cb0e4678-e231-440d-91cb-84c709eff850",
                image: "e4e03e1c-e5f0-4a05-b559-21e4b4df70db",
                price: 861.1677318526162,
                itemId: "5d2225c7-4b8d-4165-9bd0-8516a490a619",
                productId: "5402c775-fd55-4de5-ae74-bf48530835bd"
            },
            metadata: {now: new Date()},
        }

        given([{
            type: 'InventoryChanged',
            data: {
                inventory: 521,
                productId: "4e0703d9-4743-4e75-a4a8-8670ddc32e26"
            },

        }])
            .when(command)
            .thenThrows()
    });

});
