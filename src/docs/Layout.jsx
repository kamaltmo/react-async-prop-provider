import React from "react";
import GithubSash from "./GithubSash";
import { Header, Container } from "semantic-ui-react";

const style = {
  h1: {
    marginTop: "1em"
  },
  h2: {
    margin: "1em 0em 1em"
  },
  h3: {
    marginTop: "1em",
    padding: "1em 0em"
  },
  last: {
    marginBottom: "300px"
  }
};

const ResponsiveLayout = ({ children }) => (
  <div>
    <GithubSash user="kamaltmo" repo="react-async-prop-provider" />
    <Header as="h1" style={style.h1} textAlign="center">
      <Header.Content>
        Async Prop Provider
        <Header.Subheader>
          A React Component for intelligently changing a child components props
          depending on the state of a promise.
        </Header.Subheader>
      </Header.Content>
    </Header>
    <Container>
      <Header as="h2" content="Examples" style={style.h2} />
      {children}
    </Container>
  </div>
);

export default ResponsiveLayout;
