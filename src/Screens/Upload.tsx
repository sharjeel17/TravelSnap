import { Alert, Button, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, uploadBytesResumable } from "firebase/storage"
import { imageDb } from "../Firebase/Firebase";

export default function UploadPhoto(){

    //function to convert uri of image to a blob
    async function createFileFromUri(uri: string, name: string){
        try{
            
            let response: Response = await fetch(uri);
            console.log("works here 1");
            let data: Blob = await response.blob();
            console.log("works here 2");

            const imageRef = ref(imageDb, `images/${name}`);
            console.log("works here 3");
            uploadBytesResumable(imageRef, data).then(()=>{
                 Alert.alert("image uploaded");
            }).catch(err => {console.error(err)})
        }catch(err){
            console.error(err)
        }
    }

    //function to handle selecting image from either camera roll or camera
    async function selectImage(useCameraRoll: boolean){

        const options: ImagePicker.ImagePickerOptions = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality: 0.75
        }
        let result: ImagePicker.ImagePickerResult;

        //if using camera roll
        if(useCameraRoll) {
            await ImagePicker.requestCameraPermissionsAsync();
            result = await ImagePicker.launchImageLibraryAsync(options)
        }
        //otherwise if using camera
        else {
            await ImagePicker.requestCameraPermissionsAsync();
            result = await ImagePicker.launchCameraAsync(options)
        }

        //convert resulting/created uri to blob to send to backend
        if(!result.canceled){
            console.log("image uploaded");
            console.log(result.assets[0].base64);
            let date = new Date();
            await createFileFromUri(result.assets[0].uri, date.toISOString());
        }
    }

    return (
        <View>
            <Text>Upload Photo Page</Text>
            <Button title="Camera Roll" onPress={() => selectImage(true)}/>
            <Button title="Camera" onPress={() => selectImage(false)}/>
        </View>
    )
}