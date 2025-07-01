import type {Command} from '@event-driven-io/emmett'
import {CommandHandler} from '@event-driven-io/emmett';
import {CartEvents} from "@/app/events/CartEvents";
import {findEventstore} from "@/app/common/loadPostgresEventstore";


export type ChangeInventoryCommand = Command<'ChangeInventory', {
    inventory: number,
    productId: string,
}>;

export type ChangeInventoryState = {
    inventory?: Record<string, number>; // productId -> inventory count
}

export const ChangeInventoryInitialState = (): ChangeInventoryState => ({});

export const evolve = (
    state: ChangeInventoryState,
    event: CartEvents,
): ChangeInventoryState => {
    const {type, data} = event;

    switch (type) {
        case "InventoryChanged":
            return {
                ...state,
                inventory: {
                    ...state.inventory,
                    [data.productId]: data.inventory
                }
            };
        default:
            return state;
    }
};

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
    }];
};

const ChangeInventoryCommandHandler = CommandHandler<ChangeInventoryState, CartEvents>({
    evolve,
    initialState: ChangeInventoryInitialState
});

export const handleChangeInventory = async (id: string, command: ChangeInventoryCommand) => {
    const eventStore = await findEventstore()
    await ChangeInventoryCommandHandler(eventStore, id, (state: ChangeInventoryState) => decide(command, state))
}