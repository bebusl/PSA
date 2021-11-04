import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native"
import AntDesign from 'react-native-vector-icons/AntDesign';

function Detail({ route, navigation }){
    const {item} = route.params;
    return(
        <View style={styles.container}>
            <View style={styles.productInfo}>
                <Image 
                    style={styles.image}
                    source={{
                    uri: 'http://placehold.it/100'
                    }}
                />
                <View style={styles.image}>
                    <Text style={styles.productName}>{item.productname}</Text>
                    <Text style={styles.productPrice}>가격: {item.price}</Text>
                </View>       
            </View>
            <View style={styles.listBox}>
                <Text style={styles.text}>대표키워드</Text>
                <Text style={styles.likeKeyword}>{item.like[0]}</Text>
                <Text style={styles.hateKeyword}>{item.hate}</Text>
            </View>
            <ScrollView>
                <View style={styles.wordCloud}>
                    <Text style={styles.text}>워드클라우드</Text>
                    <Image 
                    style={styles.image}
                    source={{
                        uri: 'http://placehold.it/100'
                    }}
                />
                </View>
                <View style={styles.wordChart}>
                    <Text style={styles.text}>긍부정분석</Text>
                    <Image 
                    style={styles.image}
                    source={{
                        uri: 'http://placehold.it/100'
                    }}
                />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "white"
    },
    image:{
        flex:1, 
        margin: 10
    },
    productInfo:{
        flexDirection: 'row', 
        height: "20%"
    },
    wordCloud:{
        flex: 1, 
        height: 300, 
        padding: 10 
    },
    wordChart:{
        flex: 1, 
        height: 300, 
        padding: 10
    },
    cartBtn:{
        flex: 1, 
        flexDirection: 'row', 
        margin: 5, 
        backgroundColor: "#000080", 
        borderRadius: 50, 
        justifyContent: 'center'
    },
    cartBtnText:{
        color: 'white', 
        fontSize: 15, 
        justifyContent: 'center',
        marginTop: 10
    },
    icon:{
        justifyContent: 'center', 
        margin: 3
    },
    text:{
        fontSize: 20, 
        margin: 10
    },
    hateKeyword:{
        fontSize: 20, 
        borderWidth: 2, 
        padding: 5, 
        margin: 3, 
        borderColor: 'red', 
        color: 'red'
    },
    likeKeyword:{
        fontSize: 20, 
        borderWidth: 2, 
        padding: 5, 
        margin: 3, 
        borderColor: 'blue', 
        color: 'blue'
    },
    productName:{ 
        flex: 1, 
        fontSize: 20, 
        margin: 10,
        fontWeight: 'bold',
        paddingTop: 20
    },
    productPrice:{ 
        flex: 1, 
        fontSize: 15, 
        margin: 10 
    },
    listBox:{
        flexDirection: 'row', 
        height: "10%", 
        alignContent: 'center', 
        alignItems: 'center', 
        padding: 10
    }
})

export default Detail;