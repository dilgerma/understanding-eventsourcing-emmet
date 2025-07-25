import type { Command } from '@event-driven-io/emmett'
import { CommandHandler } from '@event-driven-io/emmett';
import {CartEvents} from "../../events/CartEvents";
import {findEventstore} from "../../common/loadPostgresEventstore";

export type ImportInventoryCommand = Command<'ImportInventory', {
          inventory: number,
  productId: string
        },
        {
            correlation_id?:string,
causation_id?:string
        }|undefined>;

// TODO-AI keep attributes in state optional
export type ImportInventoryState = {
}

export const ImportInventoryInitialState = (): ImportInventoryState => ({
});

export const evolve = (
    state: ImportInventoryState,
    event: CartEvents,
): ImportInventoryState => {
    const { type, data } = event;

    switch (type) {
        // case "..Event":
        default:
            return state;
    }
};

/*
AI-TODO start: implement according to the specifications provided.
Stick to the specification, don´t add new fields, which are not specified.

in case an error is expected - throw an error

Remove the TODO Comment afterwards.


AI-TODO end
*/
    export const decide = (
    command: ImportInventoryCommand,
    state: ImportInventoryState,
): CartEvents[] => {
    return [{
        type: "InventoryUpdated",
            data: {
        			inventory:command.data.inventory,
			productId:command.data.productId
    }, metadata: {
        correlation_id: command.metadata?.correlation_id,
        causation_id: command.metadata?.causation_id
    }}]
};


const ImportInventoryCommandHandler = CommandHandler<ImportInventoryState, CartEvents>({evolve,initialState:ImportInventoryInitialState});

export const handleImportInventory = async (id:string,command:ImportInventoryCommand) => {
    const eventStore = await findEventstore()
    await ImportInventoryCommandHandler(eventStore, id, (state:ImportInventoryState)=>decide(command,state))

}

