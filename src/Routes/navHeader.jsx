import { useState } from "react";
import { URL_PAINT, URL_SHOW } from "../api/axios";
import axios from "../api/axios";

const NavHeader = () => {
    
    var cntline;
	
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
    async function get_graph(obj) {
        var text = obj.target.value
        try {
            const response = await axios.post(URL_SHOW, JSON.stringify([[0]]), {
                headers: {
                    'Content-Type': 'application/json'
                }
            
            }, {
                responseType: 'blob'
            })
            console.log(response)
            const convertBlobToBase64 = async (blob) => { // blob data
            return await blobToBase64(blob);
            }
            
            const blobToBase64 = blob => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            });
            console.log(response.data)
            document.getElementsByClassName('construct_graph_img').src =  URL.createObjectURL(new Blob([response.data], { type: "image/png" }))

            //console.log(new Blob(response.data.img));
            //document.getElementsByClassName('construct_graph_img').src = "data:image/jpg;base64," + window.btoa(response.data)
            //a = image
            // console.log(a)
            console.log(document.getElementsByClassName('construct_graph_img'))
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
                            <input/>
                        </div>
                        <div className="construct_graph_section_left_textarea">
                            <textarea className="rownr" rows="20" cols="1" value="1" readOnly/>
                            <textarea className="txt" rows="20" cols="150" nowrap="nowrap" wrap="off" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" onClick={selectionchanged} onInput={input_changed} onScroll={scroll_changed} onChange={get_graph}/>
                        </div>
                        <div className="construct_graph_section_left_buttons">
                            <button>Раскрасить</button>
                        </div>
                    </div>
                    <div className="construct_graph_section_right">
                        <img alt="no" className="construct_graph_img"/>
                    </div>
                </section>
            </div>
        </main>
        </>
    )
}

export {NavHeader};