import React, {useState} from "react";
import { FlatList, StyleSheet, TouchableOpacity, View, Text, Button } from "react-native"

const DATA = [
    {
        id: "1",
        title: "가격"
    },
    {
        id: "2",
        title: "실용성"
    },
    {
        id: "3",
        title: "착용감"
    },
    {
        id: "4",
        title: "촉감"
    },
    {
        id: "5",
        title: "재질"
    },

]

const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor, {borderWidth:2, width:'41%'}]}>
        <Text style={[styles.title, textColor, {flex: 2, textAlign: 'center'}]}>{item.title}</Text>
    </TouchableOpacity>    
)

export const HateKeyword = ({ navigation }) => {
    const [selecedId, setSelected] = useState(null);

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selecedId ? "red" : "white";
        const color = item.id === selecedId ? 'white' : 'black';

        return(
            <Item
                item={item}
                onPress={() => setSelected(item.id)}
                backgroundColor={{ backgroundColor }}
                textColor={{ color }}
            />
    )
    }
    return(
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ height: '30%' }}/>
            <View style={{ alignItems: 'center' }}>
                <FlatList
                    horizontal= {false}
                    numColumns= {2}
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    extraData={selecedId}
                />
            </View>
            <Button title="Go" onPress={() => navigation.navigate('rankingScreen')} />
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    }
})

export default HateKeyword;