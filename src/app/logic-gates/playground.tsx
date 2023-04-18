'use client';
import { useState } from 'react';
import { UseDraw } from './playgroundHook';

function findPoint(name: string, objs: LogicObj[]) {
  var res = objs.find((obj) => {
    return obj.name === name;
  });

  return res;
}
export default function Playground() {
  const [logicObjs, setlogicObjs] = useState<LogicObj[]>([
    { name: 'A', pos: { x: 100, y: 100 }, on: true, type: 'in', cons: false },
    { name: 'B', pos: { x: 100, y: 200 }, on: true, type: 'in', cons: false },
    { name: 'X', pos: { x: 1000, y: 200 }, on: false, type: 'out', cons: false },
    { name: '1', type: 'and', cons: { in1: 'A', in2: 'B', out: 'X' }, pos: { x: 200, y: 50 }, on: false },
    { name: '9', type: 'and', cons: { in1: '1', in2: 'B', out: 'X' }, pos: { x: 260, y: 90 }, on: false },
    { name: '2', type: 'not', cons: { in1: 'A', in2: 'B', out: 'X' }, pos: { x: 210, y: 150 }, on: false },
    { name: '3', type: 'nand', cons: { in1: 'A', in2: 'B', out: 'X' }, pos: { x: 220, y: 200 }, on: false },
    { name: '4', type: 'or', cons: { in1: 'A', in2: 'B', out: 'X' }, pos: { x: 230, y: 250 }, on: false },
    { name: '5', type: 'nor', cons: { in1: 'A', in2: 'B', out: 'X' }, pos: { x: 240, y: 350 }, on: false },
    { name: '6', type: 'xor', cons: { in1: 'A', in2: 'B', out: 'X' }, pos: { x: 250, y: 400 }, on: false },
    { name: '7', type: 'xnor', cons: { in1: 'A', in2: 'B', out: 'X' }, pos: { x: 260, y: 450 }, on: false },
  ]);

  function draw({ ctx }: Draw) {
    console.log('drawing');
    const canvas = canvasRef.current!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    logicObjs.forEach((logicObj) => {
      if (logicObj.type === 'in' || logicObj.type == 'out') {
        // points
        ctx.beginPath();
        if (logicObj.type === 'in') {
          ctx.arc(logicObj.pos.x + 10, logicObj.pos.y + 10, 10, 0, 2 * Math.PI);
        } else {
          ctx.arc(logicObj.pos.x + 30, logicObj.pos.y + 10, 10, 0, 2 * Math.PI);
        }
        if (logicObj.on) {
          ctx.fillStyle = '#111';
          ctx.fill();
        } else {
          ctx.stroke();
        }
        ctx.font = '20px Arial';
        ctx.fillStyle = 'black';
        if (logicObj.type === 'in') {
          ctx.fillText(logicObj.name, logicObj.pos.x - 20, logicObj.pos.y);
        } else {
          ctx.fillText(logicObj.name, logicObj.pos.x + 40, logicObj.pos.y);
        }
      } else {
        // drawing lines
        [
          { type: logicObj.cons.in1, cornerdiff: 0, xdiff: 0, ydiff: -5 },
          { type: logicObj.cons.in2, cornerdiff: 20, xdiff: 0, ydiff: 5 },
          { type: logicObj.cons.out, cornerdiff: 0, xdiff: 20, ydiff: 0 },
        ].forEach(({ type, cornerdiff, xdiff, ydiff }) => {
          var point = findPoint(type, logicObjs)!;
          ctx.moveTo(point.pos.x + 20, point.pos.y + 10); // move to point
          ctx.lineTo(point.pos.x + cornerdiff + (logicObj.pos.x - point.pos.x) / 2, point.pos.y + 10); // from point
          ctx.lineTo(point.pos.x + cornerdiff + (logicObj.pos.x - point.pos.x) / 2, logicObj.pos.y + 10 + ydiff); // to vertical line
          ctx.lineTo(logicObj.pos.x + xdiff, logicObj.pos.y + 10 + ydiff); // to gate
          ctx.stroke();
        });
        //  drawinggates
        ctx.moveTo(logicObj.pos.x, logicObj.pos.y);

        if (logicObj.type === 'and') {
          ctx.lineTo(logicObj.pos.x + 10, logicObj.pos.y);
          ctx.arc(logicObj.pos.x + 10, logicObj.pos.y + 10, 10, 1.5 * Math.PI, 0.5 * Math.PI);
          ctx.lineTo(logicObj.pos.x, logicObj.pos.y + 20);
          ctx.lineTo(logicObj.pos.x, logicObj.pos.y);
        } else if (logicObj.type === 'not') {
          ctx.moveTo(logicObj.pos.x, logicObj.pos.y);
          ctx.lineTo(logicObj.pos.x + 20, logicObj.pos.y + 10);
          ctx.arc(logicObj.pos.x + 20, logicObj.pos.y + 10, 4, 1 * Math.PI, 0.9 * Math.PI);
          ctx.lineTo(logicObj.pos.x, logicObj.pos.y + 20);
          ctx.lineTo(logicObj.pos.x, logicObj.pos.y);
        } else if (logicObj.type === 'nand') {
          ctx.lineTo(logicObj.pos.x + 10, logicObj.pos.y);
          ctx.arc(logicObj.pos.x + 10, logicObj.pos.y + 10, 10, 1.5 * Math.PI, 0);
          ctx.arc(logicObj.pos.x + 23, logicObj.pos.y + 10, 4, 1 * Math.PI, 0.9 * Math.PI);
          ctx.arc(logicObj.pos.x + 10, logicObj.pos.y + 10, 10, 0, 0.5 * Math.PI);
          ctx.lineTo(logicObj.pos.x, logicObj.pos.y + 20);
          ctx.lineTo(logicObj.pos.x, logicObj.pos.y);
        } else if (logicObj.type === 'or') {
          ctx.moveTo(logicObj.pos.x - 8, logicObj.pos.y);
          ctx.lineTo(logicObj.pos.x + 10, logicObj.pos.y);
          ctx.arc(logicObj.pos.x + 10, logicObj.pos.y + 10, 10, 1.5 * Math.PI, 0.5 * Math.PI);
          ctx.lineTo(logicObj.pos.x - 8, logicObj.pos.y + 20);
          ctx.moveTo(logicObj.pos.x - 8, logicObj.pos.y);
          ctx.arc(logicObj.pos.x - 8, logicObj.pos.y + 10, 10, 1.5 * Math.PI, 0.5 * Math.PI);
        } else if (logicObj.type === 'nor') {
          ctx.moveTo(logicObj.pos.x - 8, logicObj.pos.y);
          ctx.lineTo(logicObj.pos.x + 10, logicObj.pos.y);
          ctx.arc(logicObj.pos.x + 10, logicObj.pos.y + 10, 10, 1.5 * Math.PI, 0);
          ctx.arc(logicObj.pos.x + 23, logicObj.pos.y + 10, 4, 1 * Math.PI, 0.9 * Math.PI);
          ctx.arc(logicObj.pos.x + 10, logicObj.pos.y + 10, 10, 0, 0.5 * Math.PI);
          ctx.lineTo(logicObj.pos.x - 8, logicObj.pos.y + 20);
          ctx.moveTo(logicObj.pos.x - 8, logicObj.pos.y);
          ctx.arc(logicObj.pos.x - 8, logicObj.pos.y + 10, 10, 1.5 * Math.PI, 0.5 * Math.PI);
        } else if (logicObj.type === 'xor') {
          ctx.moveTo(logicObj.pos.x - 8, logicObj.pos.y);
          ctx.lineTo(logicObj.pos.x + 10, logicObj.pos.y);
          ctx.arc(logicObj.pos.x + 10, logicObj.pos.y + 10, 10, 1.5 * Math.PI, 0.5 * Math.PI);
          ctx.lineTo(logicObj.pos.x - 8, logicObj.pos.y + 20);
          ctx.moveTo(logicObj.pos.x - 8, logicObj.pos.y);
          ctx.arc(logicObj.pos.x - 8, logicObj.pos.y + 10, 10, 1.5 * Math.PI, 0.5 * Math.PI);
          ctx.moveTo(logicObj.pos.x - 13, logicObj.pos.y);
          ctx.arc(logicObj.pos.x - 13, logicObj.pos.y + 10, 10, 1.5 * Math.PI, 0.5 * Math.PI);
        } else if (logicObj.type === 'xnor') {
          ctx.moveTo(logicObj.pos.x - 8, logicObj.pos.y);
          ctx.lineTo(logicObj.pos.x + 10, logicObj.pos.y);
          ctx.arc(logicObj.pos.x + 10, logicObj.pos.y + 10, 10, 1.5 * Math.PI, 0);
          ctx.arc(logicObj.pos.x + 23, logicObj.pos.y + 10, 4, 1 * Math.PI, 0.9 * Math.PI);
          ctx.arc(logicObj.pos.x + 10, logicObj.pos.y + 10, 10, 0, 0.5 * Math.PI);
          ctx.lineTo(logicObj.pos.x - 8, logicObj.pos.y + 20);
          ctx.moveTo(logicObj.pos.x - 8, logicObj.pos.y);
          ctx.arc(logicObj.pos.x - 8, logicObj.pos.y + 10, 10, 1.5 * Math.PI, 0.5 * Math.PI);
          ctx.moveTo(logicObj.pos.x - 13, logicObj.pos.y);
          ctx.arc(logicObj.pos.x - 13, logicObj.pos.y + 10, 10, 1.5 * Math.PI, 0.5 * Math.PI);
        }
        ctx.stroke();
      }
    });
  }
  function update({ origin, destination, current, mouseDown }: Line) {
    canvasRef.current!.oncontextmenu = function (e) {
      e.preventDefault();
    };
    if (origin === null && destination === null && current !== null) {
      console.log('click', mouseDown);
      // click
      logicObjs.forEach(function (part, index, arr) {
        let obj = arr[index];
        if (obj.type === 'in') {
          let dist = Math.sqrt(Math.pow(current.x - obj.pos.x - 10, 2) + Math.pow(current.y - obj.pos.y - 10, 2));
          //   console.log(' name distance', obj.name, dist, obj.on);
          if (dist < 20) {
            if (mouseDown == 1) {
              obj.on = !obj.on;
            } else if (mouseDown == 2) {
            }
          }
        }
        arr[index] = obj;
      });
      //   console.log('mouse click', destination, current);
    } else if (origin !== null && current !== null) {
      console.log('drag');
      // drag
      //   console.log('drag', origin, destination);
      logicObjs.forEach(function (part, index, arr) {
        let obj = arr[index];
        // if (obj.type === 'in' || obj.type == 'out') {
        let dist = Math.sqrt(Math.pow(origin.x - obj.pos.x, 2) + Math.pow(origin.y - obj.pos.y, 2));
        if (dist < 15) {
          console.log(' name distance', obj.name, dist, obj.on);
          obj.pos = current;
        }
        // }
        arr[index] = obj;
      });
    }
  }

  const { canvasRef, onMouseDown } = UseDraw(draw, update);

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={onMouseDown}
      width={1200}
      height={600}
      className="border border-slate500"
      contextMenu="return false;"
    ></canvas>
  );
}
