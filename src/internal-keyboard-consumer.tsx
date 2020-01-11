import * as React from 'react';
import { KeyboardManagerContext, KeyboardManagerConsumer,  RegisterKeyDownTestProps } from '.';
interface InternalRegisterKeyDownTestProps extends RegisterKeyDownTestProps {
  readonly keyboardManagerContext: KeyboardManagerContext;
}

class InternalRegisterKeyDownTest extends React.Component<
  InternalRegisterKeyDownTestProps
> {
  public componentDidMount() {
    this.props.keyboardManagerContext.registerKeyDownTest(this.props.testFn);
  }
  public componentWillUnmount() {
    this.props.keyboardManagerContext.unregisterKeyTest(this.props.testFn);
  }
  public render() {
    return <>{this.props.children}</>;
  }
}

export function RegisterKeyDownTest(props: RegisterKeyDownTestProps): JSX.Element {
  return (
    <KeyboardManagerConsumer>
      {ctx => (
        <InternalRegisterKeyDownTest {...props} keyboardManagerContext={ctx}>
          {props.children}
        </InternalRegisterKeyDownTest>
      )}
    </KeyboardManagerConsumer>
  );
}
