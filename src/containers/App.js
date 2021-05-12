import React,{Component} from 'react';
import Scroll from '../components/Scroll';
import CardList from '../components/CardList';
import SearchBar from '../components/SearchBar';
import './App.css';

class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            robots:[],
            searchbar:'',
        }
    }

    onSearchChange = (event) =>{
        console.log(event.target.value)
        this.setState({searchbar:event.target.value});
    };
    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response=>{
           return response.json();
        })
            .then(users=>{
            this.setState({robots:users})
        })
    }

    render() {
        const{robots,searchbar} = this.state;
        const filteredRobots = robots.filter(robot=>{
            return robot.name.toLowerCase().includes(searchbar.toLowerCase());
        });
        return(
            <div className="tc">
                <h1 className='f1'>RoboFriends</h1>
                <SearchBar searchChange={this.onSearchChange}/>
                <Scroll>
                    <CardList robots={filteredRobots}/>
                </Scroll>
            </div>
        );
    }
}

export default App;