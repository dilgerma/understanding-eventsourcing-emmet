import {DeciderSpecification} from '@event-driven-io/emmett';
import {ArchiveItemCommand, ArchiveItemState, decide, evolve} from "./ArchiveItemCommand";
import {describe, it} from "node:test";



describe('ArchiveItem Specification', () => {

        const given = DeciderSpecification.for({
            decide,
            evolve,
            initialState: ()=>({})
        });

        it('spec: Archive Item', () => {

            const command: ArchiveItemCommand = {
                type: 'ArchiveItem',
                data: {
                    aggregateId: "b5d153ce-c65b-431b-8165-9c3d286616bc",
itemId: "2fe96c98-400a-4817-b385-9ab972b68666",
productId: "eca7f57f-e547-428e-a645-4bf69b8688ce"
                },
                metadata: {now: new Date()},
            }

            given([{
                        type: 'PriceChanged',
                        data: {
                            productId: "06e062fe-bde7-4069-b063-1fe7f7d769a5",
price: 863.1549167765944
                        },
                        
                    },
{
                        type: 'ItemAdded',
                        data: {
                            aggregateId: "5609756a-140a-48c6-9bf4-333c3a76239d",
description: "17c5ad63-8efe-4d12-9b98-9f3fe208382f",
itemId: "0200c68a-a3f6-4adf-99c8-78ca36f3f565",
name: "929bd141-9b4b-4055-9d73-ea467d911b82",
price: 333.28699080895194,
productId: "ff855406-609e-4346-9cce-1ea64d3fca70"
                        },
                        
                    }])
                .when(command)
                .then([{
                        type: 'ItemArchived',
                        data: {
                            			aggregateId:command.data.aggregateId,
			productId:command.data.productId,
			itemId:command.data.itemId
                        },
                    }])
        });

    });
