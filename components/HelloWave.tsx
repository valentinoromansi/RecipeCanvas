import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
  AnimatableValue,
  Easing,
} from 'react-native-reanimated';

import { ThemedText } from '@/components/ThemedText';

export function HelloWave() {
  const rotationAnimation = useSharedValue(0);

  useEffect(() => {
    rotationAnimation.value = withRepeat(
      withSequence(
        withTiming(360, { duration: 800, easing: Easing.linear }),
        withTiming(0, { duration: 800, easing: Easing.linear })
      ),
      0
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      //{ rotate: `${rotationAnimation.value}deg` },
      { translateX: rotationAnimation.value / 2 },
    ],
    backgroundColor: 'yellow'
  }));

  return (
    <Animated.View style={[animatedStyle, {backgroundColor: 'red'}]}>
      <ThemedText>👋</ThemedText>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 28,
    lineHeight: 32,
    marginTop: -6,
  },
});
