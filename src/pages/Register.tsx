import { View, Text, Alert, ScrollView, TextInput, ActivityIndicator, Button } from 'react-native'
import { auth } from '../FirebaseConfig/Firebase';
import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

export default function Register(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [loadingLogin, setLoadingLogin] = useState(false);

    //validate entered input
    //invalid will return false and valid will return true
    function validateInput(){

        //validation
        if(username === ''){
            Alert.alert("Please enter a name");
            return false;
        }

        if(email === ''){
            Alert.alert("Please enter email");
            return false;
        }

        if (password === ''){
            Alert.alert("Please enter a password");
            return false;
        }

        if(password.length < 6){
            Alert.alert("Password error", "Password must be at least 6 characters long");
            return false;
        }
        //validation
        if (repassword !== password){
            Alert.alert("Passwords do not match");
            return false;
        }
        return true;
    }

    //function to register the user
    async function SignUp(){

        //validation
        if(!validateInput()){
            return;
        }

        //create user and set displayname as user's entered name
        try{
            setLoadingLogin(true);
            const response = await createUserWithEmailAndPassword(auth,email, password);
            auth.signOut();
            setUsername('');
            setEmail('');
            setPassword('');
            setRepassword('');
        }catch(err){
            console.log(err);
            Alert.alert("Error signing up", "Email or Username may already be in use");
        }finally{
            setLoadingLogin(false);
        }
        
    }
  return (
    <ScrollView className='flex-1 bg-gray-600'>
        {/* <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={height + 47} className='bg-white'> */}
            <Text className="text-lg mx-2 mt-10">Name</Text>
            <TextInput 
                className='bg-white px-2 py-3 mb-5 rounded-lg border-x-2 mx-1'
                placeholder='Enter your name' 
                value={username} 
                onChangeText={setUsername} 
                autoCapitalize='none'
                autoCorrect/>

            <Text className="text-lg mx-2">Email</Text>
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

            <Text className="text-lg mx-2">Re-enter Password</Text>
            <TextInput 
                className='bg-white px-2 py-3 mb-5 rounded-lg border-x-2 mx-1'
                placeholder='Enter your password' 
                value={repassword} 
                onChangeText={setRepassword} 
                autoCapitalize='none' 
                autoCorrect={false} 
                secureTextEntry />
            
            {loadingLogin ? (<ActivityIndicator size="large" />) : (
                <Button title='Sign Up' onPress={SignUp}/>
            )}

        {/* </KeyboardAvoidingView> */}
        </ScrollView>
  )
}
