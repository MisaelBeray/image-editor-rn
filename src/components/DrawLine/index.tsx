import React, {FC} from 'react';
import Svg, {Line} from 'react-native-svg';
import IDrawLine from './Interface';
import {StyleSheet} from 'react-native';
type Props = {
  imageBackground: any;
  drawLineTouch: IDrawLine[];
};
const DrawLine: FC<Props> = ({imageBackground, drawLineTouch}) => {
  return (
    <Svg
      style={styles.line}
      height={imageBackground.assets ? imageBackground?.assets[0].height : 400}
      width={imageBackground.assets ? imageBackground?.assets[0].width : 400}>
      {drawLineTouch?.map((item: IDrawLine, index) => {
        return (
          <Line
            key={index}
            x1={item.startX}
            y1={item.startY}
            x2={item.endX}
            y2={item.endY}
            stroke="red"
            strokeWidth="8"
          />
        );
      })}
    </Svg>
  );
};
const styles = StyleSheet.create({
  line: {
    position: 'absolute',
  },
});
export default DrawLine;
