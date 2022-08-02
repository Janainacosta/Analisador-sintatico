erros = [
  [
    /[-]?\b((?<!\.)[0-9]{1,10}[.][0-9]{3,}(?!\.))\b/g,
    "Tamanho excedido",
    "1-9",
  ],
  [
    /[-]?\b((?<!\.)[0-9]{11,}[.][0-9]{1,2}(?!\.))\b/g,
    "Tamanho excedido",
    "1-9",
  ],
  [/[-]?\b((?<!\.)[0-9]{11,}[.][0-9]{3,}(?!\.))\b/g, "Tamanho excedido", "1-9"],
  [
    /([@][A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ0-9_]{21,})\b/g,
    "erro lexico",
    "Variavel muito grande",
  ],
  [/[$&+,:;=?@#|<>.^*()%!-]/g, "erro lexico", "-----"],
  [/[-]?\b((?<!\.)\d{11,}(?!\.))\b/gm, "erro lexico", "Tamanho excedido"],
  [/([A-Za-z0-9À-ú])+/g, "erro lexico", "-----"],
];
