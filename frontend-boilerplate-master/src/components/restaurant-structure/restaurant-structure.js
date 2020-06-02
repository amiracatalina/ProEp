class CreateStructure {

  constructor(element) {
    this._element = element
    this._ready()
    this._download()
    document.addEventListener('DOMContentLoaded', this._ready)
    document.getElementById('download').addEventListener('click', this._download)
  }

  _ready() {
    console.log('hrere')
    const target = document.querySelector('.target'),
      sources = document.querySelectorAll('#source > div')

    const canvas = document.getElementById('canvas'),
      ctx = canvas.getContext('2d')

    const RECT_COLOR = 'rgba(59, 105, 215, .8)',
      RECT_COLOR_4 = 'rgba(215, 107, 123, 0.8)',
      RECT_COLOR_6 = 'rgba(87, 215, 46, 0.8)',
      RECT_WIDTH = 50,
      RECT_HEIGHT = 50,
      CIRCLE_COLOR = 'rgba(247, 36, 55, .8)',
      CIRCLE_RADIUS = 25

    const canvasBounding = canvas.getBoundingClientRect(),
      canvasX = canvasBounding.left,
      canvasY = canvasBounding.top,
      canvasW = canvas.width,
      canvasH = canvas.height

    const canvasShapes = []

    let dragging = false,
      dropAllowed = false,
      lastMouseCanvasX = 0,
      lastMouseCanvasY = 0

    function drawRect(params) {
      const p = params || {},
        id = p.id,
        color = params.color,
        x = p.x || 0,
        y = p.y || 0,
        w = p.w || RECT_WIDTH,
        h = p.h || RECT_HEIGHT

      ctx.textAlign = 'left';
      ctx.textBaseline = 'bottom';
      ctx.fillStyle = (params && params.color)
      ctx.fillText(id, x, y)
      ctx.fillRect(x, y, w, h)
    }

    function drawCircle(params) {
      const p = params || {},
        id = p.id,
        x = p.x || CIRCLE_RADIUS,
        y = p.y || CIRCLE_RADIUS,
        r = p.r || CIRCLE_RADIUS,
        startAngle = p.startAngle || 0,
        endAngle = p.endAngle || Math.PI * 2,
        color = "#ffffff",
        anticlockwise = p.anticlockwise || false

      ctx.fillStyle = (params && params.color) || CIRCLE_COLOR
      ctx.fillText(id, x, y)
      ctx.beginPath()
      ctx.arc(x, y, r, startAngle, endAngle, anticlockwise)
      ctx.fill()
    }

    function clearCanvas() {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.beginPath();
    }

    function drawShapes(shapesArr) {
      clearCanvas()

      for (let i = 0; i < canvasShapes.length; i++) {
        const shape = canvasShapes[i]

        if (shape.type === 'rect') {
          drawRect({
            id: i,
            color: RECT_COLOR,
            x: parseInt(shape.centerX - RECT_WIDTH / 2),
            y: parseInt(shape.centerY - RECT_HEIGHT / 2)
          })
        }

        if (shape.type === 'rect1') {
          drawRect({
            id: i,
            color: RECT_COLOR_4,
            x: parseInt(shape.centerX - RECT_WIDTH / 2),
            y: parseInt(shape.centerY - RECT_HEIGHT / 2)
          })
        }

        if (shape.type === 'rect2') {
          drawRect({
            id: i,
            color: RECT_COLOR_6,
            x: parseInt(shape.centerX - RECT_WIDTH / 2),
            y: parseInt(shape.centerY - RECT_HEIGHT / 2)
          })
        }

        if (shape.type === 'circle') {
          drawCircle({
            id:i,
            x: parseInt(shape.centerX),
            y: parseInt(shape.centerY)
          })
        }
      }
    }

    //set event listeners on sources
    for (let i = 0; i < sources.length; i++) {
      sources[i].addEventListener('dragstart', function(e) {
        dragging = true

        const shiftX = parseInt(
          e.target.getBoundingClientRect().right - e.clientX
        )
        const shiftY = parseInt(e.target.getBoundingClientRect().top - e.clientY)

        let sourceType = 'rect'

        if (e.target.classList.contains('circle')) {
          sourceType = 'circle'
        }
        if (e.target.classList.contains('rect1')) {
          sourceType = 'rect1'
        }
        if (e.target.classList.contains('rect2')) {
          sourceType = 'rect2'
        }
        e.dataTransfer.setData('type', sourceType)
        e.dataTransfer.setData('shiftX', shiftX)
        e.dataTransfer.setData('shiftY', shiftY)
      })

      sources[i].addEventListener('dragend', function(e) {
        dragging = false
      })
    }

    //set event listeners on target
    target.addEventListener('dragenter', function(e) {
      e.preventDefault()
      dropAllowed = true
    })

    target.addEventListener('dragleave', function(e) {
      e.preventDefault()
      dropAllowed = false
    })

    target.addEventListener('dragover', function(e) {
      e.preventDefault()
    })

    target.addEventListener('dragend', function(e) {
      e.preventDefault()
      dragging = false
      dropAllowed = false
    })

    target.addEventListener('drop', function(e) {
      e.preventDefault()

      const sourceType = e.dataTransfer.getData('type'),
        shiftX = parseInt(e.dataTransfer.getData('shiftX')),
        shiftY = parseInt(e.dataTransfer.getData('shiftY'))

      if (sourceType === 'rect') {
        canvasShapes.push({
          type: 'rect',
          centerX: parseInt(e.clientX - canvasX + shiftX + RECT_WIDTH / 2),
          centerY: parseInt(e.clientY - canvasY + shiftY + RECT_HEIGHT / 2),
          dragging: false
        })

        drawShapes()
      }

      if (sourceType === 'rect1') {
        canvasShapes.push({
          type: 'rect1',
          centerX: parseInt(e.clientX - canvasX + shiftX + RECT_WIDTH / 2),
          centerY: parseInt(e.clientY - canvasY + shiftY + RECT_HEIGHT / 2),
          dragging: false
        })

        drawShapes()
      }

      if (sourceType === 'rect2') {
        canvasShapes.push({
          type: 'rect2',
          centerX: parseInt(e.clientX - canvasX + shiftX + RECT_WIDTH / 2),
          centerY: parseInt(e.clientY - canvasY + shiftY + RECT_HEIGHT / 2),
          dragging: false
        })

        drawShapes()
      }

      if (sourceType === 'circle') {
        canvasShapes.push({
          type: 'circle',
          centerX: parseInt(e.clientX - canvasX + shiftX + CIRCLE_RADIUS),
          centerY: parseInt(e.clientY - canvasY + shiftY + CIRCLE_RADIUS),
          dragging: false
        })

        drawShapes()
      }
    })

    // Drag and Drop on canvas
    target.addEventListener('mousedown', function(e) {
      e.preventDefault()
      e.stopPropagation()

      const mdCanvasX = parseInt(e.clientX - canvasX),
        mdCanvasY = parseInt(e.clientY - canvasY)

      // check if clicked on shape
      for (let i = 0; i < canvasShapes.length; i++) {
        const shape = canvasShapes[i]

        //check if canvas rect clicked
        if (shape.type === 'rect') {
          if (
            Math.abs(mdCanvasX - shape.centerX) < RECT_WIDTH / 2 &&
            Math.abs(mdCanvasY - shape.centerY) < RECT_HEIGHT / 2
          ) {
            shape.dragging = true
            dragging = true
          }
        }

        if (shape.type === 'rect1') {
          if (
            Math.abs(mdCanvasX - shape.centerX) < RECT_WIDTH / 2 &&
            Math.abs(mdCanvasY - shape.centerY) < RECT_HEIGHT / 2
          ) {
            shape.dragging = true
            dragging = true
          }
        }

        if (shape.type === 'rect2') {
          if (
            Math.abs(mdCanvasX - shape.centerX) < RECT_WIDTH / 2 &&
            Math.abs(mdCanvasY - shape.centerY) < RECT_HEIGHT / 2
          ) {
            shape.dragging = true
            dragging = true
          }
        }

        //check if canvas circle clicked
        if (shape.type === 'circle') {
          if (
            Math.sqrt(
              Math.pow(Math.abs(mdCanvasX - shape.centerX), 2) +
              Math.pow(Math.abs(mdCanvasY - shape.centerY), 2)
            ) < CIRCLE_RADIUS
          ) {
            shape.dragging = true
            dragging = true
          }
        }
      }

      lastMouseCanvasX = mdCanvasX
      lastMouseCanvasY = mdCanvasY
    })

    target.addEventListener('mousemove', function(e) {
      if (dragging) {
        e.preventDefault()
        e.stopPropagation()

        const mouseCanvasX = parseInt(e.clientX - canvasX),
          mouseCanvasY = parseInt(e.clientY - canvasY),
          mouseChangeX = mouseCanvasX - lastMouseCanvasX,
          mouseChangeY = mouseCanvasY - lastMouseCanvasY

        for (let i = 0; i < canvasShapes.length; i++) {
          const shape = canvasShapes[i]

          if (shape.dragging) {
            shape.centerX += mouseChangeX
            shape.centerY += mouseChangeY
          }
        }

        lastMouseCanvasX = mouseCanvasX
        lastMouseCanvasY = mouseCanvasY

        drawShapes()
      }
    })

    target.addEventListener('mouseup', function(e) {
     // e.preventDefault()
      e.stopPropagation()

      dragging = false

      for (let i = 0; i < canvasShapes.length; i++) {
        canvasShapes[i].dragging = false
      }
    })

    // const buttonClear = document.getElementById('clearCanvas')
    // buttonClear.addEventListener('click', clearCanvas)

  }

  _download() {
    var download = document.getElementById('download')
    var image = document.getElementById('canvas').toDataURL('image/png')
      .replace('image/png', 'image/octet-stream')
    download.setAttribute('href', image)
  }
}

export default CreateStructure
