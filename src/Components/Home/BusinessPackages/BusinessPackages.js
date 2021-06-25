import React, { useEffect, useState } from 'react';
import SingleBusiness from './SingleBusiness';

const BusinessPackages = () => {
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        fetch("https://sleepy-mountain-41781.herokuapp.com/business")
            .then(res => res.json())
            .then(data => setPackages(data))
    }, [])
    return (
        <>
            <div className="site-section" id="packages">
                <div className="container">
                    <div className="row d-flex align-items-center justify-content-center">
                        <h3>Business Packages</h3>


                        {
                            packages.map(service =>
                                <SingleBusiness
                                    key={service._id}
                                    id={service._id}
                                    name={service.name} image={service.image} price={service.price} />
                            )
                        }

                    </div>
                </div>
            </div>
        </>
    );
};

export default BusinessPackages;