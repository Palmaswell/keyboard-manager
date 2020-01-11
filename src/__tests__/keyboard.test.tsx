import * as React from 'react';
import { render } from 'react-testing-library';

import { KeyboardManager } from '../keyboard';
import { RegisterKeyDownTest } from '../internal-keyboard-consumer';
import { simulateKeyDown } from '../simulate-key-down';

describe('KeyboardManager', () => {
  test('Registers DOM events', () => {
    const fn = jest.fn();
    const dom = render(
      <KeyboardManager>
        <RegisterKeyDownTest
          testFn={(ev: KeyboardEvent) => {
            fn(ev);
            return ev.key === 'A';
          }}>
          <input type="button" data-testid="input" value="input one" />
          Dummy
          <RegisterKeyDownTest
            testFn={(ev: KeyboardEvent) => {
              fn(ev);
              return ev.key === 'B';
            }}
          />
        </RegisterKeyDownTest>
      </KeyboardManager>
    );
    simulateKeyDown(dom, 'input', 'A');
    expect(fn.mock.calls.length).toBe(2);
    expect(fn.mock.calls.map((k: KeyboardEvent[]) => k[0].key)).toEqual([
      'A',
      'A',
    ]);
    dom.unmount();
  });
  test('Registers keyboard events from nested KeyboardManager.Consumer', () => {
    const fn = jest.fn();
    const dom = render(
      <KeyboardManager>
        <RegisterKeyDownTest
          testFn={(ev: KeyboardEvent) => {
            fn(ev);
            return ev.key === 'Tab';
          }}>
          <input type="button" data-testid="input1" value="input one" />
          <RegisterKeyDownTest
            testFn={(ev: KeyboardEvent) => {
              fn(ev);
              return ev.key === 'ArrowDown';
            }}>
            <input type="button" value="foo" data-testid="input2" />
          </RegisterKeyDownTest>
        </RegisterKeyDownTest>
      </KeyboardManager>
    );
    simulateKeyDown(dom, 'input1', 'Tab');
    simulateKeyDown(dom, 'input2');

    expect(fn.mock.calls.length).toBe(4);
    expect(fn.mock.calls.map((k: KeyboardEvent[]) => k[0].key)).toEqual([
      'Tab',
      'Tab',
      'ArrowDown',
      'ArrowDown',
    ]);
    dom.unmount();
  });
});
