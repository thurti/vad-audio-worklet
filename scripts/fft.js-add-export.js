// read fft.js file from node_modules
const fs = require("fs");
const path = require("path");
const fftPath = path.join(__dirname, "../node_modules/fft.js/lib/fft.js");
const fft = fs.readFileSync(fftPath, "utf8");

// replace module.exports with es6 export
fftExport = fft.replace("module.exports = FFT;", "export default FFT;");

// write fft.js with export
fs.writeFileSync(path.join(__dirname, "../src/fft.js"), fftExport);
