Pasta Base
A pasta base/ contém o que nós podemos chamar de código padrão para o projeto. Aqui podemos encontrar um ficheiro de reset, algumas regras tipográficas e provavelmente uma folha de estilo (gosto de chamar _base.scss), que define alguns estilos padrão para elementos de HTML mais usados.

_base.scss
_reset.scss
_typography.scss
Se seu projeto usa muitas animações CSS, você deve considerar adicionar um arquivo \_animations.scss nele, contendo as definições dos @keyframes de todas suas animações. No entanto, se você só usa de vez em quando, coloque-as junto dos seletores que usam elas.

Pasta Layout
A pasta layout/ contêm tudo que é necessário para criar o layout do site ou aplicação. Esta pasta contêm as folhas de estilo para as partes principais do site (cabeçalho, rodapé, navegação, barra lateral…), a grelha ou mesmo o CSS de todos os formulários.

_grid.scss
_header.scss
_footer.scss
_sidebar.scss
_forms.scss
_navigation.scss
A pasta layout/ também pode ser chamada partials/, sendo isto uma questão de preferência.

Pasta Components
Para componentes mais pequenos, há a pasta components/. Enquanto a pasta layout/é macro (definindo a estrutura global), a pasta components/ é mais focada em módulos. Contêm todo o tipo de módulos específicos como um slider, um carregador e tudo que seja desse tipo. Há normalmente imensos ficheiros na pasta components/ tendo em conta que todo o site/aplicação deverá ser constituído por pequenos módulos.

_media.scss
_carousel.scss
_thumbnails.scss
A pasta components/ também se poderá chamar modules/, sendo isto uma questão de preferência.

Pasta Pages
Se tiveres estilos específicos a páginas, o melhor será colocá-las na pasta pages/, num ficheiro com o nome da página. Por exemplo, não deixa de ser comum ter estilos muito específicos para a página inicial que criam a necessidade de ter um _home.scss na pasta pages/.

_home.scss
_contact.scss
Dependendo do processo de desenvolvimento estes ficheiros podem ser chamados individualmente para evitar que eles se juntem com outros quando todas as folhas de estilo se juntam. Na realidade é uma questão de preferência.

Pasta Themes
Em grandes sites ou aplicações, é comum existirem vários temas. Há certamente diversas maneira de lidar com temas mas eu pessoalmente gosto de colocar tudo numa pasta com o nome themes/.

_theme.scss
_admin.scss
Isto é algo muito específico a cada projeto e em muitos deles podem nem existir a necessidade.

Pasta Abstracts
A pasta de /abstracts guarda todas as ferramentas e auxiliares de SASS usados por todo o projeto. Todas as funções globais, mixins e placeholders devem ser colocados nesta pasta.

A regra desta pasta é que não deve produzir uma única linha de CSS se for compilada sozinha. Tudo o que está aqui deverá ser nada mais que auxiliares.

_variables.scss
_mixins.scss
_functions.scss
_placeholders.scss
Quando trabalhamos em um projeto muito grande e com muitos utilitários abstratos, pode ser interessante agrupá-los por assunto invés de tipo, por exemplo: tipografia (_tipografia.scss), tema (tema.scss), etc. Cada arquivo contendo os auxiliares relacionados ao assunto: variáveis, funções, mixins e placeholders. Fazendo de tal maneira, o código fica mais fácil de ser lido e mantido, especialmente quando os arquivos estão ficando muito grandes.

A pasta abstracts/ também pode ser chamada de utilities/ ou helpers/, sendo uma questão de preferência.

Pasta Vendors
E por fim, a maioria dos projetos irão ter uma pasta vendors/ que vai conter todo o CSS usado por biblioteca e frameworks externas - Normalize, Bootstrap, jQueryUI, FancyCarouselSliderjQueryPowered, e por ai. Por todos estes componentes na mesma pasta é uma boa maneira de dizer "Hey, este código não é meu, não o escrevi, não é a minha responsabilidade".

