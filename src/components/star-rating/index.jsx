import React, { useState } from 'react';
import './styles.css';
import { FaStar } from 'react-icons/fa';

export default function StarRating({noOfStars = 5}) {

    const [rating, setRating] = useState(0);
    const [hower, setHower] = useState(0);

    function handleClick(getCurrentIndex) {
        console.log(getCurrentIndex);
        setRating(getCurrentIndex);
        }

    function handleMouseMove(getCurrentIndex) {
        console.log(getCurrentIndex);
        setHower(getCurrentIndex);
    }

    function handleMouseLeave(getCurrentIndex){
        console.log(getCurrentIndex);
        setHower(rating); // Reset to the current rating when mouse leaves

    }

    return (
        <div className='star-rating-container'>
            <h2>Rate this Website:</h2>
                           
        <div className="star-rating">
            {
            [...Array(noOfStars)].map((_, index) => {
                index += 1;             

                return <FaStar
                    key={index}
                    className={`star ${index <= (hower || rating) ? 'active' : 'inactive'}`} 

                    onClick={()=> handleClick(index )}
                    onMouseMove={() => handleMouseMove(index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                    size={30}
                />
            })

                
            }
        </div>
        </div>
    )
}