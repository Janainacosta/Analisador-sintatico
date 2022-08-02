//cria a tabela de tokens ao carregar a página
window.onload = function () {
  geraTabela();
};

var modal = document.getElementById("myModal");

function abrir() {
  document.getElementById("myModal").style.display = "block";
}

function fechar() {
  document.getElementById("myModal").style.display = "none";
}

function geraTabela() {
  tokenAnt = "";
  tokens.forEach((token) => {
    if (token[1] != tokenAnt) {
      let nome = `<tr><td>` + token[1] + `</td>`;
      let tokenEx = "<td>" + token[2] + "</td>";
      document.getElementById("tokenTabela").innerHTML += nome + tokenEx;
      document.getElementById("tokenTabela").innerHTML += "</td></tr>";
    }
    tokenAnt = token[1];
  });

  // tokenAnt = "";
  tokenRegex.forEach((token) => {
    if (token[1] != tokenAnt) {
      let nome = `<tr><td>` + token[1] + `</td>`;
      let tokenEx = "<td>" + token[2] + "</td>";
      document.getElementById("tokenTabela").innerHTML += nome + tokenEx;
      document.getElementById("tokenTabela").innerHTML += "</td></tr>";
    }
    tokenAnt = token[1];
  });
}

function openNav() {
  document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

function openNavToken() {
  document.getElementById("tokenTable").style.width = "100%";
}

function closeNavToken() {
  document.getElementById("tokenTable").style.width = "0%";
}

function helpCode() {
  var code = document.getElementById("codeHelp").value;
  document.getElementById("code").value = code;
  document.getElementById("myNav").style.width = "0%";
}

function down() {
  var textcontent = document.getElementById("code").value;
  var downloadableLink = document.createElement("a");
  downloadableLink.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(textcontent)
  );
  downloadableLink.download = "AnalisadorLexico_code" + ".txt";
  document.body.appendChild(downloadableLink);
  downloadableLink.click();
  document.body.removeChild(downloadableLink);
}

async function loadFile(file) {
  document.getElementById("code").value = "";
  if (document.getElementById("tabela")) {
    tabela = document.getElementById("tabela");
    tabela.remove();
  }
  if (document.getElementById("alerta")) {
    alerta = document.getElementById("alerta");
    alerta.remove();
  }
  let text = await file.text();
  document.getElementById("code").value = text;
}

function limpar() {
  document.getElementById("code").value = "";
  if (document.getElementById("tabela")) {
    tabela = document.getElementById("tabela");
    tabela.remove();
  }
  if (document.getElementById("alerta")) {
    alerta = document.getElementById("alerta");
    alerta.remove();
  }
  if (document.getElementById("inputFile").value != "") {
    document.getElementById("inputFile").value = "";
  }
}

