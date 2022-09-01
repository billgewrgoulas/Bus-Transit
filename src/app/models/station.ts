
export class Station{

    private isVisible: boolean = true;
    private selected: boolean = false;

    constructor(private text: string){}

    get visible(){
        return this.isVisible;
    }

    get name(){
        return this.text;
    }

    // get isSelected(){
    //     return this.isSelected
    // }

    set visibility(value: boolean){
        this.isVisible = value;
    }
}