import { Chrome } from './chrome.ts';
import {Browser, BrowserEnum} from "../types.ts";

const browsers = [
    Chrome,
];

export const getMatchingBrowserOrDefault = (browserEnum: BrowserEnum): Browser => {
    const matchedBrowser = browsers.find(b => b.browser === browserEnum);
    return matchedBrowser || Chrome;
}