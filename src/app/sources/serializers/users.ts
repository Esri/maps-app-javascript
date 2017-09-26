import Color = require("esri/Color");
import Collection = require("esri/core/Collection");
import FeatureLayer = require("esri/layers/FeatureLayer");
import Point = require("esri/geometry/Point");
import SimpleRenderer = require("esri/renderers/SimpleRenderer");
import SimpleMarkerSymbol = require("esri/symbols/SimpleMarkerSymbol");

import { User } from "../../interfaces/user";

export function usersAsFeatureLayer(data: User[]) {
  const fields = [
    {
      alias: "id",
      name: "ObjectID",
      type: "oid"
    },
    {
      alias: "Name",
      name: "name",
      type: "string"
    },
    {
      alias: "Email",
      name: "email",
      type: "string"
    }
  ];

  const popupTemplate = {
    content: "{*}",
    title: "{name}"
  };

  const graphics = data.map(user => {
    const { city, street, zipcode } = user.address;
    return {
      attributes: {
        ObjectID: user.id,
        address: `${street}, ${city}, ${zipcode}`,
        companyName: user.company.name,
        email: user.email,
        name: user.name
      },
      geometry: new Point({
        x: Number(user.address.geo.lng),
        y: Number(user.address.geo.lat)
      })
    };
  });

  const userRenderer = new SimpleRenderer({
    symbol: new SimpleMarkerSymbol({
      color: ("red" as any) as Color,
      outline: {
        color: ("white" as any) as Color,
        width: 1
      },
      size: 10
    })
  });

  const layer = new FeatureLayer({
    fields,
    geometryType: "point",
    objectIdField: "ObjectID",
    popupTemplate,
    renderer: userRenderer,
    source: new Collection(graphics),
    spatialReference: { wkid: 4326 }
  });

  return layer;
}
