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

export interface SongEntry {
    artistId: string,
    artistName: string,
    songId: string,
    songName: string,
    title?: string,
}
export interface Song extends SongEntry {
    image?: string,
}