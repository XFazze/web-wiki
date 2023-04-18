'use client';
import React from 'react';
import Playground from './playground';

export default function Home() {
  const [hiddenCheatSheet, setHiddenCheatSheet] = React.useState('');

  function toggleCheatSheet() {
    console.log('toggle cheat sheet');
    if (hiddenCheatSheet === 'hidden') {
      setHiddenCheatSheet('');
    } else {
      setHiddenCheatSheet('hidden');
    }
  }

  return (
    <main className="flex min-h-screen flex-col gap-8 p-24 bg-slate-300">
      <h1 className="text-2xl">Logic Gates</h1>
      <div>
        <h2 className="text-xl " onClick={toggleCheatSheet}>
          Cheatsheet{hiddenCheatSheet}
        </h2>

        <table className={`table-auto order-spacing-2 ${hiddenCheatSheet}`}>
          <thead>
            <tr>
              <td className=" border-seperate  border  border-slate-500 p-2">A</td>
              <td className=" border-seperate  border  border-slate-500 p-2">B</td>
              <td className=" border-seperate  border  border-slate-500 p-2">AND</td>
              <td className=" border-seperate  border  border-slate-500 p-2">NAND</td>
              <td className=" border-seperate  border  border-slate-500 p-2">OR</td>
              <td className=" border-seperate  border  border-slate-500 p-2">NOR</td>
              <td className=" border-seperate  border  border-slate-500 p-2">XOR</td>
              <td className=" border-seperate  border  border-slate-500 p-2">XNOR</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className=" border-seperate  border  border-slate-500 p-2">0</td>
              <td className=" border-seperate  border  border-slate-500 p-2">0</td>
              <td rowSpan={3} className=" border-seperate  border  border-slate-500 p-2">
                0
              </td>
              <td rowSpan={3} className=" border-seperate  border  border-slate-500 p-2">
                1
              </td>
              <td className=" border-seperate  border  border-slate-500 p-2">0</td>
              <td className=" border-seperate  border  border-slate-500 p-2">1</td>
              <td className=" border-seperate  border  border-slate-500 p-2">0</td>
              <td className=" border-seperate  border  border-slate-500 p-2">1</td>
            </tr>
            <tr>
              <td className=" border-seperate  border  border-slate-500 p-2">0</td>
              <td className=" border-seperate  border  border-slate-500 p-2">1</td>
              <td rowSpan={3} className=" border-seperate  border  border-slate-500 p-2">
                1
              </td>
              <td rowSpan={3} className=" border-seperate  border  border-slate-500 p-2">
                0
              </td>
              <td rowSpan={2} className=" border-seperate  border  border-slate-500 p-2">
                1
              </td>
              <td rowSpan={2} className=" border-seperate  border  border-slate-500 p-2">
                0
              </td>
            </tr>
            <tr>
              <td className=" border-seperate  border  border-slate-500 p-2">1</td>
              <td className=" border-seperate  border  border-slate-500 p-2">0</td>
            </tr>
            <tr>
              <td className=" border-seperate  border  border-slate-500 p-2">1</td>
              <td className=" border-seperate  border  border-slate-500 p-2">1</td>
              <td className=" border-seperate  border  border-slate-500 p-2">1</td>
              <td className=" border-seperate  border  border-slate-500 p-2">0</td>
              <td className=" border-seperate  border  border-slate-500 p-2">0</td>
              <td className=" border-seperate  border  border-slate-500 p-2">1</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h2 className="text-2xl">Playground</h2>
        <Playground />
      </div>
    </main>
  );
}
