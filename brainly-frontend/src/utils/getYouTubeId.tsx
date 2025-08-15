/**
 * A helper function to parse a URL and extract the YouTube video ID.
 * It supports various YouTube URL formats (watch, youtu.be, embed).
 * @param url The URL to parse.
 * @returns The 11-character YouTube video ID, or null if not found.
 */

export const getYouTubeId = (url: string): string | null => {
  // This regex is designed to find the video ID from the most common YouTube URL formats.
  const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:\S+)?$/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};