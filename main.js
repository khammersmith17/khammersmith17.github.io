//import * as d3 from d3
console.log('script is being acessed')
async function init(){
xdomain = [0,42];
xrange = [0,100];
ydomain = [0,5];
yrange = [100,250];
cdomain = [0,42];
crange = ["blue","orange"];
xs = d3.scaleLinear().domain(xdomain).range(xrange);
ys = d3.scaleLinear().domain(ydomain).range(yrange);
cs = d3.scaleLinear().domain(cdomain).range(crange);
d3.select('svg')
  .selectAll('rect')
  .data([4,8,15,16,23,42])
  .enter()
  .append('rect')
    .attr('x',20)
    .attr('y',function(d,i) {return ys(i);})
    .attr('width',function(d,i) {return xs(d);})
    .attr('height',10)
    .style('fill',function(d,i) {return cs(d);});
}