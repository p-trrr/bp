AFRAME.registerComponent('text-loader', {
  schema: {
    chapterId: { type: 'number', default: 1 },  // Chapter to display
    textId: { type: 'number', default: 0 },  // Text index to display
    nextTextButtonID: { type: 'string', default: 'next-text-button' },
    previousTextButtonID: { type: 'string', default: 'previous-text-button' }
  },
  init: function () {
    this.textEntity = document.createElement('a-text');
    this.textEntity.setAttribute('align', 'center');
    this.textEntity.setAttribute('color', 'black');
    this.textEntity.setAttribute('position', '0 0 0');
    this.textEntity.setAttribute('scale', '0.5 0.5 0.5');
    this.el.appendChild(this.textEntity);

    this.fetchAndDisplay();

    // Add click event listener for the next text button
    const nextTextButton = document.getElementById(this.data.nextTextButtonID);
    if (nextTextButton) {
      nextTextButton.setAttribute('position', '0 -0.5 0.02');
      nextTextButton.setAttribute('rotation', '0 0 0');
      nextTextButton.setAttribute('scale', '0.5 0.5 0.5');


      nextTextButton.addEventListener('click', () => {
        this.data.textId += 1;  // Increment the textId to show the next text
        console.log(this.data.textId);
        this.fetchAndDisplay();
      });
    }

    // Add click event listener for the previous text button
    const previousTextButton = document.getElementById(this.data.previousTextButtonID);
    if (previousTextButton) {
      previousTextButton.addEventListener('click', () => {
        if (this.data.textId > 0) {
          this.data.textId -= 1;  // Decrement the textId to show the previous text
          console.log(this.data.textId);
          this.fetchAndDisplay();
        } else {
          console.error('No previous text to display');
        }
      });
    }
  },
  // Fetch the JSON file
  fetchAndDisplay: function () {
    let data = this.data;
    fetch(`http://localhost:3001/api/texts/${data.chapterId}/${data.textId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text(); // Use .text() instead of .json() if the response is a string
      })
      .then(textContent => {
        console.log(data.chapterId, ', ', data.textId, ', text content:', textContent);
        // Update the value of the text entity to show the actual text in the scene
        this.textEntity.setAttribute('value', textContent);
      })
      .catch(error => {
        console.error('Error fetching the text:', error);
      });
  },
  update: function (oldData) {
    if (oldData.chapterId !== this.data.chapterId) {
      this.fetchAndDisplay();
    }
  }
});