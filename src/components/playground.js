import {Stave} from '../classes/Stave.js';

AFRAME.registerComponent('playground', {
    
    init: function () {
        const el = this.el;
        const stave = new Stave();
        const previousButton = document.querySelector('#prev-button');
        const nextButton = document.querySelector('#next-button');
        const emptyTheStaveButton = document.querySelector('#empty-stave');

        stave.generateStave();

        this.attachNote = function(e) {
            let intersectedObject = e.detail.intersection.object;
            let note = new Note(intersectedObject.el.getAttribute('class'), stave.index, intersectedObject.el.object3D.position);
            
            el.sceneEl.appendChild(note.HTMLelement);
            stave.addNote(note);
            
            console.log(stave.notes.tone); 
            //intersectedObject.sceneEl.appendChild(newNote);
        }              
        el.addEventListener('click', this.attachNote);

        this.emptyStave = function() {
            stave.notes.forEach(note => {
                if(note.parentNode){
                    note.parentNode.removeChild(note);
                }
                stave.removeNotes();        
            });
        }
        emptyTheStaveButton.addEventListener('click', this.emptyStave);        
    
    }
});
