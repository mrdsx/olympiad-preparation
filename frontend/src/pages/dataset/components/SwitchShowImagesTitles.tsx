import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { useShowImagesTitlesStore } from "../showImagesTitlesStore";

function SwitchShowImagesTitles() {
  const { showTitles, setShowTitles } = useShowImagesTitlesStore();

  return (
    <div className="flex gap-2">
      <Switch
        id="images-titles-visibility-switch"
        checked={showTitles}
        onCheckedChange={(value) => setShowTitles(value)}
      />
      <Label htmlFor="images-titles-visibility-switch">Показать названия</Label>
    </div>
  );
}

export { SwitchShowImagesTitles };
