import Logger from "https://deno.land/x/logger@v1.1.1/logger.ts";

export const ReadJsonFileSync = <T>(filePath: string): T => {
    const rawJSON = Deno.readTextFileSync(filePath);
    return JSON.parse(rawJSON) as T;
}


const logger = new Logger();
const logPath = Deno.env.get("HOME") + "/.rebrowse.log";
await logger.initFileLogger(logPath);
logger.disableConsole();

export {
    logger,
}