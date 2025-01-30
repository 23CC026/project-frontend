import '../styles/Home.css'
import '../styles/Bookcar.css'
const Bookcar = () => {
    const bookbtnclick=async()=>{
        const Regno = document.getElementById('regno').value;
const Hours = document.getElementById('hours').value;
const Date = document.getElementById('date').value;
const CheckinTime = document.getElementById('checkin-time').value;
const Aadhar = document.getElementById('aadhar').value;
console.log(Regno, Hours);
try {
    const response = await fetch('https://project-backend-1-2lg7.onrender.com/api/createbook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Regno,Hours,Date,CheckinTime,Aadhar}),
    });

    if (response.ok) {
        const message = await response.text();
        if (message === 'Car Booked Successfully') {
                alert('Car Booked Successfully. Click OK to continue.');
        } else {
            console.log(message);
        }
    } else {
        const errorMessage = await response.text();
        if (errorMessage === 'Car Not Exists') {
            // User with the same email already exists
            alert('Car Not Exists');
        } else {
            // Other error
            console.error('Error:', errorMessage);
            alert('Some problem occurred. Please try again later.');
        }
    }
} catch (error) {
    // Handle network errors
    alert('Error:', error);
    alert('Error occurred while processing your request. Please try again later.');
}
    }
    return (
        <> 
        <div className='fullpage3'>
       <nav class="navbar">
        <div class="navbar-container">
            <a href="www.google.com" class="brand-title">Car-Hub</a>
            <input type="checkbox" id="toggle-button" class="toggle-button" />
            <label for="toggle-button" class="toggle-label">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </label>
            <div class="navbar-links">
                <ul>
                    <li><a href="/Home">Home</a></li>
                    <li><a href="/Addcar">Add Car</a></li>
                    <li><a href="/Bookcar">Book Car</a></li>
                    <li><a href="/bookings">My Booking</a></li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="car-booking-container">
    <h1 class="car-booking-title">Book a Car</h1>
    <form action="/submit-car-booking" method="post" class="car-booking-form">
        <div class="car-booking-group">
            <label for="regno" class="car-booking-label">Car Registration Number:</label>
            <input type="text" id="regno" name="Regno" required class="car-booking-input" />
        </div>
        <div class="car-booking-group">
            <label for="hours" class="car-booking-label">Number of Hours:</label>
            <input type="number" id="hours" name="Hours" required min="1" class="car-booking-input" />
        </div>
        <div class="car-booking-group">
            <label for="date" class="car-booking-label">Date:</label>
            <input type="date" id="date" name="Date" required class="car-booking-input" />
        </div>
        <div class="car-booking-group">
            <label for="checkin-time" class="car-booking-label">Check-in Time:</label>
            <input type="time" id="checkin-time" name="CheckinTime" required class="car-booking-input" />
        </div>
        <div class="car-booking-group">
            <label for="aadhar" class="car-booking-label">Aadhar Card Number:</label>
            <input type="text" id="aadhar" name="Aadhar" required class="car-booking-input" />
        </div>
        <div class="car-booking-group">
            <button type="button" onClick={bookbtnclick} class="car-booking-button">Book</button>
        </div>
    </form>
</div></div>
    </> 
    );
};



export default Bookcar;
