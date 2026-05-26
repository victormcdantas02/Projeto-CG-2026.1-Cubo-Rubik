class Cubo {
  constructor(scene) {
    this.scene = scene;
    this.cubinhos = [];
    this.animando = false;
    this.movimentos = 0;
    this.vitorias = 0;
    this.jaContouVitoria = true;

    this.grupoRotacao = new THREE.Group();
    this.scene.add(this.grupoRotacao);

    this.faceAtual = null;
    this.anguloAtual = 0;
    this.anguloFinal = Math.PI / 2;
    this.velocidade = 0.05;

    this.temaAtual = "classic";

    this.temas = {
      classic: {
        direita: 0xff0000,
        esquerda: 0xff8800,
        cima: 0xffffff,
        baixo: 0xffff00,
        frente: 0x00aa00,
        tras: 0x0000ff,
        interno: 0x222222
      },
      neon: {
        direita: 0xff0055,
        esquerda: 0xff9900,
        cima: 0xffffff,
        baixo: 0xffff00,
        frente: 0x00ff66,
        tras: 0x0066ff,
        interno: 0x111111
      },
      pastel: {
        direita: 0xff8a80,
        esquerda: 0xffcc80,
        cima: 0xffffff,
        baixo: 0xfff59d,
        frente: 0xa5d6a7,
        tras: 0x90caf9,
        interno: 0x333333
      }
    };

    this.criarCubo();
  }

  criarCubo() {
    const tamanho = 0.95;
    const espaco = 1.05;
    const tema = this.temas[this.temaAtual];

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const geometry = new THREE.BoxGeometry(tamanho, tamanho, tamanho);

          const materiais = [
            new THREE.MeshBasicMaterial({ color: x === 1 ? tema.direita : tema.interno }),
            new THREE.MeshBasicMaterial({ color: x === -1 ? tema.esquerda : tema.interno }),
            new THREE.MeshBasicMaterial({ color: y === 1 ? tema.cima : tema.interno }),
            new THREE.MeshBasicMaterial({ color: y === -1 ? tema.baixo : tema.interno }),
            new THREE.MeshBasicMaterial({ color: z === 1 ? tema.frente : tema.interno }),
            new THREE.MeshBasicMaterial({ color: z === -1 ? tema.tras : tema.interno })
          ];

          const cubinho = new THREE.Mesh(geometry, materiais);

          cubinho.position.set(x * espaco, y * espaco, z * espaco);

          cubinho.userData.posicaoInicial = { x, y, z };

          this.scene.add(cubinho);
          this.cubinhos.push(cubinho);
        }
      }
    }

    this.verificarVitoria();
  }

  obterCubinhosDaFace(face) {
    if (face === "U") {
      return this.cubinhos.filter(c => Math.round(c.position.y / 1.05) === 1);
    }

    if (face === "D") {
      return this.cubinhos.filter(c => Math.round(c.position.y / 1.05) === -1);
    }

    if (face === "F") {
      return this.cubinhos.filter(c => Math.round(c.position.z / 1.05) === 1);
    }

    return [];
  }

  rotacionarFace(face) {
    if (this.animando) return;

    this.faceAtual = face;
    this.anguloAtual = 0;
    this.animando = true;

    const cubinhosFace = this.obterCubinhosDaFace(face);

    this.grupoRotacao.rotation.set(0, 0, 0);

    cubinhosFace.forEach(cubinho => {
      this.scene.remove(cubinho);
      this.grupoRotacao.add(cubinho);
    });
  }

  update() {
    if (!this.animando) return;

    const incremento = Math.min(
      this.velocidade,
      this.anguloFinal - this.anguloAtual
    );

    this.anguloAtual += incremento;

    if (this.faceAtual === "U") {
      this.grupoRotacao.rotation.y += incremento;
    }

    if (this.faceAtual === "D") {
      this.grupoRotacao.rotation.y -= incremento;
    }

    if (this.faceAtual === "F") {
      this.grupoRotacao.rotation.z -= incremento;
    }

    if (this.anguloAtual >= this.anguloFinal) {
      this.finalizarRotacao();
    }
  }

  finalizarRotacao() {
    this.grupoRotacao.updateMatrixWorld();

    while (this.grupoRotacao.children.length > 0) {
      const cubinho = this.grupoRotacao.children[0];

      cubinho.applyMatrix4(this.grupoRotacao.matrixWorld);

      this.grupoRotacao.remove(cubinho);
      this.scene.add(cubinho);

      cubinho.position.x = Math.round(cubinho.position.x * 100) / 100;
      cubinho.position.y = Math.round(cubinho.position.y * 100) / 100;
      cubinho.position.z = Math.round(cubinho.position.z * 100) / 100;
    }

    this.grupoRotacao.rotation.set(0, 0, 0);

    this.animando = false;
    this.movimentos++;

    document.getElementById("moves").textContent = this.movimentos;

    this.verificarVitoria();
  }

  embaralhar() {
    const movimentos = ["U", "D", "F"];
    let i = 0;

    const intervalo = setInterval(() => {
      if (!this.animando) {
        const face = movimentos[Math.floor(Math.random() * movimentos.length)];
        this.rotacionarFace(face);
        i++;
      }

      if (i >= 10) {
        clearInterval(intervalo);
      }
    }, 300);
  }

  reiniciar() {
    while (this.grupoRotacao.children.length > 0) {
      const cubinho = this.grupoRotacao.children[0];
      this.grupoRotacao.remove(cubinho);
      this.scene.add(cubinho);
    }

    this.cubinhos.forEach(cubinho => {
      this.scene.remove(cubinho);
    });

    this.cubinhos = [];
    this.animando = false;
    this.faceAtual = null;
    this.anguloAtual = 0;
    this.movimentos = 0;
    this.jaContouVitoria = true;

    this.grupoRotacao.rotation.set(0, 0, 0);

    document.getElementById("moves").textContent = this.movimentos;

    this.criarCubo();
    this.verificarVitoria();
  }

  alterarTema(nomeTema) {
    this.temaAtual = nomeTema;
    this.reiniciar();
  }

  verificarVitoria() {
    const resolvido = this.cubinhos.every(cubinho => {
      const posInicial = cubinho.userData.posicaoInicial;

      return (
        Math.round(cubinho.position.x / 1.05) === posInicial.x &&
        Math.round(cubinho.position.y / 1.05) === posInicial.y &&
        Math.round(cubinho.position.z / 1.05) === posInicial.z
      );
    });

    const status = document.getElementById("status");

    if (!status) return;

    if (resolvido) {
      status.textContent = "Status: Cubo resolvido!";
      status.style.color = "#00ff88";

      if (!this.jaContouVitoria && this.movimentos > 0) {
        this.vitorias++;
        const wins = document.getElementById("wins");

        if (wins) {
          wins.textContent = this.vitorias;
        }

        this.jaContouVitoria = true;
      }
    } else {
      status.textContent = "Status: Embaralhado";
      status.style.color = "#ffcc00";
      this.jaContouVitoria = false;
    }
  }
}