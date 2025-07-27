import {DeciderSpecification} from '@event-driven-io/emmett';
import {AddItemCommand, AddItemState, decide, evolve} from "./AddItemCommand";
import {describe, it} from "node:test";



describe('AddItem Specification', () => {

        const given = DeciderSpecification.for({
            decide,
            evolve,
            initialState: ()=>({})
        });

        it('spec: At most 3 Items', () => {

            const command: AddItemCommand = {
                type: 'AddItem',
                data: {
                    aggregateId: "63da9d76-0828-4d84-9183-00c38ffbb1a6",
description: "8b844c80-a03a-4434-94c4-aee1ce560b70",
price: 459.33137710595264,
itemId: "5fc9699e-933d-40eb-8e73-03478aa21ce9",
name: "2b186ba4-53f8-4857-be69-a0699f72b8ed",
productId: "3f28eba6-aad4-458a-a04c-acd75389f132"
                },
                metadata: {now: new Date()},
            }

            given([{
                        type: 'ItemAdded',
                        data: {
                            aggregateId: "133bf6f7-2f00-416d-a89e-c37622d2e229",
description: "f3eaeb4e-d3cb-4a7d-9f2b-26094c0405a5",
itemId: "ea13e21f-db1e-41e9-8d12-237cb9cf862f",
name: "71fca47b-c2cc-4ab5-8b5f-feced30ac2d3",
price: 227.0355261445709,
productId: "f5fd86f7-3491-4734-9b93-bad75079768d"
                        },
                        metadata: {}
                    },
{
                        type: 'ItemAdded',
                        data: {
                            aggregateId: "d116ea34-dbb9-4a17-aa55-9e0faef44b67",
description: "a3603fbc-84da-4371-8edd-7ee3929c6172",
itemId: "e2d580b1-370f-4f32-83a0-1d580e13ed2b",
name: "960b6e80-07d0-44df-8d78-a9a1bc9ecb5d",
price: 844.6360340813848,
productId: "0d8805f2-0510-497b-9270-19f0eaec449b"
                        },
                        metadata: {}
                    },
{
                        type: 'ItemAdded',
                        data: {
                            aggregateId: "aecf987b-9160-4e47-81fd-6b5f4dbcd7d5",
description: "8bc6b34c-b1d2-4ec0-8e2f-60ca1913dbea",
itemId: "fe8993b5-3da3-438b-be93-9bf771cb0cea",
name: "bae07046-a09c-4b15-9cf4-098a9c5b0a70",
price: 444.6402285076454,
productId: "b180d6c5-c539-4401-a916-b82d2da6fa6c"
                        },
                        metadata: {}
                    }])
                .when(command)
                .thenThrows()
        });
it('spec: Add Item', () => {

            const command: AddItemCommand = {
                type: 'AddItem',
                data: {
                    aggregateId: "238bdff3-2286-4e77-ab1e-bcfe04a1ebd7",
description: "b7e4bb86-22ad-48d5-9892-4c2bee6d1ebf",
price: 963.9840569254569,
itemId: "a1f0ded7-963b-4b28-8aa1-6ae4b5d1440d",
name: "c46e2200-0252-4a99-922f-a482d7493aa0",
productId: "2fd44222-1391-451e-80f4-9606e68190e8"
                },
                metadata: {now: new Date()},
            }

            given([])
                .when(command)
                .then([{
                        type: 'ItemAdded',
                        data: {
                            			aggregateId:command.data.aggregateId,
			description:command.data.description,
			itemId:command.data.itemId,
			name:command.data.name,
			price:command.data.price,
			productId:command.data.productId
                        },
                        metadata: {}
                    }])
        });

    });
