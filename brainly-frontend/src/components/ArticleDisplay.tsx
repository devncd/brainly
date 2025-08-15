interface ArticleDisplayProps {
    url: string;
}

export const ArticleDisplay = ({ url }: ArticleDisplayProps) => {
    return (
        <div className="p-4 bg-secondary-hover rounded-lg">
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline break-all">{url}</a>
        </div>
    );
};
