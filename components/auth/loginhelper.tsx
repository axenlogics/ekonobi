// import { useAuth } from "components/AuthProvider"
// import { UserStatus } from "components/UserStatus"
import { useRouter } from "next/router"
import React, { useEffect, useRef, useState } from "react"
import { useAuth } from "./authprovider"
import { UserStatus } from "./userstatus"

const defaultEmail = "admin@example.com"
const defaultPassword = "admin123"

export interface Props {
    ref:any
}
export default function SignIn(Proos: Props)  {
    const { auth, initializing, getRedirect, clearRedirect, user, error } =
        useAuth()
    const [email, setEmail] = useState<string>(defaultEmail)
    const [pswd, setPswd] = useState<string>(defaultPassword)
    const [signInInProgress, setInProgress] = useState(false)
    const mounted = useRef<boolean>()
    const router = useRouter()

    /* Guard if page is navigated away while sign in process is still active */
    useEffect(() => {
        mounted.current = true

        return () => {
            mounted.current = false
        }
    }, [])

    useEffect(() => {
        if (!initializing) {
            if (user) {
                const redirect = getRedirect()
                if (redirect) {
                    router.push(redirect) // go to page which redirected to login
                    clearRedirect()
                } else {
                    router.push("/protected") // go to default protected page
                }
            }
        }
    }, [router, getRedirect, clearRedirect, initializing, user])

    const handleSubmit = async (email: string, pswd: string) => {
        // e.preventDefault()
        if (email && pswd) {
            try {
                setInProgress(true)
                await auth.signIn(email, pswd)
            } catch (error) {
                if (mounted.current) {
                    setInProgress(false)
                }
            }
        } else {
            
        }
    }

    const handleEmail = function (e: React.FormEvent<HTMLInputElement>) {
        setEmail(e.currentTarget.value)
    }
    const handlePswd = function (e: React.FormEvent<HTMLInputElement>) {
        setPswd(e.currentTarget.value)
    }

    if (initializing) {
        return <h1>Application Loading </h1>
    }
    if (signInInProgress) {
        return <h1>Signing in progress</h1>
    }

    return (
        <>
            
        </>
    )
}
