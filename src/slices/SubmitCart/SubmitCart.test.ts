import {DeciderSpecification} from '@event-driven-io/emmett';
import {decide, evolve, SubmitCartCommand} from "./SubmitCartCommand";
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
                    aggregateId: "aa4342bc-46bd-4dda-8c53-d2b0a83ecc69"
                },
                metadata: {now: new Date()},
            }

            given([{
                        type: 'InventoryUpdated',
                        data: {
                            inventory: 454,
productId: "2a11becd-014f-4a25-8736-6b6b50c98105"
                        },
                        
                    },
{
                        type: 'ItemAdded',
                        data: {
                            aggregateId: "5b2052f5-b0d7-4a12-b786-695aa797a3b4",
description: "528a4d49-9ee7-4025-91cc-81ecea89902c",
itemId: "98dea505-2a5f-4367-a720-85caa5933d67",
name: "0311f6bc-6a2c-4686-97c0-27285d87b9b8",
price: 972.3303680290993,
productId: "dcc2efb8-bbac-4e05-9ba8-f9edef297096"
                        },
                        
                    }])
                .when(command)
                .thenThrows()
        });

    });
