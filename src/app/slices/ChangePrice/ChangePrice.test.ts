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
                newPrice: 203.50130404400434,
                oldPrice: 331.0190628140797,
                productId: "1e5e1e4c-ca00-4b08-82d1-c1cb9c988b20"
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
