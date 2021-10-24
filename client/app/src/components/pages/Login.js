import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native"

export const Login = ({ navigation }) => {
    return(
        <View style={styles.container}>
            <View style={styles.textArea}>
                <Text style={styles.text}>로그인</Text>
            </View>
            <View style={styles.submitArea}>
                <TextInput
                    style={styles.textInput}
                    placeholder= "이메일"
                />
                <TextInput
                    style={styles.textInput}
                    placeholder= "비밀번호"
                />
                <TouchableOpacity style={styles.submitBtn}>
                    <Text style={styles.btnText}>로그인</Text>
                </TouchableOpacity>
            </View>
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <TouchableOpacity style={styles.registerBtn} onPress={() => navigation.navigate('registerScreen')}>
                    <Text style={styles.btnText2}>회원가입</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white'
    },
    textArea:{
        flex: 1,
        justifyContent: 'center'
    },
    submitArea:{
        flex: 2,
        backgroundColor: '#ebe9e9',
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text:{
        fontWeight: 'bold',
        fontSize: 35,
        textAlign: 'center',
        color: '#000080'
    },
    submitBtn:{
        backgroundColor: '#000080',
        justifyContent: 'center',
        alignContent: 'center',
        margin: 5,
        padding: 10,
        width: '60%',
        borderRadius: 2
    },
    textInput:{
        width: '90%',
        margin: 20,
        padding: 15,
        borderColor: '#000080',
        borderWidth: 4,
        borderRadius: 2,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    btnText:{
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold'
    },
    registerBtn:{
        margin: 20
    },
    btnText2:{
        fontWeight: 'bold',
        fontSize: 15,
        color: '#000080'
    }
})

export default Login;