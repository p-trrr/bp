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
                plane.setAttribute('visible', 'true');

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
    playTones() {
        if (this.notes.length > 0){
            delay = 1000;

            this.notes.forEach(note => {
                setTimeout(() => {
                    note.playTone();
                    console.log("Playing " + note.tone);
                }, delay);
                delay += 1000;
                
            });
        } else {console.log("No notes to play");}
    }
    getNotes(){
        return this.notes;
    }
    positionNoteOnStave(note) {
        const xPos = -2;
        const yPosMap = {
          "C4": 0.8, "D4": 1.0, "E4": 1.2, "F4": 1.4, "G4": 1.6,
          "A4": 1.8, "H4": 2.0, "C5": 2.2, "D5": 2.4, "E5": 2.6, "F5": 2.8, "G5": 3.0
        };
        const yPos = yPosMap[note.tone] || 0.8; // Výchozí pozice, pokud tón není nalezen
        const zPos = -4;
        const position = `${xPos + (0.625 * note.index)} ${yPos} ${zPos}`;
        
        return position;
    }

    async getRandomInterval(){
        try {
            const response = await fetch('/api/selectInterval/randomNotes');
            if (!response.ok) {
                throw new Error('No notes loaded from the server.');
            } else {
                const data = await response.json();
                console.log(data);
                const stave = document.querySelector('#stave');
                const notes = data.notes;
                const interval = data.interval;

                if (notes && notes.length > 0) {
                    notes.forEach(note => {
                        const entity = document.createElement('a-sphere');
                        entity.setAttribute('position', this.positionNoteOnStave(note));
                        entity.setAttribute('material', 'color: red');
                        entity.setAttribute('id', note.id);
                        entity.setAttribute('scale', '.1 .1 .1');
                        entity.setAttribute('frequency', note.frequency);
                        entity.setAttribute('index', note.index);
                        entity.setAttribute('visible', 'true');
                        stave.appendChild(entity);
                    });
                console.log(interval);
                return data;
                }
            } 
        } catch (error) {
                console.error('Failed to fetch data:', error);
                return null; // Return null or an appropriate value in case of an error
        }
    }
/*
    async projectRandomInterval(data){
        const scene = document.querySelector('a-scene');
        const notes = data.notes;
        const interval = data.interval;

        if (notes && notes.length > 0) {
            notes.forEach(note => {
                const entity = document.createElement('a-sphere');
                entity.setAttribute('position', this.positionNoteOnStave(note));
                entity.setAttribute('color', 'red');
                entity.setAttribute('id', note.id);
                entity.setAttribute('scale', '.1 .1 .1');
                entity.setAttribute('frequency', note.frequency);
                entity.setAttribute('index', note.index);
                entity.setAttribute('visible', 'true');
                scene.appendChild(entity);
            });
            console.log(interval);
        } else {
            console.error('No notes received from the server.');
        }

    }*/
}

module.exports = Stave;