import React, { useState, useEffect } from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import axios from 'axios';
import FormHeader from './FormHeader';

const sauces = [
    "Original Red", "Garlic Ranch",
    "BBQ Sauce", "Spinach Alfredo"
]

const ingredients = [
    "Pepperoni", "Sausage",
    "Canadian Bacon", "Spicy Italian Sausage",
    "Grilled Chicken", "Onions",
    "Green Pepper", "Diced Tomatos",
    "Black Olives", "Roasted Garlic",
    "Artichoke Hearts", "Three Cheese",
    "Pineapple", "Extra Cheese",
]


const initialFormValues = {
    size: '',
    sauce: '',
    toppings:   ingredients.reduce((ret, item)=> {
                    return ret = {...ret, [item]: false};
                }, {}),
    gluten: false,
    name: '',
    special: '',
}

function Form(props) {

    let {setConfirm} = props;

    let [formValues, setFormValues] = useState(initialFormValues);
    let [order, setOrder] = useState();
    let [error, setError] = useState('initial')
    let [disabled, setDisabled] = useState(true);
    
    function changeInputValue(inputName, inputValue){
        setFormValues({...formValues, [inputName]:inputValue})
    }

    function changeIngredientValue(ingredient, ingredientValue){
        setFormValues({...formValues, toppings:
            {...formValues.toppings, [ingredient]: ingredientValue}})
    }
    function onChange(event){
        let {name, value} = event.target;
        changeInputValue(name, value);
    }

    function onIngredientChange(event){
        let {name, checked} = event.target;
        changeIngredientValue(name, checked);
    }

    function onCheckboxChange(event){
        let {name, checked} = event.target;
        changeInputValue(name, checked)
    }

    function onSubmit(event){
       event.preventDefault();
       console.log(formValues);
       setOrder(formValues);
   }

    useEffect(() => {
        if (order){
            console.log(order)
            axios.post('https://reres.in/api/users', order)
                .then(response => {
                  setConfirm(response.data)
                    console.log(response);
                })
                .catch(error => {
                    setError('There appears to be a network error')
                })
        }
    }, [order, setConfirm])


    useEffect(() => {
        if (formValues.name.length < 3){
            setError('Name must be at least 3 characters');
            setDisabled(true);
        } else {
            setError('')
            setDisabled(false);
        }
         
    }, [formValues])

    return (
     
        <div className='form-container'>
            <FormHeader/>
            <form className='byo-pizza-form' onSubmit={onSubmit}>
                <h2 className='form-heading'>Build Your Own Pizza</h2>
                <Switch>    
                
                    <Route path="/pizza/sauce">
                        <label>Choice of Sauce</label>
                        {sauces.map((item, ind) => {
                        return (
                                <div key={`${item}-${ind}`}>  
                                    <input
                                        type='radio'
                                        id={item.split(' ').join('-').toLowerCase()}
                                        name='sauce'
                                        value={item}
                                        onChange={onChange}
                                    /> 
                                    <label
                                        htmlFor={item.split(' ').join('-').toLowerCase()}
                                    >
                                        {item}
                                    </label>
                        
                                </div>
                        )
                        })}
                        <Link to="/pizza/"><button>Back</button></Link>
                        <Link to="/pizza/toppings"><button>Next</button></Link>
                    </Route>

                    <Route path="/pizza/toppings">
                        <label>Add Toppings</label>
                        <small>Choose up to 10</small>
                        {ingredients.map((item, ind) => {
                            return (
                                <div key={`${item}-${ind}`}>
                                    <input
                                        type='checkbox'
                                        id={item.split(' ').join('-').toLowerCase()}
                                        name={item}
                                        checked={formValues.toppings[item]}
                                        onChange={onIngredientChange}
                                    /> 
                                    <label htmlFor="original">{item}</label>
                                </div>
                            )
                        })}
                        
                        <label htmlFor='gluten'>Choice of Substitute</label>
                        <small>Choose up to 1</small>
                        <div className='gluten-container'>
                            <label className="switch">
                                <input
                                    type='checkbox'
                                    id='gluten'
                                    name='gluten'
                                    checked={formValues.gluten}
                                    onChange={onCheckboxChange}
                                />
                                <span className='slider'></span>
                            </label>
                            <span>Gluten Free Crust for (+$1.00)</span>
                        </div>
                        <Link to="/pizza/sauce"><button>Back</button></Link>
                        <Link to="/pizza/submit"><button>Next</button></Link>
                    </Route>

                    <Route path="/pizza/submit">
                        <label htmlFor='name'>Name</label>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            value={formValues.name}
                            placeholder='Enter your Name'
                            onChange={onChange}
                        />
                        <label htmlFor='special'>Special Instructions!</label>
                        <input
                            type='text'
                            id='special'
                            name='special'
                            value={formValues.special}
                            placeholder='Any instructions for your order?'
                            onChange={onChange}
                        />

                        <div className="button-container">
                            <button className="submit-button" disabled={disabled}>
                                Add to Order
                            </button>
                            {error && <p style={{color: 'red'}}>{error}</p>}
                        </div>
                        <Link to="/pizza/toppings"><button>Back</button></Link>
                    </Route>

                    <Route path="/pizza/">
                            <div className='size-container'>
                                <label htmlFor='size'>Choice of Size</label>
                                <small>Required</small>
                                <select
                                id='size'
                                name='size'
                                value={formValues.size}
                                onChange={onChange}
                                >
                                    <option value="small">Small</option>
                                    <option value="medium">Medium</option>
                                    <option value="large">Large</option>
                                    <option value="extra-large">Extra Large</option>
                                </select>
                                <Link to="/pizza/sauce"><button>Next</button></Link>
                            </div>
                    </Route>
                </Switch>
            </form>
        </div>
    )
}

export default Form;