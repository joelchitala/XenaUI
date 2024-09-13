import { FrameController } from "../../controllers/frame_controller.js";
import { HubController } from "../../controllers/hub_controller.js";
import { SubFrameController } from "../../controllers/sub_frame_controller.js";
import { ENTITYTYPES } from "./base_component.js";

export const navigator = (component) =>{

    if(!component){
        throw new Error("Component can not be null or undefined");
    }

    if(!component["data"]["entityType"]){
        throw new Error("Component is not a valid object");
    }

    
    switch (component["data"]["entityType"]) {
        case ENTITYTYPES.FRAME:{
            const hub_controller = new HubController();
            hub_controller.goToFrame(component);
        }
        break;

        case ENTITYTYPES.SUBFRAME:{
            const frame_controller = new FrameController();
            const frame = component["data"]["frame"];

            if(!frame){
                throw new Error(`Frame not found for compenent. ${component["data"]}`);
            }

            frame_controller.goToSubFrame(frame,component);
        }  
        break;
        case ENTITYTYPES.PAGE:{
            const subFrame_controller = new SubFrameController();
            const subFrame = component["data"]["subFrame"];
            const frame = subFrame["data"]["frame"];

            if(!subFrame){
                throw new Error(`SubFrame not found for compenent. ${component["data"]}`);
            }

            if(!frame){
                throw new Error(`Frame not found for compenent. ${component["data"]}`);
            }

            subFrame_controller.gotoPage(subFrame,component);
        }           
        break;

        default:
            throw new Error(`Invalid entity type ${component["data"]["entityType"]}`);
    }


    
}