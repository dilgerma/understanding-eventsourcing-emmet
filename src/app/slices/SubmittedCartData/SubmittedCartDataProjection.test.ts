import {before, describe, it} from "node:test";
import {expectPongoDocuments, PostgreSQLProjectionSpec} from "@event-driven-io/emmett-postgresql";
import {
    SubmittedCartDataProjection,
    SubmittedCartDataReadModel
} from "@/app/slices/SubmittedCartData/SubmittedCartDataProjection";
import {PostgreSqlContainer, StartedPostgreSqlContainer} from "@testcontainers/postgresql";
import {CartSubmitted} from "../../events/CartSubmitted"

describe('SubmittedCartData Specification', () => {
    let postgres: StartedPostgreSqlContainer;
    let connectionString: string

    let given: PostgreSQLProjectionSpec<CartSubmitted>

    before(async () => {
        postgres = await new PostgreSqlContainer("postgres").start();
        connectionString = postgres.getConnectionUri();

        given = PostgreSQLProjectionSpec.for({
            projection: SubmittedCartDataProjection,
            connectionString,
        });
    });

    it('spec: empty submitted cart data', async () => {
        const aggregateId = "5f8ef868-5d03-4f47-8166-6bb9e5c5d931"
        const description = "6287a4ff-4e78-46a2-92fa-47012919ee71"
        const image = "53e450ad-8168-4dd7-a912-69e8cfe8406f"
        const itemId = "9eb3626f-0fbe-4e1d-8a06-e391110857ae"
        const price = 849.3870364740178
        const productId = "b8d3b9d2-12c1-487c-88b0-02e4961076ad"
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
            metadata: {streamName: 'c089a832-73a3-4498-9cc6-df3679061899'}
        },
            {
                type: 'CartCreated',
                data: {
                    aggregateId: aggregateId
                },
                metadata: {streamName: 'c089a832-73a3-4498-9cc6-df3679061899'}
            }])
            .when([])
            .then(
                expectPongoDocuments
                    .fromCollection<SubmittedCartDataReadModel>(
                        "SubmittedCartData-collection",
                    )
                    .withId("c089a832-73a3-4498-9cc6-df3679061899")
                    .toBeEqual({
                        data: {
                            aggregateId: aggregateId,
                            orderedProducts: productId, price,
// totalPrice: totalPrice
                        }
                    }),
            );
    });
    it('spec:  submitted cart data', async () => {
        const aggregateId = "b5867596-f75a-421a-80ab-21a08aae1dfe"
        const description = "9f259b1c-463a-41a8-a2f1-807a728cebc1"
        const image = "e1432c62-2b8b-4353-8f38-b38cedfbdbbf"
        const itemId = "76c1d036-71f6-4463-a671-ccf47b5183b7"
        const orderedProducts = null // todo: handle complex type
        const price = 314.2395437864213
        const productId = "73aa96c4-7bb7-4e14-b30d-5d542bf571c0"
        const totalPrice = 544.990063891091
        await given([{
            type: 'CartSubmitted',
            data: {
                aggregateId: aggregateId,
                orderedProducts: orderedProducts,
                totalPrice: totalPrice
            },
            metadata: {streamName: 'ebdff44f-bc49-412f-ba6a-03b9ead47348'}
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
                metadata: {streamName: 'ebdff44f-bc49-412f-ba6a-03b9ead47348'}
            },
            {
                type: 'CartCreated',
                data: {
                    aggregateId: aggregateId
                },
                metadata: {streamName: 'ebdff44f-bc49-412f-ba6a-03b9ead47348'}
            }])
            .when([])
            .then(
                expectPongoDocuments
                    .fromCollection<SubmittedCartDataReadModel>(
                        "SubmittedCartData-collection",
                    )
                    .withId("ebdff44f-bc49-412f-ba6a-03b9ead47348")
                    .toBeEqual({
                        data: {
                            aggregateId: aggregateId,
                            orderedProducts: productId, price,
                            totalPrice: totalPrice
                        }
                    }),
            );
    });

});
