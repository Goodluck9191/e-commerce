import React, { createContext, useEffect, useState } from "react";

export interface User {
    name: string;
    age: number;
    isMarried: boolean
}

interface UserContextType {
    users: User[] | null;
    addUser: (user: User) => void;
    updateUser: (id:string) => void
    deleteUser: (id: string) => void
}

const contextInitials = {
    users: null,
    addUser: () => null,
    updateUser: () => null,
    deleteUser: () => null
}

export const userContext = createContext<UserContextType>(contextInitials)

interface Props {
    children: React.ReactNode;
}

export const UserProvider = (props: Props) => {

    const [users, setUsers] = useState<User[] | null>(null)


    useEffect(()=> {
        setUsers([{ name:'goodluck', age: 12, isMarried:false}])
    },[])

    const addUser = (user: User) => null
    const updateUser = (id: string) =>null
    const deleteUser = (id: string) => null


    return <userContext.Provider value={{users, addUser, updateUser, deleteUser}}>
        {props.children}
    </userContext.Provider>
}