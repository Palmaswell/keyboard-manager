import { mount, ReactWrapper } from "enzyme";
import * as React from "react";

interface ListProps {
  onKeyPress?: () => void;
}

class List extends React.Component<ListProps> {
  private attachKeyPress = (c: HTMLUListElement) => {
    console.log("attach");
    c.addEventListener("keypress", () => {
      console.log("hi^^^^^");
      return this.props.onKeyPress || (() => {});
    });
  };

  public render(): JSX.Element {
    return <ul ref={this.attachKeyPress}>{this.props.children}</ul>;
  }
}

function ListItem(props: React.PropsWithChildren<unknown>): JSX.Element {
  // tabIndex JSDOM Fuckup
  return <li tabIndex={0}>{props.children}</li>;
}

interface Focus {
  focus(): void;
}

interface LiContainer {
  liItems?: ReactWrapper;
}

test("", done => {
  function handleArrowDown({ liItems }: LiContainer) {
    return () => {
      ((liItems!.last().getDOMNode() as unknown) as Focus).focus();
    };
  }
  const liContainer: LiContainer = { liItems: undefined };
  const testList = mount(
    <List onKeyPress={handleArrowDown(liContainer)}>
      <ListItem>Item One</ListItem>
      <ListItem>Item Two</ListItem>
    </List>
  );
  liContainer.liItems = testList.find(List).find(ListItem);
  const { liItems } = liContainer;
  const firstLiDOM = (liItems.first().getDOMNode() as unknown) as Focus;
  firstLiDOM.focus();

  expect(document.activeElement).toBe(firstLiDOM);
  liItems.first().simulate("keypress", { key: "ArrowDown" });
  testList
    .find(List)
    .first()
    .simulate("keypress", { key: "ArrowDown" });
  setTimeout(() => {
    expect(document.activeElement).toBe(liItems.last().getDOMNode());
    done();
  }, 500);
});
