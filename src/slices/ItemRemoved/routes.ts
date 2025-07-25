import { Router, Request, Response } from 'express';
import { RemoveItemCommand, handleRemoveItem } from './RemoveItemCommand';
import {requireUser} from "../../supabase/requireUser";
import {on, WebApiSetup} from "@event-driven-io/emmett-expressjs";
import {assertNotEmptyString} from "@event-driven-io/emmett";
import {assertNotEmpty} from "../../components/util/assertions";

export type RemoveItemRequestPayload = {
    aggregateId?:string,
itemId?:string,
productId?:string
}

export type RemoveItemRequest = Request<
    Partial<{ id:string }>,
    unknown,
    Partial<RemoveItemRequestPayload>
>;

export const api =
    (
        // external dependencies
    ): WebApiSetup =>
        (router: Router): void => {
            router.post('/api/removeitem/:id', async (req: RemoveItemRequest, res: Response) => {
                const principal = await requireUser(req, res, false);
                if (principal.error) {
                    return res.status(401).json(principal); // Adjust status code as needed
                }

                try {
                    const command:RemoveItemCommand = {
                        data: {
                            			aggregateId:assertNotEmpty(req.body.aggregateId),
			itemId:assertNotEmpty(req.body.itemId),
			productId:assertNotEmpty(req.body.productId)
                            //amount: req.body.amount,
                        },
                        metadata: {
                            correlation_id: req.header("correlation_id"),
                            causation_id: req.params.id
                        },
                        type: "RemoveItem"
                    }
                    await handleRemoveItem(assertNotEmpty(req.params.id), command);
                    return res.status(200).json({ ok: true });
                } catch (err) {
                    console.error(err);
                    return res.status(500).json({ ok: false, error: 'Server error' });
                }
            });
        };

