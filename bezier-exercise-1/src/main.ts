import { 
    Point2, 
    BezierPath2, 
    BezierCurve2
} from './geometry'

import { 
    Point2Draw,
    BezierPath2Draw,
} from './graphics'

/** Context parameters */
let width = 1280
let height = 720
let canvas: HTMLCanvasElement
let context: CanvasRenderingContext2D

/** Graphical objects */
let controlPointToEdit: Point2 | null
let controlPoints: Point2Draw[] = []
const bezierPath: BezierPath2 = new BezierPath2
let bezierPathDraw: BezierPath2Draw = new BezierPath2Draw(bezierPath)

/** State constants */
enum STATE {
    ADD,
    EDIT
}
let HIGHLIGHTED: number = 0
let CURRENT_ACTION: STATE = STATE.ADD

/** Auxiliary functions */
function gameLoop() {
    requestAnimationFrame(gameLoop)
    context.fillStyle = "white"
    context.strokeStyle = "black"
    context.fillRect(0, 0, width, height)
    context.strokeRect(0, 0, width, height)

    controlPoints.forEach((point: Point2Draw) => {
        point.draw(context)
    })

    bezierPathDraw.draw(context, HIGHLIGHTED)
}

function controlPointClicked(x: number, y: number): Point2 | null {
    if (bezierPathDraw.bezierPath.length === 0) {
        return null
    }
    const bezierCurve = bezierPathDraw.bezierPath.getSegment(HIGHLIGHTED)
    return bezierCurve.getControlPoint(x, y)
}

function eventListeners() {

    canvas.onmousedown = (ev: MouseEvent) => {
        const {x, y, button} = ev
        if (button === 0 ) { // left click
    
            // Check control points edition
            controlPointToEdit = controlPointClicked(x, y)
            
            if (controlPointToEdit !== null) {
                CURRENT_ACTION = STATE.EDIT
            }
        }
    }
    
    canvas.onmousemove = (ev: MouseEvent) => {
        if (controlPointToEdit === null) return 
        const {x, y} = ev
        if (CURRENT_ACTION === STATE.EDIT) {
            controlPointToEdit.position.x = x
            controlPointToEdit.position.y = y
        }
    
    }
    
    canvas.onmouseup = (ev: MouseEvent) => {
        // Early skip
        if (CURRENT_ACTION === STATE.EDIT){
            CURRENT_ACTION = STATE.ADD
    
            const bezierCurve = bezierPath.getSegment(HIGHLIGHTED).controlPoints
            bezierCurve.forEach(p => {
                console.log(p)
            })
    
            return
        }
        
        // Add always the new control point
        const {x, y, button} = ev
        const p = new Point2(x, y)
        controlPoints.push(
            new Point2Draw(p)
        )
        
        if (button === 2 ) { // right click
            const points = controlPoints.map((point: Point2Draw) => point.point2)
    
            try {
                const bezierCurve = new BezierCurve2(points)
                bezierPath.addCurve(bezierCurve)
                bezierPathDraw = new BezierPath2Draw(bezierPath)
                controlPoints = controlPoints.slice(-1)
            } catch (e) {
                if (e instanceof Error) {
                    // Get the initial control point
                    controlPoints = [controlPoints[0]]
                    console.log(e.message)
                }
            }
        }
    }
    
    window.onkeyup = (ev: KeyboardEvent) => {
        switch (ev.key) {
            case "ArrowLeft":
                HIGHLIGHTED -= 1
                break
            case "ArrowRight":
                HIGHLIGHTED += 1
                break
            case " ":
                bezierPathDraw.bezierPath.getSegment(HIGHLIGHTED).straight()
                break
        }
    
        const nCurves = bezierPath.length
        HIGHLIGHTED = (HIGHLIGHTED % nCurves + nCurves) % nCurves
    
        ev.preventDefault()
    }
}

window.onload = () => {
    let container = document.createElement('div')
    container.id = "container"

    canvas = document.createElement('canvas')
    canvas.id = "bezier_editor"
    canvas.width = width
    canvas.height = height
    container.appendChild(canvas)
    document.body.appendChild(container)
    context = canvas.getContext("2d") as CanvasRenderingContext2D
    document.addEventListener('contextmenu', ev => ev.preventDefault())

    if (context === null) {
        throw Error("Context badly constructed!")
    }

    eventListeners()
    gameLoop()

}