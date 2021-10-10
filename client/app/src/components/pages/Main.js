import React from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native"
import AntDesign from 'react-native-vector-icons/AntDesign';

export const Main = ({ navigation }) => {
    return(
        <View style={{  flex: 1, backgroundColor: 'white'}}>
            <View style={{ height: '45%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: '28%', fontWeight: 'bold', color: '#000080' }}></Text>
            </View>
            <View style={{ flexDirection:'row', width: window.width, margin: 10, padding :4, alignItems:'center', justifyContent:'center', borderWidth:4, borderColor:'#000080', borderRadius:10, backgroundColor:'#fff'}}>
                <View style={{ flex: 4 }}>
                    <TextInput
                        placeholder= " 원하는 상품을 검색해보세요!"
                    />
                </View>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('likeKeywordScreen')}>
                        <View>
                            <AntDesign name='search1' size= {40} color= "#000080" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Main;