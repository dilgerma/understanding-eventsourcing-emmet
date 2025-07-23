import {Request, Response, Router} from 'express';
import {ArchiveItemCommand, handleArchiveItem} from './ArchiveItemCommand';
import {requireUser} from "../../supabase/requireUser";
import {WebApiSetup} from "@event-driven-io/emmett-expressjs";
import {assertNotEmpty} from "../../components/util/assertions";

export type ArchiveItemRequestPayload = {
    aggregateId?: string,
    itemId?: string,
    productId?: string
}

export type ArchiveItemRequest = Request<
    Partial<{ id: string }>,
    unknown,
    Partial<ArchiveItemRequestPayload>
>;

export const api =
    (
        // external dependencies
    ): WebApiSetup =>
        (router: Router): void => {
            router.post('/api/archiveitem/:id', async (req: ArchiveItemRequest, res: Response) => {
                const principal = await requireUser(req, res, false);
                if (principal.error) {
                    return res.status(401).json(principal); // Adjust status code as needed
                }

                try {
                    const command: ArchiveItemCommand = {
                        data: {
                            aggregateId: assertNotEmpty(req.body.aggregateId),
                            itemId: assertNotEmpty(req.body.itemId),
                            productId: assertNotEmpty(req.body.productId)
                            //amount: req.body.amount,
                        },
                        type: "ArchiveItem"
                    }
                    await handleArchiveItem(assertNotEmpty(req.params.id), command);
                    return res.status(200).json({ok: true});
                } catch (err) {
                    console.error(err);
                    return res.status(500).json({ok: false, error: 'Server error'});
                }
            });
        };

