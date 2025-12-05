import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAnagramsStore } from "@/features/word-game";

function SwitchAnagramsVisibility() {
  const areAnagramsVisible = useAnagramsStore((state) => state.areVisible);
  const setAreAnagramsVisible = useAnagramsStore(
    (state) => state.setAreVisible,
  );

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
