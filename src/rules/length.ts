import { trans } from "@mongez/localization";
import { Rule, RuleResponse } from "../types";

export default {
  rule: "length",
  requiresValue: true,
  evaluate: function (value, props): RuleResponse {
    const length = props.length;

    if (!Array.isArray(value)) {
      value = String(value);
    }

    return {
      hasError: value.length !== length,
      errorMessage: trans("validation.length", { length }),
      errorType: "length",
    } as RuleResponse;
  },
} as Rule;
