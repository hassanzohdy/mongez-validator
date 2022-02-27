import Is from "@mongez/supportive-is";
import { trans } from "@mongez/localization";
import { Rule, RuleResponse } from "./../types";

export default {
  type: "integer",
  rule: "integer",
  requiresValue: true,
  evaluate: function (value: string): RuleResponse {
    return {
      hasError: !Is.int(Number(value)),
      errorMessage: trans("validation.integer"),
      errorType: "integer",
    } as RuleResponse;
  },
} as Rule;
