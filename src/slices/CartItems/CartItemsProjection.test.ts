import {before, describe, it} from "node:test";
import {expectPongoDocuments, PostgreSQLProjectionSpec} from "@event-driven-io/emmett-postgresql";
import {CartItemsProjection, CartItemsReadModel} from "@/app/slices/CartItems/CartItemsProjection";
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
        const aggregateId = "4cc27803-4f87-46b4-85ce-87da7670eb9c"
const description = "b7d8fcad-ca49-4556-8370-16e1f721d9d1"
const itemId = "fb3789b7-dc84-487f-be59-8e6af4fabfab"
const name = "6da768f3-4374-41ea-96f4-455601fd5fb0"
const price = 388.66957499209474
const productId = "26e487d1-8bb4-4e31-b6d2-529fbcf1125f"
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
                        metadata: {streamName: '676e9c8c-9097-4fcc-a897-f80ceb743ec1'}
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
                        metadata: {streamName: '676e9c8c-9097-4fcc-a897-f80ceb743ec1'}
                    }])
            .when([])
            .then(
                expectPongoDocuments
                    .fromCollection<CartItemsReadModel>(
                        "CartItems-collection",
                    )
                    .withId("676e9c8c-9097-4fcc-a897-f80ceb743ec1")
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
