import fetch from "node-fetch";
import fs from "fs";
import config from "./config.json";

console.log("Ready to record")

setInterval(() => {
  const d = new Date();

  if (
    config.start.dayOfWeek == d.getDay() &&
    config.start.hour == d.getHours() &&
    config.start.minute >= d.getMinutes()
  ) {
      console.log("Starting recording");
      Stream();
  }
}, config.checkInterval * 6e4);

Stream();

async function Stream() {
  const d = new Date();
  const f = `./recordings/${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}.mp3`
  const s = fs.createWriteStream(f);

  fetch(config.url).then((res) => {
    res.body.pipe(s);
  });

  setTimeout(() => {
    s.end();
    console.log("Recording ended");
    console.log(`File saved to ${f}`);
  }, config.recordLength * 6e4);
}
