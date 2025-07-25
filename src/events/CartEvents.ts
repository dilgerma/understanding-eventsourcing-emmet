import { ItemAdded } from './ItemAdded';
import { CartCleared } from './CartCleared';
import { ItemRemoved } from './ItemRemoved';
import { ItemAdded } from './ItemAdded';
import { ItemRemoved } from './ItemRemoved';
import { PriceChanged } from './PriceChanged';
import { ItemArchiveRequested } from './ItemArchiveRequested';
import { PriceChanged } from './PriceChanged';
import { ItemArchived } from './ItemArchived';
import { InventoryUpdated } from './InventoryUpdated';
import { CartPublished } from './CartPublished';
import { InventoryUpdated } from './InventoryUpdated';
import { CartSubmitted } from './CartSubmitted';
import { CartCleared } from './CartCleared';

export type CartEvents = ItemAdded | CartCleared | ItemRemoved | ItemAdded | ItemRemoved | PriceChanged | ItemArchiveRequested | PriceChanged | ItemArchived | InventoryUpdated | CartPublished | InventoryUpdated | CartSubmitted | CartCleared;