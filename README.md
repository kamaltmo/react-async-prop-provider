# react-async-prop-provider

A React Component for intelligently changing a child components props depending on the state of a promise.

## Props

* Action:
  * Type: `Function`
  * Required: **Yes**
  * Usage: An Async function or a function return a promise. This is will be used to judge the correct props to provide.
* pendingProps:
  * Type: `Object`
  * Required: **No**
  * Usage: The additional props that you would like to pass while the action is being resolved.
* fulfilledProps:
  * Type: `Object`
  * Required: **No**
  * Usage: The additional props that you would like to pass when the action has been fulfilled.
* rejectedProps:
  * Type: `Object`
  * Required: **No**
  * Usage: The additional props that you would like to pass if the action fails.
* Children:
  * Type: `Function`
  * Required: **Yes**
  * Params:
    * `actionHandler` (`Function`) - fires the provided action when called.
    * `asyncProps` (`Object`) - The props for the current action state.
  * Usage: This functions result is used as the return for `AsyncPropProvider`. This pattern is know as `render props` learn more [here](https://reactjs.org/docs/render-props.html)

## Example

#### Install

```
npm i react-async-prop-provider
```

#### Usage

```
import AsyncPropProvider from 'react-async-prop-provider
```


A Stateless `Button` component from the [Semantic-UI-React](https://github.com/Semantic-Org/Semantic-UI-React) component library wrapped in `AsyncPropProvider`. This allows the buttons to change its presentation depending on the state of async function it fires.

```
class Example extends Component {
  // Async function
  action() {
    return new Promise(resolve => {
      setTimeout(resolve, 1000);
    });
  }

  render() {
    return (
      <AsyncPropProvider
        action={this.action}
        pendingProps={{ disabled: true, loading: true }}
        fulfilledProps={{ color: "green" }}
        rejectedProps={{ color: "red" }}
      >
        {(actionHandler, asyncProps) => (
          <Button color="blue" onClick={actionHandler} {...asyncProps}>
            A Stateless Button
          </Button>
        )}
      </AsyncPropProvider>
    );
  }
}
```
