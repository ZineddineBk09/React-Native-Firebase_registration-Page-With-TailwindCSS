import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  StyleSheet,
  Image,
} from 'react-native'
import { addDoc, collection } from 'firebase/firestore'
import { db } from './firebase'
import { AntDesign } from '@expo/vector-icons'

function Register({ navigation }) {
  const [username, setUsername] = useState('')
  const [mobileNum, setMobileNum] = useState('')
  const [password, setPassword] = useState('')
  const [city, setCity] = useState('')
  const [gender, setGender] = useState('')

  const genderOptions = [
    { label: 'ذكر', value: 'Male' },
    { label: 'أنثى', value: 'Female' },
  ]

  const submitHandler = async () => {
    if (username && mobileNum && password && city && gender) {
      if (!validatePassword(password)) {
        alert(
          'Password must contain at least one special character and one capital letter.'
        )
        return
      }

      try {
        await addDoc(collection(db, 'users'), {
          username,
          mobileNum,
          password,
          city,
          gender,
        })

        setUsername('')
        setMobileNum('')
        setPassword('')
        setCity('')
        setGender('')

        alert('Registration successful')
      } catch (e) {
        console.error('Error adding document: ', e)
        alert('An error occurred. Please try again.')
      }
    } else {
      alert('All fields are required.')
    }
  }

  const validatePassword = (password) => {
    const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
    const capitalLetter = /[A-Z]/
    return specialCharacters.test(password) && capitalLetter.test(password)
  }

  return (
    <View style={styles.container}>
      {/* logo */}
      <Image style={styles.logo} source={require('../assets/logo.png')} />

      <Text style={styles.header}>تسجيل حساب جديد</Text>
      <View style={styles.form}>
        {/* Username */}
        <Text style={styles.label}>اسم المستخدم</Text>
        <View style={styles.field}>
          <AntDesign name='user' size={24} color='gray' />
          <TextInput
            style={styles.input}
            placeholder='اسم المستخدم'
            onChangeText={(text) => setUsername(text)}
            value={username}
          />
        </View>

        {/* Phone Number */}
        <View style={{ ...styles.field, justifyContent: 'space-between' }}>
          <TextInput
            style={styles.input}
            placeholder='5********'
            onChangeText={(text) => setMobileNum(text)}
            value={mobileNum}
            keyboardType='numeric'
          />

          <View style={styles.flag}>
            <Image
              style={{
                width: 35,
                height: 25,
                objectFit: 'contain',
                borderRadius: 3,
              }}
              source={require('../assets/saudi.png')}
            />
            <Text>966</Text>
          </View>
        </View>

        {/* Password */}
        <Text style={styles.label}>كلمة المرور</Text>
        <View style={styles.field}>
          <AntDesign name='user' size={24} color='gray' />
          <TextInput
            style={styles.input}
            placeholder='كلمة المرور'
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
          />
        </View>
        <Text style={styles.label}>المدينة</Text>
        <TextInput
          style={styles.input}
          placeholder='المدينة'
          onChangeText={(text) => setCity(text)}
          value={city}
        />
        <Text style={styles.label}>الجنس</Text>
        <View style={styles.radioGroup}>
          {genderOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.radioButton,
                { borderColor: gender === option.value ? '#000' : '#ccc' },
              ]}
              onPress={() => setGender(option.value)}
            >
              <View
                style={[
                  styles.radio,
                  gender === option.value && styles.selectedRadio,
                ]}
              />
              <Text style={styles.radioLabel}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Button title='تسجيل حساب' onPress={submitHandler} />
      </View>
      <Button
        title='تسجيل الدخول'
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  header: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    marginBottom: 20,
  },
  field: {
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    borderColor: '#ccc',
    borderRadius: 11,
    borderWidth: 1,
    marginBottom: 20,
    marginRight: 3,
    paddingLeft: 20,
    gap: 15,
    height: 50,
  },
  label: {
    textAlign: 'right',
    marginBottom: 5,
    color: 'gray',
  },
  input: {},
  flag: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    overflow: 'hidden',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    gap: 5,
    paddingHorizontal: 20,
  },
})

export default Register
