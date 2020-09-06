const picturesArr = Array.from(
  Array(36),
  (_, i) =>
    `https://raw.githubusercontent.com/eugeneZolotarenko/hot-hatches/master/public/assets/Mercedes-Benz/A45%20S%20AMG/360/${
      i + 1
    }.jpg`
)
const picturesContainer = document.querySelector(".viewer-wrapper")

function getImageMeta(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject()
    img.src = url
  })
}

const setActivePicture = (i) =>
  document
    .querySelectorAll(".viewer-item")
    .forEach((item) =>
      item.id !== `viewer-item-${i}`
        ? item.classList.remove("active")
        : item.classList.add("active")
    )

picturesArr.map(async (picture, i) => {
  const figure = document.createElement("figure")
  figure.style.backgroundImage = `url('${picture}')`
  figure.className = "viewer-item"
  figure.id = `viewer-item-${i + 1}`
  const img = await getImageMeta(picture)
  picturesContainer.style.width = `${window.innerWidth * 0.7}px`
  picturesContainer.style.height = `${
    window.innerWidth / (img.width / img.height)
  }px`
  picturesContainer.appendChild(figure)
  setActivePicture(1)
})

const state = {
  isActive: false,
  x: 0,
  currentImage: 1,
  //   viewPoints: [
  //     [1, 9],
  //     [9, 18],
  //     [18, 27],
  //     [27, 36],
  //   ],
  //   currentView: 1,
  views: 3,
  picturesIntervalMs: 40,
}

function startRotate(e, pos) {
  e.preventDefault()
  state.isActive = true
  state.x = pos
}

function rotate(e, pos) {
  e.preventDefault()
  if (state.isActive === true) {
    if (state.x - 10 > pos) {
      state.currentImage++
      if (state.currentImage > picturesArr.length) {
        state.currentImage = 1
      }
      setActivePicture(state.currentImage)
      state.x = pos
    } else if (state.x + 10 < pos) {
      state.currentImage--
      if (state.currentImage < 1) {
        state.currentImage = picturesArr.length
      }
      setActivePicture(state.currentImage)
      state.x = pos
    }
  }
}

function finishRotate() {
  if (state.isActive === true) {
    state.isActive = false
    x = 0
  }
}

picturesContainer.addEventListener("mousedown", (e) =>
  startRotate(e, e.offsetX)
)
picturesContainer.addEventListener("touchstart", (e) => {
  startRotate(e, e.touches[0].clientX)
})

picturesContainer.addEventListener("mousemove", (e) => rotate(e, e.offsetX))
picturesContainer.addEventListener("touchmove", (e) => {
  rotate(e, e.touches[0].clientX)
})

picturesContainer.addEventListener("mouseup", () => finishRotate())
picturesContainer.addEventListener("touchend", () => finishRotate())
picturesContainer.addEventListener("mouseleave", () => finishRotate())

// Rotate by buttons

const toLeftBtn = document.querySelector("#rotate-to-left")
const toRightBtn = document.querySelector("#rotate-to-right")

toRightBtn.addEventListener("click", (e) => {
  //   state.currentView++
  //   if (state.currentView > state.viewPoints.length) {
  //     state.currentView = 1
  //   }
  //   console.log(state.currentView)
  e.target.disabled = true
  const rotation = setInterval(() => {
    state.currentImage++
    if (state.currentImage > picturesArr.length) {
      state.currentImage = 1
    }
    setActivePicture(state.currentImage)
  }, state.picturesIntervalMs)

  setTimeout(() => {
    e.target.disabled = false
    clearInterval(rotation)
  }, (state.picturesIntervalMs * picturesArr.length) / state.views)
})

toLeftBtn.addEventListener("click", (e) => {
  //   state.currentView--
  //   if (state.currentView < 1) {
  //     state.currentView = state.viewPoints.length
  //   }
  //   console.log(state.currentView)
  e.target.disabled = true
  const rotation = setInterval(() => {
    state.currentImage--
    if (state.currentImage < 1) {
      state.currentImage = picturesArr.length
    }
    setActivePicture(state.currentImage)
  }, state.picturesIntervalMs)

  setTimeout(() => {
    e.target.disabled = false
    clearInterval(rotation)
  }, (state.picturesIntervalMs * picturesArr.length) / state.views)
})

// End Rotate by buttons
