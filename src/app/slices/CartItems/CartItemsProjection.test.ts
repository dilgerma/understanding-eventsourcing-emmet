import {before, describe, it} from "node:test";
import {expectPongoDocuments, PostgreSQLProjectionSpec} from "@event-driven-io/emmett-postgresql";
import {CartItemsProjection, CartItemsReadModel} from "@/app/slices/CartItems/CartItemsProjection";
import {PostgreSqlContainer, StartedPostgreSqlContainer} from "@testcontainers/postgresql";
import {CartCleared} from "../../events/CartCleared"
import {ItemArchived} from "../../events/ItemArchived"
import {CartCreated} from "../../events/CartCreated"
import {ItemRemoved} from "../../events/ItemRemoved"
import {ItemAdded} from "../../events/ItemAdded"
import {v4} from "uuid";

describe('CartItems Specification', () => {
    let postgres: StartedPostgreSqlContainer;
    let connectionString: string

    let given: PostgreSQLProjectionSpec<CartCleared | ItemArchived | CartCreated | ItemRemoved | ItemAdded>

    before(async () => {
        postgres = await new PostgreSqlContainer("postgres").start();
        connectionString = postgres.getConnectionUri();

        given = PostgreSQLProjectionSpec.for({
            projection: CartItemsProjection,
            connectionString,
        });
    });

    it('spec:  cart items with archived items', async () => {
        const aggregateId = "0ec572c1-ac32-4a06-9cdc-b081d66f53e6"
        const description = "04f9b789-e598-4a7d-bc69-5b8f14bb3ba0"
        const image = "1180c700-2efc-4f91-ab89-1a5e7bf70368"
        const itemId = "83ce0eac-f4e8-4f0c-942f-3da98f01518b"
        const price = 248.45019201712492
        const productId = "179e8cd8-211c-4513-a3dc-eb5ca64e6973"
        await given([{
            type: 'ItemArchived',
            data: {
                aggregateId: aggregateId,
                itemId: itemId
            },
            metadata: {streamName: '90febdf0-0940-4cde-9794-4fa8dcccd08d'}
        },
            {
                type: 'ItemAdded',
                data: {
                    aggregateId: aggregateId,
                    description: description,
                    image: image,
                    price: price,
                    itemId: itemId,
                    productId: productId
                },
                metadata: {streamName: '90febdf0-0940-4cde-9794-4fa8dcccd08d'}
            },
            {
                type: 'CartCreated',
                data: {
                    aggregateId: aggregateId
                },
                metadata: {streamName: '90febdf0-0940-4cde-9794-4fa8dcccd08d'}
            }])
            .when([])
            .then(
                expectPongoDocuments
                    .fromCollection<CartItemsReadModel>(
                        "CartItems-collection",
                    )
                    .withId("90febdf0-0940-4cde-9794-4fa8dcccd08d")
                    .toBeEqual({
                        data: [{
                            aggregateId: aggregateId,
                            description: description,
                            image: image,
                            price: price,
// totalPrice: totalPrice,
                            productId: productId,
                            itemId: itemId
                        }]
                    }),
            );
    });
    it('spec:  cart items with cleared cart', async () => {
        const aggregateId = "2b6253bf-ca67-4767-ae0e-bbaa12cb95d1"
        const description = "fead8e9c-a502-4ed6-8f7a-f20f4583c8b3"
        const image = "4174b987-d612-4f8d-8e79-89cc134e9374"
        const itemId = "4c50cf7e-a2bc-4c0c-a861-41e5b8c52062"
        const price = 773.0406688189365
        const productId = "9503f8a2-08a9-4117-a50e-7cf4f5dc0dc4"
        await given([{
            type: 'CartCleared',
            data: {
                aggregateId: aggregateId
            },
            metadata: {streamName: 'b2f81dac-2fec-491c-b8da-7d69b2e882ff'}
        },
            {
                type: 'ItemAdded',
                data: {
                    aggregateId: aggregateId,
                    description: description,
                    image: image,
                    price: price,
                    itemId: itemId,
                    productId: productId
                },
                metadata: {streamName: 'b2f81dac-2fec-491c-b8da-7d69b2e882ff'}
            },
            {
                type: 'CartCreated',
                data: {
                    aggregateId: aggregateId
                },
                metadata: {streamName: 'b2f81dac-2fec-491c-b8da-7d69b2e882ff'}
            }])
            .when([])
            .then(
                expectPongoDocuments
                    .fromCollection<CartItemsReadModel>(
                        "CartItems-collection",
                    )
                    .withId("b2f81dac-2fec-491c-b8da-7d69b2e882ff")
                    .toBeEqual({
                        data: [{
                            aggregateId: aggregateId,
                            description: description,
                            image: image,
                            price: price,
// totalPrice: totalPrice,
                            productId: productId,
                            itemId: itemId
                        }]
                    }),
            );
    });
    it('spec:  cart items with removed item', async () => {
        const aggregateId = "cba4a8ee-bb2e-498b-9a7e-bb142d269f93"
        const description = "9adac11f-e31f-4ff9-a853-53faab6d9373"
        const image = "28843e09-aa3a-48c3-9b1e-14c7daea8dee"
        const itemId = "04efd502-766c-404c-b736-e1f55ddea864"
        const price = 456.90483531571755
        const productId = "f3e9dcc3-0bc0-4009-937e-2b7525a98d17"
        await given([{
            type: 'ItemRemoved',
            data: {
                aggregateId: aggregateId,
                itemId: itemId
            },
            metadata: {streamName: '61726178-7485-4e70-aba6-a9c31ee435b6'}
        },
            {
                type: 'ItemAdded',
                data: {
                    aggregateId: aggregateId,
                    description: description,
                    image: image,
                    price: price,
                    itemId: itemId,
                    productId: productId
                },
                metadata: {streamName: '61726178-7485-4e70-aba6-a9c31ee435b6'}
            },
            {
                type: 'CartCreated',
                data: {
                    aggregateId: aggregateId
                },
                metadata: {streamName: '61726178-7485-4e70-aba6-a9c31ee435b6'}
            }])
            .when([])
            .then(
                expectPongoDocuments
                    .fromCollection<CartItemsReadModel>(
                        "CartItems-collection",
                    )
                    .withId("61726178-7485-4e70-aba6-a9c31ee435b6")
                    .toBeEqual({
                        data: [{
                            aggregateId: aggregateId,
                            description: description,
                            image: image,
                            price: price,
// totalPrice: totalPrice,
                            productId: productId,
                            itemId: itemId
                        }]
                    }),
            );
    });
    it('spec:  cart items', async () => {
        const aggregateId = "3660c2ef-0796-409f-bde7-6f8cf2e4a780"
        const description = "4b3b21a5-78cc-4900-8547-b9db4d031e0b"
        const image = "9aab4448-6a47-4fde-95c1-7892f329e77e"
        const itemId = "241629c6-5064-415c-8e25-be8745b9173d"
        const price = 9.99
        const productId = "ac8583f1-12db-4b92-ae45-284c479fae97"
        await given([{
            type: 'CartCreated',
            data: {
                aggregateId: aggregateId
            },
            metadata: {streamName: 'a7c9916b-32ae-4ed9-9975-541fe32a936e'}
        }, {
            type: 'ItemAdded',
            data: {
                aggregateId: aggregateId,
                description: description,
                image: image,
                price: price,
                itemId: itemId,
                productId: productId
            },
            metadata: {streamName: 'a7c9916b-32ae-4ed9-9975-541fe32a936e'}
        },
            {
                type: 'ItemAdded',
                data: {
                    aggregateId: aggregateId,
                    description: description,
                    image: image,
                    price: price,
                    itemId: v4(),
                    productId: productId
                },
                metadata: {streamName: 'a7c9916b-32ae-4ed9-9975-541fe32a936e'}
            }])
            .when([])
            .then(
                expectPongoDocuments
                    .fromCollection<CartItemsReadModel>(
                        "CartItems-collection",
                    )
                    .withId("a7c9916b-32ae-4ed9-9975-541fe32a936e")
                    .toBeEqual({
                        data: [{
                            aggregateId: aggregateId,
                            description: description,
                            image: image,
                            price: price,
                            totalPrice: 19.98,
                            productId: productId,
                            itemId: itemId
                        }]
                    }),
            );
    });

});
