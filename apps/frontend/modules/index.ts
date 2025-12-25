import { registry, CapabilityId } from "./registry";
import { executeCapability as executeCore } from "./core/executor";
import type { CapabilityContext } from "./core/types";

export function executeCapability(
  capabilityId: CapabilityId,
  payload: unknown,
  ctx: CapabilityContext
) {
  return executeCore(registry, capabilityId, payload, ctx);
}
