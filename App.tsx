import { useState } from 'react';
import { Button, View } from 'react-native';
import Animated, {
  SlideInRight,
  SlideOutLeft,
  StyleProps,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

const WIDTH = 200;

type CustomExitTransition = (values: ExitAnimationsValues) => LayoutAnimation;

type LayoutAnimation = {
  initialValues: StyleProps;
  animations: StyleProps;
  callback?: (finished: boolean) => void;
};

type ExitAnimationsValues = CurrentLayoutAnimationsValues & WindowDimensions;

type CurrentLayoutAnimationsValues = {
  currentOriginX: number;
  currentOriginY: number;
  currentWidth: number;
  currentHeight: number;
  currentBorderRadius: number;
  currentGlobalOriginX: number;
  currentGlobalOriginY: number;
};

interface WindowDimensions {
  windowWidth: number;
  windowHeight: number;
}

type CustomEntryTransition = (values: EntryAnimationsValues) => LayoutAnimation;

type EntryAnimationsValues = TargetLayoutAnimationsValues & WindowDimensions;

type TargetLayoutAnimationsValues = {
  targetOriginX: number;
  targetOriginY: number;
  targetWidth: number;
  targetHeight: number;
  targetBorderRadius: number;
  targetGlobalOriginX: number;
  targetGlobalOriginY: number;
};

interface WindowDimensions {
  windowWidth: number;
  windowHeight: number;
}

const App = () => {
  const [available, setAvailable] = useState(false);
  const toggle = () => setAvailable(!available);

  const customEntering: CustomEntryTransition = targetValues => {
    'worklet';
    const animations = {
      originX: withTiming(targetValues.targetOriginX, { duration: 500 }),
      opacity: withTiming(1, { duration: 500 }),
      borderRadius: withDelay(250, withTiming(40, { duration: 500 })),
      transform: [
        { rotate: withTiming('0deg', { duration: 500 }) },
        { scale: withTiming(1, { duration: 500 }) },
      ],
    };
    const initialValues = {
      originX: -WIDTH,
      opacity: 0,
      borderRadius: 10,
      transform: [{ rotate: '90deg' }, { scale: 0.2 }],
    };
    return {
      initialValues,
      animations,
    };
  };

  const customExiting: CustomExitTransition = values => {
    'worklet';
    const animations = {
      originX: withTiming(2 * WIDTH, { duration: 500 }),
      opacity: withTiming(0, { duration: 500 }),
      transform: [{ scale: withTiming(0.2, { duration: 500 }) }],
    };
    const initialValues = {
      originX: values.currentOriginX,
      opacity: 1,
      transform: [{ scale: 1 }],
    };
    return {
      initialValues,
      animations,
    };
  };

  return (
    <View style={{ padding: 50, flex: 1 }}>
      <Button title="Toggle" onPress={toggle} />
      {available && (
        <Animated.View
          entering={SlideInRight}
          exiting={SlideOutLeft}
          style={{ marginTop: 20, height: 100, backgroundColor: 'black' }}
        />
      )}
      {!available && (
        <Animated.View
          entering={SlideInRight}
          exiting={SlideOutLeft}
          style={{ marginTop: 20, height: 100, backgroundColor: 'red' }}
        />
      )}
      {available && (
        <Animated.View
          entering={customEntering}
          exiting={customExiting}
          style={{ marginTop: 20, height: 100, backgroundColor: 'black' }}
        />
      )}
      {!available && (
        <Animated.View
          entering={customEntering}
          exiting={customExiting}
          style={{ marginTop: 20, height: 100, backgroundColor: 'red' }}
        />
      )}
    </View>
  );
};

export default App;
