import { Capability } from "./types";

export function planCapabilities<
  Id extends string,
  Registry extends Record<Id, Capability<any, Id>>,
>(registry: Registry, targetId: Id): Id[] {
  const visited = new Set<Id>();
  const plan: Id[] = [];

  function visit(id: Id) {
    if (visited.has(id)) return;

    const capability = registry[id];
    if (!capability) {
      throw new Error(`Unknown capability: ${id}`);
    }

    visited.add(id);

    capability.requires?.forEach(visit);
    plan.push(id);
  }

  visit(targetId);
  return plan;
}
