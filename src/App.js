import React from 'react';
import './App.css';
import Menu from './Menu';
import List from './List';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state= {
      books:[
        {id:0, rating: 4, title: 'Harry Potter y el cáliz de fuego', image: 'Libro01.jpg'},
        {id:1, rating: 3, title: 'The shining', image: 'Libro02.jpg'},
        {id:2, rating: 5, title: 'Codigo Da Vinci', image: 'Libro03.jpg'},
        {id:3, rating: 5, title: 'El principito', image: 'Libro04.jpg'},
        {id:4, rating: 5, title: 'Sobrenatural', image: 'Libro05.jpg'},
      ],
      copyBooks: []
    };
  }

  componentDidMount() {
    this.initBooks();
  }

  initBooks = () => {
    this.setState((state,props) => ({
      copyBooks: [...state.books]
    }));
  }

  onAdd = (item) => {
    let temp = [...this.state.books];
    const id = temp[temp.length-1].id + 1;
    item['id'] = id;
    temp.push(item);

    this.setState({books: [...temp]});
    this.initBooks();
  }

  onSearch = (query) => {
    if(query === '') {
      this.initBooks();
    } else {
      const temp = [...this.state.books];
      let res = [];

      temp.forEach(item => {
        if(item.title.toLowerCase().indexOf(query) > -1){
          res.push(item);
        }
      });
      this.setState({copyBooks: [...res]});
    }
  }

  onUpdateRating = (item) => {
    var temp = [...this.state.books];
    const index = temp.findIndex(x => x.id === item.id);

    temp[index].title = item.title;
    temp[index].image = item.image;
    temp[index].rating = item.rating;

    this.setState({books: [...temp]});
    this.initBooks();
  }

  onRemove = (id) => {
    var temp = [...this.state.books];
    const res = temp.filter(item => item.id !== id);

    this.setState({books: [...res]});
    this.initBooks();
  }

  render(){
    return (
      <div className='app'>
        <Menu title='Amazon' onadd={this.onAdd} onsearch={this.onSearch} />
        <List 
          items={this.state.copyBooks} 
          onupdaterating={this.onUpdateRating}
          onremove={this.onRemove}
        />
      </div>
    );
  }
}

export default App;
