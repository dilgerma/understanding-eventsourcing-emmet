
import {Request, Response, Router} from 'express';
import {InventoriesReadModel} from "./InventoriesProjection";
import {WebApiSetup} from "@event-driven-io/emmett-expressjs";
import {createServiceClient} from "../../supabase/api";
import {readmodel} from "../../core/readmodel";

export const api =
    (
        // external dependencies
    ): WebApiSetup =>
        (router: Router): void => {
            router.get('/api/query/inventories-collection', async (req: Request, res: Response) => {
                // requireUser in your original code seems to expect some kind of context,
                // adapt it to Express req if needed, or pass false as in your original code.
                try {

                   
           const id = req.query._id?.toString();
           if(!id) throw "no id provided"

           const supabase = createServiceClient()
           const collection = "inventories-collection"

           const data:InventoriesReadModel|null = await readmodel(collection, supabase).findById<InventoriesReadModel>(id)

                   // Serialize, handling bigint properly
                   const sanitized = JSON.parse(
                       JSON.stringify(data || [], (key, value) =>
                           typeof value === 'bigint' ? value.toString() : value
                       )
                   );

                    return res.status(200).json(sanitized);
                } catch (err) {
                    console.error(err);
                    return res.status(500).json({ ok: false, error: 'Server error' });
                }
            });

        };


