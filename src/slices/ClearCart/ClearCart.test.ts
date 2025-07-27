import {DeciderSpecification} from '@event-driven-io/emmett';
import {ClearCartCommand, ClearCartState, decide, evolve} from "./ClearCartCommand";
import {describe, it} from "node:test";



describe('ClearCart Specification', () => {

        const given = DeciderSpecification.for({
            decide,
            evolve,
            initialState: ()=>({})
        });

        it('spec: Clear Cart', () => {

            const command: ClearCartCommand = {
                type: 'ClearCart',
                data: {
                    aggregateId: "a0811f07-2fd8-4995-83d6-d7f9e8821918"
                },
                metadata: {now: new Date()},
            }

            given([{
                        type: 'ItemAdded',
                        data: {
                            aggregateId: "a5947e83-7b2a-4e69-8978-73cf7aacdd2b",
description: "5fab1aa4-a46f-465d-a29e-fecb16de4cb8",
itemId: "459e0d26-a280-44d2-9da4-f321ea4a1d5c",
name: "d7126efe-18b1-40da-9728-2d1d45ecd6c4",
price: 96.81442950942221,
productId: "c436a6b3-d178-4a49-aed8-361173c242ed"
                        },
                        metadata: {}
                    }])
                .when(command)
                .then([{
                        type: 'CartCleared',
                        data: {
                            			aggregateId:command.data.aggregateId
                        },
                        metadata: {}
                    }])
        });

    });
