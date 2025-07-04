import {DeciderSpecification} from '@event-driven-io/emmett';
import {ChangeInventoryCommand, decide, evolve} from "./ChangeInventoryCommand";
import {describe, it} from "node:test";


describe('ChangeInventory Specification', () => {

    const given = DeciderSpecification.for({
        decide,
        evolve,
        initialState: () => ({})
    });

    it('spec:  change inventory', () => {

        const command: ChangeInventoryCommand = {
            type: 'ChangeInventory',
            data: {
                inventory: 228,
                productId: "f9a0080a-0df4-4ad2-8082-09ee8f3e0f16"
            },
            metadata: {now: new Date()},
        }

        given([])
            .when(command)
            .then([{
                type: 'InventoryChanged',
                data: {
                    inventory: command.data.inventory,
                    productId: command.data.productId
                },
            }])
    });

});
