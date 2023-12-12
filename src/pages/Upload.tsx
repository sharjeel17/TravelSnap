import { ActivityIndicator, Alert, Button, Image, ImageProps, Keyboard, KeyboardAvoidingView, Pressable, ScrollView, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { imageDb, captionDb } from "../Firebase/Firebase";
import { addDoc, collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function UploadPhoto(){

    const [caption, setCaption] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [isUploading, setIsUploading] = useState(false);

   
    //function to convert uri of image to a blob
    async function createFileFromUri(uri: string){
        try{
            
            let response: Response = await fetch(uri);
            let data: Blob = await response.blob();
            return data;

        }catch(err){
            setPreviewImage("");
            console.error(err)
        }
    }

    async function UploadCaption(imageUrl: string){

        try{
            //get current photo ID which the new photo will have/be set to
            const refID = collection(captionDb, "PhotoIdInc");
            let dataID = await getDocs(refID);

            //keep ID in a variable
            let imageIDArr = dataID.docs.map((doc) => {
                return doc.data();
            });

            let imageID: number = imageIDArr[0]["ID"];

            //access Photo Details collection and add a new document in the collection
            //with the current ID, Url to the image on firebase, the caption and comments array
            const ref = collection(captionDb, "PhotoDetails");
            await addDoc(ref, {Photo: imageUrl, Caption: caption, ID: imageID, Comments: []});

            //reset to default
            setCaption("");
            setPreviewImage("");

            const currentIdDoc = doc(captionDb, "PhotoIdInc", "8Rle9meLbs67tAARp5yI");
            imageID++;
            await updateDoc(currentIdDoc, {ID: imageID})

        } catch(err){
            setIsUploading(false);
            console.error(err);
        }
        
    }

    async function UploadPhotoFunc(){
        try{
            setIsUploading(true);
            //convert uri/path to blob
            let image = await createFileFromUri(previewImage);

            //upload image to firebase storage
            let name = new Date();
            const imageRef = ref(imageDb, `images/${name.toISOString()}`);
            const data = await uploadBytesResumable(imageRef, image as Blob)
            Alert.alert("image uploaded");

            //get firebase image url and pass it to function that handles
            //uploading the relevant data to firestore
            const imageUrl = await getDownloadURL(data.ref)
            console.log(imageUrl);
            await UploadCaption(imageUrl);
            setIsUploading(false);

        } catch(err){
            setPreviewImage("");
            setIsUploading(false);
            console.error(err);
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

            setPreviewImage(result.assets[0].uri);
            //await createFileFromUri(result.assets[0].uri, date.toISOString());
        }
    }

    return (
        // Touchable because otherwise keyboard does not dismiss when you tap outside of textinput
        <TouchableWithoutFeedback className="flex-1" onPress={Keyboard.dismiss}>
            <ScrollView>
                <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100} className="flex-1">
                    <Text className="text-center text-lg">Choose how to upload your photo</Text>
                    <Image source={previewImage ? {uri: previewImage} : require('../assets/images/default.png')} className="h-64 w-64 self-center"/>
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
                    {isUploading ? ( <ActivityIndicator size="large" /> ) : (<Button title="Upload photo" onPress={UploadPhotoFunc} disabled={isUploading}/>)}
                </KeyboardAvoidingView>
            </ScrollView>
        </ TouchableWithoutFeedback>
    );
}