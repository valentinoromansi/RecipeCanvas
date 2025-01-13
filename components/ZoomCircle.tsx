import { useEffect, useState } from "react";
import { Button, StyleSheet, Text } from "react-native"
import Animated, { Easing, interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"

const BORDER_RADIUS_MAX = 50;
const TOOGLE_PADDING = 10;
const TOOGLE_SIZE = 80;

export const ZoomCircle = () => {
    const [toogleContainerWidth, setToogleContainerWidth] = useState(0);
    const [toogle, setToogle] = useState<0 | 1>(0);

    const toogleAnimation = useSharedValue(0);
    

    const toogleAnimatedStyle = useAnimatedStyle(() => ({
      transform: [{
        translateX: interpolate(
            toogleAnimation.value,
            [0, 1],
            [0, toogleContainerWidth - TOOGLE_PADDING*2 - TOOGLE_SIZE]
        )
      }],
      backgroundColor: interpolateColor(
        toogleAnimation.value,
        [0, 1],
        ['yellow', 'blue']
      )
    }));
    
    
    useEffect(() => {
        toogleAnimation.value = withTiming(toogle, { duration: 200, easing: Easing.ease });
    }, [toogle])

    return <>
        <Animated.View 
            onTouchStart={() => setToogle(toogle ? 0 : 1)}
            key={`root-view`}
            onLayout={(event) => {
                const { width } = event.nativeEvent.layout;
                setToogleContainerWidth(width);
              }}
            style={[styles.toogleWrapper]}>
                <Animated.View style={[styles.toogle, toogleAnimatedStyle]}></Animated.View>
        </Animated.View>
    </>
}

const styles = StyleSheet.create({
    toogleWrapper: {
        borderRadius: 100,
        display: 'flex',
        justifyContent: 'center',
        padding: TOOGLE_PADDING,
        position:'absolute',
        zIndex: 1,
        top: 200,
        width: 300,
        backgroundColor: 'gray'
    },
    toogle: {
        borderRadius: 100,
        width: TOOGLE_SIZE,
        height: TOOGLE_SIZE,
        backgroundColor: 'white',
    },
  });
  