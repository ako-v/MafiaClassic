import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';

import CharactersScreen from '../screens/CharactersScreen';
import HeaderNext from '../components/HeaderNext';
import colors from '../config/colors';
import DealScreen from '../screens/DealScreen';
import LaunchScreen from '../screens/LaunchScreen';
import HeaderDots from '../components/HeaderDots';

const Stack = createStackNavigator();

export default function BaseNavigation() {
  //options fot navigation and style of header of Parties screens
  const headerOptionsParties = navigation => {
    return screenName => ({
      headerRight: () => <HeaderNext onPress={() => navigation.push(screenName)} />,
    }); /*add button inside header for navigation*/
  };

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
          options={{headerTitle: 'Welcome', headerRight: () => <HeaderDots />}}
          component={LaunchScreen}
        />
        <Stack.Screen name="Civilian Party" options={({navigation}) => headerOptionsParties(navigation)('Mafia Party')}>
          {() => <CharactersScreen party="civilianParty" />}
        </Stack.Screen>
        <Stack.Screen name="Mafia Party" options={({navigation}) => headerOptionsParties(navigation)('Third Party')}>
          {() => <CharactersScreen party="mafiaParty" />}
        </Stack.Screen>
        <Stack.Screen name="Third Party" options={({navigation}) => headerOptionsParties(navigation)('Deal Screen')}>
          {() => <CharactersScreen party="thirdParty" />}
        </Stack.Screen>
        <Stack.Screen name="Deal Screen" options={{headerTitle: 'Veiw Your Role'}} component={DealScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
