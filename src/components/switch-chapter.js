AFRAME.registerComponent('switch-chapter', {
  schema
: {
    previousButtonID: {type: 'string', default: 'previous-button'},
    nextButtonID: {type: 'string', default: 'next-button'}
  },
  init: function() {
    const previousButton = document.querySelector(`#${this.data.previousButtonID}`);
    const nextButton = document.querySelector(`#${this.data.nextButtonID}`);

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