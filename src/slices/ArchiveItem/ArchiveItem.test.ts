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
                    aggregateId: "657c4df6-7239-4850-8b10-5b24b9f22450",
itemId: "0093ca3f-ac56-4c3a-8674-10332e03c92a",
productId: "69f28c8f-06af-48ca-8e05-2ce06e362856"
                },
                metadata: {now: new Date()},
            }

            given([{
                        type: 'PriceChanged',
                        data: {
                            productId: "162615fc-c911-4f00-8820-c6c29bce6399",
price: 806.3914012975813
                        },
                        metadata: {}
                    },
{
                        type: 'ItemAdded',
                        data: {
                            aggregateId: "034d6889-710b-4f46-8456-b00cc62ceeaf",
description: "da63e413-0bb3-4eab-88ce-f7917bd26d38",
itemId: "63a64511-1e0a-4df8-a182-af160d26b1da",
name: "87fc3a91-67ec-4b3a-8e2e-6c1fe92d54b0",
price: 720.8097066866948,
productId: "3c46ea8f-08c2-4c42-bd6c-44a1e5c5cae8"
                        },
                        metadata: {}
                    }])
                .when(command)
                .then([{
                        type: 'ItemArchived',
                        data: {
                            			aggregateId:command.data.aggregateId,
			productId:command.data.productId,
			itemId:command.data.itemId
                        },
                        metadata: {}
                    }])
        });

    });
