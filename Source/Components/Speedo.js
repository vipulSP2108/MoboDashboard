import React, { useContext } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Circle, RadialGradient, Line, Text, G } from 'react-native-svg';
import FontStyles from '../Styles/FontStyle';
import useColorStyle from '../Styles/ColorStyle';
import { GlobalStateContext } from '../Context/GlobalStateProvider';

const { width } = Dimensions.get('window');
const size = width - 480;
const strokeWidth = 40;
const smallStrokeWidth = 6; // Width of the small circle's stroke
const { PI } = Math;
const r = (size - strokeWidth) / 2;
const smallRadius = r - 30;
const largeRadius = r + 20; // Radius of the small circle
const cx = size / 2;
const cy = size / 2;
const tickLength = 21; // Length of the tick lines

const Speedo = ({ color1persentage, color2persentage, colorsmall1persentage, colorsmall2persentage, opacity, onlyBG = false, maxSpeed = 0 }) => {
    const circumference = r * 2 * PI;
    const smallCircumference = smallRadius * 2 * PI; // Circumference of the small circle
    const largeCircumference = largeRadius * 2 * PI;
    const getStrokeDashoffset = (angle) => circumference * (1 - (angle / 360));
    const colorStyle = useColorStyle();

    const { fontFamilies } = useContext(GlobalStateContext)
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

    const startAngle = -405;
    const offset = (startAngle / 360) * circumference;
    const arcLength = (Math.min(colorsmall2persentage, 60) / 360) * circumference;

    const offset2 = (startAngle / 360) * circumference;
    const arcLength2 = (Math.min(colorsmall1persentage, 40) / 360) * circumference;

    // const maxSpeed = 180;
    const segments = 9;
    const segmentValue = maxSpeed / segments ;
    return (
        <Svg style={styles.container}>
            <Defs>
                <RadialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <Stop offset="85%" stopColor='#101010' />
                    <Stop offset="100%" stopColor={colorStyle.diffBlue} stopOpacity={opacity} />
                </RadialGradient>
                <RadialGradient id="grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <Stop offset="85%" stopColor='#101010' />
                    <Stop offset="100%" stopColor={colorStyle.diffRed} stopOpacity={opacity} />
                </RadialGradient>
                <RadialGradient id="gradsmall2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <Stop offset="90%" stopColor='#101010' />
                    <Stop offset="100%" stopColor={colorStyle.diffBlue} stopOpacity={opacity} />
                </RadialGradient>
                <RadialGradient id="gradsmall" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <Stop offset="90%" stopColor='#101010' />
                    <Stop offset="100%" stopColor={colorStyle.diffRed} stopOpacity={opacity} />
                </RadialGradient>
            </Defs>



            <G transform={`rotate(140 ${cx} ${cy})`}>
                <Circle
                    stroke="url(#gradsmall)"
                    fill="none"
                    strokeWidth={18}
                    cx={cx}
                    cy={cy}
                    r={r + 11}
                    strokeDasharray={`${arcLength}, ${circumference - (10 / 360) * circumference}`}
                    strokeDashoffset={offset}
                    transform={`rotate(-75 ${cx} ${cy})`}
                />
                <Circle
                    stroke="url(#gradsmall2)"
                    fill="none"
                    strokeWidth={18}
                    cx={cx}
                    cy={cy}
                    r={r + 11}
                    strokeDasharray={`${arcLength2}, ${circumference - (10 / 360) * circumference}`}
                    strokeDashoffset={offset2}
                    transform={`rotate(-75 ${cx} ${cy})`}
                />

                <Circle
                    stroke="url(#grad)"
                    fill="none"
                    strokeWidth={strokeWidth}
                    cx={cx}
                    cy={cy}
                    r={r}
                    strokeDasharray={`${circumference}, ${circumference}`}
                    strokeDashoffset={getStrokeDashoffset(Math.min(color2persentage, 264))}
                />
                <Circle
                    stroke="url(#grad1)"
                    fill="none"
                    strokeWidth={strokeWidth}
                    cx={cx}
                    cy={cy}
                    r={r}
                    strokeDasharray={`${circumference}, ${circumference}`}
                    strokeDashoffset={getStrokeDashoffset(Math.min(color1persentage, 180))}
                />
            </G>


            {!onlyBG &&
                <>
                    {/* Add ticks every 10 degrees */}
                    {Array.from({ length: 60 }, (_, i) => (
                        <Line
                            key={i}
                            x1={getTickPosition(i * 6).x1}
                            y1={getTickPosition(i * 6).y1}
                            x2={getTickPosition(i * 6).x2}
                            y2={getTickPosition(i * 6).y2}
                            stroke={'#101010'}
                            strokeWidth="2"
                        />
                    ))}

                    {/* Add digits 0 to 12 */}
                    {Array.from({ length: segments }, (_, i) => {
                        const angle = i * 35 + 160; // Each hour represents 30 degrees
                        const radian = ((angle * PI) / 200) + 0.01;
                        const x = cx + (r - 18) * Math.cos(radian);
                        const y = cy + (r - 18) * Math.sin(radian) + 11; // Adjust '10' to center the text vertically
                        return (
                            <Text
                                key={i}
                                x={x}
                                y={y}
                                fill={'rgb(165 243 252)'}
                                opacity={1}
                                fontFamily={fontFamilies.Zain_bold}
                                fontSize="18"
                                fontWeight="bold"
                                textAnchor="middle"
                            >
                                {/* {Math.round(i * segmentValue)} */}
                                {Math.ceil((i * segmentValue)/ 1) * 1}
                            </Text>
                        );
                    })}
                </>
            }
        </Svg>
    );
};

const styles = StyleSheet.create({
    container: {
        width: size,
        height: size,
        // transform: [{ rotateZ: '140deg' }],
    },
});

export default Speedo;
