import { twMerge } from 'tailwind-merge';
import Image from 'next/image';

export function Notification({ className, icon, iconClassName, text, textClassName } : any) {
    return (
      <div className={twMerge("bg-warning rounded-md p-2.5 pl-4 flex", className)}>
        <Image className={twMerge("self-center mr-3", iconClassName)} src={icon} alt="icon" width={12} height={12}/>
        <p className={twMerge("text-white text-xs font-bold leading-4 text-right m-0", textClassName)}>{text}</p>
      </div>
    );
}
