import * as React from 'react';
import {Drawer} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const DrawerItem: React.FC = () => {
  const [active, setActive] = React.useState<boolean>(false);
  const navigation = useNavigation();
  const handleFavs = () => {
    navigation.navigate('Favs');
  };
  return (
    <Drawer.Section>
      <Drawer.Item label="Country List" active={active} onPress={handleFavs} />
    </Drawer.Section>
  );
};

export default DrawerItem;
