import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Main from '../src/components/pages/Main';
import Login from '../src/components/pages/Login';
import Register from '../src/components/pages/Register';
import Cart from "../src/components/pages/Cart";
import Detail from "../src/components/pages/Detail";
import HateKeyword from "../src/components/pages/HateKeyword";
import LikeKeyword from "../src/components/pages/LikeKeyword";
import Ranking from "../src/components/pages/Ranking";

const HomeStack = createNativeStackNavigator();
const CartStack = createNativeStackNavigator();
// const AuthStack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator initialRouteName="MainScreen">
      <HomeStack.Screen 
        name="MainScreen" 
        component={Main} 
        options={{ title: "PSA", headerStyle: { backgroundColor: '#000080' }, headerTintColor: '#fff'}} 
      />
      {/* <HomeStack.Screen name="loginScreen" component={Login} options={{ title: "로그인", headerStyle: { backgroundColor: '#000080' }, headerTintColor: '#fff'}} />
      <HomeStack.Screen name="registerScreen" component={Register} options={{ title: "회원가입", headerStyle: { backgroundColor: '#000080' }, headerTintColor: '#fff'}} /> */}
      <HomeStack.Screen name="likeKeywordScreen" component={LikeKeyword} options={{ title: "Keyword", headerStyle: { backgroundColor: '#000080' }, headerTintColor: '#fff'}} />
      <HomeStack.Screen name="hateKeywordScreen" component={HateKeyword} options={{ title: "Keyword", headerStyle: { backgroundColor: '#000080' }, headerTintColor: '#fff'}}/>
      <HomeStack.Screen name="rankingScreen" component={Ranking} options={{ title: "Items", headerStyle: { backgroundColor: '#000080' }, headerTintColor: '#fff'}}/>
      <HomeStack.Screen name="detailScreen" component={Detail} options={{ title: "상세페이지", headerStyle: { backgroundColor: '#000080' }, headerTintColor: '#fff'}}/>
    </HomeStack.Navigator>
  )
}

function CartStackScreen() {
  return (
    <CartStack.Navigator initialRouteName="CartScreen">
      <CartStack.Screen name="CartScreen" component={Cart} options={{ title: "Cart", headerStyle: { backgroundColor: '#000080' }, headerTintColor: '#fff'}}/>
      <CartStack.Screen name="detailScreen" component={Detail} options={{ title: "상세페이지", headerStyle: { backgroundColor: '#000080' }, headerTintColor: '#fff'}}/>
    </CartStack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <HomeStack.Navigator initialRouteName="MainScreen">
        <HomeStack.Screen 
          name="MainScreen" 
          component={Main} 
          options={{ title: "PSA", headerStyle: { backgroundColor: '#000080' }, headerTintColor: '#fff'}} 
        />
        <HomeStack.Screen name="likeKeywordScreen" component={LikeKeyword} options={{ title: "Keyword", headerStyle: { backgroundColor: '#000080' }, headerTintColor: '#fff'}} />
        <HomeStack.Screen name="hateKeywordScreen" component={HateKeyword} options={{ title: "Keyword", headerStyle: { backgroundColor: '#000080' }, headerTintColor: '#fff'}}/>
        <HomeStack.Screen name="rankingScreen" component={Ranking} options={{ title: "Items", headerStyle: { backgroundColor: '#000080' }, headerTintColor: '#fff'}}/>
        <HomeStack.Screen name="detailScreen" component={Detail} options={{ title: "상세페이지", headerStyle: { backgroundColor: '#000080' }, headerTintColor: '#fff'}}/>
      </HomeStack.Navigator>
    </NavigationContainer>
  )
};

