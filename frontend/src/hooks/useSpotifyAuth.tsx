import React, { useState, useEffect } from "react";


const code = new URLSearchParams(window.location.search).get("code");
const useSpotifyAuth = () => {
    const [state, setState] = useState<string | null>(null);
    useEffect(() => {
        console.log('Code in useEffect: ', code);
    }, [code]);

    return {
        state,
    };
};

export default useSpotifyAuth;