import {useState} from "react"
import DataTable from "../../../components/readmodel/DataTable";

export const CartsWithProductsReadModelStateView = () => {
    const endpoint = "cartswithproducts-collection"
    const [errorMode, setErrorMode] = useState(false)
    const [error, setError] = useState("")
    const [showFilter, setShowFilter] = useState(true)
    const [id, setId] = useState("")

    return <div>

        <h3>CartsWithProductsReadModel StateView</h3>
        {showFilter ? <div className="controls">
            <input onChange={(evt)=>{setId(evt.target.value)}} type="text" placeholder="Id" className="input"/>
        </div> : <span/> }
        <div className={"top-margin"}/>

        <div>
            <DataTable endpoint={endpoint} queries={{_id: id}}/>
        </div>
    </div>
}