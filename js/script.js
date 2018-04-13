// JQUERY SORT FUNCTION
document.addEventListener('DOMContentLoaded', function () {
	
	// HERO ANIMATION
	(function() {
		var width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;

		// Main
		initHeader();
		initAnimation();
		addListeners();

		function initHeader() {
			width = window.innerWidth;
			height = window.innerHeight;
			target = {x: width/10, y: height/1};

			largeHeader = document.getElementById('large-header');
			largeHeader.style.height = height+'px';

			canvas = document.getElementById('demo-canvas');
			canvas.width = width;
			canvas.height = height;
			ctx = canvas.getContext('2d');

			// create points
			points = [];
			for(var x = 0; x < width; x = x + width/20) {
				for(var y = 0; y < height; y = y + height/10) {
					var px = x + Math.random()*width/10;
					var py = y + Math.random()*height/20;
					var p = {x: px, originX: px, y: py, originY: py };
					points.push(p);
				}
			}

			// for each point find the 5 closest points
			for(var i = 0; i < points.length; i++) {
				var closest = [];
				var p1 = points[i];
				for(var j = 0; j < points.length; j++) {
					var p2 = points[j]
					if(!(p1 == p2)) {
						var placed = false;
						for(var k = 0; k < 5; k++) {
							if(!placed) {
								if(closest[k] == undefined) {
									closest[k] = p2;
									placed = true;
								}
							}
						}

						for(var k = 0; k < 5; k++) {
							if(!placed) {
								if(getDistance(p1, p2) < getDistance(p1, closest[k])) {
									closest[k] = p2;
									placed = true;
								}
							}
						}
					}
				}
				p1.closest = closest;
			}

			// assign a circle to each point
			for(var i in points) {
				var c = new Circle(points[i], .75+Math.random()*1.25, 'rgba(255,255,255,0.25)');
				points[i].circle = c;
			}
		}

		// Event handling
		function addListeners() {
			if(!('ontouchstart' in window)) {
				window.addEventListener('mousemove', mouseMove);
			}
			window.addEventListener('scroll', scrollCheck);
			window.addEventListener('resize', resize);
		}

		function mouseMove(e) {
			var posx = posy = 0;
			if (e.pageX || e.pageY) {
				posx = e.pageX;
				posy = e.pageY;
			}
			else if (e.clientX || e.clientY)    {
				posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
				posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
			}
			target.x = posx;
			target.y = posy;
		}

		function scrollCheck() {
			if(document.body.scrollTop > height) animateHeader = false;
			else animateHeader = true;
		}

		function resize() {
			width = window.innerWidth;
			height = window.innerHeight;
			largeHeader.style.height = height+'px';
			canvas.width = width;
			canvas.height = height;
		}

		// animation
		function initAnimation() {
			animate();
			for(var i in points) {
				shiftPoint(points[i]);
			}
		}

		function animate() {
			if(animateHeader) {
				ctx.clearRect(0,0,width,height);
				for(var i in points) {
					// detect points in range
					if(Math.abs(getDistance(target, points[i])) < 9000) {
						points[i].active = 0.3;
						points[i].circle.active = 0.75;
					} else if(Math.abs(getDistance(target, points[i])) < 20000) {
						points[i].active = 0.1;
						points[i].circle.active = 0.25;
					} else if(Math.abs(getDistance(target, points[i])) < 40000) {
						points[i].active = 0.02;
						points[i].circle.active = 0.1;
					} else {
						points[i].active = 0;
						points[i].circle.active = 0;
					}

					drawLines(points[i]);
					points[i].circle.draw();
				}
			}
			requestAnimationFrame(animate);
		}

		function shiftPoint(p) {
			TweenLite.to(p, 1+1*Math.random(), {x:p.originX-50+Math.random()*100,
				y: p.originY-50+Math.random()*100, ease:Circ.easeInOut,
				onComplete: function() {
					shiftPoint(p);
				}});
		}

		// Canvas manipulation
		function drawLines(p) {
			if(!p.active) return;
			for(var i in p.closest) {
				ctx.beginPath();
				ctx.moveTo(p.x, p.y);
				ctx.lineTo(p.closest[i].x, p.closest[i].y);
				ctx.strokeStyle = 'rgba(255,255,255,'+ p.active+')';
				ctx.stroke();
			}
		}

		function Circle(pos,rad,color) {
			var _this = this;

			// constructor
			(function() {
				_this.pos = pos || null;
				_this.radius = rad || null;
				_this.color = color || null;
			})();

			this.draw = function() {
				if(!_this.active) return;
				ctx.beginPath();
				ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
				ctx.fillStyle = 'rgba(255,255,255,'+ _this.active+')';
				ctx.fill();
			};
		}

		// Util
		function getDistance(p1, p2) {
			return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
		}

	})();
	
	
	
	// TOGGLE NAV
	$(".navicon").click(function() {
		$(this).toggleClass("active");
		$("nav").slideToggle("open");
		console.log("navicon clicked");
	});
	
	$("#menu a").click(function() {
		$(".navicon").removeClass("active");
		$("nav").slideToggle("close");
		console.log("menu a clicked");
	});
	
	
    // GALLERY
    $(function () {
        var selectedClass = "";
        $(".filter").click(function () {
            selectedClass = $(this).attr("data-rel");
            $("#gallery-thumbnails").fadeTo(100, 0.1);
            $("#gallery-thumbnails div")
                .not("." + selectedClass)
                .fadeOut()
                .removeClass("scaled");
            setTimeout(function () {
                $("." + selectedClass).fadeIn().addClass("scaled");
                $("#gallery-thumbnails").fadeTo(300, 1);
            }, 300);
        });
    });
    
    $(".control-btn").click(function () {
        $(".control-btn").removeClass("active");
        $(this).addClass("active");
    });
	
	// ZOOM + PAN IMAGE ON HOVER
	$('.tile')
	// tile mouse actions
		.on('mouseover', function(){
			$(this).children('.image').css({'transform': 'scale('+ $(this).attr('data-scale') +')'});
		})
		.on('mouseout', function(){
			$(this).children('.image').css({'transform': 'scale(1)'});
		})
		.on('mousemove', function(e){
			$(this).children('.image').css({'transform-origin': ((e.pageX - $(this).offset().left) / $(this).width()) * 100 + '% ' + ((e.pageY - $(this).offset().top) / $(this).height()) * 100 +'%'});
		})
	// tiles set up
	.each(function(){
		$(this)
		// add a photo container
		.append('<div class="image"></div>')
		// set up a background image for each tile based on data-image attribute
		.children('.image').css({'background-image': 'url('+ $(this).attr('data-image') +')'});
	})

});



