import AsyncStorage from '@react-native-async-storage/async-storage';

export class Preferences {
    static async set(key: string, value: any) {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    }

    static async get(key: string) {
        const value = await AsyncStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    }
}