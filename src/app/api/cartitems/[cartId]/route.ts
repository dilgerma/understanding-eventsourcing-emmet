// app/api/contact/route.ts
import {NextRequest, NextResponse} from 'next/server';
import {CartItemsReadModel} from "@/app/slices/CartItems/CartItemsProjection";
import {loadPongoClient} from "@/app/common/loadPongoClient";

export async function GET(req: NextRequest,
                          {params}: { params: { cartId: string } }) {
    try {
        const {cartId} = await params
        const client = loadPongoClient()
        const db = client.db();
        const collection = db.collection<CartItemsReadModel>("CartItems-collection")
        console.log(`Loading for ${cartId}`)
        const projection = await collection.findOne({_id: cartId});
        // make sure not to serialize big ints
        const sanitized = JSON.parse(JSON.stringify(projection, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        ));
        console.log("Result " + JSON.stringify(sanitized, null, 2))

        return NextResponse.json(sanitized, {status: 200});
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            {ok: false, error: 'Server error'},
            {status: 500}
        );
    }
}
