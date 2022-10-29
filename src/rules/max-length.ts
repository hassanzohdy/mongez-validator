import { trans } from "@mongez/localization";
import { Rule, RuleResponse } from "../types";

export default {
  rule: "maxLength",
  requiresValue: true,
  evaluate: function (value, props): RuleResponse {
    const maxLength = props.maxLength;

    if (!Array.isArray(value)) {
      value = String(value);
    }

    return {
      errorType: "maxLength",
      hasError: value.length > maxLength,
      errorMessage: trans("validation.maxLength", { length: maxLength }),
    } as RuleResponse;
  },
} as Rule;
