import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./screens/HomeScreen"
import JeuDetails from "./screens/Jeu-detail"
import ScoreScreen from './screens/ScoreScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Accueil" component={HomeScreen} />
        <Stack.Screen name="Detail" component={JeuDetails} />
        <Stack.Screen name="ScoreScreen" component={ScoreScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}