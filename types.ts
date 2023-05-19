export enum BrowserEnum {
    Chrome = "Chrome",
}

interface BasePattern {
    browser: BrowserEnum;
    incognito: boolean;
}

export interface UrlPattern extends  BasePattern {
    pattern: RegExp;
}

export interface ConfigPattern extends BasePattern {
    pattern: string;
}

export interface Config {
    url_patterns: ConfigPattern[];
}

export interface Browser {
    browser: BrowserEnum
    open: (url: string, incognito: boolean) => void
}