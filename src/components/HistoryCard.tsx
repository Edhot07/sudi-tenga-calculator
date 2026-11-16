import React, { useMemo } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BorderRadius, ColorTheme, Spacing } from '@/constants/theme';
import { useAppTheme } from '@/context/ThemeContext';
import { Calculation } from '@/types/calculator';
import {
  formatCurrency,
  formatMonthsCompact,
} from '@/utils/formatters';

interface HistoryCardProps {
  item: Calculation;
  onSelect?: (item: Calculation) => void;
  onDelete?: (id: string) => void;
}

export function HistoryCard({ item, onSelect, onDelete }: HistoryCardProps) {
  const { theme, isDark } = useAppTheme();
  const styles = useMemo(() => getStyles(theme, isDark), [theme, isDark]);

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.75}
      onPress={() => onSelect?.(item)}
    >
      <View style={styles.contentRow}>
        {/* Left Side: Calculation Details */}
        <View style={styles.leftContent}>
          {/* Top Row: Principal (₹), Rate badge, Months */}
          <View style={styles.topRow}>
            <Text style={styles.principalText}>
              {formatCurrency(item.principal)}
            </Text>

            <View style={styles.rateBadge}>
              <Text style={styles.rateBadgeText}>{item.percentage}%/mo</Text>
            </View>

            <View style={styles.monthsBadge}>
              <Ionicons name="time-outline" size={11} color={theme.textSecondary} />
              <Text style={styles.monthsBadgeText}>
                {formatMonthsCompact(item.months)}
              </Text>
            </View>
          </View>

          {/* Bottom Row: Interest: +₹{interest}, formatted date-time string */}
          <View style={styles.bottomRow}>
            <Text style={styles.interestText}>
              Interest: <Text style={styles.interestHighlight}>+{formatCurrency(item.interest)}</Text>
            </Text>
            <Text style={styles.dotSeparator}>•</Text>
            <Text style={styles.dateText}>{item.date}</Text>
          </View>
        </View>

        {/* Right Side: Prominently Displayed Total Amount */}
        <View style={styles.rightContent}>
          <Text style={styles.totalLabel}>TOTAL</Text>
          <Text style={styles.totalValue}>{formatCurrency(item.total)}</Text>

          {onDelete && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={(e) => {
                e.stopPropagation?.();
                onDelete(item.id);
              }}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              accessibilityRole="button"
              accessibilityLabel="Delete item"
            >
              <Ionicons name="trash-outline" size={15} color={theme.textMuted} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const getStyles = (theme: ColorTheme, isDark: boolean) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.surface,
      borderRadius: BorderRadius.lg,
      padding: Spacing.md + 2,
      marginBottom: Spacing.md,
      borderWidth: 1,
      borderColor: theme.border,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.15 : 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    contentRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    leftContent: {
      flex: 1,
      paddingRight: Spacing.md,
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.sm,
      marginBottom: 6,
      flexWrap: 'wrap',
    },
    principalText: {
      fontSize: 16,
      fontWeight: '800',
      color: theme.text,
    },
    rateBadge: {
      backgroundColor: theme.primaryTint,
      paddingHorizontal: 7,
      paddingVertical: 2,
      borderRadius: BorderRadius.round,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(37, 99, 235, 0.3)' : 'rgba(37, 99, 235, 0.2)',
    },
    rateBadgeText: {
      fontSize: 11,
      fontWeight: '700',
      color: isDark ? '#60A5FA' : theme.primary,
    },
    monthsBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 3,
      backgroundColor: theme.surfaceElevated,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: BorderRadius.round,
      borderWidth: 1,
      borderColor: theme.border,
    },
    monthsBadgeText: {
      fontSize: 11,
      fontWeight: '600',
      color: theme.textSecondary,
    },
    bottomRow: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 4,
    },
    interestText: {
      fontSize: 12,
      color: theme.textSecondary,
      fontWeight: '500',
    },
    interestHighlight: {
      color: theme.success,
      fontWeight: '700',
    },
    dotSeparator: {
      color: theme.textMuted,
      fontSize: 12,
    },
    dateText: {
      fontSize: 11,
      color: theme.textMuted,
    },
    rightContent: {
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    totalLabel: {
      fontSize: 9,
      fontWeight: '700',
      color: theme.textMuted,
      letterSpacing: 0.5,
    },
    totalValue: {
      fontSize: 18,
      fontWeight: '900',
      color: theme.text,
      letterSpacing: -0.2,
    },
    deleteButton: {
      marginTop: 4,
      padding: 2,
    },
  });
