import { Button, Text, View } from "react-native";
import { auth } from "../FirebaseConfig/Firebase";
import MyPhotos from "../components/MyPhotos";

export default function Profile(){
    
    return (
        <View>
            <Text className="text-xl self-center mb-10 mt-3">Your photos</Text>
            <MyPhotos />
            <Button title='Sign Out' onPress={() => auth.signOut()}/>
        </View>
    )
}