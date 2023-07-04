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
        name: "app_sala",
        label: "app_sala",
        type: "text",
        value: "",
      }),
    ];
  },
  tableFields() {
    return [
      { key: "id", label: "ID \t", sortable: true },
      { key: "app_sala", label: "app_sala", sortable: true },
    ];
  },
};