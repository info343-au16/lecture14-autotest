import React from 'react';
import {shallow} from 'enzyme';

import App, {DogList, DogCard} from './PetApp';
import AdoptPage from './AdoptDog';

//tests go here!
describe('Basic math and logic', () => {
    it.skip('should do math right', () => {
        //run this code to test
        expect(Math.sqrt(2)).toEqual(1.41);
        expect(1+1).toEqual(2);
        //if(actual === expect)
    });

    it('should not find my name in a list', () => {
        var array = ['Joel', 'Luis', 'Cameron'];
        expect(array).not.toContain('Ross');
    });
});

describe('<App> component', () =>{
    it('renders without crashing', () => {
        const wrapper = shallow(<App />);
        // console.log(wrapper.html());
        // console.log(wrapper.find('a').props())
    })
});

describe('<DogList> component', () => {
    var wrapper;

    beforeEach(() => {
        wrapper = shallow(<DogList />);
    })

    it('has the correct title', () => {
        expect( wrapper.find('h2').text() ).toEqual("Dogs for Adoption");
    });

    it('shows all the dog cards', () => {
        var theCards = wrapper.find('DogCard');
        expect(theCards.length).toEqual(5);
    });

    //can next describe blocks to organize tests
    describe('subfeature name', () => { //submit button
        it('should do its own thing', () => { });
    })    

});

describe('<AdoptPage> component',() => {
    it('should adopt a dog on click', () => {
        const wrapper = shallow(<AdoptPage params={ {dogName:'Fido'} } />);
        expect(wrapper.find('button').text()).toEqual('Adopt me now!');
        var button = wrapper.find('button');
        button.simulate('click');
        expect(wrapper.find('button').text()).toEqual('Already adopted!');

    });

})