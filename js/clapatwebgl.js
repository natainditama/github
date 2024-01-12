class ClapatWebGL {
    constructor(e) {
        this.scene = new THREE.Scene, this.vertex = "varying vec2 vUv;void main() {vUv = uv;gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );}", this.material = e.material, this.fragment = e.fragment, this.uniforms = e.uniforms, this.renderer = new THREE.WebGLRenderer, this.width = window.innerWidth, this.height = window.innerHeight, this.renderer.setPixelRatio(window.devicePixelRatio), this.renderer.setSize(this.width, this.height), this.renderer.setClearColor(2303786, 1), this.container = document.getElementById("canvas-slider"), this.images = Array.from(document.querySelectorAll(".slide-img")), this.width = this.container.offsetWidth, this.height = this.container.offsetHeight, this.container.appendChild(this.renderer.domElement), this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, .001, 1e3), this.camera.position.set(0, 0, 2), this.current = 0, this.textures = [], this.isRunning = !1, this.paused = !0, this.initiate(() => {
            this.setupResize(), this.addObjects(), this.resize(), this.play()
        })
    }
    initiate(e) {
        const t = [];
        let i = this;
        this.images.forEach((e, s) => {
            let h = new Promise(t => {
                i.textures[s] = (new THREE.TextureLoader).load(e.src, t)
            });
            t.push(h)
        }), Promise.all(t).then(() => {
            e()
        })
    }
    setupResize() {
        window.addEventListener("resize", this.resize.bind(this))
    }
    resize() {
        let e, t;
        this.width = this.container.offsetWidth, this.height = this.container.offsetHeight, this.renderer.setSize(this.width, this.height), this.camera.aspect = this.width / this.height, this.imageAspect = this.textures[0].image.height / this.textures[0].image.width, this.height / this.width > this.imageAspect ? (e = this.width / this.height * this.imageAspect, t = 1) : (e = 1, t = this.height / this.width / this.imageAspect), this.material.uniforms.resolution.value.x = this.width, this.material.uniforms.resolution.value.y = this.height, this.material.uniforms.resolution.value.z = e, this.material.uniforms.resolution.value.w = t;
        const i = this.camera.position.z;
        this.camera.fov = 180 / Math.PI * 2 * Math.atan(1 / (2 * i)), this.plane.scale.x = this.camera.aspect, this.plane.scale.y = 1, this.camera.updateProjectionMatrix()
    }
    addObjects() {
        let e = (new THREE.TextureLoader).load($("#showcase-slider-holder").attr("data-pattern-img"));
        e.wrapS = e.wrapT = THREE.RepeatWrapping, this.material = new THREE.ShaderMaterial({
            uniforms: {
                effectFactor: {
                    type: "f",
                    value: .15
                },
                dispFactor: {
                    type: "f",
                    value: 0
                },
                currentImage: {
                    type: "t",
                    value: this.textures[0]
                },
                nextImage: {
                    type: "t",
                    value: this.textures[1]
                },
                disp: {
                    type: "t",
                    value: e
                },
                resolution: {
                    type: "v4",
                    value: new THREE.Vector4
                }
            },
            vertexShader: this.vertex,
            fragmentShader: this.fragment,
            transparent: !0,
            opacity: 1
        }), this.geometry = new THREE.PlaneGeometry(1, 1, 2, 2), this.plane = new THREE.Mesh(this.geometry, this.material), this.scene.add(this.plane)
    }
    stop() {
        this.paused = !0
    }
    play() {
        this.paused = !1, this.render()
    }
    render() {
        this.paused || (requestAnimationFrame(this.render.bind(this)), this.renderer.render(this.scene, this.camera))
    }
}