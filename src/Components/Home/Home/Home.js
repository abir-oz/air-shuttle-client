import React from 'react';
import BusinessPackages from '../BusinessPackages/BusinessPackages';
import EconomyPackages from '../EconomyPackages/EconomyPackages';
import Footer from '../Footer/Footer';
import './Home.css';
const Home = () => {
    return (
        <>

            <EconomyPackages />
            <BusinessPackages />
            <Footer />

        </>
    );
};

export default Home;