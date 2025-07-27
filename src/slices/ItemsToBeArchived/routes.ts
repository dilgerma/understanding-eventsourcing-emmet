import {Request, Response, Router} from 'express';
import {ItemsToBeArchivedReadModel} from "./ItemsToBeArchivedProjection";
import {WebApiSetup} from "@event-driven-io/emmett-expressjs";
import {createServiceClient} from "../../supabase/api";
import {readmodel} from "../../core/readmodel";

export const api =
    (
        // external dependencies
    ): WebApiSetup =>
        (router: Router): void => {
            router.get('/api/query/itemstobearchived-collection', async (req: Request, res: Response) => {
                // requireUser in your original code seems to expect some kind of context,
                // adapt it to Express req if needed, or pass false as in your original code.
                    const collection = "itemstobearchived-collection"
                try {

                    const status = req.query.status?.toString();
                    const limit = Number(req.query._limit ?? -1)
                    if (!status) throw "no status provided"

                    const supabase = createServiceClient()


                    const data: ItemsToBeArchivedReadModel[] | null = await readmodel(collection, supabase)
                        .findAll<ItemsToBeArchivedReadModel>({status: status},
                            (query) => limit !== -1 ? query.limit(limit) : query)


                    // Serialize, handling bigint properly
                    const sanitized = JSON.parse(
                        JSON.stringify(data || [], (key, value) =>
                            typeof value === 'bigint' ? value.toString() : value
                        )
                    );

                    return res.status(200).json(sanitized);
                } catch (err) {
                    console.error(`Error processing request for collection ${collection} with Error: ${err}`);
                    return res.status(500).json({ok: false, error: 'Server error'});
                }
            });

        };


