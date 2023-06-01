import axios from "axios";

export default axios.create(
    {
        baseURL: 'http://localhost:8000'
    }
);
const URL_SHOW = "/show_graph";
const URL_PAINT = "/paint_graph";
export {URL_SHOW, URL_PAINT}; 