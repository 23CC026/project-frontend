import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
    const [carsArray, setCarsArray] = useState([]);
    const [bookedCars, setBookedCars] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4004/api/allcars', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const carsData = await response.json();
                    setCarsArray(carsData);

                    // Retrieve booked cars from local storage (optional)
                    const storedBookings = JSON.parse(localStorage.getItem('bookedCars')) || {};
                    setBookedCars(storedBookings);
                } else {
                    console.error('Failed to fetch data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleBook = (car) => {
        setBookedCars((prev) => {
            const updatedBookings = { ...prev, [car._id]: true };
            localStorage.setItem('bookedCars', JSON.stringify(updatedBookings)); // Store in local storage
            return updatedBookings;
        });

        navigate('/Bookcar', { state: { car } });
    };

    return (
        <> 
            <div className='fullpage1'>
                <nav className="navbar">
                    <div className="navbar-container">
                        <Link to="/" className="brand-title">Car-Hub</Link>
                        <div className="navbar-links">
                            <ul>
                                <li><Link to="/Home">Home</Link></li>
                                <li><Link to="/Addcar">Add Car</Link></li>
                                <li><Link to="/Bookcar">Book Car</Link></li>
                                <li><Link to="/bookings">My Booking</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div className='allcars'>
                    {carsArray.length > 0 ? (
                        carsArray.map((car) => (
                            <div className="card" key={car._id}>
                                <img src={car.Carimg} alt={car.Name} className="car-image" />

                                <div className="card-details">
                                    <p className="car-name">{car.Name}</p>
                                    <p className="car-info">Year: {car.Year}</p>
                                    <p className="car-info">Color: {car.Color}</p>
                                    <p className="car-info">Rate: {car.Rate}</p>
                                    <p className="car-info">Registration No: {car.Regno}</p>
                                    
                                    {/* Conditionally render "Book" or "Booked" */}
                                    {bookedCars[car._id] ? (
                                        <button className="booked-button" disabled>Booked</button>
                                    ) : (
                                        <button className="book-button" onClick={() => handleBook(car)}>Book</button>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-cars-message">No cars available at the moment.</p>
                    )}
                </div>
            </div>
        </> 
    );
};

export default Home;

