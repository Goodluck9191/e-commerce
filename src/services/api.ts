const BASE_URL = "http://localhost:3000";

export type User = {
    id?: number
    username: string
    email: string
    password: string
};

//GET USER  

export const getUsers = async (): Promise<User[]> => {
    const res = await fetch(`${BASE_URL}/users`);
    return res.json()

}

//POST USER

export const createUser = async (user: User): Promise<User> => {
    const res = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: {
            "content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })

    return res.json()

}