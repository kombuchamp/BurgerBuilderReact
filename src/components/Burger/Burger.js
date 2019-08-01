import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import styles from './Burger.module.css';

const burger = props => {
    const ingredientsArray = Object.keys(props.ingredients).map(igKey => {
        const igCount = props.ingredients[igKey];
        return [...Array(igCount)].map((_, i) => <BurgerIngredient key={igKey + i} type={igKey} />);
    });

    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top" />
            {ingredientsArray}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;
