document.addEventListener('text-loader', () => {
  let currentIndex = 0;
  let texts = [];

  const loadedTexts = async () => {
    try {
      const response = await fetch('/src/assets/texts.json');
      const data = await response.json();
      texts = data.texts;
      setText(); // Set text immediately after loading
    } catch (error) {
      console.error('Failed to load texts:', error);
    }
  };

  const setText = () => {
    if (texts.length > 0) {
      document.querySelector('#card-text').setAttribute('value', texts[currentIndex]);
      console.log("Text set to index " + currentIndex);
    } else {
      console.log("No texts to display.");
    }
  };

  loadedTexts(); // No need to use then(), as everything is handled inside loadedTexts

  document.querySelector('#next-button').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % texts.length;
    setText();
  });

  document.querySelector('#prev-button').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + texts.length) % texts.length;
    setText();
  });

});
