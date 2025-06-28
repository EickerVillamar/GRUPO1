// Animaciones adicionales y efectos interactivos
document.addEventListener("DOMContentLoaded", () => {
  // Efecto de partículas en el cursor
  let mouseX = 0
  let mouseY = 0

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX
    mouseY = e.clientY

    // Crear partícula ocasionalmente
    if (Math.random() < 0.1) {
      createParticle(mouseX, mouseY)
    }
  })

  function createParticle(x, y) {
    const particle = document.createElement("div")
    particle.style.position = "fixed"
    particle.style.left = x + "px"
    particle.style.top = y + "px"
    particle.style.width = "4px"
    particle.style.height = "4px"
    particle.style.background = "#ffd700"
    particle.style.borderRadius = "50%"
    particle.style.pointerEvents = "none"
    particle.style.zIndex = "1000"
    particle.style.opacity = "0.8"

    document.body.appendChild(particle)

    // Animar la partícula
    let opacity = 0.8
    let size = 4
    let posY = y

    const animate = () => {
      opacity -= 0.02
      size -= 0.1
      posY -= 2

      particle.style.opacity = opacity
      particle.style.width = size + "px"
      particle.style.height = size + "px"
      particle.style.top = posY + "px"

      if (opacity > 0 && size > 0) {
        requestAnimationFrame(animate)
      } else {
        if (document.body.contains(particle)) {
          document.body.removeChild(particle)
        }
      }
    }

    requestAnimationFrame(animate)
  }

  // Efecto de hover en las tarjetas
  const memberCards = document.querySelectorAll(".member-card")

  memberCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)"
      this.style.transition = "all 0.3s ease"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // Animación del logo
  const logoIcon = document.querySelector(".logo-icon")
  let rotationAngle = 0

  setInterval(() => {
    rotationAngle += 1
    logoIcon.style.transform = `rotate(${rotationAngle}deg)`
  }, 50)

  // Efecto de escritura para el título
  const logoText = document.querySelector(".logo-text")
  const originalText = logoText.textContent
  logoText.textContent = ""

  let i = 0
  const typeWriter = () => {
    if (i < originalText.length) {
      logoText.textContent += originalText.charAt(i)
      i++
      setTimeout(typeWriter, 150)
    }
  }

  setTimeout(typeWriter, 1000)

  // Efecto de brillo en los iconos sociales
  const socialIcons = document.querySelectorAll(".social-icon")

  socialIcons.forEach((icon, index) => {
    icon.addEventListener("click", function () {
      this.style.animation = "pulse 0.6s ease-in-out"
      setTimeout(() => {
        this.style.animation = ""
      }, 600)
    })

    // Animación automática cada cierto tiempo
    setInterval(
      () => {
        icon.style.transform = "scale(1.2)"
        setTimeout(() => {
          icon.style.transform = "scale(1)"
        }, 200)
      },
      5000 + index * 1000,
    )
  })

  // Parallax suave para elementos flotantes
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const parallaxElements = document.querySelectorAll(".car-icon")

    parallaxElements.forEach((element, index) => {
      const speed = 0.5 + index * 0.1
      element.style.transform = `translateY(${scrolled * speed}px)`
    })
  })

  // Efecto de ondas al hacer clic
  document.addEventListener("click", (e) => {
    const ripple = document.createElement("div")
    ripple.style.position = "fixed"
    ripple.style.left = e.clientX + "px"
    ripple.style.top = e.clientY + "px"
    ripple.style.width = "0px"
    ripple.style.height = "0px"
    ripple.style.border = "2px solid rgba(255, 215, 0, 0.5)"
    ripple.style.borderRadius = "50%"
    ripple.style.pointerEvents = "none"
    ripple.style.zIndex = "1001"

    document.body.appendChild(ripple)

    let size = 0
    const expandRipple = () => {
      size += 5
      ripple.style.width = size + "px"
      ripple.style.height = size + "px"
      ripple.style.left = e.clientX - size / 2 + "px"
      ripple.style.top = e.clientY - size / 2 + "px"
      ripple.style.opacity = 1 - size / 100

      if (size < 100) {
        requestAnimationFrame(expandRipple)
      } else {
        if (document.body.contains(ripple)) {
          document.body.removeChild(ripple)
        }
      }
    }

    requestAnimationFrame(expandRipple)
  })

  // Efecto adicional: Cambio de color de fondo al scroll
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const maxScroll = document.body.scrollHeight - window.innerHeight
    const scrollPercent = scrolled / maxScroll

    // Cambiar gradiente basado en el scroll
    const hue1 = 240 + scrollPercent * 60 // De azul a púrpura
    const hue2 = 260 + scrollPercent * 40 // Variación secundaria

    document.body.style.background = `linear-gradient(135deg, 
            hsl(${hue1}, 70%, 10%) 0%, 
            hsl(${hue2}, 60%, 15%) 50%, 
            hsl(${hue1 + 20}, 65%, 20%) 100%)`
  })

  // Contador de visitantes simulado
  let visitorCount = localStorage.getItem("visitorCount") || 0
  visitorCount++
  localStorage.setItem("visitorCount", visitorCount)

  // Mostrar contador en consola (opcional)
  console.log(`¡Bienvenido! Eres el visitante número ${visitorCount} 🚗`)

  // Efecto de typing en tiempo real para el subtítulo
  const subtitle = document.querySelector(".subtitle")
  const subtitleText = subtitle.textContent
  subtitle.textContent = ""

  setTimeout(() => {
    let j = 0
    const typeSubtitle = () => {
      if (j < subtitleText.length) {
        subtitle.textContent += subtitleText.charAt(j)
        j++
        setTimeout(typeSubtitle, 100)
      }
    }
    typeSubtitle()
  }, 2500)
})

// Función para detectar dispositivos móviles
function isMobile() {
  return window.innerWidth <= 768
}

// Ajustar animaciones para móviles
if (isMobile()) {
  // Reducir la frecuencia de partículas en móviles
  document.addEventListener("touchmove", (e) => {
    if (Math.random() < 0.05) {
      // Menos partículas en móvil
      const touch = e.touches[0]
      createParticle(touch.clientX, touch.clientY)
    }
  })
}

// Función para crear partículas (reutilizable)
function createParticle(x, y) {
  const particle = document.createElement("div")
  particle.style.position = "fixed"
  particle.style.left = x + "px"
  particle.style.top = y + "px"
  particle.style.width = "4px"
  particle.style.height = "4px"
  particle.style.background = "#ffd700"
  particle.style.borderRadius = "50%"
  particle.style.pointerEvents = "none"
  particle.style.zIndex = "1000"
  particle.style.opacity = "0.8"

  document.body.appendChild(particle)

  // Animar la partícula
  let opacity = 0.8
  let size = 4
  let posY = y

  const animate = () => {
    opacity -= 0.02
    size -= 0.1
    posY -= 2

    particle.style.opacity = opacity
    particle.style.width = size + "px"
    particle.style.height = size + "px"
    particle.style.top = posY + "px"

    if (opacity > 0 && size > 0) {
      requestAnimationFrame(animate)
    } else {
      if (document.body.contains(particle)) {
        document.body.removeChild(particle)
      }
    }
  }

  requestAnimationFrame(animate)
}
