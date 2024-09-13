import { BaseComponent, ENTITYTYPES } from "../../shared/base_component.js";

export class SubFrame extends BaseComponent{
    constructor() {
        super(ENTITYTYPES.SUBFRAME);

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