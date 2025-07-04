import type {Command} from '@event-driven-io/emmett'
import {CommandHandler} from '@event-driven-io/emmett';
import {CartEvents} from "@/app/events/CartEvents";
import {findEventstore} from "@/app/common/loadPostgresEventstore";


export type ChangeInventoryCommand = Command<'ChangeInventory', {
    inventory: number,
    productId: string,
}>;

// TODO-AI keep attributes in state optional
export type ChangeInventoryState = {}

export const ChangeInventoryInitialState = (): ChangeInventoryState => ({});

export const evolve = (
    state: ChangeInventoryState,
    event: CartEvents,
): ChangeInventoryState => {
    const {type, data} = event;

    switch (type) {
        // case "..Event":
        default:
            return state;
    }
};

/*
AI-TODO start: implement according to the specifications provided.

in case an error is expected - throw an error

Remove the TODO Comment afterwards.


# Spec Start
Title: spec:  change inventory
### Given (Events): None
### When (Command):
  * Change Inventory
### Then:
  * Inventory Changed
# Spec End
AI-TODO end
*/
export const decide = (
    command: ChangeInventoryCommand,
    state: ChangeInventoryState,
): CartEvents[] => {
    return [{
        type: "InventoryChanged",
        data: {
            inventory: command.data.inventory,
            productId: command.data.productId
        }
    }]
};


const ChangeInventoryCommandHandler = CommandHandler<ChangeInventoryState, CartEvents>({
    evolve,
    initialState: ChangeInventoryInitialState
});

export const handleChangeInventory = async (id: string, command: ChangeInventoryCommand) => {
    const eventStore = await findEventstore()
    await ChangeInventoryCommandHandler(eventStore, id, (state: ChangeInventoryState) => decide(command, state))

}

