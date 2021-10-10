import React from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native"
import {dummyRankinglist} from "../dummyData/index"

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
                    <Text style={{ fontSize: 20 }}>{item.productname}</Text>
                    <Text style={{ fontSize: 20 }}>{item.price}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 20, borderWidth: 2, padding: 3, margin: 2, borderColor: 'blue', color: 'blue' }}>{item.like[0]}</Text>
                        <Text style={{ fontSize: 20, borderWidth: 2, padding: 3, margin: 2, borderColor: 'red', color: 'red' }}>{item.hate}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>    
    )
}

export const Cart = ({ navigation }) => {
    const renderItem = ({ item }) => (
        <Item item={item} />
    )
    return(
        <View>
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
    }
})

export default Cart;