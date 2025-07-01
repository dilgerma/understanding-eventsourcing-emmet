import type {Command} from '@event-driven-io/emmett'
import {CommandHandler} from '@event-driven-io/emmett';
import {CartEvents} from "@/app/events/CartEvents";
import {findEventstore} from "@/app/common/loadPostgresEventstore";


export type PublishCartCommand = Command<'PublishCart', {
    aggregateId: string,
    orderedProducts: Array<any>,
    totalPrice: number,
}>;

export type PublishCartState = {
    cartExists?: boolean;
    cartPublished?: boolean;
    cartSubmitted?: boolean;
    hasItems?: boolean;
}

export const PublishCartInitialState = (): PublishCartState => ({});

export const evolve = (
    state: PublishCartState,
    event: CartEvents,
): PublishCartState => {
    const {type, data} = event;

    switch (type) {
        case "CartCreated":
            return {
                ...state,
                cartExists: true
            };

        case "CartPublished":
            return {
                ...state,
                cartPublished: true
            };

        case "CartSubmitted":
            return {
                ...state,
                cartSubmitted: true
            };

        case "ItemAdded":
            return {
                ...state,
                hasItems: true
            };

        default:
            return state;
    }
};

export const decide = (
    command: PublishCartCommand,
    state: PublishCartState,
): CartEvents[] => {
    // Check if cart has already been published - cannot republish
    if (state.cartPublished) {
        return [{
            type: "CartPublicationFailed",
            data: {
                aggregateId: command.data.aggregateId,
            }
        }];
    }

    // If cart hasn't been published yet, publish it successfully
    return [{
        type: "CartPublished",
        data: {
            aggregateId: command.data.aggregateId,
        }
    }];
};

const PublishCartCommandHandler = CommandHandler<PublishCartState, CartEvents>({
    evolve,
    initialState: PublishCartInitialState
});

export const handlePublishCart = async (id: string, command: PublishCartCommand) => {
    const eventStore = await findEventstore()
    await PublishCartCommandHandler(eventStore, id, (state: PublishCartState) => decide(command, state))
}