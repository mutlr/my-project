export interface LoginValues {
    username: string,
    password: string
}

export interface RegisterFormValues extends LoginValues {
    email: string,
    name: string,
}

export interface UserValues {
    token: string,
    username: string,
    id: number,
}