import React, { useMemo, useState } from 'react';
import {
  Alert,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HistoryCard } from '@/components/HistoryCard';
import { BorderRadius, ColorTheme, Spacing } from '@/constants/theme';
import { useAppTheme } from '@/context/ThemeContext';
import { Calculation } from '@/types/calculator';

interface HistorySectionProps {
  history: Calculation[];
  onClearHistory: () => void;
  onSelectCalculation: (item: Calculation) => void;
  onDeleteCalculation: (id: string) => void;
}

export function HistorySection({
  history,
  onClearHistory,
  onSelectCalculation,
  onDeleteCalculation,
}: HistorySectionProps) {
  const { theme, isDark } = useAppTheme();
  const styles = useMemo(() => getStyles(theme, isDark), [theme, isDark]);

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleRequestClear = () => {
    if (history.length === 0) return;

    if (Platform.OS === 'web') {
      setShowConfirmModal(true);
    } else {
      Alert.alert(
        'Clear History',
        'Are you sure you want to clear all calculation history?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Clear All',
            style: 'destructive',
            onPress: onClearHistory,
          },
        ]
      );
    }
  };

  const handleConfirmClearModal = () => {
    setShowConfirmModal(false);
    onClearHistory();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.titleWithBadge}>
          <Ionicons name="time-outline" size={20} color={theme.text} />
          <Text style={styles.sectionTitle}>History</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countBadgeText}>{history.length}</Text>
          </View>
        </View>

        {history.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleRequestClear}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel="Clear calculation history"
          >
            <Ionicons name="trash-outline" size={15} color={theme.danger} />
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Empty State */}
      {history.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconCircle}>
            <Ionicons name="receipt-outline" size={32} color={theme.textMuted} />
          </View>
          <Text style={styles.emptyTitle}>No Calculations Yet</Text>
          <Text style={styles.emptySubtitle}>
            Your calculated lending summaries will be saved here automatically.
          </Text>
        </View>
      ) : (
        /* History Cards List */
        <View style={styles.listContainer}>
          {history.map((item) => (
            <HistoryCard
              key={item.id}
              item={item}
              onSelect={onSelectCalculation}
              onDelete={onDeleteCalculation}
            />
          ))}
        </View>
      )}

      {/* Confirmation Modal for Web & Cross-platform fallback */}
      <Modal
        visible={showConfirmModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowConfirmModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalIconWrap}>
              <Ionicons name="trash" size={28} color={theme.danger} />
            </View>
            <Text style={styles.modalTitle}>Clear All History?</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to clear all calculation history? This action cannot be undone.
            </Text>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setShowConfirmModal(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalDeleteBtn}
                onPress={handleConfirmClearModal}
              >
                <Text style={styles.modalDeleteText}>Clear All</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const getStyles = (theme: ColorTheme, isDark: boolean) =>
  StyleSheet.create({
    container: {
      marginHorizontal: Spacing.md,
      marginBottom: Spacing.xxxl,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: Spacing.md,
    },
    titleWithBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.sm,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '800',
      color: theme.text,
    },
    countBadge: {
      backgroundColor: theme.surfaceElevated,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: BorderRadius.round,
      borderWidth: 1,
      borderColor: theme.border,
    },
    countBadgeText: {
      fontSize: 12,
      fontWeight: '700',
      color: theme.textSecondary,
    },
    clearButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      backgroundColor: theme.dangerTint,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: BorderRadius.md,
      borderWidth: 1,
      borderColor: theme.dangerBorder,
    },
    clearButtonText: {
      fontSize: 12,
      fontWeight: '700',
      color: theme.danger,
    },
    emptyContainer: {
      backgroundColor: theme.surface,
      borderRadius: BorderRadius.xl,
      paddingVertical: Spacing.xxxl,
      paddingHorizontal: Spacing.xl,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.border,
      borderStyle: 'dashed',
    },
    emptyIconCircle: {
      width: 64,
      height: 64,
      borderRadius: 32,
      backgroundColor: theme.surfaceElevated,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: Spacing.md,
    },
    emptyTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.text,
      marginBottom: 4,
    },
    emptySubtitle: {
      fontSize: 13,
      color: theme.textSecondary,
      textAlign: 'center',
      maxWidth: 280,
      lineHeight: 18,
    },
    listContainer: {
      marginTop: Spacing.xs,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: Spacing.lg,
    },
    modalContent: {
      backgroundColor: theme.surface,
      borderRadius: BorderRadius.xl,
      padding: Spacing.xl,
      width: '100%',
      maxWidth: 380,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.border,
    },
    modalIconWrap: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: theme.dangerTint,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: Spacing.md,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: '800',
      color: theme.text,
      marginBottom: Spacing.sm,
    },
    modalMessage: {
      fontSize: 14,
      color: theme.textSecondary,
      textAlign: 'center',
      marginBottom: Spacing.xl,
      lineHeight: 20,
    },
    modalActions: {
      flexDirection: 'row',
      gap: Spacing.md,
      width: '100%',
    },
    modalCancelBtn: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: BorderRadius.lg,
      backgroundColor: theme.surfaceElevated,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.border,
    },
    modalCancelText: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.textSecondary,
    },
    modalDeleteBtn: {
      flex: 1,
      paddingVertical: 12,
      borderRadius: BorderRadius.lg,
      backgroundColor: theme.danger,
      alignItems: 'center',
    },
    modalDeleteText: {
      fontSize: 14,
      fontWeight: '700',
      color: '#FFFFFF',
    },
  });
