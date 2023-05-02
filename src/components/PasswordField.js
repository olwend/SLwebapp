import React, { useState } from "react";

import {
  FormGroup,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import { EyeIcon, EyeClosedIcon } from "@primer/octicons-react";

import "./PasswordField.css";

const PasswordField = (props) => {
  const [passwordType, setPasswordType] = useState("password");
  const [faFocus, setFaFocus] = React.useState(false);

  const setPassword = () =>
    passwordType === "password"
      ? setPasswordType("text")
      : setPasswordType("password");

  return (
    <FormGroup className={"input-lg"}>
      <InputGroup className={faFocus ? "input-group-focus" : ""}>
        <Input
          autoComplete="password"
          placeholder="Password"
          name={props.name}
          type={passwordType}
          onFocus={() => setFaFocus(true)}
          onChange={props.handleChange}
          onBlur={() => setFaFocus(false)}
          invalid={props.touched && props.error}
        ></Input>
        <InputGroupAddon addonType="append">
          {passwordType === "password" ? (
            <InputGroupText
              style={{
                borderTopRightRadius: "30px",
                borderBottomRightRadius: "30px",
                borderColor: props.touched && props.error ? "red" : "",
              }}
              onClick={() => setPassword()}
            >
              <EyeIcon size={16} onClick={() => setPassword()} />
            </InputGroupText>
          ) : (
            <InputGroupText
              style={{
                borderTopRightRadius: "30px",
                borderBottomRightRadius: "30px",
                borderColor: props.touched && props.error ? "red" : "",
              }}
              onClick={() => setPassword()}
            >
              <EyeClosedIcon size={16} onClick={() => setPassword()} />
            </InputGroupText>
          )}
        </InputGroupAddon>
        <FormFeedback type="invalid">{props.error}</FormFeedback>
      </InputGroup>
    </FormGroup>
  );
};

export default PasswordField;
