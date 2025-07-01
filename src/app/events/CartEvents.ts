import {CartCreated} from './CartCreated';
import {ItemAdded} from './ItemAdded';
import {ItemRemoved} from './ItemRemoved';
import {CartCleared} from './CartCleared';
import {InventoryChanged} from './InventoryChanged';
import {PriceChanged} from './PriceChanged';
import {ItemArchived} from './ItemArchived';
import {CartSubmitted} from './CartSubmitted';
import {CartPublicationFailed} from './CartPublicationFailed';
import {CartPublished} from './CartPublished';

export type CartEvents =
    CartCreated
    | ItemAdded
    | ItemRemoved
    | CartCleared
    | InventoryChanged
    | PriceChanged
    | ItemArchived
    | CartSubmitted
    | CartPublicationFailed
    | CartPublished;