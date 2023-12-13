import { View, Text, TextInput, Button, ActivityIndicator, KeyboardAvoidingView, ScrollView, Alert } from 'react-native'
import { useState } from 'react'
import { auth } from '../FirebaseConfig/Firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useHeaderHeight } from '@react-navigation/elements'

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loadingLogin, setLoadingLogin] = useState(false);
    const height = useHeaderHeight();

    async function SignIn(){

        if(email === '' || password === ''){
            Alert.alert("Please enter email and password");
        }

        try{
            setLoadingLogin(true);
            const response = await signInWithEmailAndPassword(auth, email, password);

        } catch(err){
            console.log(err);
            Alert.alert("Error signing in");
        }
        setLoadingLogin(true);

    }

    async function SignUp(){

        if(email === '' || password === ''){
            Alert.alert("Please enter email and password");
        }

        try{
            setLoadingLogin(true);
            const response = await createUserWithEmailAndPassword(auth, email, password);
        }catch(err){
            console.log(err);
            Alert.alert("Error signing up");
        }
        setLoadingLogin(false);
    }

    return (
        <ScrollView className='flex-1 bg-gray-600'>
        {/* <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={height + 47} className='bg-white'> */}
            <Text className="text-lg mx-2 mt-10">Email</Text>
            <TextInput 
                className='bg-white px-2 py-3 mb-5 rounded-lg border-x-2 mx-1'
                placeholder='Enter your email' 
                value={email} 
                onChangeText={setEmail} 
                autoCapitalize='none'
                autoCorrect/>

            <Text className="text-lg mx-2">Password</Text>
            <TextInput 
                className='bg-white px-2 py-3 mb-5 rounded-lg border-x-2 mx-1'
                placeholder='Enter your password' 
                value={password} 
                onChangeText={setPassword} 
                autoCapitalize='none' 
                autoCorrect={false} 
                secureTextEntry />
            
            {/* {loadingLogin ? (<ActivityIndicator size="large" />) : ( */}
            <View className='flex-row gap-4 justify-center'>
                <Button title='Sign In' onPress={SignIn}/>
                <Button title='Sign Up'onPress={SignUp}/>
            </View>
            {/* )} */}

        {/* </KeyboardAvoidingView> */}
        </ScrollView>
    )
}