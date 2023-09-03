import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native'
import { addDoc, collection } from 'firebase/firestore'
import { db } from './firebase'
import { Formik } from 'formik'
import { AntDesign } from '@expo/vector-icons'
import { EvilIcons } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import Dropdown from './components/Dropdown'
import { RadioButton } from 'react-native-paper'

const states = [
  { key: 'الرياض', value: 'الرياض' },
  { key: 'مكة المكرمة', value: 'مكة المكرمة' },
  { key: 'المدينة المنورة', value: 'المدينة المنورة' },
  { key: 'القصيم', value: 'القصيم' },
  { key: 'الشرقية', value: 'الشرقية' },
  { key: 'عسير', value: 'عسير' },
  { key: 'تبوك', value: 'تبوك' },
  { key: 'حائل', value: 'حائل' },
  { key: 'الحدود الشمالية', value: 'الحدود الشمالية' },
  { key: 'جازان', value: 'جازان' },
  { key: 'نجران', value: 'نجران' },
  { key: 'الباحة', value: 'الباحة' },
  { key: 'الجوف', value: 'الجوف' },
  { key: 'المنطقة الشمالية الغربية', value: 'المنطقة الشمالية الغربية' },
]

function Register({ navigation }) {
  const [username, setUsername] = useState('')
  const [mobileNum, setMobileNum] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [city, setCity] = useState('')
  const [gender, setGender] = useState('')
  const [errors, setErrors] = useState({
    username: '',
    mobileNum: '',
    password: '',
    city: '',
    gender: '',
  })

  const genderOptions = [
    {
      label: 'ذكر',
      value: 'Male',
      Icon: <Ionicons name='male-outline' size={24} color='gray' />,
    },
    {
      label: 'أنثى',
      value: 'Female',
      Icon: <Ionicons name='female-outline' size={24} color='gray' />,
    },
  ]

  const submitHandler = async () => {
    if (username && mobileNum && password && city && gender) {
      if (!validatePassword(password)) {
        setErrors({
          ...errors,
          password:
            'Password must contain at least one special character and one capital letter.',
        })
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
      setErrors({
        username: username ? '' : 'اسم المستخدم مطلوب',
        mobileNum: mobileNum ? '' : 'رقم الهاتف مطلوب',
        password: password ? '' : 'كلمة المرور مطلوبة',
        city: city ? '' : 'المدينة مطلوبة',
        gender: gender ? '' : 'الجنس مطلوب',
      })
      console.log('errors: ', errors)
    }
  }

  const validatePassword = (password) => {
    const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
    const capitalLetter = /[A-Z]/
    return specialCharacters.test(password) && capitalLetter.test(password)
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {/* logo */}
      <Image style={styles.logo} source={require('../assets/logo.png')} />
      <Text style={styles.header}>تسجيل حساب جديد</Text>
      <View style={styles.form}>
        {/* Username */}
        <Text
          style={{ ...styles.label, color: !!errors.username ? 'red' : 'gray' }}
        >
          {!!errors.username ? errors.username : 'اسم المستخدم '}
          {!!!errors.username && <Text style={{ color: 'red' }}>*</Text>}
        </Text>
        <View
          style={{
            ...styles.field,
            borderColor: !!errors.username ? 'red' : '#ccc',
          }}
        >
          <AntDesign name='user' size={20} color='gray' />
          <TextInput
            style={styles.input}
            placeholder='اسم المستخدم'
            onChangeText={(text) => {
              setUsername(text)
              setErrors({
                ...errors,
                username: '',
              })
            }}
            value={username}
          />
        </View>

        {/* Phone Number */}
        <Text
          style={{
            ...styles.label,
            color: !!errors.mobileNum ? 'red' : 'gray',
          }}
        >
          {!!errors.mobileNum ? errors.mobileNum : 'رقم الهاتف '}
          {!!!errors.mobileNum && <Text style={{ color: 'red' }}>*</Text>}
        </Text>
        <View
          style={{
            ...styles.field,
            justifyContent: 'space-between',
            borderColor: errors.mobileNum ? 'red' : '#ccc',
          }}
        >
          <TextInput
            style={styles.input}
            placeholder='5********'
            onChangeText={(text) => {
              setMobileNum(text)
              setErrors({
                ...errors,
                mobileNum: '',
              })
            }}
            value={mobileNum}
            keyboardType='numeric'
          />

          <View style={styles.endEndorment}>
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
        <Text
          style={{ ...styles.label, color: !!errors.password ? 'red' : 'gray' }}
        >
          {!!errors.password ? errors.password : 'كلمة المرور '}
          {!!!errors.password && <Text style={{ color: 'red' }}>*</Text>}
        </Text>
        <View
          style={{
            ...styles.field,
            justifyContent: 'space-between',
            paddingRight: 30,
            borderColor: errors.password ? 'red' : '#ccc',
          }}
        >
          <View style={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <EvilIcons
              name='lock'
              size={24}
              color='gray'
              style={{ marginTop: 2 }}
            />
            <TextInput
              style={styles.input}
              placeholder='أدخل كلمة المرور'
              onChangeText={(text) => {
                setPassword(text)
                setErrors({
                  ...errors,
                  password: '',
                })
              }}
              value={password}
              secureTextEntry={!showPassword}
            />
          </View>
          <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
            {showPassword ? (
              <Ionicons name='eye-off-outline' size={24} color='gray' />
            ) : (
              <Ionicons name='md-eye-outline' size={24} color='gray' />
            )}
          </TouchableOpacity>
        </View>

        {/* City */}
        <Text
          style={{ ...styles.label, color: !!errors.city ? 'red' : 'gray' }}
        >
          {!!errors.city ? errors.city : 'المدينة '}
          {!!!errors.city && <Text style={{ color: 'red' }}>*</Text>}
        </Text>
        <View
          style={{
            ...styles.field,
            justifyContent: 'space-between',
            paddingRight: 30,
            position: 'relative',
            borderColor: errors.city ? 'red' : '#ccc',
          }}
        >
          <View
            style={{ display: 'flex', flexDirection: 'row-reverse', gap: 10 }}
          >
            <EvilIcons name='location' size={24} color='gray' />
            <Text
              style={{
                color: 'gray',
              }}
            >
              {city ? city : 'المدينة'}
            </Text>
          </View>
          <Dropdown
            label='Select Item'
            data={states}
            onSelect={(value) => {
              setCity(value)
              setErrors({
                ...errors,
                city: '',
              })
            }}
          />
        </View>

        {/* Gender */}
        <Text
          style={{ ...styles.label, color: !!errors.gender ? 'red' : 'gray' }}
        >
          {!!errors.gender ? errors.gender : 'الجنس '}
          {!!!errors.gender && <Text style={{ color: 'red' }}>*</Text>}
        </Text>
        <View style={styles.radioGroup}>
          {genderOptions.map(({ label, value, Icon }, index) => (
            <View
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'row-reverse',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <RadioButton.Android
                key={index}
                value={value}
                status={gender === value ? 'checked' : 'unchecked'}
                onPress={() => {
                  setGender(value)
                  setErrors({
                    ...errors,
                    gender: '',
                  })
                }}
                color='#49B0AC'
                uncheckedColor='lightgray'
                // thin border
              />
              {Icon}
              <Text
                style={{
                  fontSize: 16,
                  color: 'gray',
                }}
              >
                {label}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <Text
        style={{
          textAlign: 'center',
          color: 'gray',
          marginBottom: 40,
        }}
      >
        بالضغط على تسجيل الحساب، فإنك توافق على شروط وسياسة الخصوصية الخاصة
        بتطبيق أكرمها
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: '#49B0AC',
          padding: 20,
          borderRadius: 10,
          marginBottom: 20,
        }}
        onPress={submitHandler}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>تسجيل حساب</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 20,
          borderColor: '#49B0AC',
          borderWidth: 2,
          borderRadius: 10,
          marginBottom: 20,
        }}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={{ color: '#49B0AC', textAlign: 'center' }}>
          تسجيل دخول
        </Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
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
    position: 'relative',
    width: '100%',
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
  input: {
    width: '50%',
    textAlign: 'right',
  },
  endEndorment: {
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
  radioGroup: {
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: 30,
  },
})

export default Register
