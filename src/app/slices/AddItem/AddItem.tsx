'use client';

import {useState} from 'react';
import {AddItemCommand} from '@/app/slices/AddItem/AddItemCommand';

export const AddItem = () => {
    const [form, setForm] = useState({
        aggregateId: '',
        description: '',
        image: '',
        price: 0,
        itemId: '',
        productId: '',
    });

    /** Update a single field */
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const {name, value} = e.target;
        setForm(prev => ({
            ...prev,
            [name]: name === 'price' ? Number(value) : value,
        }));
    };

    /** POST the command */
    const handleSubmit = async () => {
        const command: AddItemCommand = {
            type: 'AddItem',
            data: {
                aggregateId: form.aggregateId,
                description: form.description,
                image: form.image,
                price: form.price,
                itemId: form.itemId,
                productId: form.productId,
            },
        };

        await fetch('/api/additem', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(command),
        });

        // (Optional) reset or give feedback
    };

    return (
        <div className="flex flex-col gap-2 p-4 max-w-sm">
            <div><input
                name="aggregateId"
                placeholder="Aggregate ID"
                value={form.aggregateId}
                onChange={handleChange}
                className="border p-2 rounded"
            /></div>
            <div><textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                className="border p-2 rounded"
            /></div>
            <div><input
                name="image"
                placeholder="Image URL"
                value={form.image}
                onChange={handleChange}
                className="border p-2 rounded"
            /></div>
            <div><input
                type="number"
                name="price"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                className="border p-2 rounded"
            /></div>
            <div><input
                name="itemId"
                placeholder="Item ID"
                value={form.itemId}
                onChange={handleChange}
                className="border p-2 rounded"
            /></div>
            <div><input
                name="productId"
                placeholder="Product ID"
                value={form.productId}
                onChange={handleChange}
                className="border p-2 rounded"
            /></div>

            <button
                onClick={handleSubmit}
                className="mt-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
                Add item
            </button>
        </div>
    );
};
