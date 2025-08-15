interface AudioDisplayProps {
    url: string;
}

export const AudioDisplay = ({ url }: AudioDisplayProps) => {
    return (
        <div className="p-4 bg-secondary-hover rounded-lg">
            <audio controls src={url} className="w-full">
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};
