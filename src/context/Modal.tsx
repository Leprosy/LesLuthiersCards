import React, { PropsWithChildren, createContext, useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

type ModalContextState = {
  modalVisible: boolean,
  setContent: (el: React.JSX.Element) => void,
  setModalVisible: (vis: boolean) => void,
  setDismiss: (cb: () => void) => void,
  show: (el: React.JSX.Element) => void,
};

export const ModalContext = createContext<ModalContextState>({} as ModalContextState);

export function ModalProvider({ children }: PropsWithChildren) {
  const cb = () => {
    console.log("Modal: default onDismiss cb");
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [content, setContent] = useState<React.JSX.Element>(<View><Text>Modal content in here</Text></View>);
  const [onDismiss, setOnDismiss] = useState<()=> void>(() => cb);



  const setDismiss = (cb: () => void) => {
    setOnDismiss(() => cb);
  };

  const show = (el: React.JSX.Element) => {
    setContent(el);
    setTimeout(() => setModalVisible(true), 250);
  };

  useEffect(() => {
    console.log("Modal: clearing cb");
    setOnDismiss(() => cb);
  }, [content]);



  return (
    <ModalContext.Provider value={{ modalVisible, setModalVisible, setContent, setDismiss, show }}>
      {children}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          console.log("Modal: dismissed - onRequestClose");
          setModalVisible(!modalVisible);
          onDismiss();
          setOnDismiss(() => cb);
        }}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => {
            console.log("Modal: dismissed - normal");
            setModalVisible(!modalVisible);
            onDismiss();
            setOnDismiss(() => cb);
          }}
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
