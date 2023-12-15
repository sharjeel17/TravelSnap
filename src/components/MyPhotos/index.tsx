import { View, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore';
import { auth, mainDb } from '../../FirebaseConfig/Firebase';
import { Photos, UserInfo } from '../../types/types';

export default function MyPhotos(){
    const [photos, setPhotos] = useState<Photos[]>([]);


    async function getPhotos(){
        try{
            //get current user's user info from backend
            const ref = doc(mainDb, "Users", auth.currentUser!.uid);
            const docSnap = await getDoc(ref);
            const details = docSnap.data() as UserInfo;

            setPhotos([]);
            var allPhotos: Photos[] = [];

            //get all photos from PhotoDetails using their Ids
            //Ids were stored in Posts array in Users collection
            for(let i = 0; i < details.Posts.length; i++){
                let docRef = doc(mainDb, "PhotoDetails", String(details.Posts[i]));
                const photosDocSnap = await getDoc(docRef);
                allPhotos.push(photosDocSnap.data() as Photos);
            }

            setPhotos(allPhotos);

        } catch(err){
            console.error(err)
        }
    }

    useEffect(() => {
        getPhotos();
    }, []);

  return (
    <View>
      <FlatList 
      className="flex-row mx-5 h-2/3 rounded-lg bg-white  shadow-black"
      data={photos}
      renderItem = {({item}: {item: Photos}) => {
        return (
            <View className="w-36 h-36">
                <Image className="h-full w-full rounded-md" source={{uri: item.Photo}} />
            </View>
        )}}
      />
    </View>
  )
}

