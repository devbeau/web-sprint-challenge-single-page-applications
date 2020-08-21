import React from 'react';

function Card(props){
let {picture, name, price, keywords, time, fee} = props.data

    return (
        <div className = 'company-card'>
            <div className = 'image-container'>
                <img src={picture} alt=''/>
                <h3>{name}</h3>
            </div>
            <div className = 'info-container'>
                <p className = 'price'>{price}</p>
                <ul>
                    {keywords && keywords.map(word => <li key={word}>{word}</li>)}
                </ul>
            </div>
            <div className = 'delivery-container'>
                <div className = 'delivery-time'>{time}</div>
                <div className = 'delivery-fee'>{fee}</div>
            </div>
        </div>
    )
}

export default Card;