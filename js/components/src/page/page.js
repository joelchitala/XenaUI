import { BaseComponent } from "../../shared/base_component.js";

export class Page extends BaseComponent{
    constructor(name, refresh = false) {
        super();

        this.data = {
            ...this.data,
            ...{
                "name":name,
                "body":document.createElement('div'),
                "template":null,
                "subFrame":null,
                "refresh":refresh,
            }
        }
    }
}