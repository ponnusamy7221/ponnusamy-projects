import { InjectionToken, TemplateRef } from "@angular/core";

export interface MessageData {
  from?: string;
  type?: string;
  message?: any;
  template?: TemplateRef<any>;
}

export const SLIDE_DIALOG_DATA = new InjectionToken<MessageData>(
  "SLIDE_DIALOG_DATA"
);
