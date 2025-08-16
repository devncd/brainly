import { type IconProps } from "../assets/icons";
import { type ComponentType } from "react";

interface SidebarItemProps {
    icon: ComponentType<IconProps>;
    title: string;
    url: string;
}

export const SidebarItem = ({icon: Icon, title, url}: SidebarItemProps) => {
    return (
        <a href={url} className="flex flex-row items-center text-md gap-2 px-4 py-2 mt-1 text-on-secondary text-base hover:bg-secondary-hover rounded-lg cursor-pointer">
            <Icon size="md"/>
            <span>{title}</span>
        </a>
    )
}