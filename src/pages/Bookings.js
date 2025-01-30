import '../styles/Home.css';
import '../styles/Bookings.css';
import React, { useEffect, useState } from 'react';

const Bookings = () => {
    const [carsArray, setCarsArray] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4004/api/allbooks', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                if (response.ok) {
                    const booksData = await response.json();
                    setCarsArray(booksData);
                } else {
                    console.error('Failed to fetch data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <> 
            <div className="fullpage4">
                <nav className="navbar">
                    <div className="navbar-container">
                        <a href="/" className="brand-title">Car-Hub</a>
                        <div className="navbar-links">
                            <ul>
                                <li><a href="/Home">Home</a></li>
                                <li><a href="/Addcar">Add Car</a></li>
                                <li><a href="/Bookcar">Book Car</a></li>
                                <li><a href="/bookings">My Booking</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
                
                <div className="allcars">
                    {carsArray.length === 0 ? (
                        <p>No bookings found.</p>
                    ) : (
                        carsArray.map((car) => (
                            <div className="card" key={car._id}>
                                <img src={car.Carimg} alt="Car" className="car-image" />
                                <div className="card-details">
                                    <p className="car-name"><strong>{car.Name}</strong></p>
                                    <p className="car-info">Date: {car.Date}</p>
                                    <p className="car-info">Check-in Time: {car.CheckinTime}</p>
                                    <p className="car-info">Hours Required: {car.Hours}</p>
                                    <p className="car-info">Registration No: {car.Regno}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default Bookings;
