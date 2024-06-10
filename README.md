[![NPM Version](https://img.shields.io/npm/v/vad-audio-worklet?style=flat&color=green)](https://www.npmjs.com/package/vad-audio-worklet)

# VAD AudioWorklet

AudioWorklet implementation of the vad algorithm from _Moattar, Mohammad & Homayoonpoor, Mahdi_ .

[Example Mic/File](https://thurti.github.io/vad-audio-worklet/example/index.html)  
[Full Example with Debug Data](https://thurti.github.io/vad-audio-worklet/example/index-full.html)

> **Please Note:** This is not a full voice activity detection solution. This worklet only reports "state" changes from "silence" to "speech" and vice versa without any further processing (like smoothing). The algorithm is not state of the art either. In my tests it produced a lot of false positives, but was good enough for my use case. If you are looking for a more robust solution, have a look at https://github.com/ricky0123/vad.

### Reference

Moattar, Mohammad & Homayoonpoor, Mahdi. (2010). A simple but efficient real-time voice activity detection algorithm. European Signal Processing Conference.

https://www.researchgate.net/publication/255667085_A_simple_but_efficient_real-time_voice_activity_detection_algorithm

## Install

Copy the files from `/src` to your public folder.

`src/vad-audio-worklet.js`  
`src/fft.js`

When using `npm install` you need to copy the files from `node_modules` into your project directory. ES6 module import wouldn't work.

```
npm install vad-audio-worklet
```

## Usage

Copy the files in `/src` to your project. Create a new `AudioContext`, load the vad module and connect the vad worklet node to some audio source.

More on how to use the Web Audio API see
https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API

```js
// create AudioContext
const audioContext = new AudioContext();

// load AudioWorklet module
await audioContext.audioWorklet.addModule("/src/vad-audio-worklet.js");

// create new vad audio node
const vad = new AudioWorkletNode(audioContext, "vad", {
  outputChannelCount: [1],
  processorOptions: {
    sampleRate: audioContext.sampleRate, // sample rate of the audio input
    fftSize: 128, // optional change fft size, default: 128
  },
});

// connect worklet to some audio source
yourAudioSource.connect(vad);

// listen for messages
vad.port.onmessage = (event) => {
  const cmd = event.data["cmd"];

  if (cmd === "speech") {
    // speech detected
  }

  if (cmd === "silence") {
    // silence , cpt. obvious
  }
};
```

## Example File

`example/alert.ogg`
<a href="https://commons.wikimedia.org/wiki/File:03_ALBERT_EINSTEIN.ogg">Radio Universidad Nacional de La Plata</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>, via Wikimedia Commons

## Credits

**fft.js**  
https://github.com/indutny/fft.js/

**Moattar, Mohammad & Homayoonpoor, Mahdi. (2010). A simple but efficient real-time voice activity detection algorithm. European Signal Processing Conference.**  
https://www.researchgate.net/publication/255667085_A_simple_but_efficient_real-time_voice_activity_detection_algorithm

**MDN Docs: Web Audio API**  
https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API  
https://openwebdocs.org/
