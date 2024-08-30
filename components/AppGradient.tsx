import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native";
import Colors from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";

interface AppGradientProps {
  children: any;
  colors?: string[];
  className?: string;
}

const AppGradient = ({
  children,
  colors = [Colors.grey, Colors.dark],
  className,
}: AppGradientProps) => {
  return (
    <LinearGradient colors={colors} className={`flex-1 ${className}`}>
      <SafeAreaView className="flex-1 mx-5 my-3">{children}</SafeAreaView>
      <StatusBar style="light" />
    </LinearGradient>
  );
};

export default AppGradient;
