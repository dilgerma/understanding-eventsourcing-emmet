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
                aggregateId: "5b4b9fc0-3db8-4bc8-9cdc-b662f6029abb",
                itemId: "e3010e8d-519b-4c8c-b8ba-8efaa8b93351"
            },
            metadata: {now: new Date()},
        }

        given([{
            type: 'ItemRemoved',
            data: {
                aggregateId: "08570386-2a61-4efb-b7c2-d99ff43d1568",
                itemId: "112d0409-e24f-439d-bd5b-b3261d4e99cc"
            },
        },
            {
                type: 'ItemAdded',
                data: {
                    aggregateId: "25aae78f-7b86-4528-a0f5-d2218da9c66d",
                    description: "d7aa3df0-5658-4c06-ba25-1b0e0d2fbd92",
                    image: "b068a195-a6b1-461b-8de3-9eb454174493",
                    price: 803.1809348996032,
                    itemId: "a1ead63d-8151-412d-b6e9-2eb4cabd0626",
                    productId: "2a85ab89-2a7f-4016-b6bf-a48f96c5a44c"
                },
            },
            {
                type: 'CartCreated',
                data: {
                    aggregateId: "234a7bba-7883-457c-9a04-30233e01a078"
                },
            }])
            .when(command)
            .thenThrows()
    });
    it('spec:  remove item', () => {

        const command: RemoveItemCommand = {
            type: 'RemoveItem',
            data: {
                aggregateId: "3ec0e8bd-d19b-406f-98b5-9634d04e44f5",
                itemId: "a82ffa1d-f545-45bc-8c24-872cfc624426"
            },
            metadata: {now: new Date()},
        }

        given([{
            type: 'ItemAdded',
            data: {
                aggregateId: "40bac7d1-8d3a-4fa2-9162-149749db9bcc",
                description: "a2edf795-8c93-4d43-910b-23421c69d632",
                image: "34415f1e-085c-48a1-adac-5b4276fea607",
                price: 4.745998340397017,
                itemId: "f44d4411-d196-41ba-b252-316572e613a6",
                productId: "e202b752-6cf9-431a-8044-f6ae03dbcf79"
            },
        },
            {
                type: 'CartCreated',
                data: {
                    aggregateId: "2c202af2-7f65-4832-a0e2-1e34cc68105c"
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
