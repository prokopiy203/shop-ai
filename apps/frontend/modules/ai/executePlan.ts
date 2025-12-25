import { AIPlan } from "./types";
import { registry } from "@/modules/registry";
import { executeCapability } from "@/modules/core/executor";
import { CapabilityContext } from "../core/types";

export async function executeAIPlan(plan: AIPlan, ctx: CapabilityContext) {
  for (const [index, step] of plan.steps.entries()) {
    await executeCapability(
      registry,
      step.capabilityId as any,
      step.payload,
      ctx
    );

    if (index > 0) {
      await new Promise((res) => {
        setTimeout(res, 300);
      });
    }
  }
}
