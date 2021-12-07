import React from "react";
import { useNavigation } from '@react-navigation/native';
import {dummyRankinglist} from "../dummyData/index"
import { TouchableOpacity, View, Text, FlatList, StyleSheet, Image } from "react-native"

function Item ({ item }) {
    const navigation = useNavigation();
    return(
        <TouchableOpacity style={[styles.item]} onPress={()=> {
            navigation.navigate('detailScreen', {item})
        }}>
            <View style={{ flexDirection: 'row' }}>
                <Image 
                    style={{ flex:1 }}
                    source={{
                        uri: 'http://placehold.it/100'
                    }}
                />
                <View style={{ flex:1, margin: 10}}>
                    <Text style={styles.text}>{item.productname}</Text>
                    <Text style={styles.text}>{item.price}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.likeKeyword}>{item.like[0]}</Text>
                        <Text style={styles.hateKeyword}>{item.hate}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>    
    )
}

export const Ranking = ({ navigation }) => {
    const renderItem = ({ item }) => (
        <Item item={item}/>
    )

    return(
        <View style={{ backgroundColor: "white" }}>
            <FlatList
                data={dummyRankinglist}
                renderItem={renderItem}
                keyExtractor={(item) => (item.productname)}
            ></FlatList>
        </View>
    )
}

const styles = StyleSheet.create({
    item:{
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16
    },
    hateKeyword:{
        fontSize: 20, 
        borderWidth: 2, 
        padding: 3, 
        margin: 2, 
        borderColor: 'red', 
        color: 'red'
    },
    likeKeyword:{
        fontSize: 20, 
        borderWidth: 2, 
        padding: 3, 
        margin: 2, 
        borderColor: 'blue', 
        color: 'blue'
    },
    text:{ 
        fontSize: 20 
    }
})
export default Ranking;