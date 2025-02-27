import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../Burger/BuildControls/BuildControls';

configure({
    adapter: new Adapter(),
});

describe('<BurgerBuilder />', () => {
    it('should render <BuildControls /> when receiving ingredients', () => {
        const wrapper = shallow(<BurgerBuilder onInitIngredients={() => void 0} />);

        wrapper.setProps({
            ingredients: {
                salad: 0,
            },
        });

        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});
