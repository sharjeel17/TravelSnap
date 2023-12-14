import { View, Text, TextInput, Button, ActivityIndicator, KeyboardAvoidingView, ScrollView, Alert } from 'react-native'
import { useState } from 'react'
import { auth } from '../FirebaseConfig/Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useHeaderHeight } from '@react-navigation/elements'
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export default function Login({navigation}: NativeStackScreenProps<any>){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loadingLogin, setLoadingLogin] = useState(false);
    const height = useHeaderHeight();

    //function to sign user in
    async function SignIn(){

        //validation
        if(email === '' || password === ''){
            Alert.alert("Please enter email and password");
            return;
        }
        
        try{
            setLoadingLogin(true);
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log('IS EMAIL VERIFIED',response.user.emailVerified);
        } catch(err){
            console.log(err);
            Alert.alert("Error signing in, please re-check email and password");
        }finally{
            setLoadingLogin(false);
        }
        
    }

    return (
        <ScrollView className='flex bg-[#1A1C20] px-3 space-y-1 py-[50%]'>
        {/* <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={height + 47} className='bg-white'> */}
            <Text className="text-lg font-light text-[#FFF6F6] mx-2 mt-10">Email</Text>
            <TextInput 
                className='bg-white px-2 py-3 mb-5 rounded-lg border-x-2 mx-1'
                placeholder='Enter your email' 
                value={email} 
                onChangeText={setEmail} 
                autoCapitalize='none'
                autoCorrect/>

            <Text className="text-lg font-light text-[#FFF6F6] mx-2">Password</Text>
            <TextInput 
                className='bg-white px-2 py-3 mb-5 rounded-lg border-x-2 mx-1'
                placeholder='Enter your password' 
                value={password} 
                onChangeText={setPassword} 
                autoCapitalize='none' 
                autoCorrect={false} 
                secureTextEntry />
            
            {loadingLogin ? (<ActivityIndicator size="large" />) : (
            <View className='flex-row gap-4 justify-center'>
                <Button title='Sign In' onPress={SignIn}/>
                <Button title='Sign Up'onPress={() => {navigation.navigate("Register")}}/>
            </View>
            )}

        {/* </KeyboardAvoidingView> */}
        </ScrollView>
    )
}