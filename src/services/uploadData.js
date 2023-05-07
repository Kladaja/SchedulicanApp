import { storage } from '../../config/firebase';
import { ref, uploadBytes } from 'firebase/storage';

// uploading image into firebase storage
export const uploadImage = async (image, path) => {
  // creating the blob from the selected image
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', image, true);
    xhr.send(null);
  });
  // creating the path which will be used within storage
  const uploadUri = `${path}/${blob.data.name}`;
  // creating a reference to storage and uploading the blob file
  const storageRef = ref(storage, uploadUri);
  uploadBytes(storageRef, blob).catch((error) => {
    alert(error);
  });

  return uploadUri;
};
