import { GOTO_FRAME, GOTO_SUBFRAME, REGISTERED_FRAME, REGISTERED_SUBFRAME } from "./components/shared/commands.js";
import { Hub } from "./components/src/hub/hub.js";
import { FrameController } from "./controllers/frame_controller.js";
import { HubController } from "./controllers/hub_controller.js";
import { PageController } from "./controllers/page_controller.js";
import { SubFrameController } from "./controllers/sub_frame_controller.js";
import { FrameLogic } from "./logic/frame_logic.js";
import { HubLogic } from "./logic/hub_logic.js";

const contentElement = document.querySelector("#content");
const hub = new Hub();
hub.setParentElement(contentElement);





hub.registerEventProxy("notify-frame-create", GOTO_SUBFRAME, (event)=>{
    const payload = event.data["payload"]
    
    const hub = payload["hub"];

    // if(HubLogic.getCurrentFrame(hub) == null){
    //     new HubController().goToFrame(payload["frame"]);
    // }

    console.log(payload);
    
    
});


const frameController = new FrameController();
const subFrameController = new SubFrameController();
const pageController = new PageController();

const frame = frameController.createFrame((self,body,subFrame)=>{
    
    body.innerHTML = `<h1>Hello from Frame 1</h1>`;

    const btn = document.createElement('button');
    btn.innerHTML = `Go to frame 2`

    btn.onclick = (e) =>{
        new HubController().goToFrame(frame2);
    }

    body.appendChild(btn);

    if (subFrame) {
        body.appendChild(subFrame.data.body);
    }
    
});



const sub_frame_1 = subFrameController.createSubFrame(frame,(self,body,page)=>{
    body.innerHTML = `<h1>Hello from SubFrame 1</h1>`;

    const btn = document.createElement('button');
    btn.innerHTML = `Go to Subframe 2`

    btn.onclick = (e) =>{
        new FrameController().goToSubFrame(sub_frame_2);
    }

    body.appendChild(btn);

    if (page) {
        body.appendChild(page.data.body);
    }
    
});


const page_1 = pageController.createPage(sub_frame_1,"Page 1",(self,body,data)=>{
    body.innerHTML = `<h1>Hello from Page 1</h1>`;

    const btn = document.createElement('button');
    btn.innerHTML = `Go to page 2`

    btn.onclick = (e) =>{
        new SubFrameController().gotoPage(page_2);
    }

    body.appendChild(btn);
});

const page_2 = pageController.createPage(sub_frame_1,"Page 1",(self,body,data)=>{
    body.innerHTML = `<h1>Hello from Page 2</h1>`;

    const btn = document.createElement('button');
    btn.innerHTML = `Go to page 1`

    btn.onclick = (e) =>{
        new SubFrameController().gotoPage(page_1);
    }

    body.appendChild(btn);
});

const sub_frame_2 = subFrameController.createSubFrame(frame,(self,body,page)=>{
    body.innerHTML = `<h1>Hello from SubFrame 2</h1>`;

    const btn = document.createElement('button');
    btn.innerHTML = `Go to Subframe 1`

    btn.onclick = (e) =>{
        new FrameController().goToSubFrame(sub_frame_1);
    }

    body.appendChild(btn);
});

const frame2 = frameController.createFrame((self,body,subFrame)=>{
    body.innerHTML = `<h1>Hello from Frame 2</h1>`;

    const btn = document.createElement('button');
    btn.innerHTML = `Go to frame 1`

    btn.onclick = (e) =>{
        new HubController().goToFrame(frame);
    }

    body.appendChild(btn);
});




const hubController = new HubController();
hubController.render();


// const currFrame = controller.goToFrame(frame2);

// console.log(currFrame);

