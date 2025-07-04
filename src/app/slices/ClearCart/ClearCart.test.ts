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
                aggregateId: "6c29960e-67cc-4cc1-aebd-9d497541bb24"
            },
            metadata: {now: new Date()},
        }

        given([{
            type: 'ItemAdded',
            data: {
                aggregateId: "0e33eb6b-7dfa-48d4-bf23-a11249bc688c",
                description: "d1af73e7-8fd3-4605-b0e8-632b5f792bbb",
                image: "4d8982ae-0d01-4b48-9030-0d5547b503b8",
                price: 540.8951320751762,
                itemId: "ed7968c9-9433-45c7-88ec-ece091078db4",
                productId: "5b267341-5992-47e8-962b-0768aa1ced96"
            },

        },
            {
                type: 'CartCreated',
                data: {
                    aggregateId: "a6e13fe7-12ce-42f1-93e4-d21af54f84cd"
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
