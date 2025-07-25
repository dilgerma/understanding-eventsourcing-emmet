import { Router, Request, Response } from 'express';
import { AddItemCommand, handleAddItem } from './AddItemCommand';
import {requireUser} from "../../supabase/requireUser";
import {on, WebApiSetup} from "@event-driven-io/emmett-expressjs";
import {assertNotEmptyString} from "@event-driven-io/emmett";
import {assertNotEmpty} from "../../components/util/assertions";

export type AddItemRequestPayload = {
    aggregateId?:string,
description?:string,
price?:number,
itemId?:string,
name?:string,
productId?:string
}

export type AddItemRequest = Request<
    Partial<{ id:string }>,
    unknown,
    Partial<AddItemRequestPayload>
>;

export const api =
    (
        // external dependencies
    ): WebApiSetup =>
        (router: Router): void => {
            router.post('/api/additem/:id', async (req: AddItemRequest, res: Response) => {
                const principal = await requireUser(req, res, false);
                if (principal.error) {
                    return res.status(401).json(principal); // Adjust status code as needed
                }

                try {
                    const command:AddItemCommand = {
                        data: {
                            			aggregateId:assertNotEmpty(req.body.aggregateId),
			description:assertNotEmpty(req.body.description),
			price:assertNotEmpty(req.body.price),
			itemId:assertNotEmpty(req.body.itemId),
			name:assertNotEmpty(req.body.name),
			productId:assertNotEmpty(req.body.productId)
                            //amount: req.body.amount,
                        },
                        metadata: {
                            correlation_id: req.header("correlation_id"),
                            causation_id: req.params.id
                        },
                        type: "AddItem"
                    }
                    await handleAddItem(assertNotEmpty(req.params.id), command);
                    return res.status(200).json({ ok: true });
                } catch (err) {
                    console.error(err);
                    return res.status(500).json({ ok: false, error: 'Server error' });
                }
            });
        };

