class Stave{
    constructor() {
        this.index = 0;
        this.maxIndex = 8;
        this.notes = [];
        this.rows = 12;
        //this.columns = 8;       
        this.HTMLelement = document.querySelector('#stave');
        this.currentMaxId = 0;
    }

    generateStave() {
        if(!this.HTMLelement){
            this.HTMLelement = document.createElement('a-plane');
            this.HTMLelement.setAttribute('id', 'stave');
        }
        this.HTMLelement.setAttribute('data-raycastable', '')
        this.HTMLelement.setAttribute('playground', '');
        document.querySelector('a-scene').appendChild(this.HTMLelement);
        

        const xPos = -2;
        const yPos = [0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4, 2.6, 2.8];
        const zPos = -4;
        const tones = ["C4", "D4", "E4", "F4", "G4", "A4", "H4", "C5", "D5", "E5", "F5", "G5"];
        const frequencies = [261.626, 293.665, 329.628, 349.228, 391.995, 440, 493.883, 523.251, 587.33, 659.255, 698.456];
    
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.maxIndex; j++) {
                index = j;
                const plane = document.createElement('a-plane');
                const position = `${xPos + (0.625 * j)} ${yPos[i]} ${zPos}`;

                plane.setAttribute('position', position);
                plane.setAttribute('width', '0.625');
                plane.setAttribute('height', '0.2');
                plane.setAttribute('rotation', '0 0 0');
                plane.setAttribute('material', 'opacity: 0; transparent: true');

                plane.setAttribute('class', tones[i]);
                plane.setAttribute('index', index[i]);
                plane.setAttribute('frequency', frequencies[i]);
                
                plane.addState('free');
                this.HTMLelement.appendChild(plane);
            }
        }
        console.log('Stave created');

    }
      
    addNote(note) {
        this.notes.push(note);
        this.currentMaxId++;
    }
    removeNote(note) {
        this.notes.splice(this.notes.indexOf(note), 1);
    }

    removeNotes() {
        this.notes=[];
    }
    
}

module.exports = Stave;