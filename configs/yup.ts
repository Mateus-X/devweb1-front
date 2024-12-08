import * as yup from "yup";

yup.setLocale({
  string: {
    length: ({ length }: { length: number }) =>
      `O campo deve ter exatamente ${length} ${length === 1 ? "caractere" : "caracteres"}.`,
    min: ({ min }: { min: number }) => `O campo deve ter pelo menos ${min} ${min === 1 ? "caractere" : "caracteres"}.`,
    max: ({ max }: { max: number }) => `O campo deve ter no máximo ${max} ${max === 1 ? "caractere" : "caracteres"}.`,
    matches: 'O campo deve corresponder ao padrão: "${regex}".',
    email: "O campo deve ser um e-mail válido.",
    url: "O campo deve ser uma URL válida.",
    trim: "O campo não deve conter espaços adicionais no início nem no fim.",
    lowercase: "O campo deve estar em letras minúsculas.",
    uppercase: "O campo deve estar em letras maiúsculas.",
  },
  mixed: {
    default: "O campo é inválido.",
    required: "O campo é obrigatório.",
    oneOf: "O campo deve ter um dos seguintes valores: ${values}.",
    notOneOf: "O campo não deve ter nenhum dos seguintes valores: ${values}.",
    notType: "O campo deve estar em formato válido.",
    defined: "O campo não deve ser indefinido.",
  },
  number: {
    min: "O campo deve ser maior ou igual a ${min}.",
    max: "O campo deve menor ou igual a ${max}.",
    lessThan: "O campo deve ser menor que ${less}.",
    moreThan: "O campo deve ser maior que ${more}.",
    positive: "O campo deve ser um número positivo.",
    negative: "O campo deve ser um número negativo.",
    integer: "O campo deve ser um número inteiro.",
  },
  array: {
    min: ({ min }: { min: number }) => `O campo deve ter pelo menos ${min} ${min === 1 ? "item" : "itens"}.`,
  },
});

export default yup;