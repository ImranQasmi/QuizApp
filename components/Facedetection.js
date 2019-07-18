import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Permissions, Camera, FaceDetector, } from 'expo';


class FaceDetect extends Component
{
    constructor()
    {
        super();
        this.state={
            ihasCameraPermission: null,
            type: Camera.Constants.Type.back,
        }
    }

    async componentWillMount() {
      const { status } =await Permissions.askAsync(Permissions.CAMERA);
      this.setState({hasCameraPermission:status==='granted'});
    } 

    handleFacesDetected = ({ faces }) => {
      if(faces.length > 0){
        console.log("face dected", faces)
        this.props.handeleFaceDetect();
      }
      else
      {
        //   alert("No face dete~")
      }
    }

    detectFaces = async imageUri => {
      const options = { mode: FaceDetector.Constants.Mode.fast };
      return await FaceDetector.detectFacesAsync(imageUri, options);
    };

   render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera

            style={{ flex: 1 }} 
            type={this.state.type}
            onFacesDetected={ this.handleFacesDetected}
            faceDetectorSettings={{
                mode: FaceDetector.Constants.Mode.accurate,
                detectLandmarks: FaceDetector.Constants.Landmarks.all,
                runClassifications: FaceDetector.Constants.Classifications.all,
            }}
            
        >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}>
                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View> 
      );
    }
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export default FaceDetect;