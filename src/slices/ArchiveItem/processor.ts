import {ProcessorConfig, startProcessor} from "../../process/process";
import {ItemsToBeArchivedReadModel} from "../ItemsToBeArchived/ItemsToBeArchivedProjection";
import {handleArchiveItem, ArchiveItemCommand} from "./ArchiveItemCommand";

const config: ProcessorConfig = {
    schedule: '*/30 * * * * *',
    endpoint: "ItemsToBeArchived-collection"
}

const idAttribute = "aggregateId"


export const processor = {
    start: () => {
        startProcessor(config, async (item: ItemsToBeArchivedReadModel) => {
            console.log(`Processing ${JSON.stringify(item)} from List ${config.endpoint}`);
            const command: ArchiveItemCommand = {
                type: "ArchiveItem",
                data: {
                   			aggregateId:item.data.aggregateId!,
			itemId:item.data.itemId!,
			productId:item.data.productId!
                },metadata: {}
            }
            await handleArchiveItem(command.data[idAttribute], command)
        })
    }
}
