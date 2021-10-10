import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native"
import AntDesign from 'react-native-vector-icons/AntDesign';

function Detail({ route, navigation }){
    const {item} = route.params;
    return(
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', height: "30%"}}>
                <Image 
                    style={{ flex:1, margin: 10 }}
                    source={{
                    uri: 'http://placehold.it/100'
                    }}
                />
                <View style={{ flex:1, margin: 10 }}>
                    <Text style={{ flex: 1, fontSize: 20, margin: 10}}>{item.productname}</Text>
                    <Text style={{ flex: 1, fontSize: 15, margin: 10 }}>가격: {item.price}</Text>
                    <TouchableOpacity style={{ flex: 1, flexDirection: 'row', margin: 5, backgroundColor: "#000080", borderRadius: 50, justifyContent: 'center' }} onPress={() => navigation.navigate('CartScreen')}>
                        <Text style={{ color: 'white', fontSize: 15, justifyContent: 'center', marginTop: 10 }}>장바구니에 넣기</Text>
                        <View style={{ justifyContent: 'center', margin: 3 }}>
                            <AntDesign name='shoppingcart' size= {30} color= "white" />
                        </View>
                    </TouchableOpacity>
                </View>       
            </View>
            <View style={{ flexDirection: 'row', height: "10%", alignContent: 'center', alignItems: 'center', padding: 10 }}>
                <Text style={{ fontSize: 20, margin: 10}}>대표키워드</Text>
                <Text style={{ fontSize: 20, borderWidth: 2, padding: 5, margin: 3, borderColor: 'blue', color: 'blue' }}>{item.like[0]}</Text>
                <Text style={{ fontSize: 20, borderWidth: 2, padding: 5, margin: 3, borderColor: 'red', color: 'red' }}>{item.hate}</Text>
            </View>
            <ScrollView>
                <View style={{ flex: 1, height: 300, padding: 10 }}>
                    <Text style={{ fontSize: 20, margin: 10 }}>워드클라우드</Text>
                    <Image 
                    style={{ flex:1, margin: 10 }}
                    source={{
                        uri: 'http://placehold.it/100'
                    }}
                />
                </View>
                <View style={{ flex: 1, height: 300, padding: 10 }}>
                    <Text style={{ fontSize: 20, margin: 10 }}>긍부정분석</Text>
                    <Image 
                    style={{ flex:1, margin: 10 }}
                    source={{
                        uri: 'http://placehold.it/100'
                    }}
                />
                </View>
            </ScrollView>
        </View>
    )
}

export default Detail;