// DOT ANIMATION
document.addEventListener('DOMContentLoaded', function () {
	function adjustLine(from, to, line){

	var fT = from.offsetTop  + from.offsetHeight/2;
	var tT = to.offsetTop    + to.offsetHeight/2;
	var fL = from.offsetLeft + from.offsetWidth/2;
	var tL = to.offsetLeft   + to.offsetWidth/2;

	var CA   = Math.abs(tT - fT);
	var CO   = Math.abs(tL - fL);
	var H    = Math.sqrt(CA*CA + CO*CO);
	var ANG  = 180 / Math.PI * Math.acos( CA/H );

	if(tT > fT){
	  var top  = (tT-fT)/2 + fT;
	}else{
	  var top  = (fT-tT)/2 + tT;
	}
	if(tL > fL){
	  var left = (tL-fL)/2 + fL;
	}else{
	  var left = (fL-tL)/2 + tL;
	}

	if(( fT < tT && fL < tL) || ( tT < fT && tL < fL) || (fT > tT && fL > tL) || (tT > fT && tL > fL)){
	ANG *= -1;
	}
	top-= H/2;

	line.style["-webkit-transform"] = 'rotate('+ ANG +'deg)';
	line.style["-moz-transform"] = 'rotate('+ ANG +'deg)';
	line.style["-ms-transform"] = 'rotate('+ ANG +'deg)';
	line.style["-o-transform"] = 'rotate('+ ANG +'deg)';
	line.style["-transform"] = 'rotate('+ ANG +'deg)';
	line.style.top    = top+'px';
	line.style.left   = left+'px';
	line.style.height = H + 'px';

	}

	var d1 = document.getElementById('dot1');
	var l1 = document.getElementById('line1');
	var d2 = document.getElementById('dot2');
	var l2 = document.getElementById('line2');
	var d3 = document.getElementById('dot3');
	var l3 = document.getElementById('line3');
	var d4 = document.getElementById('dot4');
	var l4 = document.getElementById('line4');
	var d5 = document.getElementById('dot5');
	var l5 = document.getElementById('line5');
	var d6 = document.getElementById('dot6');
	var l6 = document.getElementById('line6');
	var d7 = document.getElementById('dot7');
	var l7 = document.getElementById('line7');
	var d8 = document.getElementById('dot8');
	var l8 = document.getElementById('line8');
	var d9 = document.getElementById('dot9');
	var l9 = document.getElementById('line9');
	var d10 = document.getElementById('dot10');
	var l10 = document.getElementById('line10');
	var d11 = document.getElementById('dot11');
	var l11 = document.getElementById('line11');
	var d12 = document.getElementById('dot12');
	var l12 = document.getElementById('line12');
	var d13 = document.getElementById('dot13');
	var l13 = document.getElementById('line13');
	var d14 = document.getElementById('dot14');
	var l14 = document.getElementById('line14');
	var d15 = document.getElementById('dot15');
	


	


	window.addEventListener("resize", function(){
	/*if(window.innerWidth < 768){
	  console.log('small');
	}
	else{
	   console.log('big');
	}
	*/
	adjustLine(d1,d2,l1);
	adjustLine(d2,d3,l2);
	adjustLine(d3,d4,l3);
	adjustLine(d4,d5,l4);
	adjustLine(d5,d6,l5);
	adjustLine(d6,d7,l6);
	adjustLine(d7,d8,l7);
	adjustLine(d8,d9,l8);
	adjustLine(d9,d10,l9);
	adjustLine(d10,d11,l10);
	adjustLine(d11,d12,l11);
	adjustLine(d12,d13,l12);
	adjustLine(d13,d14,l13);
	adjustLine(d14,d15,l14);
	//console.log("happy");
	});
	
	setTimeout(function(){
		adjustLine(d1,d2,l1);
		adjustLine(d2,d3,l2);
		adjustLine(d3,d4,l3);
		adjustLine(d4,d5,l4);
		adjustLine(d5,d6,l5);
		adjustLine(d6,d7,l6);
		adjustLine(d7,d8,l7);
		adjustLine(d8,d9,l8);
		adjustLine(d9,d10,l9);
		adjustLine(d10,d11,l10);
		adjustLine(d11,d12,l11);
		adjustLine(d12,d13,l12);
		adjustLine(d13,d14,l13);
		adjustLine(d14,d15,l14);
		//console.log("confused");
	}, 3000);
	

	// reveal point from bottom and top of the window
	//var revealeroffset = 150;
	var revealeroffset = (.25 * window.innerHeight);
	//var revealeroffset = 0;
	var triggerpoint = window.innerHeight - revealeroffset;
	
	window.addEventListener('scroll', reveal);
	reveal();

	function reveal() {
	//console.log("scrolling");

	//console.log("triggerpoint = " + triggerpoint);

	var revealers = document.querySelectorAll('.revealer');
	for (var i = 0; i < revealers.length; i++) {
		var windowheight = window.innerHeight;
		var revealertop = revealers[i].getBoundingClientRect().top;
		var revealerbottom = revealers[i].getBoundingClientRect().bottom;
		//console.log("revealertop: " + revealertop);
		//console.log("revealerbottom: " + revealerbottom);
		//console.log("revealerpoint: " + revealerpoint);
		if (revealertop < triggerpoint) {
			revealers[i].classList.add('active')
		} else {
			revealers[i].classList.remove('active');
		};
		/*
		if (revealerbottom < 0 ) {
			revealers[i].classList.remove('active');
		}
		*/
	} 
	};
	
	
	

	
	
});