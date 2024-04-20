class Note {
    constructor(id, tone, index, frequency, position) {
        this.id = id;
        this.tone = tone; //class of the intersected object: intersectedObject.el.getAttribute('class');
        this.index = index;
        this.frequency = frequency;
        this.HTMLelement = document.createElement('a-sphere');
//
        this.HTMLelement.setAttribute('color', 'red');;
        this.HTMLelement.setAttribute('scale', '.1 .1 .1');
        this.HTMLelement.setAttribute('position', position);
        this.HTMLelement.setAttribute('frequency', frequency);
        this.HTMLelement.classList.add(tone);

        //this.playTone(this.frequency);
    }
    
    playTone() {
        // create web audio api context
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
         // create Oscillator and gain node
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        // connect oscillator to gain node to speakers
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.2, (audioCtx.currentTime + 0.2));
        
    
        //oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(this.frequency, audioCtx.currentTime);
        //gainNode.gain.linearRampToValueAtTime(0, (audioCtx.currentTime + 1));
    
        oscillator.start();
        setTimeout(() => {
            oscillator.stop();
            audioCtx.close();
        }, 500); // Play tone for 500 ms
    }
    
    
    getHTMLelement(){
        return this.HTMLelement;
    }
    getTone() {
        return this.tone;
    }
    
    getId() {
        return this.id;
    }
    
    getColumn(){
        return this.column;
    }
}
module.exports = Note;