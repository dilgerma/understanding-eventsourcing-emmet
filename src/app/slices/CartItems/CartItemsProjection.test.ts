import {before, describe, it} from "node:test";
import {expectPongoDocuments, PostgreSQLProjectionSpec} from "@event-driven-io/emmett-postgresql";
import {CartItemsProjection, CartItemsReadModel} from "@/app/slices/CartItems/CartItemsProjection";
import {PostgreSqlContainer, StartedPostgreSqlContainer} from "@testcontainers/postgresql";
import {CartCleared} from "../../events/CartCleared"
import {ItemArchived} from "../../events/ItemArchived"
import {CartCreated} from "../../events/CartCreated"
import {ItemRemoved} from "../../events/ItemRemoved"
import {ItemAdded} from "../../events/ItemAdded"

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
        const aggregateId = "4648cc71-f54b-410a-bd1b-18abb4764844"
        const itemId = "bc176097-66c9-4093-8801-e7c32c59ec8b"
        const description = "8e91d194-a4f8-4325-ae0b-a6f2a0147f50"
        const image = "20142c9f-f965-4bd0-9835-586b343efc4b"
        const price = 18.8373160813593
        const productId = "6a6c7d3d-80c4-434f-a153-9660db008ce8"
        await given([{
            type: 'ItemArchived',
            data: {
                aggregateId: aggregateId,
                itemId: itemId
            },
            metadata: {streamName: '08125b26-d0c8-45ff-95a5-6335e42cdc61'}
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
                metadata: {streamName: '08125b26-d0c8-45ff-95a5-6335e42cdc61'}
            },
            {
                type: 'CartCreated',
                data: {
                    aggregateId: aggregateId
                },
                metadata: {streamName: '08125b26-d0c8-45ff-95a5-6335e42cdc61'}
            }])
            .when([])
            .then(
                expectPongoDocuments
                    .fromCollection<CartItemsReadModel>(
                        "CartItems-collection",
                    )
                    .withId("08125b26-d0c8-45ff-95a5-6335e42cdc61")
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
        const aggregateId = "433f0eb4-8a7f-48de-a26a-7f1252d11222"
        const description = "00ddd2bc-8e12-4aff-ab8e-4c0c0566ae67"
        const image = "60d4b386-afe8-4686-9f54-dfae42774899"
        const price = 301.6723008735656
        const itemId = "195780bb-c5fd-4482-8352-75d63071989a"
        const productId = "07a8144c-b6a4-4bd7-b93b-f228a29a5c25"
        await given([{
            type: 'CartCleared',
            data: {
                aggregateId: aggregateId
            },
            metadata: {streamName: '5972d370-6a25-49ff-a99c-28fee5e7497e'}
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
                metadata: {streamName: '5972d370-6a25-49ff-a99c-28fee5e7497e'}
            },
            {
                type: 'CartCreated',
                data: {
                    aggregateId: aggregateId
                },
                metadata: {streamName: '5972d370-6a25-49ff-a99c-28fee5e7497e'}
            }])
            .when([])
            .then(
                expectPongoDocuments
                    .fromCollection<CartItemsReadModel>(
                        "CartItems-collection",
                    )
                    .withId("5972d370-6a25-49ff-a99c-28fee5e7497e")
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
        const aggregateId = "eacc642c-64b5-4d42-82d2-6058da237cdd"
        const itemId = "6bb5563f-7196-43f1-ba10-99ef5f9f73b5"
        const description = "e26eb5e5-35f0-462c-9366-6665ab4e51eb"
        const image = "5bc31f38-1ead-4722-b8ff-5ef8932f5f29"
        const price = 381.9385954093257
        const productId = "402ba9a9-3cb0-4dd7-9b90-18d47c308502"
        await given([{
            type: 'ItemRemoved',
            data: {
                aggregateId: aggregateId,
                itemId: itemId
            },
            metadata: {streamName: 'b7b732b1-7f02-4588-a937-24c7e5288fe8'}
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
                metadata: {streamName: 'b7b732b1-7f02-4588-a937-24c7e5288fe8'}
            },
            {
                type: 'CartCreated',
                data: {
                    aggregateId: aggregateId
                },
                metadata: {streamName: 'b7b732b1-7f02-4588-a937-24c7e5288fe8'}
            }])
            .when([])
            .then(
                expectPongoDocuments
                    .fromCollection<CartItemsReadModel>(
                        "CartItems-collection",
                    )
                    .withId("b7b732b1-7f02-4588-a937-24c7e5288fe8")
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
        const aggregateId = "bffe8602-675c-47e9-9788-b897a331de0a"
        const description = "e3308fcd-51f4-4d6a-9a55-9ba1f3abb32b"
        const image = "94480716-13a4-452a-a33a-b7e6cb2dbd3b"
        const price = 9.99
        const itemId = "a7fb44b9-6a28-4591-9360-7f9e992bc802"
        const productId = "40cde90a-e2a3-45c7-87e9-ebbd87e946bc"
        await given([{
            type: 'ItemAdded',
            data: {
                aggregateId: aggregateId,
                description: description,
                image: image,
                price: price,
                itemId: itemId,
                productId: productId
            },
            metadata: {streamName: '21da4313-af87-4204-9515-05e16f6a071f'}
        },
            {
                type: 'CartCreated',
                data: {
                    aggregateId: aggregateId
                },
                metadata: {streamName: '21da4313-af87-4204-9515-05e16f6a071f'}
            }])
            .when([])
            .then(
                expectPongoDocuments
                    .fromCollection<CartItemsReadModel>(
                        "CartItems-collection",
                    )
                    .withId("21da4313-af87-4204-9515-05e16f6a071f")
                    .toBeEqual({
                        data: [{
                            aggregateId: aggregateId,
                            description: description,
                            image: image,
                            price: 9.99,
                            totalPrice: 9.99,
                            productId: productId,
                            itemId: itemId
                        }]
                    }),
            );
    });

});
