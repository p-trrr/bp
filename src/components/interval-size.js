const myEmitter = require("../classes/eventEmitter");
const stave = require("./playground");

AFRAME.registerComponent('interval-size', {
    schema: {
        maxRuns: { type: 'number', default: 5 },
        currentRun: { type: 'number', default: 0 }
    },

    init: function () {
        const maxRuns = 5;
        let runCount = 0;

        myEmitter.on('show-interval-size-options', () => {
            initializeBoxes(this.el);
        });

        function initializeBoxes(parentEl){
            const boxSize = 0.15;
            const spacing = 0.1;
            const rows = 4;
            const columns = 2;

            
            stave.getRandomInterval().then(data => {
                for (let i = 0; i < rows; i++) {
                    for (let j = 0; j < columns; j++) {
                        const x = (j - (rows - 1) / 2) * (boxSize + spacing);
                        const y = (i - (columns - 1) / 2) * (boxSize + spacing);
                        const textValue = i * columns + j + 1;
                        
                        const boxEl = initializeBox(boxSize, textValue);
                        boxEl.setAttribute('position', `${x} ${y} 0`);
                        parentEl.appendChild(boxEl);

                        boxEl.addEventListener('click', () => {
                            selectedOption(boxEl, textValue, data.correctIntervalSize);
                            clearBoxes(parentEl);
                            initializeBoxes(parentEl);
                        });
                    }                    
                }
                const box0 = initializeBox(boxSize, 0);
                box0.setAttribute('position', '0 0 0');
                box0.addEventListener('click', () => {
                    selectedOption(box0, 0, data.correctIntervalSize);
                    clearBoxes(parentEl);
                    initializeBoxes(parentEl);
                });

                console.log('Interval size options boxes created');
                console.log(data.correctIntervalSize);
            }).catch(error => {
                console.error('Error fetching interval data:', error);
            });
        }


        function clearBoxes(parentEl){
            while (parentEl.firstChild) {
                parentEl.removeChild(parentEl.firstChild);
            }
        }

        function selectedOption(boxEl, textValue, data){
            console.log('Clicked on the box with value:', textValue);            
            console.log("Correct interval size: " + data);
            if(textValue === data){
                correctAnswer(boxEl);
                setTimeout(() => {
                }, 1000);
            } else {
                wrongAnswer(boxEl);
                setTimeout(() => {
                }, 1000);
            }
        }

        function boxClick(boxEl, textValue, runCount){
            stave.getRandomInterval()
                .then(data => {
                    boxClick(boxEl, textValue, data.correctIntervalSize);
                    runCount++;
                    if (runCount < maxRuns) {
                        boxEl.addEventListener('click', () => {
                            selectedOption(boxEl, textValue, data.correctIntervalSize);
                        });
                        boxClick(boxEl, textValue, runCount);
                    }
                    else {
                        console.log('Max runs reached');
                        myEmitter.emit('results');
                    }
                })
                .catch(error => {
                    console.error('Error fetching interval data: ', error);
                });
        }

        function initializeBox(size, textValue){
            const boxEl = document.createElement('a-box');
            boxEl.setAttribute('width', size);
            boxEl.setAttribute('height', size);
            boxEl.setAttribute('depth', size);

            const textEl = document.createElement('a-text');
            textEl.setAttribute('value', textValue);
            textEl.setAttribute('align', 'center');
            textEl.setAttribute('position', '0 0 0.08'); 
            textEl.setAttribute('scale', '0.4 0.4 0.4'); 
            boxEl.appendChild(textEl);
            
            return boxEl;
        }
        
        function correctAnswer(boxEl){
            console.log('Correct!');
            boxEl.setAttribute('animation__correct', {
                property: 'scale',
                to: '1.2 1.2 1.2',
                dur: 500,
                easing: 'easeOutElastic',
                elasticity: 400,
                dir: 'alternate',
                loop: 1
            });
            boxEl.setAttribute('animation__correct-color', {
                property: 'color',
                to: 'green',
                dur: 1000,
                dir: 'alternate',
                loop: 1
            });
        }

        function wrongAnswer(boxEl){
            console.log('Wrong!');
            boxEl.setAttribute('animation__wrong-color', {
                property: 'color',
                to: 'red',
                dur: 1000
            });
        }
        

    }

/*
    getRandomInterval()
            .then(data => {
                if (data) {
                    console.log(data);
                    const correctIntervalSize = data.correctInterval;
                    
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
            */
    
/*
    getRandomInterval: async function () {
        try {
            const response = await fetch('http://localhost:3001/api/selectInterval/randomNotes');
            if (!response.ok) {
                throw new Error('No notes loaded from the server.');
            } else {
                const data = await response.json();
                console.log(data);
                return data;
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
            return null;
        }
    },

    // Add more component methods as needed
*/
});
