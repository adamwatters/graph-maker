var Vertex, View, main;

View = (function() {
  function View(canvas_el) {
    this.canvas_el = canvas_el;
    this.vertices = [];
    this.edges = [];
    this.bindEventListeners();
    this.enableAddintVertices();
  }

  View.prototype.enableAddintVertices = function() {
    return this.vertexAdditionStatus = true;
  };

  View.prototype.disableAddingVertices = function() {
    return this.vertexAdditionStatus = false;
  };

  View.prototype.bindEventListeners = function() {
    var $this;
    $this = this;
    return this.canvas_el.click(function(event) {
      var vertex;
      if ($this.vertexAdditionStatus) {
        vertex = new Vertex(event.offsetX, event.offsetY);
        $this.addVertex(vertex);
        return $this.render();
      }
    });
  };

  View.prototype.addVertex = function(vertex) {
    return this.vertices.push(vertex);
  };

  View.prototype.drawVertex = function(vertex) {
    var _mouseOutListener, _mouseOverListener;
    _mouseOverListener = $.proxy(this.mouseOverListener, this);
    _mouseOutListener = $.proxy(this.mouseOutListener, this);
    return $(this.canvas_el).drawArc({
      layer: true,
      draggable: true,
      fillStyle: vertex.color,
      x: vertex.x,
      y: vertex.y,
      radius: 25,
      click: this.clickListener,
      mouseover: _mouseOverListener,
      mouseout: _mouseOutListener
    });
  };

  View.prototype.clickListener = function(layer) {
    return console.log(this, layer);
  };

  View.prototype.mouseOverListener = function(layer) {
    return this.disableAddingVertices();
  };

  View.prototype.mouseOutListener = function(layer) {
    return this.enableAddintVertices();
  };

  View.prototype.render = function() {
    var vertex, _i, _len, _ref, _results;
    _ref = this.vertices;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      vertex = _ref[_i];
      _results.push(this.drawVertex(vertex));
    }
    return _results;
  };

  return View;

})();

Vertex = (function() {
  function Vertex(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    if (this.color == null) {
      this.color = "green";
    }
  }

  return Vertex;

})();

main = function() {
  return window.view = new View($("canvas"));
};

$(document).ready(function() {
  return main();
});

//# sourceMappingURL=app.js.map
