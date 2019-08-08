import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import styles from './Burger.module.css';

const Burger = props => {
    let ingredientsArray = Object.keys(props.ingredients)
        .map(igKey => {
            const igCount = parseInt(props.ingredients[igKey]);
            return [...Array(igCount)].map((_, i) => <BurgerIngredient key={igKey + i} type={igKey} />);
        })
        .reduce((resultArray, igArray) => [...resultArray, ...igArray], []);

    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top" />
            {ingredientsArray.length > 0 ? ingredientsArray : <p>NO INGREDIENTS ADDED</p>}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default Burger;
