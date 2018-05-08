import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AsyncPropProvider from "../lib";

Enzyme.configure({ adapter: new Adapter() });
jest.useFakeTimers();

const renderFn = jest.fn((actionHandler, props) => {
  return <button onClick={actionHandler} />;
});

const testProps = {
  action: () => {},
  pendingProps: { test: "pending" },
  rejectedProps: { test: "rejected" },
  fulfilledProps: { test: "fulfilled" }
};

const render = props =>
  mount(<AsyncPropProvider {...props}>{renderFn}</AsyncPropProvider>);

test("Calls renderFn and renders button", () => {
  const Component = render(testProps);
  expect(renderFn).toHaveBeenCalledWith(expect.any(Function), {});
  expect(Component.html()).toBe("<button></button>");
});

describe("Returned props", () => {
  test("are panding props when promiseState is pending", () => {
    const Component = render(testProps);
    Component.setState({ promiseState: "pending" });

    expect(renderFn).toHaveBeenCalledWith(
      expect.any(Function),
      testProps.pendingProps
    );
  });
  test("are fulfilled props when promiseState is fulfilled", () => {
    const Component = render(testProps);
    Component.setState({ promiseState: "fulfilled" });

    expect(renderFn).toHaveBeenCalledWith(
      expect.any(Function),
      testProps.fulfilledProps
    );
  });

  test("are rejected props when promiseState is rejected", () => {
    const Component = render(testProps);
    Component.setState({ promiseState: "rejected" });

    expect(renderFn).toHaveBeenCalledWith(
      expect.any(Function),
      testProps.rejectedProps
    );
  });

  test("are defaulted to empty objects", () => {
    const Component = render();

    Component.setState({ promiseState: "pending" });
    expect(renderFn).toHaveBeenCalledWith(expect.any(Function), {});

    Component.setState({ promiseState: "fulfilled" });
    expect(renderFn).toHaveBeenCalledWith(expect.any(Function), {});

    Component.setState({ promiseState: "rejected" });
    expect(renderFn).toHaveBeenCalledWith(expect.any(Function), {});
  });
});

describe("State", () => {
  test("doesnt set promiseState to pending if action is not a promise", () => {
    const Component = render({
      ...testProps,
      action: () => {
        then: "test";
      }
    });
    expect(Component.state()).toEqual({ promiseState: null });
  });

  test("is correclty set to pending when promise is pending", () => {
    const Component = render({
      ...testProps,
      action: () => new Promise(resolve => {})
    });
    Component.find("button").prop("onClick")();
    expect(Component.state()).toEqual({ promiseState: "pending" });
  });

  test("is correclty set to fulfilled when promise is fulfilled", async () => {
    const Component = render({
      ...testProps,
      action: () =>
        new Promise(resolve => {
          setTimeout(resolve, 1000);
        })
    });
    Component.find("button").prop("onClick")();
    await jest.runAllTimers();
    expect(Component.state()).toEqual({ promiseState: "fulfilled" });
  });

  test("is correclty set to rejected when promise is rejected", async () => {
    let Component;
    try {
      Component = render({
        ...testProps,
        action: () => Promise.reject(new Error("fail"))
      });
      Component.find("button").prop("onClick")();
    } catch (error) {
      expect(Component.state()).toEqual({ promiseState: "rejected" });
    }
  });
});
