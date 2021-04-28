import React from 'react';
import Footer from '../../shared/Footer/Footer';
import BusinessInfo from '../BusinessInfo/BusinessInfo';
import Header from '../Header/Header';
import Pricing from '../Pricing/Pricing';
import Testimonial from '../Testimonial/Testimonial';
import Trainer from '../Trainer/Trainer';


const Home = () => {
    return (
        <div>
            <Header/>
            <BusinessInfo/>
            <Trainer/>
            <Testimonial/>
            <Pricing/>
            <Footer/>
        </div>
    );
};

export default Home;