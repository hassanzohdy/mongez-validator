import Is from "@mongez/supportive-is";
import { trans } from "@mongez/localization";
import { Rule, RuleResponse } from "./../types";

export default {
  type: "float",
  rule: "float",
  requiresValue: true,
  evaluate: function (value: string): RuleResponse {
    return {
      hasError: !Is.float(Number(value)),
      errorMessage: trans("validation.float"),
      errorType: "float",
    } as RuleResponse;
  },
} as Rule;
