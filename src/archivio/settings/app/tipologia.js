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
          name: "app_tipologia",
          label: "app_tipologia",
          type: "text",
          value: "",
        }),
      ];
    },
    tableFields() {
      return [
        { key: "id", label: "ID \t", sortable: true },
        { key: "app_tipologia", label: "app_tipologia", sortable: true },
        { key: "actions", label: "Azione", sortable: false },
      ];
    },
  };