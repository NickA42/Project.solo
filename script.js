var promise = d3.csv("CS.csv")
    promise.then(function(csv){
       /* //printout(csv)
        printout2(csv) 
        printout3(csv)
        printout4(csv)
        printout5(csv)*/
        drawthefuckinggraph(csv)
      
        
        
    },
                 function(err){
        console.log("fail",err)
    }) 
   
var drawthefuckinggraph = function(csv)
{
    var screen = {width:800,height:600}
    var margins = {top:10,right:50,bottom:50,left:100}
    var width = screen.width - margins.left - margins.right
    var height = screen.height - margins.top - margins.bottom
    
d3.select("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("id", "graph") .attr("transform","translate("+margins.left+","+margins.top+")");

var xScale = d3.scaleLinear(printout)
                .domain([2007,2017])
                .range([0,width])
var yScale = d3.scaleLinear()
                .domain([0,1100])
                .range([height,0])
var yScale2 = d3.scaleLinear()
                .domain([0,41])
                .range([height,0]);
var cScale = d3.scaleOrdinal(d3.schemeTableau10);
    
var xAxis = d3.axisBottom(xScale)
var yAxis = d3.axisLeft(yScale)
var yRightAxis = d3.axisRight(yScale2)

d3.select("svg")
    .append("g")
    .classed("axis",true);
    
d3.select(".axis")
    .append("g")
    .attr("id","xAxis") .attr("transform","translate("+margins.left+","+(margins.top+height) +")")
    .call(xAxis)

d3.select(".axis")
    .append("g")
    .attr("id","yAxis")
    .attr("transform","translate(90,"+margins.top+")")
    .call(yAxis)
    
d3.select("svg")
    .append("text")
    .text("Annual Emissions per Year")
    .attr("transform","translate(35,420) rotate(-90)")
    .attr("font-size", "30px");
d3.select("svg")
    .append("text")
    .text("Emissions: Pounds per Trip")
    .attr("transform","translate(850,100) rotate(90)")
    .attr("font-size", "30px");
d3.select("svg")
    .append("text")
    .text("Years")
    .attr("transform","translate(400,600) ")
    .attr("font-size", "30px");
    
    
d3.select(".axis")
    .append("g")
    .attr("id","yRightAxis")
    .attr("transform","translate(800,"+margins.top+")")
    .call(yRightAxis)

var arrays = d3.select("#graph")
    .selectAll("g")
    .data(csv)
    .enter()
    .append("g")
    .attr("fill", "red")
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("transform","translate(100,"+margins.top+")")


//create svg element 
var svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);
    
//bargraph time 
d3.scaleBand()
    .domain(d3.range(20))
    .range([0,width])
    .round(true)
    .paddingInner(0.05);
    
//create bars 
svg.select("#graph").selectAll("rect")
    .data(csv)
    .enter()
    .append("rect")
    .attr("x", function(csv,i){
    return xScale(i+2007)-5;}) //<--- set x values 
    
    //attempted tooltip: does not work... yet
 .on("mouseover", function(csv) {
        console.log(csv["aept"])
    d3.select("#tooltip")
    .style("left", (d3.event.pageX + 20) + "px")
    .style("top", (d3.event.pageY - 25) + "px")
    //.select("#value")
    .text(function(){
        return csv["aept"];
})
    d3.select("#tooltip")
    .classed("hidden", false)
    })
    
    .on("mouseout", function() {
        
        
    d3.select("#tooltip")
    .classed("hidden", true);
        
    }) 

    .attr("y", function(csv){
        return yScale(csv.aept);
})
    .attr("height", function(csv){
        console.log(csv,height)
        return height - yScale(csv.aept);
})
    .attr("width", function(csv){
        return 20 ;
})
    .style("fill","blue")
 


svg2 = d3.select("svg")
    .attr("width", width)
    .attr("height", height);
    
//create bars 
svg.select("#graph").append("g").selectAll("rect")
    .data(csv)
    .enter()
    .append("rect")
    .attr("x", function(csv,i){
    return xScale(i+2007)+17;
})
    .attr("height", function(csv){
        return height - yScale(csv.aec);
})
    .attr("y", function(csv){
        return yScale(csv.aec);
})
    .attr("width", function(csv){
        return 30;
})
    .style("fill","rgb(0,0,139)")

    
    
//tooltip for aec
.on("mouseover", function(csv) {
        console.log(csv["aec"])
    d3.select("#tooltip")
    .style("left", (d3.event.pageX + 20) + "px")
    .style("top", (d3.event.pageY - 25) + "px")
    .text(function(){
        return csv["aec"];
    
    })
    d3.select("#tooltip")
    .classed("hidden", false)
    })
    
    .on("mouseout", function() {
        
        
    d3.select("#tooltip")
    .classed("hidden", true);
        
    }) 
    
svg.selectAll("rect")
    .data(csv)
    .enter()
    .append("rect")
    .append("title")
    .text(function(csv){
    return csv;
}) 

var line = d3.line()
    .defined(function(csv){return csv.elbtc >= 0 && csv.elbtc <= 350;})
    .x(function(csv) {return xScale(parseInt(csv['Year ']));})
    .y(function(csv) {return yScale2(parseFloat(csv.elbtc));});

var line2 = d3.line()
    .defined(function(csv){return csv.elbtpt >= 0 && csv.elbtpt <= 350;})
    .x(function(csv) {return xScale(parseInt(csv['Year ']));})
    .y(function(csv) {return yScale2(parseFloat(csv.elbtpt));});

//create line 
svg.select("#graph").append("path")
    .datum(csv)
    .attr("class","line")
    .attr("d", line)
    .attr("stroke", "rgb(139,0,0)")
    .attr("stroke-width",5)
    .attr("fill", "none")
    .attr("id","bottomline")
svg.select("#graph").selectAll("circle")
    .data(csv)
    .enter()
    .append("circle")
    .attr("fill","rgb(139,0,0)")
    .attr("stroke","none")
   .attr("cx", function(d){
    return xScale(d["Year "]);
})
    .attr("cy", function(d){
    return yScale2(d["elbtc"]);
})
    .attr("r", 7)
  //Tooltip for ElbtC
 .on("mouseover", function(csv) {
        console.log(csv["elbtc"]);  d3.select("#tooltip")
    .style("left", (d3.event.pageX + 20) + "px")
    .style("top", (d3.event.pageY - 25) + "px")
    .text(function(){
        return csv["elbtc"];
})
    d3.select("#tooltip")
    .classed("hidden", false)
    })
    
    .on("mouseout", function() {
        
        
    d3.select("#tooltip")
    .classed("hidden", true);
        
    }) 
svg.select("#graph").append("path")
    .datum(csv)
    .attr("class","line")
    .attr("d", line2)
    .attr("stroke", "red")
    .attr("stroke-width",3)
    .attr("fill", "none")
    .attr("id","topline")
svg.select("#graph").append("g").selectAll("circle")
    .data(csv)
    .enter()
    .append("circle")
    .attr("fill","red")
    .attr("stroke","none")
   .attr("cx", function(d){
    return xScale(d["Year "]);
})
    .attr("cy", function(d){
    return yScale2(d["elbtpt"]);
})
    .attr("r", 7)
  //tooltip for ElbtPT
 .on("mouseover", function(csv) {
        console.log(csv["elbtpt"]);
    d3.select("#tooltip")
    .style("left", (d3.event.pageX + 20) + "px")
    .style("top", (d3.event.pageY - 25) + "px")
    .text(function(){
        return csv["elbtpt"];
})
    d3.select("#tooltip")
    .classed("hidden", false)
    })
    
    .on("mouseout", function() {
        
        
    d3.select("#tooltip")
    .classed("hidden", true);
        
    }) 
    


/*
svg2 = d3.select("svg")
    .attr("width", width)
    .attr("height", height);
    */

}

