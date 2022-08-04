let $d = document,
    graphicContainer = $d.querySelectorAll(".cont"),
    data = document.querySelector("#datos"),
    arrayData = data.getAttribute("data-info1"),
    obj = JSON.parse(arrayData),
    myChart = [];
   

const requestInfo = () => {
    let atributos = data.attributes;
    console.log("========================================================================")
    for (let index = 0; index < atributos.length; index++) { 
        if (data.attributes.getNamedItem(`data-info${index}`)) {
            let arrayData = data.getAttribute(`data-info${index}`),
                obj1 = JSON.parse(arrayData);
            console.log(obj1);
        }
      
    }
}
requestInfo();
let colors =
    [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(245, 199, 169)',
        'rgb(72, 143, 177)',
        'rgb(255, 173, 153)',
        'rgb(236, 179, 255)',
        'rgb(255, 238, 204)',
        'rgb(255, 128, 128)',
        'rgb(236, 179, 255)',
    ];

//let names = obj.map(objeto => objeto[key1]);
//let percentages = obj.map(objeto => objeto[key2]);
function Data(title) {
        this.label = title,
        this.data = data,
        this.borderColor= colorLine

}
const transformData = () => {
    let info = [];
        let names;
    if ((obj[0] instanceof Array)) {
        
        let labels = Object.keys(obj[0][0]),
            key1 = labels[0],
            key2 = labels[1];
        for (let index = 0; index < obj.length; index++) {
            if (index < 1) {
             names = obj[index].map(objeto => objeto[key1]);
            
            }
            let percentages = obj[index].map(objeto => objeto[key2]);
            //console.log(percentages);
            let n = datos(`prueba${index}`, percentages, colors[index], names);
           
            info.push(n);

        }
        //console.log(info);
    } else {
        info = [];

        etiquetas = Object.keys(obj[0]),
        key1 = etiquetas[0];
        key2 = etiquetas[1];
        names = "";
        names = obj.map(objeto => objeto[key1]),
        percentages = obj.map(objeto => objeto[key2]);
        let n = datos(`prueba${0}`, percentages, colors, names);
        info.push(n);

     
    }

    return {
        nam:names,
        info,
    }
}
const datos = (label, data, borderColor, names,) => {

    return {
        names,
        label,
        data,
        borderColor,
        backgroundColor: borderColor,
    }
}
//transformData();
const labels = (names,  data, type) => {
  
    let borderColor = "#fff";
    if (type != "pie") {
        borderColor = 'rgb(150,228, 128)'
    }
    let colors =
        [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(245, 199, 169)',
            'rgb(72, 143, 177)',
            'rgb(255, 173, 153)',
            'rgb(236, 179, 255)',
            'rgb(255, 238, 204)',
            'rgb(255, 128, 128)',
            'rgb(236, 179, 255)',
        ];


    return {
        labels: names,
        datasets:data
    }

}


const toProcessData = (data, chartType, typeOfFile, canva) => {
    let config = {
        type: chartType,
        data: data,
        options: {}
    }
    return config;
   
}



const createGraphicItemList = (idSelect, contenedor) => {
    console.log(contenedor);
    if (!contenedor.classList.contains('multiline')) {
        $divSelect = $d.createElement("div"),
            $Select = $d.createElement("select"),
            $option = $d.createElement("option"),
            $option1 = $d.createElement("option"),
            $option2 = $d.createElement("option"),
            $option3 = $d.createElement("option");
        $option.setAttribute("value", "line");
        $option1.setAttribute("value", "bar");
        $option2.setAttribute("value", "pie");
        $option3.setAttribute("value", "doughnut");
        $option.textContent = "Line";
        $option1.textContent = "Barra";
        $option2.textContent = "Dona";
        $option3.textContent = "Pastel";
        $Select.classList.add("select");
        $Select.setAttribute("title", "Grafico");
        $Select.appendChild($option);
        $Select.appendChild($option1);
        $Select.appendChild($option2);
        $Select.appendChild($option3);
        $Select.setAttribute("id", `canva${idSelect}`);
        $divSelect.appendChild($Select);
        contenedor.appendChild($divSelect);
    }
}

const createGraphic = ( container, idSelect, names) => {                                                           
    let $canvas = $d.createElement("canvas"),
    type;
        createGraphicItemList(idSelect, container);

    container.appendChild($canvas);
 
    switch (container.classList[2]) {
        case "pie":
            type = "pie";
            break;
        case "line":
            type = "line";
            break;
        case "bar":
            type = "bar"
            break;
        case "doughnut":
            type = "doughnut";
            break;

    }

    const { nam, info } = transformData();

  
    const chart = new Chart($canvas.getContext("2d"), toProcessData(labels(nam, info, "line"), "line", 'jkjk', $canvas))
    
    myChart.push(chart);



}

$d.addEventListener("DOMContentLoaded", () => {
    for (let index = 0; index < graphicContainer.length; index++) {
        createGraphic(graphicContainer[index], index);
    }
});


$d.addEventListener("change", (e) => {
    let $selects = $d.querySelectorAll(".select");


    for (let index = 0; index < $selects.length; index++) {
        if (e.target.id === $selects[index].getAttribute("id")) {
            let type = $selects[index].value;
           
            let idobte = e.target.id.slice(5);
         
            let cnv = graphicContainer[parseInt(idobte)].children[1];
            ctx = cnv.getContext('2d');
            if (myChart[idobte]) {
                myChart[idobte].destroy();
            }

            const { nam, info } = transformData();
         
            myChart[idobte] = new Chart(ctx, toProcessData(labels(nam,  info, type), type, 'jkjk', cnv))

        }
    }
})