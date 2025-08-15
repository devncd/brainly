import { Tweet } from 'react-tweet';
import { getTweetId } from '../utils/getTweetId';

interface TweetDisplayProps {
    url: string;
}

export const TweetDisplay = ({ url }: TweetDisplayProps) => {
    const tweetId = getTweetId(url);

    if (!tweetId) {
        // Fallback for invalid or non-tweet URLs
        return (
            <div className="bg-secondary-hover rounded-lg">
                <p className="text-sm text-on-secondary mb-2">Could not display Tweet. Invalid URL.</p>
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline break-all">{url}</a>
            </div>
        );
    }

    // The 'react-tweet' component handles fetching and rendering the tweet.
    return <div className='-mt-6 -mb-6 max-h-96 overflow-y-scroll no-scrollbar tweet-embed'>
        <Tweet id={tweetId} />
    </div>;
};
