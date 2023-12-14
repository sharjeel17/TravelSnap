import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image,KeyboardAvoidingView,ScrollView,Text, View } from "react-native";
import { Photos } from '../types/types';
import Comments from '../components/Comments';
import { useHeaderHeight } from '@react-navigation/elements'


export default function PhotoDetails({route}: NativeStackScreenProps<any>){
    const photo = route.params as Photos;
    const height = useHeaderHeight();

    return (
        
        <View className='flex-1 bg-black'>
            <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={height + 47} className='flex-1 bg-white'>
                <View>
                    <Image className="mt-4 w-60 h-60 self-center" source={{uri: photo.Photo}} />
                    <Text className="mt-2 mb-5 pl-3 bg-slate-100 shadow-lg">{photo.Caption}</Text>
                    <Comments photoId={photo.Id} />
                </View>
            </KeyboardAvoidingView>
        </View>
        
);
}