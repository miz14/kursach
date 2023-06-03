import { useState, useEffect } from "react";
import { URL_PAINT, URL_SHOW } from "../api/axios";
import axios from "../api/axios";

const NavHeader = () => {
    
    var cntline;

    useEffect(() => {
        const a = document.querySelector(".graph_nodes_count").value = 1
        get_graph()
    }, [])

    // const [count, setCount] = useState(0)
    // const [countInTimeout, setCountInTimeout] = useState(0);
    // useEffect(() => {
    //     setTimeout(() => {
    //       setCountInTimeout(count); // count is 0 here
          
    //     }, 3000).then(() => {setCount(5),
    //         console.log("qwe")
    // });
    //     console.log("qwe") // Update count to be 5 after timeout is scheduled
    //   }, [count]);
	
    function selectionchanged(obj)
    {
        console.log([1, obj])
        //obj = obj.target
        var substr = obj.target.value.substring(0,obj.selectionStart).split('\n')
        var row = substr.length
        var col = substr[substr.length-1].length
        var tmpstr = '(' + row.toString() + ',' + col.toString() + ')'
        // if selection spans over 
        if(obj.selectionStart != obj.selectionEnd)
        {
            substr = obj.value.substring(obj.selectionStart, obj.selectionEnd).split('\n')
            row += substr.length - 1
            col = substr[substr.length-1].length
            tmpstr += ' - (' + row.toString() + ',' + col.toString() + ')'
        }
    }

    function input_changed(obj_txt)
    {
        var obj_rownr = document.getElementsByClassName("rownr")[0] //obj_txt.parentElement.parentElement.getElementsByClass('textarea')[0]
        var cntline = count_lines(obj_txt.target.value)
        if(cntline == 0) cntline = 1
        var tmp_arr = obj_rownr.value.split('\n')
        var cntline_old = parseInt(tmp_arr[tmp_arr.length - 1], 10)
        // if there was a change in line count
        if(cntline != cntline_old)
        {
            obj_rownr.cols = cntline.toString().length; // new width of txt_rownr
            populate_rownr(obj_rownr, cntline)
            scroll_changed(obj_txt)
        }
        selectionchanged(obj_txt);
    }

    function scroll_changed(obj_txt)
    {
        var obj_rownr = document.getElementsByClassName("rownr")[0]
        scrollsync(obj_txt, obj_rownr)
    }

    function scrollsync(obj1, obj2)
    {
        // scroll text in object id1 the same as object id2
        obj2.scrollTop = obj1.target.scrollTop
    }

    function populate_rownr(obj, cntline)
    {
        var tmpstr = ''
        for(var i = 1; i <= cntline; i++)
        {
            tmpstr = tmpstr + i.toString() + '\n'
        }
        obj.value = tmpstr
    }

    function count_lines(txt)
    {
        console.log(txt)
        if(txt == '')
        {
            return 1
        }
        return txt.split('\n').length + 1
    }
    function matrix(n) {
        return Array.from({
          // generate array of length m
          length: n
          // inside map function generate array of size n
          // and fill it with `0`
        }, () => new Array(n).fill(0));
      };
      
    async function get_graph(url) {
        var n = Number(document.querySelector('.graph_nodes_count').value)
        var mat = matrix(n)
        var textlines = document.querySelector('.txt').value.split("\n")

        textlines.forEach(el => {
            var nodes = el.split(" ")
            if(nodes.length == 2 && nodes[0] != '' && nodes[1] != '' && nodes[0] != nodes[1]) {
                console.log(nodes)
                var n1 = Number(nodes[0])
                var n2 = Number(nodes[1])
                try {
                    mat[n1][n2] = 1
                    mat[n2][n1] = 1
                } catch(err) {
                    console.log(err)
                }
            }
        });
        console.log(mat)
        try {
            
            const response = await axios.post(url, JSON.stringify(mat),
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                console.log(res)
                const src = "data:image/png;base64," + res.data.img;
                document.querySelector('.construct_graph_img').src = src
            })
        
            
        } catch (error) {
            console.error(error);
        }
    }
    return(
        <>
        <header className="header_bg">
            <div className='default_container'>
                123
            </div>
        </header>
        <main className="main">
            <div className='default_container'>
                <h1 className="zagolovok">Раскраска графа</h1>
                <section className="construct_graph_section">
                    <div className="construct_graph_section_left">
                        <div className="construct_graph_section_left_num">
                            <div>Кол-во вершин</div>
                            <input className="graph_nodes_count" type="number" min="1" step="1" onChange={() => get_graph(URL_SHOW)}/>
                        </div>
                        <div className="construct_graph_section_left_textarea">
                            <textarea className="rownr" rows="20" cols="1" value="1" readOnly/>
                            <textarea className="txt" rows="20" nowrap="nowrap" wrap="off" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" onClick={selectionchanged} onInput={input_changed} onScroll={scroll_changed} onChange={() =>get_graph(URL_SHOW)}/>
                        </div>
                        <div className="construct_graph_section_left_buttons">
                            <button onClick={() => get_graph(URL_PAINT)}>Раскрасить</button>
                        </div>
                    </div>
                    <div className="construct_graph_section_right">
                        <img alt="no" id="grapth_img" className="construct_graph_img"/>
                    </div>
                </section>
            </div>
        </main>
        </>
    )
}

export {NavHeader};