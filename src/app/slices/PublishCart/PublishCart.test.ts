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
                aggregateId: "522dab48-fe29-496a-8348-ec905a83f538",
                orderedProducts: null // todo: handle complex type,
                totalPrice: 439.66349004014813
            },
            metadata: {now: new Date()},
        }

        given([{
            type: 'CartPublished',
            data: {
                aggregateId: "f997c249-02d7-41b1-be5b-81fd8c481ed6"
            },

        },
            {
                type: 'CartSubmitted',
                data: {
                    aggregateId: "4b48a057-2646-4d07-9ce6-62e5a5383f5c",
                    orderedProducts: null // todo: handle complex type,
                    totalPrice: 510.09434164056853
                },

            },
            {
                type: 'ItemAdded',
                data: {
                    aggregateId: "4449cba1-26db-4baf-b5bd-41267ffde056",
                    description: "6754caea-a8bb-4577-afd5-9806e57dd5c4",
                    image: "d1a08da0-f3b4-42cf-a454-7b93053e8c2b",
                    price: 217.52092508410925,
                    itemId: "2579f1fd-1f34-47cb-bd36-5bae92f2f9d5",
                    productId: "174ec6bc-6c4e-4afe-93af-181edda56075"
                },

            },
            {
                type: 'CartCreated',
                data: {
                    aggregateId: "5beace41-1a02-4895-b75d-da40ce7d66d3"
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
