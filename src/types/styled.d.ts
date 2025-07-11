import "styled-components";
import { AppTheme } from "../styles/themes";

declare module "styled-components" {
  export interface DefaultTheme extends AppTheme {}
}
