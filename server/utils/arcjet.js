import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node";
import { ARCJET_KEY } from "../config/envConfig.js";


const aj = arcjet({
    key: ARCJET_KEY,
    rules: [
        shield({ mode: "LIVE" }),
        detectBot({
            mode: "LIVE",
            allow: [
                "CATEGORY:SEARCH_ENGINE",
            ],
        }),
        slidingWindow({
            mode: "LIVE",
            max: 5, 
            interval: 60, // 60 seconds
        }),
    ],
});

export default aj;