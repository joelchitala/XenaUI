import { GOTO_FRAME, GOTO_SUBFRAME, REGISTERED_FRAME, REGISTERED_SUBFRAME } from "./js/components/shared/commands.js";
import { createIntent, navigator, refresher } from "./js/components/shared/shared_utilities.js";
import { Hub } from "./js/components/src/hub/hub.js";
import { Intent } from "./js/components/src/intents/intent.js";
import { SubFrame } from "./js/components/src/sub_frame/sub_frame.js";
import { FrameController } from "./js/controllers/frame_controller.js";
import { HubController } from "./js/controllers/hub_controller.js";
import { PageController } from "./js/controllers/page_controller.js";
import { SubFrameController } from "./js/controllers/sub_frame_controller.js";
import { FrameLogic } from "./js/logic/frame_logic.js";
import { HubLogic } from "./js/logic/hub_logic.js";

const contentElement = document.querySelector("#content");
const hub = new Hub();
hub.setParentElement(contentElement);

const frameController = new FrameController();
const subFrameController = new SubFrameController();
const pageController = new PageController();

const frame = frameController.createFrame((self,body,subFrame)=>{
    
    body.innerHTML = `<h1>Hello from Frame 1</h1>`;

    const btn = document.createElement('button');
    btn.innerHTML = `Go to frame 2`

    btn.onclick = (e) =>{
        navigator(frame2);
    }

    body.appendChild(btn);

    const back_forward_btns = document.createElement('div');

    back_forward_btns.innerHTML += `
     <button id="go_back_btn"> < </button>
     <button id="go_forward_btn"> > </button>
    `;

    const go_back_btn = back_forward_btns.querySelector("#go_back_btn");
    const go_forward_btn = back_forward_btns.querySelector("#go_forward_btn");

    const frameController = new FrameController();

    go_back_btn.onclick = (e) =>{
        frameController.popSubFrame(frame);
    }

    go_forward_btn.onclick = (e) =>{
        frameController.pushSubFrame(frame);
    }

    body.appendChild(back_forward_btns);

    if (subFrame) {
        body.appendChild(subFrame.data.body);
    }
    
});



const sub_frame_1 = subFrameController.createSubFrame(frame,(self,body,page)=>{
    body.innerHTML = `<h1>Hello from SubFrame 1</h1>`;

    const btn = document.createElement('button');
    btn.innerHTML = `Go to Subframe 2`

    btn.onclick = (e) =>{
        navigator(sub_frame_2)
    }

    body.appendChild(btn);

    if (page) {
        body.appendChild(page.data.body);
    }
    
});


const page_1 = pageController.createPage(sub_frame_1,"Page 1",(self,body)=>{
    body.innerHTML = `<h1>Hello from Page 1</h1>`;

    const btn = document.createElement('button');
    btn.innerHTML = `Go to page 2`

    btn.onclick = (e) =>{
        navigator(page_2);
    }

    body.appendChild(btn);

    const nav_btn = document.createElement('button');
    nav_btn.innerHTML = `Go to page 3`

    nav_btn.onclick = (e) =>{
        navigator(page_3,createIntent("id",1));
    }

    body.appendChild(nav_btn);

});

const page_2 = pageController.createPage(sub_frame_1,"Page 1",(self,body)=>{
    body.innerHTML = `<h1>Hello from Page 2</h1>`;

    const btn = document.createElement('button');
    btn.innerHTML = `Go to page 1`

    btn.onclick = (e) =>{
        new SubFrameController().gotoPage(page_1.data["subFrame"],page_1);
    }

    body.appendChild(btn);

    const nav_btn = document.createElement('button');
    nav_btn.innerHTML = `Go to page 4`

    nav_btn.onclick = (e) =>{
        navigator(page_4);
    }

    body.appendChild(nav_btn);

});

const sub_frame_2 = subFrameController.createSubFrame(frame,(self,body,page)=>{
    body.innerHTML = `<h1>Hello from SubFrame 2</h1>`;

    const btn = document.createElement('button');
    btn.innerHTML = `Go to Subframe 3`

    btn.onclick = (e) =>{
        navigator(sub_frame_3);
    }

    body.appendChild(btn);

    const refresh_btn = document.createElement('button');
    refresh_btn.innerHTML = `refresh current page`

    refresh_btn.onclick = (e) =>{
        new SubFrameController().refreshCurrentPage(sub_frame_2);
        // refresher(sub_frame_2)
    }

    body.appendChild(refresh_btn);

    if (page) {
        body.appendChild(page.data.body);
    }
    
});

const page_3 = pageController.createPage(sub_frame_2,"Page 3",(self,body)=>{
    body.innerHTML = `
    <div>
        <h1>Hello from Page 3</h1>
        <input type="number"></input>
    </div>
    `;

    const intent = self.getIntent("id");

    if(intent){
        body.innerHTML += `${intent["payload"]}`
    }

    const btn = document.createElement('button');
    btn.innerHTML = `refresh`

    btn.onclick = (e) =>{
        refresher(page_3)
    }

    body.appendChild(btn);

    
});

const page_4 = pageController.createPage(sub_frame_2,"Page 4",(self,body)=>{
    body.innerHTML = `
    <div>
        <h1>Hello from Page 4</h1>
        <input type="number"></input>
    </div>
    `;

    const intent = self.getIntent("id");

    if(intent){
        body.innerHTML += `${intent["payload"]}`
    }

    const btn = document.createElement('button');
    btn.innerHTML = `refresh`

    btn.onclick = (e) =>{
        refresher(page_4)
    }

    body.appendChild(btn);

    
});

const sub_frame_3 = subFrameController.createSubFrame(frame,(self,body,page)=>{
    body.innerHTML = `<h1>Hello from SubFrame 3</h1>`;

    const btn = document.createElement('button');
    btn.innerHTML = `Go to Subframe 1`

    btn.onclick = (e) =>{
        navigator(sub_frame_1);
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


