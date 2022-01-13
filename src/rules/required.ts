import Is from "@mongez/supportive-is";
import { trans } from "@mongez/localization";
import { Rule, RuleResponse } from "../types";

export default {
  rule: "required",
  requiresValue: false,
  evaluate: function (value, props): RuleResponse {
    const { required } = props;

    return {
      errorType: "required",
      hasError: required === true && Is.empty(value),
      errorMessage: trans("validation.required"),
    } as RuleResponse;
  },
} as Rule;
