import React, { useMemo, useRef } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { BorderRadius, ColorTheme, Spacing } from '@/constants/theme';
import { useAppTheme } from '@/context/ThemeContext';

interface CustomInputProps extends TextInputProps {
  label: string;
  sublabel?: string;
  prefix?: string;
  prefixIcon?: React.ReactNode;
  suffix?: string;
  suffixIcon?: React.ReactNode;
  error?: string;
}

export function CustomInput({
  label,
  sublabel,
  prefix,
  prefixIcon,
  suffix,
  suffixIcon,
  value,
  error,
  ...props
}: CustomInputProps) {
  const { theme, isDark } = useAppTheme();
  const styles = useMemo(() => getStyles(theme, isDark), [theme, isDark]);
  const inputRef = useRef<React.ComponentRef<typeof TextInput>>(null);

  const handleContainerPress = () => {
    inputRef.current?.focus();
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleContainerPress} style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        {sublabel && <Text style={styles.sublabel}>{sublabel}</Text>}
      </Pressable>

      <Pressable
        onPress={handleContainerPress}
        style={[
          styles.inputContainer,
          Boolean(error) && styles.inputContainerError,
        ]}
      >
        {/* Prefix Container */}
        {(prefix || prefixIcon) && (
          <View style={styles.prefixContainer} pointerEvents="none">
            {prefixIcon}
            {prefix && <Text style={styles.prefixText}>{prefix}</Text>}
          </View>
        )}

        {/* Fixed-dimension Input (never expands/shrinks on typing or focus) */}
        <TextInput
          ref={inputRef}
          style={[
            styles.textInput,
            Platform.OS === 'web' && ({ outlineStyle: 'none' } as any),
          ]}
          placeholderTextColor={theme.textMuted}
          value={value}
          selectionColor={theme.primary}
          multiline={false}
          {...props}
        />

        {/* Suffix Container */}
        {(suffix || suffixIcon) && (
          <View style={styles.suffixContainer} pointerEvents="none">
            {suffixIcon}
            {suffix && <Text style={styles.suffixText}>{suffix}</Text>}
          </View>
        )}
      </Pressable>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const getStyles = (theme: ColorTheme, isDark: boolean) =>
  StyleSheet.create({
    container: {
      marginBottom: Spacing.lg,
    },
    labelRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: Spacing.xs + 2,
      paddingVertical: 2,
    },
    label: {
      fontSize: 13,
      fontWeight: '700',
      color: theme.text,
      letterSpacing: 0.2,
    },
    sublabel: {
      fontSize: 11,
      color: isDark ? '#60A5FA' : theme.primary,
      fontWeight: '600',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.surfaceInput,
      borderRadius: BorderRadius.lg,
      borderWidth: 1,
      borderColor: theme.border,
      height: 50,
      maxHeight: 50,
      overflow: 'hidden',
    },
    inputContainerError: {
      borderColor: theme.danger,
      backgroundColor: theme.dangerTint,
    },
    prefixContainer: {
      paddingHorizontal: Spacing.md,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderRightWidth: 1,
      borderRightColor: theme.border,
      backgroundColor: theme.surfaceElevated,
      flexDirection: 'row',
    },
    prefixText: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.textSecondary,
    },
    textInput: {
      flex: 1,
      paddingHorizontal: Spacing.md,
      paddingVertical: 0,
      fontSize: 15,
      fontWeight: '600',
      color: theme.text,
      height: 50,
      maxHeight: 50,
      textAlignVertical: 'center',
    },
    suffixContainer: {
      paddingHorizontal: Spacing.md,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderLeftWidth: 1,
      borderLeftColor: theme.border,
      backgroundColor: theme.surfaceElevated,
      flexDirection: 'row',
    },
    suffixText: {
      fontSize: 15,
      fontWeight: '700',
      color: theme.textSecondary,
    },
    errorText: {
      fontSize: 12,
      color: theme.danger,
      marginTop: 4,
      fontWeight: '500',
    },
  });
