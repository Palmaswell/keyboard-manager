import * as React from 'react';
import * as uuid from 'uuid';
import { KeydownEv, KeyboardManagerProps } from '.';

export class KeyboardManagerContext {
  public readonly id = uuid.v4();
  private keydownArr: KeydownEv[] = [];
  private document?: Document;

  public keyDown = (ev: KeyboardEvent): void => {
    this.keydownArr.forEach(t => t(ev));
  };

  public injectDocument = (document?: Document) => {
    if (document && this.document !== document) {
      if (this.document) {
        this.document.body.removeEventListener('keydown', this.keyDown);
      }
      document.body.addEventListener('keydown', this.keyDown);
      this.document = document;
    }
  }

  public registerKeyDownTest = (t: KeydownEv) => {
    this.keydownArr.push(t);
  }

  public unregisterKeyTest = (t: KeydownEv) => {
    const found = this.keydownArr.indexOf(t);
    if (found < 0) {
      throw new Error('Try unregister does not exists');
    }
    this.keydownArr.splice(found, 1);
  }
}

const keyboardManagerContext = new KeyboardManagerContext();
const KeyboardManagerCtx = React.createContext<KeyboardManagerContext>(
  keyboardManagerContext
);

export const KeyboardManagerConsumer = KeyboardManagerCtx.Consumer;

export function KeyboardManager(props: KeyboardManagerProps) {
  keyboardManagerContext.injectDocument(props.document || document);
  return (
    <KeyboardManagerCtx.Provider value={keyboardManagerContext}>
      {props.children}
    </KeyboardManagerCtx.Provider>
  );
}
