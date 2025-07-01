'use client';

import {useState} from 'react';
import {RemoveItemCommand} from "@/app/slices/RemoveItem/RemoveItemCommand";

export const RemoveItem = () => {


    const [itemId, setItemId] = useState("")
    const [aggregateId, setAggregateId] = useState("")


    return (
        <div className="flex flex-col gap-2 p-4 max-w-sm">
            <div><input
                name="aggregateId"
                placeholder="Aggregate ID"
                value={aggregateId}
                onChange={(evt) => setAggregateId(evt.target.value)}
                className="border p-2 rounded"
            /></div>

            <div><input
                name="itemId"
                placeholder="Item ID"
                value={itemId}
                onChange={(evt) => setItemId(evt.target.value)}
                className="border p-2 rounded"
            /></div>
            <button
                onClick={async () => {
                    const command: RemoveItemCommand = {
                        type: 'RemoveItem',
                        data: {
                            aggregateId,
                            itemId
                        },
                    };

                    await fetch('/api/removeitem', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(command),
                    });
                }}
                className="mt-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
                Remove item
            </button>
        </div>
    );
};
