import React, { createContext, useState, type ReactNode } from 'react'
import { createUser, getUsers, type User } from '../services/api'


type AuthContextType = {
    user: User | null
    signUp: (username: string, email: string, password: string) => Promise<boolean>
    signIn: (email: string, password: string) => Promise<boolean>
    signOut: () => void
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    signUp: async () => {},
    signIn: async () => {},
    signOut: () => {}
})

const AuthProviders = ({ children }: {children: ReactNode}) => {

    const [user, setUser] = useState<User | null>(() => {
        const stored = localStorage.getItem('user');
        return stored ?  JSON.parse(stored) : null
    })


    //  SIGN UP

    async function signUp (username: string, email: string, password: string) {

        const users = await getUsers();

        const exists = users.some(u => u.email == email)

        if (exists) {
            
            return false

        }

        const newUser = await createUser({username, email, password})
        alert('signUp successful!.')
        localStorage.setItem('user', JSON.stringify(newUser))
        
        return true


    }

    async function signIn (email: string, password: string) {

        const users = await getUsers()

        const foundUser = users.find(u => u.email == email && u.password == password)

        if (foundUser) {
            setUser(foundUser)
            localStorage.setItem('user', JSON.stringify(foundUser))
            return true
        }

        return false

    }


    function signOut() {
        setUser(null)
        localStorage.removeItem('user')
    }
    



  return (
    <AuthContext.Provider value={{user, signUp, signIn, signOut}}>{children}</AuthContext.Provider>
  )
}

export default AuthProviders