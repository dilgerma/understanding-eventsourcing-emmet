
import {Request, Response, Router} from 'express';
import {CartItemsReadModel} from "./CartItemsProjection";
import {WebApiSetup} from "@event-driven-io/emmett-expressjs";
import createClient, {createServiceClient} from "../../supabase/api";
import {readmodel} from "../../core/readmodel";
import {requireUser} from "../../supabase/requireUser";

export const api =
    (
        // external dependencies
    ): WebApiSetup =>
        (router: Router): void => {
            router.get('/api/query/cartitems-collection', async (req: Request, res: Response) => {
                // requireUser in your original code seems to expect some kind of context,
                // adapt it to Express req if needed, or pass false as in your original code.
                try {

                    const user = await requireUser(req, res, false);
                    console.log(JSON.stringify(user))
                   
           const id = req.query._id?.toString();
           if(!id) throw "no id provided"

           const supabase = createClient(req, res)
           const collection = "cartitems-collection"

           const data:CartItemsReadModel|null = await readmodel(collection, supabase).findById<CartItemsReadModel>(id)

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


