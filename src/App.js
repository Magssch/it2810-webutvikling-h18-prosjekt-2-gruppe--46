import React, { Component } from 'react';
import './App.css';
import Menu from './Components/Menu';
import Sidenav from './Components/Sidenav';
import axios from 'axios';
import Content from './Components/Content';


class App extends Component {

    constructor(props) {
        super(props);
        this.categoryChange = this.categoryChange.bind(this);
        this.updateTab = this.updateTab.bind(this);
    }
    state = {
        diceVal: 1,
        sidenavExpanded: "",
        menuClicked: "",
        tab: 1,

        categories: [
            {
                id: 1,
                name: "Bilder",
                options: [
                    {
                        id: 1,
                        name: "chairs",
                        text: "Stoler",
                        checked: true
                    },
                    {
                        id: 2,
                        name: "lamps",
                        text: "Lamper",
                        checked: false
                    },
                    {
                        id: 3,
                        name: "pokemon",
                        text: "Pokémon",
                        checked: false
                    },
                ]
            },
            {
                id: 2,
                name: "Lyd",
                options: [
                    {
                        id: 1,
                        name: "folk",
                        text: "Folkeinstrumenter",
                        checked: true
                    },
                    {
                        id: 2,
                        name: "string",
                        text: "Strenginstrumenter",
                        checked: false
                    },
                    {
                        id: 3,
                        name: "blow",
                        text: "Blåseinstrumenter",
                        checked: false
                    },
                ]
            },
            {
                id: 3,
                name: "Tekst",
                options: [
                    {
                        id: 1,
                        name: "cites",
                        text: "Sitater",
                        checked: true
                    },
                    {
                        id: 2,
                        name: "lyrics",
                        text: "Sangtekster",
                        checked: false
                    },
                    {
                        id: 3,
                        name: "limericks",
                        text: "Limericks",
                        checked: false
                    },
                ]
            },
        ]
    }

    onRoll = () => {
        this.setState({
            diceVal: Math.floor(Math.random()*6)+1
        })
    };

    sidenavExpand = () => {
        if(this.state.sidenavExpanded === "") {
            this.setState({
                sidenavExpanded: "expand",
                menuClicked: "change"
            })
        } else {
            this.setState({
                sidenavExpanded: "",
                menuClicked: ""
            })
        }
    };

    sidenavClose = () => {
        if(!(this.state.sidenavExpanded === "")) {
            this.setState({
                sidenavExpanded: "",
                menuClicked: ""
            })
        }
    };

    categoryChange(category) {
        let temp = this.state.categories;
        temp[category.id - 1].options.forEach(o => o.checked = false);
        temp[category.id - 1].options[category.option.id - 1].checked = category.option.checked;

        this.setState({
            category: temp,
        });

    }

    updateTab() {
        let tmp = this.state.tab;
        if(tmp>3) tmp = 0;
        this.setState({tab: tmp+1});
    }


    getCategories() {
        return [this.state.categories[0].options.filter(option => option.checked),
            this.state.categories[1].options.filter(option => option.checked),
            this.state.categories[2].options.filter(option => option.checked)];
    }
    getText() {
        return this.getCategories()[2][0];
    }
    getImg() {
        return this.getCategories()[0][0];
    }
    getAud() {
        return this.getCategories()[1][0];
    }/*
    getAudio() {
        let categoryState = this.getCategories();
        let path = '/media/sounds/'+categoryState[1][0].name+'/sound'+this.state.tab+'.mp3';
        axios.request(path)
            .then(function (response) {
                // handle success
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }/*
    getImage() {
        let categoryState = this.getCategories();
        let path = '/media/images/'+categoryState[0][0].name+'/'+this.state.tab+'.mp3';
        axios.get(path)
            .then(function (response) {
                // handle success
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }*/


    render() {
    return (
      <div className="App">
          <Sidenav value={this.state.sidenavExpanded} categories={this.state.categories} handleChange={this.categoryChange}/>
          <div className="page" onClick={this.sidenavClose}>
          <header className="header">
          <h1 className="title">Lorem Ipsum</h1>
            </header>
              <Menu onClick={this.sidenavExpand} value={this.state.menuClicked} />
            <div className="content">
                <p>Lorem ipsum dolor sit amet</p>
                <Content tabIndex={this.state.tab} text={this.getText()} img={this.getImg()} aud={this.getAud()}/>
                <br/>
                <button onClick={this.updateTab}>Bytt tab</button>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
