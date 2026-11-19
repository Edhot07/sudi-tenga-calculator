import React, { useMemo } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DOMAIN_INFO } from '@/constants/domain';
import { BorderRadius, ColorTheme, Spacing } from '@/constants/theme';
import { useAppTheme } from '@/context/ThemeContext';

interface InfoModalProps {
  visible: boolean;
  onClose: () => void;
}

export function InfoModal({ visible, onClose }: InfoModalProps) {
  const { theme, isDark } = useAppTheme();
  const styles = useMemo(() => getStyles(theme, isDark), [theme, isDark]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTitleWrap}>
              <View style={styles.iconCircle}>
                <Ionicons name="book-outline" size={20} color={theme.primary} />
              </View>
              <View>
                <Text style={styles.title}>About Sudi Tenga</Text>
                <Text style={styles.subtitle}>Chakma Traditional Lending System</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.closeBtn}
              onPress={onClose}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              accessibilityRole="button"
              accessibilityLabel="Close info modal"
            >
              <Ionicons name="close" size={20} color={theme.textSecondary} />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.scrollArea}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* System Overview */}
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>Traditional Concept</Text>
              <Text style={styles.paragraph}>
                In the Chakma community, <Text style={styles.bold}>&quot;Sudi Tenga&quot;</Text> is a traditional informal money-lending calculation system. Unlike annual compound bank interest, this system operates on a monthly flat simple interest percentage.
              </Text>
            </View>

            {/* Glossary */}
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>Chakma Dialect Glossary</Text>
              <View style={styles.glossaryList}>
                {DOMAIN_INFO.glossary.map((item, idx) => (
                  <View key={idx} style={styles.glossaryItem}>
                    <View style={styles.glossaryTop}>
                      <Text style={styles.glossaryTerm}>{item.term}</Text>
                      <View style={styles.meaningPill}>
                        <Text style={styles.meaningText}>{item.meaning}</Text>
                      </View>
                    </View>
                    <Text style={styles.glossaryDesc}>{item.description}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Mathematical Formulas */}
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>Mathematical Formulas</Text>
              <View style={styles.formulaCard}>
                <View style={styles.formulaRow}>
                  <Text style={styles.formulaLabel}>Monthly Interest:</Text>
                  <Text style={styles.formulaCode}>P × (R ÷ 100)</Text>
                </View>
                <View style={styles.formulaDivider} />
                <View style={styles.formulaRow}>
                  <Text style={styles.formulaLabel}>Total Interest (I):</Text>
                  <Text style={styles.formulaCode}>(R ÷ 100) × P × M</Text>
                </View>
                <View style={styles.formulaDivider} />
                <View style={styles.formulaRow}>
                  <Text style={styles.formulaLabel}>Total to Pay (A):</Text>
                  <Text style={styles.formulaCode}>P + I</Text>
                </View>
              </View>
            </View>

            {/* Example Calculation */}
            <View style={styles.section}>
              <Text style={styles.sectionHeading}>Standard Example</Text>
              <View style={styles.exampleCard}>
                <Text style={styles.exampleItem}>• Principal (P): ₹10,000</Text>
                <Text style={styles.exampleItem}>• Monthly Rate (R): 10% per month</Text>
                <Text style={styles.exampleItem}>• Duration (M): 6 months</Text>
                <View style={styles.exampleHighlight}>
                  <Text style={styles.exampleResultText}>
                    Interest = ₹6,000 | Total = ₹16,000
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Close button */}
          <TouchableOpacity
            style={styles.dismissBtn}
            onPress={onClose}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="Dismiss dialog"
          >
            <Text style={styles.dismissBtnText}>Got It</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const getStyles = (theme: ColorTheme, isDark: boolean) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: isDark ? 'rgba(0, 0, 0, 0.75)' : 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    modalBox: {
      backgroundColor: theme.surface,
      borderTopLeftRadius: BorderRadius.xl + 6,
      borderTopRightRadius: BorderRadius.xl + 6,
      maxHeight: '85%',
      paddingTop: Spacing.lg,
      paddingHorizontal: Spacing.xl,
      paddingBottom: Spacing.xl,
      borderWidth: 1,
      borderColor: theme.border,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: Spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    headerTitleWrap: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.md,
    },
    iconCircle: {
      width: 38,
      height: 38,
      borderRadius: 19,
      backgroundColor: theme.primaryTint,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 18,
      fontWeight: '800',
      color: theme.text,
    },
    subtitle: {
      fontSize: 12,
      color: theme.textSecondary,
    },
    closeBtn: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: theme.surfaceElevated,
      alignItems: 'center',
      justifyContent: 'center',
    },
    scrollArea: {
      marginTop: Spacing.md,
    },
    scrollContent: {
      paddingBottom: Spacing.lg,
    },
    section: {
      marginBottom: Spacing.lg,
    },
    sectionHeading: {
      fontSize: 14,
      fontWeight: '700',
      color: isDark ? '#60A5FA' : theme.primary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
      marginBottom: Spacing.sm,
    },
    paragraph: {
      fontSize: 14,
      color: theme.textSecondary,
      lineHeight: 22,
    },
    bold: {
      color: theme.text,
      fontWeight: '700',
    },
    glossaryList: {
      gap: Spacing.sm,
    },
    glossaryItem: {
      backgroundColor: theme.surfaceElevated,
      borderRadius: BorderRadius.md,
      padding: Spacing.md,
      borderWidth: 1,
      borderColor: theme.border,
    },
    glossaryTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
      flexWrap: 'wrap',
      gap: 6,
    },
    glossaryTerm: {
      fontSize: 14,
      fontWeight: '700',
      color: theme.text,
    },
    meaningPill: {
      backgroundColor: theme.primaryTint,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: BorderRadius.round,
    },
    meaningText: {
      fontSize: 11,
      fontWeight: '600',
      color: isDark ? '#93C5FD' : theme.primary,
    },
    glossaryDesc: {
      fontSize: 12,
      color: theme.textSecondary,
      lineHeight: 18,
    },
    formulaCard: {
      backgroundColor: theme.surfaceElevated,
      borderRadius: BorderRadius.md,
      padding: Spacing.md,
      borderWidth: 1,
      borderColor: theme.border,
    },
    formulaRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 4,
    },
    formulaLabel: {
      fontSize: 13,
      color: theme.textSecondary,
    },
    formulaCode: {
      fontFamily: 'monospace',
      fontSize: 13,
      fontWeight: '700',
      color: theme.success,
    },
    formulaDivider: {
      height: 1,
      backgroundColor: theme.border,
      marginVertical: 4,
    },
    exampleCard: {
      backgroundColor: theme.surfaceElevated,
      borderRadius: BorderRadius.md,
      padding: Spacing.md,
      borderWidth: 1,
      borderColor: theme.border,
      gap: 4,
    },
    exampleItem: {
      fontSize: 13,
      color: theme.textSecondary,
    },
    exampleHighlight: {
      marginTop: 6,
      paddingTop: 6,
      borderTopWidth: 1,
      borderTopColor: theme.border,
    },
    exampleResultText: {
      fontSize: 13,
      fontWeight: '700',
      color: theme.success,
    },
    dismissBtn: {
      backgroundColor: theme.primary,
      paddingVertical: 14,
      borderRadius: BorderRadius.lg,
      alignItems: 'center',
      marginTop: Spacing.sm,
    },
    dismissBtnText: {
      fontSize: 15,
      fontWeight: '700',
      color: '#FFFFFF',
    },
  });
