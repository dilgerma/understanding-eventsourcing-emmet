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
    let connectionString:string

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
        const aggregateId = "9a419281-df54-445a-ac00-47bc0bc3f191"
const description = "b9562f21-c8b8-49a4-91ac-b30f852df789"
const itemId = "5030e6f9-26c0-4488-8dfc-0a191b03dbc7"
const name = "77195ee4-6f6e-4e2d-b44c-0f0a30a599cc"
const price = 392.6530944026176
const productId = "ef6e50d8-6397-4405-b760-684f38465d90"
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
                        metadata: {streamName: '70db95b4-729b-4ab4-9a21-ffe7904091b8'}
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
                        metadata: {streamName: '70db95b4-729b-4ab4-9a21-ffe7904091b8'}
                    }])
            .when([])
            .then(
                expectPongoDocuments
                    .fromCollection<CartItemsReadModel>(
                        "CartItems-collection",
                    )
                    .withId("70db95b4-729b-4ab4-9a21-ffe7904091b8")
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
