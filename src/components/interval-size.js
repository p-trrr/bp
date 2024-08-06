AFRAME.registerComponent('interval-size', {
    schema: {
        // Define your component's schema properties here
        // For example:
        // width: { type: 'number', default: 1 },
        // height: { type: 'number', default: 1 },
    },

    init: function () {
        // Initialization code goes here
        // This function is called when the component is attached to an entity
        const sceneEl = document.querySelector('a-scene');
        const intervalSizeEl = document.createElement('a-entity');
        intervalSizeEl.setAttribute('position', '0 1 -5');
        sceneEl.appendChild(intervalSizeEl);

        const boxSize = 1;
        const spacing = 0.5;
        const rows = 2;
        const columns = 4;

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                const boxEl = document.createElement('a-box');
                const x = (j - (columns - 1) / 2) * (boxSize + spacing);
                const y = (i - (rows - 1) / 2) * (boxSize + spacing);
                boxEl.setAttribute('position', `${x} ${y} 0`);
                boxEl.setAttribute('width', boxSize);
                boxEl.setAttribute('height', boxSize);
                boxEl.setAttribute('depth', boxSize);
                boxEl.setAttribute('text', `value: ${i * columns + j + 1}`);
                intervalSizeEl.appendChild(boxEl);
            }
        }
        fetch('http://localhost:3001/api/selectInterval/randomNotes')
            .then(response => response.json())
            .then(data => {
                const correctIntervalSize = data.correctIntervalSize;
                const staveEl = document.querySelector('#stave');
                staveEl.setAttribute('position', '0 0 -5');
                sceneEl.appendChild(staveEl);

                const note1 = document.createElement('a-entity');
                note1.setAttribute('position', '-1 0 0');
                note1.setAttribute('text', `value: ${data.note1}`);
                staveEl.appendChild(note1);

                const note2 = document.createElement('a-entity');
                note2.setAttribute('position', '1 0 0');
                note2.setAttribute('text', `value: ${data.note2}`);
                staveEl.appendChild(note2);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    },

    update: function () {
        // Update code goes here
        // This function is called whenever the component's properties are updated
    },

    tick: function (time, deltaTime) {
        // Tick code goes here
        // This function is called on every frame update
    },

    // Add more component methods as needed

});