// dojo
declare module "dojo/i18n!*" {
  const i18n: any;
  export = i18n;
}

declare module "esri/moment" {
  import * as m from "moment";
  export = m;
}

declare module "calcite-web" {
  export const dropdown: () => void;
}
