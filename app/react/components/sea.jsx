import React from 'react';
import GameStatus from './game_status'
import Tile from './tile'

export default class Sea extends React.Component {
  constructor(props) {
    super(props);
    this.onReceive = this.onReceive.bind(this);
    this.onConnect = this.onConnect.bind(this);
    this.onDisconnect = this.onDisconnect.bind(this);
    this.onGameStart = this.onGameStart.bind(this);
    this.onTileClick = this.onTileClick.bind(this);
    this.onTileBlackClick = this.onTileBlackClick.bind(this);

    const board = [
      '', '', '', '',
      '', '', '', '',
      '', '', '', '',
      'S', 'S', 'S', 'S'
    ]

    this.state = {
      tiles: this.shuffleTiles(board.slice()),
      tilesForOpponent: board.slice(),
      status: 'waiting'
    };
  }

  shuffleTiles(tiles) {
    for (var i = tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = tiles[i];
      tiles[i] = tiles[j];
      tiles[j] = temp;
    }
    return tiles;
  }

  onConnect() {
    console.log('connected');
  }

  onDisconnect() {
    console.log('disconnected');
  }

  onReceive(data) {
    switch(data.action) {
    case 'game_start':
      this.onGameStart();
      break;
    case 'game_end':
      console.log('end');
      break;
    }
  }

  onGameStart() {
    console.log('game started');
    this.setState({status: 'playing'});
  }

  onTileClick(position, player) {
    const tiles = this.state.tiles;
    if ( (tiles[position] === 'X' || tiles[position] === 'I') ) return;
    if (tiles[position] === 'S') tiles[position] = 'X';
    this.setState({tiles: tiles, turn: player === 'I' ? 'X' : 'O'});
  }

  onTileBlackClick(position, player) {
    const tiles = this.state.tilesForOpponent;
    if ( (tiles[position] === 'X' || tiles[position] === 'I') ) return;
    if (tiles[position] === 'S') tiles[position] = 'X';
    this.setState({tiles: tiles, turn: player === 'I' ? 'X' : 'O'});
  }

  render() {
    return (
      <div>
        <GameStatus status={this.state.status}/>
        <div className='game-container'>
          <div className='board'>
            { this.state.tiles.map(function(tile, position) {
              return(
                <Tile status={tile} key={position} position={position} turn={this.state.turn} onTileClick={this.onTileClick} />
              );
            }, this) }
          </div>
          <div className='board'>
            { this.state.tilesForOpponent.map(function(tile, position) {
              return(
                <Tile status={tile} key={position} position={position} turn={this.state.turn} onTileClick={this.onTileBlackClick} />
              );
            }, this) }
          </div>
        </div>
      </div>
    );
  }
}
