import type {JSX} from "static/jsx-runtime";
import type {ComponentChildren} from "preact";

const Template = (props: { children: ComponentChildren; page: string }) =>
    <html>
    <head>
        <title>We are on {props.page}</title>
    </head>
    <body>
    <h1>LOCATION: {props.page}</h1>
    <main>
        {props.children}
    </main>
    </body>
    </html>
export default Template