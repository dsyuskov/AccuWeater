import React from 'react';
import './App.css';

const PATH_BASE = 'http://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'APPID=d5ecba2b149b9cdfb1fea656c735177d';
const API_SYSTEM = 'units=metric';
const PATH_SEARCH = 'q=';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchCity: 'Balashov'
    }
 
    this.serchResult = this.serchResult.bind(this);
    this.onChange = this.onChange.bind(this);  
    this.onLoadData = this.onLoadData.bind(this);
  }
 
  serchResult(result) {        
    this.setState({ result })            
  }
 
  onLoadData(searchCity) {    
    fetch(`${PATH_BASE}?${API_KEY}&${API_SYSTEM}&${PATH_SEARCH}${searchCity}`)
      .then(response => response.json())
      .then(result => {this.serchResult(result)})    
      .catch(error => error);
  }

  componentDidMount() {
    this.onLoadData(this.state.searchCity)
  }

  onChange(event) {    
    this.setState({ searchCity: event.target.value})        
    this.onLoadData(event.target.value);    
  }

  render() {     
    const {result, searchCity} = this.state

    if (!result) return null;  
    
    switch(result.cod) {
      case '404': {        
        return (
          <div className="App">
            <Search 
            value = {searchCity}
            onChange = {this.onChange}
          />          
          <div>
            City not found
          </div>
        </div>        
        )        
      }

      case 200: {        
        return (      
          <div className="App">
            <Search 
              value = {searchCity}
              onChange = {this.onChange}
            />
            <Table 
              item = {result}
            />           
          </div>          
        );        
      }
      default: {        
        return (
          <div className="App">
            <Search 
              value = {searchCity}
              onChange = {this.onChange}
            />          
            <div>
              I don't know
          </div> 
          </div>          
        )
      }
    }    
  }
}

class Search extends React.Component {
  render() {
    const {value, onChange} = this.props
    return (
      <form>
        <input 
          type = 'text'
          value = {value}
          onChange = {onChange}
        />
      </form>      
    )
  }
}

class Table extends React.Component {
  render() {
    const {item} = this.props;
    return(             
      <div>           
        <table>
          <tr>
            <td>Город</td>
            <td>{item.name}</td>
          </tr>
          <tr>
            <td>Страна</td>
            <td>{item.sys.country}</td>
          </tr>
          <tr>
            <td>Температура</td>
            <td>{item.main.temp}</td>
          </tr>
        </table>      
      </div>
    )       
  }
}

export default App;
