import { trans } from "@mongez/localization";
import { Rule, RuleResponse } from "../types";

export default {
  rule: "max",
  requiresValue: true,
  evaluate: function (value, props): RuleResponse {
    const max = props.max;
    return {
      errorType: "max",
      hasError: Number(value) > max,
      errorMessage: trans("validation.max", max),
    } as RuleResponse;
  },
} as Rule;
