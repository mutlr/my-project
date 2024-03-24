import './App.css';
import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, useMatch, useLocation } from 'react-router-dom';
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
import Postform from './components/PostingForms/Postform';
import Togglable from './components/Togglable/Togglable';
import useVisibility from './hooks/useVisibility';
import Test from './test';
import userContext from './context/userContext';
import MyProfile from './components/Profile/MyProfile';
import Navbarr from './components/Navbar/Navbar';

function App () {
    const user = useContext(userContext);
    const [posts, setPosts] = useState<Post[]>([]);
    const { toggleVisibility, isOpen } = useVisibility();
    const location = useLocation();
    useEffect(() => {
        getPosts()
        .then(posts => setPosts(posts.map((p: any) => postMap(p))));
    }, []);

    const addToList = (post: Post) => {
        setPosts(posts.concat(post));
    };
    const postMatch = useMatch('/post/:id');
    const postMatchResult: Post | undefined | null = postMatch === null ?
    null : posts.find((p: Post) => p.postId === Number(postMatch.params.id));

    return (
        <div className="App">
            <Navbar />
            <Message />
            <Routes>
                <Route path='/' element={<View posts={posts} authenticated={user.authenticated}/>}/>
                <Route path='/login' element={<Login />}/>
                <Route path='/register' element={<Register />}/>
                <Route path="post/:id" element={<PostPage post={postMatchResult} user={user?.user} authenticated={user.authenticated} />}/>
                <Route path='/myprofile' element={<MyProfile id={user?.user?.id} authenticated={user?.authenticated}/>} />
                <Route path='profile/:id' element={<Profile />} />
                <Route path='/test' element={<Test />}/>
            </Routes>
            {user.user && location.pathname === '/' &&
            <Togglable
                buttonText='Add a post'
                toggleVisibility={toggleVisibility}
                isOpen={isOpen}>
                <Postform toggleVisibility={toggleVisibility} addToList={addToList}/>
            </Togglable >}
        </div>
    );
}

export default App;
