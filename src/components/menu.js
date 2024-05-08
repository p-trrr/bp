AFRAME.registerComponent('menu', {
    init: async function() {
      this.chapterEntity = document.querySelector('#chapter');
      this.menuTiles = this.chapterEntity.querySelectorAll('[menu]');
      // always present menu button in the scene
      this.menuButton = document.querySelector('#menu-button');
  
      this.menuTiles.forEach(tile => {
        tile.addEventListener('click', () => {
            console.log('Tile clicked:', tile.getAttribute('id'));
            let chapterId = tile.getAttribute('id');
            this.switchChapter(chapterId);
        });
      });
      this.menuButton.addEventListener('click', () => {
        console.log('Menu button clicked');
        this.switchChapter(0);
      });
    },
  
    switchChapter: function(chapterId) {
      this.chapterEntity.setAttribute('load-chapter', 'chapterId', chapterId);
      this.chapterEntity.components['load-chapter'].loadChapter();
    },
  });  