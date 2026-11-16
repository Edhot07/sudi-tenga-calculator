import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calculation } from '@/types/calculator';

export const HISTORY_STORAGE_KEY = 'sudiTengaHistory';
export const MAX_HISTORY_ITEMS = 50;

/**
 * Load calculation history from AsyncStorage
 */
export async function loadHistoryFromStorage(): Promise<Calculation[]> {
  try {
    const raw = await AsyncStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.slice(0, MAX_HISTORY_ITEMS);
    }
    return [];
  } catch (error) {
    console.error('Failed to load calculation history:', error);
    return [];
  }
}

/**
 * Save calculation history to AsyncStorage
 */
export async function saveHistoryToStorage(history: Calculation[]): Promise<void> {
  try {
    const trimmed = history.slice(0, MAX_HISTORY_ITEMS);
    await AsyncStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(trimmed));
  } catch (error) {
    console.error('Failed to save calculation history:', error);
  }
}

/**
 * Clear all calculation history from AsyncStorage
 */
export async function clearHistoryFromStorage(): Promise<void> {
  try {
    await AsyncStorage.removeItem(HISTORY_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear calculation history:', error);
  }
}

