import {Browser, BrowserEnum, Config, UrlPattern} from "./types.ts";
import { logger, ReadConfigFileSync } from "./utils.ts";
import { getMatchingBrowserOrDefault } from "./browsers/browsers.ts";

const config: Config = ReadConfigFileSync();

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

logger.info('ReBrowse Processing: ', Deno.args);
Deno.args.forEach(url => {
    const matchingPattern: UrlPattern | undefined = patterns.find(p => p.pattern.test(url));
    if(matchingPattern) {
        openWithBrowser(url, matchingPattern.incognito, matchingPattern.browser);
        return;
    }
    openWithBrowser(url, false, BrowserEnum.Chrome);
});