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
                aggregateId: "1bd9481a-1c98-404a-becb-00a91643c2f4",
                orderedProducts: null // todo: handle complex type
            },
            metadata: {now: new Date()},
        }

        given([{
            type: 'CartSubmitted',
            data: {
                aggregateId: "f554d534-9bce-4e30-a7fe-22a2883fb09d",
                orderedProducts: null // todo: handle complex type,
                totalPrice: 175.8275383800142
            },

        },
            {
                type: 'ItemAdded',
                data: {
                    aggregateId: "b458feea-aeb1-43b1-ab16-b3fba6d549be",
                    description: "806cbb52-53b0-47c7-b1d3-8a7f68d9838e",
                    image: "7f8c4a8a-d1a6-4f45-9a40-5f3319648e1e",
                    price: 878.2854601709925,
                    itemId: "98da00c0-18f8-4887-94da-2274ced82bab",
                    productId: "dab02871-e5de-48ec-b382-eb5adfb27abb"
                },

            },
            {
                type: 'CartCreated',
                data: {
                    aggregateId: "2d0c4e3d-ced3-4c1b-bb11-182aef243671"
                },

            }])
            .when(command)
            .thenThrows()
    });
    it('spec:  submit cart without quantity', () => {

        const command: SubmitCartCommand = {
            type: 'SubmitCart',
            data: {
                aggregateId: "6d1bb44a-d8e5-46a2-95dd-e88c6ba727a0",
                orderedProducts: null // todo: handle complex type
            },
            metadata: {now: new Date()},
        }

        given([{
            type: 'InventoryChanged',
            data: {
                inventory: 199,
                productId: "969e8a49-087b-41f3-874c-8e3717a6b9ba"
            },

        },
            {
                type: 'ItemAdded',
                data: {
                    aggregateId: "a975e902-40ed-4248-8734-0e668f7e3c49",
                    description: "5dce8cba-d564-46ed-891e-ecfab59404d0",
                    image: "496ecb16-16fd-4563-89f7-9c01656ec9a7",
                    price: 930.3157618063318,
                    itemId: "f2e12e6b-03a0-4ba6-9e42-7dbfdd73f995",
                    productId: "0815f910-a7c5-4ec5-8659-af23988ee685"
                },

            }])
            .when(command)
            .thenThrows()
    });
    it('spec:  submit empty cart', () => {

        const command: SubmitCartCommand = {
            type: 'SubmitCart',
            data: {
                aggregateId: "eb123abd-b4ba-4cdb-abc1-3cb0a49f0cd3",
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
                aggregateId: "4f6afbdb-e56a-4efd-a218-01086efb8be4",
                orderedProducts: null // todo: handle complex type
            },
            metadata: {now: new Date()},
        }

        given([{
            type: 'ItemAdded',
            data: {
                aggregateId: "bb28170e-aa26-46ff-96b7-970c2d260420",
                description: "59289a60-9825-4d95-acfe-879bebbc8ffc",
                image: "57b1fade-2122-43be-8037-5ee8b1a67eb6",
                price: 815.7568349336884,
                itemId: "8f35af3e-b495-445e-9258-cb7bb46333fb",
                productId: "0f534de7-8010-443d-b97a-d2028b3222fb"
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
