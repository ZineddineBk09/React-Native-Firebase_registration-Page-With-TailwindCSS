import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet } from 'react-native';
import { addDoc, collection } from "firebase/firestore";
import { db } from './firebase';

function Register({ navigation }) {
  const [username, setUsername] = useState('');
  const [mobileNum, setMobileNum] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('');

  const genderOptions = [
    { label: 'ذكر', value: 'Male' },
    { label: 'أنثى', value: 'Female' }
  ];

  const submitHandler = async () => {
    if (username && mobileNum && password && city && gender) {
      if (!validatePassword(password)) {
        alert('Password must contain at least one special character and one capital letter.');
        return;
      }

      try {
        await addDoc(collection(db, 'users'), {
          username,
          mobileNum,
          password,
          city,
          gender,
        });

        setUsername('');
        setMobileNum('');
        setPassword('');
        setCity('');
        setGender('');

        alert('Registration successful');
      } catch (e) {
        console.error("Error adding document: ", e);
        alert('An error occurred. Please try again.');
      }
    } else {
      alert('All fields are required.');
    }
  };

  const validatePassword = (password) => {
    const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const capitalLetter = /[A-Z]/;
    return specialCharacters.test(password) && capitalLetter.test(password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>تسجيل حساب جديد</Text>
      <View style={styles.form}>
        <Text className='text-3xl text-red-500'>اسم المستخدم</Text>
        <TextInput
          style={styles.input}
          placeholder="اسم المستخدم"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <Text>رقم الهاتف</Text>
        <TextInput
          style={styles.input}
          placeholder="5********"
          onChangeText={(text) => setMobileNum(text)}
          value={mobileNum}
          keyboardType="numeric"
        />
        <Text>كلمة المرور</Text>
        <TextInput
          style={styles.input}
          placeholder="كلمة المرور"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
        />
        <Text>المدينة</Text>
        <TextInput
          style={styles.input}
          placeholder="المدينة"
          onChangeText={(text) => setCity(text)}
          value={city}
        />
       <Text>الجنس</Text>
        <View style={styles.radioGroup}>
          {genderOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.radioButton, { borderColor: gender === option.value ? '#000' : '#ccc' }]}
              onPress={() => setGender(option.value)}
            >
              <View
                style={[
                  styles.radio,
                  gender === option.value && styles.selectedRadio
                ]}
              />
              <Text style={styles.radioLabel}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
       <Button title="تسجيل حساب" onPress={submitHandler} />
      </View>
      <Button title="تسجيل الدخول" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 8,
  },
});

export default Register;
