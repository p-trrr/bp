AFRAME.registerComponent('pointer', {
    init: function () {
      let el = this.el;
      let scene = document.querySelector("a-scene");
      let note = null;
    
      this.showNote = function(e){
        let intersectedObject =  e.detail.intersection.object;
        if(!note){
            note = document.createElement('a-sphere');
            note.setAttribute('id', 'pointer');
            note.setAttribute('material', 'opacity: 0.7; transparent: true; color: red;');
            note.setAttribute('scale', '.1 .1 .1');
            note.setAttribute('class', intersectedObject.el.getAttribute('class'));
            note.setAttribute('position', el.object3D.worldToLocal(intersectedObject.el.object3D.position));
            note.setAttribute('pointer');

            scene.appendChild(note);
        }   else {
                note.setAttribute('position', el.object3D.worldToLocal(intersectedObject.el.object3D.position));
            }
      }
        
      this.removeNote = function(){
        //this.note.setAttribute('material', 'opacity: 0; transparent: true;');
        if (this.note) {
            scene.removeChild(this.note);
            this.note=null;
        };
      }
      el.addEventListener('mouseenter', this.showNote);
      el.addEventListener('mouseleave', this.removeNote);
    },
    remove: function () {
      this.el.removeEventListener('mouseenter', this.showNote);
      this.el.removeEventListener('mouseleave', this.removeNote);
    },

});
