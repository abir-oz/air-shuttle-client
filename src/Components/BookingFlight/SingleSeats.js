import React from 'react';

const SingleSeats = ({ seatName, seatId, isBooked, handleSelect }) => {
    let btnColor;
    if (isBooked) {
        btnColor = 'danger';
    } else {
        btnColor = 'success';
    }

    return (
        <button onClick={(e) => handleSelect(e, seatName, seatId, isBooked)} className={` btn btn-${btnColor} py-2 px-3 m-2`}>
            {
                seatName
            }
        </button >
    );
};

export default SingleSeats;