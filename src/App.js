import React from 'react';
import './App.scss';

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
          <div className='app'> 
            <Search 
              value = {searchCity}
              onChange = {this.onChange}
            />          
          <h3>Город не найден</h3>           
        </div>        
        )        
      }

      case 200: {        
        return (      
          <div className='app'> 
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
          <div className='app'> 
            <Search 
              value = {searchCity}
              onChange = {this.onChange}
            />                                
          </div>          
        );        
      }
    }    
  }
}

class Search extends React.Component {
  render() {
    const {value, onChange} = this.props
    return (
      <form className='search'> 
        <h3>Введите название города</h3>
        <input 
          className = 'search__input'
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
      <table className="result-table">
        <tr>
          <td className="result-table__item">Город</td>
          <td className="result-table__item">{item.name}</td>
        </tr>
        <tr>
          <td className="result-table__item">Страна</td>
          <td className="result-table__item">{item.sys.country}</td>
        </tr>
        <tr>
          <td className="result-table__item">Температура</td>
          <td className="result-table__item">{item.main.temp}</td>
        </tr>
      </table>            
    )       
  }
}

export default App;
