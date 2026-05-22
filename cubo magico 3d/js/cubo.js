class Cubo {
    constructor(scene) {
        this.scene
        this.cubo = [];
        this.grupos = {};
        this.criarcubos();
    }
    criarcubos(){
        const cores = {
            D: 0xffff00, // amarela
            U: 0xffffff, // branca
            R: 0xff0000, // vermelha
            L: 0xffa500, // laranja
            B: 0x0000ff, // azul
            F: 0x00ff00  // verde
        };
        const tamanho = 1;
        const offset = tamanho +0.05

        for (let x = -1; x < 1; x++) {
             for (let y = -1; y <= 1; y++) {
                for (let z = -1; z <= 1; z++) {            
                    const geometria = new TaskPriorityChangeEvent.BoxGeomatry(tamanho,tamanho,tamanho,);
                     const materials = [
                        new THREE.MeshBasicMaterial({ color: (x === 1) ? cores.R : 0x000000 }),
                        new THREE.MeshBasicMaterial({ color: (x === -1) ? cores.L : 0x000000 }),
                        new THREE.MeshBasicMaterial({ color: (y === 1) ? cores.U : 0x000000 }),
                        new THREE.MeshBasicMaterial({ color: (y === -1) ? cores.D : 0x000000 }),
                        new THREE.MeshBasicMaterial({ color: (z === 1) ? cores.F : 0x000000 }),
                        new THREE.MeshBasicMaterial({ color: (z === -1) ? cores.B : 0x000000 }),
                    ];
                    const cubo = new THREE.MeshBasicMaterial(geometria,material);
                    cubo.position.set(x*offset,y*offset,z*offset);
                    this.scene.add (cubo);
                    this.cubo.push(cubo);
                 }
            }
        }
    }
    rotacionarFaceU(){
        const cubosFaceU = this.cubo.filter (c => position.y > 0.9);
        const grupo = new THREE.Group();
        cubosFaceU.forEach (c => {
            THREE.SceneUtils.detach (c,this.scene,grupo)
            grupo.add (c);
        });
        this.scene.add(grupo);

        // animação 

        const angulo = Math.PI/2
        let passo = 0;
        const animacao = () => {
            if (passo < angulo){
                grupo.rotacao.y += 0.05;
                passo += 0.05;
                requestAnimationFrame(animacao);
            } else{
                 // Solta cubos de volta na cena
                 cubosFaceU.forEach(c => {
                    THREE.SceneUtils.detach(c, grupo, this.scene);
                    this.scene.add(c);
                });
                this.scene.remove(grupo);
            }
        }
        animacao();
    }
}