import React, { useMemo } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CustomInput } from '@/components/CustomInput';
import { DOMAIN_INFO } from '@/constants/domain';
import { BorderRadius, ColorTheme, Spacing } from '@/constants/theme';
import { useAppTheme } from '@/context/ThemeContext';
import { CalculationInput } from '@/types/calculator';

interface InputCardProps {
  inputs: CalculationInput;
  onChangeInput: (field: keyof CalculationInput, value: string) => void;
  onCalculate: () => void;
  fieldErrors?: {
    principal?: string;
    percentage?: string;
    months?: string;
  };
}

export function InputCard({
  inputs,
  onChangeInput,
  onCalculate,
  fieldErrors = {},
}: InputCardProps) {
  const { theme, isDark } = useAppTheme();
  const styles = useMemo(() => getStyles(theme, isDark), [theme, isDark]);

  return (
    <View style={styles.card}>
      {/* Title & Subtitle */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Ionicons name="document-text-outline" size={20} color={theme.primary} />
          <Text style={styles.title}>Loan Details</Text>
        </View>
        <Text style={styles.subtitle}>Enter the lending details below</Text>
      </View>

      {/* Field 1: Principal Amount */}
      <CustomInput
        label="Principal Amount"
        sublabel="Tenga (Lent/Borrowed)"
        prefix="₹"
        placeholder="e.g. 1000"
        value={inputs.principal}
        onChangeText={(text) => onChangeInput('principal', text)}
        keyboardType="numeric"
        error={fieldErrors.principal}
      />

      {/* Field 2: Rate per Month (%) / Hoi tenga dor */}
      <View>
        <CustomInput
          label="Rate per Month (%) / Hoi tenga dor"
          sublabel="Flat Monthly Rate"
          suffix="%"
          placeholder="e.g. 10"
          value={inputs.percentage}
          onChangeText={(text) => onChangeInput('percentage', text)}
          keyboardType="numeric"
          error={fieldErrors.percentage}
        />

        {/* Quick Rate Preset Chips */}
        <View style={styles.chipRow}>
          <Text style={styles.chipLabel}>Common rates:</Text>
          <View style={styles.chipGroup}>
            {DOMAIN_INFO.presetRates.map((rate) => {
              const isSelected = inputs.percentage === rate.toString();
              return (
                <TouchableOpacity
                  key={rate}
                  style={[styles.presetChip, isSelected && styles.presetChipActive]}
                  onPress={() => onChangeInput('percentage', rate.toString())}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.presetChipText,
                      isSelected && styles.presetChipTextActive,
                    ]}
                  >
                    {rate}%
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>

      {/* Field 3: Duration (Months) */}
      <View style={styles.monthsSection}>
        <CustomInput
          label="Duration (Months)"
          sublabel="Loan Period"
          suffixIcon={
            <Ionicons name="calendar-outline" size={18} color={theme.textSecondary} />
          }
          placeholder="e.g. 6"
          value={inputs.months}
          onChangeText={(text) => onChangeInput('months', text)}
          keyboardType="numeric"
          error={fieldErrors.months}
        />

        {/* Quick Months Preset Chips */}
        <View style={styles.chipRow}>
          <Text style={styles.chipLabel}>Quick periods:</Text>
          <View style={styles.chipGroup}>
            {DOMAIN_INFO.presetMonths.map((m) => {
              const isSelected = inputs.months === m.toString();
              return (
                <TouchableOpacity
                  key={m}
                  style={[styles.presetChip, isSelected && styles.presetChipActive]}
                  onPress={() => onChangeInput('months', m.toString())}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.presetChipText,
                      isSelected && styles.presetChipTextActive,
                    ]}
                  >
                    {m} {m === 1 ? 'mo' : 'mos'}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>

      {/* Primary Action Button: "Calculate Total" */}
      <TouchableOpacity
        style={styles.calculateButton}
        onPress={onCalculate}
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel="Calculate Total"
      >
        <Ionicons name="calculator-outline" size={20} color="#FFFFFF" style={styles.calcIcon} />
        <Text style={styles.calculateButtonText}>Calculate Total</Text>
      </TouchableOpacity>
    </View>
  );
}

const getStyles = (theme: ColorTheme, isDark: boolean) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.surface,
      borderRadius: BorderRadius.xl,
      padding: Spacing.xl,
      marginHorizontal: Spacing.md,
      marginBottom: Spacing.xl,
      borderWidth: 1,
      borderColor: theme.border,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: isDark ? 0.25 : 0.06,
      shadowRadius: 12,
      elevation: 3,
    },
    header: {
      marginBottom: Spacing.lg,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.sm,
    },
    title: {
      fontSize: 18,
      fontWeight: '800',
      color: theme.text,
      letterSpacing: -0.2,
    },
    subtitle: {
      fontSize: 13,
      color: theme.textSecondary,
      marginTop: 3,
    },
    monthsSection: {
      marginBottom: Spacing.md,
    },
    chipRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: -Spacing.sm,
      marginBottom: Spacing.md,
      flexWrap: 'wrap',
      gap: 6,
    },
    chipLabel: {
      fontSize: 11,
      color: theme.textMuted,
      fontWeight: '600',
    },
    chipGroup: {
      flexDirection: 'row',
      gap: 6,
    },
    presetChip: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: BorderRadius.md,
      backgroundColor: theme.surfaceElevated,
      borderWidth: 1,
      borderColor: theme.border,
    },
    presetChipActive: {
      backgroundColor: theme.primaryTint,
      borderColor: theme.primary,
    },
    presetChipText: {
      fontSize: 12,
      fontWeight: '600',
      color: theme.textSecondary,
    },
    presetChipTextActive: {
      color: isDark ? '#60A5FA' : theme.primary,
      fontWeight: '700',
    },
    calculateButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.primary,
      paddingVertical: 14,
      borderRadius: BorderRadius.lg,
      marginTop: Spacing.sm,
      shadowColor: theme.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: isDark ? 0.35 : 0.25,
      shadowRadius: 10,
      elevation: 5,
    },
    calcIcon: {
      marginRight: Spacing.sm,
    },
    calculateButtonText: {
      fontSize: 16,
      fontWeight: '700',
      color: '#FFFFFF',
      letterSpacing: 0.3,
    },
  });
