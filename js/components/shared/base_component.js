import { generateUUID } from "../../shared/utilities.js";
import { Hub } from "../src/hub/hub.js";

export const ENTITYTYPES ={
    FRAME:"FRAME",
    SUBFRAME:"SUBFRAME",
    PAGE:"PAGE",
}

export class BaseComponent {
    constructor(entityType) {
        this.data = {
            "id":generateUUID(),
            "rendered":false,
            "entityType":entityType,
        }
    }

    getId(){
        return this.data.id;
    }

    setRenderTrue(){
        this.data.rendered = true;
    }

    setRenderFalse(){
        this.data.rendered = false;
    }
}