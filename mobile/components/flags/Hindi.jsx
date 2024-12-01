import Svg, { Path } from "react-native-svg";

function HindiLetter(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" {...props}>
      <Path
        d="M50 150 C 80 50, 120 50, 150 150 L 130 150 C 110 80, 90 80, 70 150 Z"
        fill="orange"
      />
      <Path
        d="M70 50 L 130 50 L 130 70 L 70 70 Z"
        fill="black"
      />
    </Svg>
  );
}

export default HindiLetter;