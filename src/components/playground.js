const Stave = require('../classes/Stave.js');
const Note = require('../classes/Note.js');

AFRAME.registerComponent('playground', {
    init: function () {
        const el = this.el;
        const stave = new Stave();
        this.stave = stave;
        const playButton = document.querySelector('#play-button');
        const emptyTheStaveButton = document.querySelector('#empty-stave-button');
        const randomIntervalButton = document.querySelector('#random-interval');

        stave.generateStave();     
        
        el.addEventListener('click',  function(e) {
            let intersectedObject = e.detail.intersection.object;
        
            if(intersectedObject.el.classList.contains('free')){
                let note = new Note(
                    stave.currentMaxId,
                    intersectedObject.el.getAttribute('class').split(' ')[0], // Adjusted to get the first class
                    intersectedObject.el.getAttribute('index'), 
                    intersectedObject.el.getAttribute('frequency')
                );
        
                intersectedObject.el.classList.replace('free', 'occupied');
                //intersectedObject.el.classList.add('occupied');
                intersectedObject.el.appendChild(note.HTMLelement);
                stave.addNote(note);
                note.playTone();
        
                console.log(note.tone + ' ' + note.frequency);
                console.log(stave.notes);
            } else {
                if(intersectedObject.el.firstChild){
                    let id = intersectedObject.el.firstChild.getAttribute('id');
                    intersectedObject.el.removeChild(intersectedObject.el.firstChild);
                    stave.removeNote(stave.notes[id]);
        
                    console.log(stave.notes);
                    if(intersectedObject.el.classList.contains('occupied')){
                        intersectedObject.el.classList.replace('occupied', 'free');
                    }
                } else {
                    let id = intersectedObject.el.getAttribute('id');
                    intersectedObject.el.remove();
                    stave.removeNote(stave.notes[id]);
        
                    console.log(stave.notes);
                    if(intersectedObject.el.classList.contains('occupied')){
                        intersectedObject.el.classList.replace('occupied', 'free');
                    }
                }                       
            }
        });
        //this.el.addEventListener('click', this.noteAttachment);

        emptyTheStaveButton.addEventListener('click', function() {
            stave.removeNotes();        
        });        

        playButton.addEventListener('click', () => stave.playTones());
        randomIntervalButton.addEventListener('click', () => stave.getRandomInterval());
    },
    remove: function () {
        this.stave.removeNotes();
        this.el.removeEventListener
    }
    
});
