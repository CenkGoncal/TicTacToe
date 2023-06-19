import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  TouchableOpacity,
  
} from 'react-native';

 


const App = () => {
  const [active_player, setActivePlayer] = useState('X');
  const [board, setBoard] = useState(Array(10).fill(null));
  const [winner, setWinner] = useState(null);
  const [highligted, setHighligted] = useState(null);
 
  const Box = ({index,val, handleClick, highligted , disabled}) => {
    return (
      <TouchableOpacity
        disabled={disabled}
        onPress={handleClick}
        style={[
          styles.Box,
          ,
          {backgroundColor: highligted ? "green" : ( val == 'X' ? 'lightgray' : 'lightgreen')},
        ]}>
        <Text style={styles.BoxText}>{val}</Text>
      </TouchableOpacity>
    );
  };

  const createBoxes = () => {
    const boxes = [];
     for(var i = 0; i<3; i++)
    {
       boxes.push(<View key={i} style={styles.BoxView}>{createBoxItem((i*3) +1)}</View>);
     }

    return boxes;
  }

  const func = (index) => {
    console.log(index);
    const newBord = [...board];
    newBord[index] = active_player;
    setBoard(newBord);
    
    let writeline = CheckWinner(newBord);
    if(writeline)
    {
      setWinner(active_player);
      setHighligted(writeline);
      alert("You're Won")
    }
    else
      setActivePlayer((prev)=>prev === "X" ? "O" : "X");
    
  }

  const createBoxItem =(z) => {
    const boxes = [];
    boxes.push(<Box index={z} val={board[z]}     highligted={highligted?.includes(z)}      handleClick={()=>func(z)}  disabled={winner || board[z]} />);
    boxes.push(<Box index={z+1} val={board[z+1]} highligted={highligted?.includes(z+1)}    handleClick={()=>func(z+1)}  disabled={winner || board[z+1]} />);
    boxes.push(<Box index={z+2} val={board[z+2]} highligted={highligted?.includes(z+2)}    handleClick={()=>func(z+2)}  disabled={winner || board[z+2]} />);

    return boxes;
  }

  const ClearGame = () => {
    setActivePlayer("X");
    setBoard(Array(10).fill(null));
    setWinner(null);
    setHighligted(null);
  }

 const CheckWinner =(newBord) => {

  const lines = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
  ];

   return lines.find(([a,b,c]) => {
      if(newBord[a] != null && newBord[a] === newBord[b] && newBord[a] === newBord[c])
        return true;
    
    return false;
  });
 }

  return (
    <SafeAreaView style={styles.body}>
      <View
        style={[
          styles.PlayerInfo,
          {backgroundColor: active_player == 'X' ? '#007FF4' : '#F40075'},
        ]}>
        <Text style={styles.PlayerFont}>Player {active_player} {winner ? "Win" : "Turn"}</Text>
      </View>
        {createBoxes()}
      <TouchableOpacity style={styles.ResetCtn} onPress={ClearGame}>
        <Text style={styles.ResetText}>Reset</Text>
      </TouchableOpacity>
      {(!winner && board.filter(f=> f == null).length != 0) && <Text>No One Win Please Start New Game!</Text>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
  },
  PlayerInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
    marginVertical: 30,
    marginTop: 30,
    padding: 20,
  },
  PlayerFont: {
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: '#fff',
  },
  BoxView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Box: {
    height: 60,
    width: 60,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white',
    margin: 5,
    justifyContent: 'center',
  },
  BoxText: {
    textAlign: 'center',
    fontSize: 30,
  },
  ResetCtn:{
    alignItems:"center"
  },
  ResetText:{
    color:"red",
    fontSize:20,
  }
});

export default App;
