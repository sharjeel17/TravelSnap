import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore';
import { auth, mainDb } from '../../FirebaseConfig/Firebase';
import { Photos, UserInfo } from '../../types/types';

export default function MyPhotos(){
    const [photos, setPhotos] = useState<Photos[]>([]);

    async function getPhotos(){
        try{
            const ref = doc(mainDb, "Users", auth.currentUser!.uid);
            const docSnap = await getDoc(ref);
            const details = docSnap.data() as UserInfo;
            setPhotos([]);
            var allPhotos: Photos[] = [];

            for(let i = 0; i < details.Posts.length; i++){
                console.log(i);
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
      <Text> MyPhotos</Text>
      <FlatList 
      className="h-24 w-3/4"
      data={photos}
      renderItem = {({item}: {item: Photos}) => {
        return (
            <View>
                <Image className="h-1/3 w-1/3" source={{uri: item.Photo}}/>
            </View>
        )}}
      />
    </View>
  )
}

