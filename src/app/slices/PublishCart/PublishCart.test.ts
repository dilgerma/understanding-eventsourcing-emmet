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
                aggregateId: "a96204f9-196f-4c28-b417-3ecdf79d7a1a",
                orderedProducts: "productId, price",
                totalPrice: 222.2120656175678
            },
            metadata: {now: new Date()},
        }

        given([{
            type: 'CartPublished',
            data: {
                aggregateId: "60c1eabc-701d-4834-abad-0a571463cc5c"
            },
        },
            {
                type: 'CartSubmitted',
                data: {
                    aggregateId: "ebf51f26-be7d-4803-9e43-9a5dfea53cdf",
                    orderedProducts: "productId, price",
                    totalPrice: 534.9482984792326
                },
            },
            {
                type: 'ItemAdded',
                data: {
                    aggregateId: "825a1672-be7b-4dd7-8a0e-00673ae18326",
                    description: "8a12b3a4-f29c-4fbf-8a5a-b9886ce286ea",
                    image: "21a0ae71-0789-454f-8286-9385ed12a1a7",
                    price: 997.8100431046518,
                    itemId: "20a8e3f1-7bbf-4d9b-af0d-0c3add027b30",
                    productId: "5022f50c-6264-4123-9960-a70cffd98c5d"
                },
            },
            {
                type: 'CartCreated',
                data: {
                    aggregateId: "4df1ce9b-c7da-45b8-821d-5151516076c1"
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
