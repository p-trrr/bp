export class Note {
    constructor(tone, index, position) {
        //this.id = id;
        this.tone = tone; //class of the intersected object: intersectedObject.el.getAttribute('class');
        this.index = index;

        this.HTMLelement = document.createElement('a-sphere');
        this.HTMLelement.setAttribute('color', 'red');;
        this.HTMLelement.setAttribute('scale', '.1 .1 .1');
        this.HTMLelement.setAttribute('position', position);
        this.HTMLelement.setAttribute('class', tone);
    }
    setHTMLelement(HTMLelement){
        this.HTMLelement=HTMLelement;
    }
    getHTMLelement(){
        return this.HTMLelement;
    }
    getTone() {
        return this.tone;
    }
    
    getId() {
        return this.id;
    }
    
    getColumn(){
        return this.column;
    }
}