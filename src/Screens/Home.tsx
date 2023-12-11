import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Button, FlatList, GestureResponderEvent, Image, ListRenderItem, Pressable, ScrollView, Text, View } from "react-native";

interface Photos {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string
}

export default function Home({navigation}: NativeStackScreenProps<any>){
    const [photos, setPhotos] = useState([]);
    //get posts from url
    const getPosts = async () => {
        try{
        const response = await fetch("https://jsonplaceholder.typicode.com/photos?_limit=10");
        const data = await response.json();
        setPhotos(data);

        } 
        catch (err){
            console.error(err);
        }
    }

    useEffect(() => {
        getPosts();
    }, [])

    function goToDetailsPage(item: Photos){
        navigation.navigate("Details", item);
    }

  return (
    <View>
        <FlatList 
            data={photos}
            renderItem = {({item}: {item: Photos}) => {
            return (
                <Pressable onPress={() => {
                    goToDetailsPage(item)
                }}>
                    <Image source={{uri: item.thumbnailUrl+"png"}} style={{width: 400, height: 400}} />
                    <Text>Should render here</Text>
                </Pressable>
            )
            }} 

        />
    </View>
  );
}
