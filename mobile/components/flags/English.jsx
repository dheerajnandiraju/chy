import Svg, { Rect } from "react-native-svg";

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={100}
      height={100}
      {...props}
    >
      {/* Background */}
      <Rect width="100" height="100" fill="#f0f0f0" />

      {/* "E" Letter */}
      <Rect x="20" y="20" width="60" height="15" fill="#000" />
      <Rect x="20" y="42.5" width="40" height="15" fill="#000" />
      <Rect x="20" y="65" width="60" height="15" fill="#000" />
    </Svg>
  );
}

export default SvgComponent;