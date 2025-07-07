import {before, describe, it} from "node:test";
import {expectPongoDocuments, PostgreSQLProjectionSpec} from "@event-driven-io/emmett-postgresql";
import {TODOItemsProjection, TODOItemsReadModelItem} from "@/app/slices/TODOItems/TODOItemsProjection";
import {PostgreSqlContainer, StartedPostgreSqlContainer} from "@testcontainers/postgresql";
import {TODOItemCreated} from "../../events/TODOItemCreated"

describe('TODOItems Specification', () => {
    let postgres: StartedPostgreSqlContainer;
    let connectionString: string

    let given: PostgreSQLProjectionSpec<TODOItemCreated>

    before(async () => {
        postgres = await new PostgreSqlContainer("postgres").start();
        connectionString = postgres.getConnectionUri();

        given = PostgreSQLProjectionSpec.for({
            projection: TODOItemsProjection,
            connectionString,
        });
    });

    it('spec: TODO Items', async () => {
        const createdAt = new Date()
        const itemId = "2"
        const name = "test-name"
        await given([{
            type: 'TODOItemCreated',
            data: {
                itemId: itemId,
                name: name,
                createdAt: createdAt
            },
            metadata: {streamName: 'd295d10a-a123-48a3-b3ae-41e934ced794'}
        }])
            .when([])
            .then(
                expectPongoDocuments
                    .fromCollection<TODOItemsReadModelItem>(
                        "TODOItems-collection",
                    )
                    .withId("d295d10a-a123-48a3-b3ae-41e934ced794")
                    .toBeEqual({
                        itemId: "from assertion",

                    }),
            );


    });


});
