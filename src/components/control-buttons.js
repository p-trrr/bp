AFRAME.registerComponent('control-buttons', {
    schema: {
        previousButtonID: {type: 'string', default: 'previous-button'},
        nextButtonID: {type: 'string', default: 'next-button'},
        playButton: {type: 'boolean', default: true},
        scale: {type: 'string', default: '1 1 1'},
        y: {type: 'number', default: 0}
    },
    init: function() {        
        // the next button
        const nextButton = document.createElement('a-circle');
        nextButton.setAttribute('id', this.data.nextButtonID);
        nextButton.setAttribute('position', `0.5 ${this.data.y} 0.05`);
        nextButton.setAttribute('scale', this.data.scale);
        nextButton.setAttribute('radius', '0.2');
        nextButton.setAttribute('color', '#ECECEC');
        nextButton.setAttribute('animation__mousedown', 'property: components.material.material.color; type: color; to: yellow; startEvents: mousedown; dur: 050');
        nextButton.setAttribute('animation__mouseup', 'property: components.material.material.color; type: color; to: white; startEvents: mouseup; dur: 050');


        const nextButtonPlane = document.createElement('a-plane');
        nextButtonPlane.setAttribute('position', `0 0 0.02`);
        nextButtonPlane.setAttribute('rotation', '0 0 0');
        nextButtonPlane.setAttribute('width', '0.2');
        nextButtonPlane.setAttribute('height', '0.05');
        nextButtonPlane.setAttribute('color', 'black');
        nextButton.appendChild(nextButtonPlane);

        const nextButtonTriangle = document.createElement('a-triangle');
        nextButtonTriangle.setAttribute('position', '0.1 0 0.02');
        nextButtonTriangle.setAttribute('rotation', '0 0 -90');
        nextButtonTriangle.setAttribute('scale', '0.12 0.1 1');
        nextButtonTriangle.setAttribute('color', 'black');
        nextButton.appendChild(nextButtonTriangle);

        this.el.appendChild(nextButton);

        // the previous button
        const previousButton = document.createElement('a-circle');
        previousButton.setAttribute('id', this.data.previousButtonID);
        previousButton.setAttribute('position', `-0.5 ${this.data.y} 0.05`);
        previousButton.setAttribute('radius', '0.2');
        previousButton.setAttribute('color', '#ECECEC');
        previousButton.setAttribute('animation__mousedown', 'property: components.material.material.color; type: color; to: yellow; startEvents: mousedown; dur: 050');
        previousButton.setAttribute('animation__mouseup', 'property: components.material.material.color; type: color; to: white; startEvents: mouseup; dur: 050');
        previousButton.setAttribute('scale', this.data.scale);

        const prevButtonPlane = document.createElement('a-plane');
        prevButtonPlane.setAttribute('position', '0 0 0.02');
        prevButtonPlane.setAttribute('rotation', '0 0 0');
        prevButtonPlane.setAttribute('width', '0.2');
        prevButtonPlane.setAttribute('height', '0.05');
        prevButtonPlane.setAttribute('color', 'black');
        previousButton.appendChild(prevButtonPlane);

        const prevButtonTriangle = document.createElement('a-triangle');
        prevButtonTriangle.setAttribute('position', '-0.1 0 0.02');
        prevButtonTriangle.setAttribute('rotation', '0 0 90');
        prevButtonTriangle.setAttribute('scale', '0.12 0.1 1');
        prevButtonTriangle.setAttribute('color', 'black');
        previousButton.appendChild(prevButtonTriangle);

        this.el.appendChild(previousButton);

        // the play button
        if(this.data.playButton == true){
            const playButton = document.createElement('a-circle');
            playButton.setAttribute('id', 'play-button');
            playButton.setAttribute('position', `0 ${this.data.y} 0.01`);
            playButton.setAttribute('scale', this.data.scale);
            playButton.setAttribute('radius', '0.2');
            playButton.setAttribute('color', '#ECECEC');
            playButton.setAttribute('animation__mousedown', 'property: components.material.material.color; type: color; to: yellow; startEvents: mousedown; dur: 050');
            playButton.setAttribute('animation__mouseup', 'property: components.material.material.color; type: color; to: white; startEvents: mouseup; dur: 050');
    
            const playButtonTriangle = document.createElement('a-triangle');
            playButtonTriangle.setAttribute('position', '0.03 0 0.02');
            playButtonTriangle.setAttribute('scale', '0.2 0.2 1');
            playButtonTriangle.setAttribute('rotation', '0 0 -90');
            playButtonTriangle.setAttribute('color', 'black');
            playButton.appendChild(playButtonTriangle);
    
            this.el.appendChild(playButton);

            this.el.emit('play-button-created');
        }
        
    }
});