import {DeciderSpecification} from '@event-driven-io/emmett';
import {decide, evolve, PublishCartCommand} from "./PublishCartCommand";
import {describe, it} from "node:test";


describe('PublishCart Specification', () => {

    const given = DeciderSpecification.for({
        decide,
        evolve,
        initialState: () => ({})
    });

    it('spec:  publish cart', () => {

        const command: PublishCartCommand = {
            type: 'PublishCart',
            data: {
                aggregateId: "fff124b1-7566-4a26-b088-6773f3b376fd",
                orderedProducts: null // todo: handle complex type,
                totalPrice: 991.5550114952831
            },
            metadata: {now: new Date()},
        }

        given([{
            type: 'CartPublished',
            data: {
                aggregateId: "ba823029-fa8b-455d-96a4-6edd78176660"
            },

        },
            {
                type: 'CartSubmitted',
                data: {
                    aggregateId: "f06fb3ea-b4a3-4698-8988-db3bd2e9d2c3",
                    orderedProducts: null // todo: handle complex type,
                    totalPrice: 212.58408053804322
                },

            },
            {
                type: 'ItemAdded',
                data: {
                    aggregateId: "e32d61aa-46bd-43ea-b388-0a375d4a3833",
                    description: "c47a2af5-cf4b-43e7-bb6f-168ee1ef2840",
                    image: "95ef296d-fe8d-47c6-b14e-3ba5997868e9",
                    price: 252.37173361244425,
                    itemId: "16951a16-c743-4187-9922-7fcddf0b7803",
                    productId: "77e921b3-2991-4146-90b3-bc7ba81a5c1e"
                },

            },
            {
                type: 'CartCreated',
                data: {
                    aggregateId: "6e6d65e6-aeb1-4fc6-a7aa-1e058cb93ffc"
                },

            }])
            .when(command)
            .then([{
                type: 'CartPublicationFailed',
                data: {
                    aggregateId: command.data.aggregateId
                },
            }])
    });

});
