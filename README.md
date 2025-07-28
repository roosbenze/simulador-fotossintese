# 🌱 Simulador de Fotossíntese - Jogo Educacional

## Visão Geral

O **Simulador de Fotossíntese** é um jogo educacional interativo desenvolvido especificamente para alunos do 2º ano do Ensino Fundamental, alinhado com a Base Nacional Comum Curricular (BNCC). O simulador permite que os estudantes aprendam sobre o processo de fotossíntese de forma lúdica e visual, manipulando moléculas e observando como as plantas produzem seu próprio alimento.

## 🎯 Objetivos Educacionais

### Competências da BNCC
- **EF02CI05URA01**: Investigar a importância da água e da luz para a manutenção da vida de animais e plantas

### Objetivos de Aprendizagem
- Compreender como as plantas produzem seu próprio alimento
- Identificar os elementos necessários para a fotossíntese (água, CO₂, luz solar)
- Reconhecer a importância do Sol para a vida na Terra
- Entender como as plantas produzem oxigênio
- Observar o ciclo dia e noite e sua influência nos processos vitais

## 🎮 Como Jogar

### Controles Básicos
- **Mouse/Touch**: Arraste as moléculas para as zonas corretas
- **Slider de Tempo**: Controle o horário do dia (6h às 18h para fotossíntese)
- **Setas do Teclado (←→)**: Ajuste o horário
- **Tecla H**: Mostrar ajuda
- **Ctrl+R**: Reiniciar o jogo

### Passo a Passo
1. **Colete Água**: Arraste as moléculas de água (💧 H₂O) do subsolo até as raízes da planta
2. **Colete CO₂**: Arraste as moléculas de gás carbônico (💨 CO₂) da atmosfera até as folhas
3. **Ajuste o Sol**: Use o controle de tempo para garantir que seja dia (6h-18h)
4. **Observe a Magia**: Veja a fotossíntese acontecer na folha da planta!
5. **Forme Frutos**: Complete o processo 3 vezes para formar todos os frutos de glicose

### Elementos do Jogo
- **🌱 Planta**: Folhas (fotossíntese), caule (transporte), raízes (absorção)
- **☀️ Sol**: Fonte de energia para a fotossíntese (apenas durante o dia)
- **💧 Moléculas de Água (H₂O)**: Absorvidas pelas raízes
- **💨 Moléculas de CO₂**: Capturadas pelas folhas
- **🍎 Frutos de Glicose**: Produto final da fotossíntese
- **🫧 Bolhas de Oxigênio**: Liberadas durante o processo

## ⚗️ A Ciência por Trás

### Equação da Fotossíntese
```
6CO₂ + 6H₂O + energia solar → C₆H₁₂O₆ + 6O₂ + 6H₂O
```

**Em palavras simples:**
- 6 moléculas de gás carbônico
- \+ 6 moléculas de água
- \+ energia do sol
- = 1 molécula de glicose + 6 moléculas de oxigênio + 6 moléculas de água

### Processo Simplificado
1. **Absorção**: As raízes absorvem água do solo
2. **Captura**: As folhas capturam CO₂ do ar
3. **Energia**: A clorofila nas folhas captura a luz solar
4. **Reação**: A energia solar combina H₂O e CO₂
5. **Produção**: Forma-se glicose (alimento) e oxigênio
6. **Liberação**: O oxigênio é liberado para a atmosfera

## 🛠️ Requisitos Técnicos

### Navegadores Suportados
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Dispositivos
- **Desktop**: Windows, macOS, Linux
- **Tablet**: iPad, Android tablets
- **Mobile**: iPhone, Android phones (tela mínima 320px)

### Conectividade
- Funciona offline após carregamento inicial
- Não requer instalação adicional
- Compatível com lousas digitais e projetores

## 📁 Estrutura do Projeto

```
simulador-fotossintese/
├── index.html              # Página principal
├── css/
│   └── styles.css          # Estilos visuais
├── js/
│   ├── main.js            # Inicialização principal
│   ├── game-logic.js      # Lógica do jogo
│   ├── molecules.js       # Sistema de moléculas
│   └── animations.js      # Animações e efeitos
├── docs/
│   ├── guia-educador.md   # Guia para professores
│   └── atividades.md      # Atividades complementares
└── README.md              # Este arquivo
```

