import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Image, SafeAreaView, Text, View, useColorScheme } from "react-native";
import { RootTabParamList } from "../types";
import { colors } from "../const/styles";
import { Section } from "../components/Section";
import { getSlug } from "../lib/utils";
import { imageStore } from "../lib/images";
import { MiniCard } from "../components/MiniCard";
import { Card } from "../lib/Card";

export function CardScreen({ route }: BottomTabScreenProps<RootTabParamList, "Card">): React.JSX.Element {
  const theme = useColorScheme() || "light";
  const card = route.params?.card;

  return (
    <SafeAreaView style={[{ flex: 1 }, colors[theme].app]}>
      { card !== undefined ?
        <Section
          style={{ flex: 5 }}
          title={card.name}
          text={card.text}
        >

          <Text>{getSlug(card.name)}</Text>
          <Image style={{ width: 200, height: 300 }} source={imageStore[card.id].res}/>
          { card.cards
            ? (<>
              <Text>Requiere :</Text>
              <View>
                {card.cards.map((id: number, i) => <MiniCard card={Card.getCard(id)!} index={i} />)}
              </View>
            </>)
            : null}
        </Section>

        :

        <Section style={{ flex: 5 }}
          title="Card collection"
          text="..." />
      }
    </SafeAreaView>
  );
}