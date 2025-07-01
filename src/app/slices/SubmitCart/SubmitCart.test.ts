import {DeciderSpecification} from '@event-driven-io/emmett';
import {decide, evolve, SubmitCartCommand} from "./SubmitCartCommand";
import {describe, it} from "node:test";


describe('SubmitCart Specification', () => {

    const given = DeciderSpecification.for({
        decide,
        evolve,
        initialState: () => ({})
    });

    it('spec:  cannot submit cart twice', () => {

        const command: SubmitCartCommand = {
            type: 'SubmitCart',
            data: {
                aggregateId: "a471bd61-12ff-4d0f-8dd1-7bd4b138ccb6",
                orderedProducts: null // todo: handle complex type
            },
            metadata: {now: new Date()},
        }

        given([{
            type: 'CartSubmitted',
            data: {
                aggregateId: "ccb9cf09-7652-4d05-b2af-d88a911b5418",
                orderedProducts: "productId, price",
                totalPrice: 908.9788473092208
            },
        },
            {
                type: 'ItemAdded',
                data: {
                    aggregateId: "b5181ac8-0483-4d95-bdd3-898cb51b4451",
                    description: "436b69fb-0584-4b60-a457-06983d8fd3ce",
                    image: "e7dc64aa-6feb-4c6c-9255-d775973f7beb",
                    price: 309.5905934566536,
                    itemId: "304080f5-988f-4a7e-8beb-dfa4a0580977",
                    productId: "a8f7f285-336d-4e5e-9da6-111609366b37"
                },
            },
            {
                type: 'CartCreated',
                data: {
                    aggregateId: "4607b177-e4fa-4acc-945d-c3e1a2216b8c"
                },
            }])
            .when(command)
            .thenThrows()
    });
    it('spec:  submit cart without quantity', () => {

        const command: SubmitCartCommand = {
            type: 'SubmitCart',
            data: {
                aggregateId: "c0bc8b64-4945-459b-96c9-798487ab8f1d",
                orderedProducts: null // todo: handle complex type
            },
            metadata: {now: new Date()},
        }

        given([{
            type: 'InventoryChanged',
            data: {
                inventory: 698,
                productId: "e7ef898e-970d-40a0-9feb-6c60fe560558"
            },
        },
            {
                type: 'ItemAdded',
                data: {
                    aggregateId: "fcbab353-d0bd-4484-b5f5-bfb807416d5c",
                    description: "9f1020f9-7a01-4d60-8828-b7dc8b219c99",
                    image: "198daa40-d00a-4c24-af3b-d0fb2019e090",
                    price: 946.2447240455184,
                    itemId: "4cbeb5bf-3449-4a2a-8abc-797bb16e4719",
                    productId: "239f008b-ef1a-4473-96f8-1bde9695b410"
                },
            }])
            .when(command)
            .thenThrows()
    });
    it('spec:  submit empty cart', () => {

        const command: SubmitCartCommand = {
            type: 'SubmitCart',
            data: {
                aggregateId: "a6d1051f-cc9f-4a88-b968-f4a912cca59f",
                orderedProducts: null // todo: handle complex type
            },
            metadata: {now: new Date()},
        }

        given([])
            .when(command)
            .thenThrows()
    });
    it('spec:  submit cart', () => {

        const command: SubmitCartCommand = {
            type: 'SubmitCart',
            data: {
                aggregateId: "41495f69-1adb-4e8e-9ec1-e94443f7b256",
                orderedProducts: null // todo: handle complex type
            },
            metadata: {now: new Date()},
        }

        given([{
            type: 'ItemAdded',
            data: {
                aggregateId: "dfb3ebf0-4a9c-4ca9-81fc-57dfd5949ea6",
                description: "21e4ad1e-0ae5-4b36-b1fc-2fbdd35ccd86",
                image: "8211c2ca-f8c3-495d-a370-23aee5c34c68",
                price: 138.95814270488393,
                itemId: "1e0f9433-2009-4330-a7a3-d1dee938a7fe",
                productId: "baaea789-b6d3-4518-abd0-63c5ede59a44"
            },
        }])
            .when(command)
            .then([{
                type: 'CartSubmitted',
                data: {
                    aggregateId: command.data.aggregateId,
                    orderedProducts: command.data.orderedProducts,
                    totalPrice: command.data.orderedProducts
                },
            }])
    });

});
