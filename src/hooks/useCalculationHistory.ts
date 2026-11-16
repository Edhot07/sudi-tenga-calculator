import { useCallback, useEffect, useState } from 'react';
import { Calculation } from '@/types/calculator';
import { formatDateTime } from '@/utils/formatters';
import {
  clearHistoryFromStorage,
  loadHistoryFromStorage,
  MAX_HISTORY_ITEMS,
  saveHistoryToStorage,
} from '@/utils/storage';

export function useCalculationHistory() {
  const [history, setHistory] = useState<Calculation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load from local storage on mount
  useEffect(() => {
    let isMounted = true;
    async function init() {
      try {
        const stored = await loadHistoryFromStorage();
        if (isMounted) {
          setHistory(stored);
        }
      } catch (err) {
        console.error('Error initializing history:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    init();

    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * Add a new calculation to history.
   * Uses FIFO eviction keeping the latest 50 calculations.
   */
  const addCalculation = useCallback(
    async (params: {
      principal: number;
      percentage: number;
      months: number;
      total: number;
      interest: number;
      date?: string;
    }): Promise<Calculation> => {
      const newEntry: Calculation = {
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        principal: params.principal,
        percentage: params.percentage,
        months: params.months,
        total: params.total,
        interest: params.interest,
        date: params.date || formatDateTime(),
      };

      setHistory((prevHistory) => {
        const updated = [newEntry, ...prevHistory].slice(0, MAX_HISTORY_ITEMS);
        saveHistoryToStorage(updated);
        return updated;
      });

      return newEntry;
    },
    []
  );

  /**
   * Remove a single calculation entry by ID
   */
  const deleteCalculation = useCallback(async (id: string) => {
    setHistory((prevHistory) => {
      const updated = prevHistory.filter((item) => item.id !== id);
      saveHistoryToStorage(updated);
      return updated;
    });
  }, []);

  /**
   * Clear all calculation history
   */
  const clearHistory = useCallback(async () => {
    setHistory([]);
    await clearHistoryFromStorage();
  }, []);

  return {
    history,
    isLoading,
    addCalculation,
    deleteCalculation,
    clearHistory,
  };
}

