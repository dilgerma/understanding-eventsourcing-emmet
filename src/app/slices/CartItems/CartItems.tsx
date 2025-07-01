"use client"
import {CartItemsReadModel} from "@/app/slices/CartItems/CartItemsProjection";
import {WithIdAndVersion} from "@event-driven-io/pongo";
import {useEffect, useState} from "react";

export const CartItems = () => {

    const [cartItems, setCartItems] = useState<WithIdAndVersion<CartItemsReadModel>>()

    useEffect(() => {
        const init = (async () => {
            const res = await fetch('/api/cartitems/20   ', {
                headers: {'Content-Type': 'application/json'}
            });
            const cartItems = await res.json()
            setCartItems(cartItems)
        })
        init()


    }, []);

    return <div>
        <div>Foo {cartItems?.data?.length ?? 0}</div>
        {cartItems?.data?.map((item, idx) => <div key={idx}><h3>Item {idx}</h3>
            <div>Image: {item.image}</div>
            <div>{JSON.stringify(item)}</div>
            <div>Descrition: {item.description}</div>
        </div>)}
    </div>
}