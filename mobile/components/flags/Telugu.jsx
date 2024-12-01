import Svg, { Path } from "react-native-svg";

function TeluguLetter(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" {...props}>
      <Path
        d="M100 50 C 120 80, 160 100, 140 150 C 120 190, 80 190, 60 150 C 40 110, 60 80, 100 50 Z"
        fill="purple"
      />
      <Path
        d="M90 100 C 110 90, 120 110, 100 120 C 80 130, 70 110, 90 100 Z"
        fill="white"
      />
    </Svg>
  );
}

export default TeluguLetter;