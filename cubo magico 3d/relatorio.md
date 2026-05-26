# Relatório de Implementação: Simulação 3D de Cubo Mágico

**Integrantes:** Pedro Ayres, Victor Dantas, João Carlos Pires, Roberto Campos

---

## 1. Objetivo do Projeto
Desenvolver uma simulação computacional interativa de um Cubo Mágico (Rubik's Cube) 3x3x3, aplicando conceitos fundamentais de Computação Gráfica, como transformações geométricas, manipulação de câmera espacial e renderização em tempo real, utilizando a biblioteca **Three.js**.

## 2. O que foi implementado
O projeto foi construído utilizando o ecossistema Web (HTML5, CSS3, JavaScript) integrado ao motor gráfico WebGL via Three.js. A arquitetura foi dividida de forma modular. As principais implementações incluem:

* **Modelagem e Renderização:** Criação de 27 sub-cubos instanciados via `BoxGeometry`, com mapeamento de materiais (`MeshBasicMaterial`) para pintar as 6 faces isoladamente. As faces internas receberam cor escura para otimização visual.
* **Câmera e Iluminação:** Integração da `PerspectiveCamera` com `OrbitControls` para inspeção do objeto em 360 graus e zoom. Iluminação mista com `AmbientLight` e `DirectionalLight`.
* **Interatividade de Rotação:** Rotação independente das faces Superior (U), Frontal (F) e Inferior (D), com animações calculadas de forma suave.
* **Controles de Estado:** Sistema automatizado de embaralhamento (*Shuffle*) com movimentos aleatórios temporizados, botão para reiniciar a matriz geométrica e contador dinâmico de movimentos no HUD.
* **Mapeamento de Inputs:** Suporte a comandos via interface gráfica (botões HTML) e atalhos de teclado.

## 3. As dificuldades encontradas
Durante o desenvolvimento, a manipulação espacial em 3D gerou desafios técnicos que exigiram refatorações lógicas:

1. **Alinhamento Espacial nas Rotações:** A principal dificuldade encontrada foi a manipulação correta das rotações das faces do cubo sem comprometer o alinhamento espacial dos cubinhos.
2. **Suavidade e Sincronização das Animações:** Outro desafio importante foi realizar a interpolação suave das animações, garantindo que as rotações ocorressem de maneira fluida e sincronizada com o loop de renderização do navegador (*requestAnimationFrame*), evitando que novos inputs quebrassem a estrutura geométrica enquanto um giro estava em andamento.
3. **Gerenciamento de Grupos Temporários e Matrizes:** Houve dificuldades relacionadas ao gerenciamento de grupos temporários (`THREE.Group`) e à atualização das matrizes de transformação após cada rotação. Para que os blocos fossem devolvidos corretamente à cena principal, foi necessário aplicar um tratamento de arredondamento matemático para neutralizar as imprecisões de ponto flutuante geradas pelas transformações sucessivas.

## 4. Divisão de Tarefas
Para otimizar o tempo e cobrir os requisitos, a equipe dividiu o escopo do projeto:
* Pedro Ayres:
Implementação da lógica principal do cubo, sistema de rotação e controles de teclado.

* Victor Dantas:
Estrutura HTML/CSS e interface gráfica do usuário.

* João Carlos Pires:
Implementação das animações e sistema de embaralhamento.

* Roberto Campos:
Documentação, testes e organização do projeto no GitHub.

## 5. Conclusão
O desenvolvimento atendeu aos requisitos técnicos esperados. O uso prático do Three.js permitiu consolidar na prática os conceitos de álgebra linear e manipulação de matrizes no espaço 3D, além do entendimento sobre estrutura de cena (*Scene Graph*) e gestão de estados de animação vinculados à taxa de quadros (*requestAnimationFrame*).
