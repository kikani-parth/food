import { Platform, Linking } from 'react-native';

const openMaps = ({ latitude, longitude }) => {
  // Coordinates string
  const daddr = `${latitude},${longitude}`;

  // Select the appropriate URL based on the platform
  const url = Platform.select({
    ios: `maps://?daddr=${daddr}`, // Apple Maps
    android: `geo:${latitude},${longitude}?q=${latitude},${longitude}`, // Google Maps
  });

  Linking.openURL(url);
};

export default openMaps;
