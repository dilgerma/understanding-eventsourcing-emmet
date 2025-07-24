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
        const aggregateId = "130bbfd7-a663-472a-8461-e168409dd977"
        const description = "db8a5030-d3e9-45b6-85c8-702e9e5b5d73"
        const itemId = "158a6fdf-ca6a-484c-9d1a-0ad9b1efe1f8"
        const name = "c4410004-411d-41d3-93b0-edcc50480a64"
        const price = 920.896120976753
        const productId = "abaefa36-2c32-4741-b890-0482426778c2"
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
            metadata: {streamName: 'a52c1181-21f1-4ba4-bcd8-3e18ba37f1f8'}
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
                metadata: {streamName: 'a52c1181-21f1-4ba4-bcd8-3e18ba37f1f8'}
            }])
            .when([])
            .then(
                expectPongoDocuments
                    .fromCollection<CartItemsReadModel>(
                        "CartItems-collection",
                    )
                    .withId("a52c1181-21f1-4ba4-bcd8-3e18ba37f1f8")
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
