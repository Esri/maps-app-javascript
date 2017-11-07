/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import Accessor = require("esri/core/Accessor");
import Collection = require("esri/core/Collection");
import MapView = require("esri/views/MapView");

import {
  declared,
  property,
  subclass
} from "esri/core/accessorSupport/decorators";

import esri = __esri;

@subclass("app.behaviors.Behavior")
export default abstract class Behavior<T> extends declared(Accessor) {
  @property() value: T;

  handlers: Collection<esri.WatchHandle> = new Collection();

  @property() view: MapView;

  subscribe(callback: (value: T) => void) {
    const handler = this.watch("value", callback);
    this.handlers.add(handler);
    return handler;
  }

  unsubscribe() {
    this.handlers.map(x => x.remove);
    this.handlers.removeAll();
  }
}
