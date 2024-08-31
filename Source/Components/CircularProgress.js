import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Circle, RadialGradient, Line, Text } from 'react-native-svg';
import FontStyles from '../Styles/FontStyle';
import useColorStyle from '../Styles/ColorStyle';

const { width } = Dimensions.get('window');
const size = width - 480;
const strokeWidth = 40;
const smallStrokeWidth = 6; // Width of the small circle's stroke
const { PI } = Math;
const r = (size - strokeWidth) / 2;
const smallRadius = r - 30; // Radius of the small circle
const cx = size / 2;
const cy = size / 2;
const tickLength = 21; // Length of the tick lines

const CircularProgress = ({ color1persentage, color2persentage, opacity }) => {
  const circumference = r * 2 * PI;
  const smallCircumference = smallRadius * 2 * PI; // Circumference of the small circle
  const getStrokeDashoffset = (angle) => circumference * (1 - (angle / 360));
  const colorStyle = useColorStyle();

  // Function to calculate tick positions
  const getTickPosition = (angle) => {
    const radian = (angle * PI) / 180;
    // Outer point of the tick line
    const x1 = cx + r * Math.cos(radian) * 2;
    const y1 = cy + r * Math.sin(radian) * 2;
    // Inner point of the tick line (where it should end, adjusting based on tick length)
    const x2 = cx + (r - tickLength) * Math.cos(radian);
    const y2 = cy + (r - tickLength) * Math.sin(radian);
    return { x1, y1, x2, y2 };
  };

  return (
    <Svg width={size} height={size} style={styles.container}>
      <Defs>
        <RadialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <Stop offset="85%" stopColor='black' />
          <Stop offset="100%" stopColor={colorStyle.diffBlue} stopOpacity={opacity} />
        </RadialGradient>
        <RadialGradient id="grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <Stop offset="85%" stopColor='black' />
          <Stop offset="100%" stopColor={colorStyle.diffRed} stopOpacity={opacity} />
        </RadialGradient>
      </Defs>
      <Circle
        stroke="url(#grad)"
        fill="none"
        strokeWidth={strokeWidth}
        cx={cx}
        cy={cy}
        r={r}
        strokeDasharray={`${circumference}, ${circumference}`}
        strokeDashoffset={getStrokeDashoffset(color2persentage)}
      />
      <Circle
        stroke="url(#grad1)"
        fill="none"
        strokeWidth={strokeWidth}
        cx={cx}
        cy={cy}
        r={r}
        strokeDasharray={`${circumference}, ${circumference}`}
        strokeDashoffset={getStrokeDashoffset(color1persentage)}
      />
      
      {/* Add small inner circle */}
      <Circle
        stroke={colorStyle.mainText}
        opacity={opacity}
        fill="none"
        strokeWidth={smallStrokeWidth}
        cx={cx}
        cy={cy}
        r={smallRadius}
        strokeDasharray={`${smallCircumference}, ${smallCircumference}`} // Use small circle circumference
        strokeDashoffset={smallCircumference * (1 - (color2persentage / 360))} // Adjust offset for 180 degrees
      />
      <Circle
        stroke={colorStyle.mainText} // Or any color you prefer
        fill="none"
        opacity={opacity}
        strokeWidth={smallStrokeWidth}
        cx={cx}
        cy={cy}
        r={smallRadius}
        strokeDasharray={`${smallCircumference}, ${smallCircumference}`} // Use small circle circumference
        strokeDashoffset={smallCircumference * (1 - (color1persentage / 360))} // Adjust offset for 180 degrees
      />

      {/* Add ticks every 10 degrees */}
      {Array.from({ length: 60 }, (_, i) => (
        <Line
          key={i}
          x1={getTickPosition(i * 6).x1}
          y1={getTickPosition(i * 6).y1}
          x2={getTickPosition(i * 6).x2}
          y2={getTickPosition(i * 6).y2}
          stroke={colorStyle.subBg}
          strokeWidth="2"
        />
      ))}
    </Svg>
  );
};

const styles = StyleSheet.create({
  container: {
    transform: [{ rotateZ: '150deg' }],
  },
});

export default CircularProgress;
