import React, { Component } from "react";
import { render } from "react-dom";
import Highlight from "react-highlight";
import { Button, Card } from "semantic-ui-react";
import "highlight.js/styles/github.css";

import AsyncPropProvider from "../lib";
import Layout from "./Layout";

// Async function
function action() {
  return new Promise(resolve => {
    setTimeout(resolve, 1000);
  });
}

function Demo() {
  return (
    <Layout>
      <Card style={{ width: "100%", marginBottom: "50px" }}>
        <Card.Content header="A Stateless Button" />
        <Card.Content description="A Stateless Button that fires an async function on click." />
        <Highlight className="hljs javascript">
          {'<Button color="blue" onClick={action}>\r\n Button\r\n</Button>'}
        </Highlight>
        <Button color="blue" onClick={action}>
          Button
        </Button>
      </Card>
      <Card style={{ width: "100%" }}>
        <Card.Content header="A Stateless Button Wrapped in AsyncPropProvider" />
        <Card.Content description="A Stateless Button Wrapped in AsyncPropProvider, the same action is fired on click, however the wrapper allows the button to progress through different states" />
        <Highlight className="hljs javascript">
          {
            '<AsyncPropProvider\r\n  action={action}\r\n  pendingProps={{ disabled: true, loading: true }}\r\n  fulfilledProps={{ color: "green" }}\r\n  rejectedProps={{ color: "red" }}\r\n>\r\n  {(actionHandler, asyncProps) => (\r\n    <Button color="blue" onClick={actionHandler} {...asyncProps}>\r\n      Button\r\n    </Button>\r\n  )}\r\n</AsyncPropProvider>'
          }
        </Highlight>
        <AsyncPropProvider
          action={action}
          pendingProps={{ disabled: true, loading: true }}
          fulfilledProps={{ color: "green" }}
          rejectedProps={{ color: "red" }}
        >
          {(actionHandler, asyncProps) => (
            <Button color="blue" onClick={actionHandler} {...asyncProps}>
              Button
            </Button>
          )}
        </AsyncPropProvider>
      </Card>
    </Layout>
  );
}

render(<Demo />, document.getElementById("app"));
