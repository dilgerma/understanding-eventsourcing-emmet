import {DeciderSpecification} from '@event-driven-io/emmett';
import {ClearCartCommand, decide, evolve} from "./ClearCartCommand";
import {describe, it} from "node:test";


describe('ClearCart Specification', () => {

    const given = DeciderSpecification.for({
        decide,
        evolve,
        initialState: () => ({})
    });

    it('spec:  clear cart', () => {

        const command: ClearCartCommand = {
            type: 'ClearCart',
            data: {
                aggregateId: "54918d2b-0baa-428c-be52-1c2c1f611465"
            },
            metadata: {now: new Date()},
        }

        given([{
            type: 'ItemAdded',
            data: {
                aggregateId: "33a9a108-6d68-4b8b-916b-9e57784d2340",
                description: "374316b1-69c3-410c-81f1-30cb327ee4b5",
                image: "3abf0b69-aabc-4804-bd3a-75f4b1dca2d3",
                price: 679.7721995849628,
                itemId: "2add7110-719e-4cf8-aa1c-6cb50e768dc9",
                productId: "bf169e46-bf88-44ff-a611-e71be78570d6"
            },

        },
            {
                type: 'CartCreated',
                data: {
                    aggregateId: "bb8bc94b-e4e1-45b0-af7b-407427508977"
                },

            }])
            .when(command)
            .then([{
                type: 'CartCleared',
                data: {
                    aggregateId: command.data.aggregateId
                },
            }])
    });

});
