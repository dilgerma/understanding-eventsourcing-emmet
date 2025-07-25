import {DeciderSpecification} from '@event-driven-io/emmett';
import {SubmitCartCommand, SubmitCartState, decide, evolve} from "./SubmitCartCommand";
import {describe, it} from "node:test";



describe('SubmitCart Specification', () => {

        const given = DeciderSpecification.for({
            decide,
            evolve,
            initialState: ()=>({})
        });

        it('spec: submit cart items without inventory', () => {

            const command: SubmitCartCommand = {
                type: 'SubmitCart',
                data: {
                    aggregateId: "5b1fc325-825a-415d-8e83-51c69cc17f2f"
                },
                metadata: {now: new Date()},
            }

            given([{
                        type: 'InventoryUpdated',
                        data: {
                            inventory: 40,
productId: "2ab3476c-3108-40ff-81ed-fc0b620b7cf9"
                        },
                        
                    },
{
                        type: 'ItemAdded',
                        data: {
                            aggregateId: "73eb290a-8c2f-4231-8110-1238b3932b0f",
description: "0238e139-677b-4700-a0ba-e1a7449fcd46",
itemId: "7e95a5b5-031e-4dee-b902-3b1210f07f2c",
name: "1a176bfb-645b-40e5-891b-839b1c7ce0ac",
price: 30.511301376136224,
productId: "a15793a0-87b0-4ce1-a19d-dfd827e1f165"
                        },
                        
                    }])
                .when(command)
                .thenThrows()
        });

    });
