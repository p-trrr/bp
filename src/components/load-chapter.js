import { debounce } from 'lodash';

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
  },
  update: function (oldData) {
    if (oldData.chapterId !== this.data.chapterId) {
      console.log('Chapter ID changed from', oldData.chapterId, 'to', this.data.chapterId);
      this.loadChapter();
    }
  },
  loadChapter: debounce(async function () {
    var chapterEl = document.querySelector('#chapter');
    var chapterId = this.data.chapterId;
      
    if (typeof chapterId === 'undefined') {
      console.error('Chapter ID is undefined!');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3001/api/chapter/${chapterId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log('Loading chapter with ID:', chapterId);
      const data = await response.json();
  
      // Nejprve odstraněte všechny stávající entity
      if(chapterEl.firstChild!==null){
        while (chapterEl.firstChild) {
          chapterEl.removeChild(chapterEl.firstChild);
        }
      }
  
      // Poté přidejte nové entity
      appendEntities(data, chapterEl);
    } catch (error) {
      console.error('Error loading the chapter:', error);
    }
  }, 300),
});