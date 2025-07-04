import {before, describe, it} from "node:test";
import {expectPongoDocuments, PostgreSQLProjectionSpec} from "@event-driven-io/emmett-postgresql";
import {
    CartsWithProductsProjection,
    CartsWithProductsReadModel
} from "@/app/slices/CartWithProducts/CartsWithProductsProjection";
import {PostgreSqlContainer, StartedPostgreSqlContainer} from "@testcontainers/postgresql";
import {ItemRemoved} from "../../events/ItemRemoved"
import {ItemArchived} from "../../events/ItemArchived"
import {CartCreated} from "../../events/CartCreated"
import {CartCleared} from "../../events/CartCleared"
import {ItemAdded} from "../../events/ItemAdded"

describe('CartsWithProducts Specification', () => {
    let postgres: StartedPostgreSqlContainer;
    let connectionString: string

    let given: PostgreSQLProjectionSpec<ItemRemoved | ItemArchived | CartCreated | CartCleared | ItemAdded>

    before(async () => {
        postgres = await new PostgreSqlContainer("postgres").start();
        connectionString = postgres.getConnectionUri();

        given = PostgreSQLProjectionSpec.for({
            projection: CartsWithProductsProjection,
            connectionString,
        });
    });

    it('spec:  cart with products and item archived', async () => {
        const aggregateId = "e132ba29-5fb0-4e1f-b221-d002d2915620"
        const itemId = "01921f73-e8d3-4aef-a941-458495e9d23c"
        const description = "99731abc-9320-4b3c-b2aa-6e9c1c157804"
        const image = "967e3211-b91f-4f7c-b562-ab635edaef94"
        const price = 561.732463147788
        const productId = "821ee421-6764-43cb-a32e-d9b6a32d4891"
        await given([{
            type: 'ItemArchived',
            data: {
                aggregateId: aggregateId,
                itemId: itemId
            },
            metadata: {streamName: 'a2c1bf8a-5b50-42e5-83fd-67bc42ade4a5'}
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
                metadata: {streamName: 'a2c1bf8a-5b50-42e5-83fd-67bc42ade4a5'}
            },
            {
                type: 'CartCreated',
                data: {
                    aggregateId: aggregateId
                },
                metadata: {streamName: 'a2c1bf8a-5b50-42e5-83fd-67bc42ade4a5'}
            }])
            .when([])
            .then(
                expectPongoDocuments
                    .fromCollection<CartsWithProductsReadModel>(
                        "CartsWithProducts-collection",
                    )
                    .withId("a2c1bf8a-5b50-42e5-83fd-67bc42ade4a5")
                    .toBeEqual({
                        data: [{
                            aggregateId: aggregateId,
                            productId: productId
                        }]
                    }),
            );
    });
    it('spec:  cart with products', async () => {
        const aggregateId = "162fbdaa-1148-457f-9054-502f4c0f679f"
        const description = "da122350-c881-4733-9b13-b6a66b8b67d3"
        const image = "4251ad01-011f-4f38-b950-fa0ee977a61b"
        const price = 546.1380701593133
        const itemId = "1cbd03a6-1725-4117-9610-c2de28e3e963"
        const productId = "7ad2f2fe-5b21-468f-9cb6-84345d3bc355"
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
            metadata: {streamName: '84733cf5-8eed-4853-b8ec-500723a2e50c'}
        },
            {
                type: 'CartCreated',
                data: {
                    aggregateId: aggregateId
                },
                metadata: {streamName: '84733cf5-8eed-4853-b8ec-500723a2e50c'}
            }])
            .when([])
            .then(
                expectPongoDocuments
                    .fromCollection<CartsWithProductsReadModel>(
                        "CartsWithProducts-collection",
                    )
                    .withId("84733cf5-8eed-4853-b8ec-500723a2e50c")
                    .toBeEqual({
                        data: [{
                            aggregateId: aggregateId,
                            productId: productId
                        }]
                    }),
            );
    });

});
