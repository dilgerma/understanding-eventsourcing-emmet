import {before, describe, it} from "node:test";
import {expectPongoDocuments, PostgreSQLProjectionSpec} from "@event-driven-io/emmett-postgresql";
import {InventoriesProjection, InventoriesReadModel} from "@/app/slices/Inventories/InventoriesProjection";
import {PostgreSqlContainer, StartedPostgreSqlContainer} from "@testcontainers/postgresql";
import {InventoryChanged} from "../../events/InventoryChanged"

describe('Inventories Specification', () => {
    let postgres: StartedPostgreSqlContainer;
    let connectionString: string

    let given: PostgreSQLProjectionSpec<InventoryChanged>

    before(async () => {
        postgres = await new PostgreSqlContainer("postgres").start();
        connectionString = postgres.getConnectionUri();

        given = PostgreSQLProjectionSpec.for({
            projection: InventoriesProjection,
            connectionString,
        });
    });

    it('spec:  Inventories', async () => {
        const inventory = 416
        const productId = "276e033a-86c6-4b96-9ae1-b3c4e1d082d2"
        await given([{
            type: 'InventoryChanged',
            data: {
                inventory: inventory,
                productId: productId
            },
            metadata: {streamName: '036cf052-c105-40e8-a102-640011d25edd'}
        }])
            .when([])
            .then(
                expectPongoDocuments
                    .fromCollection<InventoriesReadModel>(
                        "Inventories-collection",
                    )
                    .withId("036cf052-c105-40e8-a102-640011d25edd")
                    .toBeEqual({
                        data: {
                            inventory: inventory,
                            productId: productId
                        }
                    }),
            );
    });

});
