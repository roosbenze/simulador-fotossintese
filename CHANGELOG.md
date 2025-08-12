# Changelog - Simulador de Fotossíntese

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [2.0.0] - 2025-08-08

### 🎉 **VERSÃO COMPLETAMENTE REESCRITA**

Esta versão representa uma recriação completa do simulador baseada em feedback educacional e melhorias pedagógicas solicitadas.

### ✨ **Adicionado**

#### **Funcionalidades Principais:**
- **Início noturno obrigatório** (22:00) para ensinar sobre ciclos dia/noite
- **Planta anatomicamente correta** baseada em imagem educativa
- **Sistema circulatório visível** com xilema e floema claramente identificados
- **Zona de absorção destacada** nas raízes com feedback visual
- **Raios solares direcionados** em forma de onda (fótons) do sol para a planta
- **Transporte realista de nutrientes** através do sistema vascular
- **Produção de glicose** com destino específico nos frutos

#### **Interface e Experiência:**
- **Mensagens educativas contextuais** sobre fase escura e clara
- **Transições suaves** entre dia e noite com cores diferenciadas
- **Feedback tátil** para dispositivos móveis (vibração)
- **Animações de celebração** ao completar o jogo
- **Sistema de drag-and-drop** completamente reescrito
- **Responsividade aprimorada** para todos os dispositivos

#### **Elementos Visuais:**
- **Anatomia vegetal completa**: raízes, caule, folhas, flores, frutos
- **Lençol freático** visível no subsolo
- **Moléculas identificadas** (H₂O, CO₂, O₂, C₆H₁₂O₆)
- **Indicadores de progresso** para água, CO₂ e glicose
- **Legenda do sistema vascular** com cores diferenciadas
- **Partículas animadas** de oxigênio e glicose

#### **Acessibilidade:**
- **Navegação por teclado** completa
- **Atalhos de teclado** (setas, R, Esc)
- **Atributos ARIA** para leitores de tela
- **Instruções visuais** claras
- **Suporte a touch** otimizado

#### **Educacional:**
- **Equação química correta**: 6CO₂ + 6H₂O + energia solar → C₆H₁₂O₆ + 6O₂
- **Processo completo** da absorção à produção de frutos
- **Conceitos de anatomia vegetal** integrados
- **Importância da luz solar** demonstrada visualmente
- **Ciclo dia/noite** como elemento pedagógico

### 🔧 **Melhorado**

#### **Performance:**
- **JavaScript vanilla** sem dependências externas
- **Otimização de animações** com requestAnimationFrame
- **Gerenciamento de memória** aprimorado
- **Carregamento mais rápido** com assets otimizados

#### **Usabilidade:**
- **Área de toque aumentada** para dispositivos móveis
- **Feedback visual imediato** para todas as ações
- **Mensagens de erro amigáveis** com orientações
- **Sistema de hints** integrado

#### **Código:**
- **Arquitetura modular** com classes especializadas
- **Separação de responsabilidades** clara
- **Documentação inline** completa
- **Tratamento de erros** robusto

### 🐛 **Corrigido**

#### **Problemas Científicos:**
- **Equação química** corrigida e completa
- **Produção de oxigênio** agora visível
- **Papel da clorofila** indicado nas folhas verdes
- **Dependência da luz solar** implementada corretamente

#### **Problemas Técnicos:**
- **Drag-and-drop** funciona em todos os dispositivos
- **Responsividade** em telas pequenas
- **Performance** em dispositivos mais antigos
- **Compatibilidade** com navegadores diversos

#### **Problemas de UX:**
- **Zona de absorção** agora é claramente visível
- **Feedback de ações** sempre presente
- **Navegação intuitiva** sem confusões
- **Instruções claras** em português

### 🗑️ **Removido**
- **Código legado** da versão 1.x
- **Dependências desnecessárias**
- **Elementos visuais confusos**
- **Funcionalidades redundantes**

### 🔒 **Segurança**
- **Validação de entrada** em todos os inputs
- **Sanitização de dados** do usuário
- **Prevenção de XSS** em elementos dinâmicos

---

## [1.1.0] - 2025-08-08 (Versão Anterior)

### ✨ **Adicionado**
- Início noturno obrigatório (22:00)
- Raios solares direcionados em forma de onda
- Fases diferenciadas entre dia e noite
- Mensagens educativas sobre ciclos

### 🔧 **Melhorado**
- Transições visuais entre dia e noite
- Feedback visual das interações
- Performance das animações

### 🐛 **Corrigido**
- Problemas com drag-and-drop
- Responsividade em dispositivos móveis

---

## [1.0.0] - 2025-08-08 (Versão Original)

### ✨ **Adicionado**
- Simulador básico de fotossíntese
- Sistema de drag-and-drop para moléculas
- Controle de tempo dia/noite
- Interface educativa básica
- Equação química da fotossíntese
- Sistema de pontuação simples

### 📚 **Documentação**
- README inicial
- Guia básico do educador
- Licença MIT

---

## 📋 **Notas de Versão**

### **Compatibilidade:**
- **Versão 2.0.0** não é compatível com dados da versão 1.x
- **Migração automática** não é necessária (jogo sem persistência)
- **URLs antigas** redirecionam automaticamente

### **Requisitos do Sistema:**
- **Navegador moderno** com suporte a ES6+
- **JavaScript habilitado**
- **Resolução mínima** 320x568 (iPhone SE)
- **Conexão inicial** para carregamento (depois funciona offline)

### **Suporte:**
- **Versão 2.0.0**: Suporte ativo
- **Versão 1.x**: Descontinuada

### **Próximas Versões:**
- **2.1.0**: Melhorias de acessibilidade e novos idiomas
- **2.2.0**: Sistema de relatórios para educadores
- **3.0.0**: Realidade aumentada e simulação 3D

---

**Para mais informações sobre cada versão, consulte as [releases no GitHub](https://github.com/roosbenze/simulador-fotossintese/releases).**

