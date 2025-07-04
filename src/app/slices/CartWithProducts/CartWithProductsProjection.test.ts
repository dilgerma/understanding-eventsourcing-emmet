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
        const aggregateId = "9dbd497d-bc90-491f-9cfb-ff7d2f625e7f"
        const description = "06452118-f6a0-45a7-833a-ade5ff28afe5"
        const image = "d21ed698-1381-4c46-a087-41b8ca0aceea"
        const itemId = "fb890b41-9488-418c-b124-20624bd5716f"
        const price = 956.0588023094891
        const productId = "0851f5bd-663d-47bb-8c9a-2b351c7144a0"
        await given([{
            type: 'ItemArchived',
            data: {
                aggregateId: aggregateId,
                itemId: itemId
            },
            metadata: {streamName: 'c157a928-a1f3-46dd-b443-619b778b1f09'}
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
                metadata: {streamName: 'c157a928-a1f3-46dd-b443-619b778b1f09'}
            },
            {
                type: 'CartCreated',
                data: {
                    aggregateId: aggregateId
                },
                metadata: {streamName: 'c157a928-a1f3-46dd-b443-619b778b1f09'}
            }])
            .when([])
            .then(
                expectPongoDocuments
                    .fromCollection<CartsWithProductsReadModel>(
                        "CartsWithProducts-collection",
                    )
                    .withId("c157a928-a1f3-46dd-b443-619b778b1f09")
                    .toBeEqual({
                        data: [{
                            aggregateId: aggregateId,
                            productId: productId
                        }]
                    }),
            );
    });
    it('spec:  cart with products', async () => {
        const aggregateId = "6d20bb9e-44cc-4143-b816-6dedfe0f1981"
        const description = "90be2981-2bd0-4ae7-8cd2-f8daec87ba37"
        const image = "b8a534fb-06c4-4bca-9801-946efb789f01"
        const itemId = "caf4940a-5e0b-4ed3-8a2b-f308ba8ac063"
        const price = 768.1188509414393
        const productId = "e31135b5-1b21-43b8-a8ab-f32e4dc9cc5e"
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
            metadata: {streamName: '2922d14b-b7ed-4652-9918-ab8dd187e950'}
        },
            {
                type: 'CartCreated',
                data: {
                    aggregateId: aggregateId
                },
                metadata: {streamName: '2922d14b-b7ed-4652-9918-ab8dd187e950'}
            }])
            .when([])
            .then(
                expectPongoDocuments
                    .fromCollection<CartsWithProductsReadModel>(
                        "CartsWithProducts-collection",
                    )
                    .withId("2922d14b-b7ed-4652-9918-ab8dd187e950")
                    .toBeEqual({
                        data: [{
                            aggregateId: aggregateId,
                            productId: productId
                        }]
                    }),
            );
    });

});
