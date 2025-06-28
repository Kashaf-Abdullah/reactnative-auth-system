

import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/MaterialIcons'; // or FontAwesome, Ionicons, etc.

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  return (
    <Swiper
      style={styles.wrapper}
        autoplay={false}
    
       autoplayTimeout={3} // 3 seconds per slide
      showsButtons={false}
      dotColor="#ccc"
      activeDotColor="#000"
      loop={true}
    >
      <View style={styles.slide}>
        {/* <Text style={styles.text}>Welcome to Page 1</Text> */}
        <View style={styles.container}>
          <Text style={styles.heading}>Welcome to Personal Finance & Expense Tracker</Text>
          <Text style={styles.subheading}>Take control of your money.</Text>
         <Image
  source={require('../assets/homescreen1.png')}
  style={styles.image}
  resizeMode="contain" // 👈 move it here
/>

        </View>
      </View>
      <View style={styles.slide}>
         <View>
          <Text>Welcome to Personal Finance & Expense Tracker</Text>
          <Text>Track your expenses, set budgets, and never miss a bill again!</Text>
          <Image/>

        </View>
      </View>
      <View style={styles.slide}>
         <View>
          <Text>Welcome to Personal Finance & Expense Tracker</Text>
          <Text>Easy budget management</Text>
          <Image/>

        </View>
      </View>
     <View style={styles.slide}>
  <View style={styles.summaryContainer}>
    <View style={styles.borderedRow}>
      <Icon name="attach-money" size={22} color="#444" style={styles.icon} />
      <Text style={styles.text}>Simple expense tracking</Text>
    </View>
    <View style={styles.borderedRow}>
      <Icon name="notifications-active" size={22} color="#444" style={styles.icon} />
      <Text style={styles.text}>Smart reminders for bills</Text>
    </View>
    <View style={styles.borderedRow}>
      <Icon name="pie-chart" size={22} color="#444" style={styles.icon} />
      <Text style={styles.text}>Easy budget management</Text>
    <Icon name="home" size={30} color="#000" />
<Icon name="settings" size={30} color="#000" />

    </View>
  </View>
</View>


    </Swiper>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    width: width,
    height: height,
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
  },
heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'sans-serif',
  },
  subheading: {
    fontSize: 18,
    fontWeight: '400',
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 24,
    fontFamily: 'sans-serif-light',
  },
container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
    // backgroundColor: 'lightgray', // just to make area visible
  },summaryContainer: {
  paddingHorizontal: 20,
  gap: 15,
  width: '100%',
},

borderedRow: {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#444',
  borderRadius: 10,
  padding: 12,
  backgroundColor: '#fff',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 3,
},

icon: {
  marginRight: 10,
},

text: {
  fontSize: 16,
  color: '#333',
  flexShrink: 1,
},

});
 