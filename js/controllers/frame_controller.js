import { DEREGISTERED_FRAME, GOTO_SUBFRAME, REGISTERED_FRAME, RENDER_FRAME } from "../components/shared/commands.js";
import { Frame } from "../components/src/frame/frame.js";
import { FrameLogic } from "../logic/frame_logic.js";
import { HubLogic } from "../logic/hub_logic.js";
import { BaseController } from "./base_controller.js";
import { HubController } from "./hub_controller.js";
import { SubFrameController } from "./sub_frame_controller.js";

export class FrameController extends BaseController {
    constructor() {
        super();
    }

    createFrame(template = (self,body,subFrame) =>{}){
        let frame;

        try {
            frame = new Frame();
            
            HubLogic.registerFrame(this.hub,frame);

            FrameLogic.setTemplate(frame,template);

            if(this.hub.data.currentFrame == null){
                this.hub.data.currentFrame = frame;
            }

            this.emit(REGISTERED_FRAME,{"hub":this.hub,"frame":frame});
        } catch (error) {
            console.error(error);
        }

        return frame;
    }

    deleteFrame(frame){
        try {
            const frames = HubLogic.deRegisterFrame(this.hub,frame);

            this.emit(DEREGISTERED_FRAME,{"hub":this.hub,"frame":frame});
            return frames;
        } catch (error) {
            console.error(error);
        }

        return this.hub.data.frames;
    }

    goToSubFrame(subFrame){
        const frame = subFrame.data["frame"];
        try {
            const currSub = FrameLogic.getCurrentSubFrame(frame);
            FrameLogic.setCurrentSubFrame(frame,subFrame);
            this.render(frame);
            this.emit(GOTO_SUBFRAME,{"hub":this.hub,"frame":frame,"subFrame":subFrame, "previous":currSub});
        } catch (error) {
            console.error(error);
        }

        return FrameLogic.getCurrentSubFrame(frame);
    }

    render(frame){
        if(!frame){
            return;
        }
        try {
            FrameLogic.render(frame);
            new SubFrameController().render(FrameLogic.getCurrentSubFrame(frame));
            this.emit(RENDER_FRAME,{"hub":this.hub,"frame":frame});
        } catch (error) {
            console.error(error);
        }
    }
}