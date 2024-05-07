function appendEntities(entities, parentEl) {
  entities.forEach(entity => {
    let entityEl = document.createElement(entity.tag); // Vytvoří prvek podle zadaného tagu
    Object.entries(entity).forEach(([key, value]) => {
      if (key === 'children' && Array.isArray(value)) {
        appendEntities(value, entityEl); // Rekurzivní volání pro vnořené entity
      } else if (key !== 'tag' && key !== 'children') {
        if (typeof value === 'object') {
          // Pro složitější struktury jako jsou animace, nastavit atributy přes setAttribute
          Object.entries(value).forEach(([subKey, subValue]) => {
            entityEl.setAttribute(`${key}__${subKey}`, subValue);
          });
        } else {
          entityEl.setAttribute(key, value); // Nastavit jednoduché atributy
        }
      }
    });
    parentEl.appendChild(entityEl); // Přidat vytvořený element do rodičovského elementu
  });
}


AFRAME.registerComponent('load-chapter', {
  schema: {
    chapterId: {type: 'number', default: 0}
  },
  init: function () {
    this.loadChapter();
    console.log('load-chapter component initialized');
  },
  update: function (oldData) {
    if (oldData.chapterId !== this.data.chapterId) {
      this.loadChapter();
    }
  },
  loadChapter: function () {
    let el = this.el;
    let chapterId = this.data.chapterId;
    fetch(`http://localhost:3001/api/chapter/${chapterId}`)
      .then(response => response.json())
      .then(data => {
        while (el.firstChild) {
          el.removeChild(el.firstChild);
        }
        console.log(data);
        appendEntities(data, el);
      })
      .catch(error => console.error('Error loading the chapter:', error));
  }
});
