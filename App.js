import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Button, ActivityIndicator } from "react-native";
import { NativeRouter, Route, Link, BackButton } from 'react-router-native'
import Questions from "./screens/Questions";
import Home from "./screens/Home";
import FaceDeter from './components/Facedetection';

export default class App extends Component 
{
  constructor()
  {
    super();
    this.state ={
      isFaceDetect: false
    }
  }
   

    handeleFaceDetect = () =>{
        this.setState({ isFaceDetect: true });
    }

  render() {
    const { isFaceDetect } = this.state;
    // console.log()
    return (
          // <FaceDeter handeleFaceDetect = { this.handeleFaceDetect } />

          !isFaceDetect ?
          <FaceDeter handeleFaceDetect = { this.handeleFaceDetect } />
          :
          <NativeRouter>
            <View style={styles.container}>
              <BackButton />
              <Route  path='/questions' component = {Questions} />
              <Route exact path='/' component = {Home} />
            </View>
          </NativeRouter>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    marginTop: 22,
  },

  welcome: {
    fontSize: 22,
    fontWeight: "bold"
  },

  paragraph: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    padding: 10,
    marginTop: 15,
    lineHeight: 25
  }
});
