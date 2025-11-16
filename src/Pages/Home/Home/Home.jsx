import React from 'react';
import Banner from '../Banner/Banner';
import HowWorks from '../HowWorks/HowWorks';
import OuerServices from '../OurServices/OuerServices';
import Shipping from '../Shipping/Shipping';
import StaisfictionCard from '../CustomerStaisfiction/StaisfictionCard';
import CustomerSays from '../CustomerSays/CustomerSays';
import Question from '../Question/Question';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <HowWorks></HowWorks>
           <OuerServices></OuerServices>
           <Shipping></Shipping>
           <StaisfictionCard></StaisfictionCard>
           <CustomerSays></CustomerSays>
           <Question></Question>
        </div>
    );
};

export default Home;