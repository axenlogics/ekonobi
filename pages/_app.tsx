import '../styles/reset.css'
import '../styles/globals.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import GlobalProvider from '../redux/Provider'
import { store } from '../redux/Store'
// import { AuthProvider } from '../components/auth/AuthProvider'
// import { AuthGuard } from '../components/auth/AuthGuard';
import { NextPage } from 'next'
import { AuthProvider } from '../components/auth/authprovider'
import { AuthGuard } from '../components/auth/authguard'
import { ThemeProvider } from "next-themes";
import { SessionProvider, useSession } from 'next-auth/react'
config.autoAddCss = false
import Image from 'next/image';


export type NextApplicationPage<P = any, IP = P> = NextPage<P, IP> & {
  requireAuth?: boolean,
  auth?:any,
}
declare global {
  interface Number {
    toFixedFloor(length: number): any;
  }
}
Number.prototype.toFixedFloor = function (fixed) {
  const re = this.toFixed(fixed < 8 ? 8 : 12).toString().match(new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?'));
  // if (this.toFixed(8).toString().match(re) !== null) {
  return (re === undefined || re === null) ? this : re[0];
  // }
};
// Number.prototype.toFixed = function (fixed) {
//   const re = this.toFixed(fixed < 8 ? 8 : 12).toString().match(new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?'));
//   // if (this.toFixed(8).toString().match(re) !== null) {
//   return (re === undefined || re === null) ? this : re[0];
//   // }
// };
// function toFixed(x) {
//   if (Math.abs(x) < 1.0) {
//     var e = parseInt(x.toString().split('e-')[1]);
//     if (e) {
//       x *= Math.pow(10, e - 1);
//       x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
//     }
//   } else {
//     var e = parseInt(x.toString().split('+')[1]);
//     if (e > 20) {
//       e -= 20;
//       x /= Math.pow(10, e);
//       x += (new Array(e + 1)).join('0');
//     }
//   }
//   return x;
// }

// 
export default function App(props: AppProps) {
  const {
    Component,
    pageProps,
  }: { Component: NextApplicationPage; pageProps: any } = props

  return <ThemeProvider attribute="class" enableSystem={false}>
    <GlobalProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {/* <AuthProvider> */}
        {/* if requireAuth property is present - protect the page */}
        {Component.auth ? (
            <SessionProvider
              // Provider options are not required but can be useful in situations where
              // you have a short session maxAge time. Shown here with default values.
              session={pageProps.session}
              // basePath="https://example.com/custom-route/api/auth"
            // children={Component}
            >
            <Auth>
              <Component {...pageProps} />
            </Auth>

            </SessionProvider>
        ) : (
          // public page
          <SessionProvider
            // Provider options are not required but can be useful in situations where
            // you have a short session maxAge time. Shown here with default values.
            session={pageProps.session}
          // children={Component}
          >
            <Component {...pageProps} />
          </SessionProvider>
        )}
      {/* </AuthProvider> */}
      {/* <Component {...pageProps} /> */}
    </GlobalProvider>
  </ThemeProvider>

}
function Auth({ children} : any) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true })

  if (status === "loading") {
    return <Image className="loader-center" src="/assets/loaders/loader-fast.svg" alt="Loading..." width={100} height={100} />
  }

  return children
}
