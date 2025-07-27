import {DeciderSpecification} from '@event-driven-io/emmett';
import {ClearCartCommand, ClearCartState, decide, evolve} from "./ClearCartCommand";
import {describe, it} from "node:test";


describe('ClearCart Specification', () => {

    const given = DeciderSpecification.for({
        decide,
        evolve,
        initialState: () => ({})
    });

    it('spec: Clear Cart', () => {

        const command: ClearCartCommand = {
            type: 'ClearCart',
            data: {
                aggregateId: "4f77f24d-7a20-48e8-9580-56f983f159ea"
            },
            metadata: {now: new Date()},
        }

        given([{
            type: 'ItemAdded',
            data: {
                aggregateId: "19ffdaa6-c0b8-4270-9958-ebc05d58f43b",
                description: "c193406f-0af4-4f6c-872d-29363127fa8d",
                itemId: "f729ad8a-ad2c-4da0-acde-124926dd2679",
                name: "150c7b67-c29b-41c7-af69-3eb642185ea8",
                price: 494.6287737164241,
                productId: "8bdd93b9-b034-4f11-975d-ccc65a826aed"
            },
            metadata: {}
        }])
            .when(command)
            .then([{
                type: 'CartCleared',
                data: {
                    aggregateId: command.data.aggregateId
                },
                metadata: {}
            }])
    });

});
