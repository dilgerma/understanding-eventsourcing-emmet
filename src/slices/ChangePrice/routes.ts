import {Router, Request, Response} from 'express';
import {ChangePriceCommand, handleChangePrice} from './ChangePriceCommand';
import {requireUser} from "../../supabase/requireUser";
import {on, WebApiSetup} from "@event-driven-io/emmett-expressjs";
import {assertNotEmptyString} from "@event-driven-io/emmett";
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

                const correlation_id = req.header("correlation_id") ?? req.params.id
                const causation_id = req.params.id

                try {
                    const command: ChangePriceCommand = {
                        data: {
                            productId: assertNotEmpty(req.body.productId),
                            price: assertNotEmpty(req.body.price)
                            //amount: req.body.amount,
                        },
                        metadata: {
                            correlation_id: correlation_id,
                            causation_id: causation_id
                        },
                        type: "ChangePrice"
                    }

                    const result = await handleChangePrice(assertNotEmpty(req.params.id), command);

                    res.set("correlation_id", correlation_id)
                    res.set("causation_id", causation_id)

                    return res.status(200).json({
                        ok: true,
                        next_expected_stream_version: result.nextExpectedStreamVersion?.toString(),
                        last_event_global_position: result.lastEventGlobalPosition?.toString()
                    });
                } catch (err) {
                    console.error(err);
                    return res.status(500).json({ok: false, error: 'Server error'});
                }
            });
        };

