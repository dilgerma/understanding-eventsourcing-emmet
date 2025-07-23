import {Request, Response, Router} from 'express';
import {handlePublishCart, PublishCartCommand} from './PublishCartCommand';
import {requireUser} from "../../supabase/requireUser";
import {WebApiSetup} from "@event-driven-io/emmett-expressjs";
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

