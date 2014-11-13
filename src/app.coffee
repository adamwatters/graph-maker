class View
  constructor: (@canvas_el) ->
    @vertices = []
    @edges = []
    @bindEventListeners()
    @enableAddintVertices()

  enableAddintVertices: () ->
    @vertexAdditionStatus = true

  disableAddingVertices: () ->
    @vertexAdditionStatus = false

  bindEventListeners: () ->
    $this = @
    @canvas_el.click (event) ->
      if $this.vertexAdditionStatus
        vertex = new Vertex(event.offsetX, event.offsetY)
        $this.addVertex(vertex)
        $this.render()

  addVertex: (vertex) ->
    @vertices.push(vertex)

  drawVertex: (vertex) ->
    _mouseOverListener = $.proxy(@mouseOverListener, @)
    _mouseOutListener = $.proxy(@mouseOutListener, @)
    $(@canvas_el).drawArc({
      layer: true
      draggable: true
      fillStyle: vertex.color
      x: vertex.x
      y: vertex.y
      radius: 25
      click: @clickListener
      mouseover: _mouseOverListener
      mouseout: _mouseOutListener
    })

  clickListener: (layer) ->
    console.log @, layer

  mouseOverListener: (layer) ->
    @disableAddingVertices()

  mouseOutListener: (layer) ->
    @enableAddintVertices()

  render: () ->
    for vertex in @vertices
      @drawVertex(vertex)

class Vertex
  constructor: (@x, @y, @color) ->
    if not @color?
      @color = "green"

main = () ->
  window.view = new View($("canvas"))

$(document).ready () ->
  main()