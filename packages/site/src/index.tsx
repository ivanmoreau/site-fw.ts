import {buildSite, subroute} from "static";
import Main from "./Main.tsx";
import Template from "./Template.tsx";

await buildSite({
    "home": subroute({
        "index": <Template page={"home index"}> <Main/> </Template>,
        "sub_home": <Main/>
    }),
    "index": <Main/>
})