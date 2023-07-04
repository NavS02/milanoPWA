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
import tipologia from "./tipologia";
import collezione from "./collezione";
import piano from "./piano";
import sala from "./sala";
import provenienza from "./provenienza";

export default {
  collection: "app",
  fields() {
    return [
      new Image({
        name: "icona",
        label: "Icona",
        fit: "contain",
        width: 100,
        height: 100,
        quality: 10,
        column: 4,
      }),
      new FormField({ name: "dida", label: "dida", type: "text", value: "" }),
      new Files({
        name: "altre_immagini",
        label: "Altre imagini",
        foreign_key: "directus_files_id",
        value: [],
        fit: "contain",
        width: 100,
        height: 100,
        quality: 80,
        column: 4,
      }),
      new FormField({
        name: "titolo",
        label: "titolo",
        type: "text",
        value: "",
      }),
      new FormField({
        name: "pubblicata",
        label: "pubblicata",
        type: "toggle",
        value: "",
      }),
      new FormField({
        name: "autore",
        label: "autore",
        type: "text",
        value: "",
      }),
      new FormField({
        name: "soggetto",
        label: "soggetto",
        type: "text",
        value: "",
      }),
      new FormField({
        name: "materia",
        label: "materia",
        type: "text",
        value: "",
      }),
      new FormField({ name: "data", label: "data", type: "text", value: "" }),
      new FormField({ name: "descrizione", label: "descrizione", type: "textarea", value: "" }),
      new ManyToOneField({
        name: "tipologia",
        label: "tipologia",
        value: null,
        related: "tipologia",
        type: "manyToOne",

        preview: (item) => {
          return `${item?.app_tipologia}`;
        },
        fields: tipologia.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { tipologia: { _contains: text } };
        },
      }),

      new ManyToOneField({
        name: "collezione",
        label: "collezione",
        value: null,
        related: "collezione",
        type: "manyToOne",

        preview: (item) => {
          return `${item?.app_collezione}`;
        },
        fields: collezione.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { collezione: { _contains: text } };
        },
      }),

      new ManyToOneField({
        name: "piano",
        label: "piano",
        value: null,
        related: "piano",
        type: "manyToOne",

        preview: (item) => {
          return `${item?.app_piano}`;
        },
        fields: piano.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { piano: { _contains: text } };
        },
      }),
      new ManyToOneField({
        name: "sala",
        label: "sala",
        value: null,
        related: "sala",
        type: "manyToOne",

        preview: (item) => {
          return `${item?.app_sala}`;
        },
        fields: sala.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { sala: { _contains: text } };
        },
      }),

      new ManyToOneField({
        name: "provenienza",
        label: "provenienza",
        value: null,
        related: "provenienza",
        type: "manyToOne",

        preview: (item) => {
          return `${item?.app_provenienza}`;
        },
        fields: provenienza.fields,
        filter: (text) => {
          if (text.trim() === "") return {};
          return { provenienza: { _contains: text } };
        },
      }),
      new FormField({
        name: "specifiche",
        label: "specifiche",
        type: "text",
        value: "",
      }),
    ];
  },
  tableFields() {
    return [
      { key: "id", label: "ID \t", sortable: true },
      { key: "titolo", label: "Titolo", sortable: true },
    ];
  },
};