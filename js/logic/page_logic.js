export class PageLogic {
    static setTemplate(page,template = (self,body,data)=>{}){
        page.data["template"] = template;
    }

    static render(page,data){

        const body = page.data["body"];
        const template = page.data["template"];

        if(!template){
            throw new Error("No template found. Can not render");
        }
        template(page,body,data);
    }
}