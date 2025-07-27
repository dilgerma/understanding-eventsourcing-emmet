import {ProcessorConfig, startProcessor} from "../../process/process";
import {CartsToBePublishedReadModel} from "../CartsToBePublished/CartsToBePublishedProjection";
import {handlePublishCart, PublishCartCommand} from "./PublishCartCommand";

const config: ProcessorConfig = {
    schedule: '*/30 * * * * *',
    endpoint: "CartsToBePublished-collection"
}

const idAttribute = "aggregateId"


export const processor = {
    start: () => {
        startProcessor(config, async (item: CartsToBePublishedReadModel) => {
            console.log(`Processing ${JSON.stringify(item)} from List ${config.endpoint}`);
            const command: PublishCartCommand = {
                type: "PublishCart",
                data: {
                   			aggregateId:item.data.aggregateId!,
			orderedProducts:item.data.orderedProducts!,
			totalPrice:item.data.totalPrice!
                },metadata: {}
            }
            const id =  command.data[idAttribute]
            if (!id) {
                throw `Cannot process Command ${command.type}. No Id available.`
            }

            await handlePublishCart(command.data[idAttribute], command);
        })
    }
}
