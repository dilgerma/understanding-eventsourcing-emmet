// app/api/contact/route.ts
import {NextRequest, NextResponse} from 'next/server';
import {ChangePriceCommand, handleChangePrice} from "@/app/slices/ChangePrice/ChangePriceCommand";

export async function POST(req: NextRequest) {
    try {
        const command = (await req.json()) as ChangePriceCommand;
        await handleChangePrice(command.data.aggregateId, command)
        return NextResponse.json({ok: true}, {status: 200});
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            {ok: false, error: 'Server error'},
            {status: 500}
        );
    }
}
