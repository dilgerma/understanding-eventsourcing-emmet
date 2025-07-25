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
                aggregateId: "92187414-0793-4861-a2af-a5ee53bc330b",
                description: "2ee2d7ef-c7c4-46f3-8768-3ae2e638303b",
                price: 634.264155999322,
                itemId: "5eb56888-0115-498b-97b2-594eb09623bb",
                name: "d7a373bb-87f1-48aa-983f-4430c8338a61",
                productId: "cc5caf9c-974c-49ea-b3f8-020c45ee2a31"
            },
            metadata: {now: new Date()},
        }

        given([{
            type: 'ItemAdded',
            data: {
                aggregateId: "399d6e5d-df77-4f78-a221-bccc78b664a3",
                description: "c2d3a0d5-31c4-4908-80c3-78852bc03dcc",
                itemId: "7517f755-ddaa-4cad-8c80-ae94d25eae1a",
                name: "02b9fcf7-93d2-40b6-82ce-a3c63a3481da",
                price: 843.1093173257032,
                productId: "ac58669c-8c08-46f4-807b-9356059cef02"
            },

        },
            {
                type: 'ItemAdded',
                data: {
                    aggregateId: "e2a038c3-0c6e-4270-870d-1436016ab6b0",
                    description: "2a097100-b3a2-40bf-ac7e-d94ee7d6501a",
                    itemId: "4d55b991-fca8-45bc-a221-fbc0a5ff0874",
                    name: "fd75e421-dd1f-45fd-8c9b-21c399b485d1",
                    price: 221.8069197866579,
                    productId: "e51a6854-61bd-41ba-a42d-8c0fb926be92"
                },

            },
            {
                type: 'ItemAdded',
                data: {
                    aggregateId: "71c5c9d4-0753-4d3f-9915-c83eae31f28c",
                    description: "2eae6090-9082-43d9-91ad-9a0a5d832b96",
                    itemId: "5d9cb404-ef5a-4ec1-9663-89de86ec2c9c",
                    name: "cdfa1ffa-6145-4894-97f5-0bc59a282ea9",
                    price: 333.0856237357358,
                    productId: "88b5d410-25f3-4302-8d6b-8f04251b2ff6"
                },

            }])
            .when(command)
            .thenThrows()
    });
    it('spec: Add Item', () => {

        const command: AddItemCommand = {
            type: 'AddItem',
            data: {
                aggregateId: "9b0289e5-b230-4a8f-a8e8-351f2e419410",
                description: "1bb84d69-9a49-4fc5-b30e-514622002765",
                price: 511.71707336216963,
                itemId: "2423d83f-ebc3-424e-8655-c240d4e304e6",
                name: "4e9dfb9e-80da-4147-a245-1a0909db7030",
                productId: "1d86e7fa-3d23-453c-8d8d-e4f4623793d0"
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
            }])
    });

});
