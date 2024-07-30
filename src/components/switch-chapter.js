AFRAME.registerComponent('switch-chapter', {
  init: function() {
    const previousButton = document.querySelector('#previous-button');
    const nextButton = document.querySelector('#next-button');

    if (!previousButton || !nextButton) {
      console.error('Switch buttons are not available in the DOM');
      return;
    }

    previousButton.addEventListener('click', function() {
      let chapterEntity = document.querySelector('#chapter');
      let currentId = chapterEntity.getAttribute('load-chapter').chapterId;
      let newId = currentId - 1;
      if (newId < 0) {
        newId = 0;
      }
      chapterEntity.setAttribute('load-chapter', 'chapterId', newId);
    });

    nextButton.addEventListener('click', function() {
      let chapterEntity = document.querySelector('#chapter');
      let currentId = chapterEntity.getAttribute('load-chapter').chapterId;
      let newId = currentId + 1;
      chapterEntity.setAttribute('load-chapter', 'chapterId', newId);
    });
  }
});