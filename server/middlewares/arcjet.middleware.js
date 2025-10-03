import aj from "../utils/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
    try {
        const decision = await aj.protect(req);

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({ message: "Too many requests - try again later." });
            } else if (decision.reason.isBot()) {
                return res.status(403).json({ message: "Access denied - bots are not allowed." });
            } else {
                return res.status(403).json({ message: "Access denied by security policy." });
            }
        }
        if (decision.results.some(isSpoofedBot)) {
            return res.status(403).json({
                message: "Access denied - suspected bot activity.",
                error: "Spoofed bot detected"
            });
        }



    } catch (error) {
        res.status(500).json({ message: "Internal Server error " + error.message });
    }
}