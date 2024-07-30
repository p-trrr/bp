const Stave = require('../classes/Stave.js');
const Note = require('../classes/Note.js');

AFRAME.registerComponent('playground', {
    init: function () {        
        const stave = new Stave();
        this.stave = stave;
        const chapter = document.querySelector('#chapter');

        const el = this.el;

        el.addEventListener('play-button-created', async () => {
            await Tone.start();
            console.log("audio is ready");
            stave.playTones();
        });

        const playButton = document.querySelector('#play-button');
        const emptyTheStaveButton = document.querySelector('#empty-stave-button');
        
        
        const answerCounter = document.createElement('a-plane');
        answerCounter.setAttribute('material', 'opacity: 0; transparent: true;');
        answerCounter.setAttribute('id', 'answer-counter');
        answerCounter.setAttribute('position', '1.6 4 -4');
        
        const answerText = document.createElement('a-text');
        answerText.setAttribute('position', '0 0 0.01');
        answerText.setAttribute('material', 'opacity: 1; transparent: false; color: black;');
        if(document.querySelector('#random-interval')){
            const randomIntervalButton = document.querySelector('#random-interval');
        };

        answerCounter.appendChild(answerText);
        chapter.appendChild(answerCounter);

        stave.generateStave();     
        
        el.addEventListener('click', async function(e) {
            await Tone.start(); // Tone.js is started before proceeding
            console.log("audio is ready");

            let intersectedObject = e.detail.intersection.object;
        
            if(intersectedObject.el.classList.contains('free')){
                let note = new Note(
                    stave.currentMaxId,
                    intersectedObject.el.getAttribute('class').split(' ')[0], // Adjusted to get the first class
                    intersectedObject.el.getAttribute('index'), 
                    intersectedObject.el.getAttribute('frequency')
                );
        
                intersectedObject.el.classList.replace('free', 'occupied');
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

        if(emptyTheStaveButton){
            emptyTheStaveButton.addEventListener('click', function() {
                stave.removeNotes();        
            }); 
        }       
        if(playButton){
            playButton.addEventListener('click', async () => {
                await Tone.start();
                console.log("audio is ready");
                stave.playTones();
            });
        } else {
            console.error('play button not found');
        }

        if(document.querySelector('#random-interval')){
            const randomIntervalButton = document.querySelector('#random-interval');
        
            randomIntervalButton.addEventListener('click', async function() {
                // call the stave.getRandomInterval() function to get the random interval and the interval options
                const randomIntervals = await stave.getRandomInterval();
                const correctInterval = randomIntervals.correctInterval;
                const options = randomIntervals.optionsIntervals;
                const buttons = document.querySelector('#interval-options');

                // If the options are available and there are three options, update the buttons with the options
                if (options && options.length === 3) {
                    const optionButtons = buttons.querySelectorAll('.interval-option');
                    let correctAnswers = 0;
                    let totalQuestions = 0;
                    // Update the text of the buttons with the interval options
                    optionButtons.forEach((element, index) => {
                        let textElement = element.querySelector('a-text');
                        if (textElement) {
                            textElement.setAttribute('value', options[index]);
                        }
            
                        // Add event listener to option button
                        element.addEventListener('click', async function() {
                            totalQuestions++;
                            // Check if the selected option is correct
                            if (options[index] === correctInterval) {
                                // If correct, change button color to green
                                element.setAttribute('color', 'green');
                                correctAnswers++;
                            } else {
                                // If not correct, change button color to red
                                element.setAttribute('color', 'red');
                            }
                            answerText.innerText = `${correctAnswers}/${totalQuestions}`;
                            // Play tones
                            stave.playTones();
                    
                            // Wait for the duration of the sound, then change color back to white
                            setTimeout(() => {
                                element.setAttribute('color', 'white');
                            }, 1000);
                    
                            // If the selected option is correct, wait for 1 second and load another interval
                            if (options[index] === correctInterval) {
                                // Wait for 1 second
                                await new Promise(resolve => setTimeout(resolve, 3000));
                    
                                // Load another interval
                                randomIntervalButton.click();
                            }
                        });
                    });
                }
                stave.playTones();
            });
        }
    },

    remove: function () {
        this.stave.removeNotes();
    }
    
});