function compilar() {
  if (document.getElementById("tabela")) {
    tabela = document.getElementById("tabela");
    tabela.remove();
  }

  if (document.getElementById("alerta")) {
    alerta = document.getElementById("alerta");
    alerta.remove();
  }

  document.getElementById("divAlerta").innerHTML = `<div id="alerta"></div>`;
  codigo = document.getElementById("code").value;

  if (codigo) {
    if (document.getElementById("tabelaErro")) {
      tabela = document.getElementById("tabelaErro");
      tabela.remove();
    }
    const lines = codigo.split("\n");
    count = 0;
    document.getElementById("divtabela").innerHTML = `  <table
  style="margin: 0 auto; max-width: 50%"
  id="tabela"
  class="table caption-top"
>
  <strong
    ><caption style="color: black">
      Análise
    </caption></strong
  >
  <thead>
    <tr>
      <th scope="col">Linha</th>
      <th scope="col">Coluna</th>
      <th scope="col">codigo</th>
      <th scope="col">Token</th>
      <th scope="col">Lexema</th>
    </tr>
  </thead>
  <tbody id="bodyTabela"></tbody>
</table>`;
    document.getElementById(
      "divtabelaErro"
    ).innerHTML = ` <h1 >Tabela de erros</h1> <table
    style="margin: 0 auto; max-width: 50%;"
    id="tabelaErro"
    class="table caption-top"
  >
    <strong
      ><caption style="color: black">
        Erros
      </caption></strong
    >
    <thead>
      <tr>
        <th scope="col">Linha</th>        
        <th scope="col">Token</th>
      </tr>
    </thead>
    <tbody id="bodyTabelaToken"></tbody>
  </table>`;
    //guarda os erros
    let erroTable = [];
    lines.forEach((element) => {
      count++;
      let line = element;
      let transformedline = line;
      let lineAnalise = [];

      let open = 0;
      let close = 0;
      let openKey = 0;
      let closeKey = 0;
      //verifica os pares de {}
      lines.forEach((keyline) => {
        for (let i = 0; i < keyline.length; i++) {
          if (keyline[i] == "{") openKey++;
          if (keyline[i] == "}") closeKey++;
        }
      });
      if (openKey != closeKey)
        if (openKey > closeKey)
          erroTable[erroTable.length] = [
            lines.length,
            "Caractere não encontrado }",
          ];
        else
          erroTable[erroTable.length] = [
            lines.length,
            "Caractere não encontrado {",
          ];
      //verifica os pares de ()
      for (let i = 0; i < line.length; i++) {
        if (line[i] == "(") open++;
        if (line[i] == ")") close++;
      }
      if (open != close)
        if (open > close)
          erroTable[erroTable.length] = [count, "Caractere não encontrado )"];
        else
          erroTable[erroTable.length] = [count, "Caractere não encontrado ("];
      //quando encontra um  ife
      if (line.trim().substr(0, 3) == "ife") {
        let linetrim = line.trim();
        //Separa o conteudo que esta dentro dos () no ife
        let aux = linetrim.split("(");
        let linesplit = aux[1].split(")");
        //verifica as {} do ife
        if (linetrim[linetrim.length - 1] != "{") {
          erroTable[erroTable.length] = [count, "{ não encontrado"];
        }

        let contador = 0;
        let linecount = 0;
        lines.forEach((lineSearch) => {
          linecount++;
          let linetrim = lineSearch.trim();
          if (linetrim[linetrim.length - 1] == "}") {
            contador++;
          }
        });

        let lineaux = linesplit[0];
        let cont = 0;
        let con = 0;
        let rLine = "";
        //verifica se tem um operadorRelacional no if e separa em duas linhas
        //1 linha o que tem antes do operadorRelacional
        //2 linha o que tem depois do operadorRelacional
        padraoIfe.forEach((lexToken) => {
          let tokenSub = "";
          for (let i = 0; i < lexToken[0].length; i++) {
            tokenSub += "§";
          }
          let r = lineaux.split(lexToken[0]).length - 1;
          if (r >= 1) {
            rLine = linesplit[0].split(lexToken[0]);
            lineaux = lineaux.replace(lexToken[0], tokenSub);
            cont++;
          }
        });
        //se conseguiu separar ele começa a verificar se o conteudo do ife bate com o que se pode ter em um Ife
        //sempre que encontrar ele adiciona um no contador
        if (rLine.length > 0)
          rLine.forEach((rLines) => {
            let auxLine = rLines;
            padraoIfeRegex.forEach((lexToken) => {
              let tokenSub = "";
              let result = auxLine.match(lexToken[0]);
              if (result != null)
                if (result.length == 1) {
                  result.forEach((tokenResult) => {
                    for (let i = 0; i < tokenResult.length; i++) {
                      tokenSub += "§";
                    }
                    auxLine = auxLine.replace(tokenResult, tokenSub);
                    con++;
                  });
                }
            });
          });
        //se encontrar menos ou mais do que dois resultados na verificação acima ele devolve erro na montagem do ife
        if (con != 2) {
          erroTable[erroTable.length] = [count, "Ife incorreto"];
        }
        //se nao encontrar operadorRelacional devolve erro
        if (cont != 1) {
          erroTable[erroTable.length] = [count, "Erro < > <= >= == !="];
        }
        //se nao encontrar o } devolve erro
        if (contador == 0) {
          erroTable[erroTable.length] = [linecount, "} não encontrado"];
        }
      } else if (line.trim().substr(0, 5) == "elsee") {
        let linetrim = line.trim();
        //verifica as {} do elsee
        if (linetrim[linetrim.length - 1] != "{") {
          erroTable[erroTable.length] = [count, "{ não encontrado"];
        }

        let contador = 0;
        let linecount = 0;
        lines.forEach((lineSearch) => {
          linecount++;
          let linetrim = lineSearch.trim();
          if (linetrim[linetrim.length - 1] == "}") {
            contador++;
          }
        });
        //transforma o elsse{ em §§ para verificação
        linetrim = linetrim.replace("elsee", "§");
        linetrim = linetrim.replace("{", "§");
        //verifica se existe algum caractere diferente de § depois da tranformação
        // se existir retorna erro
        for (let i = 0; i < linetrim.length; i++) {
          if (linetrim[i] != "§" && linetrim[i] != " ")
            erroTable[erroTable.length] = [count, "elsee incorreto"];
        }
        if (contador == 0) {
          erroTable[erroTable.length] = [linecount, "} não encontrado"];
        }
      } else if (line.trim().substr(0, 3) == "for") {
        let linetrim = line.trim();
        let aux = linetrim.split("(");
        let linesplit = aux[1].split(")");
        //verifica as {} do elsee
        if (linetrim[linetrim.length - 1] != "{") {
          erroTable[erroTable.length] = [count, "{ não encontrado"];
        }
        //divide o conteudo do ()  do for em 3 linhas

        let forSplit = linesplit[0].split(";");
        let part1 = forSplit[0].split(padraoFor1[0][0]);
        let part2 = "";
        let part3 = forSplit[2];
        let con1 = 0;
        let con2 = 0;
        let con3 = 0;
        let resultLine = "";
        let lineaux = forSplit[1];
        //divide a segunda linha dividida anteriormente em mais duas linhas
        padraoFor2.forEach((padraoFor2) => {
          let tokenSub = "";
          for (let i = 0; i < padraoFor2[0].length; i++) {
            tokenSub += "§";
          }
          let r = lineaux.split(padraoFor2[0]).length - 1;
          if (r >= 1) {
            part2 = lineaux.split(padraoFor2[0]);
            lineaux = lineaux.replace(padraoFor2[0], tokenSub);
          }
        });
        //se existir uma linha 3 ele procura por um incremento ou decremento
        //se achar transforma no token auxiliar e soma 1 no contador
        if (part3.length > 0) {
          let auxLine = part3;
          padraoFor3.forEach((padraoFor3) => {
            let tokenSub = "";
            for (let i = 0; i < padraoFor3[0].length; i++) {
              tokenSub += "§";
            }
            let r = auxLine.split(padraoFor3[0]).length - 1;

            if (r == 1) {
              auxLine = auxLine.replace(padraoFor3[0], tokenSub);
              con3++;
              resultLine = auxLine;
            }
          });
          //procura por um valor para ser incrementado
          //se achar transforma no token auxiliar e soma 1 no contador
          padraoForRegex.forEach((regexFor) => {
            let auxLine = resultLine;
            let tokenSub = "";
            let result = auxLine.match(regexFor[0]);

            if (result != null)
              if (result.length == 1) {
                result.forEach((tokenResult) => {
                  for (let i = 0; i < tokenResult.length; i++) {
                    tokenSub += "§";
                  }
                  auxLine = auxLine.replace(tokenResult, tokenSub);
                  con3++;
                });
                resultLine = auxLine;
              }
          });
        }
        //verifica se apos a transformação em token se existe algo sem ser o token na linha
        //se existir devolve erro
        for (let k = 0; k < resultLine.length; k++) {
          if (resultLine[k] != "§" && resultLine[k] != " ")
            erroTable[erroTable.length] = [count, "Erro de montagem no for"];
        }
        //verifica a quantidade de tokens na linha 3
        //se for diferente de 2 ele devolve erro
        if (con3 != 2)
          erroTable[erroTable.length] = [count, "Erro de montagem no for"];
        //se a linha 2 for bem divida em 2 linhas, percorre ela procurando por algum padrão aceito no for
        //se encontrado soma 1 no contador e substitui pelo token auxiliar
        if (part2.length == 2)
          part2.forEach((parte) => {
            let auxLine = parte;
            padraoForRegex.forEach((regexFor) => {
              let tokenSub = "";
              let result = auxLine.match(regexFor[0]);
              if (result != null)
                if (result.length == 1) {
                  result.forEach((tokenResult) => {
                    for (let i = 0; i < tokenResult.length; i++) {
                      tokenSub += "§";
                    }
                    auxLine = auxLine.replace(tokenResult, tokenSub);
                    con2++;
                  });
                }
            });
          });
        //apos a validação acima se encontrar uma quantidade de tokens diferente de 2, devolve erro
        if (con2 != 2) {
          erroTable[erroTable.length] = [count, "Erro de montagem no for"];
        }
        //verifica se a primeira parte do for foi divida em 2 linhas corretamente
        if (part1.length == 2)
          part1.forEach((parte) => {
            let auxLine = parte;
            //percorre ela procurando por algum padrão aceito no for
            //se encontrado soma 1 no contador e substitui pelo token auxiliar
            padraoForRegex.forEach((regexFor) => {
              let tokenSub = "";
              let result = auxLine.match(regexFor[0]);
              if (result != null)
                if (result.length == 1) {
                  result.forEach((tokenResult) => {
                    for (let i = 0; i < tokenResult.length; i++) {
                      tokenSub += "§";
                    }
                    auxLine = auxLine.replace(tokenResult, tokenSub);
                    con1++;
                  });
                }
            });
          });
        //apos a validação acima se encontrar uma quantidade de tokens diferente de 2, devolve erro
        if (con1 != 2) {
          erroTable[erroTable.length] = [count, "Erro de montagem no for"];
        }
      } else if (line.trim().substr(0, 5) == "color") {
        let linetrim = line.trim();
        let aux = linetrim.split("(");
        let linesplit = aux[1].split(")");
        let lineResultColor = "";
        let color = "";
        let tokenSubs = "";
        //verifica se o conteudo inserido na função color é uma cor
        //se for cor ele verifica se somente uma cor foi inserida
        //se somente uma cor for inserida ele substitui a cor por um token auxiliar
        if (linesplit[0].match(padraoColorRegex[0][0]) != null)
          if (linesplit[0].match(padraoColorRegex[0][0]).length == 1) {
            color = linesplit[0].match(padraoColorRegex[0][0]);
            for (let i = 0; i < color[0].length; i++) {
              tokenSubs += "§";
            }
            lineResultColor = linesplit[0].replace(color, tokenSubs);
          }
        //tratativas de erro caso nao seja inserido cor ou seja inserido mais de uma cor
        if (linesplit[0].match(padraoColorRegex[0][0]) == null)
          erroTable[erroTable.length] = [count, "Cor não encontrada"];
        if (linesplit[0].match(padraoColorRegex[0][0]) != null)
          if (linesplit[0].match(padraoColorRegex[0][0]).length != 1) {
            erroTable[erroTable.length] = [count, "Color incorreta"];
          }
        //depois de substituir a cor por um token auxiliar percorre a linha procurando qualquer caractere diferente do
        //token auxiliar
        if (color != null)
          for (let i = 0; i < lineResultColor.length; i++) {
            if (lineResultColor[i] != "§")
              erroTable[erroTable.length] = [count, "Color incorreta"];
          }
      } else if (line.trim().substr(0, 2) == "on") {
        let linetrim = line.trim();
        let aux = linetrim.split("(");
        let linesplit = aux[1].split(")");
        //verifica se a função on esta vazia
        //se nao estiver devolve erro
        if (linesplit[0].trim() != "")
          erroTable[erroTable.length] = [count, "On incorreto"];
      } else if (line.trim().substr(0, 3) == "off") {
        let linetrim = line.trim();
        let aux = linetrim.split("(");
        let linesplit = aux[1].split(")");
        //verifica se a função off esta vazia
        //se nao estiver devolve erro
        if (linesplit[0].trim() != "")
          erroTable[erroTable.length] = [count, "Off incorreto"];
      } else if (line.trim().substr(0, 5) == "lumin") {
        let linetrim = line.trim();
        let aux = linetrim.split("(");
        let linesplit = aux[1].split(")");
        let lineResultLumin = "";
        let lineaux = linesplit[0];
        let lumin = "";
        let tokenSub = "";
        //faz a verificação se o conteudo da função lumin bate com o que é permitido nela
        let r = lineaux.match(padraoLumin[0][0]);
        let r2 = lineaux.match(padraoLumin[1][0]);
        //se não encontrado conteudo possivel na função lumin retorna erro
        if (r == null && r2 == null)
          erroTable[erroTable.length] = [count, "Lumin incorreto"];
        if (r == null) r = [];
        if (r2 == null) r2 = [];
        //se encontrado mais conteudo do que permito na lumin retorna erro
        if (r.length > 1 || r2.length > 1)
          erroTable[erroTable.length] = [count, "Lumin incorreto"];
        //se encontrado mais conteudo do que permito na lumin retorna erro
        if (r.length > 1) {
          erroTable[erroTable.length] = [count, "Lumin incorreto"];
        }
        //se encontrado mais conteudo do que permito na lumin retorna erro
        if (r.length == 1 && r2.length == 1) {
          erroTable[erroTable.length] = [count, "Lumin incorreto"];
        }
        //se o encontrado estiver nos padrões estabelecidos na função lumin ele substitui o encontrado
        //pelo token auxiliar
        if (r.length == 1) {
          lumin = lineaux.match(padraoLumin[0][0]);
          for (let i = 0; i < lumin[0].length; i++) {
            tokenSub += "§";
          }

          lineResultLumin = lineaux.replace(lumin[0], tokenSub);
        } else {
          //se o encontrado estiver nos padrões estabelecidos na função lumin ele substitui o encontrado
          //pelo token auxiliar
          if (r2.length != 1) {
            erroTable[erroTable.length] = [count, "Lumin incorreto"];
          }
          if (r2.length == 1) {
            lumin = lineaux.match(padraoLumin[1][0]);

            for (let i = 0; i < lumin[0].length; i++) {
              tokenSub += "§";
            }
            lineResultLumin = lineaux.replace(lumin[0], tokenSub);
          }
        }
        //função timer segue o mesmo padrão da função lumin pois as regras de ambas são iguais
      } else if (line.trim().substr(0, 5) == "timer") {
        let linetrim = line.trim();
        let aux = linetrim.split("(");
        let linesplit = aux[1].split(")");
        let lineResultTimer = "";
        let lineaux = linesplit[0];
        let lumin = "";
        let tokenSub = "";
        let r = lineaux.match(padraoTimer[0][0]);
        let r2 = lineaux.match(padraoTimer[1][0]);

        if (r == null && r2 == null)
          erroTable[erroTable.length] = [count, "Timer incorreto"];
        if (r == null) r = [];
        if (r2 == null) r2 = [];
        if (r.length > 1 || r2.length > 1)
          erroTable[erroTable.length] = [count, "Timer incorreto"];
        if (r.length > 1) {
          erroTable[erroTable.length] = [count, "Timer incorreto"];
        }
        if (r.length == 1 && r2.length == 1) {
          erroTable[erroTable.length] = [count, "Timer incorreto"];
        }
        if (r.length == 1) {
          lumin = lineaux.match(padraoLumin[0][0]);
          for (let i = 0; i < lumin[0].length; i++) {
            tokenSub += "§";
          }

          lineResultTimer = lineaux.replace(lumin[0], tokenSub);
        } else {
          if (r2.length != 1) {
            erroTable[erroTable.length] = [count, "Timer incorreto"];
          }
          if (r2.length == 1) {
            lumin = lineaux.match(padraoTimer[1][0]);

            for (let i = 0; i < lumin[0].length; i++) {
              tokenSub += "§";
            }
            lineResultTimer = lineaux.replace(lumin[0], tokenSub);
          }
        }
      }
      if (line[0] != "/" && line[1] != "/") {
        tokens.forEach((token) => {
          let aux = "";
          let r = transformedline.split(token[0]).length - 1;
          let index;
          if (r > 0) {
            for (let i = 0; i < token[0].length; i++) {
              aux += "§";
            }
            index = transformedline.indexOf(token[0]);
            for (let j = 0; j <= r; j++) {
              transformedline = transformedline.replace(token[0], aux);
              j++;
            }

            indexFinal = index + token[0].length - 1;
            lineAnalise[lineAnalise.length] = [
              count,
              token[0],
              token[1],
              token[2],
              index,
              indexFinal,
            ];
          }
        });
        tokenRegex.forEach((tokenRegex) => {
          result = transformedline.match(tokenRegex[0]);
          if (result != null) {
            result.forEach((tokenResult) => {
              index = transformedline.indexOf(tokenResult);
              let aux = "";
              for (let i = 0; i < tokenResult.length; i++) {
                aux += "§";
              }
              transformedline = transformedline.replace(tokenResult, aux);
              indexFinal = index + tokenResult.length - 1;
              lineAnalise[lineAnalise.length] = [
                count,
                tokenResult,
                tokenRegex[1],
                tokenRegex[2],
                index,
                indexFinal,
              ];
            });
          }
        });
        erros.forEach((erro) => {
          result = transformedline.match(erro[0]);
          if (result != null) {
            result.forEach((erroResult) => {
              index = transformedline.indexOf(erroResult);
              let aux = "";
              for (let i = 0; i < erroResult.length; i++) {
                aux += "§";
              }
              transformedline = transformedline.replace(erroResult, aux);
              indexFinal = index + erroResult.length - 1;
              lineAnalise[lineAnalise.length] = [
                count,
                erroResult,
                erro[1],
                erro[2],
                index,
                indexFinal,
              ];
              erroTable[erroTable.length] = [
                count,
                erroResult,
                index,
                indexFinal,
              ];
            });
          }
        });
      }
      //verifica se a linha nao esta vazia e se nao é uma função, se nao for função e nao terminar com um }
      //verifica se o ; nao esta duplicado
      //ou se nao existe ;
      //e retorna erro
      if (line.length != 0) {
        if (
          line.trim().substr(0, 3) == "for" ||
          line.trim().substr(0, 3) == "ife" ||
          line.trim().substr(0, 5) == "elsee"
        ) {
        } else {
          let linetrim = line.trim();
          if (
            linetrim[linetrim.length - 1] == ";" &&
            linetrim[linetrim.length - 2] == ";"
          )
            erroTable[erroTable.length] = [count, "; encontrado"];

          if (linetrim[linetrim.length - 1] != "}") {
            if (
              linetrim[linetrim.length - 1] != ";" &&
              linetrim[linetrim.length - 1] != null
            ) {
              erroTable[erroTable.length] = [count, "; não encontrado"];
            }
          }
        }
      }
      lineAnalise = lineAnalise.sort((a, b) =>
        a[4] > b[4] ? 1 : a[4] < b[4] ? -1 : 0
      );
      for (i = 0; i < lineAnalise.length; i++) {
        let linha = `<tr><td>` + lineAnalise[i][0] + `</td>`;
        let tokenEncontrado = "<td>" + lineAnalise[i][1] + "</td>";
        let tokenEn = "<td>" + lineAnalise[i][2] + "</td>";
        let tokenLexema = "<td>" + lineAnalise[i][3] + "</td>";
        let posicaoToken =
          "<td>" + lineAnalise[i][4] + " ate " + lineAnalise[i][5] + "</td>";
        document.getElementById("tabela").innerHTML +=
          linha + posicaoToken + tokenEncontrado + tokenEn + tokenLexema;
        document.getElementById("tabela").innerHTML += "</td></tr>";
      }
    });
    if (erroTable.length) {
      if (document.getElementById("tabela")) {
        tabela = document.getElementById("tabela");
        tabela.remove();
      }

      let linha = `<tr><td>` + erroTable[0][0] + `</td>`;
      let tokenEncontrado = "<td>" + erroTable[0][1] + "</td>";
      document.getElementById("tabelaErro").innerHTML +=
        linha + tokenEncontrado;
      document.getElementById("tabelaErro").innerHTML += "</td></tr>";

      document.getElementById("myModal").style.display = "block";
    }
  } else {
    document.getElementById(
      "alerta"
    ).innerHTML = `<div ><div style="margin: 0 auto; max-width: 50%; margin-bottom: 20px" class="alert alert-danger" role="alert">
    Área do código vazia!
  </div></div>`;
  }
}
