export const ReadJsonFileSync = <T>(filePath: string): T => {
    const rawJSON = Deno.readTextFileSync(filePath);
    return JSON.parse(rawJSON) as T;
}