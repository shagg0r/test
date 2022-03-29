import React from "react";
import { withStyles } from 'tss-react/mui';
import clsx from "clsx";

const styles1 = {
  test: {
    backgroundColor: "purple",
    color: "white"
  }
};

function Comp1({ classes }) {
  return <div className={classes.test}>Comp1</div>;
}

const StyledComp1 = withStyles(Comp1, styles1);

const styles2 = (_theme, _params, classes) => ({
  test: {
    backgroundColor: "black",
    color: "lime"
  },
  test2: {
    backgroundColor: "white",
    color: "purple",
    [`&.${classes.test}`]: {
      backgroundColor: "pink",
      color: "blue"
    }
  }
});

function Comp2({ classes }) {
  return (
    <>
      <div className={classes.test}>Comp2 test</div>
      <StyledComp1 />
      <div className={classes.test2}>Comp2 test2</div>
      <div className={clsx(classes.test, classes.test2)}>
        Comp2 test and test2
      </div>
    </>
  );
}

const StyledComp2 = withStyles(Comp2, styles2);

function Comp3({ classes }) {
  return <div className={classes.test}>Inline Styles
    <div className={classes.test2}>Nested Inline Styles</div>
  </div>;
}
const StyledComp3a = withStyles(Comp3, {test: {backgroundColor: "yellow"}});
const StyledComp3b = withStyles(
  Comp3,
  (_theme, _params, classes) => ({test: {backgroundColor: "yellow", color: "lime", [`& .${classes.test2}`]: {backgroundColor: "orange"}}, test2: {}})
);

export default function App() {
  return <>
    <StyledComp2/>
    <StyledComp3a/>
    <StyledComp3b/>
  </>;
}
