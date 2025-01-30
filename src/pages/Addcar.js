import '../styles/Home.css';
import '../styles/Addcar.css';
import { ToastContainer, toast } from 'react-toastify';
const Addcar = () => {
    const submitntnclick = async() => {
        const Name = document.getElementById('name').value;
        const Rate = document.getElementById('rate').value;
        const Year = document.getElementById('year').value;
        const Color = document.getElementById('color').value;
        const Regno = document.getElementById('regno').value;
        const Carimg = document.getElementById('carimg').value;
        if (!Name || !Rate || !Year || !Color || !Regno || !Carimg) {
            toast.error('All fields are required');
            return;
        }
    
        if (isNaN(Rate) || isNaN(Year)) {
            toast.error('Rate and year must be numeric values');
            return;
        }
    
        if (Rate <= 0) {
            toast.error('Rate must be a positive value');
            return;
        }
    
        if (Year < 1886 || Year > 2024) {
            toast.error('Year must be between 1886 and 2024');
            return;
        }  
        console.log(Name,Rate)
        try {
            const response = await fetch('http://localhost:4004/api/createcar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Name,Rate,Year,Color,Regno,Carimg}),
            });

            if (response.ok) {
                const message = await response.text();
                if (message === 'Car Added Successfully') {
                    alert('Car Added Successfully.')
                        toast.success('Car Added Successfully. Click OK to continue.');
                } else {
                    console.log(message);
                }
            } else {
                // Handle other response statuses
                const errorMessage = await response.text();
                if (errorMessage === 'Car Already Exists') {
                    // User with the same email already exists
                    alert('Car Already Exists');
                    toast.error('Car Already Exists');
                } else {
                    // Other error
                    console.error('Error:', errorMessage);
                    alert('Some problem occurred. Please try again later.');
                    toast.error('Some problem occurred. Please try again later.');
                }
            }
        } catch (error) {
            // Handle network errors
            console.error('Error:', error);
            alert('Error occurred while processing your request. Please try again later.');
            toast.error('Error occurred while processing your request. Please try again later.');
        }
    };

    return (
        <>
            <div className='fullpage2'>
                <nav className="navbar">
                    <div className="navbar-container">
                        <a href="www.google.com" className="brand-title">Car-Hub</a>
                        <input type="checkbox" id="toggle-button" className="toggle-button" />
                        <label htmlFor="toggle-button" className="toggle-label">
                            <span className="bar"></span>
                            <span className="bar"></span>
                            <span className="bar"></span>
                        </label>
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
                <div className="car-form-container">
                    <h1 className="car-form-title">Enter Car Details</h1>
                    <form className="car-form">
                        <div className="car-form-group">
                            <label htmlFor="name" className="car-form-label">Name:</label>
                            <input type="text" id="name" name="Name" required className="car-form-input"/>
                        </div>
                        <div className="car-form-group">
                            <label htmlFor="year" className="car-form-label">Year:</label>
                            <input type="number" id="year" name="Year" required min="1886" max="2024" className="car-form-input"/>
                        </div>
                        <div className="car-form-group">
                            <label htmlFor="color" className="car-form-label">Color:</label>
                            <input type="text" id="color" name="Color" required className="car-form-input"/>
                        </div>
                        <div className="car-form-group">
                            <label htmlFor="rate" className="car-form-label">Rate:</label>
                            <input type="number" id="rate" name="Rate" required step="0.01" className="car-form-input"/>
                        </div>
                        <div className="car-form-group">
                            <label htmlFor="regno" className="car-form-label">Registration Number:</label>
                            <input type="text" id="regno" name="Regno" required className="car-form-input" />
                        </div>
                        <div className="car-form-group">
                            <label htmlFor="carimg" className="car-form-label">Car Image:</label>
                            <input type="text" id="carimg" name="Carimg" required className="car-form-input" />
                        </div>
                        <div className="car-form-group">
                            <button type="button" onClick={submitntnclick} className="car-form-button">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Addcar;
