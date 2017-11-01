/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import Accessor = require("esri/core/Accessor");
import Graphic = require("esri/Graphic");
import GraphicsLayer = require("esri/layers/GraphicsLayer");
import MapView = require("esri/views/MapView");
import SceneView = require("esri/views/SceneView");

import RouteTask = require("esri/tasks/RouteTask");
import FeatureSet = require("esri/tasks/support/FeatureSet");
import RouteParameters = require("esri/tasks/support/RouteParameters");

import geometryEngine = require("esri/geometry/geometryEngine");

import {
  aliasOf,
  declared,
  property,
  subclass
} from "esri/core/accessorSupport/decorators";

import watchUtils = require("esri/core/watchUtils");

import { routeUrl } from "../../../config/main";

const { union } = geometryEngine;
const { watch, whenOnce } = watchUtils;

const routeSymbol = {
  type: "simple-line",
  color: [255, 0, 0, 1],
  width: 5
};

const startSymbol = {
  type: "picture-marker",
  url: "assets/BluePinCircle36.svg",
  width: "19px",
  height: "36px",
  yoffset: "16"
};

const endSymbol = {
  type: "picture-marker",
  url: "assets/RedPinCircle36.svg",
  width: "19px",
  height: "36px",
  yoffset: "16"
};

@subclass()
class DirectionsViewModel extends declared(Accessor) {
  @property() endGraphic: Graphic;

  @property() startGraphic: Graphic;

  @property() view: MapView = null; // | SceneView = null;

  @property()
  routeLayer = new GraphicsLayer({
    id: "routeLayer",
    listMode: "hide"
  });

  @property() routeTask = new RouteTask({ url: routeUrl });

  @property()
  routeParams = new RouteParameters({
    stops: new FeatureSet(),
    outSpatialReference: {
      wkid: 3857
    }
  });

  constructor(params?: any) {
    super(params);
    watch(this, "view.map", () => {
      this.view.map.add(this.routeLayer);
    });
  }

  route(start: Graphic, end: Graphic) {
    const [startG, endG] = this.copyGraphics(start, end);

    this.startGraphic = startG;
    this.endGraphic = endG;
    (this.routeParams.stops as any).features.length = 0;
    (this.routeParams.stops as any).features.push(start);
    (this.routeParams.stops as any).features.push(end);
    return this.routeTask
      .solve(this.routeParams)
      .then(this.handleRouteResult.bind(this));
  }

  private handleRouteResult(data: any) {
    const routeResult = data.routeResults[0].route;
    routeResult.symbol = routeSymbol;
    this.routeLayer.removeAll();
    this.routeLayer.addMany([routeResult, this.startGraphic, this.endGraphic]);
    const unioned = union([
      this.startGraphic.geometry,
      this.endGraphic.geometry
    ]);
    this.view.goTo(unioned.extent.expand(2));
    return data;
  }

  private copyGraphics(start: Graphic, end: Graphic) {
    const startG = Graphic.fromJSON(start.toJSON());
    startG.symbol = startSymbol as any;

    const endG = Graphic.fromJSON(end.toJSON());
    endG.symbol = endSymbol as any;

    return [startG, endG];
  }
}

export default DirectionsViewModel;
