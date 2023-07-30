
console.log('script is being acessed')
async function init(){
    var fullData = await d3.csv('https://khammersmith17.github.io/clean_gaminder4.csv')
    var data = fullData.filter(function(d) {
        return d["year"] === '1996'
      })
    console.log(data)
    document.getElementById("annotation").style.border = "solid black";
    drawChart(data, "scatterplot")
}
async function newChart(){
    var fullData = await d3.csv('https://khammersmith17.github.io/clean_gaminder4.csv')
    var year = document.querySelector('#getYear').value

    var data = fullData.filter(function(d) {
        return d["year"] === year 
      })
    
    drawChart(data)
}

async function drawChart(data){
    var width = 600
    var height = 600
    var infantMortality = data.map(d => d.infant_mortality);
    console.log(infantMortality);
    var gdp = data.map(d => +d.gdp);
    console.log(gdp);

    var country = data.map(d => d.country)
    var region = data.map(d => d.region)

    var maxIM = d3.max(data, function(d) { return +d.infant_mortality; });
    console.log(maxIM)

    var maxGdp = d3.max(data, function(d) { return +d.gdp; });
    console.log(maxGdp)

    var margin = {top: 50, right: 50, bottom: 50, left: 50};

    var cys= d3.scaleLinear()
    .domain([1,maxIM])
    .range([500,0]);

    var ys = infantMortality.map(value => cys(value));
    console.log(ys)

    var cxs= d3.scaleLog()
    .base(10)
    .domain([maxGdp,10000000])
    .range([500,0]);

    var xs = gdp.map(value => cxs(value))
    console.log(xs)

    var tooltip = d3.select('#tooltip')

    svg = d3.select('svg');
    svg.selectAll("*").remove();

    
svg.append('g')
.attr("transform","translate(50,50)")
.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
.selectAll('circle')
.data(data)
.enter()
.append('circle')
.attr('cx',function(d,i) {return xs[i];})
.attr('cy',function(d,i) {return ys[i];})
.attr('r', function(d,i) {return 5;})
.on("mouseover", function(d,i) {
    tooltip.style("opacity",1)
    .style("left", (d3.event.pageX)+"px")
    .style("top", (d3.event.pageY)+"py")
    .html("Country: " + country[i] + ', Region: ' + region[i] + ', GDP: ' + gdp[i] + ', Infant Mortality: ' + infantMortality[i])})
    .on("mouseout", function(){
        tooltip.style("opacity", 0)
    });

const x = d3.scaleLog().base(10).domain([100000000,maxGdp]).range([0,500])
const y = d3.scaleLinear().domain([10,maxIM]).range([500,0])


svg.append('g').attr("transform", "translate(50,50)").call(d3.axisLeft(y).tickValues([20,40,60,80,100,120,140,160]).tickFormat(d3.format("~s")))
svg.append('g').attr("transform", "translate(50,550)").call(d3.axisBottom(x).tickValues([1000000000,10000000000,100000000000]).tickFormat(d3.format("~s")))

svg.append("text")
.attr("x", width/ 2 )
.attr("y", 15)
.style("text-anchor", "middle")
.text("GDP vs Infant Mortality");

//Create X axis label   
svg.append("text")
.attr("x", width / 2 )
.attr("y",  height + margin.bottom-50)
.style("text-anchor", "middle")
.text("GDP");

//Create Y axis label
svg.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 5)
.attr("x",0 - (height / 2)+50)
.attr("dy", "1em")
.style("text-anchor", "middle")
.text("Infant Mortality"); 

svg.selectAll('rect')
.data()
.enter()
.append('rect')
.attr('x',400)
.attr('y',400)
.attr('width',200)
.attr('height', 100)
.style('stroke', 'black')
  


}