/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import esriRequest = require("esri/request");
import Accessor = require("esri/core/Accessor");

import {
  declared,
  property,
  subclass
} from "esri/core/accessorSupport/decorators";

export interface SourceProperties {
  fetch(id?: string | any, query?: any): IPromise<any>;
}

@subclass("app.sources.source")
class Source extends declared(Accessor) implements SourceProperties {
  @property() url: string;

  request = esriRequest;

  // support for REST APIs
  // hostname/persons/{id}
  fetch(id?: string | any, query?: any): IPromise<any> {
    const req = typeof id === "string" && !query
      ? this.request(`${this.url}/${id}`)
      : typeof id === "string" && query
        ? this.request(`${this.url}/${id}`, { query })
        : id ? this.request(this.url, { query: id }) : this.request(this.url);

    return req.then(this.serializer);
  }

  // Can be used to provide a custom serializer
  serializer(response: any) {
    return response;
  }
}

export default Source;
