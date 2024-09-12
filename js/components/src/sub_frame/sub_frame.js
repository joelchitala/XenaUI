import { BaseComponent } from "../../shared/base_component.js";

export class SubFrame extends BaseComponent{
    constructor() {
        super();

        this.data = {
            ...this.data,
            ...{
                "body":document.createElement('div'),
                "frame":null,
                "pages":[],
                "currentPage":null,
                "template":null,
            }
        }
    }
}