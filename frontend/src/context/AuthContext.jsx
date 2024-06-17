import axios from "axios"
import { createContext, useState } from "react"
import { useNavigate } from "react-router-dom"

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    // const navigate = useNavigate()
    const [auth, setAuth] = useState(false)
    const [authError, setAuthError] = useState("")

    const loginAction = async ({ email, body }) => {
        try {
            const response = await axios.post(`/api/users/${email}`, body)
            setAuth(true)
            localStorage.setItem('jwt', response.data.data.token)
            console.log(response.data)
        } catch (error) {
            if (error.response) {
                setAuthError(`server responded with error:: ${error.response.data.error}`)
                // console.log("server responded with error")
            }
            else if (error.request) {
                setAuthError('server left you on read')
                // console.log("Server did not respond")
            }
        }


    }
    const registerAction = async (payload) => {
        try {
            const response = await axios.post('/api/users', payload)
            // navigate('/login')
        } catch (error) {
            if (error.response) {
                setAuthError(`server responded with error:: ${error.response.data.error}`)
                // console.log("server responded with error")
            }
            else if (error.request) {
                setAuthError('server left you on read')
                // console.log("Server did not respond")
            }
        }

    }
    const logoutAction = () => {
        localStorage.removeItem('jwt');
        setAuth(false)
    }

    return (
        <AuthContext.Provider
            value={{
                loginAction,
                registerAction,
                logoutAction,
                authError,
                setAuthError
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

