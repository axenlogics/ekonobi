import Image from 'next/image';
import cx from "classnames";

export function MessageCard({text} : any) {

    return (
        <>
        <div className={cx('flex items-center m-[0px_0px_30px] sm:m-[0px_0px_40px] rounded-[15px] lg:rounded-[20px] bg-fff0c2 bg-blend-normal')}>
            <Image className={'m-[0_18px] sm:m-[0_22px] md:m-[0_30px]'} src={`/assets/images/icons/danger-sign.svg`} alt={'info'}  width={24} height={24}/>
            <div className={'text-sm md:text-base font-medium p-[10px_15px_10px_0] sm:p-[15px_15px_15px_0] text-d19800'}>
            {text}
            </div>
        </div>
        </>
    );
}