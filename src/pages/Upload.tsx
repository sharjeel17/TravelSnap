import { Alert, Button, Keyboard, KeyboardAvoidingView, Pressable, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytesResumable } from "firebase/storage"
import { imageDb } from "../Firebase/Firebase";
import { useState } from "react";

export default function UploadPhoto(){

    const [caption, setCaption] = useState("");

    //function to convert uri of image to a blob
    async function createFileFromUri(uri: string, name: string){
        try{
            
            let response: Response = await fetch(uri);
            let data: Blob = await response.blob();

            const imageRef = ref(imageDb, `images/${name}`);
            uploadBytesResumable(imageRef, data).then(()=>{
                 Alert.alert("image uploaded");
            }).catch(err => {console.error(err)})
        }catch(err){
            console.error(err)
        }
    }

    //function to handle selecting image from either camera roll or camera
    async function selectImage(useCameraRoll: boolean){

        //options for how the image will be saved and rendered
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
            let date = new Date();
            await createFileFromUri(result.assets[0].uri, date.toISOString());
        }
    }

    return (
        // Touchable because otherwise keyboard does not dismiss when you tap outside of textinput
        <TouchableWithoutFeedback className="flex-1" onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100} className="flex-1">
                <Text className="text-center text-lg">Choose how to upload your photo</Text>
                <View className="flex-row justify-center mt-6">
                    <Pressable onPress={() => selectImage(true)} className="py-1 px-4 bg-blue-300 rounded-full">
                        <Text className="text-lg">Camera Roll</Text>
                    </Pressable>
                    <Pressable onPress={() => selectImage(false)} className="py-1 px-4 mx-4 bg-blue-300 rounded-full">
                        <Text className="text-lg">Camera</Text>
                    </Pressable>
                </View>
                <Text className="mx-1 mt-7">Add a caption</Text>
                <TextInput 
                    className="align-top h-40 bg-slate-400 rounded-md mx-0.5 mt-2 px-2"
                    value={caption} 
                    onChangeText={setCaption} 
                    placeholder="Enter caption here"
                    multiline
                    maxLength={500}/>
                <Button title="Upload photo" onPress={UploadPhoto}/>
            </KeyboardAvoidingView>
        </ TouchableWithoutFeedback>
    );
}