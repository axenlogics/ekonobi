import { useSession } from "next-auth/react"

export default function Component({ children }: { children: JSX.Element }) {
    const { data: session, status } = useSession()

    if (status === "authenticated") {
        return <>{children}</>
        // return <p>Signed in as { session?.user?.email } </p>
    }

    return 
}