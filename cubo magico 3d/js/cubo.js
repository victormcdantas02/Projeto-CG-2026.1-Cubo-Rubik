class Cubo {
  constructor(scene) {
    this.scene = scene;
    this.cubinhos = [];
    this.animando = false;
    this.movimentos = 0;

    this.grupoRotacao = new THREE.Group();
    this.scene.add(this.grupoRotacao);

    this.faceAtual = null;
    this.anguloAtual = 0;
    this.anguloFinal = Math.PI / 2;
    this.velocidade = 0.05;

    this.criarCubo();
  }

  criarCubo() {
    const tamanho = 0.95;
    const espaco = 1.05;

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const geometry = new THREE.BoxGeometry(tamanho, tamanho, tamanho);

          const materiais = [
            new THREE.MeshBasicMaterial({ color: x === 1 ? 0xff0000 : 0x222222 }), // direita
            new THREE.MeshBasicMaterial({ color: x === -1 ? 0xff8800 : 0x222222 }), // esquerda
            new THREE.MeshBasicMaterial({ color: y === 1 ? 0xffffff : 0x222222 }), // cima
            new THREE.MeshBasicMaterial({ color: y === -1 ? 0xffff00 : 0x222222 }), // baixo
            new THREE.MeshBasicMaterial({ color: z === 1 ? 0x00aa00 : 0x222222 }), // frente
            new THREE.MeshBasicMaterial({ color: z === -1 ? 0x0000ff : 0x222222 })  // trás
          ];

          const cubinho = new THREE.Mesh(geometry, materiais);
          cubinho.position.set(x * espaco, y * espaco, z * espaco);

          cubinho.userData.posicao = { x, y, z };

          this.scene.add(cubinho);
          this.cubinhos.push(cubinho);
        }
      }
    }
  }

  obterCubinhosDaFace(face) {
    if (face === "U") {
      return this.cubinhos.filter(c => Math.round(c.position.y) === 1);
    }

    if (face === "F") {
      return this.cubinhos.filter(c => Math.round(c.position.z) === 1);
    }
    if (face === "D") {
      return this.cubinhos.filter(c => Math.round(c.position.y) === -1);
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

    const incremento = Math.min(this.velocidade, this.anguloFinal - this.anguloAtual);
    this.anguloAtual += incremento;

    if (this.faceAtual === "U") {
      this.grupoRotacao.rotation.y += incremento;
    }

    if (this.faceAtual === "F") {
      this.grupoRotacao.rotation.z -= incremento;
    }
    if (this.faceAtual === "D") {
      this.grupoRotacao.rotation.y -= incremento;
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
  }

  embaralhar() {
    const movimentos = ["U", "F"];
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
    }, 250);
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

  this.grupoRotacao.rotation.set(0, 0, 0);

  document.getElementById("moves").textContent = this.movimentos;

  this.criarCubo();
}
}