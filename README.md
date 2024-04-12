# VAD AudioWorklet

AudioWorklet implementation of the vad algorithm from _Moattar, Mohammad & Homayoonpoor, Mahdi_ .

Example: https://thurti.github.io/vad-audio-worklet/example/index.html  
Full Example: https://thurti.github.io/vad-audio-worklet/example/index-full.html

## Install

Copy the files in `/src` to your public folder.

When using `npm install` you need to copy the files from `node_modules` into your project directory. ES6 module import wouldn't work.

```
npm install @thurti/vad-audio-worklet
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
    fftSize: 128,
    sampleRate: audioContext.sampleRate,
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

## Reference

Moattar, Mohammad & Homayoonpoor, Mahdi. (2010). A simple but efficient real-time voice activity detection algorithm. European Signal Processing Conference.

https://www.researchgate.net/publication/255667085_A_simple_but_efficient_real-time_voice_activity_detection_algorithm

## Example File

`example/alert.ogg`
<a href="https://commons.wikimedia.org/wiki/File:03_ALBERT_EINSTEIN.ogg">Radio Universidad Nacional de La Plata</a>, <a href="https://creativecommons.org/licenses/by-sa/3.0">CC BY-SA 3.0</a>, via Wikimedia Commons
