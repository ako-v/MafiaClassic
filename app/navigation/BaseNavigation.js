import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import CharactersScreen from '../screens/CharactersScreen';
import HeaderNext from '../components/HeaderNext';
import colors from '../config/colors';
import DealScreen from '../screens/DealScreen';
import LaunchScreen from '../screens/LaunchScreen';
import HeaderDots from '../components/HeaderDots';
import {useTranslation} from 'react-i18next';
import {useEffect} from 'react/cjs/react.development';
import {useState} from 'react';

const Stack = createStackNavigator();

export default function BaseNavigation() {
  const {t} = useTranslation('title');
  const [homeTitle, setHomeTitle] = useState('');

  //general header and transition config
  const screenOptions = {
    headerStyle: {
      backgroundColor: colors.primary, //set background color of header
    },
    headerTitleStyle: {
      fontFamily: 'RobotoSlab-SemiBold', //change font weight and style
    },
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, //slide transition effect
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
        <Stack.Screen
          name="Home"
          options={{
            headerTitle: t('Home'),
            headerRight: () => <HeaderDots />,
          }}>
          {() => <LaunchScreen createNavigate="CivilianParty" />}
        </Stack.Screen>
        <Stack.Screen
          name="CivilianParty"
          options={({navigation}) => ({
            headerTitle: t('CivilianParty'),
            headerRight: () => (
              <HeaderNext onPress={() => navigation.push('MafiaParty')} />
            ),
          })}>
          {() => <CharactersScreen party="civilianParty" />}
        </Stack.Screen>
        <Stack.Screen
          name="MafiaParty"
          options={({navigation}) => ({
            headerTitle: t('MafiaParty'),
            headerRight: () => (
              <HeaderNext onPress={() => navigation.push('ThirdParty')} />
            ),
          })}>
          {() => <CharactersScreen party="mafiaParty" />}
        </Stack.Screen>
        <Stack.Screen
          name="ThirdParty"
          options={({navigation}) => ({
            headerTitle: t('ThirdParty'),
            headerRight: () => (
              <HeaderNext onPress={() => navigation.push('DealScreen')} />
            ),
          })}>
          {() => <CharactersScreen party="thirdParty" />}
        </Stack.Screen>
        <Stack.Screen
          name="DealScreen"
          options={{headerTitle: t('DealScreen')}}
          component={DealScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
