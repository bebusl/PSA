import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native"

export const Register = ({ navigation }) => {
    return(
        <View style={styles.container}>
            <View style={styles.textArea}>
                <Text style={styles.text}>회원가입</Text>
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
                <TextInput
                    style={styles.textInput}
                    placeholder= "비밀번호확인"
                />
                <TextInput
                    style={styles.textInput}
                    placeholder= "이름"
                />
                <TouchableOpacity style={styles.submitBtn}>
                    <Text style={styles.btnText}>회원가입</Text>
                </TouchableOpacity>
            </View>
            <View style={{ height: '10%' }}></View>
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
        flex: 4,
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
})

export default Register;