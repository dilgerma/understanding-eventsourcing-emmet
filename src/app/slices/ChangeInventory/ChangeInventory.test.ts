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
                inventory: 282,
                productId: "2cc34925-529a-42d4-99bb-d5d8c71c1fc5"
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
