import React, {FC, RefObject, SetStateAction} from 'react';
import {StyleSheet, PermissionsAndroid, Platform} from 'react-native';
import {FAB} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import ViewShot from 'react-native-view-shot';
import CameraRoll from '@react-native-community/cameraroll';
import Toast from 'react-native-toast-message';

type Props = {
  setImageBackground: any;
  setMoveImage: React.Dispatch<SetStateAction<boolean>>;
  moveImage: boolean;
  setImageScale: React.Dispatch<SetStateAction<number>>;
  imageScale: number;
  setPencil: React.Dispatch<SetStateAction<boolean>>;
  pencil: boolean;
  viewShotRef: RefObject<ViewShot>;
};

async function hasAndroidPermission() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
}

const SideButton: FC<Props> = ({
  setImageBackground,
  setMoveImage,
  moveImage,
  setPencil,
  pencil,
  setImageScale,
  imageScale,
  viewShotRef,
}) => {
  const [state, setState] = React.useState({open: false});

  const onStateChange = ({open}: any) => setState({open});

  const {open} = state;

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Salvo!',
      text2: 'Sua imagem foi salva com sucesso! 📷',
    });
  };

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
          onPress: async () => {
            if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
              return;
            }

            viewShotRef?.current?.capture?.().then((uri) => {
              CameraRoll.save(uri);
              showToast();
            });
          },
        },
        {
          icon: 'tooltip-text-outline',
          small: false,
          onPress: () => {},
        },
        {
          icon: 'magnify-plus',
          small: false,
          onPress: () => {
            if (imageScale < 2) {
              setImageScale(imageScale + 0.4);
            }
          },
        },
        {
          icon: 'magnify-minus',
          small: false,
          onPress: () => {
            if (imageScale > 0.4) {
              setImageScale(imageScale - 0.4);
            }
          },
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
