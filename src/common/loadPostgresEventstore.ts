import {getPostgreSQLEventStore} from "@event-driven-io/emmett-postgresql";
import {projections} from "@event-driven-io/emmett";
import {postgresUrl} from "./db";
import {CartItemsProjection} from "../slices/CartItems/CartItemsProjection"
import {ProductsWithPriceChangesProjection} from "../slices/ProductsWithPriceChanges/ProductsWithPriceChangesProjection"
import {CartsWithProductsProjection} from "../slices/ProductsWithPriceChanges/CartsWithProductsProjection"
import {ItemsToBeArchivedProjection} from "../slices/ItemsToBeArchived/ItemsToBeArchivedProjection"
import {InventoriesProjection} from "../slices/Inventories/InventoriesProjection"
import {CartsToBePublishedProjection} from "../slices/CartsToBePublished/CartsToBePublishedProjection"

export const findEventstore = async () => {


    return getPostgreSQLEventStore(postgresUrl, {
        projections: projections.inline([
            CartItemsProjection,
ProductsWithPriceChangesProjection,
CartsWithProductsProjection,
ItemsToBeArchivedProjection,
InventoriesProjection,
CartsToBePublishedProjection
        ]),
});

}