AFRAME.registerComponent('pointer', {
    init: function () {
      let el = this.el;
      let note = this.note
      note = null;
    
      this.showNote = function(e){
        if(!note){
            note = document.createElement('a-sphere');
            note.setAttribute('material', 'opacity: 0.7; transparent: true; color: red;');
            note.setAttribute('scale', '.1 .1 .1');
            note.setAttribute('class', e.detail.intersection.object.el.getAttribute('class'));
            note.setAttribute('position', el.object3D.worldToLocal(e.detail.intersection.object.el.object3D.position));
            note.setAttribute('pointer');

            el.appendChild(note);
        }   else {
                note.setAttribute('position', el.object3D.worldToLocal(e.detail.intersection.object.el.object3D.position));
            }
        }
        
      this.removeNote = function(e){
        //this.note.setAttribute('material', 'opacity: 0; transparent: true;');
        if (this.note) {
            el.removeChild(this.note);
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
