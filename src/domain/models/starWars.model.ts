import * as yup from "yup";
import { Entities } from "../../utils/constants";

export const schema = yup.object().shape({
  entity_type: yup.string().oneOf(Object.values(Entities), "entity_type debe ser uno de los siguientes valores: " + Object.values(Entities).join(", ")).required(),
  entity: yup.object().required(),
});
