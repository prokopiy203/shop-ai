import { CapabilityContext } from "./types";
import { planCapabilities } from "./planner";
import { Capability } from "./types";

export async function executeCapability<
  Id extends string,
  Registry extends Record<Id, Capability<any, Id>>,
>(
  registry: Registry,
  capabilityId: Id,
  payload: unknown,
  ctx: CapabilityContext
) {
  const plan = planCapabilities(registry, capabilityId);

  for (const step of plan) {
    await registry[step].perform(payload, ctx);
  }
}
