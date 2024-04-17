class Stave{
    constructor() {
        this.index = 0;
        this.maxIndex = 8;
        this.notes = [];
        this.rows = 12;
        //this.columns = 8;       
        this.HTMLelement = document.querySelector('#stave');
    }

    generateStave() {
        if(!this.HTMLelement){
            this.HTMLelement = document.createElement('a-plane');
            this.HTMLelement.setAttribute('id', 'stave');
            this.HTMLelement.setAttribute('data-raycastable', '')
            this.HTMLelement.setAttribute('note-attachment', '');
            this.HTMLelement.setAttribute('stave-pointer', '');
            this.HTMLelement.setAttribute('playground', '');
            this.HTMLelement.setAttribute('note-attachment', '');
            document.querySelector('a-scene').appendChild(this.HTMLelement);
            console.log('Stave created');
        }

        const xPos = -2;
        const yPos = [2.8, 2.6, 2.4, 2.2, 2.0, 1.8, 1.6, 1.4, 1.2, 1.0, 0.8];
        const zPos = -4;
        const tones = ["C4", "D4", "E4", "F4", "G4", "A4", "H4", "C5", "D5", "E5", "F5", "G5"];
    
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.maxIndex; j++) {
                const plane = document.createElement('a-plane');
                const position = `${xPos + (0.625 * j)} ${yPos[i]} ${zPos}`;
                plane.setAttribute('position', position);
                plane.setAttribute('width', '0.625');
                plane.setAttribute('height', '0.2');
                plane.setAttribute('rotation', '0 0 0');
                plane.setAttribute('class', tones[i]);
                plane.setAttribute('material', 'opacity: 0; transparent: true');
                this.HTMLelement.appendChild(plane);
            }
        }

    }
      
    addNote(note) {
        this.notes.push(note);
    }

    removeNotes() {
        this.notes=[];
    }
    
}

module.exports = Stave;