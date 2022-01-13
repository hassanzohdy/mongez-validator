import { EventSubscription } from "@mongez/events";

export type DynamicObject = {
  [key: string]: any;
};

export type RuleResponse = {
  /**
   * Determine if the rule will trigger an error
   */
  hasError: boolean;
  /**
   * Set the error message that will be triggered if rule has any error
   */
  errorMessage: string;
  /**
   * The error type of the input, i.e minLength, required, email...
   */
  errorType: string;
};

export interface Rule {
  /**
   * The validation rule name that will be used in the input
   */
  rule: string;
  /**
   * If the type is set, then this rule will run only with the set rule
   */
  type?: string;
  /**
   * If set to true, the rule will not be evaluated until there is a value in the input
   */
  requiresValue?: boolean;
  /**
   * Evaluate the rule against the given input value
   *
   * @param   {string} value
   * @param   {object} props
   * @returns {RuleResponse}
   */
  evaluate(value: string, props: any): RuleResponse;
}

export interface Validateable {
  /**
   * Set validation value
   *
   * @parma {any} value
   * @returns {Validateable}
   */
  setValue(value: any): Validateable;

  /**
   * Set validation props
   *
   * @parma {DynamicObject} props
   * @returns {Validateable}
   */
  setProps(props: DynamicObject): Validateable;

  /**
   * Set validation rules list
   *
   * @parma {Rule[]} rules
   * @returns {Validateable}
   */
  setRules(rules: Rule[]): Validateable;
  /**
   * Set validation props
   *
   * @parma {DynamicObject} props
   * @returns {Validateable}
   */
  setMessagesOverrides(errorMessagesOverrides: DynamicObject): Validateable;
  /**
   * Determine if the validation process is valid
   *
   * @returns {boolean}
   */
  passes(): boolean;
  /**
   * Determine if the validation process failed
   *
   * @returns {boolean}
   */
  fails(): boolean;
  /**
   * Get error response
   */
  getError(): RuleResponse;
  /**
   * Get Validation Error message if error return mode is first
   *
   * @returns {string}
   */
  getErrorMessage(): string;
  /**
   * Get Validation error type if error return mode is first
   *
   * @returns {string}
   */
  getErrorType(): string;
  /**
   * if error return mode is all
   * Get Validation Errors list as the key will be the error type and its value will be the error message
   *
   * @returns {string}
   */
  getErrorsList(): DynamicObject;
  /**
   * Get the passed value to the validator
   *
   * @returns {any}
   */
  getValue(): any;
  /**
   * Get the passed rules list to the validator
   *
   * @returns {Rule[]}
   */
  getRulesList(): Rule[];
  /**
   * Get the passed props list to the validator
   *
   * @returns {Rule[]}
   */
  getProps(): DynamicObject;
  /**
   * if error return mode is all
   * Get Validation Errors list as the key will be the error type and its value will be the error message
   *
   * @returns {string}
   */
  getErrorsList(): DynamicObject;
  /**
   * Start validation process
   *
   * @returns {Validateable}
   */
  validate(): Validateable;
  /**
   * Get validation results per rule
   *
   * @returns {RuleResponse[]}
   */
  getValidationResults(): RuleResponse[];
  /**
   * Get the passed rules list to the validator
   *
   * @returns {void}
   */
  reset(): void;
  /**
   * Reset validation state and remove all events listeners
   *
   * @returns {void}
   */
  destroy(): void;
  /**
   * Destroy all events list for current validator
   *
   * @returns {void}
   */
  destroyEvents(): void;
  /**
   * Set the validation error type
   *
   * @param   {ValidationErrorReturn} errorReturnType
   * @returns {Validateable}
   */
  setErrorReturnMode(errorReturnType: ValidationErrorReturn): Validateable;
  /**
   * Trigger the given event type
   *
   * @param   {string} eventType
   * @param   {any[]} args
   * @returns {void}
   */
  trigger(eventType: string, ...args: any[]): void;
  /**
   * Add an event listener to the validation based on the eventType
   *
   * @param {ValidationEventType} eventType
   * @param {ValidationEventCallback} callback
   * @returns {EventSubscription}
   */
  on(
    eventType: ValidationEventType,
    callback: ValidationEventCallback
  ): EventSubscription;
  /**
   * Get validation event namespace
   *
   * @returns {string}
   */
  getValidationEventNamespace(): string;
}

export type ValidationEventType =
  | "validating"
  | "error"
  | "success"
  | "validation";

export type ValidationEventCallback = (
  validator: Validateable
) => EventSubscription;

export type ValidationErrorReturn = "first" | "all";

export type ValidationEvent = "validating" | "done" | "pass" | "fail";
