import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList, Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { Photos } from '../types/types';
import Comments from '../components/Comments';



export default function PhotoDetails({route}: NativeStackScreenProps<any>){
    const photo = route.params as Photos;
    

    return (
        <View>
            <Image className="mt-4 w-60 h-60 self-center" source={{uri: photo.photo}} />
            <Text className="mt-2 mb-5 pl-3 bg-slate-100 shadow-lg">{photo.caption}</Text>
            <Comments photoId={photo.id} />
        </View>
    );
}