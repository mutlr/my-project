export interface LoginValues {
    username: string,
    password: string
}

export interface RegisterFormValues extends LoginValues {
    email: string,
}

export interface UserValues {
    token: string,
    username: string,
    id: number,
    accessToken: string,
    refreshToken: string,
}
export interface SongForm {
    song: Song,
    artist: Artist,
    title: string,
    description: string,
}
export interface SongEntry {
    song: Song,
    artist: Artist,
}
export interface SongListing {
    artist: Artist,
    song: Song,
    image: string,
}
export interface CommentEntry extends SongForm {
    postId: number
}

export interface User {
    id: number,
    username: string,
}

export interface Artist {
    artistId: string,
    artistName: string,
}
export interface Song {
    songId: string,
    songName: string,
}
export interface BasePost {
    title: string,
    artist: Artist,
    song: Song,
    user: User,
    description: string,
    createdAt: string,
}
export interface Post extends BasePost{
    postId: number,
}

export interface Comment extends BasePost {
    commentId: number,
}
export type Colors = 'primary' | 'secondary' | 'red' | 'light';

export type ButtonTypes = 'submit' | 'reset' | 'button';

export interface EditValues {
    title: string,
    description: string,
}

export interface UserInfo {
    player: {
        preview_url: string,
        name: string,
        artist: string,
    } | null,
    username: string,
    userInfo: {
        display_name: string,
        uri: string,
        country: string,
    } | null,
}
