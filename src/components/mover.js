AFRAME.registerComponent('mover', {
  init: function() {
    let el = this.el;
    let isOriginalPosition = true;
    this.animateMove = function() {
      
      let currPosition = el.getAttribute('position');
      let targetPosition;

      if (isOriginalPosition) {
        targetPosition = {
          x: currPosition.x - 1.5,
          y: currPosition.y,
          z: currPosition.z + 1
        };
      } else {
        //ze změněné polohy zpět na původní
        targetPosition = {
          x: currPosition.x + 1.5,
          y: currPosition.y,
          z: currPosition.z -1,
        };
      }
      let params = {
        property: 'position',
        to: targetPosition,
        dur: 2000,
        easing: 'easeInOutElastic'
      };
      el.setAttribute('animation', params);
    }
    
    this.returnMove = function(e) {
      let p = e.detail.returnPoint;
      let params = {
        property: 'position',
        to: {
          x: p.x,
          y: p.y + 2,
          z: p.z
        },
        dur: 5000,
        easing: 'easeInOutQuad'
      };
      el.setAttribute('animation', params);
    }
    
    this.el.addEventListener('click',this.animateMove);

  },
  remove: function() {
    this.el.removeEventListener('click', this.animateMove);
  }
});