/*d3.select("g")
    .selectAll("text")
    .enter()
    .append("text")
    .attr("text")*/

//sets up SVG and all that good stuff (axes and scales)

var printout = function(csv)
{
    var Years = csv.map(function(d)
    {
        return d["Year "];

    }) 
    console.log(Years)
    return Years;
} 


var printout2 = function(csv)
{
    var aec = csv.map(function(d)
    {
        return d["aec"]

    
    
    })
console.log(aec)
}
var printout3 = function(csv)
{
    var aept = csv.map(function(d)
    {
        return d["aept"]

    
    
    })
    console.log(aept)
}

var printout4 = function(csv)
{
    var elbtc = csv.map(function(d)
    {
        return d["elbtc"]

    
    
    })
    console.log(elbtc)
}

var printout5 = function(csv)
{
    var elbtpt = csv.map(function(d)
    {
        return d["elbtpt"]

    
    
    })
    console.log(elbtpt)
}


d3.select("body")
    .append("p")
    .style("font-size", "30px")
    .attr("x", 500)
    .text("Annual Emissions per Year: Bar (BLUE) ")

d3.select("body")
    .append("p")
    .style("font-size", "30px")
    .attr("x", 500)
    .text("Emissions in Pounds per Trip: Line (RED)")

d3.select("body")
    .append("p")
    .style("font-size", "30px")
    .attr("x", 500)
    .text("Dark Colored: Emissions from Cars")

d3.select("body")
    .append("p")
    .style("font-size", "30px")
    .attr("x", 500)
    .text("Light Colored: Emissions from Public Transportation")

console.log("oy")










//Attempted legend 
/*var drawLegend = function(csv,cScale)
{
    console.log(csv)
d3.select("svg")
        .append("g").attr("id","legend")
        .attr("transform","translate("+(screen.width-margins.right)+"," + (margins.top)+",");
   
var gs = d3.select("#legend")
    .selectAll("g")
    .data(csv)
    .enter()
    .append("g")
    .attr("fill",function(csv){
        return cScale(csv.Year);
    })
        .attr("transform",function(csv,i)
        {
            return "translate(0,"+(i*14)+")";
        })
gs.append("rect").attr("width",10).attr("height",10);
    
gs.append("text")
    .text(function(csv){return csv.name})
    .attr("x",15)
    .attr("y",10)
    .attr("fill","black")
}*/