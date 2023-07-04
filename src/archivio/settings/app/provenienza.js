import {
  FormField,
  SelectField,
  ManyToManyField,
  RadioField,
  ManyToOneField,
  File,
  Files,
  Image,
} from "../../../models";

export default {
  collection: "app",
  fields() {
    return [
     
    
      new FormField({
        name: "app_provenienza",
        label: "Provenienza",
        type: "text",
        value: "",
      }),
    ];
  },
  tableFields() {
    return [
      { key: "id", label: "ID \t", sortable: true },
      { key: "app_provenienza", label: "app_provenienza", sortable: true },
    ];
  },
};