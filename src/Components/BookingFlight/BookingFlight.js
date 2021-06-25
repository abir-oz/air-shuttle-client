import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import SingleSeats from './SingleSeats';

const BookingFlight = () => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    const [packageDetails, setPackageDetails] = useState({});
    const [clientData, setClientData] = useState(null);
    const [seats, setSeats] = useState([]);



    const { id } = useParams();


    useEffect(() => {

        fetch(`https://sleepy-mountain-41781.herokuapp.com/book/${id}`)
            .then(res => res.json())
            .then(data => setPackageDetails(data?.[0]))

        fetch('https://sleepy-mountain-41781.herokuapp.com/seats')
            .then(res => res.json())
            .then(data => {
                setSeats(data);
            })
    }, [id])

    console.log(seats);

    const { price } = packageDetails;
    const { ticket } = packageDetails;
    const { name } = packageDetails;
    const currentSeats = [];



    const { register, handleSubmit } = useForm();

    const onSubmit = data => {

        setClientData(data);
    };






    const handleSelect = (e, seatName, sId, bookingStatus) => {

        if (bookingStatus) { e.preventDefault() }
        else if (currentSeats.length < 5) {

            bookingStatus = true;

            fetch(`https://sleepy-mountain-41781.herokuapp.com/updateStatus/${sId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isBooked: bookingStatus })
            }).then(response => response.json())
                .then(data => console.log(data))


            currentSeats.push({ seatName, id: sId, isBooked: bookingStatus });
            console.log(currentSeats);
        }
        else {
            console.log('You have already selected 5 seats!')
        }





    }
    const handlePaymentSuccess = paymentId => {
        const orderDetails = {
            name: clientData.name,
            email: clientData.email,
            package: clientData.package,
            price,
            packageID: id,
            selectedSeats: currentSeats,
            paymentId,
            orderTime: new Date()
        };


        console.log(orderDetails);

        fetch('https://sleepy-mountain-41781.herokuapp.com/addOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    // alert('your order placed successfully');
                }
            })
    }

    return (

        <>

            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div style={{ display: clientData ? 'none' : 'block' }} className="col-md-8 bg-white rounded-3 shadow-sm  mx-auto mt-5 mb-5 p-3">
                        <form className="form m-5" onSubmit={handleSubmit(onSubmit)}>

                            <input className="form-control mb-3" type="text"
                                defaultValue={user.name}
                                {
                                ...register("name")
                                }
                            />
                            <input className="form-control mb-3" type="email" defaultValue={user.email}
                                {
                                ...register("email")
                                }
                            />

                            {
                                name && ticket &&
                                <input className="form-control mb-3" type="text" defaultValue={name + ` (${ticket} )`}
                                    {
                                    ...register("package")
                                    }
                                />}




                            <p className="mt-3">You will be Charged &#2547;{price} for the selected package. </p>
                            <input className="mb-3 form-control btn btn-danger"
                                value="Proceed"
                                type="submit" />
                        </form>
                        <div>


                            <h5>Select Seats: (You Can select 5 Seats) </h5>
                            {
                                seats.map((seat, index) =>


                                    <SingleSeats
                                        handleSelect={handleSelect}
                                        key={seat._id}
                                        seatId={seat._id}
                                        isBooked={seat.isBooked}
                                        seatName={index + 1}

                                    />


                                )
                            }
                        </div>

                    </div>

                    <div style={{ display: clientData ? 'block' : 'none' }} className="col-md-6  bg-white rounded-3 shadow-sm  mx-auto mt-5">
                        < ProcessPayment
                            handlePayment={handlePaymentSuccess}
                        />
                    </div>
                </div >
            </div >
        </>
    );
};

export default BookingFlight;