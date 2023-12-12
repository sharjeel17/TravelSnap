import { ActivityIndicator, Alert, Button, Image,
        Keyboard, KeyboardAvoidingView, Pressable, 
        ScrollView, Text, TextInput, 
        TouchableWithoutFeedback, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { imageDb, mainDb } from "../Firebase/Firebase";
import { addDoc, collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { useState } from "react";

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
            //this ID is used to reference the PhotoDetails documents
            //instead of using firestore's auto generated IDs (easier to sort this way).
            
            //first get all documents from the PhotoIdInc collection
            const refID = collection(mainDb, "PhotoIdInc");
            let dataID = await getDocs(refID);

            //then extract data from the document from the PhotoIdInc collection
            //and set the value of the field "ID" to the imageID variable
            let imageIDArr = dataID.docs.map((doc) => {
                return doc.data();
            });
            let imageID: number = imageIDArr[0]["ID"];

            //access Photo Details collection and add a new document in the collection
            //with the current ID, Url to the image on firebase storage, the caption and the comments array
            const ref = collection(mainDb, "PhotoDetails");
            await addDoc(ref, {Photo: imageUrl, Caption: caption, ID: imageID, Comments: []});

            //reset to default
            setCaption("");
            setPreviewImage("");

            //increment ID, used for referencing PhotoDetails documents, by 1
            const currentIdDoc = doc(mainDb, "PhotoIdInc", "8Rle9meLbs67tAARp5yI");
            imageID++;
            await updateDoc(currentIdDoc, {ID: imageID})

        } catch(err){
            setIsUploading(false);
            console.error(err);
        }
        
    }

    //function to upload the photo to the backend/firebase
    //function also calls UploadCaption function to upload the caption and other data to firestore
    async function UploadPhotoFunc(){
        try{
            setIsUploading(true);
            //convert uri/path to blob
            let image = await createFileFromUri(previewImage);

            //upload image to firebase storage
            //uploadBytesResumable used because uploadBytes was crashing on larger images
            let name = new Date();
            const imageRef = ref(imageDb, `images/${name.toISOString()}`);
            const data = await uploadBytesResumable(imageRef, image as Blob)
            Alert.alert("image uploaded");

            //get firebase image url of the newly uploaded image 
            //and pass it to function that handles uploading the relevant data to firestore
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

        //set preview as the selected image to display to the user if request is not cancelled
        if(!result.canceled){
            setPreviewImage(result.assets[0].uri);
        }
    }

    return (
        // Touchable because otherwise keyboard does not dismiss when you tap outside of textinput
        <TouchableWithoutFeedback className="flex-1" onPress={Keyboard.dismiss}>
            <ScrollView>
                <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100} className="flex-1">
                    <Text className="text-center text-lg">Choose how to upload your photo</Text>

                    {/* if no preview image is present then use default image */}
                    <Image source={previewImage ? {uri: previewImage} : require('../assets/images/default.png')} className="h-64 w-64 self-center"/>

                    {/* Camera roll and Camera buttons in here */}
                    <View className="flex-row justify-center mt-6">
                        <Pressable onPress={() => selectImage(true)} className="py-1 px-4 bg-blue-300 rounded-full">
                            <Text className="text-lg">Camera Roll</Text>
                        </Pressable>
                        <Pressable onPress={() => selectImage(false)} className="py-1 px-4 mx-4 bg-blue-300 rounded-full">
                            <Text className="text-lg">Camera</Text>
                        </Pressable>
                    </View>

                    {/* Add a caption is inside of here */}
                    <Text className="mx-1 mt-7">Add a caption</Text>
                    <TextInput 
                        className="align-top h-40 bg-slate-400 rounded-md mx-0.5 mt-2 px-2"
                        value={caption} 
                        onChangeText={setCaption} 
                        placeholder="Enter caption here"
                        multiline
                        maxLength={500} />
                    
                    {/* If user clicked upload then disable button until the image and caption are both uploaded to the backend */}
                    {isUploading ? ( <ActivityIndicator size="large" /> ) : (<Button title="Upload photo" onPress={UploadPhotoFunc} disabled={isUploading}/>)}
                </KeyboardAvoidingView>
            </ScrollView>
        </ TouchableWithoutFeedback>
    );
}