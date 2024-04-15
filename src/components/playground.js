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

            let newNote = document.createElement('a-sphere');
            newNote.setAttribute('color', 'red');
            newNote.setAttribute('scale', '.1 .1 .1');
            newNote.setAttribute('position',intersectedObject.el.object3D.position);
            newNote.setAttribute('class', intersectedObject.el.getAttribute('class'));
            //intersectedObject.appendChilden(newNote);
            
            //console.log(intersectedObject);//.components.position.attrValue);
            
            stave.addNote(newNote);
            el.sceneEl.appendChild(newNote);
            console.log(stave.notes); 
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
