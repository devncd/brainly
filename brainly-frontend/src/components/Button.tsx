import { type ComponentType } from "react";
import { type IconProps } from "../assets/icons";

export interface ButtonProps {
    variant: "primary" | "secondary";
    size?: "sm" | "md" | "lg";
    text?: string;
    isIconOnly?: boolean;
    startIcon?: ComponentType<IconProps>;
    endIcon?: ComponentType<IconProps>;
    onClick: ()=>void;
    disabled?: boolean;
}

export const Button = ({
    variant,
    size = 'md', // default to medium size
    text,
    isIconOnly = false,
    startIcon: StartIcon, // rename prop for rendering
    endIcon: EndIcon,
    onClick,
    disabled = false // default to false
}: ButtonProps)=>{

    const baseClasses = `
        font-regular
        rounded-xl
        transition-all duration-100
        focus:outline-none 
        disabled:cursor-not-allowed
        cursor-pointer
        flex justify-center items-center
    `;

    const sizeClasses = {
        sm: 'text-sm px-3 py-1',
        md: 'text-md px-4 py-2',
        lg: 'text-lg px-6 py-3'
    };

    const iconOnlySizeClasses = {
        sm: 'p-2 px-2',
        md: 'p-2.5 px-3',
        lg: 'p-3 px-4'
    };

    const variantClasses = {
        primary: `
            disabled:bg-disabled-bg disabled:text-disabled-text
            bg-primary-base text-on-primary
        `,
        secondary: `
            disabled:text-secondary-disabled-text
            bg-secondary-base text-on-secondary
        `
    };

    const enabledClasses = {
        primary: `
            hover:bg-primary-hover
            focus:ring-primary-focus
        `,
        secondary: `
            hover:bg-secondary-hover
            focus:ring-secondary-focus
        `
    };

    const buttonClasses = `
        ${baseClasses}
        ${isIconOnly ? iconOnlySizeClasses[size] : sizeClasses[size]}
        ${variantClasses[variant]}
        ${disabled ? '': enabledClasses[variant]}
    `;
    
    return <button disabled={disabled} className={buttonClasses} onClick={onClick}>
        {StartIcon && text && <span className="mr-1.5"><StartIcon size={size}/></span>}
        {StartIcon && !text && <span className="h-full"><StartIcon size={size}/></span>}
        {text}
        {EndIcon && <span className="ml-1.5"><EndIcon size={size}/></span>}
    </button>
}