import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image,Keyboard,KeyboardAvoidingView,Platform,ScrollView,Text, TouchableWithoutFeedback, View } from "react-native";
import { Photos } from '../types/types';
import Comments from '../components/Comments';
import { useHeaderHeight } from '@react-navigation/elements'


export default function PhotoDetails({route}: NativeStackScreenProps<any>){
    const photo = route.params as Photos;
    const height = useHeaderHeight();

    return (
        
        <View className='flex-1 bg-[#1A1C20]'>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={height + 400} className='flex-1 bg-[#1A1C20]'>
                <View>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View>
                            <Text className="mb-1 mt-2 pl-3 text-[#FAFAFA] text-sm shadow-lg">@{photo.PostedBy}</Text>
                            <Image className="w-full h-3/6 self-center" source={{uri: photo.Photo}} />
                            <Text className="mt-2 mb-5 pl-3 text-[#FAFAFA] text-sm shadow-lg">{photo.Caption}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <Comments photoId={photo.Id} />
                </View>
            </KeyboardAvoidingView>
        </View>
        
);
}