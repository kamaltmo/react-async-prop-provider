import React, { Component } from "react";

class AsyncPropProvider extends Component {
  state = {
    promiseState: null
  };

  actionHandler = (...args) => {
    const promise = this.props.action(...args);
    if (promise && typeof promise.then === "function") {
      this.setState({
        promiseState: "pending"
      });
      promise
        .then(() => {
          this.setState({
            promiseState: "fulfilled"
          });
        })
        .catch(error => {
          this.setState({
            promiseState: "rejected"
          });
          throw error;
        });
    }
  };

  asyncProps = () => {
    const {
      pendingProps = {},
      rejectedProps = {},
      fulfilledProps = {}
    } = this.props;
    switch (this.state.promiseState) {
      case "pending":
        return pendingProps;
      case "fulfilled":
        return fulfilledProps;
      case "rejected":
        return rejectedProps;
      default:
        return {};
    }
  };

  render() {
    const handler =
      this.state.promiseState === "pending" ? () => {} : this.actionHandler;
    return this.props.children(handler, this.asyncProps());
  }
}

export default AsyncPropProvider;
