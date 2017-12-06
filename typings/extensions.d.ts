// dojo
declare module "dojo/i18n!*" {
  const i18n: any;
  export = i18n;
}

declare module "styles/main.css" {
  const css: any;
  export default css;
}

// material
declare module "@material/drawer/index" {
  export class MDCTemporaryDrawer {
    open: boolean;
    constructor(params?: any);
  }
}
/*
declare module "esri/widgets/Directions" {
  const Directions: any;
  export = Directions;
}
*/
