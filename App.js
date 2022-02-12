import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View, FlatList, TextInput, Button, Image } from 'react-native';
import React, { useState } from 'react'

export default function App() {

  const [recipeList, setRecipeList] = useState([]); 
  const [keyword, setKeyword] = useState('');
  
  const fetchRecipe = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
    .then(response => response.json())
    .then(responseData => setRecipeList(responseData.meals))
    .catch(error => {
      Alert.alert("Having error.", error.toString())
    })
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <FlatList
        style={{marginTop: 30}}
        keyExtractor={(item, index) => index.toString()} 
        renderItem={({ item }) => 
          <View>
            <Text>{item.strMeal}</Text>
            <Image style={{width: 100, height: 100}}
             source={{uri: item.strMealThumb}}/>
          </View>}
        data={recipeList} 
        ItemSeparatorComponent={listSeparator}/> 

      <View style={styles.inputContainer}>
        <TextInput style={{ textDecorationLine: 'underline'}} placeholder='Keyword' onChangeText={text => setKeyword(text)} />
        <Button title="Search" onPress={fetchRecipe} />  
      </View> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50
  }
});
