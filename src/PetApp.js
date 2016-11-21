import React from 'react';
import _ from 'lodash';
import { Link, hashHistory } from 'react-router';
import SAMPLE_DOGS from './dog-data'; //load the dog data to use

class PetApp extends React.Component {
  constructor(props){
    super(props);

    //this ideally would be set up from a Controller
    this.state = {pets: SAMPLE_DOGS}; //in state as if coming from Controller
  }

  render() {    
    //extract the breeds (thanks lodash!)
    var breeds = Object.keys(_.groupBy(this.state.pets, 'breed'));

    return (
      <div>
        <header className="well">
          <div className="container">
            <h1>Adopt a Pet</h1>
          </div>
        </header>
        <main className="container">
          <div className="row">
            <div className="col-xs-3">
              <BreedLinks breeds={breeds} />
              <GeneralLinks />
            </div>
            <div className="col-xs-9">
              {this.props.children}
            </div>
          </div>
        </main>
        <footer className="container">
          <small>Images from <a href="http://www.seattlehumane.org/adoption/dogs">Seattle Humane Society</a></small>
        </footer>
      </div>
    );
  }
}

class GeneralLinks extends React.Component {
  render() {
    return (
      <nav>
        <h2>Navigation</h2>
        <ul className="list-unstyled">
          <li><Link to="/list" activeClassName="activeLink">Adopt a Pet</Link></li>
          <li><Link to="/about" activeClassName="activeLink">About Us</Link></li>
          <li><Link to="/resources" activeClassName="activeLink">Resources</Link></li>
        </ul>
      </nav>      
    );
  }
}

class BreedLinks extends React.Component {
  render() {
    
    var links = this.props.breeds.map(function(breed){
      return <li key={breed}><Link to={'/list/'+breed} activeClassName="activeLink">{breed}</Link></li>;
    })

    return (
      <nav>
        <h2>Breeds</h2>
        <ul className="list-unstyled">
          {links}
          <li><Link to="list" activeClassName="activeLink" onlyActiveOnIndex={true}>All Breeds</Link></li>
        </ul>
      </nav>
    );
  }
}

class DogList extends React.Component {
  constructor(props){
    super(props)
    this.state = {dogs:SAMPLE_DOGS}; //in state as if coming from Controller
  }

  searchDogs(searchTerm){
    var searchedList = SAMPLE_DOGS.filter((dog) => {
      return _.includes(dog.breed, searchTerm) || dog.sex === searchTerm || _.includes(dog.name, searchTerm);
    });
    this.setState({dogs:searchedList});
  }

  selectDogCard(selectedDog){
    hashHistory.push('/adopt/'+selectedDog.name);
  }

  render() {

    var dogList = this.state.dogs;
    if(this.props.params && this.props.params.breed){ //if have a param
      //filter the list based on that!
      dogList = dogList.filter(dog => dog.breed === this.props.params.breed);
    }

    var dogCards = dogList.map((dog) => { //arrow function!
      return <DogCard mutt={dog} key={dog.name} selectCallback={this.selectDogCard} />;
    })

    return (
      <div>
        <h2>Dogs to Adopt</h2>
        <div className="input-group">
          <label htmlFor="searchTerm" className="input-group-addon"><i className="glyphicon glyphicon-search" aria-label="Search"></i></label>
          <input type="text" id="searchTerm" className="form-control" placeholder="Search for breed, sex, or name" onChange={(e) => this.searchDogs(e.target.value)}/>
        </div>
        <div className="cards-container">
          {dogCards}
        </div>
      </div>
    );
  }
}

class DogCard extends React.Component {

  handleClick(){
    console.log("You clicked on", this.props.mutt.name);
    this.props.selectCallback(this.props.mutt);
  }

  render() {
    var mutt = this.props.mutt; //shortcut
    return (
      <div className="card">
        <div className="content">
          <img src={mutt.images[0]} alt={mutt.name} />
          <h3>{mutt.name} {mutt.adopted ? '(Adopted)' : ''}           
            <button className="btn btn-default btn-small pull-right" onClick={(e) => this.handleClick(e)}>
              Adopt me!
            </button>
          </h3>
          <p>{mutt.sex} {mutt.breed}</p>
        </div>
      </div>
    );
  }
}

export {DogList, PetApp, DogCard}; //export both components

export default PetApp;