import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route, useMatch } from 'react-router-dom';
import { Post, PostFromBackend } from './types';
import { getPosts } from './services/postService';
import { postMap } from './utils/utils';
import Profile from './components/Profile/Profile';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import Register from './components/Login/Register';
import Message from './components/Message/Message';
import View from './components/Frontpage/View';
import PostPage from './components/PostPage/PostPage';
import MyProfile from './components/Profile/MyProfile';
import Footer from './components/Footer/Footer';

function App () {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        getPosts()
        .then((result: PostFromBackend[]) => setPosts(result.map((p: PostFromBackend) => postMap(p))))
        .catch(error => console.log(error));
    }, []);

    const addToList = (post: Post) => {
        setPosts(posts.concat(post));
    };
    const handlePostRemove = (id: number) => {
        setPosts(posts.filter(p => p.id !== id));
    };

    const handlePostEdit = (editPost: Post) => {
        setPosts(posts.map(p => p.id === editPost.id ? editPost : p));
    };

    const postMatch = useMatch('/post/:id');
    const postMatchResult: Post | undefined | null = postMatch === null ?
    null : posts.find((p: Post) => p.id === Number(postMatch.params.id));

    return (
        <div className="App">
            <Message />
            <Navbar />
            <main className='main'>
                <Routes>
                    <Route path='/' element={<View posts={posts} addToList={addToList}/>}/>
                    <Route path='/login' element={<Login />}/>
                    <Route path='/register' element={<Register />}/>
                    <Route path="post/:id" element={<PostPage post={postMatchResult ? postMatchResult : null} />}/>
                    <Route path='/myprofile' element={<MyProfile handlePostRemove={handlePostRemove} handlePostEdit={handlePostEdit}/>} />
                    <Route path='profile/:id' element={<Profile />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
