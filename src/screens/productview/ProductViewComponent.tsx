import React, {useState} from 'react';
import {Navigation} from "../../components/navigation/Navigation";


import {AddItemCommandComponent} from "../../slices/AddItem/ui/AddItemCommandStateChange"



export default function ProductViewComponent(props: any) {

    const [view, setView] = useState<string>()

                    return (

            <div className="content container">
                <Navigation/>
                <img className="banner" src={"/assets/banner.png"}/>

                <main>
                    <div className="grid">
                        
                        <div className={"cell command"}
                             onClick={() => setView("additem")}>
                            <h3>AddItem</h3>
                            <div>
                                COMMAND
                            </div>
                        </div>
                   </div>

                 {/* main */}
                  <div className={"top-margin"}/>

                   {view == "additem" ? <AddItemCommandComponent/> : <span/>}

                </main>
            </div>

    );
}
