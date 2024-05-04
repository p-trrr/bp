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
        const randomIntervalButton = document.querySelector('#random-interval');

        stave.generateStave();     
        
        // Attaching (or removing) the note on the stave on click
        el.addEventListener('click', function(e) {
            let intersectedObject = e.detail.intersection.object;
            //console.log(e);
        
            if(intersectedObject.el.is('free')){
                let note = new Note(stave.currentMaxId,//id
                                    intersectedObject.el.getAttribute('class'),//tone
                                    intersectedObject.el.getAttribute('index'), 
                                    intersectedObject.el.getAttribute('frequency'), 
                                    el.object3D.position
                                );
                // Adding the note as a child to the stave element and changing the state to occupied
                intersectedObject.el.removeState('free');
                intersectedObject.el.addState('occupied');                
                intersectedObject.el.appendChild(note.HTMLelement);
                stave.addNote(note);
                note.playTone();

                console.log(note.tone + ' ' + note.frequency);
                console.log(stave.notes);
            } else {
                // Detach and delete the note by clicking on the stave, not on the note itself
                if(intersectedObject.el.children[0]){
                    let id = intersectedObject.el.children[0].getAttribute('id');
                    intersectedObject.el.removeObject3D(intersectedObject.el.childNodes[0]);
                    //intersectedObject.el.removeChild(intersectedObject.el.childNodes[0]); //deleting the sphere as a child of the stave a-plane element
                    stave.removeNote(stave.notes[id]);

                    console.log(stave.notes);
                    if(intersectedObject.el.is('occupied')){
                        intersectedObject.el.removeState('occupied');  
                        intersectedObject.el.addState('free');
                    } else {intersectedObject.el.addState('free');}
                } else {
                    // When clicked on the sphere itself, not on the a-plane stave element:
                    let id = intersectedObject.el.getAttribute('id');
                    intersectedObject.el.remove();
                    stave.removeNote(stave.notes[id]);

                    console.log(stave.notes);
                    console.log(intersectedObject.el.is())
                    if(intersectedObject.el.is('occupied')){
                        intersectedObject.el.removeState('occupied');  
                        intersectedObject.el.addState('free');
                    } else {intersectedObject.el.addState('free');}
                }                       
            }
        });


        
        emptyTheStaveButton.addEventListener('click', function() {
            stave.notes.forEach(note => {
                if(note.HTMLelement){
                    note.HTMLelement.parentNode.removeState('occupied');
                    note.HTMLelement.parentNode.addState('free');
                    note.HTMLelement.remove();
                }
                stave.removeNotes();        
            });
        });        
    
        playButton.addEventListener('click', () => stave.playTones());
        randomIntervalButton.addEventListener('click', () => stave.getRandomInterval());

       
        
    }
    
});
