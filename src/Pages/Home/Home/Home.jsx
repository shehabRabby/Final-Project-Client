import React from 'react';
import Banner from '../Banner/Banner';
import HowWorks from '../HowWorks/HowWorks';
import OuerServices from '../OurServices/OuerServices';
import Shipping from '../Shipping/Shipping';
import StaisfictionCard from '../CustomerStaisfiction/StaisfictionCard';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <HowWorks></HowWorks>
           <OuerServices></OuerServices>
           <Shipping></Shipping>
           <StaisfictionCard></StaisfictionCard>
        </div>
    );
};

export default Home;