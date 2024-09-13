import { BaseComponent, ENTITYTYPES } from "../../shared/base_component.js";

export class Page extends BaseComponent{
    constructor(name, refresh = false) {
        super(ENTITYTYPES.PAGE);

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