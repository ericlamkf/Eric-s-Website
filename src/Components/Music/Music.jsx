import React, { useEffect, useRef } from 'react';
import bgMusic from '../../assets/bg_music.mp3';

const Music = () => {
    const audioRef = useRef(null);

    useEffect(() => {
        const enableAudio = () => {
            if (audioRef.current) {
                audioRef.current.play();
                document.removeEventListener('click', enableAudio);
            }
        };

        document.addEventListener('click', enableAudio);

        return () => {
            document.removeEventListener('click', enableAudio);
        };
    }, []);

    return (
        <audio ref={audioRef} src={bgMusic} loop />
    );
};

export default Music;