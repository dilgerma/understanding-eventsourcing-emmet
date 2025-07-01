import {getPostgreSQLEventStore} from "@event-driven-io/emmett-postgresql";
import {projections} from "@event-driven-io/emmett";
import {postgresUrl} from "@/app/common/db";
import {CartItemsProjection} from "@/app/slices/CartItems/CartItemsProjection"
import {InventoriesProjection} from "@/app/slices/Inventories/InventoriesProjection"
import {CartsWithProductsProjection} from "@/app/slices/CartWithProducts/CartsWithProductsProjection"
import {ChangedPricesProjection} from "@/app/slices/ChangedPrices/ChangedPricesProjection"
import {SubmittedCartDataProjection} from "@/app/slices/SubmittedCartData/SubmittedCartDataProjection"

export const findEventstore = async () => {


    return getPostgreSQLEventStore(postgresUrl, {
        projections: projections.inline([
            CartItemsProjection,
            InventoriesProjection,
            CartsWithProductsProjection,
            ChangedPricesProjection,
            SubmittedCartDataProjection
        ]),
    });

}