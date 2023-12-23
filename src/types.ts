export interface LoginFormValues {
    username: string,
    password: string
}

export interface RegisterFormValues extends LoginFormValues {
    email: string
}