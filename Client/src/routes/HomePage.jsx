import React from 'react';
import Image from '../Image';
import Articles from '../Articles';
import Tutorials from '../Tutorials';
import Signup from '../Signup';
import './HomePage.css'; 

const HomePage = ({ theme }) => {
    return (
        <div className={`homepage-container ${theme}`}>
            <Image />
            <Articles />
            <Tutorials />
            <Signup />
        </div>
    );
};

export default HomePage;
