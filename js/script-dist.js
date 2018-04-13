document.addEventListener("DOMContentLoaded",function(){!function(){function e(e){var t=posy=0;e.pageX||e.pageY?(t=e.pageX,posy=e.pageY):(e.clientX||e.clientY)&&(t=e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft,posy=e.clientY+document.body.scrollTop+document.documentElement.scrollTop),p.x=t,p.y=posy}function t(){a=!(document.body.scrollTop>v)}function n(){h=window.innerWidth,v=window.innerHeight,y.style.height=v+"px",E.width=h,E.height=v}function o(){if(a)for(var e in w.clearRect(0,0,h,v),I)Math.abs(f(p,I[e]))<9e3?(I[e].active=.3,I[e].circle.active=.75):Math.abs(f(p,I[e]))<2e4?(I[e].active=.1,I[e].circle.active=.25):Math.abs(f(p,I[e]))<4e4?(I[e].active=.02,I[e].circle.active=.1):(I[e].active=0,I[e].circle.active=0),d(I[e]),I[e].circle.draw();requestAnimationFrame(o)}function i(e){TweenLite.to(e,1+1*Math.random(),{x:e.originX-50+100*Math.random(),y:e.originY-50+100*Math.random(),ease:Circ.easeInOut,onComplete:function(){i(e)}})}function d(e){if(e.active)for(var t in e.closest)w.beginPath(),w.moveTo(e.x,e.y),w.lineTo(e.closest[t].x,e.closest[t].y),w.strokeStyle="rgba(255,255,255,"+e.active+")",w.stroke()}function g(e,t,n){var o=this;o.pos=e||null,o.radius=t||null,o.color=n||null,this.draw=function(){o.active&&(w.beginPath(),w.arc(o.pos.x,o.pos.y,o.radius,0,2*Math.PI,!1),w.fillStyle="rgba(255,255,255,"+o.active+")",w.fill())}}function f(e,t){return Math.pow(e.x-t.x,2)+Math.pow(e.y-t.y,2)}var h,v,y,E,w,I,p,a=!0;!function(){h=window.innerWidth,v=window.innerHeight,p={x:h/10,y:v/1},(y=document.getElementById("large-header")).style.height=v+"px",(E=document.getElementById("demo-canvas")).width=h,E.height=v,w=E.getContext("2d"),I=[];for(var e=0;e<h;e+=h/20)for(var t=0;t<v;t+=v/10){var n=e+Math.random()*h/10,o=t+Math.random()*v/20,i={x:n,originX:n,y:o,originY:o};I.push(i)}for(var d=0;d<I.length;d++){for(var a=[],l=I[d],c=0;c<I.length;c++){var r=I[c];if(l!=r){for(var s=!1,m=0;m<5;m++)s||null==a[m]&&(a[m]=r,s=!0);for(m=0;m<5;m++)s||f(l,r)<f(l,a[m])&&(a[m]=r,s=!0)}}l.closest=a}for(var d in I){var u=new g(I[d],.75+1.25*Math.random(),"rgba(255,255,255,0.25)");I[d].circle=u}}(),function(){for(var e in o(),I)i(I[e])}(),"ontouchstart"in window||window.addEventListener("mousemove",e),window.addEventListener("scroll",t),window.addEventListener("resize",n)}(),$(".navicon").click(function(){$(this).toggleClass("active"),$("nav").slideToggle("open"),console.log("navicon clicked")}),$("#menu a").click(function(){$(".navicon").removeClass("active"),$("nav").slideToggle("close"),console.log("menu a clicked")}),$(function(){var e="";$(".filter").click(function(){e=$(this).attr("data-rel"),$("#gallery-thumbnails").fadeTo(100,.1),$("#gallery-thumbnails div").not("."+e).fadeOut().removeClass("scaled"),setTimeout(function(){$("."+e).fadeIn().addClass("scaled"),$("#gallery-thumbnails").fadeTo(300,1)},300)})}),$(".control-btn").click(function(){$(".control-btn").removeClass("active"),$(this).addClass("active")}),$(".tile").on("mouseover",function(){$(this).children(".image").css({transform:"scale("+$(this).attr("data-scale")+")"})}).on("mouseout",function(){$(this).children(".image").css({transform:"scale(1)"})}).on("mousemove",function(e){$(this).children(".image").css({"transform-origin":(e.pageX-$(this).offset().left)/$(this).width()*100+"% "+(e.pageY-$(this).offset().top)/$(this).height()*100+"%"})}).each(function(){$(this).append('<div class="image"></div>').children(".image").css({"background-image":"url("+$(this).attr("data-image")+")"})})}),document.addEventListener("DOMContentLoaded",function(){function e(e,t,n){var o=e.offsetTop+e.offsetHeight/2,i=t.offsetTop+t.offsetHeight/2,d=e.offsetLeft+e.offsetWidth/2,a=t.offsetLeft+t.offsetWidth/2,l=Math.abs(i-o),c=Math.abs(a-d),r=Math.sqrt(l*l+c*c),s=180/Math.PI*Math.acos(l/r);if(o<i)var m=(i-o)/2+o;else m=(o-i)/2+i;if(d<a)var u=(a-d)/2+d;else u=(d-a)/2+a;(o<i&&d<a||i<o&&a<d||i<o&&a<d||o<i&&d<a)&&(s*=-1),m-=r/2,n.style["-webkit-transform"]="rotate("+s+"deg)",n.style["-moz-transform"]="rotate("+s+"deg)",n.style["-ms-transform"]="rotate("+s+"deg)",n.style["-o-transform"]="rotate("+s+"deg)",n.style["-transform"]="rotate("+s+"deg)",n.style.top=m+"px",n.style.left=u+"px",n.style.height=r+"px"}function t(){for(var e=document.querySelectorAll(".revealer"),t=0;t<e.length;t++){window.innerHeight;var n=e[t].getBoundingClientRect().top;e[t].getBoundingClientRect().bottom;n<X?e[t].classList.add("active"):e[t].classList.remove("active")}}var n=document.getElementById("dot1"),o=document.getElementById("line1"),i=document.getElementById("dot2"),d=document.getElementById("line2"),a=document.getElementById("dot3"),l=document.getElementById("line3"),c=document.getElementById("dot4"),r=document.getElementById("line4"),s=document.getElementById("dot5"),m=document.getElementById("line5"),u=document.getElementById("dot6"),g=document.getElementById("line6"),f=document.getElementById("dot7"),h=document.getElementById("line7"),v=document.getElementById("dot8"),y=document.getElementById("line8"),E=document.getElementById("dot9"),w=document.getElementById("line9"),I=document.getElementById("dot10"),p=document.getElementById("line10"),B=document.getElementById("dot11"),$=document.getElementById("line11"),b=document.getElementById("dot12"),M=document.getElementById("line12"),L=document.getElementById("dot13"),x=document.getElementById("line13"),T=document.getElementById("dot14"),C=document.getElementById("line14"),k=document.getElementById("dot15");window.addEventListener("resize",function(){e(n,i,o),e(i,a,d),e(a,c,l),e(c,s,r),e(s,u,m),e(u,f,g),e(f,v,h),e(v,E,y),e(E,I,w),e(I,B,p),e(B,b,$),e(b,L,M),e(L,T,x),e(T,k,C)}),setTimeout(function(){e(n,i,o),e(i,a,d),e(a,c,l),e(c,s,r),e(s,u,m),e(u,f,g),e(f,v,h),e(v,E,y),e(E,I,w),e(I,B,p),e(B,b,$),e(b,L,M),e(L,T,x),e(T,k,C)},3e3);var H=.25*window.innerHeight,X=window.innerHeight-H;window.addEventListener("scroll",t),t()});