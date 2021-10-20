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
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <Text style={[styles.title, textColor]}>{item.title}</Text>
    </TouchableOpacity>    
)

export const LikeKeyword = ({ navigation }) => {
    const [selecedId, setSelected] = useState(null);

    const renderItem = ({ item }) => {
        const backgroundColor = item.id === selecedId ? "blue" : "white";
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
        <View style={styles.container}>
            <View style={styles.information}> 
                <Text style={styles.text}>선호 특징을 선택해주세요!</Text>
                <Text style={styles.textInfo}>선택한 키워드에 대한 긍정적인 리뷰가 많은 순으로 상품이 보여집니다.</Text>
            </View>
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
            <Button title="Go" onPress={() => navigation.navigate('hateKeywordScreen')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        backgroundColor: 'white' 
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderWidth:2, 
        width:'41%'
    },
    title: {
        fontSize: 32,
        flex: 2, 
        textAlign: 'center'
    },
    information:{
        height: '30%', 
        justifyContent: 'center'
    },
    text:{ 
        textAlign: 'center', 
        fontSize: 30
    },
    textInfo:{ 
        textAlign: 'center', 
        fontSize: 13, 
        marginTop: 15 
    }
})

export default LikeKeyword;