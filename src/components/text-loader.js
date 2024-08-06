

AFRAME.registerComponent('text-loader', {
  schema: {
    chapterId: { type: 'number', default: 1 },  // Chapter to display
    textId: { type: 'number', default: 0 },  // Text index to display
    nextTextButtonID: { type: 'string', default: 'next-text-button' },
    previousTextButtonID: { type: 'string', default: 'previous-text-button' }
  },
  init: function () {
    let textEntity = document.createElement('a-text');
    textEntity.setAttribute('align', 'center');
    textEntity.setAttribute('color', 'black');
    textEntity.setAttribute('position', '0 0 0');
    textEntity.setAttribute('scale', '0.5 0.5 0.5');
    textEntity.setAttribute('font', '/assets/fonts/aframe-custom-msdf.json');
    //textEntity.setAttribute('fontImage', '/assets/fonts/aframe-custom-msdf.png');
    textEntity.setAttribute('negate', 'false');
    this.el.appendChild(textEntity);
    this.textEntity = textEntity;

    this.fetchTexts(this.data.chapterId)
      .then(texts => {
        this.texts = texts;
        console.log('Fetched texts:', this.texts);
        console.log('current text ID:', this.data.textId);
        this.displayText(this.data.chapterId, 0);
      })
      .catch(error => {
        console.error('Failed to fetch texts:', error);
        this.texts = [];
      });

    this.el.addEventListener('text-entity-created', () => {
      console.log('Moving the text entity');
      this.el.setAttribute('animation__move', {
        property: 'position',
        to: '0 2 -1.9',
        dur: 2500, // Duration of the animation in milliseconds
        easing: 'easeInOutSine', // Easing function for smooth animation
      });
      this.el.setAttribute('animation__rotation', {
        property: 'rotation',
        to: '0 0 0',
        dur: 1000, // Duration of the rotation animation in milliseconds
        easing: 'easeInOutSine', // Easing function for smooth animation
      });
    });

    this.el.addEventListener('move-text-entity', () => {
      console.log('Moving the text entity to the initial position');
      this.el.setAttribute('animation__move', {
        property: 'position',
        to: '-2.5 1.8 -1.8',
        dur: 1000, // Duration of the animation in milliseconds
        easing: 'easeInOutSine', // Easing function for smooth animation
      });
      this.el.setAttribute('animation__rotation', {
        property: 'rotation',
        to: '0 30 0',
        dur: 1000, // Duration of the rotation animation in milliseconds
        easing: 'easeInOutSine', // Easing function for smooth animation
      });
      
    });

    this.el.emit('text-entity-created', null, false);
    

    // Button attributes and a click event listener
    const nextTextButton = document.getElementById(this.data.nextTextButtonID);
    if (nextTextButton) {
      nextTextButton.setAttribute('rotation', '0 0 0');
      nextTextButton.setAttribute('scale', '0.5 0.5 0.5');

      nextTextButton.addEventListener('click', () => {
        if (this.data.textId === this.texts.length - 1) {
          this.el.emit('move-text-entity');
        } else if (this.data.textId < this.texts.length-1) {
            this.data.textId += 1;
        }
        console.log('current text ID:', this.data.textId);
        this.displayText(this.data.chapterId, this.data.textId); 
      });
    }
    
    // Button attributes and a click event listener
    const previousTextButton = document.getElementById(this.data.previousTextButtonID);
    if (previousTextButton) {
      previousTextButton.setAttribute('rotation', '0 0 0');
      previousTextButton.setAttribute('scale', '0.5 0.5 0.5');

      previousTextButton.addEventListener('click', () => {
        if (this.data.textId > 0) {
          this.data.textId -= 1; 
        } else if (this.data.textId === 0) {
            this.data.textId = 0;
        }
          else {
            console.error('No previous text to display');
            this.data.textId = 0;
        }
        console.log('current text ID:', this.data.textId);
        this.displayText(this.data.chapterId, this.data.textId);
      });
    }
    
    
  },
  

  fetchTexts: async function() {
    try {
      const response = await fetch(`http://localhost:3001/api/${this.data.chapterId}/texts`);
      if (!response.ok) {
        throw new Error('The response was not ok');
      }
      const fetchedTexts = await response.json();
      // Convert the fetched texts object to an array
      this.texts = Object.values(fetchedTexts);
      return this.texts;
    } catch (error) {
      console.error('Failed to fetch texts:', error);
      return null;
    }
  },
  
  displayText: async function(id) {
    if (this.texts.lenght > 0) {
      console.error('No texts available');
      this.data.textId = 0;
    }
    else if (id < 0 || id >= this.texts.length) {
      console.error('No text with such index');
      this.data.textId = 0;
    } else {
      this.textEntity.setAttribute('value', this.texts[this.data.textId]);
    }
  },
  
 


  
  
  
  
  
  
  
  
  /*
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
  }
  */
});