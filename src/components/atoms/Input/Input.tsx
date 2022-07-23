import React from "react";
import * as S from "./style";

type Types = "text" | "password" | "email" | "number" | "tel";

interface IProps {
  id?: string;
  className?: string;
  type?: Types;
  value?: any;
  placeholder?: string;
  disabled?: boolean;
  minLength?: number;
  maxLength?: number;
  onChange?: any;
  onKeyDown?: any;
}

const Input = (props: IProps) => {
  return <S.Input {...props} />;
};

export default Input;
