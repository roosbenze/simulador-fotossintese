# 🌱 Simulador de Fotossíntese - Versão 2.0

**Jogo educacional interativo sobre fotossíntese desenvolvido para alunos do 2º ano do Ensino Fundamental, alinhado com a BNCC.**

## 🎮 **JOGAR ONLINE**
👉 **[🚀 CLIQUE AQUI PARA JOGAR](https://roosbenze.github.io/simulador-fotossintese)**

## 🆕 **NOVIDADES DA VERSÃO 2.0**
- 🌙 **Inicia obrigatoriamente à noite** para ensinar sobre ciclos
- ⚡ **Raios solares direcionados** mostram energia dos fótons
- 🌿 **Planta anatomicamente correta** baseada em imagem educativa
- 🔄 **Sistema circulatório visível** (xilema e floema)
- 💧 **Zona de absorção clara** nas raízes
- 🎨 **Fases bem diferenciadas** entre dia e noite
- 📚 **Mensagens educativas** contextuais
- 🍎 **Transporte realista** de nutrientes para os frutos

## 🎯 **Características Principais**

### ✅ **Educacionais**
- **Alinhado com a BNCC** (EF02CI05URA01)
- **Cientificamente preciso** (equação corrigida: 6CO₂ + 6H₂O + energia solar → C₆H₁₂O₆ + 6O₂)
- **Anatomia vegetal** com partes nomeadas
- **Processo completo** da absorção à produção de frutos

### ✅ **Técnicas**
- **Interface intuitiva** com drag-and-drop
- **Responsivo** (desktop, tablet, mobile)
- **Acessível** com suporte a teclado e touch
- **Performance otimizada** para dispositivos básicos
- **Sem dependências** - JavaScript vanilla

### ✅ **Pedagógicas**
- **Gamificação educativa** com progressão clara
- **Feedback visual** imediato
- **Ciclo dia/noite** educativo
- **Mensagens contextuais** explicativas

## 🎮 **Como Jogar**

### **Passo a Passo:**
1. **Observe a noite** - O jogo inicia às 22:00 para ensinar sobre a fase escura
2. **Ajuste o horário** - Use o slider ou setas do teclado para chegar ao período diurno (6h-18h)
3. **Arraste moléculas de água (H₂O)** do lençol freático para a **zona de absorção** nas raízes
4. **Arraste moléculas de CO₂** da atmosfera para as **folhas**
5. **Observe a fotossíntese** acontecer com produção de oxigênio (O₂)
6. **Veja o transporte** da glicose pelo floema até os frutos
7. **Complete o objetivo** enchendo os 3 frutos com glicose

### **Controles:**
- **Mouse/Touch**: Arrastar moléculas
- **Slider**: Ajustar horário
- **Teclado**: ← → (horário), R (reiniciar), Esc (fechar mensagens)

## 🔬 **Conceitos Científicos Abordados**

### **Anatomia Vegetal:**
- **Raízes** com zona de absorção
- **Caule** com sistema vascular (xilema e floema)
- **Folhas** com áreas de fotossíntese
- **Flores** (meristema apical e dreno)
- **Frutos** como destino da glicose

### **Processos Biológicos:**
- **Absorção** de água pelas raízes
- **Transporte** pelo xilema (água sobe)
- **Fotossíntese** nas folhas (6CO₂ + 6H₂O + luz → C₆H₁₂O₆ + 6O₂)
- **Distribuição** pelo floema (glicose desce)
- **Ciclo dia/noite** e dependência da luz solar

## 📚 **Para Educadores**

### **Objetivos de Aprendizagem:**
- Compreender o processo de fotossíntese
- Identificar partes da planta e suas funções
- Relacionar luz solar com produção de alimento
- Entender o transporte de nutrientes
- Reconhecer a importância das plantas

### **Estratégias Pedagógicas:**
1. **Exploração livre** - Deixe os alunos descobrirem
2. **Discussão em grupo** - Sobre o que observaram
3. **Comparação** - Dia vs. noite, com vs. sem recursos
4. **Experimentação** - Diferentes sequências de ações
5. **Conexão** - Com plantas reais da escola/casa

### **Atividades Complementares:**
- Observação de plantas reais
- Desenho das partes da planta
- Experimentos com luz e plantas
- Criação de histórias sobre fotossíntese
- Jogos de identificação de partes vegetais

## 🛠️ **Especificações Técnicas**

### **Tecnologias:**
- HTML5, CSS3, JavaScript ES6+
- Canvas para animações
- Web APIs (Drag & Drop, Touch Events)
- Responsive Design
- Progressive Web App ready

### **Compatibilidade:**
- **Navegadores**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Dispositivos**: Desktop, tablet, smartphone
- **Sistemas**: Windows, macOS, Linux, iOS, Android
- **Conectividade**: Funciona offline após carregamento

### **Performance:**
- **Tamanho**: ~150KB total
- **Carregamento**: <3 segundos em 3G
- **RAM**: <50MB de uso
- **CPU**: Otimizado para dispositivos básicos

## 📁 **Estrutura do Projeto**

```
simulador-fotossintese-v2/
├── index.html              # Página principal
├── css/
│   └── styles.css          # Estilos principais
├── js/
│   ├── main.js            # Inicialização
│   ├── game-logic.js      # Lógica principal
│   ├── vascular-system.js # Sistema circulatório
│   ├── photosynthesis.js  # Sistema de fotossíntese
│   └── molecules.js       # Drag-and-drop
├── docs/
│   ├── guia-educador.md   # Guia pedagógico
│   └── atividades.md      # Atividades complementares
├── README.md              # Este arquivo
├── LICENSE                # Licença MIT
└── CHANGELOG.md           # Histórico de versões
```

## 🚀 **Instalação e Uso**

### **Uso Online:**
Acesse diretamente: https://roosbenze.github.io/simulador-fotossintese

### **Uso Local:**
1. Baixe o projeto
2. Abra `index.html` em qualquer navegador
3. Não requer servidor web

### **Para Desenvolvedores:**
```bash
# Clonar repositório
git clone https://github.com/roosbenze/simulador-fotossintese.git

# Navegar para o diretório
cd simulador-fotossintese

# Abrir no navegador
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

## 🤝 **Contribuições**

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### **Áreas para Contribuição:**
- Tradução para outros idiomas
- Novos níveis de dificuldade
- Melhorias de acessibilidade
- Otimizações de performance
- Novos recursos educativos

## 📄 **Licença**

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

**Uso livre para fins educacionais!**

## 👥 **Créditos**

- **Desenvolvimento**: Manus AI
- **Conceito Educativo**: Baseado na BNCC
- **Design**: Inspirado em materiais didáticos de ciências
- **Testes**: Comunidade educacional

## 📞 **Suporte**

- **Issues**: [GitHub Issues](https://github.com/roosbenze/simulador-fotossintese/issues)
- **Discussões**: [GitHub Discussions](https://github.com/roosbenze/simulador-fotossintese/discussions)
- **Email**: Para suporte educacional

## 🎯 **Roadmap**

### **Versão 2.1 (Planejada)**
- [ ] Modo multiplayer
- [ ] Sistema de conquistas
- [ ] Relatórios de progresso
- [ ] Integração com LMS

### **Versão 3.0 (Futuro)**
- [ ] Realidade aumentada
- [ ] Outros processos biológicos
- [ ] Simulação 3D
- [ ] Inteligência artificial

---

**Desenvolvido com ❤️ para a educação brasileira** 🇧🇷

*"Transformando o ensino de ciências através da tecnologia interativa"*

