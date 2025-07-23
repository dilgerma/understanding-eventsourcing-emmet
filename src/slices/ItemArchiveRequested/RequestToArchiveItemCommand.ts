import type {Command} from '@event-driven-io/emmett'
import {CommandHandler} from '@event-driven-io/emmett';
import {CartEvents} from "../../events/CartEvents";
import {findEventstore} from "../../common/loadPostgresEventstore";

export type RequestToArchiveItemCommand = Command<'RequestToArchiveItem', {
    aggregateId: string,
    productId: string,
    itemId: string,
}>;

// TODO-AI keep attributes in state optional
export type RequestToArchiveItemState = {}

export const RequestToArchiveItemInitialState = (): RequestToArchiveItemState => ({});

export const evolve = (
    state: RequestToArchiveItemState,
    event: CartEvents,
): RequestToArchiveItemState => {
    const {type, data} = event;

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
    command: RequestToArchiveItemCommand,
    state: RequestToArchiveItemState,
): CartEvents[] => {
    return [{
        type: "ItemArchiveRequested",
        data: {
            aggregateId: command.data.aggregateId,
            productId: command.data.productId,
            itemId: command.data.itemId
        }
    }]
};


const RequestToArchiveItemCommandHandler = CommandHandler<RequestToArchiveItemState, CartEvents>({
    evolve,
    initialState: RequestToArchiveItemInitialState
});

export const handleRequestToArchiveItem = async (id: string, command: RequestToArchiveItemCommand) => {
    const eventStore = await findEventstore()
    await RequestToArchiveItemCommandHandler(eventStore, id, (state: RequestToArchiveItemState) => decide(command, state))

}

