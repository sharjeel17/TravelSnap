import { Button, Text, View } from "react-native";
import { auth } from "../FirebaseConfig/Firebase";

export default function Profile(){
    
    return (
        <View>
            <Text>Profile Page</Text>
            <Button title='Sign Out' onPress={() => auth.signOut()}/>
        </View>
    )
}