import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Button, FlatList, Image, ListRenderItem, Pressable, ScrollView, Text, View } from "react-native";

interface Photos {
    thumbnailUrl: string
}

export default function Home({navigation}: NativeStackScreenProps<any>){
    const [photos, setPhotos] = useState([]);
    const getPosts = async () => {
        try{
        const response = await fetch("https://jsonplaceholder.typicode.com/photos?_limit=10");
        const data = await response.json();
        setPhotos(data);
        } catch (err){
            console.error(err);
        }
    }

    useEffect(() => {
        getPosts();
    }, [])

  return (
    <View>
            <FlatList 
             data={photos}
             renderItem= {({item}: {item: Photos}) => {
                console.log(item.thumbnailUrl);
                return (
                    <Pressable>
                        <Image source={{uri: item.thumbnailUrl+"png"}} style={{width: 400, height: 400}} />
                        <Text>Should render here</Text>
                    </Pressable>
                )
             }} 

            />
    </View>
  );
}
