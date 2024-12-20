import { Button } from "react-native-paper";
import { Preferences } from "../services/preferences";
import { useAgeCalculator } from "../hooks/useAgeCalculator";
import { useContext } from "react";
import { DogDataContext } from "../store/dog-data-context";

export function RestartButton() {
  const { setDog } = useContext(DogDataContext);

  return (
    <Button icon="rotate-right" onPress={() => setDog(null)}>
      Restart
    </Button>
  );
}
