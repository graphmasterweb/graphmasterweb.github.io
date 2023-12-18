// actions/text.js

import help from './../help.js';
import interaction from './../interaction.js';
import snap from './../snap.js';
import canvas from './../canvas.js';
import drawing from './../drawing.js';
import mouse from './../mouse.js';
import tool from './../tool.js';
import colors from './../colors.js';

window.addEventListener("load", function() {
  document.getElementById("text-input").addEventListener("keyup", function() {
    tool.change(new Text());
  });

  if (document.fonts) {
    document.fonts.ready.then(function() {
      drawing.refresh();
    });
  }
});

export default function Text() {
  help(interaction.text + " to place text");

  this.points = 0;
  this.coords = {};
  this.coords.type = "text";
  this.coords.text = document.getElementById("text-input").value;

  this.click = function(x, y) {
    if (this.coords.text !== '') {
      this.save();
      this.reset();
    }
  };

  this.reset = function() {
    tool.change(new Text());
    drawing.refresh();
    tool.move(mouse.x, mouse.y);
  };

  this.move = function(x, y) {
    var snapped = snap(x, y);
    this.coords.x = snapped.x;
    this.coords.y = snapped.y;

    canvas.f.beginPath();
    canvas.f.arc(snapped.x, snapped.y, 2.5, 0, 2 * Math.PI, true);
    canvas.f.fill();

    canvas.f.font = '18px "Routed Gothic"';
    canvas.f.fillStyle = colors.preview;
    canvas.f.fillText(this.coords.text, this.coords.x, this.coords.y - 1);
  };

  this.save = function() {
    var selectedColor = document.getElementById('line_color').value;
    if (selectedColor) {
      this.coords.color = selectedColor;
    }
    drawing.addItem(this.coords);
    mouse.hide();
  };
}