import {Browser, BrowserEnum, Config, UrlPattern} from "./types.ts";
import { ReadJsonFileSync, logger } from "./utils.ts";
import { getMatchingBrowserOrDefault } from "./browsers/browsers.ts";

logger.info('ReBrowse started');
const configPath = Deno.env.get("HOME") + "/.rebrowse";
const config: Config = ReadJsonFileSync<Config>(configPath);

function registerPattern(pattern: string, browser: BrowserEnum, incognito: boolean): UrlPattern {
    return { pattern: new RegExp(pattern), browser, incognito };
}

const patterns: UrlPattern[] = config.url_patterns.map(({ pattern, browser, incognito}) =>
    registerPattern(pattern, browser, incognito)
);

const openWithBrowser = (url: string, incognito: boolean, browserEnum: BrowserEnum) => {
    const browser: Browser = getMatchingBrowserOrDefault(browserEnum);
    browser.open(url, incognito);
}

logger.info('Args', Deno.args);
Deno.args.forEach(url => {
    const matchingPattern: UrlPattern | undefined = patterns.find(p => p.pattern.test(url));
    if(matchingPattern) {
        openWithBrowser(url, matchingPattern.incognito, matchingPattern.browser);
        return;
    }
    openWithBrowser(url, false, BrowserEnum.Chrome);
});

logger.info('ReBrowse Ended')