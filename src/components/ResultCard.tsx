import React, { useEffect, useMemo, useRef } from 'react';
import {
  Animated,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BorderRadius, ColorTheme, Spacing } from '@/constants/theme';
import { useAppTheme } from '@/context/ThemeContext';
import { CalculationResult } from '@/types/calculator';
import { formatCurrency, formatMonths } from '@/utils/formatters';

interface ResultCardProps {
  result: CalculationResult | null;
  onNewCalculation: () => void;
}

export function ResultCard({ result, onNewCalculation }: ResultCardProps) {
  const { theme, isDark } = useAppTheme();
  const styles = useMemo(() => getStyles(theme, isDark), [theme, isDark]);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    if (result) {
      fadeAnim.setValue(0);
      slideAnim.setValue(-20);

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 350,
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 50,
          friction: 7,
          useNativeDriver: Platform.OS !== 'web',
        }),
      ]).start();
    }
  }, [result]);

  if (!result) return null;

  return (
    <Animated.View
      style={[
        styles.cardContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      {/* Top Header with Status Indicator & Reset Button */}
      <View style={styles.headerRow}>
        <View style={styles.statusIndicator}>
          <View style={styles.greenPulseDot} />
          <Ionicons name="checkmark-circle" size={16} color={theme.success} />
          <Text style={styles.statusText}>Calculation Complete</Text>
        </View>

        <TouchableOpacity
          style={styles.newCalcIconButton}
          onPress={onNewCalculation}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel="Reset calculation"
        >
          <Ionicons name="close" size={18} color={theme.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Huge Highlighted Total */}
      <View style={styles.totalSection}>
        <Text style={styles.totalLabel}>TOTAL REPAYMENT AMOUNT</Text>
        <Text style={styles.totalAmount}>{formatCurrency(result.totalRepayment)}</Text>
      </View>

      {/* Two-Column Breakdown Container */}
      <View style={styles.breakdownContainer}>
        {/* Left: Principal */}
        <View style={styles.breakdownCol}>
          <Text style={styles.breakdownLabel}>Principal</Text>
          <Text style={styles.breakdownValuePrincipal}>
            {formatCurrency(result.principal)}
          </Text>
        </View>

        {/* Divider line */}
        <View style={styles.verticalDivider} />

        {/* Right: Total Interest */}
        <View style={styles.breakdownCol}>
          <Text style={styles.breakdownLabel}>Total Interest</Text>
          <Text style={styles.breakdownValueInterest}>
            +{formatCurrency(result.totalInterest)}
          </Text>
        </View>
      </View>

      {/* Monthly Rate & Accrual Detail */}
      <View style={styles.monthlyDetailRow}>
        <View style={styles.monthlyDetailChip}>
          <Ionicons name="repeat-outline" size={14} color={isDark ? '#60A5FA' : theme.primary} />
          <Text style={styles.monthlyDetailText}>
            Monthly Interest: {formatCurrency(result.monthlyInterest)} / mo
          </Text>
        </View>
      </View>

      {/* Metadata Row: ₹P at R% • M months */}
      <View style={styles.metadataRow}>
        <Ionicons name="information-circle-outline" size={14} color={theme.textMuted} />
        <Text style={styles.metadataText}>
          {formatCurrency(result.principal)} at {result.percentage}% •{' '}
          {formatMonths(result.months)}
        </Text>
      </View>

      {/* New Calculation Primary Button */}
      <TouchableOpacity
        style={styles.newCalcButton}
        onPress={onNewCalculation}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityLabel="New calculation"
      >
        <Ionicons name="refresh-outline" size={16} color={isDark ? '#60A5FA' : theme.primary} style={styles.btnIcon} />
        <Text style={styles.newCalcButtonText}>New Calculation</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const getStyles = (theme: ColorTheme, isDark: boolean) =>
  StyleSheet.create({
    cardContainer: {
      backgroundColor: theme.surface,
      borderRadius: BorderRadius.xl,
      padding: Spacing.lg,
      marginHorizontal: Spacing.md,
      marginBottom: Spacing.lg,
      borderWidth: 1.5,
      borderColor: theme.successBorder,
      shadowColor: theme.success,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: isDark ? 0.15 : 0.08,
      shadowRadius: 16,
      elevation: 5,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: Spacing.md,
    },
    statusIndicator: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.successTint,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: BorderRadius.round,
      borderWidth: 1,
      borderColor: theme.successBorder,
      gap: 6,
    },
    greenPulseDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: theme.success,
    },
    statusText: {
      fontSize: 12,
      fontWeight: '700',
      color: theme.success,
    },
    newCalcIconButton: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: theme.surfaceElevated,
      alignItems: 'center',
      justifyContent: 'center',
    },
    totalSection: {
      alignItems: 'center',
      marginVertical: Spacing.sm,
    },
    totalLabel: {
      fontSize: 11,
      fontWeight: '700',
      color: theme.textSecondary,
      letterSpacing: 1,
      marginBottom: 4,
    },
    totalAmount: {
      fontSize: 38,
      fontWeight: '900',
      color: theme.text,
      letterSpacing: -0.5,
    },
    breakdownContainer: {
      flexDirection: 'row',
      backgroundColor: theme.surfaceElevated,
      borderRadius: BorderRadius.lg,
      paddingVertical: Spacing.md,
      paddingHorizontal: Spacing.lg,
      marginTop: Spacing.md,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.border,
    },
    breakdownCol: {
      flex: 1,
      alignItems: 'center',
    },
    breakdownLabel: {
      fontSize: 12,
      color: theme.textSecondary,
      marginBottom: 4,
      fontWeight: '500',
    },
    breakdownValuePrincipal: {
      fontSize: 18,
      fontWeight: '800',
      color: theme.text,
    },
    verticalDivider: {
      width: 1,
      height: '80%',
      backgroundColor: theme.border,
      marginHorizontal: Spacing.sm,
    },
    breakdownValueInterest: {
      fontSize: 18,
      fontWeight: '800',
      color: theme.success,
    },
    monthlyDetailRow: {
      marginTop: Spacing.md,
      alignItems: 'center',
    },
    monthlyDetailChip: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.primaryTint,
      paddingHorizontal: 12,
      paddingVertical: 5,
      borderRadius: BorderRadius.round,
      gap: 6,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(59, 130, 246, 0.25)' : 'rgba(37, 99, 235, 0.2)',
    },
    monthlyDetailText: {
      fontSize: 12,
      fontWeight: '600',
      color: isDark ? '#93C5FD' : theme.primary,
    },
    metadataRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: Spacing.md,
      gap: 6,
    },
    metadataText: {
      fontSize: 13,
      color: theme.textSecondary,
      fontWeight: '500',
    },
    newCalcButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: Spacing.lg,
      paddingVertical: 10,
      backgroundColor: theme.primaryTint,
      borderRadius: BorderRadius.md,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(37, 99, 235, 0.35)' : 'rgba(37, 99, 235, 0.2)',
    },
    btnIcon: {
      marginRight: 6,
    },
    newCalcButtonText: {
      fontSize: 14,
      fontWeight: '700',
      color: isDark ? '#60A5FA' : theme.primary,
    },
  });
