import { trans } from "@mongez/localization";
import { Rule, RuleResponse } from "../types";

export default {
  rule: "min",
  requiresValue: true,
  evaluate: function (value, props): RuleResponse {
    const min = Number(props.min);

    return {
      errorType: "min",
      hasError: Number(value) < min,
      errorMessage: trans("validation.min", { length: min }),
    } as RuleResponse;
  },
} as Rule;
