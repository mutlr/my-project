import './App.css';
import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, useMatch, useLocation } from 'react-router-dom';
import { Post } from './types';
import { getPosts } from './services/postService';
import { MessageContext } from './context/messageContext';
import { postMap } from './utils/utils';
import { initToken } from './services/apiServices';

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

function App () {
    const user = useContext(userContext);
    const [posts, setPosts] = useState<Post[]>([]);
    const { toggleVisibility, isOpen } = useVisibility();
    const message = useContext(MessageContext);
    const location = useLocation();

    useEffect(() => {
        initToken().then(() => {
            getPosts().then(result => {
                    setPosts(result.map((s: any): Post => postMap(s)));
            }).catch(error => {
                message?.error('There was a problem loading posts!');
                console.log('Error in getting posts: ', error);
        });
    }).catch(error => console.log('Error in getting token: ', error));
    }, []);

    const addToList = (post: Post) => {
        /* Concat post to list on add */
    };
    const postMatch = useMatch('/post/:id');
    const postMatchResult: Post | undefined | null = postMatch === null ?
    null : posts.find((p: Post) => p.postId === Number(postMatch.params.id));

    return (
        <div className="App">
            <Navbar />
            <Message />
            <Routes>
                <Route path='/' element={<View posts={posts} />}/>
                <Route path='/login' element={<Login />}/>
                <Route path='/register' element={<Register />}/>
                <Route path="/post/:id" element={<PostPage post={postMatchResult} user={null} />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/test' element={<Test />}/>
            </Routes>
            {user && location.pathname === '/' &&
            <Togglable
                buttonText='Add a post'
                toggleVisibility={toggleVisibility}
                isOpen={isOpen.display}>
                <Postform toggleVisibility={toggleVisibility}/>
            </Togglable >}
        </div>
    );
}

export default App;
