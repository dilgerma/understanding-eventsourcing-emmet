import { ItemAdded } from './ItemAdded';
import { CartCleared } from './CartCleared';
import { ItemRemoved } from './ItemRemoved';
import { PriceChanged } from './PriceChanged';
import { ItemArchiveRequested } from './ItemArchiveRequested';
import { ItemArchived } from './ItemArchived';
import { InventoryUpdated } from './InventoryUpdated';
import { CartPublished } from './CartPublished';
import { CartSubmitted } from './CartSubmitted';

export type CartEvents = ItemAdded | CartCleared | ItemRemoved | PriceChanged | ItemArchiveRequested | ItemArchived | InventoryUpdated | CartPublished | CartSubmitted;