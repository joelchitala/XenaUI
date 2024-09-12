import { generateUUID } from "../../shared/utilities.js";
import { Hub } from "../src/hub/hub.js";

export class BaseComponent {
    constructor() {
        this.data = {
            "id":generateUUID(),
            "rendered":false,
        }
    }

    setRenderTrue(){
        this.data.rendered = true;
    }

    setRenderFalse(){
        this.data.rendered = false;
    }

    // emit(event){
    //     const hub = new Hub();
    //     hub.data.event_manager.process(event);
    // }
}