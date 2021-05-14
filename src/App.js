import React from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import Board from './components/Board';
import Item from './components/Item';
import List from './components/List';
import { Provider } from 'react-redux';
import store from './store';



function App() {
  return (
    <div className="App">
      <main className="flexbox">
        <Provider store={store}>
          <List className="list"/>
          <Board id='board-2' className="board">
          <Item id= "item-1" draggable="true" className="item"> 
                <p>FIRST</p>
              </Item>
              <Item id= "item-2" draggable="true" className="item"> 
                <p>SECOND</p>
              </Item>
          </Board>
        </Provider>
      {/* <Counter/> */}
        
      </main>
    </div>
  );
}

export default App;
