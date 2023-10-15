import React from "react";
import axios from "axios";
import {
  StatusBar,
  Alert,
  Text,
  FlatList,
  View,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Button,
} from "react-native";
import { Post } from "../components/Post";
import { Loading } from "../components/Loading";

export const HomeScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [items, setItems] = React.useState([]);

  const handleExit = () => {
    Alert.alert(
      "Выход из приложения",
      "Для выхода из приложения сделайте свайп снизу вверх",
      [
        { text: "Ок", style: "cancel" },
      ]
    );
  };

  const fetchPosts = () => {
    setIsLoading(true);
    axios
      .get("https://652b79aa4791d884f1fdd071.mockapi.io/posts")
      .then(({ data }) => {
        setItems(data);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Ошибка", "Не удалось загрузить статьи");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  React.useEffect(fetchPosts, []);

  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <View>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />
        }
        data={items}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('FullPost', {id: item.id, title: item.title})}>
            <Post
              title={item.title}
              imageUrl={item.imageUrl}
              createdAt={item.createdAt}
            />
          </TouchableOpacity>
        )}
      />
      <Button title="Выход" onPress={handleExit} />
    </View>
  );
}
