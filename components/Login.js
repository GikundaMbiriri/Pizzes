import { useSession, signIn, signOut } from "next-auth/react"

const Login = () => {

    return (
        <>
            Not signed in <br />
            <button >Sign in</button>
        </>
    )
}
export default Login;