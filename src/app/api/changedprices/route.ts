// app/api/contact/route.ts
import {NextRequest, NextResponse} from 'next/server';
import {ChangedPricesReadModel} from "@/app/slices/ChangedPrices/ChangedPricesProjection";
import {loadPongoClient} from "@/app/common/loadPongoClient";

export async function GET(req: NextRequest) {
    try {
        const client = loadPongoClient()
        const db = client.db();
        const collection = db.collection<ChangedPricesReadModel>("ChangedPrices-collection")
        const projection = await collection.find();
        // make sure not to serialize big ints
        const sanitized = JSON.parse(JSON.stringify(projection, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        ));

        return NextResponse.json(sanitized, {status: 200});
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            {ok: false, error: 'Server error'},
            {status: 500}
        );
    }
}
