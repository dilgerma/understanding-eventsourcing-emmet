import {DeciderSpecification} from '@event-driven-io/emmett';
import {ChangePriceCommand, decide, evolve} from "./ChangePriceCommand";
import {describe, it} from "node:test";


describe('ChangePrice Specification', () => {

    const given = DeciderSpecification.for({
        decide,
        evolve,
        initialState: () => ({})
    });

    it('spec:  change price', () => {

        const command: ChangePriceCommand = {
            type: 'ChangePrice',
            data: {
                newPrice: 690.4485076790473,
                oldPrice: 751.9105794797929,
                productId: "8d19f228-db2e-4e48-ad77-28c1a78da886"
            },
            metadata: {now: new Date()},
        }

        given([])
            .when(command)
            .then([{
                type: 'PriceChanged',
                data: {
                    newPrice: command.data.newPrice,
                    oldPrice: command.data.oldPrice,
                    productId: command.data.productId
                },
            }])
    });

});
