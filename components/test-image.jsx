import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { uploadToFirebase } from './firebase-config';
import { useState } from 'react';


export default function App() {
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();
  const [image, setImage] = useState(null);



  function takePhoto() {
    ImagePicker.launchCameraAsync({allowsEditing:true, mediaTypes: ImagePicker.MediaTypeOptions.All, quality:1})
    .then((cameraResponse) => {
      if(!cameraResponse.canceled) {
        const {uri} = cameraResponse.assets[0];
        const fileName = uri.split('/').at(-1)
        uploadToFirebase(uri, fileName, (prog) => {
          console.log(prog)
        })
        .then((res) => {
          console.log(res)
        })
        .catch(err => {
          Alert.alert(`Error Uploading Image ${err.message}`)
        })
      }
    })
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1,
    // });

    // if (!result.canceled) {
    //   setImage(result.assets[0].uri);
    // }

    ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    .then(res => {
      if (!res.cancelled) {
        // console.log(res.assets[0].uri)
        // console.log(res.assets[0].uri.split('/').at(-1))
        const { uri } = res.assets[0]
        const fileName = uri.split('/').at(-1)
        uploadToFirebase(uri, fileName, (prog) => {
          console.log(prog)
        })
        .then((res) => {
          console.log(res)
        })
      }
      
    })


  
  };

  if(permission?.status !== ImagePicker.PermissionStatus.GRANTED) {
    return (
      <View style={styles.container}>
        <Text>Permission not granted {permission?.status}</Text>
        <StatusBar style="auto" />
        <Button title='Request Permission' onPress={requestPermission}></Button>
      </View>
    );
  }



  return (
    <View style={styles.container}>
      <Text>test</Text>
      <StatusBar style="auto" />
      <Button title='Take Picture' onPress={takePhoto}></Button>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
