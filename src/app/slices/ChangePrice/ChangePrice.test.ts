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
                newPrice: 796.1605997339187,
                oldPrice: 168.7919761628953,
                productId: "1966ea8a-1f44-4e6f-b708-486ab6968c50"
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
