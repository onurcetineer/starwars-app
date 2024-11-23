import axios from 'axios';

const baseURL= 'https://swapi.dev/api/';

export const fetchAllStarships = async () => {
    let allStarships = [];
    let page = 1;
    let hasMorePages = true;

    try {
        while (hasMorePages) {
            const response = await axios.get(`${baseURL}starships/?page=${page}`);
            allStarships = [...allStarships, ...response.data.results];
            page += 1;
            hasMorePages = response.data.next !== null; // Devam eden sayfa varsa true olur
        }
        return allStarships;
    } catch (error) {
        console.error("Error fetching all starships:", error);
        return null;
    }
};

export const fetchStarshipDetails = async (id) => {
    try {
        const response = await axios.get(`${baseURL}starships/${id}/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching starship details:", error);
        return null;
    }
};
