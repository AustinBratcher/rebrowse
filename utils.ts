import Logger from "https://deno.land/x/logger@v1.1.1/logger.ts";
import {Config} from "./types.ts";

const logger = new Logger();
const logPath = Deno.env.get("HOME") + "/.rebrowse.log";
await logger.initFileLogger(logPath, {
    rotate: true,
});

logger.disableConsole();

export {
    logger,
}

export const ReadJsonFileSync = <T>(filePath: string): T => {
    const rawJSON = Deno.readTextFileSync(filePath);
    return JSON.parse(rawJSON) as T;
}


export const ReadConfigFileSync = (): Config => {
    const configPath = Deno.env.get("HOME") + "/.rebrowse";
    try {
        return ReadJsonFileSync<Config>(configPath);
    } catch (e) {
        logger.error("Error reading config", e);
    }

    return {
        url_patterns: [],
    };
}