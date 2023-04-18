type Draw = {
    ctx: CanvasRenderingContext2D
}

type Point = { x: number; y: number }
type Line = { origin: Point | null; destination: Point | null, current: Point | null, mouseDown: number }

type Connections = { in1: string, in2: string, out: string }
type LogicObj = {
    name: string, pos: Point, type: string, cons: Connections | False, on: boolean

}