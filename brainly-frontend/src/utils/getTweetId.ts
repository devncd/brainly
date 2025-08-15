/**
 * A helper function to parse a URL and extract the Tweet ID.
 * It supports both twitter.com and x.com URLs.
 * @param url The URL to parse.
 * @returns The Tweet ID, or null if not found.
 */
export const getTweetId = (url: string): string | null => {
    const match = url.match(/\/status\/(\d+)/);
    return match ? match[1] : null;
};
