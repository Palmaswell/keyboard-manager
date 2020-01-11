export interface KeydownEv {
  (ev: KeyboardEvent): boolean;
}

export type KeyboardManagerProps = React.PropsWithChildren<{
  readonly document?: Document;
}>;

export type RegisterKeyDownTestProps = React.PropsWithChildren<{
  readonly testFn: KeydownEv;
}>;