## 🚀 Instalação e Uso

### Método 1: Uso Direto
1. Baixe todos os arquivos do projeto
2. Abra o arquivo `index.html` em qualquer navegador
3. O jogo estará pronto para uso!

### Método 2: Servidor Local (Recomendado)
```bash
# Se você tem Python instalado
cd simulador-fotossintese
python -m http.server 8000

# Acesse: http://localhost:8000
```

### Método 3: Hospedagem Web
- Faça upload de todos os arquivos para um servidor web
- Acesse através da URL do seu servidor
- Ideal para uso em múltiplas salas de aula

## 🎓 Para Educadores

### Integração Curricular
- **Ciências**: Processos vitais, plantas, meio ambiente
- **Matemática**: Contagem, sequências, proporções
- **Português**: Vocabulário científico, leitura de instruções
- **Arte**: Cores, formas, representação visual da natureza

### Estratégias Pedagógicas
- **Aprendizagem Ativa**: Manipulação direta de elementos
- **Gamificação**: Progressão por níveis e conquistas
- **Aprendizagem Visual**: Representações gráficas claras
- **Feedback Imediato**: Respostas instantâneas às ações

### Avaliação
- Observe se o aluno consegue completar o processo
- Verifique a compreensão da sequência correta
- Questione sobre a importância de cada elemento
- Avalie a transferência do conhecimento para situações reais

## 🔧 Personalização

### Modificações Simples
- **Cores**: Edite o arquivo `css/styles.css`
- **Textos**: Modifique o arquivo `index.html`
- **Dificuldade**: Ajuste variáveis no `js/game-logic.js`

### Extensões Possíveis
- Adicionar mais tipos de plantas
- Incluir diferentes condições ambientais
- Criar níveis de dificuldade progressiva
- Implementar sistema de pontuação

## 🐛 Solução de Problemas

### Problemas Comuns
1. **Moléculas não se movem**: Verifique se o JavaScript está habilitado
2. **Layout quebrado**: Atualize o navegador ou teste em outro
3. **Animações lentas**: Feche outras abas do navegador
4. **Touch não funciona**: Teste em dispositivo com tela sensível ao toque

### Suporte Técnico
- Verifique o console do navegador (F12) para erros
- Teste em modo incógnito para descartar extensões
- Confirme que todos os arquivos estão no local correto

## 📊 Métricas e Avaliação

### Dados Coletados (Localmente)
- Tempo para completar cada nível
- Número de tentativas por processo
- Sequência de ações realizadas
- Horários de maior engajamento

### Indicadores de Sucesso
- Taxa de conclusão do jogo
- Tempo médio de aprendizagem
- Retenção do conhecimento após uma semana
- Transferência para atividades relacionadas

## 🤝 Contribuições

### Como Contribuir
1. Reporte bugs ou sugestões
2. Proponha melhorias pedagógicas
3. Traduza para outros idiomas
4. Crie atividades complementares

### Diretrizes
- Mantenha o foco no público-alvo (7-8 anos)
- Preserve a precisão científica
- Teste em dispositivos reais
- Documente todas as mudanças

## 📄 Licença

Este projeto é distribuído sob licença MIT, permitindo uso livre para fins educacionais e comerciais. Veja o arquivo LICENSE para detalhes completos.

## 👥 Créditos

### Desenvolvimento
- **Conceito Pedagógico**: Baseado em pesquisas em educação científica
- **Design Visual**: Inspirado em metodologias de aprendizagem visual
- **Implementação Técnica**: HTML5, CSS3, JavaScript vanilla

### Agradecimentos
- Professores que forneceram feedback durante o desenvolvimento
- Alunos que testaram as versões preliminares
- Comunidade educacional que apoiou o projeto

## 📞 Contato

Para dúvidas, sugestões ou suporte:
- **Email**: suporte@simulador-fotossintese.edu.br
- **Documentação**: Consulte os arquivos na pasta `docs/`
- **Atualizações**: Verifique regularmente por novas versões

---

**Versão**: 1.0.0  
**Última Atualização**: Julho 2025  
**Compatibilidade**: BNCC 2018, Ensino Fundamental Anos Iniciais

