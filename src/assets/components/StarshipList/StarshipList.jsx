import React, { useState, useEffect } from 'react';
import { fetchAllStarships } from '../../../services/starship-service/index';
import './style.css';
import shipImage from '../../../../public/star-destroyer.png';
import logo from '../../../../public/starwars-logo.jpg';

const StarshipList = ({ setSelectedStarship }) => {
    const [starships, setStarships] = useState([]);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [hasMore, setHasMore] = useState(true); // Check if there are more starships to load

    useEffect(() => {
        const loadAllStarships = async () => {
            const data = await fetchAllStarships();
            if (data) {
                setStarships(data);
            }
        };
        loadAllStarships();
    }, []);
    

    const handleLoadMore = () => setPage(prev => prev + 1);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setPage(1); // Clea
        setHasMore(true); // Activate "Daha Fazla" button when a new search is performed
    };

    const filteredStarships = starships.filter(ship =>
        ship.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ship.model.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const displayedStarships = filteredStarships.slice(0, 8 * page);

    return (
        <div className='container'>
            <img id='logo' src={logo} alt="Star Wars" />
            <input
                type="text"
                placeholder="Ara..."
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <ul>
                {displayedStarships.map((ship, index) => (
                    <li className='item' key={`${ship.name}-${index}`}>
                        <h3>{ship.name}</h3>
                        <img src={shipImage} alt={ship.name} />
                        <p> <span>Model:</span> <br /> {ship.model}</p>
                        <p> <span>Hız: </span> <br />{ship.max_atmosphering_speed}</p>
                        <button className='details-btn' onClick={() => setSelectedStarship(ship.url)}>Detaylar</button>
                    </li>
                ))}
            </ul>
            {hasMore && filteredStarships.length > displayedStarships.length && (
                <button onClick={handleLoadMore}>Daha Fazla</button>
            )}
        </div>
    );
};

export default StarshipList;
