import { onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'

export function useThreeScene(canvasRef: { value: HTMLCanvasElement | null }) {
  const isReady = ref(false)

  let renderer: THREE.WebGLRenderer
  let scene: THREE.Scene
  let camera: THREE.PerspectiveCamera
  let particles: THREE.Points
  let animId: number
  let mouseX = 0
  let mouseY = 0

  function init() {
    const canvas = canvasRef.value
    if (!canvas) return

    // ─── 渲染器 ───────────────────────────────────────────────────────────
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)

    // ─── 场景 & 摄像机 ───────────────────────────────────────────────────
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    // ─── 粒子系统 ────────────────────────────────────────────────────────
    const isMobile = window.innerWidth < 768
    const count = isMobile ? 1500 : 4000

    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    const colorA = new THREE.Color('#00d2ff') // 青色
    const colorB = new THREE.Color('#7b2ff7') // 紫色
    const colorC = new THREE.Color('#c8a96e') // 金色（少量）

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3]     = (Math.random() - 0.5) * 20
      positions[i3 + 1] = (Math.random() - 0.5) * 20
      positions[i3 + 2] = (Math.random() - 0.5) * 10

      const t = Math.random()
      const color = t < 0.6 ? colorA : t < 0.9 ? colorB : colorC
      colors[i3]     = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.03,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    })

    particles = new THREE.Points(geometry, material)
    scene.add(particles)

    isReady.value = true
    animate()
  }

  function animate() {
    animId = requestAnimationFrame(animate)

    // 粒子缓慢旋转
    particles.rotation.y += 0.0003
    particles.rotation.x += 0.0001

    // 鼠标视差
    camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.02
    camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.02
    camera.lookAt(scene.position)

    renderer.render(scene, camera)
  }

  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  function onMouseMove(e: MouseEvent) {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2
  }

  function destroy() {
    cancelAnimationFrame(animId)
    renderer?.dispose()
    window.removeEventListener('resize', onResize)
    window.removeEventListener('mousemove', onMouseMove)
  }

  onMounted(() => {
    init()
    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouseMove)
  })

  onUnmounted(destroy)

  return { isReady }
}
