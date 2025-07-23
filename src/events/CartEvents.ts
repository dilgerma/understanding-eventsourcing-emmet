import {ItemAdded} from './ItemAdded';
import {CartCleared} from './CartCleared';
import {ItemRemoved} from './ItemRemoved';
import {PriceChanged} from './PriceChanged';
import {ItemArchiveRequested} from './ItemArchiveRequested';
import {ItemArchived} from './ItemArchived';
import {InventoryUpdated} from './InventoryUpdated';
import {CartPublished} from './CartPublished';
import {CartSubmitted} from './CartSubmitted';

export type CartEvents =
    ItemAdded
    | CartCleared
    | ItemRemoved
    | ItemAdded
    | ItemRemoved
    | PriceChanged
    | ItemArchiveRequested
    | PriceChanged
    | ItemArchived
    | InventoryUpdated
    | CartPublished
    | InventoryUpdated
    | CartSubmitted
    | CartCleared;