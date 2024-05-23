import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import { RootTabParamList } from "../types";
import { Colors, gameStyles } from "../const/styles";
import { imageStore } from "../lib/images";
import { MiniCard } from "../components/MiniCard";
import { Card } from "../lib/Card/Card";

export function CardScreen({ route }: BottomTabScreenProps<RootTabParamList, "Cartas">): React.JSX.Element {
  const card = route.params?.card;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.generalBg }}>
      { card !== undefined ?
        <View style={{ padding: 20 }}>
          <Text style={[gameStyles.title]}>{card.name}</Text>
          <Text style={[gameStyles.normalText]}>{card.text}</Text>
          <Image style={{ width: 200, height: 300 }} source={imageStore[card.id].res}/>
          { card.cards
            ? (<>
              <Text style={gameStyles.subtitle}>Requiere :</Text>
              <View>
                {card.cards.map((id: number, i) => <MiniCard card={Card.getCard(id)!} index={i} key={i} />)}
              </View>
            </>)
            : null}
        </View>

        :

        <Text style={[gameStyles.normalText]}>En construccion...</Text>
      }
    </SafeAreaView>
  );
}