import * as React from 'react';
import { StyleSheet, Text, Button, View, ImageBackground, Pressable } from 'react-native';
import auth from '@react-native-firebase/auth';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { ErrorMessage, Formik } from 'formik';
import * as Yup from 'yup';

import HomeScreen from './InfluencerScreen';

const SignInScreen = ({ navigation, route }) => {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email('Invalid email address')
          .required('Required'),
        password: Yup.string()
          .min(6, 'Must be 6 characters or more')
          .required('Required'),
      })}
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
        auth()
          .signInWithEmailAndPassword(values.email, values.password)
          .catch((error) => {
            if (error.code === 'auth/user-not-found') {
              actions.setFieldError('email', 'Couldn\'t find your email address');
            }
            if (error.code === 'auth/wrong-password') {
              actions.setFieldError('password', 'Wrong password');
            }
          })
      }}>
      {formik => (
        <View style={styles.container}>
          <ImageBackground source={require('../assets/images/sign_in_wallpaper.png')} style={styles.background}>
            <View style={styles.form}>
              <Text style={styles.title}>Fincer</Text>
              <Text style={styles.titleDesc}>finding influencer</Text>
      
              <TextInput
                style={styles.textInput}
                placeholder='E-mail'
                placeholderTextColor='#222832'
                onChangeText={formik.handleChange('email')}
                onBlur={formik.handleBlur('email')}
                value={formik.values.email}/>
              { formik.touched.email && formik.errors.email &&
                <Text style={styles.errorText}>{ formik.errors.email }</Text>
              }
              
              <TextInput
                style={styles.textInput}
                placeholder='Kata Sandi'
                placeholderTextColor='#222832'
                secureTextEntry
                onChangeText={formik.handleChange('password')}
                onBlur={formik.handleBlur('password')}
                value={formik.values.password}/>
              { formik.touched.password && formik.errors.password &&
                <Text style={styles.errorText}>{ formik.errors.password }</Text>
              }
      
              <View style={styles.centeredText}>
                <Text style={styles.blackText}>tidak memiliki akun? </Text>
                <Pressable
                  onPress={() => navigation.navigate('SignUp')}>
                  <Text style={styles.orangeText}>ayo daftar</Text>
                </Pressable>
              </View>
      
              <TouchableOpacity
                onPress={formik.handleSubmit}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>MASUK</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      )}
    </Formik>
  );
}

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '50%',
    justifyContent: 'flex-end',
  },
  form: {
    height: '60%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 36,
  },
  title: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 40,
    color: '#222832',
  },
  titleDesc: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#FFAB8D',
  },
  errorText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#EA3C53',
  },
  textInput: {
    fontFamily: 'Montserrat-Regular',
    backgroundColor: '#F2F2F2',
    color: '#222832',
    marginTop: 24,
    borderRadius: 15,
    padding: 10,
  },
  centeredText: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  blackText: {
    fontFamily: 'Montserrat-Regular',
    color: '#222832',
  },
  orangeText: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#FFAB8D',
  },
  button: {
    marginTop: 15,
    backgroundColor: '#FF8D6F',
    width: 207,
    alignSelf: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
  },
  buttonText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    color: 'white',
  }
});