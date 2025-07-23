import {DeciderSpecification} from '@event-driven-io/emmett';
import {AddItemCommand, decide, evolve} from "./AddItemCommand";
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
                    aggregateId: "b3ad86c7-c472-45f9-8f74-15d02509e20f",
description: "8a4c632b-0519-4a65-a572-3e3724eaed83",
price: 231.3362263736647,
itemId: "ee982462-a733-43ee-b022-9ae8a98ab0b9",
name: "ecf2fd22-a3a5-4e35-81a8-ff818d38616a",
productId: "48a994e4-4a32-4eac-8b33-028d09ec97d9"
                },
                metadata: {now: new Date()},
            }

            given([{
                        type: 'ItemAdded',
                        data: {
                            aggregateId: "88af4edd-0ab2-44c2-8209-eecc0181039e",
description: "4d8701bc-fb8b-4c17-991d-3d0b516559f0",
itemId: "fda43c58-a260-4c7e-8508-a84eb61c8dc1",
name: "73a6e68a-994c-46eb-b1bf-07f2802632dd",
price: 922.4979774593129,
productId: "20526da1-ea88-4dfd-9a60-ece54f664119"
                        },
                        
                    },
{
                        type: 'ItemAdded',
                        data: {
                            aggregateId: "ed1292d7-1744-410c-bfda-0bacb33b01c2",
description: "c0d46c37-7d40-4cc4-a6a9-fd2c2f0738d1",
itemId: "c30a10dd-d26d-4b78-bfa8-41b049cacdf5",
name: "9373462f-cb31-41aa-a935-cc5ef17b12b4",
price: 713.6677958234219,
productId: "684f8817-136e-45eb-a55e-de629aaba856"
                        },
                        
                    },
{
                        type: 'ItemAdded',
                        data: {
                            aggregateId: "ad93a70d-bb82-4782-8000-6f5948438924",
description: "7e79a6ba-cd60-4db8-9cb1-c466af541bd2",
itemId: "cef34f10-9656-4ed2-8df2-76cce7c6a570",
name: "43400486-6971-4910-bd91-c2087fc51c27",
price: 920.6764330945351,
productId: "36be28bb-7818-45cd-9e16-66dada2eb15b"
                        },
                        
                    }])
                .when(command)
                .thenThrows()
        });
it('spec: Add Item', () => {

            const command: AddItemCommand = {
                type: 'AddItem',
                data: {
                    aggregateId: "68c66a04-9d42-4da8-b945-3894b377a7b9",
description: "a3605916-f383-4626-858b-2733d524dee1",
price: 567.4357173279851,
itemId: "f0b4de97-4249-4302-82ab-4a5184e49163",
name: "5e68bc35-970d-4b93-9df0-03b43d4fb7d0",
productId: "7ead1e5d-8711-49aa-8a8b-98483dd5dba8"
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
                    }])
        });

    });
