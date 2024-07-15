class Note {
    constructor(id, tone, index, frequency) {
        this.id = id;
        this.tone = tone; //class of the intersected object: intersectedObject.el.getAttribute('class');
        this.index = index;
        this.frequency = frequency;
        this.HTMLelement = document.createElement('a-sphere');
        this.synth = new Tone.Synth().toDestination();

        this.HTMLelement.setAttribute('id', this.id);
        this.HTMLelement.setAttribute('color', 'red');;
        this.HTMLelement.setAttribute('scale', '.1 .1 .1');
        this.HTMLelement.setAttribute('frequency', frequency);
        this.HTMLelement.setAttribute('index', this.index);
        this.HTMLelement.setAttribute('visible', 'true');
        this.HTMLelement.classList.add(tone);

    }
    
    /*playTone() {
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
        oscillator.frequency.setValueAtTime(this.frequency, audioCtx.currentTime);
        //gainNode.gain.linearRampToValueAtTime(0, (audioCtx.currentTime + 1));
    
        oscillator.start();
        this.HTMLelement.setAttribute('color', 'white');
        setTimeout(() => {
            oscillator.stop();
            audioCtx.close();
            this.HTMLelement.setAttribute('color', 'red');
        }, 1000); // Play tone for 1000 ms
    }*/
    
    playTone() {        
        const now = Tone.now();
        this.synth.triggerAttackRelease(this.tone, "8n", now);
    }

    getID(){return this.id;}
    getTone(){return this.tone;}
    getIndex(){return this.index;}
    getFrequency(){return this.frequency;}
    getHTMLelement(){return this.HTMLelement;}
    getPosition(){return this.position;}
}
module.exports = Note;