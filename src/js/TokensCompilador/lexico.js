const padraoIfeRegex = [
  [/([@][A-Za-z0-9_]{1,20})\b/g, "nomeVariavel", "@letra*|letra*digito*"],
  [
    /["][a-zA-Z0-9 $&+,:;=?@#|<>.^*()%!-ç]*["]/g,
    "literal",
    "“letra*|letra*digito*”",
  ],
  [/[-]?\b((?<!\.)[0-9]{1,2}[.][0-9]{1,2}(?!\.))\b/g, "digito", "1-9"],
  [/[-]?\b((?<!\.)\d{1,10}(?!\.))\b/g, "digito", "1-9"],
];
const padraoIfe = [
  [">=", "operadorRelacional", "<, >, >=, <="],
  ["<=", "operadorRelacional", "<, >, >=, <="],
  [">", "operadorRelacional", "<, >, >=, <="],
  ["<", "operadorRelacional", "<, >, >=, <="],
  ["==", "operadorRelacionalIgualDiferente", "==,!="],
  ["!=", "operadorRelacionalIgualDiferente", "==,!="],
];
const padraoFor1 = [["=", "atribuicao", "="]];
const padraoFor2 = [
  [">=", "operadorRelacional", "<, >, >=, <="],
  ["<=", "operadorRelacional", "<, >, >=, <="],
  [">", "operadorRelacional", "<, >, >=, <="],
  ["<", "operadorRelacional", "<, >, >=, <="],
  ["==", "operadorRelacionalIgualDiferente", "==,!="],
  ["!=", "operadorRelacionalIgualDiferente", "==,!="],
];
const padraoFor3 = [
  ["++", "incremento", "++"],
  ["--", "incremento", "--"],
];

const padraoForRegex = [
  [/([@][A-Za-z0-9_]{1,20})\b/g, "nomeVariavel", "@letra*|letra*digito*"],
  [/[-]?\b((?<!\.)[0-9]{1,2}[.][0-9]{1,2}(?!\.))\b/g, "digito", "1-9"],
  [/[-]?\b((?<!\.)\d{1,10}(?!\.))\b/g, "digito", "1-9"],
];
const padraoColorRegex = [
  [/#(([0-9a-fA-F]{2}){3,4}|([0-9a-fA-F]){3,4})/g, "Cor", "#ffff"],
];
const padraoLumin = [
  [/[-]?\b((?<!\.)[0-9]{1,2}[.][0-9]{1,2}(?!\.))\b/g, "digito", "1-9"],
  [/[-]?\b((?<!\.)\d{1,10}(?!\.))\b/g, "digito", "1-9"],
];
const padraoTimer = [
  [/[-]?\b((?<!\.)[0-9]{1,2}[.][0-9]{1,2}(?!\.))\b/g, "digito", "1-9"],
  [/[-]?\b((?<!\.)\d{1,10}(?!\.))\b/g, "digito", "1-9"],
];
