// Boxy
Box = function(idCanvas) {
	"use strict";

	var canvas = document.getElementById(idCanvas),
		c = canvas.getContext('2d'),
		resolution = 300,
		margin = 20,
		pos = {
			x: margin,
			y: margin
		},
		conf = null,
		p = null,
		px = function(mm){
			return Math.round(mm*resolution/25.4);
		},
		b = {};

	

	b.size = function(options) {
		conf = $.extend({
			width: 50,
			height: 60,
			depth: 25,
			len:7,
			lenProf:0.4,
			tab:12,
			desv:2,
			radius:4,
			lenRadius:2,
			stroke: 2
		},options);
		c.strokeWidth = conf.stroke;

		p = {
			width: px(conf.width),
			height: px(conf.height),
			depth: px(conf.depth),
			len:px(conf.len),
			lenProf:px(conf.lenProf),
			desv:px(conf.desv),
			radius:px(conf.radius),
			lenRadius:px(conf.lenRadius),
			tab:px(conf.tab)
		};
		return b;
	};
	b.moveTo = function(x,y){
		
		pos.x = margin+x;
		pos.y = margin+y;

		c.moveTo(pos.x,pos.y);
		return b;
	};
	b.lineTo = function(x,y){
		pos.x += x;
		pos.y += y;
		
		c.lineTo(pos.x,pos.y);

		
		return b;
	};

	b.curveTo = function(x,y,up){
		var cx,cy;
		if(up){
			cx = pos.x;
			cy = pos.y + y;
		}else{
			cx = pos.x + x;
			cy = pos.y;
		}
		pos.x += x;
		pos.y += y;

		c.quadraticCurveTo(cx,cy,pos.x,pos.y);
		return b;
	};



	b.render = function(){
		canvas.width = 2*margin + 2*p.width + 2* p.depth + p.tab;
		canvas.height = 2*margin + p.height + 2* p.depth + 2 * p.tab;
		c.beginPath();

		b

		.moveTo(p.tab,p.tab)
		.lineTo(0,p.radius - p.tab)
		.curveTo(p.radius,-p.radius, true)
		.lineTo(p.width - 2*p.radius,0)
		.curveTo(p.radius,p.radius)
		.lineTo(0,p.tab-p.radius)

		.lineTo(-p.width,0)

		.lineTo(0,p.depth)
		.lineTo(p.width,0)
		.lineTo(0,-p.depth)

		.moveTo(p.tab,p.tab + p.depth)
		.lineTo(-p.tab,p.desv)
		.lineTo(0,p.height-2*p.desv)
		.lineTo(p.tab,p.desv)

		.moveTo(p.tab,p.tab + p.depth)
		.lineTo(0,p.height)
		.lineTo(p.width,0)
		.lineTo(0,-p.height)
		.lineTo(p.depth,0)
		.lineTo(0,p.height)
		.lineTo(-p.depth,0)

		.moveTo(p.tab+p.width+p.depth,p.tab+p.depth)
		.lineTo(p.width,0)
		.lineTo(0,p.height)
		.lineTo(-p.width,0)

		.lineTo(0,p.depth)
		.lineTo(0,p.tab - p.radius)
		.curveTo(p.radius,p.radius,true)
		.lineTo(p.width-2*p.radius,0)
		.curveTo(p.radius,-p.radius)
		.lineTo(0,p.radius-p.tab)
		.lineTo(-p.width,0)

		.moveTo(p.tab+2*p.width+p.depth,p.tab+2*p.depth+p.height)
		.lineTo(0,-p.depth)
		.lineTo(p.depth,0)
		.lineTo(0,-p.height)
		.lineTo(-p.depth,0)



		// len
		.lineTo(0,-p.len)
		.curveTo(p.lenRadius,-p.lenRadius)
		.lineTo(p.desv, -1*(p.depth-p.len-p.lenRadius-p.radius))
		.curveTo(p.radius,-p.radius,true)
		.lineTo(p.depth-p.radius-2*p.desv-p.lenRadius,0)
		.lineTo(p.desv,p.depth)

		.moveTo(p.tab+p.width+p.depth,p.tab+p.depth)
		.lineTo(0,-p.len)
		.curveTo(-p.lenRadius,-p.lenRadius)
		.lineTo(-p.desv, -1*(p.depth-p.len-p.lenRadius-p.radius))
		.curveTo(-p.radius,-p.radius,true)
		.lineTo(-1*(p.depth-p.radius-2*p.desv-p.lenRadius),0)
		.lineTo(-p.desv,p.depth)

		.moveTo(p.tab+p.width,p.tab+p.depth+p.height)
		.lineTo(0,p.len)
		.curveTo(p.lenRadius,p.lenRadius)
		.lineTo(p.desv, 1*(p.depth-p.len-p.lenRadius-p.radius))
		.curveTo(p.radius,p.radius,true)
		.lineTo(p.depth-p.radius-2*p.desv-p.lenRadius,0)
		.lineTo(p.desv,-p.depth)

		.moveTo(p.tab+2*p.width+2*p.depth,p.tab+p.depth+p.height)
		.lineTo(0,p.len)
		.curveTo(-p.lenRadius,p.lenRadius)
		.lineTo(-p.desv, 1*(p.depth-p.len-p.lenRadius-p.radius))
		.curveTo(-p.radius,p.radius,true)
		.lineTo(-1*(p.depth-p.radius-2*p.desv-p.lenRadius),0)
		.lineTo(-p.desv,-p.depth)

		//
		.moveTo(p.tab+p.len,p.tab)
		.lineTo(-p.len,-p.lenProf)

		.moveTo(p.tab+p.width-p.len,p.tab)
		.lineTo(p.len,-p.lenProf)

		.moveTo(p.tab+p.width+p.depth+p.len,p.tab+2*p.depth+p.height)
		.lineTo(-p.len,p.lenProf)

		.moveTo(p.tab+2*p.width+p.depth-p.len,p.tab+2*p.depth+p.height)
		.lineTo(p.len,p.lenProf)




		c.stroke();

		
		return b;
	};


	return b;
};