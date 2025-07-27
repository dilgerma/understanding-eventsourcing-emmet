import {before, describe, it} from "node:test";
import {expectPongoDocuments, PostgreSQLProjectionSpec} from "@event-driven-io/emmett-postgresql";
import {CartItemsProjection, CartItemsReadModel} from "./CartItemsProjection";
import {PostgreSqlContainer, StartedPostgreSqlContainer} from "@testcontainers/postgresql";
import {ItemArchived} from "../../events/ItemArchived"
import {CartCleared} from "../../events/CartCleared"
import {ItemRemoved} from "../../events/ItemRemoved"
import {ItemAdded} from "../../events/ItemAdded"

describe('CartItems Specification', () => {
    let postgres: StartedPostgreSqlContainer;
    let connectionString: string

    let given: PostgreSQLProjectionSpec<ItemArchived | CartCleared | ItemRemoved | ItemAdded>

    before(async () => {
        postgres = await new PostgreSqlContainer("postgres").start();
        connectionString = postgres.getConnectionUri();

        given = PostgreSQLProjectionSpec.for({
            projection: CartItemsProjection,
            connectionString,
        });
    });

    it('spec: cart items', async () => {
        const aggregateId = "a589935d-f7e8-4576-bd3b-512204db7f5d"
        const description = "a3c7c852-228d-4258-94c8-d9d3b154693e"
        const itemId = "cae92152-c156-41ab-9980-ffad1ac3a312"
        const name = "5b784b90-163b-46af-9845-292b99311564"
        const price = 69.0708703236509
        const productId = "4f64955d-153f-469c-a5c4-51af4ca833bb"
        await given([{
            type: 'ItemAdded',
            data: {
                aggregateId: aggregateId,
                description: description,
                itemId: itemId,
                name: name,
                price: price,
                productId: productId
            },
            metadata: {streamName: 'cbe7b9cb-1a25-4b8d-be6d-cf187286e454'}
        },
            {
                type: 'ItemAdded',
                data: {
                    aggregateId: aggregateId,
                    description: description,
                    itemId: itemId,
                    name: name,
                    price: price,
                    productId: productId
                },
                metadata: {streamName: 'cbe7b9cb-1a25-4b8d-be6d-cf187286e454'}
            }])
            .when([])
            .then(
                expectPongoDocuments
                    .fromCollection<CartItemsReadModel>(
                        "CartItems-collection",
                    )
                    .withId("cbe7b9cb-1a25-4b8d-be6d-cf187286e454")
                    .toBeEqual({
                        data: [{
                            aggregateId: aggregateId,
                            itemId: itemId,
                            name: name,
                            price: price,
                            productId: productId
                        }]
                    }),
            );
    });

});
