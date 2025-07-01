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
                aggregateId: "559365a8-bbc6-48ab-b290-df0cd11f97d4"
            },
            metadata: {now: new Date()},
        }

        given([{
            type: 'ItemAdded',
            data: {
                aggregateId: "1b4c21f3-5a81-4291-bdb6-4d91ac5bf8d7",
                description: "88b19f7d-bffb-4245-bfc4-b76b1fd85ca5",
                image: "b2e699bf-30c7-4eda-b1bf-303f4bf5b1d7",
                price: 839.5373943526947,
                itemId: "9e7037d9-f3da-4b94-b9a4-937647f4233f",
                productId: "48fe30bd-ac42-4714-9e4e-1a8e4d79381e"
            },
        },
            {
                type: 'CartCreated',
                data: {
                    aggregateId: "b46f3f0d-638e-453c-ab6c-5207ef0b6125"
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
