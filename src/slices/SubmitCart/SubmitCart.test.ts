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
                    aggregateId: "056ddbaf-5fa5-4d07-b223-d27fa898086e"
                },
                metadata: {now: new Date()},
            }

            given([{
                        type: 'InventoryUpdated',
                        data: {
                            inventory: 903,
productId: "b60f7365-c8fc-4c8b-9fdd-5d09cf177bf7"
                        },
                        metadata: {}
                    },
{
                        type: 'ItemAdded',
                        data: {
                            aggregateId: "36182fb5-b570-4b37-8e1d-1e6f2e84f085",
description: "16a6d517-f884-4cfa-a074-aa18a6cb3d92",
itemId: "a8503f72-2337-4745-9c16-3a99674111c9",
name: "b6484112-0885-4729-9981-cc4d76374a95",
price: 701.2555506319353,
productId: "d96dcb5d-d75d-4a3f-8a9c-866c55058c2c"
                        },
                        metadata: {}
                    }])
                .when(command)
                .thenThrows()
        });

    });
