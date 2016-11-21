import React from 'react';
import {shallow} from 'enzyme';

import App, {DogList, DogCard} from './PetApp';
import AdoptPage from './AdoptDog';

//tests go here!
describe('Basic math and logic', () => {

    it('should calculate square roots', () => {
        //perform the test here!
        var whatWeGot = Number(Math.sqrt(2).toFixed(2));
        var whatWeWanted = 1.41;
        expect(whatWeGot).toEqual(whatWeWanted);
    })

    it('should have 1+1=2', () => {
        expect(1+1).toEqual(2);
    });

    it.skip('should not have my name', () => {
        var array = ['Joel', 'Luis', 'Cameron'];
        expect(array).not.toContain('Joel');
    });

    it('should check max numbers', () => {
        var array = [8,6,7,5,3,0,9];
        expect(array.filter((n) => n > 10)).not.toContain(true);
    });
})

describe('<App> component', () => {
    it('should render without crashing', () => {
        const wrapper = shallow(<App />);
        // console.log(wrapper.html());
        //console.log(wrapper.find('a').props());
    })

});

describe('<DogList> component', () => {
    var wrapper; //declare the wrapper

    beforeEach(() => {
        wrapper = shallow(<DogList />);
    })

    it('has the correct title', () => {
        var h2 = wrapper.find('h2');
        expect(h2.text()).toEqual('Dogs to Adopt');
    })

    it('shows all the dog cards', () => {
        expect(wrapper.find('DogCard').length).toEqual(5)
    });

    describe('search form', () => { //submit button
        it('should do its own thing', () => { });
    })    
});

describe('<AdoptPage> component', () => {
    it('should adopt on click', () => {
        const wrapper = shallow(<AdoptPage params={ {dogName: 'Fido'} } />);

        expect(wrapper.find('button').text()).toEqual('Adopt me now!');

        wrapper.find('button').simulate('click');

        expect(wrapper.find('button').text()).toEqual('Already adopted!');
        

    });
});