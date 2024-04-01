import './App.css';
import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, useMatch } from 'react-router-dom';
import { Post } from './types';
import { getPosts } from './services/postService';
import { postMap } from './utils/utils';
import Profile from './components/Profile/Profile';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import Message from './components/Message/Message';
import View from './components/Frontpage/View';
import PostPage from './components/PostPage/PostPage';
import userContext from './context/userContext';
import MyProfile from './components/Profile/MyProfile';
import Footer from './components/Footer/Footer';

function App () {
    const user = useContext(userContext);
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        getPosts()
        // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        .then(posts => setPosts(posts.map((p: any) => postMap(p))));
    }, []);

    const addToList = (post: Post) => {
        setPosts(posts.concat(post));
    };

    const postMatch = useMatch('/post/:id');
    const postMatchResult: Post | undefined | null = postMatch === null ?
    null : posts.find((p: Post) => p.id === Number(postMatch.params.id));

    return (
        <div className="App">
            <Message />
            <Navbar />
            <Routes>
                <Route path='/' element={<View posts={posts} authenticated={user.authenticated} user={user.user} addToList={addToList}/>}/>
                <Route path='/login' element={<Login />}/>
                <Route path='/register' element={<Register />}/>
                <Route path="post/:id" element={<PostPage post={postMatchResult ? postMatchResult : null} user={user?.user} authenticated={user.authenticated} />}/>
                <Route path='/myprofile' element={<MyProfile id={user?.user?.id} authenticated={user?.authenticated}/>} />
                <Route path='profile/:id' element={<Profile />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
