import { ProductDescriptionSettings } from "./ProductDescriptionSettings";
// import { ImageAltTextSettings } from "./ImageAltTextSettings";
// import { ChatAssistantSettings } from "./ChatAssistantSettings";

export function AISettings() {
  return (
    <div className="space-y-6">
      <ProductDescriptionSettings />
      {/* <ImageAltTextSettings />
      <ChatAssistantSettings /> */}
    </div>
  );
}
