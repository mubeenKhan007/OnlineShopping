import React, { Component, useEffect } from 'react'
import { connect } from 'react-redux'
import { View, Text, ScrollView, Dimensions, Image, ImageBackground, TouchableOpacity, FlatList, RefreshControl } from 'react-native'
import Carousel from 'react-native-snap-carousel';
import { Divider } from 'react-native-paper';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

import { NavigationContainer, CommonActions, DefaultTheme, useNavigation } from '@react-navigation/native'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'

import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from "react-native-vector-icons/AntDesign"
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Feather from 'react-native-vector-icons/Feather'
import Foundation from 'react-native-vector-icons/Foundation'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

import {
    ChangeViewingSellingProductDetails,
    GetMyProducts,
    GetProductById,
} from '../../Store/Actions/productActions';

import CustomHeader from '../Shared/CustomHeader'

function MyProducts(props) {
    const {
        textOffColor,
        warningColor,
        dangerColor,
        successLightColor,
        successColor,
        modalBorderColor,
        modalColor,
        textColor,
        backgroundColor,
        backgroundDarkerColor,
        mainDarkerColor,
        mainLighterColor,
        mainColor,
    } = props.color
    const {
        myProducts
    } = props.product
    const {
        GetMyProducts,
        GetProductById,
    } = props

    function RenderMyProducts({ item, index }) {
        const { user, quantity, productName, price, media, isDeleted, forExchange, description, createdOn, city, category, _id } = item
        return (
            <TouchableOpacity
                onPress={() => {
                    GetProductById(_id, props.navigation.navigate)
                }}
            >
                <View style={{ width: '95%', height: 100, borderColor: 'red', borderWidth: 0, marginHorizontal: '2.5%', flexDirection: 'row' }}>
                    <View style={{ flex: 1, borderColor: 'red', borderWidth: 0 }}>
                        <Image
                            source={{ uri: media[0].path }}
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 8,
                            }}
                        />
                    </View>
                    <View style={{ flex: 3, borderColor: 'red', borderWidth: 0, }}>
                        <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, flexDirection: "row", alignItems: "center" }}>
                            <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, }}>
                                <Text style={{ color: textColor, fontSize: 16, fontWeight: "bold", marginLeft: 10 }}>{productName}</Text>
                            </View>
                            <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, alignItems: "flex-end" }}>
                                <View style={{ backgroundColor: modalColor, borderRadius: 3, alignItems: "center", marginRight: 5, padding: 2 }}>
                                    <Text numberOfLines={4} style={{ color: textOffColor, fontSize: 12, fontWeight: "bold" }}>{price}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 3, borderColor: 'red', borderWidth: 0, flexDirection: "row" }}>
                            <View style={{ flex: 7, borderColor: 'red', borderWidth: 0, }}>
                                <View style={{ flex: 1.5, borderColor: 'red', borderWidth: 0 }}>
                                    <Text numberOfLines={2} style={{ color: textOffColor, fontSize: 12, fontWeight: "normal", marginTop: 3, marginLeft: 10 }}>{description}</Text>
                                </View>
                                <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, flexDirection: "row" }}>
                                    <View style={{ flex: 1 }}>
                                        <View
                                            style={{
                                                height: 25,
                                                width: 80,
                                                backgroundColor: mainColor,
                                                borderRadius: 5,
                                                flexDirection: "row",
                                                marginLeft: 10,
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <FontAwesome5 name="eye" size={14} color={textColor} style={{ marginRight: 5 }} />
                                            <Text style={{ color: textColor, fontSize: 14 }}>View</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, borderColor: 'red', borderWidth: 0, alignItems: "flex-end", justifyContent: "center" }}>
                                        {/* <MaterialCommunityIcons name="delete" size={25} color={dangerColor} style={{ marginLeft: 10, marginRight: 5 }} /> */}
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <Divider
                    style={{ borderColor: modalBorderColor, borderWidth: 0.5, marginVertical: 10 }}
                />
            </TouchableOpacity >
        )
    }
    function RenderEmptyListComponent() {
        return (
            <View style={{ paddingTop: 100, justifyContent: 'center', alignItems: 'center', borderColor: 'red', borderWidth: 0 }}>
                <Text style={{ color: textOffColor, fontSize: 18 }}>You didn't posted any products yet!</Text>
            </View>
        )
    }
    function RenderListHeaderComponent() {
        return (
            <>
                <Text numberOfLines={1} style={{ color: textColor, fontSize: 16, fontWeight: "bold", marginTop: 10, marginLeft: 10 }}>My Products</Text>
                <Divider
                    style={{ borderColor: modalBorderColor, borderWidth: 0.5, marginVertical: 10 }}
                />
            </>
        )
    }
    useEffect(() => {
        // GetMyProducts()
    }, [])

    return (
        <FlatList
            ListHeaderComponent={RenderListHeaderComponent()}
            data={myProducts}
            renderItem={RenderMyProducts}
            keyExtractor={(item, index) => index}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={RenderEmptyListComponent()}
        />
    )
}

const mapStateToProps = ({ color, product }) => ({
    color, product
})

export default connect(mapStateToProps, {
    ChangeViewingSellingProductDetails,
    GetMyProducts,
    GetProductById,
})(MyProducts)
