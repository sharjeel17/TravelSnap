import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image,Keyboard,KeyboardAvoidingView, Platform, Text, TouchableWithoutFeedback, View } from "react-native";
import { Photos } from '../types/types';
import Comments from '../components/Comments';
import { useHeaderHeight } from '@react-navigation/elements'


export default function PhotoDetails({route}: NativeStackScreenProps<any>){
    const photo = route.params as Photos;
    const height = useHeaderHeight();

    return (
        
        <View className='flex-1 bg-[#1A1C20]'>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding": "height"} keyboardVerticalOffset={height + 100} className='flex-1 bg-[#1A1C20]'>
                <View>
                    <TouchableWithoutFeedback className="flex-1 bg-white" onPress={Keyboard.dismiss}>
                        <View>
                            <Text className="mb-1 mt-2 pl-3 text-[#FAFAFA] text-sm shadow-lg">@{photo.PostedBy}</Text>
                            <Image className="h-[200] w-[250] self-center" source={{uri: photo.Photo}} />
                            <Text className="mt-2 mb-2 pl-3 text-[#FAFAFA] text-sm shadow-lg">{photo.Caption}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <Comments photoId={photo.Id} />
                </View>
            </KeyboardAvoidingView>
        </View>
        
);
}