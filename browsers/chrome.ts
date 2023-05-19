import {Browser, BrowserEnum} from "../types.ts";

const chromeAppPath = "/Applications/Google Chrome.app";

const buildCommand = (url: string, incognito: boolean): Deno.Command => {
    return new Deno.Command("open", {
        args: [
            "-na",
            chromeAppPath,
            "--args",
            ...(incognito ? ['--incognito'] : []),
            url,
        ]
    });
}

const open = (url: string, incognito: boolean) => {
    const command: Deno.Command = buildCommand(url, incognito);
    command.spawn();
}

export const Chrome: Browser = {
    browser: BrowserEnum.Chrome,
    open,
}