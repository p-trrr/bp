const Stave = require('../classes/Stave.js');
const Note = require('../classes/Note.js');

AFRAME.registerComponent('playground', {
    init: function () {
        const el = this.el;
        const stave = new Stave();
        const previousButton = document.querySelector('#prev-button');
        const nextButton = document.querySelector('#next-button');
        const playButton = document.querySelector('#play-button');
        const emptyTheStaveButton = document.querySelector('#empty-stave-button');

        stave.generateStave();

        this.attachNote = function(e) {
            let intersectedObject = e.detail.intersection.object;

            if(intersectedObject.el.is('free')){
                let note = new Note(stave.currentMaxId,
                                    intersectedObject.el.getAttribute('class'),
                                    intersectedObject.el.getAttribute('index'), 
                                    intersectedObject.el.getAttribute('frequency'), 
                                    intersectedObject.el.object3D.position
                                );
                intersectedObject.el.removeState('free');
                intersectedObject.el.addState('occupied');

                el.appendChild(note.HTMLelement);
                stave.addNote(note);
                note.playTone();

                console.log(note.tone + ' ' + note.frequency);
                el.removeEventListener('click', this.attachNote);
                console.log(stave.notes);
                el.addEventListener('click', this.detachNote);
            }            
        }              
        el.addEventListener('click', this.attachNote);

        this.detachNote = function(e) {            
            let intersectedObject = e.detail.intersection.object;
            console.log(intersectedObject.is('occupied'));

            let note = stave.notes.find(note => note.HTMLelement === intersectedObject);

            //note.HTMLelement.setAttribute('material', 'opacity: 0.5; transparent: true')
            note.HTMLelement.remove();
            stave.removeNote(note);
            el.removeEventListener('click', this.detachNote);
            el.addEventListener('click', this.attachNote);
        }
        
        this.emptyStave = function() {
            stave.notes.forEach(note => {
                if(note.HTMLelement){
                    note.HTMLelement.remove();
                }
                stave.removeNotes();        
            });
        }
        emptyTheStaveButton.addEventListener('click', this.emptyStave);        
    
        playButton.addEventListener('click', () => stave.playTones());
    }
});
