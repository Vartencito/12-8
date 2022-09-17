import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image } from "react-native";

export default function PublicationInProfile({ url }) {

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const getDimensions = async (url) => {
        Image.getSize(url, (Width, Height) => {
            setWidth(Width);
            setHeight(Height);

        }, (errorMsg) => {
            console.log(errorMsg);
        });

    }

    useEffect(() => {
        getDimensions(url);
    }, [])

    return (
        <>
            <Image source={{ uri: url }} style={{ height: (height*30)/100, width: (width*30)/100, resizeMode: 'contain' }} />
        </>
    )
}
