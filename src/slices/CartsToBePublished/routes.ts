
import {Request, Response, Router} from 'express';
import {CartsToBePublishedReadModel} from "./CartsToBePublishedProjection";
import {WebApiSetup} from "@event-driven-io/emmett-expressjs";
import {createServiceClient} from "../../supabase/api";
import {readmodel} from "../../core/readmodel";

export const api =
    (
        // external dependencies
    ): WebApiSetup =>
        (router: Router): void => {
            router.get('/api/query/cartstobepublished-collection', async (req: Request, res: Response) => {
                // requireUser in your original code seems to expect some kind of context,
                // adapt it to Express req if needed, or pass false as in your original code.
                try {

                   
            const status = req.query.status?.toString();
            const limit = Number(req.query._limit??-1)
            if(!status) throw "no status provided"

            const supabase = createServiceClient()
            const collection = "cartstobepublished-collection"


            const data:CartsToBePublishedReadModel[]|null = await readmodel(collection, supabase)
                .findAll<CartsToBePublishedReadModel>({status:status}, 
                    (query)=>limit !== -1 ? query.limit(limit): query)
            

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


