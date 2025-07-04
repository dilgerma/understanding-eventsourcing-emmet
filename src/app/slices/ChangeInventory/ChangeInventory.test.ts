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
                inventory: 744,
                productId: "d8481fb3-21e3-4ec8-a96a-9055cdae1ec9"
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
