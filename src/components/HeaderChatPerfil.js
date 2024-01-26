import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";
import { FlatList } from "react-native";
import { Pressable, StyleSheet, Image, Text } from "react-native";


function HeaderChatPerfil({ onPress }) {

    return (
        <View>
            <FlatList
                data={[
                    {
                        nome: "BeKind",
                        status: "Online",
                        perfil: require("../img/BeKindAdmin.png"),
                        link: "InfoEventos",
                    },

                ]}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate(item.link)}>
                        <View style={{ flex: 1, flexDirection: 'row', marginRight: 120, }}>
                            <Image
                                source={item.perfil}
                                style={styles.perfil}
                            />

                            <View style={{ marginLeft: 12, alignSelf: 'center', }}>
                                <Text
                                    style={styles.nome}
                                >
                                    {item.nome}
                                </Text>
                                <Text
                                    style={styles.status}
                                >
                                    {item.status}
                                </Text>

                            </View>

                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>


    );
}

export default HeaderChatPerfil;

const styles = StyleSheet.create({
    perfil: {
        resizeMode: 'contain',
        width: 40,
        height: 40,
    },
    nome: {
        marginBottom: 2,
        fontSize: 13,
        fontFamily: 'Montserrat-Bold',
    },
    status: {
        fontSize: 12,
        fontFamily: 'Montserrat-Medium',
        color: '#7E7E7E',
    },
});
