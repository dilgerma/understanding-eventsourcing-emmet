import { Router, Request, Response } from 'express';
import { PublishCartCommand, handlePublishCart } from './PublishCartCommand';
import {requireUser} from "../../supabase/requireUser";
import {on, WebApiSetup} from "@event-driven-io/emmett-expressjs";
import {assertNotEmptyString} from "@event-driven-io/emmett";
import {assertNotEmpty} from "../../components/util/assertions";

export type PublishCartRequestPayload = {
    aggregateId?:string,
orderedProducts?:Array<any>,
totalPrice?:number
}

export type PublishCartRequest = Request<
    Partial<{ id:string }>,
    unknown,
    Partial<PublishCartRequestPayload>
>;

export const api =
    (
        // external dependencies
    ): WebApiSetup =>
        (router: Router): void => {
            router.post('/api/publishcart/:id', async (req: PublishCartRequest, res: Response) => {
                const principal = await requireUser(req, res, false);
                if (principal.error) {
                    return res.status(401).json(principal); // Adjust status code as needed
                }

                try {
                    const command:PublishCartCommand = {
                        data: {
                            			aggregateId:assertNotEmpty(req.body.aggregateId),
			orderedProducts:assertNotEmpty(req.body.orderedProducts),
			totalPrice:assertNotEmpty(req.body.totalPrice)
                            //amount: req.body.amount,
                        },
                        metadata: {
                            correlation_id: req.header("correlation_id"),
                            causation_id: req.params.id
                        },
                        type: "PublishCart"
                    }
                    await handlePublishCart(assertNotEmpty(req.params.id), command);
                    return res.status(200).json({ ok: true });
                } catch (err) {
                    console.error(err);
                    return res.status(500).json({ ok: false, error: 'Server error' });
                }
            });
        };

