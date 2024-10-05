import { Linking } from 'react-native';

const callTelephone = (phoneNumber) => {
  Linking.openURL(`tel:${phoneNumber}`).catch((err) =>
    console.error('Failed to make a call:', err)
  );
};

export default callTelephone;
