import React, { useContext, useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ForgotScreen from "../screens/ForgotScreen";
import HomeScreen from "../screens/HomeScreen";
import SavingsScreen from "../screens/SavingsScreen";
import InvestmentScreen from "../screens/InvestmentScreen";
import MemberScreen from "../screens/MemberScreen";
import ResolveAuthScreen from "../screens/ResolveAuthScreen";
import { Context as AuthContext } from "../context/AuthContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RegisterMemberScreen from "../screens/RegisterMemberScreeen";
import RegisterSuccessScreen from "../screens/RegisterSuccessScreen";
import EditMemberScreen from "../screens/EditMemberScreen";
import ResignScreen from "../screens/ResignScreeen";
import EditResignScreen from "../screens/EditResignScreen";
import UploadSavingsScreen from "../screens/UploadSavingsScreen";
import DetailTagihan from "../screens/DetailTagihan";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Member = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
      initialRouteName="MemberRoot"
    >
      <Stack.Screen name="MemberRoot" component={MemberScreen} />
    </Stack.Navigator>
  );
};

const Tagihan = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Savings" 
        component={SavingsScreen} 
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="TagihanDetail"
        component={DetailTagihan}
      />
    </Stack.Navigator>
  )
}

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "#1a0dcc",
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarStyle: {
          paddingTop: 10,
          paddingBottom: 10,
          height: 60,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Beranda",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Member}
        options={{
          tabBarLabel: "Keanggotaan",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Savings"
        component={Tagihan}
        options={{
          
          tabBarLabel: "Simpan Pinjam",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="scale-balance"
              color={color}
              size={size}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Savings"
        component={SavingsScreen}
        options={{
          tabBarLabel: "Simpan Pinjam",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="scale-balance"
              color={color}
              size={size}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Investment"
        component={InvestmentScreen}
        options={{
          tabBarLabel: "Investasi",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="chart-areaspline"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Router = () => {
  const { state } = useContext(AuthContext);
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(state.token);
  }, [state]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
      initialRouteName="ResolveAuth"
    >
      {!token ? (
        <Stack.Group>
          <Stack.Screen name="ResolveAuth" component={ResolveAuthScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Forgot" component={ForgotScreen} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="Tabs" component={MyTabs} />
          <Stack.Screen
            name="RegisterMember"
            component={RegisterMemberScreen}
          />
          <Stack.Screen name="EditMember" component={EditMemberScreen} />
          <Stack.Screen
            name="RegisterSuccess"
            component={RegisterSuccessScreen}
          />
          <Stack.Screen name="Resign" component={ResignScreen} />
          <Stack.Screen name="EditResign" component={EditResignScreen} />
          <Stack.Screen name="UploadSavings" component={UploadSavingsScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default Router;
