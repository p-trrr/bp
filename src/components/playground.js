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
        //randomIntervalButton.addEventListener('click', () => stave.getRandomInterval());
        
        
        randomIntervalButton.addEventListener('click', async function() {
            // call the stave.getRandomInterval() function to get the random interval and the interval options
            const randomIntervals = await stave.getRandomInterval();
            const correctInterval = randomIntervals.correctInterval;
            const options = randomIntervals.optionsIntervals;
            // Find the buttons where the interval options are displayed
            const buttons = document.querySelector('#interval-options');
            console.log(buttons);
            console.log(randomIntervals.optionsIntervals);
            // If the options are available and there are three options, update the buttons with the options
            if (options && options.length === 3) {
                const optionButtons = buttons.querySelectorAll('.interval-option');
                console.log(optionButtons);
                // Update the text of the buttons with the interval options
                optionButtons.forEach((element, index) => {
                    let textElement = element.querySelector('a-text');
                    console.log(textElement);
                    console.log(options[index] + ' ' + index);
                    if (textElement) {
                        textElement.setAttribute('value', options[index]);
                    }
                });
            }
        });
    },







    chooseCorrectInterval: function () {
        const randomIntervals = this.stave.getRandomInterval();
        const correctInterval = randomIntervals.correctInterval;
        const options = randomIntervals.optionsIntervals;
        const buttons = document.querySelector('#interval-options');
        console.log(buttons);
        console.log(randomIntervals.optionsIntervals);

        if (options && options.length === 3) {
            const optionButtons = buttons.querySelectorAll('[interval-option]');
            optionButtons.forEach((element, index) => {
                let textElement = element.querySelector('a-text');
                console.log(textElement);
                console.log(options[index] + ' ' + index);
                if (textElement) {
                    textElement.setAttribute('value', options[index]);
                }
            });
        }
    },

    remove: function () {
        this.stave.removeNotes();
    }
    
});
