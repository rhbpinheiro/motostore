import { ReactNode } from "react";
import * as C from "./styles";

interface ContentProps {
  children: ReactNode;
}

export default function Content({ children } : ContentProps){
  return <C.ContentContainer>{children}</C.ContentContainer>;
};

