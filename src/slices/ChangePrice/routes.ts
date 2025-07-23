import {Request, Response, Router} from 'express';
import {ChangePriceCommand, handleChangePrice} from './ChangePriceCommand';
import {requireUser} from "../../supabase/requireUser";
import {WebApiSetup} from "@event-driven-io/emmett-expressjs";
import {assertNotEmpty} from "../../components/util/assertions";

export type ChangePriceRequestPayload = {
    productId?: string,
    price?: number
}

export type ChangePriceRequest = Request<
    Partial<{ id: string }>,
    unknown,
    Partial<ChangePriceRequestPayload>
>;

export const api =
    (
        // external dependencies
    ): WebApiSetup =>
        (router: Router): void => {
            router.post('/api/changeprice/:id', async (req: ChangePriceRequest, res: Response) => {
                const principal = await requireUser(req, res, false);
                if (principal.error) {
                    return res.status(401).json(principal); // Adjust status code as needed
                }

                try {
                    const command: ChangePriceCommand = {
                        data: {
                            productId: assertNotEmpty(req.body.productId),
                            price: assertNotEmpty(req.body.price)
                            //amount: req.body.amount,
                        },
                        type: "ChangePrice"
                    }
                    await handleChangePrice(assertNotEmpty(req.params.id), command);
                    return res.status(200).json({ok: true});
                } catch (err) {
                    console.error(err);
                    return res.status(500).json({ok: false, error: 'Server error'});
                }
            });
        };

