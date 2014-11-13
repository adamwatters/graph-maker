$(document).ready () ->
  console.log "Hello world"

  $("canvas").drawArc({
    draggable: true
    fillStyle: "green"
    x: 100
    y: 100
    radius: 50
  })