import React, {FC, SetStateAction} from 'react';
import {StyleSheet} from 'react-native';
import {FAB} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';

type Props = {
  setImageBackground: any;
  setMoveImage: React.Dispatch<SetStateAction<boolean>>;
  moveImage: boolean;
  setImageScale: React.Dispatch<SetStateAction<number>>;
  setPencil: React.Dispatch<SetStateAction<boolean>>;
  pencil: boolean;
};
const SideButton: FC<Props> = ({
  setImageBackground,
  setMoveImage,
  moveImage,
  setPencil,
  pencil,
}) => {
  const [state, setState] = React.useState({open: false});

  const onStateChange = ({open}: any) => setState({open});

  const {open} = state;

  return (
    <FAB.Group
      fabStyle={styles.fab}
      open={open}
      icon={open ? 'minus' : 'plus'}
      visible={true}
      actions={[
        {
          icon: 'camera',
          small: false,
          onPress: () => {},
        },
        {
          icon: 'tooltip-text-outline',
          small: false,
          onPress: () => {},
        },
        {
          icon: 'magnify-plus',
          small: false,
          onPress: () => {},
        },
        {
          icon: 'magnify-minus',
          small: false,
          onPress: () => {},
        },
        {
          icon: 'arrow-all',
          small: false,
          color: moveImage ? 'red' : 'gray',
          onPress: () => {
            setMoveImage(!moveImage);
          },
        },
        {
          icon: 'pencil',
          small: false,
          color: pencil ? 'red' : 'gray',
          onPress: () => {
            setPencil(!pencil);
          },
        },
        {
          icon: 'image-area',
          small: false,
          onPress: () => {
            launchImageLibrary(
              {
                selectionLimit: 0,
                mediaType: 'photo',
                includeBase64: false,
              },
              setImageBackground,
            );
          },
        },
      ]}
      onStateChange={onStateChange}
      onPress={() => {
        if (open) {
          // do something if the speed dial is open
        }
      }}
    />
  );
};

const styles = StyleSheet.create({
  fab: {
    backgroundColor: '#EA5B70',
  },
});
export default SideButton;
