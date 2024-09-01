import * as React from 'react';
import {
    Easing,
    Animated,
    View,
    StyleSheet,
    Text
} from 'react-native';
import Svg, { G, Circle, Line, LinearGradient, Defs, Stop, RadialGradient } from 'react-native-svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useColorStyle from '../Styles/ColorStyle';
import FontStyles from '../Styles/FontStyle';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function Speedo2({
    percentage = 75,
    radius = 140,
    strokeWidth = 11,
    duration = 500,
    color = "tomato",
    delay = 100,
    textColor = "black",
    max = 100,
    gcolor,
    g2color,
    innerContent = null,
}) {
    const animated = React.useRef(new Animated.Value(0)).current;
    const circleRef = React.useRef();
    const circumference = 2 * Math.PI * radius;
    const halfCircle = radius + strokeWidth;

    const colorStyle = useColorStyle();
    const fontstyles = FontStyles();

    const [isInitialAnimationDone, setIsInitialAnimationDone] = React.useState(false);

    const initialCarAnimation = (maxValue) => {
        Animated.sequence([
            Animated.timing(animated, {
                toValue: 72,
                duration: 1000,
                useNativeDriver: true,
                easing: Easing.out(Easing.ease),
            }),
            Animated.timing(animated, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
                easing: Easing.out(Easing.ease),
            }),
        ]).start(() => {
            setIsInitialAnimationDone(true);
        });
    };

    const valueChangeAnimation = (toValue) => {
        Animated.timing(animated, {
            toValue,
            duration,
            delay,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease),
        }).start();
    }

    React.useEffect(() => {
        initialCarAnimation(100)
    }, []);

    React.useEffect(() => {
        if (isInitialAnimationDone) {
            valueChangeAnimation(percentage);
        }
    }, [isInitialAnimationDone, percentage]);

    React.useEffect(() => {
        const listenerId = animated.addListener((v) => {
            const maxPerc = (100 * v.value) / max;
            const strokeDashoffset = circumference - (circumference * maxPerc) / 100;
            if (circleRef?.current) {
                circleRef.current.setNativeProps({
                    strokeDashoffset,
                });
            }
        });

        return () => {
            animated.removeListener(listenerId);
        };
    }, [animated, circumference, max, percentage]);

    const cx = radius;
    const cy = radius;
    const getTickPosition = (angle) => {
        const radian = (angle * Math.PI) / 180;
        // Outer point of the tick line (adjusted to be further from the center)
        const x1 = cx + (radius - strokeWidth - 4) * Math.cos(radian);
        const y1 = cy + (radius - strokeWidth - 4) * Math.sin(radian);
        // Inner point of the tick line (closer to the center)
        const x2 = cx + (radius - strokeWidth * 1.5 - 4) * Math.cos(radian);
        const y2 = cy + (radius - strokeWidth * 1.5 - 4) * Math.sin(radian);
        return { x1, y1, x2, y2 };
    };

    return (
        <View style={{ width: radius * 2, height: radius * 2 }}>

            <Svg
                height={radius * 2}
                width={radius * 2}
                viewBox={`0 0 ${radius * 2} ${radius * 2}`}>
                <Defs>
                    <LinearGradient id="grad" gradientTransform="rotate(70)">
                        <Stop offset="0%" stopColor={g2color} />
                        <Stop offset="100%" stopColor={gcolor} />
                    </LinearGradient>
                    {/* <RadialGradient id="grad" x1="0" y1="0" x2="100%" y2="0">
                        <Stop offset="90%" stopColor='transparent' />
                        <Stop offset="100%" stopColor={colorStyle.diffBlue} />
                    </RadialGradient> */}
                </Defs>
                <G
                    rotation="135"
                    origin={`${radius}, ${radius}`}>
                    <AnimatedCircle
                        ref={circleRef}
                        cx={radius}
                        cy={radius}
                        r={radius - strokeWidth / 2}
                        fill="transparent"
                        stroke="url(#grad)"
                        strokeLinecap="round"
                        strokeWidth={strokeWidth}
                        strokeDashoffset={circumference}
                        strokeDasharray={circumference}
                    />
                    <Circle
                        cx={radius}
                        cy={radius}
                        r={radius - strokeWidth / 2}
                        fill="transparent"
                        // stroke={gcolor}
                        stroke="url(#grad)"
                        strokeWidth={strokeWidth}
                        strokeOpacity=".18"
                        strokeDasharray={circumference}
                        strokeLinecap='round'
                        strokeDashoffset={circumference * 0.274}
                    />

                    {Array.from({ length: 46 }, (_, i) => (
                        <Line
                            key={i}
                            x1={getTickPosition(i * 6).x1}
                            y1={getTickPosition(i * 6).y1}
                            x2={getTickPosition(i * 6).x2}
                            y2={getTickPosition(i * 6).y2}
                            stroke={i % 5 == 0 ? colorStyle.mainText : gcolor}
                            strokeWidth={i % 5 == 0 ? '3' : '2'}
                        />
                    ))}
                </G>


            </Svg>
            {/* <View style={styles.iconContainer}>
                {innerContent || <Ionicons name="calendar" size={20} color="blue" />}
            </View> */}
        </View>
    );
}

const styles = StyleSheet.create({
    iconContainer: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
    },
    percentageText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
