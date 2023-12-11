import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Button, FlatList, GestureResponderEvent, Image, ListRenderItem, Pressable, ScrollView, Text, View } from "react-native";
import { Photos } from '../types/types';

export default function Home({navigation}: NativeStackScreenProps<any>){
    const [photos, setPhotos] = useState([]);

    //get posts from url and put them in photos state variable to use in FlatList
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

    //useffect function only runs on first/initial render of the page
    //and calls the getPosts function to fill the photos state vaiable with data
    useEffect(() => {
        getPosts();
    }, [])

    //takes in the selected item as an argument
    //navigates to the Details page/screen and passes item data to the screen
    function goToDetailsPage(item: Photos){
        navigation.navigate("Details", item);
    }


  return (
    <View>
        {/* Flatlist will render each item one by one for the length of the photos variable/array */}
        <FlatList 
            data={photos}
            // renderItem runs for each item in the photos variable/array
            //and runs the code inside the curly braces
            //code inside curl braces/function will return/render a pressable component 
            //which has an Image component inside of it
            //upon pressing anything iside the Pressable component (the Image)
            //a function will run which then invokes/runs another function called goToDetailsPage
            //and passes the information of the clicked item to the goToDetailsPage function as an argument
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
