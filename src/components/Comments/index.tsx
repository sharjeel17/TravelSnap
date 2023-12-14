import { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, TextInput, Alert} from 'react-native'
import { Comment, Photos, } from '../../types/types';
import {  arrayUnion, collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { auth, mainDb } from '../../FirebaseConfig/Firebase';

type Props = {
    photoId: number
}

export default function Comments({ photoId }: Props){
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState("");
    const [isRefreshing, setIsRefreshing] = useState(false);
    // const [user, setUser] = useState<UserInfo>();

    // async function getUserInfo(){
    //     try{
    //         const userRef = doc(mainDb, "Users", auth.currentUser!.uid);
    //         const userDocSnap = await getDoc(userRef);
    //         const userInfo = userDocSnap.data();
    //         console.log(userInfo);
    //         setUser({username: userInfo!.Username, posts: userInfo!.Posts})
    //         console.log(user);
    //     }catch(err){
    //         console.log(err);
    //     }
        
    // }

    async function getComments(){
        try{
            setIsRefreshing(true);

            const ref = doc(mainDb, "PhotoDetails", String(photoId));
            const docSnap = await getDoc(ref);
            const details = docSnap.data() as Photos;
            setComments([]);
            var allComments: Comment[] = [];
            for(let i = 0; i < details.Comments.length; i++){
                console.log(i);
                let docRef = doc(mainDb, "Comments", String(details.Comments[i]));
                const commentsDocSnap = await getDoc(docRef);
                allComments.push(commentsDocSnap.data() as Comment);
            }
            setComments(allComments);

        } catch(err) {
            console.error(err);

        } finally{
            setIsRefreshing(false);
        }
    }
    async function UploadComment(){
        if(newComment === ""){
            Alert.alert("Cannot submit empty comment");
            return;
        }

        try{
            //get current comment ID which the new comment will have/be set to
            //this ID is used to reference the Comments documents
            //instead of using firestore's auto generated IDs (easier to sort this way).
            
            //first get all documents from the CommentIdInc collection
            const refID = collection(mainDb, "CommentIdInc");
            let dataID = await getDocs(refID);

            //then extract data from the document from the CommentIdInc collection
            //and set the value of the field "ID" to the commentID variable
            let commentIDArr = dataID.docs.map((doc) => {
                return doc.data();
            });
            let commentID: number = commentIDArr[0]["ID"];


            const ref = doc(mainDb, "Comments", String(commentID));
            await setDoc(ref, {CommentID: commentID, Comment: newComment, PostedBy: "randomuser123", PostedById: auth.currentUser?.uid});

      
            const userDoc = doc(mainDb, "PhotoDetails", String(photoId));
            await updateDoc(userDoc, {
                Comments: arrayUnion(commentID)
            });

            //increment ID, used for referencing Comments documents, by 1
            const currentIdDoc = doc(mainDb, "CommentIdInc", "VbkMQKClznOzVLdnXfbn");
            commentID++;
            await updateDoc(currentIdDoc, {ID: commentID});
            Alert.alert("Comment uploaded");
            setNewComment("");
            handleRefresh();

        } catch(err){
            console.log(err);
        }
    }

    function handleRefresh(){
        getComments();
    }

    useEffect(() => {
        getComments();
    }, [])



  return (
    
        <>
        <FlatList
            className='mt-4 h-28 mx-2' 
            data={comments}
            renderItem = {({item}: {item: Comment}) => {
            return (
                <View className='mb-2 px-2 bg-[#F6f6f6] shadow-lg rounded-md'>
                    <Text className='pb-1'>Posted by: {item.PostedBy}</Text>
                    <Text>{item.Comment}</Text>
                </View>
            )}}
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
        />
            <View className='mt-2'>
                <TextInput  
                className='bg-[#F6f6f6] px-2 py-3 mb-3 rounded-lg border-x-2 mx-1'
                placeholder='type comment'
                onChangeText={setNewComment}
                value={newComment}/>
                <Button title="send" onPress={UploadComment}/>
            </View>
            </>
  )
}