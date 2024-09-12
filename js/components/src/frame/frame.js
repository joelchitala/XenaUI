import { BaseComponent } from "../../shared/base_component.js";

export class Frame extends BaseComponent {
    constructor() {
        super();
        
        this.data = {
            ...this.data,
            ...{
                "body":document.createElement('div'),
                "template":null,
                "subFrames":[],
                "currentSubFrame":null,
                "historyStack" : [],
                "forwardStack" : [],
            }
        }
    }
}