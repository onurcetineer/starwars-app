import React, { useState, useRef, useEffect } from 'react';
import StarshipList from './assets/components/StarshipList';
import StarshipDetail from './assets/components/StarshipDetail';
import './App.css';
import soundTrack from '../public/starwars-soundtrack.mp3';

const App = () => {
    const [selectedStarship, setSelectedStarship] = useState(null);
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const audioRef = useRef(null);

    const handleBack = () => setSelectedStarship(null);

    const toggleAudio = () => {
        if (audioRef.current) {
            if (isAudioPlaying) {
                audioRef.current.pause(); // Pause the audio
            } else {
                audioRef.current.volume = 0.3; 
                audioRef.current.play(); // Start playing the audio
            }
            setIsAudioPlaying(!isAudioPlaying); // Toggle the state
        }
    };

    useEffect(() => {
        // Optional: Handle audio stopping when the component unmounts
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0; // Reset audio
            }
        };
    }, []);

    return (
        <div className='container'>
            <audio ref={audioRef} loop>
                <source src={soundTrack} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <button id='soundtrack-button' onClick={toggleAudio}>
                {isAudioPlaying ? 'Pause Soundtrack' : 'Play Soundtrack'}
            </button>
            {selectedStarship ? (
                <StarshipDetail starshipUrl={selectedStarship} onBack={handleBack} />
            ) : (
                <StarshipList setSelectedStarship={setSelectedStarship} />
            )}
        </div>
    );
};

export default App;