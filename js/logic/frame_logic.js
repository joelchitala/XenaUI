export class FrameLogic {

    static getSubFrames(frame){
        return frame.data["frames"];
    }

    static getCurrentSubFrame(frame){
        return frame.data["currentSubFrame"];
    }

    static setCurrentSubFrame(frame,subFrame){

        if(frame.data["currentSubFrame"] == subFrame){
            throw new Error(`Failed to set current subFrame. Current subFrame is already set to ${subFrame.data["id"]}`);
        }

        frame.data["currentSubFrame"] = subFrame;
    }

    static registerSubFrame(frame,subFrame){
        const subFrames = frame.data["subFrames"];
        const exists = subFrames.includes(subFrame);
        
        if(exists){
            throw new Error(`Frame ${subFrame.data["id"]} is already registered`);
        }

        subFrames.push(subFrame);

        return subFrames;
    }

    static deRegisterSubFrame(frame,subFrame){
        const subFrames = frame.data["subFrames"];
        const index = subFrames.indexOf(subFrame);
        
        if(index < 0){
            throw new Error(`Frame ${subFrame.data["id"]} is not registered`);
        }

        subFrames.splice(index,1);

        return subFrames;
    }
    
    static setTemplate(frame,template = (self,body,subFrame)=>{}){
        frame.data["template"] = template;
    }

    static render(frame){
        const body = frame.data["body"];
        const template = frame.data["template"];
        const subFrame = frame.data["currentSubFrame"];

        if(!template){
            throw new Error("No template found. Can not render");
        }
        
        template(frame,body,subFrame);

        frame.data["rendered"] = true;
    }
}