const { start } = require("tone");
const myEmitter = require("../classes/eventEmitter");
const stave = require("./playground");

AFRAME.registerComponent('interval-name', {
    init: async function () {
        const correctAnswersGoal = 3;
        let runCount = 0;
        let intervalData = await getNewInterval();
        const chapterEl = document.querySelector('#chapter');
        document.querySelector('#stave').setAttribute('playground', 'attachingNotes', false);

        let wrongAnswers = 0;
        let correctAnswers = 0;
        const intervals = ['prima', 'sekunda', 'tercie', 'kvarta', 'kvinta', 'sexta', 'septima', 'oktava'];

        initializeBoxes(this.el);
        console.log('Interval-name component initialized');

        function initializeBoxes(parentEl){
            const boxSize = 0.15;
            const spacing = 0.15;
            const rows = 4;
            const columns = 2;
                        
            let i; let j;
            for (i = 0; i < rows; i++) {
                for (j = 0; j < columns; j++) {
                    const x = (j - (rows - 1) / 2) * (boxSize*2 + spacing) + 0.2 ;
                    const y = (i - (columns - 1) / 2) * (boxSize + spacing);
                    const textValue = intervals[i * columns + j];
                    
                    const boxEl = initializeBox(boxSize, boxSize, textValue);
                    boxEl.setAttribute('width', boxSize * 2);
                    boxEl.setAttribute('position', `${x} ${y} 0`);
                    parentEl.appendChild(boxEl);
                    boxEl.addEventListener('click', () => {
                        evaluate(boxEl, textValue, intervalData.correctInterval);
                        runCount++;
                    });                   
                }
            }                
            const box0 = initializeBox(boxSize, boxSize, 'unisono');
            box0.setAttribute('width', boxSize * 2);
            box0.setAttribute('position', '-.25 -.40 0');
            box0.setAttribute('rotation', '-10 0 0');   
            box0.addEventListener('click', () => {
                runCount++;
                evaluate(box0, 0, intervalData.correctInterval);
            });
            parentEl.appendChild(box0);
            console.log('Interval size options boxes created');
        }

        async function evaluate(boxEl, textValue, data){
            boxEl.setAttribute('animation__selection', {
                property: 'scale',
                to: '1.2 1.2 1.2',
                dur: 500,
                easing: 'easeOutElastic',
                elasticity: 300,
                dir: 'alternate',
                loop: 1
            });
            if(correctAnswers === correctAnswersGoal){
                const chapterEl = document.querySelector('#chapter')
                chapterEl.emit('congrats-results');
                // Create the notification element
                const notificationText =  `Správně! Prošel jsi lekcí s úspěšností ${((correctAnswers / runCount) * 100).toFixed(0)} procent z ${runCount+1} pokusů.`;
                const notification = initializeBox(1.9, 0.1, notificationText);
                notification.setAttribute('position', '-4 2 -2');
                notification.setAttribute('color', 'green');
                notification.setAttribute('opacity', '0.8');
                notification.setAttribute('height', '0.5');
            
                notification.setAttribute('animation__arrive', {
                    property: 'position',
                    to: '0 2 -2',
                    dur: 2000,
                    easing: 'easeOutElastic',
                    elasticity: 500,
                })                
                chapterEl.appendChild(notification);
                
                // Repeat and next chapter buttons
                setTimeout(() => {
                    const repeatButton = initializeBox(0.2, 0.1, 'Opakovat lekci');
                    repeatButton.setAttribute('position', '-4 0 -2');
                    repeatButton.setAttribute('width', '0.6');
                    repeatButton.addEventListener('click', function () {
                        
                       console.log('Repeat button clicked');
                    }); 
                    repeatButton.setAttribute('animation__arrive', {
                        property: 'position',
                        to: '-.5 1.5 -2',
                        dur: 2000,
                        easing: 'easeOutElastic',
                        elasticity: 100,
                    })

                    const continueButton = initializeBox(0.2, 0.1, 'Další lekce');
                    continueButton.setAttribute('position', '4 0 -2');
                    continueButton.setAttribute('width', '0.6');
                    continueButton.addEventListener('click', function() {
                        let currentId = chapterEl.getAttribute('load-chapter').chapterId;
                        let newId = currentId + 1;
                        if (newId < 0) {
                          newId = 0;
                        }
                        chapterEl.setAttribute('load-chapter', 'chapterId', newId);
                      });
                    continueButton.setAttribute('animation__arrive', {
                        property: 'position',
                        to: '.5 1.5 -2',
                        dur: 2000,
                        easing: 'easeOutElastic',
                        elasticity: 100,
                    })

                    chapterEl.appendChild(repeatButton);
                    chapterEl.appendChild(continueButton);

                }, 1000);

            

            } else {
                console.log('Clicked on the box with value:', textValue);            
                console.log("Correct interval size: " + data);
                if(textValue === data){
                    correctAnswer(boxEl);/*
                    setTimeout(() => {
                    }, 1000);
                    intervalData = await getNewInterval();
                    console.log('New interval:', intervalData);*/
                    
                } else {
                    wrongAnswer(boxEl);/*
                    setTimeout(() => {
                    }, 1000);
                    intervalData = await getNewInterval();
                    console.log('New interval:', intervalData);*/
                }
            }
            
        }

        async function getNewInterval(){
            stave.removeNotes();
            stave.getRandomInterval()
            .then(function(data) {
                // When the promise resolves, assign the data to intervalData
                intervalData = data;
                // Log the initial interval data to the console
                console.log('Initial interval data:', intervalData);
            })
            .catch(function(error) {
                // If an error occurs, log the error message to the console
                console.error('Failed to fetch interval data:', error);
            });
        }
        function changeChapter(newChapterId) {
            loadChapter(newChapterId);
          }

        function initializeBox(boxSize, boxDepth, textValue){
            const boxEl = document.createElement('a-box');
            boxEl.setAttribute('width', boxSize);
            boxEl.setAttribute('height', boxSize);
            boxEl.setAttribute('depth', boxDepth);
            boxEl.setAttribute('value', textValue);

            const textEl = document.createElement('a-text');
            textEl.setAttribute('font', '/assets/fonts/aframe-custom-msdf.json');
            textEl.setAttribute('negate', 'false');
            textEl.setAttribute('value', textValue);
            textEl.setAttribute('align', 'center');
            textEl.setAttribute('position', `0 0 ${boxDepth / 2 + 0.01}`); 
            textEl.setAttribute('scale', '0.4 0.4 0.4'); 
            boxEl.appendChild(textEl);
            
            return boxEl;
        }
        
        function correctAnswer(boxEl){
            console.log('Correct!');
            
            boxEl.setAttribute('animation__correct-color', {
                property: 'color',
                to: 'green',
                dur: 1000,
                dir: 'alternate',
                loop: 1
            });
            correctAnswers++;

            
                const notification = initializeBox(1, 0.05, `Správně.\nDalší otázka`);
                notification.setAttribute('color', 'green');
                notification.setAttribute('opacity', '0.8');
                notification.setAttribute('height', '0.4');
                notification.setAttribute('position', '0 2 -1.9');
                notification.addEventListener('click', () => {
                    intervalData = getNewInterval();
                    notification.parentNode.removeChild(notification);
                });
                chapterEl.appendChild(notification);                
            
            return correctAnswers;
        }

        function wrongAnswer(boxEl){
            console.log('Wrong!');
            
            wrongAnswers++;

            const notification = initializeBox(1, 0.05, `Špatně.\nSprávná odpověď: ${intervalData.correctIntervalSize}\nDalší otázka`);
            notification.setAttribute('color', 'red');
            notification.setAttribute('opacity', '0.8');
            notification.setAttribute('height', '0.4');
            notification.setAttribute('position', '0 2 -1.9');
            notification.addEventListener('click', () => {
                intervalData = getNewInterval();
                notification.parentNode.removeChild(notification);
            });
            chapterEl.appendChild(notification);
            return wrongAnswers;
        }
        

    }/*,
    remove: function () {
        // Code to remove the component
        this.el.removeAttribute('interval-size');
        this.el.removeEventListener('click', evaluate);
        const boxes = this.el.querySelectorAll('a-box');
        boxes.forEach(box => {
            box.removeEventListener('click', evaluate);
        });
        this.el.removeAttribute('interval-size');
    },

    repeatLesson: function(){
        // Repeat the lesson
        this.remove();
        setTimeout(() => {
            this.init();
        }, 0);
    }*/
});