_normalize.scss
_bootstrap.scss
_jquery-ui.scss
_select2.scss
Se tiveres que substituir uma secção de alguma destas extensões, eu recomendo criar um oitava pasta chamada vendors-extensions/ na qual estarão ficheiros com os mesmos nomes dos quais estás a substituir.

Por exemplo, vendors-extensions/_boostrap.scss é um ficheiro que contém todas as regras de CSS que tiveste que declarar de novo por cima do CSS padrão do Bootstrap. Isto é para evitar editar os ficheiros originais das extensões, o que normalmente não é uma boa ideia.

Ficheiro Principal
O ficheiro principal (normalmente chamado main.scss) deverá ser o único ficheiro de SASS que não começa com um underscore. Este ficheiro não deve conter nada mais que @import e comentários.

Os ficheiros devem ser importados de acordo com a pasta onde estão, uma depois da outra na seguinte ordem:

abstracts/
vendors/
base/
layout/
components/
pages/
themes/
De maneira a preservar a legibilidade, o ficheiro principal deverá seguir as seguintes diretrizes:

um ficheiro por @import;
um @importpor linha;
não colocar linha de espaço entre importações da mesma pasta;
uma linha de espaço depois da última importação de uma pasta;
extensões e underscores antes do nome devem ser omitidos.
{% include snippets/architecture/02/index.html %}

Existe outra maneira de importar parciais que também considero válida. O lado positivo dela é que torna o ficheiro mais legível. Por outro lado, faz qualquer mudança a esse ficheiro mais difícil. De qualquer maneira eu vou deixar isto ao vosso critério pois a diferença não é muita. Ao importar desta maneira o ficheiro principal deve seguir as seguintes diretrizes:

um @import por pasta;
linha de espaço entre cada @import;
cada ficheiro fica na sua linha;
uma linha de espaço depois da ultima importação numa pasta;
extensões e underscores antes do nome devem ser omitidos.
{% include snippets/architecture/03/index.html %}

De maneira a não ter que importar cada ficheiro manualmente, existe uma extensão para o Sass chamada sass-globbing, que torna possivel usar padrões globais no @import como @import "components/\*".

Tendo isto dito, eu não recomendo o uso desta extensão porque ela importa os ficheiros por ordem alfabética e normalmente não é isto que queremos, principalmente quando lidamos com uma linguagem que se baseia na ordem.

Sobre globbing
Em programação de computadores, os padrões glob especificam conjuntos de arquivos usando caracteres coringas, como *.scss. De modo geral, globbing significa combinar um conjunto de arquivos baseados numa expressão, invés de uma lista de arquivos. Quando aplicado ao Sass, isso significa importar partials no arquivo principal com o glob pattern, invés de importar cada um deles. Portanto, isso nos levaria a ter um arquivo parecido com esse:

{% include snippets/architecture/05/index.html %}

Sass não suporta globbing, porque isso pode ser uma feature perigosa, já que o CSS é conhecido por funcionar de acordo com a ordem de arquivos e declarações. Quando importando arquivos dinamicamente (que é feito em ordem alfabética, normalmente), não teríamos controle da ordem, o que pode levar a um debug muito difícil.

Dado isso, em uma arquitetura estritamente baseada em componentes e com esforço extra para não usar estilo de um partial em outro, a ordem de importação não importaria de fato, o que permitiria importar arquivos usando globbing. Portanto, isso faria ser mais fácil adicionar ou remover partials, já que não seria necessário atualizar o arquivo principal com tanta cautela.

Quando usando Ruby Sass, podemos usar uma gem chamada sass-globbing que ativa exatamente esse comportamento. Já se estamos executando node-sass, vamos depender do Node.js ou qualquer ferramenta de build usada para compilação (Gulp, Grunt e etc.).

Ficheiro Vergonhoso
Existe um conceito interessante que foi tornado popular por Harry Roberts, Dave Rupert e Chris Coyier que consiste em colocar todas as declarações, hacks e coisas das quais não estamos propriamente orgulhosos num ficheiro vergonhoso. Este ficheiro dramaticamente chamado _shame.css, seria importado depois de todos os outros mesmo no fim da folha de estilo.

{% include snippets/architecture/04/index.html %}