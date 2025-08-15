interface ImageDisplayProps {
    url: string;
}

export const ImageDisplay = ({ url }: ImageDisplayProps) => {
    return (
        <img src={url} alt="User content" className="w-full h-auto rounded-lg object-cover" />
    );
};
