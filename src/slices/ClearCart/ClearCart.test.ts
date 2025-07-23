import {DeciderSpecification} from '@event-driven-io/emmett';
import {ClearCartCommand, decide, evolve} from "./ClearCartCommand";
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
                    aggregateId: "261e2fab-57dd-4337-9e7a-bd2b82078b58"
                },
                metadata: {now: new Date()},
            }

            given([{
                        type: 'ItemAdded',
                        data: {
                            aggregateId: "c1cce0d0-1e09-40df-b9d5-2ddf1917f126",
description: "db32b255-a092-41ce-ac53-0c50800a6b9e",
itemId: "195dcafc-24e5-42c2-8dc0-493acc1e3172",
name: "abad2857-ae50-4ff6-baeb-1501d40d42e5",
price: 732.900883639775,
productId: "79b41ada-84cd-4ffa-b37a-4de51184457f"
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
