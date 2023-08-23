import touch_tipologia from "./touch_tipologia";
import touch_comune from "./touch_comune";

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
  collection: "touch",
  fields() {
    return [
      new Image({
        name: "icona",
        label: "Icona",
        fit: "contain",
        width: 100,
        height: 100,
        quality: 10,
        column: 12,
      }),
      new FormField({
        name: "titolo",
        label: "Titolo",
        type: "text",
        value: "",
        column: 6,
      }),
      new FormField({
        name: "dida",
        label: "Didascalia immagine",
        type: "text",
        value: "",
        column: 4,
      }),
   
      new FormField({
        name: "pubblicata",
        label: "Pubblicata",
        type: "toggle",
        value: "",
        column: 2,
      }),

      new FormField({
        name: "chiesa",
        label: "Nome chiesa/Ente",
        type: "text",
        value: "",
        column: 6,
      }),

      new ManyToOneField({
        name: "tipologia",
        label: "Tipologia",
        value: null,
        related: "touch_tipologia",
        column: 3,
        type: "manyToOne",
        voc: "close",
        preview: (item) => {
          return `${item?.tipologia}`;
        },
        fields: touch_tipologia.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { tipologia: { _contains: text } };
        },
      }),

      new ManyToOneField({
        name: "comune",
        label: "Comune",
        value: null,
        related: "touch_comune",
        column: 3,
        type: "manyToOne",
        voc: "close",
        preview: (item) => {
          return `${item?.comune}`;
        },
        fields: touch_comune.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { comune: { _contains: text } };
        },
      }),
   
      new FormField({
        name: "descrizione",
        label: "Descrizione",
        type: "richtext",
        value: "",
      }),

      new FormField({
        name: "indirizzo",
        label: "Indirizzo",
        type: "text",
        value: "",
      }),
      new FormField({
        name: "lat",
        label: "lat",
        type: "number",
        value: "",
        column: 6,


      }),
      new FormField({
        name: "lng",
        label: "lng",
        type: "number",
        value: "",
        column: 6,
        


      }),
     
    ];
  },
  tableFields() {
    return [
      { key: "id", label: "ID \t", sortable: true },
      { key: "titolo", label: "Titolo", sortable: true },
      { key: "actions", label: "Azione", sortable: false },
    ];
  },
};
