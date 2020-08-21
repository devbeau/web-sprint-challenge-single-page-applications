import React from 'react';
import Card from './Card'

let dummyData=[
    {
        picture: './assets/mcdougals.jpg',
        name: "MacDougal's",
        price: 1,
        keywords: ["American", "Fast Food", "Burgers"],
        time: "20-30 min",
        fee: "5.99",
    },
    {
        picture: './assets/sweatpeas.png',
        name: "Sweet Peas",
        price: 1,
        keywords: ["Healthy", "Salads"],
        time: "30-45 min",
        fee: "4.99",
    },
    {
        picture: './assets/baltys.jpg',
        name: "Balty's",
        price: 1,
        keywords: ["American", "BBQ"],
        time: "10-20 min",
        fee: "3.99",
    },
]

function Cards(props){
    
    return (
        <div className='cards-container'>
            {dummyData && dummyData.map((item, ind) => <Card key={`${item}-${ind}`} data={item}/>)}
        </div>
    )
}

export default Cards;