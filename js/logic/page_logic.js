export class PageLogic {
    static setIntent(page,intent){
        page.data["intent"] = intent;
    }

    static getIntent(page){
        return page.data["intent"];
    }
    
    static setTemplate(page,template = (self,body,intent)=>{}){
        page.data["template"] = template;
    }

    static refresh(page){
        const body = page.data["body"];
        body.innerHTML = "";

        return this.render(page,this.getIntent(page));
    }

    static render(page,intent){

        const body = page.data["body"];
        const template = page.data["template"];

        if(!template){
            throw new Error("No template found. Can not render");
        }

        template(page,body,intent);

        page.data["rendered"] = true;

        return body;
    }
}