const Note = require("./Note");

class Stave{
    constructor() {
        this.index = 0;
        this.maxIndex = 8;
        this.notes = [];
        this.rows = 12;
        this.HTMLelement = document.querySelector('#stave');
        this.currentMaxId = 0;
        
    }

    generateStave() {
        if(!this.HTMLelement){
            this.HTMLelement = document.createElement('a-entity');
            this.HTMLelement.setAttribute('id', 'stave');
        }
        this.HTMLelement.classList.add('raycastable')
        this.HTMLelement.setAttribute('playground', '');
        document.querySelector('#chapter').appendChild(this.HTMLelement);
    
        const xPos = -2;
        const yPos = [0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2, 2.4, 2.6, 2.8, 3.0];
        const zPos = -4;
        const tones = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5", "F5", "G5"];
        const frequencies = [261.626, 293.665, 329.628, 349.228, 391.995, 440, 493.883, 523.251, 587.33, 659.255, 698.456, 783.991];
    
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.maxIndex; j++) {
                const index = j;
                const plane = document.createElement('a-plane');
                const position = `${xPos + (0.625 * j)} ${yPos[i]} ${zPos}`;
    
                plane.setAttribute('position', position);
                plane.setAttribute('width', '0.625');
                plane.setAttribute('height', '0.2');
                plane.setAttribute('rotation', '0 0 0');
                plane.setAttribute('material', 'opacity: 0; transparent: true');
                plane.setAttribute('visible', 'true');
    
                plane.classList.add(tones[i], 'free'); // Use classList.add to add classes
                plane.setAttribute('index', index);
                plane.setAttribute('frequency', frequencies[i]);
    
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
        this.currentMaxId--;
    }

    removeNotes() {
        this.notes.forEach(note => {
            if(note.HTMLelement && note.HTMLelement.parentNode){
                note.HTMLelement.parentNode.classList.replace('occupied', 'free');
                //note.HTMLelement.parentNode.remove(note.HTMLelement);
                note.HTMLelement.remove();
            }
        });
        this.notes=[];
        this.currentMaxId = 0;
        this.index = 0;
    }  

    async getRandomInterval(){
        try {
            const response = await fetch('/api/selectInterval/randomNotes');
            if (!response.ok) {
                throw new Error('No notes loaded from the server.');
            } else {
                this.removeNotes();
                                
                const data = await response.json();
                console.log(data);
                const notes = data.notes;
                const interval = data.correctInterval;
                const options = data.optionsIntervals;

                this.removeNotes();

                if (notes && notes.length > 0) {
                    notes.forEach(note => {
                        // Finding the element on the stave where the note should be placed
                        const parentObject = this.findElement(note.tone, 3);
                        // Setting up the status of the element to occupied and allow the removeNotes function to remove the notes from the stave
                        if(parentObject.classList.contains('free')){
                            parentObject.classList.replace('free', 'occupied');
                        } else {
                                parentObject.classList.add('occupied');
                        }
                        parentObject.classList.add('occupied');

                        // Creating the note entity
                        const sceneEntity = new Note(
                            note.id,
                            note.tone,
                            note.index,
                            note.frequency
                        );
                        // Adding the note to the stave
                        this.notes.push(sceneEntity);
                        parentObject.appendChild(sceneEntity.HTMLelement);                        
                    });
                // Play the tones of the interval
                //this.playTones()
                console.log(interval);
                return data;
                }
            } 
        } catch (error) {
                console.error('Failed to fetch data:', error);
                return null;
        }
    }
    
    playTones() {
        this.notes.sort((a, b) => a.index - b.index);
        if (this.notes.length > 0) {
            let delay = 1000; // Delay in milliseconds
    
            this.notes.forEach((note, index) => {
                setTimeout(() => {
                    note.HTMLelement.setAttribute('color', 'white');
                    note.playTone();
                    setTimeout(() => {
                        note.HTMLelement.setAttribute('color', 'red');
                    }, 1000);
                }, delay * index); // Multiply delay by the index to stagger the start times
            });
        } else {
            console.log("No notes to play");
        }
    }

    positionNoteOnStave(note) {
        const xPos = -2;
        const yPosMap = {
          "C4": 0.8, "D4": 1.0, "E4": 1.2, "F4": 1.4, "G4": 1.6,
          "A4": 1.8, "B4": 2.0, "C5": 2.2, "D5": 2.4, "E5": 2.6, "F5": 2.8, "G5": 3.0
        };
        const yPos = yPosMap[note.tone] || 0.8; // Výchozí pozice, pokud tón není nalezen
        const zPos = -4;
        const position = `${xPos + (0.625 * note.index)} ${yPos} ${zPos}`;
        
        return position;
    }

    findElement(tone, index) {
        // Select all elements that have the specific index
        const candidates = document.querySelectorAll(`[index="${index}"]`);
    
        // Filter these candidates to find those whose first class matches `firstClass`
        const filtered = Array.from(candidates).filter(el => el.classList[0] === tone);
    
        // Return the first match, or null if none found
        return filtered.length > 0 ? filtered[0] : null;
    }
}

module.exports = Stave;