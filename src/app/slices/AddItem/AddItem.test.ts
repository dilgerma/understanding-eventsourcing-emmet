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
                aggregateId: "06eabb7e-0b8f-4a4d-81db-593e0bcdc7c8",
                description: "10c90f37-f280-4d8d-8daa-62ab5e4b2da6",
                image: "c2b0f704-5a51-4b13-a10c-9eb236421762",
                price: 743.6019057009856,
                itemId: "9dc34c7f-bb62-4925-8079-c14ac994500c",
                productId: "40d21cac-f9f6-482a-8acd-28f2fa01557c"
            },
            metadata: {now: new Date()},
        }

        given([{
            type: 'ItemAdded',
            data: {
                aggregateId: "7ea48213-19b5-431f-9f2b-232fd1eff0a5",
                description: "a5cbc6e9-b652-4367-b677-5748e5bfa6ab",
                image: "01e133b6-1e2f-4e0a-b195-7b68f9731d0c",
                price: 997.4272727127849,
                itemId: "d98a259f-a48c-4321-87ea-9fe5c86cfa9f",
                productId: "99e132af-8a3a-4ff6-bb4a-c325f65246a8"
            },
        },
            {
                type: 'ItemAdded',
                data: {
                    aggregateId: "8e308ee4-626d-47ba-8584-22f1819c86e6",
                    description: "ad5997e3-72d6-490c-bcbe-4cc2d0ac6d59",
                    image: "10f05436-cf14-4294-9894-be10d549493f",
                    price: 347.6433874836683,
                    itemId: "8d50538f-0d06-40cf-b824-21e087a94147",
                    productId: "a900340f-63ba-4b71-aca9-8b66a819261e"
                },
            },
            {
                type: 'ItemAdded',
                data: {
                    aggregateId: "14f22cd0-aa9d-4638-b6bf-22a5b9b31648",
                    description: "382915c0-51ed-4671-93eb-ddc34664df0b",
                    image: "78233aa8-26a0-4425-b672-68f28305992a",
                    price: 850.2487530967766,
                    itemId: "d7644d6c-533e-47eb-aa29-2f0225486d40",
                    productId: "88b7358b-ca6a-4af8-98f0-9ad76fb89877"
                },
            },
            {
                type: 'CartCreated',
                data: {
                    aggregateId: "471fa569-a16b-4505-99d2-9d36f510733f"
                },
            }])
            .when(command)
            .thenThrows()
    });
    it('spec:  add item', () => {

        const command: AddItemCommand = {
            type: 'AddItem',
            data: {
                aggregateId: "bf69adb4-e70a-4a4b-916a-ad3d2fea1cd1",
                description: "578c4466-9c56-4c0c-975a-438be12b8f34",
                image: "52ec6e2d-0e17-4657-ab0a-1ce0e2f0bdff",
                price: 718.8264398492672,
                itemId: "3e33388d-d450-46e1-a540-e3e4939564a1",
                productId: "5b4875bc-e728-4e66-99e8-89fa288a88fd"
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
                aggregateId: "6c708452-6880-432c-82f7-ba01d27c5c20",
                description: "2f94d163-b899-4b53-a3b7-3ccfcd2d899f",
                image: "80444f9e-3288-47bb-b292-8c0b3fc7b698",
                price: 331.88035588460787,
                itemId: "8cafecbe-0805-4549-8cce-1ec616c61e72",
                productId: "bd7fafc1-2c75-4b01-98e3-1bfd9c87022a"
            },
            metadata: {now: new Date()},
        }

        given([{
            type: 'InventoryChanged',
            data: {
                inventory: 615,
                productId: "79b24a42-c692-4e54-94c8-0976d34d6c0d"
            },
        }])
            .when(command)
            .thenThrows()
    });

});
