import React, { Component } from "react";
import "./RollLog.css";

class RollLog extends Component {
  componentDidMount() {
    var mydragg = (function() {
      console.log('drag fool!!')
      return {
        move: function(divid, xpos, ypos) {
          divid.style.left = xpos + "px";
          divid.style.top = ypos + "px";
        },
        startMoving: function(divid, container, evt) {
          evt = evt || window.event;
          var posX = evt.clientX,
            posY = evt.clientY,
            divTop = divid.style.top,
            divLeft = divid.style.left,
            eWi = parseInt(divid.style.width),
            eHe = parseInt(divid.style.height),
            cWi = parseInt(document.getElementById(container).style.width),
            cHe = parseInt(document.getElementById(container).style.height);
          document.getElementById(container).style.cursor = "move";
          divTop = divTop.replace("px", "");
          divLeft = divLeft.replace("px", "");
          var diffX = posX - divLeft,
            diffY = posY - divTop;
          document.onmousemove = function(evt) {
            evt = evt || window.event;
            var posX = evt.clientX,
              posY = evt.clientY,
              aX = posX - diffX,
              aY = posY - diffY;
            if (aX < 0) aX = 0;
            if (aY < 0) aY = 0;
            if (aX + eWi > cWi) aX = cWi - eWi;
            if (aY + eHe > cHe) aY = cHe - eHe;
            mydragg.move(divid, aX, aY);
          };
        },
        stopMoving: function(container) {
          var a = document.createElement("script");
          document.getElementById(container).style.cursor = "default";
          document.onmousemove = function() {};
        }
      };
    })();
  }

  render() {
    return (

      <div id='container'>
			<div id="elem" onmousedown='mydragg.startMoving(this,"container",event);' onmouseup='mydragg.stopMoving("container");'>
        <h2 class="header">Roll Log:</h2>
        {this.props.rolls.map((roll, idx) => (
          <p key={`roll-${idx}`}>{roll}</p>
        ))}
      </div>
      </div>

    );
  }
}

export default RollLog;
