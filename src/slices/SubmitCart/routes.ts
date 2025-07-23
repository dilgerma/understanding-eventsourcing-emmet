import {Request, Response, Router} from 'express';
import {handleSubmitCart, SubmitCartCommand} from './SubmitCartCommand';
import {requireUser} from "../../supabase/requireUser";
import {WebApiSetup} from "@event-driven-io/emmett-expressjs";
import {assertNotEmpty} from "../../components/util/assertions";

export type SubmitCartRequestPayload = {
    aggregateId?:string
}

export type SubmitCartRequest = Request<
    Partial<{ id:string }>,
    unknown,
    Partial<SubmitCartRequestPayload>
>;

export const api =
    (
        // external dependencies
    ): WebApiSetup =>
        (router: Router): void => {
            router.post('/api/submitcart/:id', async (req: SubmitCartRequest, res: Response) => {
                const principal = await requireUser(req, res, false);
                if (principal.error) {
                    return res.status(401).json(principal); // Adjust status code as needed
                }

                try {
                    const command:SubmitCartCommand = {
                        data: {
                            			aggregateId:assertNotEmpty(req.body.aggregateId)
                            //amount: req.body.amount,
                        },
                        type: "SubmitCart"
                    }
                    await handleSubmitCart(assertNotEmpty(req.params.id), command);
                    return res.status(200).json({ ok: true });
                } catch (err) {
                    console.error(err);
                    return res.status(500).json({ ok: false, error: 'Server error' });
                }
            });
        };

