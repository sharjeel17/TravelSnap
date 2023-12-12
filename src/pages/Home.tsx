import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, View } from "react-native";
import { Photos } from '../types/types';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { captionDb } from '../Firebase/Firebase';

export default function Home({navigation}: NativeStackScreenProps<any>){
    const [photos, setPhotos] = useState<Photos[]>([]);
    const [isRefreshing, setIsRefreshing] = useState(false);

    //get posts from url and put them in photos state variable to use in FlatList
    const getPosts = async () => {
        try{
            setIsRefreshing(true);
            //get current photo ID which the new photo will have/be set to
            const refID = query(collection(captionDb, "PhotoDetails"), orderBy("ID", "desc"));
            let dataID = await getDocs(refID);

            //keep ID in a variable
            let photoDetails = dataID.docs.map((doc) => {
                return doc.data();
            });

            setPhotos(photoDetails as Photos[]);
            setIsRefreshing(false);
        } catch(err) {
            setIsRefreshing(false);
            console.error(err);

        }
        
    }

    //useffect function only runs on first/initial render of the page
    //and calls the getPosts function to fill the photos state vaiable with data
    useEffect(() => {
        getPosts();
    }, [])

    function handleRefresh(){
        getPosts();
    }

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
            //upon pressing anything inside the Pressable component (the Image)
            //a function will run which then invokes/runs another function called goToDetailsPage
            //and passes the information of the clicked item to the goToDetailsPage function as an argument
            renderItem = {({item}: {item: Photos}) => {
            return (
                <Pressable className="mb-6" onPress={() => {
                    goToDetailsPage(item)
                }}>
                    <Image className="h-96 w-100" source={{uri: item.Photo}}/>
                </Pressable>
            )
            }}
            keyExtractor={item => String(item.ID)} 
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
        />
    </View>
  );
}
