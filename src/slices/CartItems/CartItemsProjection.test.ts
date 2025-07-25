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
        const aggregateId = "fb9e9f20-4e50-4111-a8d5-85d49261d7f7"
        const description = "ea7d51c8-17a4-4f2a-b77a-587e37757272"
        const itemId = "5f305092-f3ff-4eb4-9140-4c1c16d6f227"
        const name = "6e74ba09-ad0a-458e-b8c9-0f65c9fb98c0"
        const price = 456.47717028508737
        const productId = "a0da3706-184b-4c9c-9363-576243ffcd3f"
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
            metadata: {streamName: 'c5c22011-a34f-41c5-80cb-dc79bf00a328'}
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
                metadata: {streamName: 'c5c22011-a34f-41c5-80cb-dc79bf00a328'}
            }])
            .when([])
            .then(
                expectPongoDocuments
                    .fromCollection<CartItemsReadModel>(
                        "CartItems-collection",
                    )
                    .withId("c5c22011-a34f-41c5-80cb-dc79bf00a328")
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
