import type {JSX} from "static/jsx-runtime";

const App: JSX.Element = <h1 className="Test"> <h1> HELLO </h1> </h1>

const Test =
    (props: {}): JSX.Element => <h1 className="Test"><h1> HELLO as function </h1></h1>


const Promised = (props: {}): Promise<JSX.Element> => new Promise((r, _) => r(<h1>Promise</h1>))

console.log(<Test />)

console.log(<Test />)

console.log(App)

console.log(<Promised />)