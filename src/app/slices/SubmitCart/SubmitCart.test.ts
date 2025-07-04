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
                aggregateId: "4729b77b-cd97-4726-b31f-81271b698d0c",
                orderedProducts: null // todo: handle complex type
            },
            metadata: {now: new Date()},
        }

        given([{
            type: 'CartSubmitted',
            data: {
                aggregateId: "7219e75b-a445-40ed-aa21-44c42341dfbb",
                orderedProducts: null // todo: handle complex type,
                totalPrice: 494.777030031587
            },

        },
            {
                type: 'ItemAdded',
                data: {
                    aggregateId: "b33796ff-16ae-469e-9477-22f2d8006896",
                    description: "535131bb-f2c9-4f50-a416-bdebd0a725a3",
                    image: "aee00b16-56ee-4b7d-83f3-589f5d3a57a9",
                    price: 240.3176106393008,
                    itemId: "daba039f-a290-43f3-816b-011dc5ce6f2b",
                    productId: "ea50026b-e495-426f-8272-6d0d7b3aae81"
                },

            },
            {
                type: 'CartCreated',
                data: {
                    aggregateId: "501eed96-b997-4dd3-b23d-2b70d4c9ca41"
                },

            }])
            .when(command)
            .thenThrows()
    });
    it('spec:  submit cart without quantity', () => {

        const command: SubmitCartCommand = {
            type: 'SubmitCart',
            data: {
                aggregateId: "11ede65d-b47e-47e4-a7af-3d29cf3b2111",
                orderedProducts: null // todo: handle complex type
            },
            metadata: {now: new Date()},
        }

        given([{
            type: 'InventoryChanged',
            data: {
                inventory: 513,
                productId: "08bdb846-be83-4cb0-bf6e-3f5c49301083"
            },

        },
            {
                type: 'ItemAdded',
                data: {
                    aggregateId: "4c242f61-1db6-41e5-b201-ed74b6ad2375",
                    description: "fb174410-0efb-48b1-b27a-385c23af0285",
                    image: "5c2e2afc-422a-4bd1-97df-9455c5712106",
                    price: 176.8873425255577,
                    itemId: "d5512583-8dbf-489d-a94c-1db318e5e190",
                    productId: "2dfdb271-812f-43df-a23c-7b2f106b1dbf"
                },

            }])
            .when(command)
            .thenThrows()
    });
    it('spec:  submit empty cart', () => {

        const command: SubmitCartCommand = {
            type: 'SubmitCart',
            data: {
                aggregateId: "5de5db34-19cb-406e-83be-64adfb28ac72",
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
                aggregateId: "6e69fa3e-6626-4e94-a45e-9c7ac1b426a6",
                orderedProducts: null // todo: handle complex type
            },
            metadata: {now: new Date()},
        }

        given([{
            type: 'ItemAdded',
            data: {
                aggregateId: "ddd74a36-bc15-4398-96c4-061f8f4d832f",
                description: "4569c531-fa4f-4ce1-98bf-2ceff6ec4b59",
                image: "464e38fe-1dc5-4055-aa14-2fa9d2bd07fb",
                price: 417.6586784382354,
                itemId: "fbabdf26-9f05-45e1-9bfe-130efe8702d2",
                productId: "d29f2608-3890-49f8-8c72-65c99d528fbd"
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
