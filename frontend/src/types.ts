export interface LoginValues {
    username: string,
    password: string
}
export interface RegisterFormValues extends LoginValues {
    email: string,
}
export interface PostFromBackend {
    id: number,
    title: string,
    description: string,
    createdAt: string,
    updatedAt: string,
    userId: number,
    songId: string,
    user: User,
    song: Song,
    postId?: number
}
export interface User {
    id: number,
    username: string,
}
export interface UserValues extends User {
    token: string,
    accessToken: string,
    refreshToken: string,
}
export interface PostBase {
    title: string,
    description?: string,
}
export interface SongForm extends SongEntry {
    title: string,
    description: string,
}
export interface SongEntry {
    song: Song,
    artist: Artist,
}
export interface SongListing extends SongEntry {
    imageUrl: string,
}
export interface CommentForm extends SongForm {
    postId: number
}

export interface Artist {
    artistId: string,
    artistName: string,
}
export interface Song {
    songId: string,
    songName: string,
    imageUrl?: string,
}
export interface Post {
    title: string,
    artist: Artist,
    song: Song,
    user: User,
    description: string,
    createdAt: string,
    id: number,
    postIdInComment?: number,
}
export interface FormValues extends PostBase {
    song: string,
}
export interface PostBase {
    title: string,
    description?: string,
}

interface Player {
    preview_url: string,
    name: string,
    artist: string,
}

interface UserProfileInfo {
    display_name: string,
    uri: string,
    country: string,
}

export interface UserInfo {
    player: Player | null,
    username: string,
    userInfo: UserProfileInfo | null,
}
