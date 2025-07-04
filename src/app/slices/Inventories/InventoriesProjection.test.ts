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
        const inventory = 345
        const productId = "15e8f4d9-6ef8-42ae-b6de-bc0bf77e54d8"
        await given([{
            type: 'InventoryChanged',
            data: {
                inventory: inventory,
                productId: productId
            },
            metadata: {streamName: 'd07e94de-9bcd-4564-8e02-a8533baa6646'}
        }])
            .when([])
            .then(
                expectPongoDocuments
                    .fromCollection<InventoriesReadModel>(
                        "Inventories-collection",
                    )
                    .withId("d07e94de-9bcd-4564-8e02-a8533baa6646")
                    .toBeEqual({
                        data: {
                            inventory: inventory,
                            productId: productId
                        }
                    }),
            );
    });

});
