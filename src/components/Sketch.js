export default function sketch (p) {
  let socket;
  p.setup = function () {
    p.createCanvas(670, 600);
    p.background(250);
    socket.on('DRAWING', function(data) {
        p.strokeWeight(10);
        p.line(data.mouseX, data.mouseY, data.pmouseX, data.pmouseY);        
    });
  };

  p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    if (props.socket){
     socket = props.socket;
    }
  };

  p.draw = function() {

  };

  p.mouseDragged = function() {

    p.strokeWeight(10);
    p.line(p.mouseX, p.mouseY, p.pmouseX, p.pmouseY);

    socket.emit('DRAWING', {
      mouseX  : p.mouseX,
      mouseY: p.mouseY,
      pmouseX: p.pmouseX,
      pmouseY: p.pmouseY
    });

  };



}
