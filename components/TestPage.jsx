import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { takePhoto, pickImage } from '../scripts/image-picker';


export default function TestPage() {
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();
 


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
