import {DeciderSpecification} from '@event-driven-io/emmett';
import {AddItemCommand, AddItemState, decide, evolve} from "./AddItemCommand";
import {describe, it} from "node:test";


describe('AddItem Specification', () => {

    const given = DeciderSpecification.for({
        decide,
        evolve,
        initialState: () => ({})
    });

    it('spec: At most 3 Items', () => {

        const command: AddItemCommand = {
            type: 'AddItem',
            data: {
                aggregateId: "747287fe-99b0-4d83-ab08-5c99064919b5",
                description: "6008f2f6-d102-442a-adf1-bf081fdf23fb",
                price: 625.6024742231267,
                itemId: "088f6233-4814-458c-a236-b89d3643483b",
                name: "c27c0bad-396d-4605-a9b1-116c9cd64c72",
                productId: "2edcb8e1-3c98-4be7-882c-d292accb138a"
            },
            metadata: {now: new Date()},
        }

        given([{
            type: 'ItemAdded',
            data: {
                aggregateId: "e1f59b6f-1b49-441a-a4df-02487d63ca52",
                description: "f3f06a33-88bf-426b-ab9f-18917989ee01",
                itemId: "ad514c4f-1b31-4add-8b8f-f71b8c808ef8",
                name: "819391d8-0147-4843-bcac-2d285e5a02af",
                price: 663.7580659367235,
                productId: "aa2c3afc-b252-45b7-a16f-5921ae30e52c"
            },
            metadata: {}
        },
            {
                type: 'ItemAdded',
                data: {
                    aggregateId: "dc7ba0b3-f4c3-4d02-ba40-bb42d4121426",
                    description: "6d15c14d-4fce-48cf-a2c7-913accb99b06",
                    itemId: "5eab9dcb-788d-44ba-a2e0-dea4fa43de61",
                    name: "4d8542d2-078c-4722-b062-7d1bf39d7f44",
                    price: 850.88048134684,
                    productId: "9e67e910-432f-402e-b8ff-fc826d9e169f"
                },
                metadata: {}
            },
            {
                type: 'ItemAdded',
                data: {
                    aggregateId: "21d25fc4-935a-4534-973d-de0aee27e94a",
                    description: "754db9cc-b46e-4304-aab7-97875e72b229",
                    itemId: "2fcfc04f-6c4d-4d60-9d76-f02101507148",
                    name: "647f9ad7-40e3-465b-98ac-d1334f904ae5",
                    price: 435.19331484217895,
                    productId: "5d4932fb-9cb9-4a15-876f-d90ae7b7b17a"
                },
                metadata: {}
            }])
            .when(command)
            .thenThrows()
    });
    it('spec: Add Item', () => {

        const command: AddItemCommand = {
            type: 'AddItem',
            data: {
                aggregateId: "3f655ae3-0b89-4a2f-b33f-9376becb43a1",
                description: "52a72fbc-5851-4b84-a410-eb4e20c45a69",
                price: 40.35934663124596,
                itemId: "6217c856-95bd-401e-85ee-d70c5292d1fd",
                name: "fdc63646-4999-471e-8206-f3bb4ec3f195",
                productId: "6a54f5a1-232a-4fee-806d-35826afba7eb"
            },
            metadata: {now: new Date()},
        }

        given([])
            .when(command)
            .then([{
                type: 'ItemAdded',
                data: {
                    aggregateId: command.data.aggregateId,
                    description: command.data.description,
                    itemId: command.data.itemId,
                    name: command.data.name,
                    price: command.data.price,
                    productId: command.data.productId
                },
                metadata: {}
            }])
    });

});
