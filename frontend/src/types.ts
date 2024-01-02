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
    song: Song,
    artist: Artist,
    title?: string,
}
export interface SongListing {
    artist: Artist,
    song: Song,
    image: string,
}
export interface CommentEntry extends SongEntry {
    postId: number
}

export interface User {
    id?: number,
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
export interface Post {
    postId: number,
    title: string,
    artist: Artist,
    song: Song,
    user: User,
}

export interface Comment {
    user: User,
    song: Song,
    artist: Artist,
    commentId: number,
    text: string,
}
export type Colors = 'primary' | 'secondary' | 'red' | 'light';

export type ButtonTypes = 'submit' | 'reset' | 'button';
