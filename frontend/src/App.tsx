import './App.css';
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route, useMatch } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import Message from './components/Message/Message';
import View from './components/Frontpage/View';
import { UserValues } from './types';
import { getPosts } from './services/postService';
import Commentform from './components/PostingForms/Commentform';
import PostPage from './components/PostPage/PostPage';
export interface Post {
    user: string,
    song: string,
    artist: string,
    title: string,
    songId: string,
    id: number,
}

function App () {
    const [user, setUser] = useState<UserValues | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);

    const handleUser = (values: UserValues) => {
        localStorage.setItem('loggedUser', JSON.stringify(values));
        setUser(values);
    };

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedUser');
        if (loggedUser) {
          const user = JSON.parse(loggedUser);
          setUser(user);
        }
      }, []);

      useEffect(() => {
        getPosts().then(result => setPosts(result.map((s: any) => {
            return {
                user: s.user.username,
                song: s.song.songName,
                artist: s.song.artist.artistName,
                title: s.title,
                songId: s.songId,
                id: s.id
            };
        }))).catch(error => console.log('Error in getting posts: ', error));
      }, []);

    const logout = () => {
        localStorage.removeItem('loggedUser');
        setUser(null);
    };

    const postMatch = useMatch('/post/:id');
    const postMatchResult: Post | undefined | null = postMatch === null ? null : posts.find((p: Post) => p.id === Number(postMatch.params.id));

    return (
        <div className="App">
            <Message message={null} type={null} />
            <Navbar user={user} logout={logout}/>

            <Routes>
                <Route path='/' element={<View posts={posts}/>}/>
                <Route path='login' element={<Login handleUser={handleUser}/>}/>
                <Route path='register' element={<Register handleUser={handleUser}/>}/>
                <Route path="/post/:id" element={<PostPage post={postMatchResult}/>} />
            </Routes>
        </div>
    );
}

export default App;
