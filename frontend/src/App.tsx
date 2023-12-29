import './App.css';
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import Message from './components/Message/Message';
import View from './components/PostLayout/View';
import Postform from './components/Postform/Postform';
import Togglable from './components/Togglable/Togglable';
import { UserValues } from './types';
import { getPosts } from './services/postService';
export interface Post {
    user: string,
    song: string,
    artist: string,
    title: string,
}
function App () {
    const [user, setUser] = useState<UserValues | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const handleUser = (values: UserValues) => {
        console.log('Values on app: ', values);
        localStorage.setItem('loggedUser', JSON.stringify(values));
        setUser(values);
        console.log('User: ', user);
    };
    useEffect(() => {
        const loggedUser = window.localStorage.getItem('loggedUser');
        if (loggedUser) {
          const user = JSON.parse(loggedUser);
          setUser(user);
        }
      }, []);
      useEffect(() => {
        getPosts()
        .then(result => setPosts(result.map((s: any) => {
            return {
                user: s.user.username,
                song: s.song.songName,
                artist: s.song.artist.artistName,
                title: s.title
            };
        })
        )).catch(error => console.log('Error in getting posts: ', error));
      }, []);
    const logout = () => {
        localStorage.removeItem('loggedUser');
        setUser(null);
    };
    return (
        <div className="App">
            <Message message={null} type={null} />
            <Navbar user={user} logout={logout}/>
            <Togglable buttonText='Add a post'>
                <Postform />
            </Togglable >
            <Routes>
                <Route path='/' element={<View posts={posts}/>}/>
                <Route path='login' element={<Login handleUser={handleUser}/>}/>
                <Route path='register' element={<Register handleUser={handleUser}/>}/>
                <Route path='form' element={<Postform />} />
            </Routes>
        </div>
    );
}

export default App;
