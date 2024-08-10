const myEmitter = require("../classes/eventEmitter");
const stave = require("./playground");

AFRAME.registerComponent('interval-size', {
    schema: {
        maxRuns: { type: 'number', default: 5 },
        currentRun: { type: 'number', default: 0 }
    },

    init: async function () {
        const correctAnswersGoal = 5;
        let runCount = 0;
        let intervalData = await getNewInterval();
        

        let wrongAnswers = 0;
        let correctAnswers = 0;

        initializeBoxes(this.el);

        console.log('Interval size component initialized');

        /*
        myEmitter.on('show-interval-size-options', () => {
            let newInterval = getNewInterval();
            console.log(newInterval);

            initializeBoxes(this.el, newInterval);
        });*/

        function initializeBoxes(parentEl){
            const boxSize = 0.15;
            const spacing = 0.1;
            const rows = 4;
            const columns = 2;
                        
            let i; let j;
            for (i = 0; i < rows; i++) {
                for (j = 0; j < columns; j++) {
                    const x = (j - (rows - 1) / 2) * (boxSize + spacing);
                    const y = (i - (columns - 1) / 2) * (boxSize + spacing);
                    const textValue = i * columns + j + 1;
                    
                    const boxEl = initializeBox(boxSize, textValue);
                    boxEl.setAttribute('position', `${x} ${y} 0`);
                    parentEl.appendChild(boxEl);
                    boxEl.addEventListener('click', () => {
                        runCount++;
                        evaluate(boxEl, textValue, intervalData.correctIntervalSize);
                    });                   
                }
            }                
            const box0 = initializeBox(boxSize, '0');
            box0.setAttribute('position', '-.25 -.35 0');
            box0.setAttribute('rotation', '-10 0 0');   
            box0.addEventListener('click', () => {
                runCount++;
                evaluate(box0, 0, intervalData.correctIntervalSize);
            });
            parentEl.appendChild(box0);
            console.log('Interval size options boxes created');
        }

        async function evaluate(boxEl, textValue, data){
            if(correctAnswers === correctAnswersGoal){
                const text = document.createElement('a-text');
                text.setAttribute('value', `Gratuluji! Prošel jsi lekci s úspěšností ${correctAnswers/runCount}% na ${runCount} pokusů.`);
                text.setAttribute('color', 'black');
                text.setAttribute('scale', '0.5 0.5 0.5');
                text.setAttribute('font', '/assets/fonts/aframe-custom-msdf.json');
                text.setAttribute('align', 'center');

                const notification = document.createElement('a-plane');
                notification.setAttribute('position', notification.object3D.worldToLocal(new THREE.Vector3(0, 1.5, -1.3)));
                this.el.appendChild(notification.appendChild(text));
            } else {
                console.log('Clicked on the box with value:', textValue);            
                console.log("Correct interval size: " + data);
                if(textValue === data){
                    correctAnswer(boxEl);
                    setTimeout(() => {
                    }, 1000);
                    intervalData = await getNewInterval();
                    console.log('New interval:', intervalData);
                    
                } else {
                    wrongAnswer(boxEl);
                    setTimeout(() => {
                    }, 1000);
                    intervalData = await getNewInterval();
                    console.log('New interval:', intervalData);
                }
            }
            
        }

        async function getNewInterval(){
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

        function initializeBox(size, textValue){
            const boxEl = document.createElement('a-box');
            boxEl.setAttribute('width', size);
            boxEl.setAttribute('height', size);
            boxEl.setAttribute('depth', size);
            boxEl.setAttribute('value', textValue);

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
            return correctAnswers++;
        }

        function wrongAnswer(boxEl){
            console.log('Wrong!');
            boxEl.setAttribute('animation__Color', {
                property: 'color',
                to: 'red',
                dur: 1000,
                dir: 'alternate',
                loop: 1
            });
            return wrongAnswers++;
        }
        

    }

});
