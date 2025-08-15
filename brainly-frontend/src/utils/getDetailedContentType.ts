export type ContentTypeHint = 'image' | 'video' | 'article' | 'audio';

export const DetailedContentType = {
    YouTube: 'youtube',
    Twitter: 'twitter',
    Image: 'image',
    GenericVideo: 'generic_video',
    Article: 'article',
    Audio: 'audio',
} as const;

export type DetailedContentType = (typeof DetailedContentType)[keyof typeof DetailedContentType];

// A map of regex patterns to content types
const urlPatterns: Partial<Record<DetailedContentType, RegExp>> = {
    [DetailedContentType.YouTube]: /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\//,
    [DetailedContentType.Twitter]: /^(?:https?:\/\/)?(?:www\.)?(?:twitter\.com|x\.com)\//,
    [DetailedContentType.Image]: /\.(jpeg|jpg|gif|png|svg|webp)(\?.*)?$/i,
    [DetailedContentType.GenericVideo]: /\.(mp4|webm|mov|avi)(\?.*)?$/i,
    [DetailedContentType.Audio]: /\.(mp3|wav|ogg|m4a)(\?.*)?$/i,
};

export const getDetailedContentType = (url: string, hint: ContentTypeHint): DetailedContentType => {
    // Check for specific URL patterns first
    for (const type in urlPatterns) {
        if (urlPatterns[type as DetailedContentType]!.test(url)) {
            return type as DetailedContentType;
        }
    }

    // If no specific pattern matches, use the hint
    switch (hint) {
        case 'video':
            return DetailedContentType.GenericVideo;
        case 'image':
            return DetailedContentType.Image;
        case 'audio':
            return DetailedContentType.Audio;
        case 'article':
        default:
            return DetailedContentType.Article;
    }
};
