import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Spacing, BorderRadius, ColorTheme } from '@/constants/theme';
import { useAppTheme } from '@/context/ThemeContext';

interface HeaderProps {
  onPressInfo?: () => void;
}

export function Header({ onPressInfo }: HeaderProps) {
  const { theme, isDark, toggleTheme } = useAppTheme();
  const styles = useMemo(() => getStyles(theme, isDark), [theme, isDark]);

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.iconTile}>
          <Ionicons name="calculator" size={26} color="#FFFFFF" />
        </View>

        <View style={styles.titleContainer}>
          <View style={styles.badgeRow}>
            <Text style={styles.title}>Sudi Tenga</Text>
            <View style={styles.traditionBadge}>
              <Text style={styles.traditionBadgeText}>Chakma System</Text>
            </View>
          </View>
          <Text style={styles.subtitle}>Chakma Money Lending Calculator</Text>
        </View>

        <View style={styles.actionsGroup}>
          {/* Light / Dark Mode Switch */}
          <TouchableOpacity
            style={styles.themeToggleBtn}
            onPress={toggleTheme}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            <Ionicons
              name={isDark ? 'sunny' : 'moon'}
              size={20}
              color={isDark ? '#FBBF24' : '#4F46E5'}
            />
          </TouchableOpacity>

          {/* Info Modal Button */}
          {onPressInfo && (
            <TouchableOpacity
              style={styles.infoButton}
              onPress={onPressInfo}
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityLabel="About Chakma Sudi Tenga"
            >
              <Ionicons
                name="information-circle-outline"
                size={22}
                color={theme.textSecondary}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const getStyles = (theme: ColorTheme, isDark: boolean) =>
  StyleSheet.create({
    container: {
      paddingVertical: Spacing.lg,
      paddingHorizontal: Spacing.md,
    },
    topRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconTile: {
      width: 48,
      height: 48,
      borderRadius: BorderRadius.lg,
      backgroundColor: theme.primary,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: theme.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: isDark ? 0.35 : 0.25,
      shadowRadius: 8,
      elevation: 6,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    titleContainer: {
      flex: 1,
      marginLeft: Spacing.md,
    },
    badgeRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.sm,
      flexWrap: 'wrap',
    },
    title: {
      fontSize: 22,
      fontWeight: '800',
      color: theme.text,
      letterSpacing: -0.3,
    },
    traditionBadge: {
      backgroundColor: theme.primaryTint,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: BorderRadius.round,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(37, 99, 235, 0.3)' : 'rgba(37, 99, 235, 0.2)',
    },
    traditionBadgeText: {
      fontSize: 10,
      fontWeight: '700',
      color: isDark ? '#60A5FA' : '#2563EB',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    subtitle: {
      fontSize: 13,
      color: theme.textSecondary,
      marginTop: 2,
    },
    actionsGroup: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    themeToggleBtn: {
      width: 38,
      height: 38,
      borderRadius: BorderRadius.round,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDark ? theme.surfaceElevated : '#EEF2F6',
      borderWidth: 1,
      borderColor: theme.border,
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: isDark ? 0.2 : 0.08,
      shadowRadius: 2,
      elevation: 1,
    },
    infoButton: {
      width: 38,
      height: 38,
      borderRadius: BorderRadius.round,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: isDark ? theme.surfaceElevated : '#EEF2F6',
      borderWidth: 1,
      borderColor: theme.border,
    },
  });
