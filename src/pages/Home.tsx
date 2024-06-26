import type { NativeStackScreenProps} from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, View } from "react-native";
import { Photos } from '../types/types';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { mainDb } from '../FirebaseConfig/Firebase';

export default function Home({navigation}: NativeStackScreenProps<any>){

    const [photos, setPhotos] = useState<Photos[]>([]);
    const [isRefreshing, setIsRefreshing] = useState(false);

    //get posts from backend/firebase and put them in photos state variable to use in FlatList
    const getPosts = async () => {

        try{
            setIsRefreshing(true);

            //get current photo ID which the new photo will have/be set to
            const refID = query(collection(mainDb, "PhotoDetails"), orderBy("Id", "desc"));
            let dataID = await getDocs(refID);

            //keep ID in a variable
            let photoDetails = dataID.docs.map((doc) => {
                return doc.data();
            });

            setPhotos(photoDetails as Photos[]);

        } catch(err) {
            console.error(err);

        } finally{
            setIsRefreshing(false);
        }
        
    }

    //useffect function only runs on first/initial render of the page
    //and calls the getPosts function to fill the photos state variable with data
    useEffect(() => {
        getPosts();
    }, [])

    //refreshes data by getting all posts again from the backend
    function handleRefresh(){
        getPosts();
    }

    //takes in the selected item as an argument
    //navigates to the Details page/screen and passes item data to the Details screen
    function goToDetailsPage(item: Photos){
        navigation.navigate("Details", item);
    }


  return (
    <View className='flex-1 bg-[#1A1C20]'>
        {/* The Flatlist will display all of photos that are stored in the backend */}
        <FlatList 
            data={photos}
            renderItem = {({item}: {item: Photos}) => {
            return (
                // pressable image generated which will go to the details page of the image
                <Pressable className="mb-6" onPress={() => { goToDetailsPage(item) } } >
                    <Image className="h-96 w-100" source={{uri: item.Photo}} />
                </Pressable>
            )}}
            keyExtractor={item => String(item.Id)} 
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
        />
    </View>
  );
}
