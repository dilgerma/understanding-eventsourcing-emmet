import {Request, Response, Router} from 'express';
import {handleImportInventory, ImportInventoryCommand} from './ImportInventoryCommand';
import {requireUser} from "../../supabase/requireUser";
import {WebApiSetup} from "@event-driven-io/emmett-expressjs";
import {assertNotEmpty} from "../../components/util/assertions";

export type ImportInventoryRequestPayload = {
    inventory?: number,
    productId?: string
}

export type ImportInventoryRequest = Request<
    Partial<{ id: string }>,
    unknown,
    Partial<ImportInventoryRequestPayload>
>;

export const api =
    (
        // external dependencies
    ): WebApiSetup =>
        (router: Router): void => {
            router.post('/api/importinventory/:id', async (req: ImportInventoryRequest, res: Response) => {
                const principal = await requireUser(req, res, false);
                if (principal.error) {
                    return res.status(401).json(principal); // Adjust status code as needed
                }

                try {
                    const command: ImportInventoryCommand = {
                        data: {
                            inventory: assertNotEmpty(req.body.inventory),
                            productId: assertNotEmpty(req.body.productId)
                            //amount: req.body.amount,
                        },
                        type: "ImportInventory"
                    }
                    await handleImportInventory(assertNotEmpty(req.params.id), command);
                    return res.status(200).json({ok: true});
                } catch (err) {
                    console.error(err);
                    return res.status(500).json({ok: false, error: 'Server error'});
                }
            });
        };

