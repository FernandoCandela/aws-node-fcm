import * as yup from "yup";
import { Entities, Messages } from "../../utils/constants";

export const postInputSchema = yup.object().shape({
  entity_type: yup.string().oneOf(Object.values(Entities), Messages.ENTITY_TYPE_ENUM_ERROR + Object.values(Entities).join(", ")).required(),
  entity: yup.object().required(),
  origin: yup.string().required(),
});

export const getInputSchema = yup.object().shape({
  entityType: yup.string().oneOf(Object.values(Entities), Messages.ENTITY_TYPE_ENUM_ERROR_1 + Object.values(Entities).join(", ")).required(),
  code: yup.number().required(),
});
