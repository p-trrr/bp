AFRAME.registerComponent('fetch-text', {
    init: function () {
        let el = this.el;
        let textEntity = document.createElement('a-text');
        el.appendChild(textEntity);
        // Fetch the JSON file
        fetch('./src/texts.json')
            .then(response => {
                console.log('Response:', response); // Log the response
                return response.json();
            })
            .then(data => {
                // Access the text string from the JSON data
                const textString = data.text;

                // Set the text string as the entity's text content
                textEntity.setAttribute('value', textString);

                // Log the loaded text to the console
                console.log('Loaded text:', textString);
            })
            .catch(error => {
                console.error('Error fetching JSON:', error);
            });
    }
});