import { ShareIcon, PencilIcon, DeleteIcon } from "../assets/icons";
import { VideoDisplay } from "./VideoDisplay";
import { ArticleDisplay } from "./ArticleDisplay";
import { AudioDisplay } from "./AudioDisplay";
import { ImageDisplay } from "./ImageDisplay";
import { TweetDisplay } from "./TweetDisplay";
import { type ContentTypeHint, DetailedContentType, getDetailedContentType } from "../utils/getDetailedContentType";
import { Button } from "./Button";

interface CardProps {
    title: string;
    link: string;
    type: ContentTypeHint;
    tags: string[];
}

const ContentDisplay = ({ link, type }: { link: string, type: ContentTypeHint }) => {
    const detailedType = getDetailedContentType(link, type);

    switch (detailedType) {
        case DetailedContentType.YouTube:
        case DetailedContentType.GenericVideo:
            return <VideoDisplay url={link} />;
        case DetailedContentType.Twitter:
            return <TweetDisplay url={link} />;
        case DetailedContentType.Image:
            return <ImageDisplay url={link} />;
        case DetailedContentType.Audio:
            return <AudioDisplay url={link} />;
        case DetailedContentType.Article:
        default:
            // Fallback for unknown types or articles
            return <ArticleDisplay url={link} />;
    }
};


export const Card = ({ title, link, type, tags }: CardProps) => {
  return (
    <div className="group relative flex flex-col justify-between w-72 min-h-48 rounded-xl border border-gray-200 dark:border-gray-900 bg-card-background transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 dark:hover:border-gray-600">
      
      {/* Card Content Area */}
      <div className="p-4 flex flex-col flex-1">
        
        {/* Header Section */}
        <div className="flex items-start justify-between gap-3">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-on-secondary leading-tight rounded-sm hover:underline"
          >
            <span className="line-clamp-2">{title}</span>
          </a>

          {/* Action Buttons */}
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button variant="secondary" size="sm" isIconOnly startIcon={ShareIcon} onClick={() => {}} />
            <Button variant="secondary" size="sm" isIconOnly startIcon={PencilIcon} onClick={() => {}} />
            <Button variant="secondary" size="sm" isIconOnly startIcon={DeleteIcon} onClick={() => {}} />
          </div>
        </div>

        {/* Preview / Content */}
        <a href={link} target="_blank" rel="noopener noreferrer" className="mt-3 rounded-lg overflow-hidden block">
          <ContentDisplay link={link} type={type} />
        </a>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 px-4 py-3 border-t border-gray-100 dark:border-gray-900">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-0.5 bg-secondary-hover/50 text-on-secondary rounded-full text-xs font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
