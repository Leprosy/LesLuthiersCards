import React, { PropsWithChildren, createContext, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

type ModalContextState = {
  modalVisible: boolean,
  setContent: (el: React.JSX.Element) => void,
  setModalVisible: (vis: boolean) => void
};

export const ModalContext = createContext<ModalContextState>({} as ModalContextState);

export function ModalProvider({ children }: PropsWithChildren) {
  const [modalVisible, setModalVisible] = useState(false);
  const [content, setContent] = useState<React.JSX.Element>(<View><Text>Modal content in here</Text></View>);

  return (
    <ModalContext.Provider value={{ modalVisible, setModalVisible, setContent }}>
      {children}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          console.log("onRequestClose");
          setModalVisible(!modalVisible);
        }}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => { setModalVisible(false); }}
        >
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              {content}
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </ModalContext.Provider>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    backgroundColor: "rgba(0,0,0,0.8)",
    height: "100%"
  },

  modalContainer: {
    opacity: 1,
    backgroundColor: "#ccc",
    borderColor: "#000",
    borderWidth: 2,
    padding: 10,
    marginVertical: "auto",
    marginHorizontal: "auto",
  }
});