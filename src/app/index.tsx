import React, { useMemo, useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { Header } from '@/components/Header';
import { HistorySection } from '@/components/HistorySection';
import { InfoModal } from '@/components/InfoModal';
import { InputCard } from '@/components/InputCard';
import { ResultCard } from '@/components/ResultCard';
import { BorderRadius, ColorTheme, MaxContentWidth, Spacing } from '@/constants/theme';
import { useAppTheme } from '@/context/ThemeContext';
import { useCalculationHistory } from '@/hooks/useCalculationHistory';
import { Calculation, CalculationInput, CalculationResult } from '@/types/calculator';
import { performCalculation, validateInputs } from '@/utils/calculator';
import { formatDateTime } from '@/utils/formatters';

export default function SudiTengaScreen() {
  const insets = useSafeAreaInsets();
  const { theme, isDark } = useAppTheme();
  const styles = useMemo(() => getStyles(theme, isDark), [theme, isDark]);

  const [inputs, setInputs] = useState<CalculationInput>({
    principal: '',
    percentage: '',
    months: '',
  });

  const [fieldErrors, setFieldErrors] = useState<{
    principal?: string;
    percentage?: string;
    months?: string;
  }>({});

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);

  const { history, addCalculation, deleteCalculation, clearHistory } =
    useCalculationHistory();

  const handleInputChange = (field: keyof CalculationInput, value: string) => {
    // Only allow positive numbers and at most one decimal point
    const sanitized = value.replace(/[^0-9.]/g, '');
    const decimalCount = (sanitized.match(/\./g) || []).length;
    if (decimalCount > 1) return;

    setInputs((prev) => ({
      ...prev,
      [field]: sanitized,
    }));

    // Clear specific field error on typing
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
    if (alertMessage) {
      setAlertMessage(null);
    }
  };

  const handleCalculate = async () => {
    Keyboard.dismiss();

    const validation = validateInputs(
      inputs.principal,
      inputs.percentage,
      inputs.months
    );

    if (!validation.isValid) {
      const errorMsg =
        validation.errorMessage ||
        'Please enter valid positive numbers for amount, rate and months.';
      setAlertMessage(errorMsg);

      // Highlight specific fields
      const p = parseFloat(inputs.principal.trim());
      const r = parseFloat(inputs.percentage.trim());
      const m = parseFloat(inputs.months.trim());

      setFieldErrors({
        principal:
          !inputs.principal.trim() || isNaN(p) || p <= 0
            ? 'Enter valid amount > 0'
            : undefined,
        percentage:
          !inputs.percentage.trim() || isNaN(r) || r < 0
            ? 'Enter valid rate >= 0'
            : undefined,
        months:
          !inputs.months.trim() || isNaN(m) || m <= 0
            ? 'Enter valid months > 0'
            : undefined,
      });

      // Show native alert dialog
      Alert.alert('Invalid Input', errorMsg, [{ text: 'OK' }]);
      return;
    }

    setAlertMessage(null);
    setFieldErrors({});

    const principal = validation.principal!;
    const percentage = validation.percentage!;
    const months = validation.months!;

    const calcResult = performCalculation(principal, percentage, months);
    setResult(calcResult);

    // Save calculation into persistent history
    await addCalculation({
      principal: calcResult.principal,
      percentage: calcResult.percentage,
      months: calcResult.months,
      total: calcResult.totalRepayment,
      interest: calcResult.totalInterest,
      date: formatDateTime(),
    });
  };

  const handleNewCalculation = () => {
    setInputs({
      principal: '',
      percentage: '',
      months: '',
    });
    setFieldErrors({});
    setAlertMessage(null);
    setResult(null);
  };

  const handleSelectHistoryItem = (item: Calculation) => {
    setInputs({
      principal: item.principal.toString(),
      percentage: item.percentage.toString(),
      months: item.months.toString(),
    });
    setFieldErrors({});
    setAlertMessage(null);

    const calcResult = performCalculation(
      item.principal,
      item.percentage,
      item.months
    );
    setResult(calcResult);
  };

  // Ensure ample top padding to avoid any camera notch, cutout, or status bar
  const safeTopPadding = Math.max(
    insets.top,
    Platform.OS === 'android' ? 38 : 20
  );
  const safeBottomPadding = Math.max(insets.bottom, 24);

  return (
    <View style={styles.rootContainer}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingTop: safeTopPadding,
              paddingBottom: safeBottomPadding + Spacing.xl,
              paddingLeft: insets.left,
              paddingRight: insets.right,
            },
          ]}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.innerContainer}>
            {/* 1. Header with Light/Dark Mode Switch */}
            <Header onPressInfo={() => setShowInfoModal(true)} />

            {/* In-app Validation Alert Banner (if error occurred) */}
            {alertMessage ? (
              <View style={styles.alertBanner}>
                <Ionicons name="alert-circle" size={20} color={theme.danger} />
                <Text style={styles.alertBannerText}>{alertMessage}</Text>
                <TouchableOpacity
                  onPress={() => setAlertMessage(null)}
                  hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                  activeOpacity={0.7}
                >
                  <Ionicons name="close" size={18} color={theme.danger} />
                </TouchableOpacity>
              </View>
            ) : null}

            {/* 2. Animated Result Card (conditionally rendered above the form upon calculation) */}
            {result && (
              <ResultCard
                result={result}
                onNewCalculation={handleNewCalculation}
              />
            )}

            {/* 3. Input Card */}
            <InputCard
              inputs={inputs}
              onChangeInput={handleInputChange}
              onCalculate={handleCalculate}
              fieldErrors={fieldErrors}
            />

            {/* 4. Calculation History Section */}
            <HistorySection
              history={history}
              onClearHistory={clearHistory}
              onSelectCalculation={handleSelectHistoryItem}
              onDeleteCalculation={deleteCalculation}
            />
          </View>
        </ScrollView>

        {/* Domain Glossary & Help Modal */}
        <InfoModal
          visible={showInfoModal}
          onClose={() => setShowInfoModal(false)}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

const getStyles = (theme: ColorTheme, isDark: boolean) =>
  StyleSheet.create({
    rootContainer: {
      flex: 1,
      backgroundColor: theme.background,
    },
    keyboardAvoid: {
      flex: 1,
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      alignItems: 'center',
      paddingHorizontal: Spacing.sm,
    },
    innerContainer: {
      width: '100%',
      maxWidth: MaxContentWidth,
    },
    alertBanner: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.dangerTint,
      borderRadius: BorderRadius.lg,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.md,
      marginHorizontal: Spacing.md,
      marginBottom: Spacing.lg,
      borderWidth: 1,
      borderColor: theme.dangerBorder,
      gap: Spacing.sm,
    },
    alertBannerText: {
      flex: 1,
      fontSize: 13,
      color: theme.danger,
      fontWeight: '600',
      lineHeight: 18,
    },
  });
