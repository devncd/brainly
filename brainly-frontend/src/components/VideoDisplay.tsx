import { getYouTubeId } from "../utils/getYouTubeId";

interface VideoDisplayProps {
    url: string;
}

// Video Display component
export const VideoDisplay = ({ url }: VideoDisplayProps) => {
    const videoId = getYouTubeId(url);
        // if we found a videoId, it's a YouTube video
        if(videoId){
            const embedUrl = `https://www.youtube.com/embed/${videoId}`;

            return (
                <div className="aspect-video w-full">
                    <iframe
                        className="w-full h-full rounded-lg" 
                        src={embedUrl} 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowFullScreen>
                    </iframe>
                </div>
            )
        }

        // If it's not a YouTube video, render a simple link
        return (
            <div className="p-4 bg-secondary-hover rounded-lg">
                <p className="text-sm text-on-secondary mb-2">This video can't be embedded. Click the link to watch.</p>
                <a href={url} target="_blank" className="text-blue-500 hover:underline break-all">{url}</a>
            </div>
        )
}