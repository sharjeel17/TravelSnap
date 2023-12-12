import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, Text, View } from "react-native";
import { Photos } from '../types/types';

export default function PhotoDetails({route}: NativeStackScreenProps<any>){
    const item = route.params;
    return (
        <View className="items-center">
            <Image className="w-60 h-60" source={{uri: item?.Photo}} />
            <Text>{item?.Caption}</Text>
        </View>
    );
}