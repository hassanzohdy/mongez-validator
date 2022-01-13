import Is from "@mongez/supportive-is";
import { trans } from "@mongez/localization";
import { Rule, RuleResponse } from "../types";

export default {
  type: "url",
  rule: "url",
  requiresValue: true,
  evaluate: function (value: string): RuleResponse {
    return {
      hasError: !Is.url(value),
      errorMessage: trans("validation.url"),
      errorType: "url",
    } as RuleResponse;
  },
} as Rule;
