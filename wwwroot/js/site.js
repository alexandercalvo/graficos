let $d = document,
    graphicContainer = $d.querySelectorAll(".cont"),
    infomationGraphics = document.querySelector("#datos"),
    myChart = [];

//arreglo de colores para los diferentes tipos de lineas 
let colors =
    [
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(245, 199, 169)',
        'rgb(255, 238, 204)',

        'rgb(255, 128, 128)',
        'rgb(236, 179, 255)',
        'rgb(255, 99, 132)',
        'rgb(231, 76, 60)',

        'rgb(164, 170, 85)',
        'rgb(127, 151, 205)',
        'rgb(72, 143, 177)',
        'rgb(129, 44, 46)',
    ];

const requestInfo = () => {
    let attributes = infomationGraphics.attributes,
        objects = [];
    for (let index = 0; index < attributes.length; index++) { 
        if (infomationGraphics.attributes.getNamedItem(`data-info${index}`)) {
            let arrayData = infomationGraphics.getAttribute(`data-info${index}`),
                newObject = JSON.parse(arrayData);
            objects.push(newObject);
        }
      
    }
    return objects;
}



function Data(title) {
        this.label = title,
        this.data = infomationGraphics,
        this.borderColor= colorLine

}

const transformData = (obj) => {
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
          
            let n = datos(`prueba${index}`, percentages, colors[index], names);
           
            info.push(n);

        }
      
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
const labels = (names,  data, type) => {
  
    let borderColor = "#fff";
    if (type != "pie") {
        borderColor = 'rgb(150,228, 128)'
    }
   
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
    
    if (!contenedor.classList.contains('multiline')) {
        $divSelect = $d.createElement("div"),
        $Select = $d.createElement("select"),
        $option = $d.createElement("option"),
        $option1 = $d.createElement("option"),
        $option2 = $d.createElement("option"),
        $option3 = $d.createElement("option");
        $option4 = $d.createElement("option");
        $option1.setAttribute("value", "line");
        $option2.setAttribute("value", "bar");
        $option3.setAttribute("value", "pie");
        $option4.setAttribute("value", "doughnut");
        $option.textContent = "Selecione Un Tipo De Grafico";
        $option1.textContent = "Line";
        $option2.textContent = "Barra";
        $option3.textContent = "Dona";
        $option4.textContent = "Pastel";
       
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

const createGraphic = ( container, idSelect, obj) => {                                                           
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

    const { nam, info } = transformData(obj);

  
    const chart = new Chart($canvas.getContext("2d"), toProcessData(labels(nam, info, type), type, $canvas))
    
    myChart.push(chart);



}

$d.addEventListener("DOMContentLoaded", () => {
    let objetos = requestInfo();
    
    for (let index = 0; index < graphicContainer.length; index++) {
        console.log(objetos[index]);
        createGraphic(graphicContainer[index], index, objetos[index]);
    }
   

});


$d.addEventListener("change", (e) => {
    let $selects = $d.querySelectorAll(".select");

    for (let index = 0; index < $selects.length; index++) {
        if (e.target.id === $selects[index].getAttribute("id")) {
            let type = $selects[index].value;
           
            let idobte = e.target.id.slice(5);
         
            let cnv = graphicContainer[parseInt(idobte)].children[1],
                ctx = cnv.getContext('2d');      
            if (myChart[idobte]) {
                myChart[idobte].destroy();
            }

            
            let objetos = requestInfo();
            const { nam, info } = transformData(objetos[parseInt(cnv.parentNode.classList[1].slice(4))]);
         
            myChart[idobte] = new Chart(ctx, toProcessData(labels(nam,  info, type), type, cnv))

        }
    }
})