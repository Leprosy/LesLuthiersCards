import React, { PropsWithChildren } from "react";
import { Text, View, ViewStyle } from "react-native";
import { colors, styles } from "../const/styles";

type SectionProps = PropsWithChildren<{
  style?: ViewStyle;
  title: string;
  text: string;
}>;

export function Section({
  title,
  text,
  style,
  children,
}: SectionProps): React.JSX.Element {
  const theme = "light"; //useColorScheme() || "light";

  return (
    <View style={[styles.sectionContainer, colors[theme].container, style]}>
      <Text style={[styles.title, colors[theme].text]}>{title}</Text>
      <Text style={colors[theme].text}>{text}</Text>
      {children}
    </View>
  );
}
