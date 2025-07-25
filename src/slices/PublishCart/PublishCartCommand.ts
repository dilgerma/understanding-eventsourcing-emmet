import type {Command} from '@event-driven-io/emmett'
import {CommandHandler} from '@event-driven-io/emmett';
import {CartEvents} from "../../events/CartEvents";
import {findEventstore} from "../../common/loadPostgresEventstore";

export type PublishCartCommand = Command<'PublishCart', {
    aggregateId: string,
    orderedProducts: Array<any>,
    totalPrice: number
},
    {
        correlation_id?: string,
        causation_id?: string,
        now?: Date,
        streamName?: string,
    }>;

// TODO-AI keep attributes in state optional
export type PublishCartState = {}

export const PublishCartInitialState = (): PublishCartState => ({});

export const evolve = (
    state: PublishCartState,
    event: CartEvents,
): PublishCartState => {
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
    command: PublishCartCommand,
    state: PublishCartState,
): CartEvents[] => {
    return [{
        type: "CartPublished",
        data: {
            aggregateId: command.data.aggregateId,
            orderedProducts: command.data.orderedProducts,
            totalPrice: command.data.totalPrice
        }, metadata: {
            correlation_id: command.metadata?.correlation_id,
            causation_id: command.metadata?.causation_id
        }
    }]
};


const PublishCartCommandHandler = CommandHandler<PublishCartState, CartEvents>({
    evolve,
    initialState: PublishCartInitialState
});

export const handlePublishCart = async (id: string, command: PublishCartCommand) => {
    const eventStore = await findEventstore()
    const result = await PublishCartCommandHandler(eventStore, id, (state: PublishCartState) => decide(command, state))
    return {
        nextExpectedStreamVersion: result.nextExpectedStreamVersion,
        lastEventGlobalPosition: result.lastEventGlobalPosition
    }
}

