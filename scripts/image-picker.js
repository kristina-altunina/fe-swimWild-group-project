import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export function takePhoto(progress) {
  return ImagePicker.launchCameraAsync({
    allowsEditing: true,
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    quality: 1,
  }).then((cameraResponse) => {
    if (!cameraResponse.cancelled) {
      const { uri } = cameraResponse.assets[0];
      const fileName = uri.split("/").at(-1);
      return uploadToFirebase(uri, fileName, (prog) => {
        console.log(prog);
		progress(prog)
      })
        .then(({downloadURL}) => {
          return downloadURL
        })
        .catch((err) => {
          Alert.alert(`Error Uploading Image ${err.message}`);
        });
    }
  });
}

export function pickImage(progress) {
  return ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  }).then((res) => {
    if (!res.cancelled) {
      const { uri } = res.assets[0];
      const fileName = uri.split("/").at(-1);
      return uploadToFirebase(uri, fileName, (prog) => {
		console.log(prog)
		progress(prog)
      }).then(({downloadURL}) => {
        return downloadURL
      });
    }
  });
}


function uploadToFirebase(uri, name, onProgress) {
    return fetch(uri)
    .then(fetchResponse => {
      return fetchResponse.blob()
    })
    .then(blob => {
      const imageRef = ref(getStorage(), `images/${name}`);
      const uploadTask = uploadBytesResumable(imageRef, blob);
  
      return new Promise((resolve, reject) => {
        uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          progress && onProgress(progress);
        }, 
        (error) => {
          // Handle unsuccessful uploads
          reject(error)
        }, 
        () => {
          // Handle successful uploads on complete
          getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            console.log('File available at', downloadURL);
            resolve({
              downloadURL,
              metadata: uploadTask.snapshot.metadata
            })
          });
        }
        );
      })
      
    })
}