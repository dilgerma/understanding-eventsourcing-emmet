import {useState} from "react"
import {JsonForm} from "../../../components/commandselection/JsonForm";
import schema from './ImportInventoryCommand.json'
import {parseEndpoint} from "../../../components/util/parseEndpoint";

export const ImportInventoryCommandComponent = () => {
    const endpoint = "/api/importinventory"
    const idAttribute = "inventory"
    const [errorMode, setErrorMode] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)


    return <div>

        {errorMode ? <div className={"notification is-danger"}>Error in Command-Processing<br/>{error}</div> :
            <span/>}
        {success ? <div className={"notification is-info"}>Command Processed successfully<br/></div> :
                <span/>}

        <h3>ImportInventoryCommand</h3>
        <div>
            <JsonForm schema={schema} handleCommand={(command: any) => {
                setErrorMode(false)
                setSuccess(false)
                // ${idAttribute}
                fetch(parseEndpoint(`${endpoint}/${command?.data[idAttribute]}`, command.data), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(command.data)
                })
                  .then((response)=>{
                        if (response.status === 200) {
                            setSuccess(true)
                        } else {
                            setErrorMode(true)
                            setError(response.statusText)
                        }
                    })
                    .catch((error: any) => {
                        setErrorMode(true);
                        setErrorMode(error)
                    });
            }}/>
        </div>
    </div>
}