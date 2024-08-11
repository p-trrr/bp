AFRAME.registerComponent('notification', {
    schema: {
        text: { type: 'string', default: 'Default Text' }
    },

    init: function () {
        // Create the main entity
        let entity = document.createElement('a-entity');
        entity.setAttribute('position', '0 0 0');

        // Create the child plane element
        const plane = document.createElement('a-plane');
        plane.setAttribute('color', 'red');
        plane.setAttribute('width', '2');
        plane.setAttribute('height', '1');
        entity.appendChild(plane);

        // Create the child text element
        const text = document.createElement('a-text');
        text.setAttribute('value', this.data.text);
        text.setAttribute('position', '0 0 0.1');
        text.setAttribute('font', '/assets/fonts/aframe-custom-msdf.json');
        text.setAttribute('negate', 'false');
        text.setAttribute('align', 'center');
        entity.appendChild(text);

        // Add the control-buttons component with playButton set to false
        entity.setAttribute('control-buttons', 'playButton: false');

        // Append the entity to the scene
        const scene = document.querySelector('#chapter');
        scene.appendChild(entity);
    }
});