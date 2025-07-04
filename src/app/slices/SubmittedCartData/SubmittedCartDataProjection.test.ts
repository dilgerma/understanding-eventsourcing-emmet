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
        const aggregateId = "2683ad29-7436-4545-b14a-f28e9ecf28d0"
        const description = "0f9b0707-4d2a-4c08-b5ed-cf70002851ac"
        const image = "7bfd6199-443c-4711-974e-a82095545326"
        const price = 688.0424513528052
        const itemId = "35706971-fab4-4ff7-8221-753508491c83"
        const productId = "0555494d-bf48-4df9-9a0b-ed22bad50592"
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
            metadata: {streamName: 'a567d788-9558-405a-81a1-cb11bfa69b74'}
        },
            {
                type: 'CartCreated',
                data: {
                    aggregateId: aggregateId
                },
                metadata: {streamName: 'a567d788-9558-405a-81a1-cb11bfa69b74'}
            }])
            .when([])
            .then(
                expectPongoDocuments
                    .fromCollection<SubmittedCartDataReadModel>(
                        "SubmittedCartData-collection",
                    )
                    .withId("a567d788-9558-405a-81a1-cb11bfa69b74")
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
        const aggregateId = "0b7c55c1-06fd-4cee-938c-23d34aefc510"
        const orderedProducts = null // todo: handle complex type
        const totalPrice = 999.6859008154362
        const description = "ec35816f-5520-42c5-b9ab-f2721bd1cb00"
        const image = "be9c42c9-557d-457a-9b24-fcb0c366bb1b"
        const price = 310.4695084951974
        const itemId = "7130e099-cb8a-4fd9-891e-23f3ca750bcf"
        const productId = "3e915e64-ff02-47c4-9ea7-40fee8f975c1"
        await given([{
            type: 'CartSubmitted',
            data: {
                aggregateId: aggregateId,
                orderedProducts: orderedProducts,
                totalPrice: totalPrice
            },
            metadata: {streamName: '5b9a95b1-5044-43ac-a978-bc8a415995ff'}
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
                metadata: {streamName: '5b9a95b1-5044-43ac-a978-bc8a415995ff'}
            },
            {
                type: 'CartCreated',
                data: {
                    aggregateId: aggregateId
                },
                metadata: {streamName: '5b9a95b1-5044-43ac-a978-bc8a415995ff'}
            }])
            .when([])
            .then(
                expectPongoDocuments
                    .fromCollection<SubmittedCartDataReadModel>(
                        "SubmittedCartData-collection",
                    )
                    .withId("5b9a95b1-5044-43ac-a978-bc8a415995ff")
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
