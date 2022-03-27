"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const fs_1 = __importDefault(require("fs"));
const config_json_1 = __importDefault(require("./config.json"));
setInterval(() => {
    const d = new Date();
    if (config_json_1.default.start.dayOfWeek == d.getDay() &&
        config_json_1.default.start.hour == d.getHours() &&
        config_json_1.default.start.minute >= d.getMinutes()) {
        console.log("Starting recording");
        Stream();
    }
}, config_json_1.default.checkInterval * 6e4);
Stream();
function Stream() {
    return __awaiter(this, void 0, void 0, function* () {
        const d = new Date();
        const f = `./recordings/${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}.mp3`;
        const s = fs_1.default.createWriteStream(f);
        (0, node_fetch_1.default)(config_json_1.default.url).then((res) => {
            res.body.pipe(s);
        });
        setTimeout(() => {
            s.end();
            console.log("Recording ended");
            console.log(`File saved to ${f}`);
        }, config_json_1.default.recordLength * 6e4);
    });
}
