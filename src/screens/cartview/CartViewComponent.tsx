import React, {useState} from 'react';
import {Navigation} from "../../components/navigation/Navigation";


import {ClearCartCommandComponent} from "../../slices/ClearCart/ui/ClearCartCommandStateChange"
import {RemoveItemCommandComponent} from "../../slices/ItemRemoved/ui/RemoveItemCommandStateChange"
import {SubmitCartCommandComponent} from "../../slices/SubmitCart/ui/SubmitCartCommandStateChange"
import {CartItemsReadModelStateView} from "../../slices/CartItems/ui/CartItemsReadModelStateView"
import {InventoriesReadModelStateView} from "../../slices/Inventories/ui/InventoriesReadModelStateView"


export default function CartViewComponent(props: any) {

    const [view, setView] = useState<string>()

                    return (

            <div className="content container">
                <Navigation/>
                <img className="banner" src={"/assets/banner.png"}/>

                <main>
                    <div className="grid">
                        
                        <div className={"cell command"}
                             onClick={() => setView("clearcart")}>
                            <h3>ClearCart</h3>
                            <div>
                                COMMAND
                            </div>
                        </div>

                        <div className={"cell command"}
                             onClick={() => setView("removeitem")}>
                            <h3>RemoveItem</h3>
                            <div>
                                COMMAND
                            </div>
                        </div>

                        <div className={"cell command"}
                             onClick={() => setView("submitcart")}>
                            <h3>SubmitCart</h3>
                            <div>
                                COMMAND
                            </div>
                        </div>

                        <div className={"cell readmodel"}
                             onClick={() => setView("cartitems")}>
                            <h3>cartitems</h3>
                            <div>
                                READMODEL
                            </div>
                        </div>

                        <div className={"cell readmodel"}
                             onClick={() => setView("inventories")}>
                            <h3>inventories</h3>
                            <div>
                                READMODEL
                            </div>
                        </div>
                   </div>

                 {/* main */}
                  <div className={"top-margin"}/>

                   {view == "clearcart" ? <ClearCartCommandComponent/> : <span/>}
{view == "removeitem" ? <RemoveItemCommandComponent/> : <span/>}
{view == "submitcart" ? <SubmitCartCommandComponent/> : <span/>}
{view == "cartitems" ? <CartItemsReadModelStateView/> : <span/>}
{view == "inventories" ? <InventoriesReadModelStateView/> : <span/>}

                </main>
            </div>

    );
}
