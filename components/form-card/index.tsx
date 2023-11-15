import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

const FormScreen = ({ className, pageStyle, children}: any) => {
  
  return (
    <>
      <div className={twMerge("py-6", className)}>{children}</div>
      <style>
        {
          `body {
            background-color: var(--color-primary-light);
          }
          ${pageStyle}
          `
        }
      </style>
    </>
  )
}

const FormWrap = ({ className, children}: any) => {
  return <div className={twMerge("mx-auto max-w-[452px] px-4", className)}>{children}</div>
}

const FormHeader = ({ className, children}: any) => {
  return <div className={twMerge("pb-5 sm:pb-7 text-center", className)}>
          <Link href="/" className="relative inline-block w-[180px] h-[40px] sm:w-[211px] sm:h-[51px]">
              <Image src="/assets/images/logo-white.webp" alt="Ekonobi Logo" fill priority />
          </Link>
        </div>
}

const FormCard = ({ className, children}: any) => {
  return <div className={twMerge("rounded-[20px] bg-white shadow-[5px_5px_10px_0_rgba(188,188,188,0.1)]", className)}>{children}</div>
}

const FormCardHeader = ({ className, children }: any) => {
  return <div className={twMerge("sm:py-[21px] py-4 sm:px-9 px-4 border-b border-solid border-f1f1f1 text-center", className)}>{children}</div>
}

const FormCardTitle = ({ className, children }: any) => {
  return <h6 className={twMerge("text-34345b font-medium text-sm mb-0", className)}>{children}</h6>
}

const FormCardBody = ({ className, children }: any) => {
  return <div className={twMerge("pt-6 sm:px-9 px-4 pb-8", className)}>{children}</div>
}

const FormCardText = ({ className, children }: any) => {
  return <p className={twMerge("text-dark-light text-base font-medium text-center leading-5", className)}>{children}</p>
}

const FormCardOuterWrap = ({ className, children }: any) => {
  return <div className={twMerge("max-w-[310px] mt-4 mx-auto", className)}>{children}</div>
}
const FormCardOuterText = ({ className, children }: any) => {
  return <p className={twMerge("text-afc5f6 sm:text-base text-sm text-center sm:leading-6 leading-5", className)}>{children}</p>
}

export { FormScreen, FormWrap, FormHeader, FormCard, FormCardHeader, FormCardTitle, FormCardBody, FormCardText, FormCardOuterWrap, FormCardOuterText }