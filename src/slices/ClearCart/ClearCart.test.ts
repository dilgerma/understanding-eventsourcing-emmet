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
                    aggregateId: "6daaad4e-2868-46b3-84b7-be3f6022fd6f"
                },
                metadata: {now: new Date()},
            }

            given([{
                        type: 'ItemAdded',
                        data: {
                            aggregateId: "32829e93-0ab5-4866-8659-318221c53f5d",
description: "7802b06d-a02b-44a9-885b-09fc3757bf2e",
itemId: "16c18f7d-7b45-467d-a070-9861b04d2c82",
name: "54a7f24a-7a8a-4e97-9a9c-0a40224a2bfd",
price: 274.77041436561865,
productId: "e6ba407d-f28b-47b2-8c83-34c19971bb81"
                        },
                        
                    }])
                .when(command)
                .then([{
                        type: 'CartCleared',
                        data: {
                            			aggregateId:command.data.aggregateId
                        },
                    }])
        });

    });
