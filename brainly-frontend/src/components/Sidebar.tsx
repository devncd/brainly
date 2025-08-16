import { ArticleIcon, AudioIcon, ImageIcon, TwitterIcon, VideoIcon, YoutubeIcon } from "../assets/icons"
import { Logo } from "../assets/Logo"
import { SidebarItem } from "./SidebarItem"

export const Sidebar = () => {
    return (
        <div className="w-46 bg-sidebar-bg fixed left-0 top-0 h-screen p-4">
            <Logo/>
            <div className="mt-8">
                <SidebarItem icon={YoutubeIcon} title="YouTube" url={"/c/youtube"}/>
                <SidebarItem icon={TwitterIcon} title="X/Twitter" url={"/c/x"}/>
                <SidebarItem icon={VideoIcon} title="Videos" url={"/c/videos"}/>
                <SidebarItem icon={ImageIcon} title="Images" url={"/c/images"}/>
                <SidebarItem icon={ArticleIcon} title="Articles" url={"/c/articles"}/>
                <SidebarItem icon={AudioIcon} title="Audio" url={"/c/audio"}/>
            </div>
        </div>
    )
}