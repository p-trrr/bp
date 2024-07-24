AFRAME.registerComponent('text-loader', {
  schema: {
    chapterId: { type: 'number', default: 1 },  // Chapter to display
    textId: { type: 'number', default: 0 }  // Text index to display
  },
  init: function () {
    this.textEntity = document.createElement('a-text');
    this.textEntity.setAttribute('align', 'center');
    this.textEntity.setAttribute('color', 'black');
    this.textEntity.setAttribute('position', '0 1 -2');  // Adjust position as needed
    this.el.appendChild(this.textEntity);

    this.fetchAndDisplay();
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
        console.log(data.chapterId, ', ', data.textId, ' text content:', textContent);
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