import React from 'react';

// Navigation related imports
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Design related imports
import Ionicons from 'react-native-vector-icons/Ionicons';
import LogoTextForHeader from '../components/atoms/display/LogoTextForHeader';
import colors from '../../colors';

// Importing the screens
// HomeStack
import HomeScreen from '../screens/HomeStack/HomeScreen';
import EditPostScreen from '../screens/ProfileStack/EditPostScreen';
import ProfileScreen from '../screens/HomeStack/ProfileScreen';
import CompanyScreen from '../screens/HomeStack/CompanyScreen';
import CommentsScreen from '../screens/HomeStack/CommentsScreen';

// Explore Stack
import ExploreScreen from '../screens/ExploreStack/ExploreScreen';

// ProfileStack
import MyProfileScreen from '../screens/ProfileStack/MyProfileScreen';
import EditUserScreen from '../screens/ProfileStack/EditUserScreen';
import EditServiceScreen from '../screens/ProfileStack/EditServiceScreen';
import MyCompanyScreen from '../screens/ProfileStack/MyCompanyScreen';
import EditAppointmentcreen from '../screens/ProfileStack/EditAppointmentScreen';
import MyCommentsScreen from '../screens/ProfileStack/MyCommentsScreen';

// Storing the tab names in variables
const homeName = 'Home';
const exploreName = 'Explore';
const profileName = 'Profile';

// Creating stack navigators for the three main parts of the app
const HomeStack = createStackNavigator();
const ExploreStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{ headerTitle: (props) => <LogoTextForHeader {...props} /> }}
    >
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="ProfileScreen" component={ProfileScreen} />
      <HomeStack.Screen name="CompanyScreen" component={CompanyScreen} />
      <HomeStack.Screen name="CommentsScreen" component={CommentsScreen} />
    </HomeStack.Navigator>
  );
};

const ExploreStackScreen = () => {
  return (
    <ExploreStack.Navigator
      screenOptions={{ headerTitle: (props) => <LogoTextForHeader {...props} /> }}
    >
      <ExploreStack.Screen name="ExploreScreen" component={ExploreScreen} />
    </ExploreStack.Navigator>
  );
};

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{ headerTitle: (props) => <LogoTextForHeader {...props} /> }}
    >
      <ProfileStack.Screen name="MyProfileScreen" component={MyProfileScreen} />
      <ProfileStack.Screen
        name="EditUserScreen"
        component={EditUserScreen}
        options={{
          headerTitle: 'User',
          headerStyle: { backgroundColor: colors.secondaryDark },
          headerTintColor: colors.white,
        }}
      />
      <ProfileStack.Screen
        name="EditServiceScreen"
        component={EditServiceScreen}
        options={{
          headerTitle: 'Service',
          headerStyle: { backgroundColor: colors.secondaryDark },
          headerTintColor: colors.white,
        }}
      />
      <ProfileStack.Screen
        name="EditPostScreen"
        component={EditPostScreen}
        options={{
          headerTitle: 'Post',
          headerStyle: { backgroundColor: colors.secondaryDark },
          headerTintColor: colors.white,
        }}
      />
      <ProfileStack.Screen
        name="EditAppointmentScreen"
        component={EditAppointmentcreen}
        options={{
          headerTitle: 'Appointment',
          headerStyle: { backgroundColor: colors.secondaryDark },
          headerTintColor: colors.white,
        }}
      />
      <ProfileStack.Screen name="MyCommentsScreen" component={MyCommentsScreen} />
      <ProfileStack.Screen name="MyCompanyScreen" component={MyCompanyScreen} />
    </ProfileStack.Navigator>
  );
};

// Creating a tab navigator for the previously created stack navigators
// Every stack has a main screen which is available from the bottom tab navigation

const Tab = createBottomTabNavigator();

export default function AppStack() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={profileName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let routName = route.name;

            if (routName === homeName) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (routName === exploreName) {
              iconName = focused ? 'search' : 'search-outline';
            } else if (routName === profileName) {
              iconName = focused ? 'ios-person' : 'ios-person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.gray,

          headerShown: false,
        })}
      >
        <Tab.Screen name={homeName} component={HomeStackScreen} />
        <Tab.Screen name={exploreName} component={ExploreStackScreen} />
        <Tab.Screen name={profileName} component={ProfileStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
