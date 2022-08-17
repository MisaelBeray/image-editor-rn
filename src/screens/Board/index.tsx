import React, {FC, useMemo, useRef, useState} from 'react';
import {
  Animated,
  ImageBackground,
  PanResponder,
  StyleSheet,
  View,
} from 'react-native';
import SideButton from '../../components/SideButton';

const Board: FC = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const [moveImage, setMoveImage] = React.useState<boolean>(false);
  const [pencil, setPencil] = React.useState<boolean>(false);
  const [imageBackground, setImageBackground] = React.useState<any>({});
  const [imagePosition, setImagePosition] = useState<Animated.ValueXY>(pan);
  const [imageScale, setImageScale] = useState<number>(1);
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => {
          //console.log('onStartShouldSetPanResponder');
          return true;
        },
        onStartShouldSetPanResponderCapture: () => {
          //console.log('onStartShouldSetPanResponderCapture');
          if (pencil) {
            /* drawLine = {
            startX: evt.nativeEvent.locationX,
            startY: evt.nativeEvent.locationY,
            endX: evt.nativeEvent.locationX,
            endY: evt.nativeEvent.locationY,
          }; */
          }
          return true;
        },
        onMoveShouldSetPanResponder: () => {
          //console.log('onMoveShouldSetPanResponder');
          return false;
        },
        onMoveShouldSetPanResponderCapture: () => {
          //console.log('onMoveShouldSetPanResponderCapture');
          return false;
        },
        onPanResponderGrant: () => {
          return false;
        },
        onPanResponderMove: moveImage
          ? Animated.event([null, {dx: pan.x, dy: pan.y}], {
              useNativeDriver: false,
            })
          : undefined,
        onPanResponderRelease: () => {
          //console.log('onPanResponderRelease');
          pan.extractOffset();
          setImagePosition(new Animated.ValueXY(pan));

          if (pencil) {
            /* drawLine = {
            startX: drawLine.startX,
            startY: drawLine.startY,
            endX: evt.nativeEvent.locationX,
            endY: evt.nativeEvent.locationY,
          };

          setDrawLineTouch((arr) => [...arr, drawLine]); */
          }
        },
      }),
    [pencil, moveImage, pan],
  );

  return (
    <View style={styles({}).MainContainer}>
      <Animated.View
        style={{
          transform: [
            {translateX: imagePosition?.x},
            {translateY: imagePosition?.y},
            {scale: imageScale},
          ],
        }}
        {...panResponder.panHandlers}>
        <ImageBackground
          resizeMode="stretch"
          style={
            styles(imageBackground.assets ? imageBackground?.assets[0] : null)
              .ImageContainer
          }
          source={{
            uri: imageBackground.assets
              ? imageBackground?.assets[0]?.uri
              : null,
          }}
        />
      </Animated.View>
      <SideButton
        setImageBackground={setImageBackground}
        setMoveImage={setMoveImage}
        moveImage={moveImage}
        setImageScale={setImageScale}
        setPencil={setPencil}
      />
    </View>
  );
};

const styles = (props: any) =>
  StyleSheet.create({
    MainContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    ImageContainer: {
      height: props ? props.height : 400,
      width: props ? props.width : 400,
    },
  });
export default Board;
