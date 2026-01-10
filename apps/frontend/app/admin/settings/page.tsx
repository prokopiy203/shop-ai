"use client";

import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useDebouncedUserPreferences } from "@/hooks/useDebounceUserPreferences";
import { useAdminUIStore } from "@/store/admin-ui";
import { GeneralSettings } from "./_components/GeneralSettings";
import { ProductDescriptionSettings } from "./_components/ProductDescriptionSettings";

function AdminSettingsPage() {
  const state = useAdminUIStore();

  useDebouncedUserPreferences({
    animationsEnabled: state.animationsEnabled,
    theme: state.theme,
  });

  return (
    <Card className="p-4 bg-sidebar shadow-md rounded-xl flex flex-col gap-5">
      <div className="max-w-7xl  space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium">Animated background</h3>
            <p className="text-sm text-muted-foreground">
              Enable or disable animated background effects
            </p>
          </div>

          <Switch
            checked={state.animationsEnabled}
            onCheckedChange={state.setAnimationsEnabled}
          />
        </div>
      </div>
      <GeneralSettings />
      <ProductDescriptionSettings />
    </Card>
  );
}

export default AdminSettingsPage;
