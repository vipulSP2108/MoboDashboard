import * as Location from 'expo-location';

export const toAddress = async (latitude, longitude) => {
    const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
        longitude: longitude,
        latitude: latitude,
        // longitude: location.coords.longitude,
        // latitude: location.coords.latitude
    });

    console.log("Reverse Geocoded:");
    console.log(reverseGeocodedAddress);
    return reverseGeocodedAddress
};