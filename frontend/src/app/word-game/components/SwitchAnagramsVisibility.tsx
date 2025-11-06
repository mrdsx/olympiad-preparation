import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAnagramsStore } from "@/features/word-game";

function SwitchAnagramsVisibility() {
  const {
    areVisible: areAnagramsVisible,
    setAreVisible: setAreAnagramsVisible,
  } = useAnagramsStore();

  return (
    <div className="flex items-center gap-2">
      <Switch
        id="words-visibility"
        checked={areAnagramsVisible}
        onCheckedChange={(value) => setAreAnagramsVisible(value)}
      />
      <Label htmlFor="words-visibility">Показать слова</Label>
    </div>
  );
}

export { SwitchAnagramsVisibility };
