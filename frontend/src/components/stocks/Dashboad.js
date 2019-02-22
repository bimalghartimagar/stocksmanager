import React, { Fragment } from "react";
import Form from "./Form";
import StockList from "./StocksList";
import LineGraph from "./LineGraph";

export default function Dashboad() {
  let styles = { marginTop: "1em" };
  return (
    <Fragment>
      <LineGraph />

      <div style={styles}>
        <Form />
      </div>

      <StockList />
    </Fragment>
  );
}
