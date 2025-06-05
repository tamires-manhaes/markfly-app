import BrazilFlag from "@/assets/flags/brazil.svg?react";
import SpainFlag from "@/assets/flags/spain.svg?react";
import USFlag from "@/assets/flags/us.svg?react";

const getFlagByCode = (
  code: string
): React.FunctionComponent<React.SVGProps<SVGSVGElement>> | undefined => {
  const flagDict: Record<
    string,
    React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  > = {
    PT: BrazilFlag,
    ES: SpainFlag,
    EN: USFlag,
  };
  return flagDict[code];
};

export default getFlagByCode;
