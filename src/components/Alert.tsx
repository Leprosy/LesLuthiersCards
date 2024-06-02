import { Text, View, useWindowDimensions } from "react-native";
import { gameStyles } from "../const/styles";
import { RegularButton } from "./RegularButton";
import { useContext } from "react";
import { ModalContext } from "../context/Modal";

type AlertProps = {
  title: string;
  text: string;
}

export function Alert({ title, text }: AlertProps): React.JSX.Element {
  const { width } = useWindowDimensions();
  const { setModalVisible } = useContext(ModalContext);

  return (
    <View style={{ width: width * 0.7 }}>
      <Text style={[gameStyles.title, gameStyles.textCenter]}>{title}</Text>
      <Text style={[gameStyles.normalText, gameStyles.textCenter]}>{text}</Text>
      <RegularButton title="Ok" onPress={() => setModalVisible(false)} />
    </View>
  );
}
