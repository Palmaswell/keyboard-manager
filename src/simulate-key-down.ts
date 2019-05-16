
import { RenderResult } from 'react-testing-library';

export function simulateKeyDown(
  domEl: RenderResult,
  keyId = 'section',
  key = 'ArrowDown'
) {
  const elem = domEl.queryByTestId(keyId)!;
  const keyList = key.split('^');
  key = keyList[keyList.length - 1];
  let shiftKey = !!keyList
    .map(i => i.toLocaleLowerCase())
    .find(i => i === 'shift');

  elem.dispatchEvent(
    new KeyboardEvent('keydown', {
      key,
      shiftKey,
      code: '40',
      bubbles: true,
    })
  );
}
