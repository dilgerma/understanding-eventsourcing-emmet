import {Router, Request, Response} from 'express';
import {loadPongoClient} from "../../common/loadPongoClient";
import {CartItemsReadModel} from "./CartItemsProjection";
import {on, WebApiSetup} from "@event-driven-io/emmett-expressjs";

const router = Router();

export const api =
    (
        // external dependencies
    ): WebApiSetup =>
        (router: Router): void => {
            router.get('/api/query/cartitems-collection', async (req: Request, res: Response) => {
                // requireUser in your original code seems to expect some kind of context,
                // adapt it to Express req if needed, or pass false as in your original code.
                try {
                    const id = req.query._id;
                    const client = loadPongoClient();
                    const db = client.db();
                    const collection = db.collection<CartItemsReadModel>('cartitems-collection');

                    const projection = await collection.findOne({_id: id});

                    // Serialize, handling bigint properly
                    const sanitized = JSON.parse(
                        JSON.stringify(projection, (key, value) =>
                            typeof value === 'bigint' ? value.toString() : value
                        )
                    );

                    return res.status(200).json(sanitized);
                } catch (err) {
                    console.error(err);
                    return res.status(500).json({ok: false, error: 'Server error'});
                }
            });

        };


