import React, { useState, useEffect } from 'react';

function Photographers() {
    const [photographers, setPhotographers] = useState([]);
    const [selectedPhotographer, setSelectedPhotographer] = useState(null);
    const [eventTypePhotographers, setEventTypePhotographers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPhotographers();
    }, []);

    const fetchPhotographers = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8000/api/photographers');
            console.log(response);
            const data = await response.json();
            setPhotographers(data);
        } catch (error) {
            console.error('Error fetching photographers:', error);
        }
        setLoading(false);
    };

    const fetchPhotographerById = async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8000/api/photographers/${id}`);
            const data = await response.json();
            setSelectedPhotographer(data[0]);
        } catch (error) {
            console.error('Error fetching photographer:', error);
        }
        setLoading(false);
    };

    const fetchPhotographersByEventType = async (eventType) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8000/api/photographers/event/${eventType}`);
            const data = await response.json();
            setEventTypePhotographers(data);
        } catch (error) {
            console.error('Error fetching photographers by event type:', error);
        }
        setLoading(false);
    };

    return (
        <div>
            <h1>Photographers</h1>

            {loading && <p>Loading...</p>}

            <h2>All Photographers</h2>
            <ul>
                {photographers.map((photographer) => (
                    <li key={photographer.id}>
                        {photographer.name} - {photographer.event_type} - {photographer.location}
                        <button onClick={() => fetchPhotographerById(photographer.id)}>View Details</button>
                    </li>
                ))}
            </ul>

            {selectedPhotographer && (
                <div>
                    <h2>Photographer Details</h2>
                    <p>ID: {selectedPhotographer.id}</p>
                    <p>Name: {selectedPhotographer.name}</p>
                    <p>Event Type: {selectedPhotographer.event_type}</p>
                    <p>Location: {selectedPhotographer.location}</p>
                </div>
            )}

            <h2>Photographers by Event Type</h2>
            <input
                type="text"
                placeholder="Enter event type"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        fetchPhotographersByEventType(e.target.value);
                    }
                }}
            />
            <ul>
                {eventTypePhotographers.map((photographer) => (
                    <li key={photographer.id}>
                        {photographer.name} - {photographer.event_type} - {photographer.location}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Photographers;