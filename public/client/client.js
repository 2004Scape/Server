var j8=Object.create;var{getPrototypeOf:w8,defineProperty:A1,getOwnPropertyNames:Y8}=Object;var m8=Object.prototype.hasOwnProperty;var X8=(A,R,_)=>{_=A!=null?j8(w8(A)):{};let E=R||!A||!A.__esModule?A1(_,"default",{value:A,enumerable:!0}):_;for(let I of Y8(A))if(!m8.call(E,I))A1(E,I,{get:()=>A[I],enumerable:!0});return E};var Z8=(A,R)=>()=>(R||A((R={exports:{}}).exports,R),R.exports);var j1=(A,R)=>{for(var _ in R)A1(A,_,{get:R[_],enumerable:!0,configurable:!0,set:(E)=>R[_]=()=>E})};var X1=Z8((I1,H1)=>{(function(A,R){typeof I1==="object"&&typeof H1!=="undefined"?H1.exports=R():typeof define==="function"&&define.amd?define(R):A.Stats=R()})(I1,function(){var A=function(){function R($){return I.appendChild($.dom),$}function _($){for(var L=0;L<I.children.length;L++)I.children[L].style.display=L===$?"block":"none";E=$}var E=0,I=document.createElement("div");I.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",I.addEventListener("click",function($){$.preventDefault(),_(++E%I.children.length)},!1);var H=(performance||Date).now(),N=H,O=0,Q=R(new A.Panel("FPS","#0ff","#002")),U=R(new A.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var G=R(new A.Panel("MB","#f08","#201"));return _(0),{REVISION:16,dom:I,addPanel:R,showPanel:_,begin:function(){H=(performance||Date).now()},end:function(){O++;var $=(performance||Date).now();if(U.update($-H,200),$>N+1000&&(Q.update(1000*O/($-N),100),N=$,O=0,G)){var L=performance.memory;G.update(L.usedJSHeapSize/1048576,L.jsHeapSizeLimit/1048576)}return $},update:function(){H=this.end()},domElement:I,setMode:_}};return A.Panel=function(R,_,E){var I=1/0,H=0,N=Math.round,O=N(window.devicePixelRatio||1),Q=80*O,U=48*O,G=3*O,$=2*O,L=3*O,J=15*O,q=74*O,V=30*O,B=document.createElement("canvas");B.width=Q,B.height=U,B.style.cssText="width:80px;height:48px";var F=B.getContext("2d");return F.font="bold "+9*O+"px Helvetica,Arial,sans-serif",F.textBaseline="top",F.fillStyle=E,F.fillRect(0,0,Q,U),F.fillStyle=_,F.fillText(R,G,$),F.fillRect(L,J,q,V),F.fillStyle=E,F.globalAlpha=0.9,F.fillRect(L,J,q,V),{dom:B,update:function(b,T){I=Math.min(I,b),H=Math.max(H,b),F.fillStyle=E,F.globalAlpha=1,F.fillRect(0,0,Q,J),F.fillStyle=_,F.fillText(N(b)+" "+R+" ("+N(I)+"-"+N(H)+")",G,$),F.drawImage(B,L+O,J,q-O,V,L,J,q-O,V),F.fillRect(L+q-O,J,O,V),F.fillStyle=E,F.globalAlpha=0.9,F.fillRect(L+q-O,J,O,N((1-b/T)*V))}}},A})});import{playWave as b7,setWaveVolume as c6,BZip2 as a6,playMidi as S8,stopMidi as b8,setMidiVolume as d6,MobileKeyboard as T8}from"./deps.js";var C0=document.getElementById("game"),w0=document.getElementById("canvas-overlay"),L0=document.getElementById("canvas"),o=L0.getContext("2d",{willReadFrequently:!0}),e0=document.createElement("canvas"),a0=document.createElement("img"),w6=e0.getContext("2d",{willReadFrequently:!0});class k0{key=0n;next=null;prev=null;unlink(){if(this.prev!=null){if(this.prev.next=this.next,this.next)this.next.prev=this.prev;this.next=null,this.prev=null}}}class Y0 extends k0{next2=null;prev2=null;unlink2(){if(this.prev2!==null){if(this.prev2.next2=this.next2,this.next2)this.next2.prev2=this.prev2;this.next2=null,this.prev2=null}}}class k extends Y0{static pixels=new Int32Array;static width2d=0;static height2d=0;static top=0;static bottom=0;static left=0;static right=0;static boundX=0;static centerX2d=0;static centerY2d=0;static bind(A,R,_){this.pixels=A,this.width2d=R,this.height2d=_,this.setBounds(0,0,R,_)}static resetBounds(){this.left=0,this.top=0,this.right=this.width2d,this.bottom=this.height2d,this.boundX=this.right-1,this.centerX2d=this.right/2|0}static setBounds(A,R,_,E){if(A<0)A=0;if(R<0)R=0;if(_>this.width2d)_=this.width2d;if(E>this.height2d)E=this.height2d;this.top=R,this.bottom=E,this.left=A,this.right=_,this.boundX=this.right-1,this.centerX2d=this.right/2|0,this.centerY2d=this.bottom/2|0}static clear(A=0){let R=this.width2d*this.height2d;for(let _=0;_<R;_++)this.pixels[_]=A}static drawRect(A,R,_,E,I){this.drawHorizontalLine(A,R,I,_),this.drawHorizontalLine(A,R+E-1,I,_),this.drawVerticalLine(A,R,I,E),this.drawVerticalLine(A+_-1,R,I,E)}static drawHorizontalLine(A,R,_,E){if(R<this.top||R>=this.bottom)return;if(A<this.left)E-=this.left-A,A=this.left;if(A+E>this.right)E=this.right-A;let I=A+R*this.width2d;for(let H=0;H<E;H++)this.pixels[I+H]=_}static drawVerticalLine(A,R,_,E){if(A<this.left||A>=this.right)return;if(R<this.top)E-=this.top-R,R=this.top;if(R+E>this.bottom)E=this.bottom-R;let I=A+R*this.width2d;for(let H=0;H<E;H++)this.pixels[I+H*this.width2d]=_}static drawLine(A,R,_,E,I){let H=Math.abs(_-A),N=Math.abs(E-R),O=A<_?1:-1,Q=R<E?1:-1,U=H-N;while(!0){if(A>=this.left&&A<this.right&&R>=this.top&&R<this.bottom)this.pixels[A+R*this.width2d]=I;if(A===_&&R===E)break;let G=2*U;if(G>-N)U=U-N,A=A+O;if(G<H)U=U+H,R=R+Q}}static fillRect2d(A,R,_,E,I){if(A<this.left)_-=this.left-A,A=this.left;if(R<this.top)E-=this.top-R,R=this.top;if(A+_>this.right)_=this.right-A;if(R+E>this.bottom)E=this.bottom-R;let H=this.width2d-_,N=A+R*this.width2d;for(let O=-E;O<0;O++){for(let Q=-_;Q<0;Q++)this.pixels[N++]=I;N+=H}}static fillRectAlpha(A,R,_,E,I,H){if(A<this.left)_-=this.left-A,A=this.left;if(R<this.top)E-=this.top-R,R=this.top;if(A+_>this.right)_=this.right-A;if(R+E>this.bottom)E=this.bottom-R;let N=256-H,O=(I>>16&255)*H,Q=(I>>8&255)*H,U=(I&255)*H,G=this.width2d-_,$=A+R*this.width2d;for(let L=0;L<E;L++){for(let J=-_;J<0;J++){let q=(this.pixels[$]>>16&255)*N,V=(this.pixels[$]>>8&255)*N,B=(this.pixels[$]&255)*N,F=(O+q>>8<<16)+(Q+V>>8<<8)+(U+B>>8);this.pixels[$++]=F}$+=G}}static fillCircle(A,R,_,E,I){let H=256-I,N=(E>>16&255)*I,O=(E>>8&255)*I,Q=(E&255)*I,U=R-_;if(U<0)U=0;let G=R+_;if(G>=this.height2d)G=this.height2d-1;for(let $=U;$<=G;$++){let L=$-R,J=Math.sqrt(_*_-L*L)|0,q=A-J;if(q<0)q=0;let V=A+J;if(V>=this.width2d)V=this.width2d-1;let B=q+$*this.width2d;for(let F=q;F<=V;F++){let b=(this.pixels[B]>>16&255)*H,T=(this.pixels[B]>>8&255)*H,j=(this.pixels[B]&255)*H,w=(N+b>>8<<16)+(O+T>>8<<8)+(Q+j>>8);this.pixels[B++]=w}}}static setPixel(A,R,_){if(A<this.left||A>=this.right||R<this.top||R>=this.bottom)return;this.pixels[A+R*this.width2d]=_}}class m0{sentinel=new k0;current=null;constructor(){this.sentinel.next=this.sentinel,this.sentinel.prev=this.sentinel}addTail(A){if(A.prev)A.unlink();if(A.prev=this.sentinel.prev,A.next=this.sentinel,A.prev)A.prev.next=A;A.next.prev=A}addHead(A){if(A.prev)A.unlink();if(A.prev=this.sentinel,A.next=this.sentinel.next,A.prev.next=A,A.next)A.next.prev=A}removeHead(){let A=this.sentinel.next;if(A===this.sentinel)return null;return A?.unlink(),A}head(){let A=this.sentinel.next;if(A===this.sentinel)return this.current=null,null;return this.current=A?.next||null,A}tail(){let A=this.sentinel.prev;if(A===this.sentinel)return this.current=null,null;return this.current=A?.prev||null,A}next(){let A=this.current;if(A===this.sentinel)return this.current=null,null;return this.current=A?.next||null,A}prev(){let A=this.current;if(A===this.sentinel)return this.current=null,null;return this.current=A?.prev||null,A}clear(){while(!0){let A=this.sentinel.next;if(A===this.sentinel)return;A?.unlink()}}}var A6=async(A)=>new Promise((R)=>setTimeout(R,A)),Y6=async(A)=>new Uint8Array(await(await fetch(A)).arrayBuffer());function R1(A,R,_,E,I){while(I--)_[E++]=A[R++]}function w1(A){let R=0n;for(let _=0;_<A.length;_++)R=R<<8n|BigInt(A[_]);return R}function Y1(A){let R=[];while(A>0n)R.unshift(Number(A&0xffn)),A>>=8n;if(R[0]&128)R.unshift(0);return new Uint8Array(R)}function m1(A,R,_){let E=1n;while(R>0n){if(R%2n===1n)E=E*A%_;A=A*A%_,R>>=1n}return E}class s extends Y0{static CRC32_POLYNOMIAL=3988292384;static crctable=new Int32Array(256);static bitmask=new Uint32Array(33);static cacheMin=new m0;static cacheMid=new m0;static cacheMax=new m0;static cacheMinCount=0;static cacheMidCount=0;static cacheMaxCount=0;static{for(let A=0;A<32;A++)s.bitmask[A]=(1<<A)-1;s.bitmask[32]=4294967295;for(let A=0;A<256;A++){let R=A;for(let _=0;_<8;_++)if((R&1)===1)R=R>>>1^s.CRC32_POLYNOMIAL;else R>>>=1;s.crctable[A]=R}}static crc32(A){let R=4294967295;for(let _=0;_<A.length;_++)R=R>>>8^s.crctable[(R^A[_])&255];return~R}view;data;pos=0;bitPos=0;random=null;constructor(A){if(!A)throw new Error;super();if(A instanceof Int8Array)this.data=new Uint8Array(A);else this.data=A;this.view=new DataView(this.data.buffer,this.data.byteOffset,this.data.byteLength)}get length(){return this.view.byteLength}get available(){return this.length-this.pos}static alloc(A){let R=null;if(A===0&&s.cacheMinCount>0)s.cacheMinCount--,R=s.cacheMin.removeHead();else if(A===1&&s.cacheMidCount>0)s.cacheMidCount--,R=s.cacheMid.removeHead();else if(A===2&&s.cacheMaxCount>0)s.cacheMaxCount--,R=s.cacheMax.removeHead();if(R)return R.pos=0,R;if(A===0)return new s(new Uint8Array(100));else if(A===1)return new s(new Uint8Array(5000));return new s(new Uint8Array(30000))}release(){if(this.pos=0,this.view.byteLength===100&&s.cacheMinCount<1000)s.cacheMin.addTail(this),s.cacheMinCount++;else if(this.view.byteLength===5000&&s.cacheMidCount<250)s.cacheMid.addTail(this),s.cacheMidCount++;else if(this.view.byteLength===30000&&s.cacheMaxCount<50)s.cacheMax.addTail(this),s.cacheMaxCount++}g1(){return this.view.getUint8(this.pos++)}g1b(){return this.view.getInt8(this.pos++)}g2(){let A=this.view.getUint16(this.pos);return this.pos+=2,A}g2b(){let A=this.view.getInt16(this.pos);return this.pos+=2,A}g3(){let A=this.view.getUint8(this.pos++)<<16|this.view.getUint16(this.pos);return this.pos+=2,A}g4(){let A=this.view.getInt32(this.pos);return this.pos+=4,A}g8(){let A=this.view.getBigInt64(this.pos);return this.pos+=8,A}gsmart(){return this.view.getUint8(this.pos)<128?this.g1()-64:this.g2()-49152}gsmarts(){return this.view.getUint8(this.pos)<128?this.g1():this.g2()-32768}gjstr(){let A=this.view,R=A.byteLength,_="",E;while((E=A.getUint8(this.pos++))!==10&&this.pos<R)_+=String.fromCharCode(E);return _}gdata(A,R,_){_.set(this.data.subarray(this.pos,this.pos+A),R),this.pos+=A}p1isaac(A){this.view.setUint8(this.pos++,A+(this.random?.nextInt??0)&255)}p1(A){this.view.setUint8(this.pos++,A)}p2(A){this.view.setUint16(this.pos,A),this.pos+=2}ip2(A){this.view.setUint16(this.pos,A,!0),this.pos+=2}p3(A){this.view.setUint8(this.pos++,A>>16),this.view.setUint16(this.pos,A),this.pos+=2}p4(A){this.view.setInt32(this.pos,A),this.pos+=4}ip4(A){this.view.setInt32(this.pos,A,!0),this.pos+=4}p8(A){this.view.setBigInt64(this.pos,A),this.pos+=8}pjstr(A){let R=this.view,_=A.length;for(let E=0;E<_;E++)R.setUint8(this.pos++,A.charCodeAt(E));R.setUint8(this.pos++,10)}pdata(A,R,_){this.data.set(A.subarray(_,_+R),this.pos),this.pos+=R-_}psize1(A){this.view.setUint8(this.pos-A-1,A)}bits(){this.bitPos=this.pos<<3}bytes(){this.pos=this.bitPos+7>>>3}gBit(A){let R=this.bitPos>>>3,_=8-(this.bitPos&7),E=0;this.bitPos+=A;for(;A>_;_=8)E+=(this.view.getUint8(R++)&s.bitmask[_])<<A-_,A-=_;if(A===_)E+=this.view.getUint8(R)&s.bitmask[_];else E+=this.view.getUint8(R)>>>_-A&s.bitmask[A];return E}rsaenc(A,R){let _=this.pos;this.pos=0;let E=new Uint8Array(_);this.gdata(_,0,E);let I=w1(E),H=m1(I,R,A),N=Y1(H);this.pos=0,this.p1(N.length),this.pdata(N,N.length,0)}}class $0 extends Y0{pixels;width2d;height2d;cropX;cropY;cropW;cropH;rgbPal;constructor(A,R,_){super();this.pixels=new Int8Array(A*R),this.width2d=this.cropW=A,this.height2d=this.cropH=R,this.cropX=this.cropY=0,this.rgbPal=_}static fromArchive(A,R,_=0){let E=new s(A.read(R+".dat")),I=new s(A.read("index.dat"));I.pos=E.g2();let H=I.g2(),N=I.g2(),O=I.g1(),Q=new Int32Array(O);for(let B=1;B<O;B++)if(Q[B]=I.g3(),Q[B]===0)Q[B]=1;for(let B=0;B<_;B++)I.pos+=2,E.pos+=I.g2()*I.g2(),I.pos+=1;if(E.pos>E.length||I.pos>I.length)throw new Error;let U=I.g1(),G=I.g1(),$=I.g2(),L=I.g2(),J=new $0($,L,Q);J.cropX=U,J.cropY=G,J.cropW=H,J.cropH=N;let q=J.pixels,V=I.g1();if(V===0){let B=J.width2d*J.height2d;for(let F=0;F<B;F++)q[F]=E.g1b()}else if(V===1){let{width2d:B,height2d:F}=J;for(let b=0;b<B;b++)for(let T=0;T<F;T++)q[b+T*B]=E.g1b()}return J}draw(A,R){A|=0,R|=0,A+=this.cropX,R+=this.cropY;let _=A+R*k.width2d,E=0,I=this.height2d,H=this.width2d,N=k.width2d-H,O=0;if(R<k.top){let Q=k.top-R;I-=Q,R=k.top,E+=Q*H,_+=Q*k.width2d}if(R+I>k.bottom)I-=R+I-k.bottom;if(A<k.left){let Q=k.left-A;H-=Q,A=k.left,E+=Q,_+=Q,O+=Q,N+=Q}if(A+H>k.right){let Q=A+H-k.right;H-=Q,O+=Q,N+=Q}if(H>0&&I>0)this.copyImage(H,I,this.pixels,E,O,k.pixels,_,N)}flipHorizontally(){let A=this.pixels,R=this.width2d,_=this.height2d;for(let E=0;E<_;E++){let I=R/2|0;for(let H=0;H<I;H++){let N=H+E*R,O=R-H-1+E*R,Q=A[N];A[N]=A[O],A[O]=Q}}}flipVertically(){let A=this.pixels,R=this.width2d,_=this.height2d;for(let E=0;E<(_/2|0);E++)for(let I=0;I<R;I++){let H=I+E*R,N=I+(_-E-1)*R,O=A[H];A[H]=A[N],A[N]=O}}translate2d(A,R,_){for(let E=0;E<this.rgbPal.length;E++){let I=this.rgbPal[E]>>16&255;if(I+=A,I<0)I=0;else if(I>255)I=255;let H=this.rgbPal[E]>>8&255;if(H+=R,H<0)H=0;else if(H>255)H=255;let N=this.rgbPal[E]&255;if(N+=_,N<0)N=0;else if(N>255)N=255;this.rgbPal[E]=(I<<16)+(H<<8)+N}}shrink(){this.cropW|=0,this.cropH|=0,this.cropW/=2,this.cropH/=2,this.cropW|=0,this.cropH|=0;let A=new Int8Array(this.cropW*this.cropH),R=0;for(let _=0;_<this.height2d;_++)for(let E=0;E<this.width2d;E++)A[(E+this.cropX>>1)+(_+this.cropY>>1)*this.cropW]=this.pixels[R++];this.pixels=A,this.width2d=this.cropW,this.height2d=this.cropH,this.cropX=0,this.cropY=0}crop(){if(this.width2d===this.cropW&&this.height2d===this.cropH)return;let A=new Int8Array(this.cropW*this.cropH),R=0;for(let _=0;_<this.height2d;_++)for(let E=0;E<this.width2d;E++)A[E+this.cropX+(_+this.cropY)*this.cropW]=this.pixels[R++];this.pixels=A,this.width2d=this.cropW,this.height2d=this.cropH,this.cropX=0,this.cropY=0}copyImage(A,R,_,E,I,H,N,O){let Q=-(A>>2);A=-(A&3);for(let U=-R;U<0;U++){for(let G=Q;G<0;G++){let $=_[E++];if($===0)N++;else H[N++]=this.rgbPal[$&255];if($=_[E++],$===0)N++;else H[N++]=this.rgbPal[$&255];if($=_[E++],$===0)N++;else H[N++]=this.rgbPal[$&255];if($=_[E++],$===0)N++;else H[N++]=this.rgbPal[$&255]}for(let G=A;G<0;G++){let $=_[E++];if($===0)N++;else H[N++]=this.rgbPal[$&255]}N+=O,E+=I}}clip(A,R,_,E){try{let I=this.width2d,H=this.height2d,N=0,O=0,Q=(I<<16)/_|0,U=(H<<16)/E|0,G=this.cropW,$=this.cropH,L=(G<<16)/_|0,J=($<<16)/E|0;if(A=A+(this.cropX*_+G-1)/G|0,R=R+(this.cropY*E+$-1)/$|0,this.cropX*_%G!=0)N=(G-this.cropX*_%G<<16)/_|0;if(this.cropY*E%$!=0)O=($-this.cropY*E%$<<16)/E|0;_=_*(this.width2d-(N>>16))/G|0,E=E*(this.height2d-(O>>16))/$|0;let q=A+R*k.width2d,V=k.width2d-_,B;if(R<k.top)B=k.top-R,E-=B,R=0,q+=B*k.width2d,O+=J*B;if(R+E>k.bottom)E-=R+E-k.bottom;if(A<k.left)B=k.left-A,_-=B,A=0,q+=B,N+=L*B,V+=B;if(A+_>k.right)B=A+_-k.right,_-=B,V+=B;this.plot_scale(k.pixels,this.pixels,this.rgbPal,N,O,q,V,_,E,L,J,I)}catch(I){}}plot_scale(A,R,_,E,I,H,N,O,Q,U,G,$){try{let L=E;for(let J=-Q;J<0;J++){let q=(I>>16)*$;for(let V=-O;V<0;V++){let B=R[(E>>16)+q];if(B==0)H++;else A[H++]=_[B&255];E+=U}I+=G,E=L,H+=N}}catch(L){}}}class C{canvas;static renderer;constructor(A){this.canvas=A}static resetRenderer(){if(C.renderer)C.renderer.destroy(),C.renderer.canvas.remove(),C.renderer=void 0}static resize(A,R){C.renderer?.resize(A,R)}static startFrame(){C.renderer?.startFrame()}static endFrame(){C.renderer?.endFrame()}static updateTexture(A){C.renderer?.updateTexture(A)}static setBrightness(A){C.renderer?.setBrightness(A)}static renderPixMap(A,R,_){if(C.renderer)return C.renderer.renderPixMap(A,R,_);return!1}static getSceneClearColor(){if(C.renderer)return-1;return 0}static startRenderScene(){C.renderer?.startRenderScene()}static endRenderScene(){C.renderer?.endRenderScene()}static fillTriangle(A,R,_,E,I,H,N){if(C.renderer)return C.renderer.fillTriangle(A,R,_,E,I,H,N);return!1}static fillGouraudTriangle(A,R,_,E,I,H,N,O,Q){if(C.renderer)return C.renderer.fillGouraudTriangle(A,R,_,E,I,H,N,O,Q);return!1}static fillTexturedTriangle(A,R,_,E,I,H,N,O,Q,U,G,$,L,J,q,V,B,F,b){if(C.renderer)return C.renderer.fillTexturedTriangle(A,R,_,E,I,H,N,O,Q,U,G,$,L,J,q,V,B,F,b);return!1}static drawTileUnderlay(A,R,_,E,I){if(C.renderer)return C.renderer.drawTileUnderlay(A,R,_,E,I);return!1}static drawTileOverlay(A,R,_,E){if(C.renderer)return C.renderer.drawTileOverlay(A,R,_,E);return!1}static startDrawModel(A,R,_,E,I,H){if(C.renderer)C.renderer.startDrawModel(A,R,_,E,I,H)}static endDrawModel(A,R,_,E,I,H){if(C.renderer)C.renderer.endDrawModel(A,R,_,E,I,H)}static drawModelTriangle(A,R){if(C.renderer)return C.renderer.drawModelTriangle(A,R);return!1}resize(A,R){this.canvas.width=A,this.canvas.height=R}}class p extends Array{constructor(A,R){super(A);for(let _=0;_<A;_++)this[_]=R}}class _1 extends Array{constructor(A,R,_){super(A);for(let E=0;E<A;E++){this[E]=new Array(R);for(let I=0;I<R;I++)this[E][I]=_}}}class J6 extends Array{constructor(A,R,_,E){super(A);for(let I=0;I<A;I++){this[I]=new Array(R);for(let H=0;H<R;H++){this[I][H]=new Array(_);for(let N=0;N<_;N++)this[I][H][N]=E}}}}class m6 extends Array{constructor(A,R,_,E,I){super(A);for(let H=0;H<A;H++){this[H]=new Array(R);for(let N=0;N<R;N++){this[H][N]=new Array(_);for(let O=0;O<_;O++){this[H][N][O]=new Array(E);for(let Q=0;Q<E;Q++)this[H][N][O][Q]=I}}}}}class r0 extends Array{constructor(A,R,_){super(A);for(let E=0;E<A;E++){this[E]=new Array(R);for(let I=0;I<R;I++)this[E][I]=new Uint8Array(_)}}}class M0 extends Array{constructor(A,R){super(A);for(let _=0;_<A;_++)this[_]=new Int32Array(R)}}class d0 extends Array{constructor(A,R,_){super(A);for(let E=0;E<A;E++){this[E]=new Array(R);for(let I=0;I<R;I++)this[E][I]=new Int32Array(_)}}}class m extends k{static lowMemory=!1;static reciprocal15=new Int32Array(512);static reciprocal16=new Int32Array(2048);static sin=new Int32Array(2048);static cos=new Int32Array(2048);static hslPal=new Int32Array(65536);static textures=new p(50,null);static textureCount=0;static lineOffset=new Int32Array;static centerX=0;static centerY=0;static jagged=!0;static clipX=!1;static alpha=0;static texelPool=null;static activeTexels=new p(50,null);static poolSize=0;static cycle=0;static textureCycle=new Int32Array(50);static texPal=new p(50,null);static opaque=!1;static textureTranslucent=new p(50,!1);static averageTextureRGB=new Int32Array(50);static{for(let A=1;A<512;A++)this.reciprocal15[A]=32768/A|0;for(let A=1;A<2048;A++)this.reciprocal16[A]=65536/A|0;for(let A=0;A<2048;A++)this.sin[A]=Math.sin(A*0.0030679615757712823)*65536|0,this.cos[A]=Math.cos(A*0.0030679615757712823)*65536|0}static init2D(){this.lineOffset=new Int32Array(k.height2d);for(let A=0;A<k.height2d;A++)this.lineOffset[A]=k.width2d*A;this.centerX=k.width2d/2|0,this.centerY=k.height2d/2|0}static init3D(A,R){this.lineOffset=new Int32Array(R);for(let _=0;_<R;_++)this.lineOffset[_]=A*_;this.centerX=A/2|0,this.centerY=R/2|0}static clearTexels(){this.texelPool=null,this.activeTexels.fill(null)}static unpackTextures(A){this.textureCount=0;for(let R=0;R<50;R++)try{if(this.textures[R]=$0.fromArchive(A,R.toString()),this.lowMemory&&this.textures[R]?.cropW===128)this.textures[R]?.shrink();else this.textures[R]?.crop();this.textureCount++}catch(_){}}static getAverageTextureRGB(A){if(this.averageTextureRGB[A]!==0)return this.averageTextureRGB[A];let R=this.texPal[A];if(!R)return 0;let _=0,E=0,I=0,H=R.length;for(let O=0;O<H;O++)_+=R[O]>>16&255,E+=R[O]>>8&255,I+=R[O]&255;let N=((_/H|0)<<16)+((E/H|0)<<8)+(I/H|0);if(N=this.setGamma(N,1.4),N===0)N=1;return this.averageTextureRGB[A]=N,N}static setBrightness(A){let R=A+Math.random()*0.03-0.015,_=0;for(let E=0;E<512;E++){let I=(E/8|0)/64+0.0078125,H=(E&7)/8+0.0625;for(let N=0;N<128;N++){let O=N/128,Q=O,U=O,G=O;if(H!==0){let V;if(O<0.5)V=O*(H+1);else V=O+H-O*H;let B=O*2-V,F=I+0.3333333333333333;if(F>1)F--;let b=I-0.3333333333333333;if(b<0)b++;if(F*6<1)Q=B+(V-B)*6*F;else if(F*2<1)Q=V;else if(F*3<2)Q=B+(V-B)*(0.6666666666666666-F)*6;else Q=B;if(I*6<1)U=B+(V-B)*6*I;else if(I*2<1)U=V;else if(I*3<2)U=B+(V-B)*(0.6666666666666666-I)*6;else U=B;if(b*6<1)G=B+(V-B)*6*b;else if(b*2<1)G=V;else if(b*3<2)G=B+(V-B)*(0.6666666666666666-b)*6;else G=B}let $=Q*256|0,L=U*256|0,J=G*256|0,q=($<<16)+(L<<8)+J;this.hslPal[_++]=this.setGamma(q,R)}}for(let E=0;E<50;E++){let I=this.textures[E];if(!I)continue;let H=I.rgbPal;this.texPal[E]=new Int32Array(H.length);for(let N=0;N<H.length;N++){let O=this.texPal[E];if(!O)continue;O[N]=this.setGamma(H[N],R)}}for(let E=0;E<50;E++)this.pushTexture(E);C.setBrightness(R)}static setGamma(A,R){let _=(A>>16)/256,E=(A>>8&255)/256,I=(A&255)/256,H=Math.pow(_,R),N=Math.pow(E,R),O=Math.pow(I,R),Q=H*256|0,U=N*256|0,G=O*256|0;return(Q<<16)+(U<<8)+G}static initPool(A){if(this.texelPool)return;if(this.poolSize=A,this.lowMemory)this.texelPool=new M0(A,16384);else this.texelPool=new M0(A,65536);this.activeTexels.fill(null)}static fillGouraudTriangle(A,R,_,E,I,H,N,O,Q){if(C.fillGouraudTriangle(A,R,_,E,I,H,N,O,Q))return;let U=0,G=0;if(I!==E)U=(R-A<<16)/(I-E)|0,G=(O-N<<15)/(I-E)|0;let $=0,L=0;if(H!==I)$=(_-R<<16)/(H-I)|0,L=(Q-O<<15)/(H-I)|0;let J=0,q=0;if(H!==E)J=(A-_<<16)/(E-H)|0,q=(N-Q<<15)/(E-H)|0;if(E<=I&&E<=H){if(E<k.bottom){if(I>k.bottom)I=k.bottom;if(H>k.bottom)H=k.bottom;if(I<H){if(_=A<<=16,Q=N<<=15,E<0)_-=J*E,A-=U*E,Q-=q*E,N-=G*E,E=0;if(R<<=16,O<<=15,I<0)R-=$*I,O-=L*I,I=0;if(E!==I&&J<U||E===I&&J>$){H-=I,I-=E,E=m.lineOffset[E];while(!0){if(I--,I<0)while(!0){if(H--,H<0)return;this.drawGouraudScanline(_>>16,R>>16,Q>>7,O>>7,k.pixels,E,0),_+=J,R+=$,Q+=q,O+=L,E+=k.width2d}this.drawGouraudScanline(_>>16,A>>16,Q>>7,N>>7,k.pixels,E,0),_+=J,A+=U,Q+=q,N+=G,E+=k.width2d}}else{H-=I,I-=E,E=m.lineOffset[E];while(!0){if(I--,I<0)while(!0){if(H--,H<0)return;this.drawGouraudScanline(R>>16,_>>16,O>>7,Q>>7,k.pixels,E,0),_+=J,R+=$,Q+=q,O+=L,E+=k.width2d}this.drawGouraudScanline(A>>16,_>>16,N>>7,Q>>7,k.pixels,E,0),_+=J,A+=U,Q+=q,N+=G,E+=k.width2d}}}else{if(R=A<<=16,O=N<<=15,E<0)R-=J*E,A-=U*E,O-=q*E,N-=G*E,E=0;if(_<<=16,Q<<=15,H<0)_-=$*H,Q-=L*H,H=0;if(E!==H&&J<U||E===H&&$>U){I-=H,H-=E,E=m.lineOffset[E];while(!0){if(H--,H<0)while(!0){if(I--,I<0)return;this.drawGouraudScanline(_>>16,A>>16,Q>>7,N>>7,k.pixels,E,0),_+=$,A+=U,Q+=L,N+=G,E+=k.width2d}this.drawGouraudScanline(R>>16,A>>16,O>>7,N>>7,k.pixels,E,0),R+=J,A+=U,O+=q,N+=G,E+=k.width2d}}else{I-=H,H-=E,E=m.lineOffset[E];while(!0){if(H--,H<0)while(!0){if(I--,I<0)return;this.drawGouraudScanline(A>>16,_>>16,N>>7,Q>>7,k.pixels,E,0),_+=$,A+=U,Q+=L,N+=G,E+=k.width2d}this.drawGouraudScanline(A>>16,R>>16,N>>7,O>>7,k.pixels,E,0),R+=J,A+=U,O+=q,N+=G,E+=k.width2d}}}}}else if(I<=H){if(I<k.bottom){if(H>k.bottom)H=k.bottom;if(E>k.bottom)E=k.bottom;if(H<E){if(A=R<<=16,N=O<<=15,I<0)A-=U*I,R-=$*I,N-=G*I,O-=L*I,I=0;if(_<<=16,Q<<=15,H<0)_-=J*H,Q-=q*H,H=0;if(I!==H&&U<$||I===H&&U>J){E-=H,H-=I,I=m.lineOffset[I];while(!0){if(H--,H<0)while(!0){if(E--,E<0)return;this.drawGouraudScanline(A>>16,_>>16,N>>7,Q>>7,k.pixels,I,0),A+=U,_+=J,N+=G,Q+=q,I+=k.width2d}this.drawGouraudScanline(A>>16,R>>16,N>>7,O>>7,k.pixels,I,0),A+=U,R+=$,N+=G,O+=L,I+=k.width2d}}else{E-=H,H-=I,I=m.lineOffset[I];while(!0){if(H--,H<0)while(!0){if(E--,E<0)return;this.drawGouraudScanline(_>>16,A>>16,Q>>7,N>>7,k.pixels,I,0),A+=U,_+=J,N+=G,Q+=q,I+=k.width2d}this.drawGouraudScanline(R>>16,A>>16,O>>7,N>>7,k.pixels,I,0),A+=U,R+=$,N+=G,O+=L,I+=k.width2d}}}else{if(_=R<<=16,Q=O<<=15,I<0)_-=U*I,R-=$*I,Q-=G*I,O-=L*I,I=0;if(A<<=16,N<<=15,E<0)A-=J*E,N-=q*E,E=0;if(H-=E,E-=I,I=m.lineOffset[I],U<$)while(!0){if(E--,E<0)while(!0){if(H--,H<0)return;this.drawGouraudScanline(A>>16,R>>16,N>>7,O>>7,k.pixels,I,0),A+=J,R+=$,N+=q,O+=L,I+=k.width2d}this.drawGouraudScanline(_>>16,R>>16,Q>>7,O>>7,k.pixels,I,0),_+=U,R+=$,Q+=G,O+=L,I+=k.width2d}else while(!0){if(E--,E<0)while(!0){if(H--,H<0)return;this.drawGouraudScanline(R>>16,A>>16,O>>7,N>>7,k.pixels,I,0),A+=J,R+=$,N+=q,O+=L,I+=k.width2d}this.drawGouraudScanline(R>>16,_>>16,O>>7,Q>>7,k.pixels,I,0),_+=U,R+=$,Q+=G,O+=L,I+=k.width2d}}}}else if(H<k.bottom){if(E>k.bottom)E=k.bottom;if(I>k.bottom)I=k.bottom;if(E<I){if(R=_<<=16,O=Q<<=15,H<0)R-=$*H,_-=J*H,O-=L*H,Q-=q*H,H=0;if(A<<=16,N<<=15,E<0)A-=U*E,N-=G*E,E=0;if(I-=E,E-=H,H=m.lineOffset[H],$<J)while(!0){if(E--,E<0)while(!0){if(I--,I<0)return;this.drawGouraudScanline(R>>16,A>>16,O>>7,N>>7,k.pixels,H,0),R+=$,A+=U,O+=L,N+=G,H+=k.width2d}this.drawGouraudScanline(R>>16,_>>16,O>>7,Q>>7,k.pixels,H,0),R+=$,_+=J,O+=L,Q+=q,H+=k.width2d}else while(!0){if(E--,E<0)while(!0){if(I--,I<0)return;this.drawGouraudScanline(A>>16,R>>16,N>>7,O>>7,k.pixels,H,0),R+=$,A+=U,O+=L,N+=G,H+=k.width2d}this.drawGouraudScanline(_>>16,R>>16,Q>>7,O>>7,k.pixels,H,0),R+=$,_+=J,O+=L,Q+=q,H+=k.width2d}}else{if(A=_<<=16,N=Q<<=15,H<0)A-=$*H,_-=J*H,N-=L*H,Q-=q*H,H=0;if(R<<=16,O<<=15,I<0)R-=U*I,O-=G*I,I=0;if(E-=I,I-=H,H=m.lineOffset[H],$<J)while(!0){if(I--,I<0)while(!0){if(E--,E<0)return;this.drawGouraudScanline(R>>16,_>>16,O>>7,Q>>7,k.pixels,H,0),R+=U,_+=J,O+=G,Q+=q,H+=k.width2d}this.drawGouraudScanline(A>>16,_>>16,N>>7,Q>>7,k.pixels,H,0),A+=$,_+=J,N+=L,Q+=q,H+=k.width2d}else while(!0){if(I--,I<0)while(!0){if(E--,E<0)return;this.drawGouraudScanline(_>>16,R>>16,Q>>7,O>>7,k.pixels,H,0),R+=U,_+=J,O+=G,Q+=q,H+=k.width2d}this.drawGouraudScanline(_>>16,A>>16,Q>>7,N>>7,k.pixels,H,0),A+=$,_+=J,N+=L,Q+=q,H+=k.width2d}}}}static drawGouraudScanline(A,R,_,E,I,H,N){let O;if(m.jagged){let Q;if(m.clipX){if(R-A>3)Q=(E-_)/(R-A)|0;else Q=0;if(R>k.boundX)R=k.boundX;if(A<0)_-=A*Q,A=0;if(A>=R)return;H+=A,N=R-A>>2,Q<<=2}else if(A<R)if(H+=A,N=R-A>>2,N>0)Q=(E-_)*m.reciprocal15[N]>>15;else Q=0;else return;if(m.alpha===0)while(!0){if(N--,N<0){if(N=R-A&3,N>0){O=m.hslPal[_>>8];do I[H++]=O,N--;while(N>0);return}break}O=m.hslPal[_>>8],_+=Q,I[H++]=O,I[H++]=O,I[H++]=O,I[H++]=O}else{let U=m.alpha,G=256-m.alpha;while(!0){if(N--,N<0){if(N=R-A&3,N>0){O=m.hslPal[_>>8],O=((O&16711935)*G>>8&16711935)+((O&65280)*G>>8&65280);do I[H++]=O+((I[H]&16711935)*U>>8&16711935)+((I[H]&65280)*U>>8&65280),N--;while(N>0)}break}O=m.hslPal[_>>8],_+=Q,O=((O&16711935)*G>>8&16711935)+((O&65280)*G>>8&65280),I[H++]=O+((I[H]&16711935)*U>>8&16711935)+((I[H]&65280)*U>>8&65280),I[H++]=O+((I[H]&16711935)*U>>8&16711935)+((I[H]&65280)*U>>8&65280),I[H++]=O+((I[H]&16711935)*U>>8&16711935)+((I[H]&65280)*U>>8&65280),I[H++]=O+((I[H]&16711935)*U>>8&16711935)+((I[H]&65280)*U>>8&65280)}}}else if(A<R){let Q=(E-_)/(R-A)|0;if(m.clipX){if(R>k.boundX)R=k.boundX;if(A<0)_-=A*Q,A=0;if(A>=R)return}if(H+=A,N=R-A,m.alpha===0)do I[H++]=m.hslPal[_>>8],_+=Q,N--;while(N>0);else{let U=m.alpha,G=256-m.alpha;do O=m.hslPal[_>>8],_+=Q,O=((O&16711935)*G>>8&16711935)+((O&65280)*G>>8&65280),I[H++]=O+((I[H]&16711935)*U>>8&16711935)+((I[H]&65280)*U>>8&65280),N--;while(N>0)}}}static fillTriangle(A,R,_,E,I,H,N){if(C.fillTriangle(A,R,_,E,I,H,N))return;let O=0;if(I!==E)O=(R-A<<16)/(I-E)|0;let Q=0;if(H!==I)Q=(_-R<<16)/(H-I)|0;let U=0;if(H!==E)U=(A-_<<16)/(E-H)|0;if(E<=I&&E<=H){if(E<k.bottom){if(I>k.bottom)I=k.bottom;if(H>k.bottom)H=k.bottom;if(I<H){if(_=A<<=16,E<0)_-=U*E,A-=O*E,E=0;if(R<<=16,I<0)R-=Q*I,I=0;if(E!==I&&U<O||E===I&&U>Q){H-=I,I-=E,E=this.lineOffset[E];while(!0){if(I--,I<0)while(!0){if(H--,H<0)return;this.drawScanline(_>>16,R>>16,k.pixels,E,N),_+=U,R+=Q,E+=k.width2d}this.drawScanline(_>>16,A>>16,k.pixels,E,N),_+=U,A+=O,E+=k.width2d}}else{H-=I,I-=E,E=this.lineOffset[E];while(!0){if(I--,I<0)while(!0){if(H--,H<0)return;this.drawScanline(R>>16,_>>16,k.pixels,E,N),_+=U,R+=Q,E+=k.width2d}this.drawScanline(A>>16,_>>16,k.pixels,E,N),_+=U,A+=O,E+=k.width2d}}}else{if(R=A<<=16,E<0)R-=U*E,A-=O*E,E=0;if(_<<=16,H<0)_-=Q*H,H=0;if(E!==H&&U<O||E===H&&Q>O){I-=H,H-=E,E=this.lineOffset[E];while(!0){if(H--,H<0)while(!0){if(I--,I<0)return;this.drawScanline(_>>16,A>>16,k.pixels,E,N),_+=Q,A+=O,E+=k.width2d}this.drawScanline(R>>16,A>>16,k.pixels,E,N),R+=U,A+=O,E+=k.width2d}}else{I-=H,H-=E,E=this.lineOffset[E];while(!0){if(H--,H<0)while(!0){if(I--,I<0)return;this.drawScanline(A>>16,_>>16,k.pixels,E,N),_+=Q,A+=O,E+=k.width2d}this.drawScanline(A>>16,R>>16,k.pixels,E,N),R+=U,A+=O,E+=k.width2d}}}}}else if(I<=H){if(I<k.bottom){if(H>k.bottom)H=k.bottom;if(E>k.bottom)E=k.bottom;if(H<E){if(A=R<<=16,I<0)A-=O*I,R-=Q*I,I=0;if(_<<=16,H<0)_-=U*H,H=0;if(I!==H&&O<Q||I===H&&O>U){E-=H,H-=I,I=this.lineOffset[I];while(!0){if(H--,H<0)while(!0){if(E--,E<0)return;this.drawScanline(A>>16,_>>16,k.pixels,I,N),A+=O,_+=U,I+=k.width2d}this.drawScanline(A>>16,R>>16,k.pixels,I,N),A+=O,R+=Q,I+=k.width2d}}else{E-=H,H-=I,I=this.lineOffset[I];while(!0){if(H--,H<0)while(!0){if(E--,E<0)return;this.drawScanline(_>>16,A>>16,k.pixels,I,N),A+=O,_+=U,I+=k.width2d}this.drawScanline(R>>16,A>>16,k.pixels,I,N),A+=O,R+=Q,I+=k.width2d}}}else{if(_=R<<=16,I<0)_-=O*I,R-=Q*I,I=0;if(A<<=16,E<0)A-=U*E,E=0;if(O<Q){H-=E,E-=I,I=this.lineOffset[I];while(!0){if(E--,E<0)while(!0){if(H--,H<0)return;this.drawScanline(A>>16,R>>16,k.pixels,I,N),A+=U,R+=Q,I+=k.width2d}this.drawScanline(_>>16,R>>16,k.pixels,I,N),_+=O,R+=Q,I+=k.width2d}}else{H-=E,E-=I,I=this.lineOffset[I];while(!0){if(E--,E<0)while(!0){if(H--,H<0)return;this.drawScanline(R>>16,A>>16,k.pixels,I,N),A+=U,R+=Q,I+=k.width2d}this.drawScanline(R>>16,_>>16,k.pixels,I,N),_+=O,R+=Q,I+=k.width2d}}}}}else if(H<k.bottom){if(E>k.bottom)E=k.bottom;if(I>k.bottom)I=k.bottom;if(E<I){if(R=_<<=16,H<0)R-=Q*H,_-=U*H,H=0;if(A<<=16,E<0)A-=O*E,E=0;if(Q<U){I-=E,E-=H,H=this.lineOffset[H];while(!0){if(E--,E<0)while(!0){if(I--,I<0)return;this.drawScanline(R>>16,A>>16,k.pixels,H,N),R+=Q,A+=O,H+=k.width2d}this.drawScanline(R>>16,_>>16,k.pixels,H,N),R+=Q,_+=U,H+=k.width2d}}else{I-=E,E-=H,H=this.lineOffset[H];while(!0){if(E--,E<0)while(!0){if(I--,I<0)return;this.drawScanline(A>>16,R>>16,k.pixels,H,N),R+=Q,A+=O,H+=k.width2d}this.drawScanline(_>>16,R>>16,k.pixels,H,N),R+=Q,_+=U,H+=k.width2d}}}else{if(A=_<<=16,H<0)A-=Q*H,_-=U*H,H=0;if(R<<=16,I<0)R-=O*I,I=0;if(Q<U){E-=I,I-=H,H=this.lineOffset[H];while(!0){if(I--,I<0)while(!0){if(E--,E<0)return;this.drawScanline(R>>16,_>>16,k.pixels,H,N),R+=O,_+=U,H+=k.width2d}this.drawScanline(A>>16,_>>16,k.pixels,H,N),A+=Q,_+=U,H+=k.width2d}}else{E-=I,I-=H,H=this.lineOffset[H];while(!0){if(I--,I<0)while(!0){if(E--,E<0)return;this.drawScanline(_>>16,R>>16,k.pixels,H,N),R+=O,_+=U,H+=k.width2d}this.drawScanline(_>>16,A>>16,k.pixels,H,N),A+=Q,_+=U,H+=k.width2d}}}}}static fillTexturedTriangle(A,R,_,E,I,H,N,O,Q,U,G,$,L,J,q,V,B,F,b){if(C.fillTexturedTriangle(A,R,_,E,I,H,N,O,Q,U,G,$,L,J,q,V,B,F,b))return;let T=this.getTexels(b);this.opaque=!this.textureTranslucent[b];let j=U-L,w=G-q,Z=$-B,W=J-U,Y=V-G,u=F-$,h=W*G-Y*U<<14,n=Y*$-u*G<<8,X=u*U-W*$<<5,f=j*G-w*U<<14,g=w*$-Z*G<<8,v=Z*U-j*$<<5,M=w*W-j*Y<<14,x=Z*Y-w*u<<8,y=j*u-Z*W<<5,d=0,A0=0;if(I!==E)d=(R-A<<16)/(I-E)|0,A0=(O-N<<16)/(I-E)|0;let t=0,N0=0;if(H!==I)t=(_-R<<16)/(H-I)|0,N0=(Q-O<<16)/(H-I)|0;let H0=0,B0=0;if(H!==E)H0=(A-_<<16)/(E-H)|0,B0=(N-Q<<16)/(E-H)|0;if(E<=I&&E<=H){if(E<k.bottom){if(I>k.bottom)I=k.bottom;if(H>k.bottom)H=k.bottom;if(I<H){if(_=A<<=16,Q=N<<=16,E<0)_-=H0*E,A-=d*E,Q-=B0*E,N-=A0*E,E=0;if(R<<=16,O<<=16,I<0)R-=t*I,O-=N0*I,I=0;let K0=E-this.centerY;if(h+=X*K0,f+=v*K0,M+=y*K0,h|=0,f|=0,M|=0,E!==I&&H0<d||E===I&&H0>t){H-=I,I-=E,E=this.lineOffset[E];while(!0){if(I--,I<0)while(!0){if(H--,H<0)return;this.drawTexturedScanline(_>>16,R>>16,k.pixels,E,T,0,0,h,f,M,n,g,x,Q>>8,O>>8),_+=H0,R+=t,Q+=B0,O+=N0,E+=k.width2d,h+=X,f+=v,M+=y,h|=0,f|=0,M|=0}this.drawTexturedScanline(_>>16,A>>16,k.pixels,E,T,0,0,h,f,M,n,g,x,Q>>8,N>>8),_+=H0,A+=d,Q+=B0,N+=A0,E+=k.width2d,h+=X,f+=v,M+=y,h|=0,f|=0,M|=0}}else{H-=I,I-=E,E=this.lineOffset[E];while(!0){if(I--,I<0)while(!0){if(H--,H<0)return;this.drawTexturedScanline(R>>16,_>>16,k.pixels,E,T,0,0,h,f,M,n,g,x,O>>8,Q>>8),_+=H0,R+=t,Q+=B0,O+=N0,E+=k.width2d,h+=X,f+=v,M+=y,h|=0,f|=0,M|=0}this.drawTexturedScanline(A>>16,_>>16,k.pixels,E,T,0,0,h,f,M,n,g,x,N>>8,Q>>8),_+=H0,A+=d,Q+=B0,N+=A0,E+=k.width2d,h+=X,f+=v,M+=y,h|=0,f|=0,M|=0}}}else{if(R=A<<=16,O=N<<=16,E<0)R-=H0*E,A-=d*E,O-=B0*E,N-=A0*E,E=0;if(_<<=16,Q<<=16,H<0)_-=t*H,Q-=N0*H,H=0;let K0=E-this.centerY;if(h+=X*K0,f+=v*K0,M+=y*K0,h|=0,f|=0,M|=0,(E===H||H0>=d)&&(E!==H||t<=d)){I-=H,H-=E,E=this.lineOffset[E];while(!0){if(H--,H<0)while(!0){if(I--,I<0)return;this.drawTexturedScanline(A>>16,_>>16,k.pixels,E,T,0,0,h,f,M,n,g,x,N>>8,Q>>8),_+=t,A+=d,Q+=N0,N+=A0,E+=k.width2d,h+=X,f+=v,M+=y,h|=0,f|=0,M|=0}this.drawTexturedScanline(A>>16,R>>16,k.pixels,E,T,0,0,h,f,M,n,g,x,N>>8,O>>8),R+=H0,A+=d,O+=B0,N+=A0,E+=k.width2d,h+=X,f+=v,M+=y,h|=0,f|=0,M|=0}}else{I-=H,H-=E,E=this.lineOffset[E];while(!0){if(H--,H<0)while(!0){if(I--,I<0)return;this.drawTexturedScanline(_>>16,A>>16,k.pixels,E,T,0,0,h,f,M,n,g,x,Q>>8,N>>8),_+=t,A+=d,Q+=N0,N+=A0,E+=k.width2d,h+=X,f+=v,M+=y,h|=0,f|=0,M|=0}this.drawTexturedScanline(R>>16,A>>16,k.pixels,E,T,0,0,h,f,M,n,g,x,O>>8,N>>8),R+=H0,A+=d,O+=B0,N+=A0,E+=k.width2d,h+=X,f+=v,M+=y,h|=0,f|=0,M|=0}}}}}else if(I<=H){if(I<k.bottom){if(H>k.bottom)H=k.bottom;if(E>k.bottom)E=k.bottom;if(H<E){if(A=R<<=16,N=O<<=16,I<0)A-=d*I,R-=t*I,N-=A0*I,O-=N0*I,I=0;if(_<<=16,Q<<=16,H<0)_-=H0*H,Q-=B0*H,H=0;let K0=I-this.centerY;if(h+=X*K0,f+=v*K0,M+=y*K0,h|=0,f|=0,M|=0,I!==H&&d<t||I===H&&d>H0){E-=H,H-=I,I=this.lineOffset[I];while(!0){if(H--,H<0)while(!0){if(E--,E<0)return;this.drawTexturedScanline(A>>16,_>>16,k.pixels,I,T,0,0,h,f,M,n,g,x,N>>8,Q>>8),A+=d,_+=H0,N+=A0,Q+=B0,I+=k.width2d,h+=X,f+=v,M+=y,h|=0,f|=0,M|=0}this.drawTexturedScanline(A>>16,R>>16,k.pixels,I,T,0,0,h,f,M,n,g,x,N>>8,O>>8),A+=d,R+=t,N+=A0,O+=N0,I+=k.width2d,h+=X,f+=v,M+=y,h|=0,f|=0,M|=0}}else{E-=H,H-=I,I=this.lineOffset[I];while(!0){if(H--,H<0)while(!0){if(E--,E<0)return;this.drawTexturedScanline(_>>16,A>>16,k.pixels,I,T,0,0,h,f,M,n,g,x,Q>>8,N>>8),A+=d,_+=H0,N+=A0,Q+=B0,I+=k.width2d,h+=X,f+=v,M+=y,h|=0,f|=0,M|=0}this.drawTexturedScanline(R>>16,A>>16,k.pixels,I,T,0,0,h,f,M,n,g,x,O>>8,N>>8),A+=d,R+=t,N+=A0,O+=N0,I+=k.width2d,h+=X,f+=v,M+=y,h|=0,f|=0,M|=0}}}else{if(_=R<<=16,Q=O<<=16,I<0)_-=d*I,R-=t*I,Q-=A0*I,O-=N0*I,I=0;if(A<<=16,N<<=16,E<0)A-=H0*E,N-=B0*E,E=0;let K0=I-this.centerY;if(h+=X*K0,f+=v*K0,M+=y*K0,h|=0,f|=0,M|=0,H-=E,E-=I,I=this.lineOffset[I],d<t)while(!0){if(E--,E<0)while(!0){if(H--,H<0)return;this.drawTexturedScanline(A>>16,R>>16,k.pixels,I,T,0,0,h,f,M,n,g,x,N>>8,O>>8),A+=H0,R+=t,N+=B0,O+=N0,I+=k.width2d,h+=X,f+=v,M+=y,h|=0,f|=0,M|=0}this.drawTexturedScanline(_>>16,R>>16,k.pixels,I,T,0,0,h,f,M,n,g,x,Q>>8,O>>8),_+=d,R+=t,Q+=A0,O+=N0,I+=k.width2d,h+=X,f+=v,M+=y,h|=0,f|=0,M|=0}else while(!0){if(E--,E<0)while(!0){if(H--,H<0)return;this.drawTexturedScanline(R>>16,A>>16,k.pixels,I,T,0,0,h,f,M,n,g,x,O>>8,N>>8),A+=H0,R+=t,N+=B0,O+=N0,I+=k.width2d,h+=X,f+=v,M+=y,h|=0,f|=0,M|=0}this.drawTexturedScanline(R>>16,_>>16,k.pixels,I,T,0,0,h,f,M,n,g,x,O>>8,Q>>8),_+=d,R+=t,Q+=A0,O+=N0,I+=k.width2d,h+=X,f+=v,M+=y,h|=0,f|=0,M|=0}}}}else if(H<k.bottom){if(E>k.bottom)E=k.bottom;if(I>k.bottom)I=k.bottom;if(E<I){if(R=_<<=16,O=Q<<=16,H<0)R-=t*H,_-=H0*H,O-=N0*H,Q-=B0*H,H=0;if(A<<=16,N<<=16,E<0)A-=d*E,N-=A0*E,E=0;let K0=H-this.centerY;if(h+=X*K0,f+=v*K0,M+=y*K0,h|=0,f|=0,M|=0,I-=E,E-=H,H=this.lineOffset[H],t<H0)while(!0){if(E--,E<0)while(!0){if(I--,I<0)return;this.drawTexturedScanline(R>>16,A>>16,k.pixels,H,T,0,0,h,f,M,n,g,x,O>>8,N>>8),R+=t,A+=d,O+=N0,N+=A0,H+=k.width2d,h+=X,f+=v,M+=y,h|=0,f|=0,M|=0}this.drawTexturedScanline(R>>16,_>>16,k.pixels,H,T,0,0,h,f,M,n,g,x,O>>8,Q>>8),R+=t,_+=H0,O+=N0,Q+=B0,H+=k.width2d,h+=X,f+=v,M+=y,h|=0,f|=0,M|=0}else while(!0){if(E--,E<0)while(!0){if(I--,I<0)return;this.drawTexturedScanline(A>>16,R>>16,k.pixels,H,T,0,0,h,f,M,n,g,x,N>>8,O>>8),R+=t,A+=d,O+=N0,N+=A0,H+=k.width2d,h+=X,f+=v,M+=y,h|=0,f|=0,M|=0}this.drawTexturedScanline(_>>16,R>>16,k.pixels,H,T,0,0,h,f,M,n,g,x,Q>>8,O>>8),R+=t,_+=H0,O+=N0,Q+=B0,H+=k.width2d,h+=X,f+=v,M+=y,h|=0,f|=0,M|=0}}else{if(A=_<<=16,N=Q<<=16,H<0)A-=t*H,_-=H0*H,N-=N0*H,Q-=B0*H,H=0;if(R<<=16,O<<=16,I<0)R-=d*I,O-=A0*I,I=0;let K0=H-this.centerY;if(h+=X*K0,f+=v*K0,M+=y*K0,h|=0,f|=0,M|=0,E-=I,I-=H,H=this.lineOffset[H],t<H0)while(!0){if(I--,I<0)while(!0){if(E--,E<0)return;this.drawTexturedScanline(R>>16,_>>16,k.pixels,H,T,0,0,h,f,M,n,g,x,O>>8,Q>>8),R+=d,_+=H0,O+=A0,Q+=B0,H+=k.width2d,h+=X,f+=v,M+=y,h|=0,f|=0,M|=0}this.drawTexturedScanline(A>>16,_>>16,k.pixels,H,T,0,0,h,f,M,n,g,x,N>>8,Q>>8),A+=t,_+=H0,N+=N0,Q+=B0,H+=k.width2d,h+=X,f+=v,M+=y,h|=0,f|=0,M|=0}else while(!0){if(I--,I<0)while(!0){if(E--,E<0)return;this.drawTexturedScanline(_>>16,R>>16,k.pixels,H,T,0,0,h,f,M,n,g,x,Q>>8,O>>8),R+=d,_+=H0,O+=A0,Q+=B0,H+=k.width2d,h+=X,f+=v,M+=y,h|=0,f|=0,M|=0}this.drawTexturedScanline(_>>16,A>>16,k.pixels,H,T,0,0,h,f,M,n,g,x,Q>>8,N>>8),A+=t,_+=H0,N+=N0,Q+=B0,H+=k.width2d,h+=X,f+=v,M+=y,h|=0,f|=0,M|=0}}}}static drawTexturedScanline(A,R,_,E,I,H,N,O,Q,U,G,$,L,J,q){if(A>=R)return;let V,B;if(this.clipX){if(V=(q-J)/(R-A)|0,R>k.boundX)R=k.boundX;if(A<0)J-=A*V,A=0;if(A>=R)return;B=R-A>>3,V<<=12}else if(R-A>7)B=R-A>>3,V=(q-J)*this.reciprocal15[B]>>6;else B=0,V=0;J<<=9,E+=A;let F,b,T,j,w,Z,W;if(this.lowMemory&&I){if(F=0,b=0,j=A-this.centerX,O=O+(G>>3)*j,Q=Q+($>>3)*j,U=U+(L>>3)*j,O|=0,Q|=0,U|=0,T=U>>12,T!==0){if(H=O/T|0,N=Q/T|0,H<0)H=0;else if(H>4032)H=4032}if(O=O+G,Q=Q+$,U=U+L,O|=0,Q|=0,U|=0,T=U>>12,T!==0){if(F=O/T|0,b=Q/T|0,F<7)F=7;else if(F>4032)F=4032}if(w=F-H>>3,Z=b-N>>3,H+=J>>3&786432,W=J>>23,this.opaque){while(B-- >0){if(_[E++]=I[(N&4032)+(H>>6)]>>>W,H+=w,N+=Z,_[E++]=I[(N&4032)+(H>>6)]>>>W,H+=w,N+=Z,_[E++]=I[(N&4032)+(H>>6)]>>>W,H+=w,N+=Z,_[E++]=I[(N&4032)+(H>>6)]>>>W,H+=w,N+=Z,_[E++]=I[(N&4032)+(H>>6)]>>>W,H+=w,N+=Z,_[E++]=I[(N&4032)+(H>>6)]>>>W,H+=w,N+=Z,_[E++]=I[(N&4032)+(H>>6)]>>>W,H+=w,N+=Z,_[E++]=I[(N&4032)+(H>>6)]>>>W,H=F,N=b,O+=G,Q+=$,U+=L,T=U>>12,T!==0){if(F=O/T|0,b=Q/T|0,F<7)F=7;else if(F>4032)F=4032}w=F-H>>3,Z=b-N>>3,J+=V,H+=J>>3&786432,W=J>>23}B=R-A&7;while(B-- >0)_[E++]=I[(N&4032)+(H>>6)]>>>W,H+=w,N+=Z}else{while(B-- >0){let Y;if((Y=I[(N&4032)+(H>>6)]>>>W)!==0)_[E]=Y;if(E=E+1,H+=w,N+=Z,(Y=I[(N&4032)+(H>>6)]>>>W)!==0)_[E]=Y;if(E++,H+=w,N+=Z,(Y=I[(N&4032)+(H>>6)]>>>W)!==0)_[E]=Y;if(E++,H+=w,N+=Z,(Y=I[(N&4032)+(H>>6)]>>>W)!==0)_[E]=Y;if(E++,H+=w,N+=Z,(Y=I[(N&4032)+(H>>6)]>>>W)!==0)_[E]=Y;if(E++,H+=w,N+=Z,(Y=I[(N&4032)+(H>>6)]>>>W)!==0)_[E]=Y;if(E++,H+=w,N+=Z,(Y=I[(N&4032)+(H>>6)]>>>W)!==0)_[E]=Y;if(E++,H+=w,N+=Z,(Y=I[(N&4032)+(H>>6)]>>>W)!==0)_[E]=Y;if(E=E+1,H=F,N=b,O+=G,Q+=$,U+=L,O|=0,Q|=0,U|=0,T=U>>12,T!==0){if(F=O/T|0,b=Q/T|0,F<7)F=7;else if(F>4032)F=4032}w=F-H>>3,Z=b-N>>3,J+=V,H+=J>>3&786432,W=J>>23}B=R-A&7;while(B-- >0){let Y;if((Y=I[(N&4032)+(H>>6)]>>>W)!==0)_[E]=Y;E++,H+=w,N+=Z}}return}if(F=0,b=0,j=A-this.centerX,O=O+(G>>3)*j,Q=Q+($>>3)*j,U=U+(L>>3)*j,O|=0,Q|=0,U|=0,T=U>>14,T!==0){if(H=O/T|0,N=Q/T|0,H<0)H=0;else if(H>16256)H=16256}if(O=O+G,Q=Q+$,U=U+L,O|=0,Q|=0,U|=0,T=U>>14,T!==0){if(F=O/T|0,b=Q/T|0,F<7)F=7;else if(F>16256)F=16256}if(w=F-H>>3,Z=b-N>>3,H+=J&6291456,W=J>>23,this.opaque&&I){while(B-- >0){if(_[E++]=I[(N&16256)+(H>>7)]>>>W,H+=w,N+=Z,_[E++]=I[(N&16256)+(H>>7)]>>>W,H+=w,N+=Z,_[E++]=I[(N&16256)+(H>>7)]>>>W,H+=w,N+=Z,_[E++]=I[(N&16256)+(H>>7)]>>>W,H+=w,N+=Z,_[E++]=I[(N&16256)+(H>>7)]>>>W,H+=w,N+=Z,_[E++]=I[(N&16256)+(H>>7)]>>>W,H+=w,N+=Z,_[E++]=I[(N&16256)+(H>>7)]>>>W,H+=w,N+=Z,_[E++]=I[(N&16256)+(H>>7)]>>>W,H=F,N=b,O+=G,Q+=$,U+=L,O|=0,Q|=0,U|=0,T=U>>14,T!==0){if(F=O/T|0,b=Q/T|0,F<7)F=7;else if(F>16256)F=16256}w=F-H>>3,Z=b-N>>3,J+=V,H+=J&6291456,W=J>>23}B=R-A&7;while(B-- >0)_[E++]=I[(N&16256)+(H>>7)]>>>W,H+=w,N+=Z;return}while(B-- >0&&I){let Y;if((Y=I[(N&16256)+(H>>7)]>>>W)!==0)_[E]=Y;if(E=E+1,H+=w,N+=Z,(Y=I[(N&16256)+(H>>7)]>>>W)!==0)_[E]=Y;if(E++,H+=w,N+=Z,(Y=I[(N&16256)+(H>>7)]>>>W)!==0)_[E]=Y;if(E++,H+=w,N+=Z,(Y=I[(N&16256)+(H>>7)]>>>W)!==0)_[E]=Y;if(E++,H+=w,N+=Z,(Y=I[(N&16256)+(H>>7)]>>>W)!==0)_[E]=Y;if(E++,H+=w,N+=Z,(Y=I[(N&16256)+(H>>7)]>>>W)!==0)_[E]=Y;if(E++,H+=w,N+=Z,(Y=I[(N&16256)+(H>>7)]>>>W)!==0)_[E]=Y;if(E++,H+=w,N+=Z,(Y=I[(N&16256)+(H>>7)]>>>W)!==0)_[E]=Y;if(E++,H=F,N=b,O+=G,Q+=$,U+=L,O|=0,Q|=0,U|=0,T=U>>14,T!==0){if(F=O/T|0,b=Q/T|0,F<7)F=7;else if(F>16256)F=16256}w=F-H>>3,Z=b-N>>3,J+=V,H+=J&6291456,W=J>>23}B=R-A&7;while(B-- >0&&I){let Y;if((Y=I[(N&16256)+(H>>7)]>>>W)!==0)_[E]=Y;E++,H+=w,N+=Z}}static drawScanline(A,R,_,E,I){if(this.clipX){if(R>k.boundX)R=k.boundX;if(A<0)A=0}if(A>=R)return;E+=A;let H=R-A>>2;if(this.alpha===0)while(!0){if(H--,H<0){H=R-A&3;while(!0){if(H--,H<0)return;_[E++]=I}}_[E++]=I,_[E++]=I,_[E++]=I,_[E++]=I}let N=this.alpha,O=256-this.alpha;I=((I&16711935)*O>>8&16711935)+((I&65280)*O>>8&65280);while(!0){if(H--,H<0){H=R-A&3;while(!0){if(H--,H<0)return;_[E++]=I+((_[E]&16711935)*N>>8&16711935)+((_[E]&65280)*N>>8&65280)}}_[E++]=I+((_[E]&16711935)*N>>8&16711935)+((_[E]&65280)*N>>8&65280),_[E++]=I+((_[E]&16711935)*N>>8&16711935)+((_[E]&65280)*N>>8&65280),_[E++]=I+((_[E]&16711935)*N>>8&16711935)+((_[E]&65280)*N>>8&65280),_[E++]=I+((_[E]&16711935)*N>>8&16711935)+((_[E]&65280)*N>>8&65280)}}static pushTexture(A){if(this.activeTexels[A]&&this.texelPool)this.texelPool[this.poolSize++]=this.activeTexels[A],this.activeTexels[A]=null;C.updateTexture(A)}static getTexels(A){if(this.textureCycle[A]=this.cycle++,this.activeTexels[A])return this.activeTexels[A];let R;if(this.poolSize>0&&this.texelPool)R=this.texelPool[--this.poolSize],this.texelPool[this.poolSize]=null;else{let I=0,H=-1;for(let N=0;N<this.textureCount;N++)if(this.activeTexels[N]&&(this.textureCycle[N]<I||H===-1))I=this.textureCycle[N],H=N;R=this.activeTexels[H],this.activeTexels[H]=null}this.activeTexels[A]=R;let _=this.textures[A],E=this.texPal[A];if(!R||!_||!E)return null;if(this.lowMemory){this.textureTranslucent[A]=!1;for(let I=0;I<4096;I++){let H=R[I]=E[_.pixels[I]]&16316671;if(H===0)this.textureTranslucent[A]=!0;R[I+4096]=H-(H>>>3)&16316671,R[I+8192]=H-(H>>>2)&16316671,R[I+12288]=H-(H>>>2)-(H>>>3)&16316671}}else{if(_.width2d===64)for(let I=0;I<128;I++)for(let H=0;H<128;H++)R[H+(I<<7|0)]=E[_.pixels[(H>>1)+(I>>1<<6|0)]];else for(let I=0;I<16384;I++)R[I]=E[_.pixels[I]];this.textureTranslucent[A]=!1;for(let I=0;I<16384;I++){R[I]&=16316671;let H=R[I];if(H===0)this.textureTranslucent[A]=!0;R[I+16384]=H-(H>>>3)&16316671,R[I+32768]=H-(H>>>2)&16316671,R[I+49152]=H-(H>>>2)-(H>>>3)&16316671}}return R}}class O0{image;width2d;height2d;ctx;paint;pixels;constructor(A,R,_=o){this.ctx=_,this.image=this.ctx.getImageData(0,0,A,R),this.paint=new Uint32Array(this.image.data.buffer),this.pixels=new Int32Array(A*R),this.width2d=A,this.height2d=R,this.bind()}clear(){this.pixels.fill(0)}bind(){k.bind(this.pixels,this.width2d,this.height2d)}draw(A,R){if(C.renderPixMap(this,A,R))return;this.#A(),this.ctx.putImageData(this.image,A,R)}#A(){let A=this.pixels.length,R=this.pixels,_=this.paint;for(let E=0;E<A;E++){let I=R[E];_[E]=I>>16&255|(I>>8&255)<<8|(I&255)<<16|4278190080}}}var E1=["F11","F12"],P=new Map;P.set("ArrowLeft",{code:37,ch:1});P.set("ArrowRight",{code:39,ch:2});P.set("ArrowUp",{code:38,ch:3});P.set("ArrowDown",{code:40,ch:4});P.set("Control",{code:17,ch:5});P.set("Shift",{code:16,ch:6});P.set("Alt",{code:18,ch:7});P.set("Backspace",{code:8,ch:8});P.set("Tab",{code:9,ch:9});P.set("Enter",{code:10,ch:10});P.set("Escape",{code:27,ch:27});P.set(" ",{code:32,ch:32});P.set("Delete",{code:127,ch:127});P.set("Home",{code:36,ch:1000});P.set("End",{code:35,ch:1001});P.set("PageUp",{code:33,ch:1002});P.set("PageDown",{code:34,ch:1003});P.set("F1",{code:112,ch:1008});P.set("F2",{code:113,ch:1009});P.set("F3",{code:114,ch:1010});P.set("F4",{code:115,ch:1011});P.set("F5",{code:116,ch:1012});P.set("F6",{code:117,ch:1013});P.set("F7",{code:118,ch:1014});P.set("F8",{code:119,ch:1015});P.set("F9",{code:120,ch:1016});P.set("F10",{code:121,ch:1017});P.set("F11",{code:122,ch:1018});P.set("F12",{code:123,ch:1019});P.set("CapsLock",{code:20,ch:65535});P.set("Meta",{code:524,ch:65535});P.set("Insert",{code:155,ch:65535});P.set("`",{code:192,ch:96});P.set("~",{code:192,ch:126});P.set("!",{code:49,ch:33});P.set("@",{code:50,ch:64});P.set("#",{code:51,ch:35});P.set("£",{code:51,ch:163});P.set("$",{code:52,ch:36});P.set("%",{code:53,ch:37});P.set("^",{code:54,ch:94});P.set("&",{code:55,ch:38});P.set("*",{code:56,ch:42});P.set("(",{code:57,ch:40});P.set(")",{code:48,ch:41});P.set("-",{code:45,ch:45});P.set("_",{code:45,ch:95});P.set("=",{code:61,ch:61});P.set("+",{code:61,ch:43});P.set("[",{code:91,ch:91});P.set("{",{code:91,ch:123});P.set("]",{code:93,ch:93});P.set("}",{code:93,ch:125});P.set("\\",{code:92,ch:92});P.set("|",{code:92,ch:124});P.set(";",{code:59,ch:59});P.set(":",{code:59,ch:58});P.set("'",{code:222,ch:39});P.set('"',{code:222,ch:34});P.set(",",{code:44,ch:44});P.set("<",{code:44,ch:60});P.set(".",{code:46,ch:46});P.set(">",{code:46,ch:62});P.set("/",{code:47,ch:47});P.set("?",{code:47,ch:63});P.set("0",{code:48,ch:48});P.set("1",{code:49,ch:49});P.set("2",{code:50,ch:50});P.set("3",{code:51,ch:51});P.set("4",{code:52,ch:52});P.set("5",{code:53,ch:53});P.set("6",{code:54,ch:54});P.set("7",{code:55,ch:55});P.set("8",{code:56,ch:56});P.set("9",{code:57,ch:57});P.set("a",{code:65,ch:97});P.set("b",{code:66,ch:98});P.set("c",{code:67,ch:99});P.set("d",{code:68,ch:100});P.set("e",{code:69,ch:101});P.set("f",{code:70,ch:102});P.set("g",{code:71,ch:103});P.set("h",{code:72,ch:104});P.set("i",{code:73,ch:105});P.set("j",{code:74,ch:106});P.set("k",{code:75,ch:107});P.set("l",{code:76,ch:108});P.set("m",{code:77,ch:109});P.set("n",{code:78,ch:110});P.set("o",{code:79,ch:111});P.set("p",{code:80,ch:112});P.set("q",{code:81,ch:113});P.set("r",{code:82,ch:114});P.set("s",{code:83,ch:115});P.set("t",{code:84,ch:116});P.set("u",{code:85,ch:117});P.set("v",{code:86,ch:118});P.set("w",{code:87,ch:119});P.set("x",{code:88,ch:120});P.set("y",{code:89,ch:121});P.set("z",{code:90,ch:122});P.set("A",{code:65,ch:65});P.set("B",{code:66,ch:66});P.set("C",{code:67,ch:67});P.set("D",{code:68,ch:68});P.set("E",{code:69,ch:69});P.set("F",{code:70,ch:70});P.set("G",{code:71,ch:71});P.set("H",{code:72,ch:72});P.set("I",{code:73,ch:73});P.set("J",{code:74,ch:74});P.set("K",{code:75,ch:75});P.set("L",{code:76,ch:76});P.set("M",{code:77,ch:77});P.set("N",{code:78,ch:78});P.set("O",{code:79,ch:79});P.set("P",{code:80,ch:80});P.set("Q",{code:81,ch:81});P.set("R",{code:82,ch:82});P.set("S",{code:83,ch:83});P.set("T",{code:84,ch:84});P.set("U",{code:85,ch:85});P.set("V",{code:86,ch:86});P.set("W",{code:87,ch:87});P.set("X",{code:88,ch:88});P.set("Y",{code:89,ch:89});P.set("Z",{code:90,ch:90});class q0{static trackingActive=!1;static outBuffer=null;static oldBuffer=null;static lastTime=0;static trackedCount=0;static lastMoveTime=0;static lastX=0;static lastY=0;static setEnabled(){this.outBuffer=s.alloc(1),this.oldBuffer=null,this.lastTime=performance.now(),this.trackingActive=!0}static setDisabled(){this.trackingActive=!1,this.outBuffer=null}static flush(){let A=null;if(this.oldBuffer&&this.trackingActive)A=this.oldBuffer;return this.oldBuffer=null,A}static stop(){let A=null;if(this.outBuffer&&this.outBuffer.pos>0&&this.trackingActive)A=this.outBuffer;return this.setDisabled(),A}static mousePressed(A,R,_){if(!(this.trackingActive&&A>=0&&A<789&&R>=0&&R<532))return;this.trackedCount++;let E=performance.now(),I=(E-this.lastTime)/10|0;if(I>250)I=250;if(this.lastTime=E,this.ensureCapacity(5),_===2)this.outBuffer?.p1(1);else this.outBuffer?.p1(2);this.outBuffer?.p1(I),this.outBuffer?.p3(A+(R<<10))}static mouseReleased(A){if(!this.trackingActive)return;this.trackedCount++;let R=performance.now(),_=(R-this.lastTime)/10|0;if(_>250)_=250;if(this.lastTime=R,this.ensureCapacity(2),A===2)this.outBuffer?.p1(3);else this.outBuffer?.p1(4);this.outBuffer?.p1(_)}static mouseMoved(A,R){if(!(this.trackingActive&&A>=0&&A<789&&R>=0&&R<532))return;let _=performance.now();if(_-this.lastMoveTime>=50){this.lastMoveTime=_,this.trackedCount++;let E=(_-this.lastTime)/10|0;if(E>250)E=250;if(this.lastTime=_,A-this.lastX<8&&A-this.lastX>=-8&&R-this.lastY<8&&R-this.lastY>=-8)this.ensureCapacity(3),this.outBuffer?.p1(5),this.outBuffer?.p1(E),this.outBuffer?.p1(A+(R-this.lastY+8<<4)+8-this.lastX);else if(A-this.lastX<128&&A-this.lastX>=-128&&R-this.lastY<128&&R-this.lastY>=-128)this.ensureCapacity(4),this.outBuffer?.p1(6),this.outBuffer?.p1(E),this.outBuffer?.p1(A+128-this.lastX),this.outBuffer?.p1(R+128-this.lastY);else this.ensureCapacity(5),this.outBuffer?.p1(7),this.outBuffer?.p1(E),this.outBuffer?.p3(A+(R<<10));this.lastX=A,this.lastY=R}}static keyPressed(A){if(!this.trackingActive)return;this.trackedCount++;let R=performance.now(),_=(R-this.lastTime)/10|0;if(_>250)_=250;if(this.lastTime=R,A===1000)A=11;else if(A===1001)A=12;else if(A===1002)A=14;else if(A===1003)A=15;else if(A>=1008)A-=992;this.ensureCapacity(3),this.outBuffer?.p1(8),this.outBuffer?.p1(_),this.outBuffer?.p1(A)}static keyReleased(A){if(!this.trackingActive)return;this.trackedCount++;let R=performance.now(),_=(R-this.lastTime)/10|0;if(_>250)_=250;if(this.lastTime=R,A===1000)A=11;else if(A===1001)A=12;else if(A===1002)A=14;else if(A===1003)A=15;else if(A>=1008)A-=992;this.ensureCapacity(3),this.outBuffer?.p1(9),this.outBuffer?.p1(_),this.outBuffer?.p1(A)}static focusGained(){if(!this.trackingActive)return;this.trackedCount++;let A=performance.now(),R=(A-this.lastTime)/10|0;if(R>250)R=250;this.lastTime=A,this.ensureCapacity(2),this.outBuffer?.p1(10),this.outBuffer?.p1(R)}static focusLost(){if(!this.trackingActive)return;this.trackedCount++;let A=performance.now(),R=(A-this.lastTime)/10|0;if(R>250)R=250;this.lastTime=A,this.ensureCapacity(2),this.outBuffer?.p1(11),this.outBuffer?.p1(R)}static mouseEntered(){if(!this.trackingActive)return;this.trackedCount++;let A=performance.now(),R=(A-this.lastTime)/10|0;if(R>250)R=250;this.lastTime=A,this.ensureCapacity(2),this.outBuffer?.p1(12),this.outBuffer?.p1(R)}static mouseExited(){if(!this.trackingActive)return;this.trackedCount++;let A=performance.now(),R=(A-this.lastTime)/10|0;if(R>250)R=250;this.lastTime=A,this.ensureCapacity(2),this.outBuffer?.p1(13),this.outBuffer?.p1(R)}static ensureCapacity(A){if(!this.outBuffer)return;if(this.outBuffer.pos+A>=500){let R=this.outBuffer;this.outBuffer=s.alloc(1),this.oldBuffer=R}}}import{MobileKeyboard as u0}from"./deps.js";var N1=X8(X1(),1);class X6{slowestMS=0;averageMS=[];averageIndexMS=0;drawArea=null;state=0;redrawScreen=!0;resizeToFit=!1;hasFocus=!0;ingame=!1;idleCycles=performance.now();mouseButton=0;mouseX=-1;mouseY=-1;mouseClickButton=0;mouseClickX=-1;mouseClickY=-1;actionKey=[];keyQueue=[];keyQueueReadPos=0;keyQueueWritePos=0;touching=!1;startedInViewport=!1;startedInTabArea=!1;time=-1;sx=0;sy=0;mx=0;my=0;nx=0;ny=0;drawStats=new N1.default;updateStats=new N1.default;rafId=0;updateRate=20;updateAcc=0;lastUpdate=performance.now();async load(){}async update(){}async draw(){}async refresh(){}constructor(A=!1){if(w0.tabIndex=-1,o.fillStyle="black",o.fillRect(0,0,L0.width,L0.height),this.resizeToFit=A,this.resizeToFit)this.resize(window.innerWidth,window.innerHeight);else this.resize(L0.width,L0.height)}get width(){return L0.width}get height(){return L0.height}resize(A,R){L0.width=A,L0.height=R,this.drawArea=new O0(A,R),m.init2D(),C.resize(A,R)}async run(){if(L0.addEventListener("resize",()=>{if(this.resizeToFit)this.resize(window.innerWidth,window.innerHeight)},!1),w0.focus(),w0.onfocus=this.onfocus.bind(this),w0.onblur=this.onblur.bind(this),w0.onmousedown=this.onmousedown.bind(this),w0.onmouseup=this.onmouseup.bind(this),w0.onmouseenter=this.onmouseenter.bind(this),w0.onmouseleave=this.onmouseleave.bind(this),w0.onmousemove=this.onmousemove.bind(this),w0.onkeydown=this.onkeydown.bind(this),w0.onkeyup=this.onkeyup.bind(this),this.isMobile)w0.ontouchstart=this.ontouchstart.bind(this),w0.ontouchend=this.ontouchend.bind(this),w0.ontouchmove=this.ontouchmove.bind(this);w0.oncontextmenu=(A)=>{A.preventDefault()},window.oncontextmenu=(A)=>{A.preventDefault()},await this.showProgress(0,"Loading..."),await this.load(),this.drawStats.showPanel(0),this.drawStats.dom.style.cssText="display:none;position:absolute;top:0px;right:0px;",C0.appendChild(this.drawStats.dom),this.updateStats.showPanel(1),this.updateStats.dom.style.cssText="display:none;position:absolute;top:48px;right:0px;",C0.appendChild(this.updateStats.dom),setTimeout(this.mainupdate.bind(this),0),window.requestAnimationFrame(this.mainloop.bind(this))}async mainloop(A){this.drawStats.begin(),await this.maindraw(),this.drawStats.end(),this.rafId=window.requestAnimationFrame(this.mainloop.bind(this))}async mainupdate(){let A=performance.now(),R=A-this.lastUpdate;if(this.lastUpdate=A,this.updateAcc+=R,this.updateAcc>=this.updateRate){if(this.state>0){if(this.state--,this.state===0){this.shutdown();return}}this.updateStats.update()}while(this.updateAcc>=this.updateRate)await this.mainupdateinner(),this.updateAcc-=this.updateRate;setTimeout(this.mainupdate.bind(this),this.updateRate)}async mainupdateinner(){await this.update(),this.mouseClickButton=0,this.keyQueueReadPos=this.keyQueueWritePos}async maindraw(){if(await this.draw(),this.isMobile)u0.draw()}shutdown(){this.state=-2,window.cancelAnimationFrame(this.rafId)}setUpdateRate(A){this.updateRate=1000/A|0}start(){if(this.state>=0)this.state=0}stop(){if(this.state>=0)this.state=4000/this.updateRate|0}destroy(){this.state=-1}async showProgress(A,R){let _=this.width,E=this.height;if(this.redrawScreen)o.fillStyle="black",o.fillRect(0,0,_,E),this.redrawScreen=!1;let I=E/2-18;o.fillStyle="rgb(140, 17, 17)",o.rect((_/2|0)-152,I,304,34),o.fillRect((_/2|0)-150,I+2,A*3,30),o.fillStyle="black",o.fillRect((_/2|0)-150+A*3,I+2,300-A*3,30),o.font="bold 13px helvetica, sans-serif",o.textAlign="center",o.fillStyle="white",o.fillText(R,_/2|0,I+22),await A6(5)}pollKey(){let A=-1;if(this.keyQueueWritePos!==this.keyQueueReadPos)A=this.keyQueue[this.keyQueueReadPos],this.keyQueueReadPos=this.keyQueueReadPos+1&127;return A}onkeydown(A){this.idleCycles=performance.now();let R=P.get(A.key);if(!R||A.code.length===0&&!A.isTrusted)return;let _=R.ch;if(A.ctrlKey){if(_>=65&&_<=93||_==95)_-=64;else if(_>=97&&_<=122)_-=96}if(_>0&&_<128)this.actionKey[_]=1;if(_>4)this.keyQueue[this.keyQueueWritePos]=_,this.keyQueueWritePos=this.keyQueueWritePos+1&127;if(q0.trackingActive)q0.keyPressed(_);if(!E1.includes(A.key))A.preventDefault()}onkeyup(A){this.idleCycles=performance.now();let R=P.get(A.key);if(!R||A.code.length===0&&!A.isTrusted)return;let _=R.ch;if(A.ctrlKey){if(_>=65&&_<=93||_==95)_-=64;else if(_>=97&&_<=122)_-=96}if(_>0&&_<128)this.actionKey[_]=0;if(q0.trackingActive)q0.keyReleased(_);if(!E1.includes(A.key))A.preventDefault()}onmousedown(A){if(this.touching=!1,A.clientX>0||A.clientY>0)this.setMousePosition(A);if(this.idleCycles=performance.now(),this.mouseClickX=this.mouseX,this.mouseClickY=this.mouseY,this.isMobile&&!this.isCapacitor){if(this.insideMobileInputArea()&&!this.insideUsernameArea()&&!this.inPasswordArea()){this.mouseClickButton=0,this.mouseButton=0;return}if(A.timeStamp>=this.time+500)this.mouseClickButton=2,this.mouseButton=2;else this.mouseClickButton=1,this.mouseButton=1}else if(A.button===2)this.mouseClickButton=2,this.mouseButton=2;else if(A.button===0)this.mouseClickButton=1,this.mouseButton=1;if(u0.isDisplayed()){if(u0.captureMouseDown(this.mouseX,this.mouseY))this.mouseButton=0,this.mouseClickButton=0}if(q0.trackingActive)q0.mousePressed(this.mouseClickX,this.mouseClickY,A.button)}onmouseup(A){if(this.setMousePosition(A),this.idleCycles=performance.now(),this.mouseButton=0,q0.trackingActive)q0.mouseReleased(A.button);if(this.isMobile){if(this.insideMobileInputArea()&&!u0.isDisplayed())u0.show(this.mouseX,this.mouseY);else if(u0.isDisplayed()){if(!u0.captureMouseUp(this.mouseX,this.mouseY))u0.hide(),this.refresh()}}}onmouseenter(A){if(this.setMousePosition(A),q0.trackingActive)q0.mouseEntered()}onmouseleave(A){if(this.setMousePosition(A),this.idleCycles=performance.now(),this.mouseX=-1,this.mouseY=-1,this.mouseButton=0,this.mouseClickX=-1,this.mouseClickY=-1,q0.trackingActive)q0.mouseExited()}onmousemove(A){if(this.setMousePosition(A),this.idleCycles=performance.now(),this.isMobile&&this.touching){if(u0.isDisplayed())u0.notifyTouchMove(this.mouseX,this.mouseY)}if(q0.trackingActive)q0.mouseMoved(this.mouseX,this.mouseY)}onfocus(A){if(this.hasFocus=!0,this.redrawScreen=!0,this.refresh(),q0.trackingActive)q0.focusGained()}onblur(A){this.hasFocus=!1;for(let R=0;R<128;R++)this.actionKey[R]=0;if(q0.trackingActive)q0.focusLost()}ontouchstart(A){if(!this.isMobile)return;this.touching=!0;let R=A.changedTouches[0],_=R.clientX|0,E=R.clientY|0;this.onmousemove(new MouseEvent("mousemove",{clientX:_,clientY:E})),this.sx=this.nx=this.mx=R.screenX|0,this.sy=this.ny=this.my=R.screenY|0,this.time=A.timeStamp,this.startedInViewport=this.insideViewportArea(),this.startedInTabArea=this.insideTabArea()}ontouchend(A){if(!this.isMobile||!this.touching)return;let R=A.changedTouches[0],_=R.clientX|0,E=R.clientY|0;if(this.onmousemove(new MouseEvent("mousemove",{clientX:_,clientY:E})),this.nx=R.screenX|0,this.ny=R.screenY|0,this.onkeyup(new KeyboardEvent("keyup",{key:"ArrowLeft",code:"ArrowLeft"})),this.onkeyup(new KeyboardEvent("keyup",{key:"ArrowUp",code:"ArrowUp"})),this.onkeyup(new KeyboardEvent("keyup",{key:"ArrowRight",code:"ArrowRight"})),this.onkeyup(new KeyboardEvent("keyup",{key:"ArrowDown",code:"ArrowDown"})),this.startedInViewport&&!this.insideViewportArea()){this.touching=!1;return}else if(this.startedInTabArea&&!this.insideTabArea()){this.touching=!1;return}else if(this.insideMobileInputArea()){this.touching=!1;return}let H=A.timeStamp>=this.time+500,N=Math.abs(this.sx-this.nx)>16||Math.abs(this.sy-this.ny)>16;if(H&&!N)this.touching=!0,this.onmousedown(new MouseEvent("mousedown",{clientX:_,clientY:E,button:2})),this.onmouseup(new MouseEvent("mouseup",{clientX:_,clientY:E,button:2}))}ontouchmove(A){if(!this.isMobile||!this.touching)return;if(A.touches.length>1)return;A.preventDefault();let R=A.changedTouches[0],_=R.clientX|0,E=R.clientY|0;if(this.onmousemove(new MouseEvent("mousemove",{clientX:_,clientY:E})),this.nx=R.screenX|0,this.ny=R.screenY|0,!u0.isWithinCanvasKeyboard(this.mouseX,this.mouseY)){if(this.startedInViewport&&this.getViewportInterfaceId()===-1){if(this.mx-this.nx>0)this.rotate(2);else if(this.mx-this.nx<0)this.rotate(0);if(this.my-this.ny>0)this.rotate(3);else if(this.my-this.ny<0)this.rotate(1)}else if(this.startedInTabArea||this.getViewportInterfaceId()!==-1)this.onmousedown(new MouseEvent("mousedown",{clientX:_,clientY:E,button:1}))}this.mx=this.nx,this.my=this.ny}get isMobile(){if(["Android","webOS","iPhone","iPad","iPod","BlackBerry","Windows Phone"].some((R)=>navigator.userAgent.includes(R)))return!0;if(navigator){if(navigator.maxTouchPoints!==void 0&&navigator.maxTouchPoints>2&&navigator.standalone!==void 0)return!0}return!1}get isAndroid(){return["Android"].some((R)=>navigator.userAgent.includes(R))}get isCapacitor(){return["Capacitor"].some((R)=>navigator.userAgent.includes(R))}insideViewportArea(){return this.ingame&&this.mouseX>=8&&this.mouseX<=520&&this.mouseY>=11&&this.mouseY<=345}insideMobileInputArea(){return this.insideChatInputArea()||this.insideChatPopupArea()||this.insideUsernameArea()||this.inPasswordArea()||this.insideReportInterfaceTextArea()}insideChatInputArea(){return this.ingame&&this.getChatInterfaceId()===-1&&!this.isChatBackInputOpen()&&!this.isShowSocialInput()&&this.mouseX>=11&&this.mouseX<=506&&this.mouseY>=449&&this.mouseY<=482}insideChatPopupArea(){return this.ingame&&(this.isChatBackInputOpen()||this.isShowSocialInput())&&this.mouseX>=11&&this.mouseX<=506&&this.mouseY>=383&&this.mouseY<=482}insideReportInterfaceTextArea(){if(!this.ingame)return!1;let A=this.getViewportInterfaceId(),R=this.getReportAbuseInterfaceId();if(A===-1||R===-1)return!1;if(A!==R)return!1;let _=82,E=137,I=_+366,H=E+26;return this.mouseX>=_&&this.mouseX<=I&&this.mouseY>=E&&this.mouseY<=H}insideTabArea(){return this.ingame&&this.mouseX>=562&&this.mouseX<=752&&this.mouseY>=231&&this.mouseY<=492}insideUsernameArea(){return!this.ingame&&this.getTitleScreenState()===2&&this.mouseX>=301&&this.mouseX<=562&&this.mouseY>=262&&this.mouseY<=279}inPasswordArea(){return!this.ingame&&this.getTitleScreenState()===2&&this.mouseX>=301&&this.mouseX<=562&&this.mouseY>=279&&this.mouseY<=296}rotate(A){if(A===0)this.onkeyup(new KeyboardEvent("keyup",{key:"ArrowRight",code:"ArrowRight"})),this.onkeydown(new KeyboardEvent("keydown",{key:"ArrowLeft",code:"ArrowLeft"}));else if(A===1)this.onkeyup(new KeyboardEvent("keyup",{key:"ArrowDown",code:"ArrowDown"})),this.onkeydown(new KeyboardEvent("keydown",{key:"ArrowUp",code:"ArrowUp"}));else if(A===2)this.onkeyup(new KeyboardEvent("keyup",{key:"ArrowLeft",code:"ArrowLeft"})),this.onkeydown(new KeyboardEvent("keydown",{key:"ArrowRight",code:"ArrowRight"}));else if(A===3)this.onkeyup(new KeyboardEvent("keyup",{key:"ArrowUp",code:"ArrowUp"})),this.onkeydown(new KeyboardEvent("keydown",{key:"ArrowDown",code:"ArrowDown"}))}isFullScreen(){return document.fullscreenElement!==null}setMousePosition(A){let R=this.width,_=this.height,E=L0.getBoundingClientRect(),I={x:A.clientX-E.left,y:A.clientY-E.top};if(this.isFullScreen()){let H=R/_,O=window.innerWidth/window.innerHeight>=H,Q=0,U=0,G=0,$=0;if(O)Q=window.innerHeight*H,U=window.innerHeight,G=(window.innerWidth-Q)/2;else Q=window.innerWidth,U=window.innerWidth/H,$=(window.innerHeight-U)/2;let L=R/Q,J=_/U;this.mouseX=(I.x-G)*L|0,this.mouseY=(I.y-$)*J|0}else{let H=L0.width/E.width,N=L0.height/E.height;this.mouseX=I.x*H|0,this.mouseY=I.y*N|0}if(this.mouseX<0)this.mouseX=0;if(this.mouseY<0)this.mouseY=0;if(this.mouseX>R)this.mouseX=R;if(this.mouseY>_)this.mouseY=_}}class S0{id;debugname=null;constructor(A){this.id=A}unpackType(A){while(!0){let R=A.g1();if(R===0)break;this.unpack(R,A)}return this}}class U0 extends S0{static totalCount=0;static instances=[];static unpack(A){let R=new s(A.read("flo.dat"));this.totalCount=R.g2();for(let _=0;_<this.totalCount;_++)this.instances[_]=new U0(_).unpackType(R)}static hsl24to16(A,R,_){if(_>179)R=R/2|0;if(_>192)R=R/2|0;if(_>217)R=R/2|0;if(_>243)R=R/2|0;return((A/4|0)<<10)+((R/32|0)<<7)+(_/2|0)}static mulHSL(A,R){if(A===-1)return 12345678;if(R=R*(A&127)/128|0,R<2)R=2;else if(R>126)R=126;return(A&65408)+R}static adjustLightness(A,R){if(A===-2)return 12345678;if(A===-1){if(R<0)R=0;else if(R>127)R=127;return 127-R}else{if(R=R*(A&127)/128|0,R<2)R=2;else if(R>126)R=126;return(A&65408)+R}}rgb=0;overlayTexture=-1;opcode3=!1;occlude=!0;hue=0;saturation=0;lightness=0;luminance=0;chroma=0;hsl=0;unpack(A,R){if(A===1)this.rgb=R.g3(),this.setColor(this.rgb);else if(A===2)this.overlayTexture=R.g1();else if(A===3)this.opcode3=!0;else if(A===5)this.occlude=!1;else if(A===6)this.debugname=R.gjstr()}setColor(A){let R=(A>>16&255)/256,_=(A>>8&255)/256,E=(A&255)/256,I=R;if(_<R)I=_;if(E<I)I=E;let H=R;if(_>R)H=_;if(E>H)H=E;let N=0,O=0,Q=(I+H)/2;if(I!==H){if(Q<0.5)O=(H-I)/(H+I);if(Q>=0.5)O=(H-I)/(2-H-I);if(R===H)N=(_-E)/(H-I);else if(_===H)N=(E-R)/(H-I)+2;else if(E===H)N=(R-_)/(H-I)+4}if(N/=6,this.hue=N*256|0,this.saturation=O*256|0,this.lightness=Q*256|0,this.saturation<0)this.saturation=0;else if(this.saturation>255)this.saturation=255;if(this.lightness<0)this.lightness=0;else if(this.lightness>255)this.lightness=255;if(Q>0.5)this.luminance=(1-Q)*O*512|0;else this.luminance=Q*O*512|0;if(this.luminance<1)this.luminance=1;this.chroma=N*this.luminance|0;let U=this.hue+(Math.random()*16|0)-8;if(U<0)U=0;else if(U>255)U=255;let G=this.saturation+(Math.random()*48|0)-24;if(G<0)G=0;else if(G>255)G=255;let $=this.lightness+(Math.random()*48|0)-24;if($<0)$=0;else if($>255)$=255;this.hsl=U0.hsl24to16(U,G,$)}}class t0{static instances=[];static unpack(A){let R=new s(A.read("base_head.dat")),_=new s(A.read("base_type.dat")),E=new s(A.read("base_label.dat")),I=R.g2();R.pos+=2;for(let H=0;H<I;H++){let N=R.g2(),O=R.g1(),Q=new Uint8Array(O),U=new p(O,null);for(let G=0;G<O;G++){Q[G]=_.g1();let $=E.g1(),L=new Uint8Array($);for(let J=0;J<$;J++)L[J]=E.g1();U[G]=L}this.instances[N]=new t0,this.instances[N].animLength=O,this.instances[N].animTypes=Q,this.instances[N].animLabels=U}}animLength=0;animTypes=null;animLabels=null}class W0{static instances=[];static unpack(A){let R=new s(A.read("frame_head.dat")),_=new s(A.read("frame_tran1.dat")),E=new s(A.read("frame_tran2.dat")),I=new s(A.read("frame_del.dat")),H=R.g2();R.pos+=2;let N=new Int32Array(500),O=new Int32Array(500),Q=new Int32Array(500),U=new Int32Array(500);for(let G=0;G<H;G++){let $=R.g2(),L=this.instances[$]=new W0;L.frameDelay=I.g1();let J=R.g2(),q=t0.instances[J];L.base=q;let V=R.g1(),B=-1,F=0;for(let b=0;b<V;b++){if(!q.animTypes)throw new Error;let T=_.g1();if(T>0){if(q.animTypes[b]!==0){for(let w=b-1;w>B;w--)if(q.animTypes[w]===0){N[F]=w,O[F]=0,Q[F]=0,U[F]=0,F++;break}}N[F]=b;let j=0;if(q.animTypes[N[F]]===3)j=128;if((T&1)===0)O[F]=j;else O[F]=E.gsmart();if((T&2)===0)Q[F]=j;else Q[F]=E.gsmart();if((T&4)===0)U[F]=j;else U[F]=E.gsmart();B=b,F++}}L.frameLength=F,L.bases=new Int32Array(F),L.x=new Int32Array(F),L.y=new Int32Array(F),L.z=new Int32Array(F);for(let b=0;b<F;b++)L.bases[b]=N[b],L.x[b]=O[b],L.y[b]=Q[b],L.z[b]=U[b]}}frameDelay=0;base=null;frameLength=0;bases=null;x=null;y=null;z=null}class c extends S0{static totalCount=0;static instances=[];seqFrameCount=0;seqFrames=null;seqIframes=null;seqDelay=null;replayoff=-1;walkmerge=null;stretches=!1;seqPriority=5;righthand=-1;lefthand=-1;replaycount=99;seqDuration=0;static unpack(A){let R=new s(A.read("seq.dat"));this.totalCount=R.g2();for(let _=0;_<this.totalCount;_++){let E=new c(_).unpackType(R);if(E.seqFrameCount===0)E.seqFrameCount=1,E.seqFrames=new Int16Array(1),E.seqFrames[0]=-1,E.seqIframes=new Int16Array(1),E.seqIframes[0]=-1,E.seqDelay=new Int16Array(1),E.seqDelay[0]=-1;this.instances[_]=E}}unpack(A,R){if(A===1){this.seqFrameCount=R.g1(),this.seqFrames=new Int16Array(this.seqFrameCount),this.seqIframes=new Int16Array(this.seqFrameCount),this.seqDelay=new Int16Array(this.seqFrameCount);for(let _=0;_<this.seqFrameCount;_++){if(this.seqFrames[_]=R.g2(),this.seqIframes[_]=R.g2(),this.seqIframes[_]===65535)this.seqIframes[_]=-1;if(this.seqDelay[_]=R.g2(),this.seqDelay[_]===0)this.seqDelay[_]=W0.instances[this.seqFrames[_]].frameDelay;if(this.seqDelay[_]===0)this.seqDelay[_]=1;this.seqDuration+=this.seqDelay[_]}}else if(A===2)this.replayoff=R.g2();else if(A===3){let _=R.g1();this.walkmerge=new Int32Array(_+1);for(let E=0;E<_;E++)this.walkmerge[E]=R.g1();this.walkmerge[_]=9999999}else if(A===4)this.stretches=!0;else if(A===5)this.seqPriority=R.g1();else if(A===6)this.righthand=R.g2();else if(A===7)this.lefthand=R.g2();else if(A===8)this.replaycount=R.g1()}}class Z6{bucketCount;buckets;constructor(A){this.buckets=new Array(A),this.bucketCount=A;for(let R=0;R<A;R++){let _=this.buckets[R]=new k0;_.next=_,_.prev=_}}get(A){let R=this.buckets[Number(A&BigInt(this.bucketCount-1))];for(let _=R.next;_!==R;_=_.next){if(!_)continue;if(_.key===A)return _}return null}put(A,R){if(R.prev)R.unlink();let _=this.buckets[Number(A&BigInt(this.bucketCount-1))];if(R.prev=_.prev,R.next=_,R.prev)R.prev.next=R;R.next.prev=R,R.key=A}}class h6{head=new Y0;constructor(){this.head.next2=this.head,this.head.prev2=this.head}push(A){if(A.prev2)A.unlink2();if(A.prev2=this.head.prev2,A.next2=this.head,A.prev2)A.prev2.next2=A;A.next2.prev2=A}pop(){let A=this.head.next2;if(A===this.head)return null;else return A?.unlink2(),A}}class b0{capacity;hashtable=new Z6(1024);cacheHistory=new h6;cacheAvailable;constructor(A){this.capacity=A,this.cacheAvailable=A}get(A){let R=this.hashtable.get(A);if(R)this.cacheHistory.push(R);return R}put(A,R){if(this.cacheAvailable===0){let _=this.cacheHistory.pop();_?.unlink(),_?.unlink2()}else this.cacheAvailable--;this.hashtable.put(A,R),this.cacheHistory.push(R)}clear(){while(!0){let A=this.cacheHistory.pop();if(!A){this.cacheAvailable=this.capacity;return}A.unlink(),A.unlink2()}}}class D{static WALL_STRAIGHT=new D(0,0);static WALL_DIAGONAL_CORNER=new D(1,0);static WALL_L=new D(2,0);static WALL_SQUARE_CORNER=new D(3,0);static WALLDECOR_STRAIGHT_NOOFFSET=new D(4,1);static WALLDECOR_STRAIGHT_OFFSET=new D(5,1);static WALLDECOR_DIAGONAL_OFFSET=new D(6,1);static WALLDECOR_DIAGONAL_NOOFFSET=new D(7,1);static WALLDECOR_DIAGONAL_BOTH=new D(8,1);static WALL_DIAGONAL=new D(9,2);static CENTREPIECE_STRAIGHT=new D(10,2);static CENTREPIECE_DIAGONAL=new D(11,2);static ROOF_STRAIGHT=new D(12,2);static ROOF_DIAGONAL_WITH_ROOFEDGE=new D(13,2);static ROOF_DIAGONAL=new D(14,2);static ROOF_L_CONCAVE=new D(15,2);static ROOF_L_CONVEX=new D(16,2);static ROOF_FLAT=new D(17,2);static ROOFEDGE_STRAIGHT=new D(18,2);static ROOFEDGE_DIAGONAL_CORNER=new D(19,2);static ROOFEDGE_L=new D(20,2);static ROOFEDGE_SQUARE_CORNER=new D(21,2);static GROUND_DECOR=new D(22,3);static values(){return[this.WALL_STRAIGHT,this.WALL_DIAGONAL_CORNER,this.ROOF_FLAT,this.ROOF_L_CONCAVE,this.WALL_L,this.ROOF_DIAGONAL,this.WALL_DIAGONAL,this.WALL_SQUARE_CORNER,this.GROUND_DECOR,this.ROOF_STRAIGHT,this.CENTREPIECE_DIAGONAL,this.WALLDECOR_DIAGONAL_OFFSET,this.ROOFEDGE_L,this.CENTREPIECE_STRAIGHT,this.WALLDECOR_STRAIGHT_OFFSET,this.ROOF_DIAGONAL_WITH_ROOFEDGE,this.WALLDECOR_DIAGONAL_NOOFFSET,this.WALLDECOR_STRAIGHT_NOOFFSET,this.ROOF_L_CONVEX,this.WALLDECOR_DIAGONAL_BOTH,this.ROOFEDGE_DIAGONAL_CORNER,this.ROOFEDGE_SQUARE_CORNER,this.ROOFEDGE_STRAIGHT]}static of(A){let R=this.values();for(let _=0;_<R.length;_++){let E=R[_];if(E.id===A)return E}throw Error("shape not found")}id;layer;constructor(A,R){this.id=A,this.layer=R}}class Z1{vertexCount=0;faceCount=0;texturedFaceCount=0;vertexFlagsOffset=-1;vertexXOffset=-1;vertexYOffset=-1;vertexZOffset=-1;vertexLabelsOffset=-1;faceVerticesOffset=-1;faceOrientationsOffset=-1;faceColorsOffset=-1;faceInfosOffset=-1;facePrioritiesOffset=0;faceAlphasOffset=-1;faceLabelsOffset=-1;faceTextureAxisOffset=-1;data=null}class f6{x=0;y=0;z=0;w=0}class K extends Y0{static modelMeta=null;static head=null;static face1=null;static face2=null;static face3=null;static face4=null;static face5=null;static point1=null;static point2=null;static point3=null;static point4=null;static point5=null;static vertex1=null;static vertex2=null;static axis=null;static faceClippedX=new p(4096,!1);static faceNearClipped=new p(4096,!1);static vertexScreenX=new Int32Array(4096);static vertexScreenY=new Int32Array(4096);static vertexScreenZ=new Int32Array(4096);static vertexViewSpaceX=new Int32Array(4096);static vertexViewSpaceY=new Int32Array(4096);static vertexViewSpaceZ=new Int32Array(4096);static tmpDepthFaceCount=new Int32Array(1500);static tmpDepthFaces=new M0(1500,512);static tmpPriorityFaceCount=new Int32Array(12);static tmpPriorityFaces=new M0(12,2000);static tmpPriority10FaceDepth=new Int32Array(2000);static tmpPriority11FaceDepth=new Int32Array(2000);static tmpPriorityDepthSum=new Int32Array(12);static clippedX=new Int32Array(10);static clippedY=new Int32Array(10);static clippedColor=new Int32Array(10);static baseX=0;static baseY=0;static baseZ=0;static checkHover=!1;static mouseX=0;static mouseY=0;static pickedCount=0;static picked=new Int32Array(1000);static checkHoverFace=!1;static unpack(A){try{K.head=new s(A.read("ob_head.dat")),K.face1=new s(A.read("ob_face1.dat")),K.face2=new s(A.read("ob_face2.dat")),K.face3=new s(A.read("ob_face3.dat")),K.face4=new s(A.read("ob_face4.dat")),K.face5=new s(A.read("ob_face5.dat")),K.point1=new s(A.read("ob_point1.dat")),K.point2=new s(A.read("ob_point2.dat")),K.point3=new s(A.read("ob_point3.dat")),K.point4=new s(A.read("ob_point4.dat")),K.point5=new s(A.read("ob_point5.dat")),K.vertex1=new s(A.read("ob_vertex1.dat")),K.vertex2=new s(A.read("ob_vertex2.dat")),K.axis=new s(A.read("ob_axis.dat")),K.head.pos=0,K.point1.pos=0,K.point2.pos=0,K.point3.pos=0,K.point4.pos=0,K.vertex1.pos=0,K.vertex2.pos=0;let R=K.head.g2();K.modelMeta=new p(R+100,null);let _=0,E=0,I=0,H=0,N=0,O=0,Q=0;for(let U=0;U<R;U++){let G=K.head.g2(),$=new Z1;$.vertexCount=K.head.g2(),$.faceCount=K.head.g2(),$.texturedFaceCount=K.head.g1(),$.vertexFlagsOffset=K.point1.pos,$.vertexXOffset=K.point2.pos,$.vertexYOffset=K.point3.pos,$.vertexZOffset=K.point4.pos,$.faceVerticesOffset=K.vertex1.pos,$.faceOrientationsOffset=K.vertex2.pos;let L=K.head.g1(),J=K.head.g1(),q=K.head.g1(),V=K.head.g1(),B=K.head.g1();for(let F=0;F<$.vertexCount;F++){let b=K.point1.g1();if((b&1)!==0)K.point2.gsmart();if((b&2)!==0)K.point3.gsmart();if((b&4)!==0)K.point4.gsmart()}for(let F=0;F<$.faceCount;F++){if(K.vertex2.g1()===1)K.vertex1.gsmart(),K.vertex1.gsmart();K.vertex1.gsmart()}if($.faceColorsOffset=I,I+=$.faceCount*2,L===1)$.faceInfosOffset=H,H+=$.faceCount;if(J===255)$.facePrioritiesOffset=N,N+=$.faceCount;else $.facePrioritiesOffset=-J-1;if(q===1)$.faceAlphasOffset=O,O+=$.faceCount;if(V===1)$.faceLabelsOffset=Q,Q+=$.faceCount;if(B===1)$.vertexLabelsOffset=E,E+=$.vertexCount;$.faceTextureAxisOffset=_,_+=$.texturedFaceCount,K.modelMeta[G]=$}}catch(R){}}static mulColorLightness(A,R,_){if((_&2)===2){if(R<0)R=0;else if(R>127)R=127;return 127-R}if(R=R*(A&127)>>7,R<2)R=2;else if(R>126)R=126;return(A&65408)+R}static modelCopyFaces(A,R,_){let{vertexCount:E,faceCount:I,texturedFaceCount:H}=A,N;if(R){N=new Int32Array(E);for(let J=0;J<E;J++)N[J]=A.vertexY[J]}else N=A.vertexY;let O,Q,U,G,$=null,L=null;if(_){O=new Int32Array(I),Q=new Int32Array(I),U=new Int32Array(I);for(let J=0;J<I;J++){if(A.faceColorA)O[J]=A.faceColorA[J];if(A.faceColorB)Q[J]=A.faceColorB[J];if(A.faceColorC)U[J]=A.faceColorC[J]}if(G=new Int32Array(I),!A.faceInfo)for(let J=0;J<I;J++)G[J]=0;else for(let J=0;J<I;J++)G[J]=A.faceInfo[J];$=new p(E,null);for(let J=0;J<E;J++){let q=$[J]=new f6;if(A.vertexNormal){let V=A.vertexNormal[J];if(V)q.x=V.x,q.y=V.y,q.z=V.z,q.w=V.w}}L=A.vertexNormalOriginal}else O=A.faceColorA,Q=A.faceColorB,U=A.faceColorC,G=A.faceInfo;return new K({vertexCount:E,vertexX:A.vertexX,vertexY:N,vertexZ:A.vertexZ,faceCount:I,faceVertexA:A.faceVertexA,faceVertexB:A.faceVertexB,faceVertexC:A.faceVertexC,faceColorA:O,faceColorB:Q,faceColorC:U,faceInfo:G,facePriority:A.facePriority,faceAlpha:A.faceAlpha,faceColor:A.faceColor,priorityVal:A.priorityVal,texturedFaceCount:H,texturedVertexA:A.texturedVertexA,texturedVertexB:A.texturedVertexB,texturedVertexC:A.texturedVertexC,minX:A.minX,maxX:A.maxX,minZ:A.minZ,maxZ:A.maxZ,radius:A.radius,minY:A.minY,maxY:A.maxY,maxDepth:A.maxDepth,minDepth:A.minDepth,vertexNormal:$,vertexNormalOriginal:L})}static modelShareColored(A,R,_,E){let{vertexCount:I,faceCount:H,texturedFaceCount:N}=A,O,Q,U;if(E)O=A.vertexX,Q=A.vertexY,U=A.vertexZ;else{O=new Int32Array(I),Q=new Int32Array(I),U=new Int32Array(I);for(let L=0;L<I;L++)O[L]=A.vertexX[L],Q[L]=A.vertexY[L],U[L]=A.vertexZ[L]}let G;if(R)G=A.faceColor;else{G=new Int32Array(H);for(let L=0;L<H;L++)if(A.faceColor)G[L]=A.faceColor[L]}let $;if(_)$=A.faceAlpha;else if($=new Int32Array(H),!A.faceAlpha)for(let L=0;L<H;L++)$[L]=0;else for(let L=0;L<H;L++)$[L]=A.faceAlpha[L];return new K({vertexCount:I,vertexX:O,vertexY:Q,vertexZ:U,faceCount:H,faceVertexA:A.faceVertexA,faceVertexB:A.faceVertexB,faceVertexC:A.faceVertexC,faceColorA:null,faceColorB:null,faceColorC:null,faceInfo:A.faceInfo,facePriority:A.facePriority,faceAlpha:$,faceColor:G,priorityVal:A.priorityVal,texturedFaceCount:N,texturedVertexA:A.texturedVertexA,texturedVertexB:A.texturedVertexB,texturedVertexC:A.texturedVertexC,vertexLabel:A.vertexLabel,faceLabel:A.faceLabel})}static modelShareAlpha(A,R){let{vertexCount:_,faceCount:E,texturedFaceCount:I}=A,H=new Int32Array(_),N=new Int32Array(_),O=new Int32Array(_);for(let U=0;U<_;U++)H[U]=A.vertexX[U],N[U]=A.vertexY[U],O[U]=A.vertexZ[U];let Q;if(R)Q=A.faceAlpha;else if(Q=new Int32Array(E),!A.faceAlpha)for(let U=0;U<E;U++)Q[U]=0;else for(let U=0;U<E;U++)Q[U]=A.faceAlpha[U];return new K({vertexCount:_,vertexX:H,vertexY:N,vertexZ:O,faceCount:E,faceVertexA:A.faceVertexA,faceVertexB:A.faceVertexB,faceVertexC:A.faceVertexC,faceColorA:A.faceColorA,faceColorB:A.faceColorB,faceColorC:A.faceColorC,faceInfo:A.faceInfo,facePriority:A.facePriority,faceAlpha:Q,faceColor:A.faceColor,priorityVal:A.priorityVal,texturedFaceCount:I,texturedVertexA:A.texturedVertexA,texturedVertexB:A.texturedVertexB,texturedVertexC:A.texturedVertexC,labelVertices:A.labelVertices,labelFaces:A.labelFaces})}static modelFromModelsBounds(A,R){let _=!1,E=!1,I=!1,H=!1,N=0,O=0,Q=0,U=-1;for(let n=0;n<R;n++){let X=A[n];if(X){if(N+=X.vertexCount,O+=X.faceCount,Q+=X.texturedFaceCount,_||=X.faceInfo!==null,!X.facePriority){if(U===-1)U=X.priorityVal;if(U!==X.priorityVal)E=!0}else E=!0;I||=X.faceAlpha!==null,H||=X.faceColor!==null}}let G=new Int32Array(N),$=new Int32Array(N),L=new Int32Array(N),J=new Int32Array(O),q=new Int32Array(O),V=new Int32Array(O),B=new Int32Array(O),F=new Int32Array(O),b=new Int32Array(O),T=new Int32Array(Q),j=new Int32Array(Q),w=new Int32Array(Q),Z=null;if(_)Z=new Int32Array(O);let W=null;if(E)W=new Int32Array(O);let Y=null;if(I)Y=new Int32Array(O);let u=null;if(H)u=new Int32Array(O);N=0,O=0,Q=0;for(let n=0;n<R;n++){let X=A[n];if(X){let f=N;for(let g=0;g<X.vertexCount;g++)G[N]=X.vertexX[g],$[N]=X.vertexY[g],L[N]=X.vertexZ[g],N++;for(let g=0;g<X.faceCount;g++){if(J[O]=X.faceVertexA[g]+f,q[O]=X.faceVertexB[g]+f,V[O]=X.faceVertexC[g]+f,X.faceColorA)B[O]=X.faceColorA[g];if(X.faceColorB)F[O]=X.faceColorB[g];if(X.faceColorC)b[O]=X.faceColorC[g];if(_){if(!X.faceInfo){if(Z)Z[O]=0}else if(Z)Z[O]=X.faceInfo[g]}if(E){if(!X.facePriority){if(W)W[O]=X.priorityVal}else if(W)W[O]=X.facePriority[g]}if(I){if(!X.faceAlpha){if(Y)Y[O]=0}else if(Y)Y[O]=X.faceAlpha[g]}if(H&&X.faceColor){if(u)u[O]=X.faceColor[g]}O++}for(let g=0;g<X.texturedFaceCount;g++)T[Q]=X.texturedVertexA[g]+f,j[Q]=X.texturedVertexB[g]+f,w[Q]=X.texturedVertexC[g]+f,Q++}}let h=new K({vertexCount:N,vertexX:G,vertexY:$,vertexZ:L,faceCount:O,faceVertexA:J,faceVertexB:q,faceVertexC:V,faceColorA:B,faceColorB:F,faceColorC:b,faceInfo:Z,facePriority:W,faceAlpha:Y,faceColor:u,priorityVal:U,texturedFaceCount:Q,texturedVertexA:T,texturedVertexB:j,texturedVertexC:w});return h.calculateBoundsCylinder(),h}static modelFromModels(A,R){let _=!1,E=!1,I=!1,H=!1,N=0,O=0,Q=0,U=-1;for(let h=0;h<R;h++){let n=A[h];if(n){if(N+=n.vertexCount,O+=n.faceCount,Q+=n.texturedFaceCount,_||=n.faceInfo!==null,!n.facePriority){if(U===-1)U=n.priorityVal;if(U!==n.priorityVal)E=!0}else E=!0;I||=n.faceAlpha!==null,H||=n.faceLabel!==null}}let G=new Int32Array(N),$=new Int32Array(N),L=new Int32Array(N),J=new Int32Array(N),q=new Int32Array(O),V=new Int32Array(O),B=new Int32Array(O),F=new Int32Array(Q),b=new Int32Array(Q),T=new Int32Array(Q),j=null;if(_)j=new Int32Array(O);let w=null;if(E)w=new Int32Array(O);let Z=null;if(I)Z=new Int32Array(O);let W=null;if(H)W=new Int32Array(O);let Y=new Int32Array(O);N=0,O=0,Q=0;let u=(h,n,X,f,g,v,M)=>{let x=-1,y=h.vertexX[n],d=h.vertexY[n],A0=h.vertexZ[n];for(let t=0;t<M;t++)if(y===X[t]&&d===f[t]&&A0===g[t]){x=t;break}if(x===-1){if(X[M]=y,f[M]=d,g[M]=A0,v&&h.vertexLabel)v[M]=h.vertexLabel[n];x=M++}return{vertex:x,vertexCount:M}};for(let h=0;h<R;h++){let n=A[h];if(n){for(let X=0;X<n.faceCount;X++){if(_){if(!n.faceInfo){if(j)j[O]=0}else if(j)j[O]=n.faceInfo[X]}if(E){if(!n.facePriority){if(w)w[O]=n.priorityVal}else if(w)w[O]=n.facePriority[X]}if(I){if(!n.faceAlpha){if(Z)Z[O]=0}else if(Z)Z[O]=n.faceAlpha[X]}if(H&&n.faceLabel){if(W)W[O]=n.faceLabel[X]}if(n.faceColor)Y[O]=n.faceColor[X];let f=u(n,n.faceVertexA[X],G,$,L,J,N);N=f.vertexCount;let g=u(n,n.faceVertexB[X],G,$,L,J,N);N=g.vertexCount;let v=u(n,n.faceVertexC[X],G,$,L,J,N);N=v.vertexCount,q[O]=f.vertex,V[O]=g.vertex,B[O]=v.vertex,O++}for(let X=0;X<n.texturedFaceCount;X++){let f=u(n,n.texturedVertexA[X],G,$,L,J,N);N=f.vertexCount;let g=u(n,n.texturedVertexB[X],G,$,L,J,N);N=g.vertexCount;let v=u(n,n.texturedVertexC[X],G,$,L,J,N);N=v.vertexCount,F[Q]=f.vertex,b[Q]=g.vertex,T[Q]=v.vertex,Q++}}}return new K({vertexCount:N,vertexX:G,vertexY:$,vertexZ:L,faceCount:O,faceVertexA:q,faceVertexB:V,faceVertexC:B,faceColorA:null,faceColorB:null,faceColorC:null,faceInfo:j,facePriority:w,faceAlpha:Z,faceColor:Y,priorityVal:U,texturedFaceCount:Q,texturedVertexA:F,texturedVertexB:b,texturedVertexC:T,vertexLabel:J,faceLabel:W})}static model(A){if(!K.modelMeta)throw new Error;let R=K.modelMeta[A];if(!R)throw new Error;if(!K.head||!K.face1||!K.face2||!K.face3||!K.face4||!K.face5||!K.point1||!K.point2||!K.point3||!K.point4||!K.point5||!K.vertex1||!K.vertex2||!K.axis)throw new Error;let{vertexCount:_,faceCount:E,texturedFaceCount:I}=R,H=new Int32Array(_),N=new Int32Array(_),O=new Int32Array(_),Q=new Int32Array(E),U=new Int32Array(E),G=new Int32Array(E),$=new Int32Array(I),L=new Int32Array(I),J=new Int32Array(I),q=null;if(R.vertexLabelsOffset>=0)q=new Int32Array(_);let V=null;if(R.faceInfosOffset>=0)V=new Int32Array(E);let B=null,F=0;if(R.facePrioritiesOffset>=0)B=new Int32Array(E);else F=-R.facePrioritiesOffset-1;let b=null;if(R.faceAlphasOffset>=0)b=new Int32Array(E);let T=null;if(R.faceLabelsOffset>=0)T=new Int32Array(E);let j=new Int32Array(E);K.point1.pos=R.vertexFlagsOffset,K.point2.pos=R.vertexXOffset,K.point3.pos=R.vertexYOffset,K.point4.pos=R.vertexZOffset,K.point5.pos=R.vertexLabelsOffset;let w=0,Z=0,W=0,Y,u,h;for(let X=0;X<_;X++){let f=K.point1.g1();if(Y=0,(f&1)!==0)Y=K.point2.gsmart();if(u=0,(f&2)!==0)u=K.point3.gsmart();if(h=0,(f&4)!==0)h=K.point4.gsmart();if(H[X]=w+Y,N[X]=Z+u,O[X]=W+h,w=H[X],Z=N[X],W=O[X],q)q[X]=K.point5.g1()}K.face1.pos=R.faceColorsOffset,K.face2.pos=R.faceInfosOffset,K.face3.pos=R.facePrioritiesOffset,K.face4.pos=R.faceAlphasOffset,K.face5.pos=R.faceLabelsOffset;for(let X=0;X<E;X++){if(j[X]=K.face1.g2(),V)V[X]=K.face2.g1();if(B)B[X]=K.face3.g1();if(b)b[X]=K.face4.g1();if(T)T[X]=K.face5.g1()}K.vertex1.pos=R.faceVerticesOffset,K.vertex2.pos=R.faceOrientationsOffset,Y=0,u=0,h=0;let n=0;for(let X=0;X<E;X++){let f=K.vertex2.g1();if(f===1)Y=K.vertex1.gsmart()+n,n=Y,u=K.vertex1.gsmart()+n,n=u,h=K.vertex1.gsmart()+n,n=h;else if(f===2)u=h,h=K.vertex1.gsmart()+n,n=h;else if(f===3)Y=h,h=K.vertex1.gsmart()+n,n=h;else if(f===4){let g=Y;Y=u,u=g,h=K.vertex1.gsmart()+n,n=h}Q[X]=Y,U[X]=u,G[X]=h}K.axis.pos=R.faceTextureAxisOffset*6;for(let X=0;X<I;X++)$[X]=K.axis.g2(),L[X]=K.axis.g2(),J[X]=K.axis.g2();return new K({vertexCount:_,vertexX:H,vertexY:N,vertexZ:O,faceCount:E,faceVertexA:Q,faceVertexB:U,faceVertexC:G,faceColorA:null,faceColorB:null,faceColorC:null,faceInfo:V,facePriority:B,faceAlpha:b,faceColor:j,priorityVal:F,texturedFaceCount:I,texturedVertexA:$,texturedVertexB:L,texturedVertexC:J,vertexLabel:q,faceLabel:T})}vertexCount;vertexX;vertexY;vertexZ;faceCount;faceVertexA;faceVertexB;faceVertexC;faceColorA;faceColorB;faceColorC;faceInfo;facePriority;faceAlpha;faceColor;priorityVal;texturedFaceCount;texturedVertexA;texturedVertexB;texturedVertexC;minX;maxX;minZ;maxZ;radius;minY;maxY;maxDepth;minDepth;vertexLabel;faceLabel;labelVertices;labelFaces;vertexNormal;vertexNormalOriginal;objRaise=0;pickAabb=!1;pickedFace=-1;pickedFaceDepth=-1;constructor(A){super();this.vertexCount=A.vertexCount,this.vertexX=A.vertexX,this.vertexY=A.vertexY,this.vertexZ=A.vertexZ,this.faceCount=A.faceCount,this.faceVertexA=A.faceVertexA,this.faceVertexB=A.faceVertexB,this.faceVertexC=A.faceVertexC,this.faceColorA=A.faceColorA,this.faceColorB=A.faceColorB,this.faceColorC=A.faceColorC,this.faceInfo=A.faceInfo,this.facePriority=A.facePriority,this.faceAlpha=A.faceAlpha,this.faceColor=A.faceColor,this.priorityVal=A.priorityVal,this.texturedFaceCount=A.texturedFaceCount,this.texturedVertexA=A.texturedVertexA,this.texturedVertexB=A.texturedVertexB,this.texturedVertexC=A.texturedVertexC,this.minX=A.minX??0,this.maxX=A.maxX??0,this.minZ=A.minZ??0,this.maxZ=A.maxZ??0,this.radius=A.radius??0,this.minY=A.minY??0,this.maxY=A.maxY??0,this.maxDepth=A.maxDepth??0,this.minDepth=A.minDepth??0,this.vertexLabel=A.vertexLabel??null,this.faceLabel=A.faceLabel??null,this.labelVertices=A.labelVertices??null,this.labelFaces=A.labelFaces??null,this.vertexNormal=A.vertexNormal??null,this.vertexNormalOriginal=A.vertexNormalOriginal??null}calculateBoundsCylinder(){this.maxY=0,this.radius=0,this.minY=0;for(let A=0;A<this.vertexCount;A++){let R=this.vertexX[A],_=this.vertexY[A],E=this.vertexZ[A];if(-_>this.maxY)this.maxY=-_;if(_>this.minY)this.minY=_;let I=R*R+E*E;if(I>this.radius)this.radius=I}this.radius=Math.sqrt(this.radius)+0.99|0,this.minDepth=Math.sqrt(this.radius*this.radius+this.maxY*this.maxY)+0.99|0,this.maxDepth=this.minDepth+(Math.sqrt(this.radius*this.radius+this.minY*this.minY)+0.99|0)}calculateBoundsY(){this.maxY=0,this.minY=0;for(let A=0;A<this.vertexCount;A++){let R=this.vertexY[A];if(-R>this.maxY)this.maxY=-R;if(R>this.minY)this.minY=R}this.minDepth=Math.sqrt(this.radius*this.radius+this.maxY*this.maxY)+0.99|0,this.maxDepth=this.minDepth+(Math.sqrt(this.radius*this.radius+this.minY*this.minY)+0.99|0)}createLabelReferences(){if(this.vertexLabel){let A=new Int32Array(256),R=0;for(let E=0;E<this.vertexCount;E++){let I=this.vertexLabel[E];if(A[I]++,I>R)R=I}this.labelVertices=new p(R+1,null);for(let E=0;E<=R;E++)this.labelVertices[E]=new Int32Array(A[E]),A[E]=0;let _=0;while(_<this.vertexCount){let E=this.vertexLabel[_],I=this.labelVertices[E];if(!I)continue;I[A[E]++]=_++}this.vertexLabel=null}if(this.faceLabel){let A=new Int32Array(256),R=0;for(let E=0;E<this.faceCount;E++){let I=this.faceLabel[E];if(A[I]++,I>R)R=I}this.labelFaces=new p(R+1,null);for(let E=0;E<=R;E++)this.labelFaces[E]=new Int32Array(A[E]),A[E]=0;let _=0;while(_<this.faceCount){let E=this.faceLabel[_],I=this.labelFaces[E];if(!I)continue;I[A[E]++]=_++}this.faceLabel=null}}applyTransforms(A,R,_){if(A===-1)return;if(!_||R===-1)this.applyTransform(A);else{let E=W0.instances[A],I=W0.instances[R],H=E.base;K.baseX=0,K.baseY=0,K.baseZ=0;let N=0,O=_[N++];for(let Q=0;Q<E.frameLength;Q++){if(!E.bases)continue;let U=E.bases[Q];while(U>O)O=_[N++];if(H&&H.animTypes&&E.x&&E.y&&E.z&&H.animLabels&&(U!==O||H.animTypes[U]===0))this.applyTransform2(E.x[Q],E.y[Q],E.z[Q],H.animLabels[U],H.animTypes[U])}K.baseX=0,K.baseY=0,K.baseZ=0,N=0,O=_[N++];for(let Q=0;Q<I.frameLength;Q++){if(!I.bases)continue;let U=I.bases[Q];while(U>O)O=_[N++];if(H&&H.animTypes&&I.x&&I.y&&I.z&&H.animLabels&&(U===O||H.animTypes[U]===0))this.applyTransform2(I.x[Q],I.y[Q],I.z[Q],H.animLabels[U],H.animTypes[U])}}}applyTransform(A){if(!this.labelVertices||A===-1||!W0.instances[A])return;let R=W0.instances[A],_=R.base;K.baseX=0,K.baseY=0,K.baseZ=0;for(let E=0;E<R.frameLength;E++){if(!R.bases||!R.x||!R.y||!R.z||!_||!_.animLabels||!_.animTypes)continue;let I=R.bases[E];this.applyTransform2(R.x[E],R.y[E],R.z[E],_.animLabels[I],_.animTypes[I])}}rotateY90(){for(let A=0;A<this.vertexCount;A++){let R=this.vertexX[A];this.vertexX[A]=this.vertexZ[A],this.vertexZ[A]=-R}}rotateX(A){let R=m.sin[A],_=m.cos[A];for(let E=0;E<this.vertexCount;E++){let I=this.vertexY[E]*_-this.vertexZ[E]*R>>16;this.vertexZ[E]=this.vertexY[E]*R+this.vertexZ[E]*_>>16,this.vertexY[E]=I}}translateModel(A,R,_){for(let E=0;E<this.vertexCount;E++)this.vertexX[E]+=R,this.vertexY[E]+=A,this.vertexZ[E]+=_}recolor(A,R){if(!this.faceColor)return;for(let _=0;_<this.faceCount;_++)if(this.faceColor[_]===A)this.faceColor[_]=R}rotateY180(){for(let A=0;A<this.vertexCount;A++)this.vertexZ[A]=-this.vertexZ[A];for(let A=0;A<this.faceCount;A++){let R=this.faceVertexA[A];this.faceVertexA[A]=this.faceVertexC[A],this.faceVertexC[A]=R}}scale(A,R,_){for(let E=0;E<this.vertexCount;E++)this.vertexX[E]=this.vertexX[E]*A/128|0,this.vertexY[E]=this.vertexY[E]*R/128|0,this.vertexZ[E]=this.vertexZ[E]*_/128|0}calculateNormals(A,R,_,E,I,H){let N=Math.sqrt(_*_+E*E+I*I)|0,O=R*N>>8;if(!this.faceColorA||!this.faceColorB||!this.faceColorC)this.faceColorA=new Int32Array(this.faceCount),this.faceColorB=new Int32Array(this.faceCount),this.faceColorC=new Int32Array(this.faceCount);if(!this.vertexNormal){this.vertexNormal=new p(this.vertexCount,null);for(let Q=0;Q<this.vertexCount;Q++)this.vertexNormal[Q]=new f6}for(let Q=0;Q<this.faceCount;Q++){let U=this.faceVertexA[Q],G=this.faceVertexB[Q],$=this.faceVertexC[Q],L=this.vertexX[G]-this.vertexX[U],J=this.vertexY[G]-this.vertexY[U],q=this.vertexZ[G]-this.vertexZ[U],V=this.vertexX[$]-this.vertexX[U],B=this.vertexY[$]-this.vertexY[U],F=this.vertexZ[$]-this.vertexZ[U],b=J*F-B*q,T=q*V-F*L,j=L*B-V*J;while(b>8192||T>8192||j>8192||b<-8192||T<-8192||j<-8192)b>>=1,T>>=1,j>>=1;let w=Math.sqrt(b*b+T*T+j*j)|0;if(w<=0)w=1;if(b=b*256/w|0,T=T*256/w|0,j=j*256/w|0,!this.faceInfo||(this.faceInfo[Q]&1)===0){let Z=this.vertexNormal[U];if(Z)Z.x+=b,Z.y+=T,Z.z+=j,Z.w++;if(Z=this.vertexNormal[G],Z)Z.x+=b,Z.y+=T,Z.z+=j,Z.w++;if(Z=this.vertexNormal[$],Z)Z.x+=b,Z.y+=T,Z.z+=j,Z.w++}else{let Z=A+((_*b+E*T+I*j)/(O+(O/2|0))|0);if(this.faceColor)this.faceColorA[Q]=K.mulColorLightness(this.faceColor[Q],Z,this.faceInfo[Q])}}if(H)this.applyLighting(A,O,_,E,I);else{this.vertexNormalOriginal=new p(this.vertexCount,null);for(let Q=0;Q<this.vertexCount;Q++){let U=this.vertexNormal[Q],G=new f6;if(U)G.x=U.x,G.y=U.y,G.z=U.z,G.w=U.w;this.vertexNormalOriginal[Q]=G}}if(H)this.calculateBoundsCylinder();else this.calculateBoundsAABB()}applyLighting(A,R,_,E,I){for(let H=0;H<this.faceCount;H++){let N=this.faceVertexA[H],O=this.faceVertexB[H],Q=this.faceVertexC[H];if(!this.faceInfo&&this.faceColor&&this.vertexNormal&&this.faceColorA&&this.faceColorB&&this.faceColorC){let U=this.faceColor[H],G=this.vertexNormal[N];if(G)this.faceColorA[H]=K.mulColorLightness(U,A+((_*G.x+E*G.y+I*G.z)/(R*G.w)|0),0);let $=this.vertexNormal[O];if($)this.faceColorB[H]=K.mulColorLightness(U,A+((_*$.x+E*$.y+I*$.z)/(R*$.w)|0),0);let L=this.vertexNormal[Q];if(L)this.faceColorC[H]=K.mulColorLightness(U,A+((_*L.x+E*L.y+I*L.z)/(R*L.w)|0),0)}else if(this.faceInfo&&(this.faceInfo[H]&1)===0&&this.faceColor&&this.vertexNormal&&this.faceColorA&&this.faceColorB&&this.faceColorC){let U=this.faceColor[H],G=this.faceInfo[H],$=this.vertexNormal[N];if($)this.faceColorA[H]=K.mulColorLightness(U,A+((_*$.x+E*$.y+I*$.z)/(R*$.w)|0),G);let L=this.vertexNormal[O];if(L)this.faceColorB[H]=K.mulColorLightness(U,A+((_*L.x+E*L.y+I*L.z)/(R*L.w)|0),G);let J=this.vertexNormal[Q];if(J)this.faceColorC[H]=K.mulColorLightness(U,A+((_*J.x+E*J.y+I*J.z)/(R*J.w)|0),G)}}if(this.vertexNormal=null,this.vertexNormalOriginal=null,this.vertexLabel=null,this.faceLabel=null,this.faceInfo){for(let H=0;H<this.faceCount;H++)if((this.faceInfo[H]&2)===2)return}this.faceColor=null}drawSimple(A,R,_,E,I,H,N){let O=m.sin[A],Q=m.cos[A],U=m.sin[R],G=m.cos[R],$=m.sin[_],L=m.cos[_],J=m.sin[E],q=m.cos[E],V=H*J+N*q>>16;for(let B=0;B<this.vertexCount;B++){let F=this.vertexX[B],b=this.vertexY[B],T=this.vertexZ[B],j;if(_!==0)j=b*$+F*L>>16,b=b*L-F*$>>16,F=j;if(A!==0)j=b*Q-T*O>>16,T=b*O+T*Q>>16,b=j;if(R!==0)j=T*U+F*G>>16,T=T*G-F*U>>16,F=j;if(F+=I,b+=H,T+=N,j=b*q-T*J>>16,T=b*J+T*q>>16,b=j,K.vertexScreenX&&K.vertexScreenY&&K.vertexScreenZ)K.vertexScreenZ[B]=T-V,K.vertexScreenX[B]=m.centerX+((F<<9)/T|0),K.vertexScreenY[B]=m.centerY+((b<<9)/T|0);if(this.texturedFaceCount>0&&K.vertexViewSpaceX&&K.vertexViewSpaceY&&K.vertexViewSpaceZ)K.vertexViewSpaceX[B]=F,K.vertexViewSpaceY[B]=b,K.vertexViewSpaceZ[B]=T}try{this.draw2(!1,!1,0)}catch(B){}}draw(A,R,_,E,I,H,N,O,Q){C.startDrawModel(this,A,H,N,O,Q);let U=O*I-H*E>>16,G=N*R+U*_>>16,$=this.radius*_>>16,L=G+$;if(L<=50||G>=3500)return;let J=O*E+H*I>>16,q=J-this.radius<<9;if((q/L|0)>=k.centerX2d)return;let V=J+this.radius<<9;if((V/L|0)<=-k.centerX2d)return;let B=N*_-U*R>>16,F=this.radius*R>>16,b=B+F<<9;if((b/L|0)<=-k.centerY2d)return;let T=F+(this.maxY*_>>16),j=B-T<<9;if((j/L|0)>=k.centerY2d)return;let w=$+(this.maxY*R>>16),Z=G-w<=50,W=!1;if(Q>0&&K.checkHover){let X=G-$;if(X<=50)X=50;if(J>0)q=q/L|0,V=V/X|0;else V=V/L|0,q=q/X|0;if(B>0)j=j/L|0,b=b/X|0;else b=b/L|0,j=j/X|0;let f=K.mouseX-m.centerX,g=K.mouseY-m.centerY;if(f>q&&f<V&&g>j&&g<b)if(this.pickAabb)K.picked[K.pickedCount++]=Q;else W=!0}let Y=m.centerX,u=m.centerY,h=0,n=0;if(A!==0)h=m.sin[A],n=m.cos[A];for(let X=0;X<this.vertexCount;X++){let f=this.vertexX[X],g=this.vertexY[X],v=this.vertexZ[X],M;if(A!==0)M=v*h+f*n>>16,v=v*n-f*h>>16,f=M;if(f+=H,g+=N,v+=O,M=v*E+f*I>>16,v=v*I-f*E>>16,f=M,M=g*_-v*R>>16,v=g*R+v*_>>16,g=M,K.vertexScreenZ)K.vertexScreenZ[X]=v-G;if(v>=50&&K.vertexScreenX&&K.vertexScreenY)K.vertexScreenX[X]=Y+((f<<9)/v|0),K.vertexScreenY[X]=u+((g<<9)/v|0);else if(K.vertexScreenX)K.vertexScreenX[X]=-5000,Z=!0;if((Z||this.texturedFaceCount>0)&&K.vertexViewSpaceX&&K.vertexViewSpaceY&&K.vertexViewSpaceZ)K.vertexViewSpaceX[X]=f,K.vertexViewSpaceY[X]=g,K.vertexViewSpaceZ[X]=v}try{this.draw2(Z,W,Q)}catch(X){}C.endDrawModel(this,A,H,N,O,Q)}draw2(A,R,_,E=!1){if(K.checkHoverFace)this.pickedFace=-1,this.pickedFaceDepth=-1;for(let O=0;O<this.maxDepth;O++)if(K.tmpDepthFaceCount)K.tmpDepthFaceCount[O]=0;for(let O=0;O<this.faceCount;O++){if(this.faceInfo&&this.faceInfo[O]===-1)continue;if(K.vertexScreenX&&K.vertexScreenY&&K.vertexScreenZ&&K.tmpDepthFaces&&K.tmpDepthFaceCount){let Q=this.faceVertexA[O],U=this.faceVertexB[O],G=this.faceVertexC[O],$=K.vertexScreenX[Q],L=K.vertexScreenX[U],J=K.vertexScreenX[G],q=K.vertexScreenY[Q],V=K.vertexScreenY[U],B=K.vertexScreenY[G],F=K.vertexScreenZ[Q],b=K.vertexScreenZ[U],T=K.vertexScreenZ[G];if(A&&($===-5000||L===-5000||J===-5000)){if(K.faceNearClipped)K.faceNearClipped[O]=!0;if(K.tmpDepthFaces&&K.tmpDepthFaceCount){let j=((F+b+T)/3|0)+this.minDepth;K.tmpDepthFaces[j][K.tmpDepthFaceCount[j]++]=O}}else{if(R&&this.pointWithinTriangle(K.mouseX,K.mouseY,q,V,B,$,L,J))K.picked[K.pickedCount++]=_,R=!1;let j=$-L,w=q-V,Z=J-L,W=B-V;if(j*W-w*Z<=0)continue;if(K.faceNearClipped)K.faceNearClipped[O]=!1;if(K.faceClippedX)K.faceClippedX[O]=$<0||L<0||J<0||$>k.boundX||L>k.boundX||J>k.boundX;if(K.tmpDepthFaces&&K.tmpDepthFaceCount){let Y=((F+b+T)/3|0)+this.minDepth;if(K.tmpDepthFaces[Y][K.tmpDepthFaceCount[Y]++]=O,K.checkHoverFace&&this.pointWithinTriangle(K.mouseX,K.mouseY,q,V,B,$,L,J)&&this.pickedFaceDepth<Y)this.pickedFace=O,this.pickedFaceDepth=Y}}}}if(!this.facePriority&&K.tmpDepthFaceCount){for(let O=this.maxDepth-1;O>=0;O--){let Q=K.tmpDepthFaceCount[O];if(Q<=0)continue;if(K.tmpDepthFaces){let U=K.tmpDepthFaces[O];for(let G=0;G<Q;G++)try{this.drawFace(U[G],E)}catch($){}}}return}for(let O=0;O<12;O++)if(K.tmpPriorityFaceCount&&K.tmpPriorityDepthSum)K.tmpPriorityFaceCount[O]=0,K.tmpPriorityDepthSum[O]=0;if(K.tmpDepthFaceCount)for(let O=this.maxDepth-1;O>=0;O--){let Q=K.tmpDepthFaceCount[O];if(Q>0&&K.tmpDepthFaces){let U=K.tmpDepthFaces[O];for(let G=0;G<Q;G++)if(this.facePriority&&K.tmpPriorityFaceCount&&K.tmpPriorityFaces){let $=U[G],L=this.facePriority[$],J=K.tmpPriorityFaceCount[L]++;if(K.tmpPriorityFaces[L][J]=$,L<10&&K.tmpPriorityDepthSum)K.tmpPriorityDepthSum[L]+=O;else if(L===10&&K.tmpPriority10FaceDepth)K.tmpPriority10FaceDepth[J]=O;else if(K.tmpPriority11FaceDepth)K.tmpPriority11FaceDepth[J]=O}}}let I=0;if(K.tmpPriorityFaceCount&&K.tmpPriorityDepthSum&&(K.tmpPriorityFaceCount[1]>0||K.tmpPriorityFaceCount[2]>0))I=(K.tmpPriorityDepthSum[1]+K.tmpPriorityDepthSum[2])/(K.tmpPriorityFaceCount[1]+K.tmpPriorityFaceCount[2])|0;let H=0;if(K.tmpPriorityFaceCount&&K.tmpPriorityDepthSum&&(K.tmpPriorityFaceCount[3]>0||K.tmpPriorityFaceCount[4]>0))H=(K.tmpPriorityDepthSum[3]+K.tmpPriorityDepthSum[4])/(K.tmpPriorityFaceCount[3]+K.tmpPriorityFaceCount[4])|0;let N=0;if(K.tmpPriorityFaceCount&&K.tmpPriorityDepthSum&&(K.tmpPriorityFaceCount[6]>0||K.tmpPriorityFaceCount[8]>0))N=(K.tmpPriorityDepthSum[6]+K.tmpPriorityDepthSum[8])/(K.tmpPriorityFaceCount[6]+K.tmpPriorityFaceCount[8])|0;if(K.tmpPriorityFaceCount&&K.tmpPriorityFaces){let O=0,Q=K.tmpPriorityFaceCount[10],U=K.tmpPriorityFaces[10],G=K.tmpPriority10FaceDepth;if(O===Q)O=0,Q=K.tmpPriorityFaceCount[11],U=K.tmpPriorityFaces[11],G=K.tmpPriority11FaceDepth;let $;if(O<Q&&G)$=G[O];else $=-1000;for(let L=0;L<10;L++){while(L===0&&$>I)try{if(this.drawFace(U[O++],E),O===Q&&U!==K.tmpPriorityFaces[11])O=0,Q=K.tmpPriorityFaceCount[11],U=K.tmpPriorityFaces[11],G=K.tmpPriority11FaceDepth;if(O<Q&&G)$=G[O];else $=-1000}catch(V){}while(L===3&&$>H)try{if(this.drawFace(U[O++],E),O===Q&&U!==K.tmpPriorityFaces[11])O=0,Q=K.tmpPriorityFaceCount[11],U=K.tmpPriorityFaces[11],G=K.tmpPriority11FaceDepth;if(O<Q&&G)$=G[O];else $=-1000}catch(V){}while(L===5&&$>N)try{if(this.drawFace(U[O++],E),O===Q&&U!==K.tmpPriorityFaces[11])O=0,Q=K.tmpPriorityFaceCount[11],U=K.tmpPriorityFaces[11],G=K.tmpPriority11FaceDepth;if(O<Q&&G)$=G[O];else $=-1000}catch(V){}let J=K.tmpPriorityFaceCount[L],q=K.tmpPriorityFaces[L];for(let V=0;V<J;V++)try{this.drawFace(q[V],E)}catch(B){}}while($!==-1000)try{if(this.drawFace(U[O++],E),O===Q&&U!==K.tmpPriorityFaces[11])O=0,U=K.tmpPriorityFaces[11],Q=K.tmpPriorityFaceCount[11],G=K.tmpPriority11FaceDepth;if(O<Q&&G)$=G[O];else $=-1000}catch(L){}}}drawFace(A,R=!1){if(C.drawModelTriangle(this,A))return;if(K.faceNearClipped&&K.faceNearClipped[A]){this.drawNearClippedFace(A,R);return}let _=this.faceVertexA[A],E=this.faceVertexB[A],I=this.faceVertexC[A];if(K.faceClippedX)m.clipX=K.faceClippedX[A];if(!this.faceAlpha)m.alpha=0;else m.alpha=this.faceAlpha[A];let H;if(!this.faceInfo)H=0;else H=this.faceInfo[A]&3;if(R&&K.vertexScreenX&&K.vertexScreenY&&this.faceColorA&&this.faceColorB&&this.faceColorC)m.drawLine(K.vertexScreenX[_],K.vertexScreenY[_],K.vertexScreenX[E],K.vertexScreenY[E],m.hslPal[this.faceColorA[A]]),m.drawLine(K.vertexScreenX[E],K.vertexScreenY[E],K.vertexScreenX[I],K.vertexScreenY[I],m.hslPal[this.faceColorB[A]]),m.drawLine(K.vertexScreenX[I],K.vertexScreenY[I],K.vertexScreenX[_],K.vertexScreenY[_],m.hslPal[this.faceColorC[A]]);else if(H===0&&this.faceColorA&&this.faceColorB&&this.faceColorC&&K.vertexScreenX&&K.vertexScreenY)m.fillGouraudTriangle(K.vertexScreenX[_],K.vertexScreenX[E],K.vertexScreenX[I],K.vertexScreenY[_],K.vertexScreenY[E],K.vertexScreenY[I],this.faceColorA[A],this.faceColorB[A],this.faceColorC[A]);else if(H===1&&this.faceColorA&&K.vertexScreenX&&K.vertexScreenY)m.fillTriangle(K.vertexScreenX[_],K.vertexScreenX[E],K.vertexScreenX[I],K.vertexScreenY[_],K.vertexScreenY[E],K.vertexScreenY[I],m.hslPal[this.faceColorA[A]]);else if(H===2&&this.faceInfo&&this.faceColor&&this.faceColorA&&this.faceColorB&&this.faceColorC&&K.vertexScreenX&&K.vertexScreenY&&K.vertexViewSpaceX&&K.vertexViewSpaceY&&K.vertexViewSpaceZ){let N=this.faceInfo[A]>>2,O=this.texturedVertexA[N],Q=this.texturedVertexB[N],U=this.texturedVertexC[N];m.fillTexturedTriangle(K.vertexScreenX[_],K.vertexScreenX[E],K.vertexScreenX[I],K.vertexScreenY[_],K.vertexScreenY[E],K.vertexScreenY[I],this.faceColorA[A],this.faceColorB[A],this.faceColorC[A],K.vertexViewSpaceX[O],K.vertexViewSpaceY[O],K.vertexViewSpaceZ[O],K.vertexViewSpaceX[Q],K.vertexViewSpaceX[U],K.vertexViewSpaceY[Q],K.vertexViewSpaceY[U],K.vertexViewSpaceZ[Q],K.vertexViewSpaceZ[U],this.faceColor[A])}else if(H===3&&this.faceInfo&&this.faceColor&&this.faceColorA&&K.vertexScreenX&&K.vertexScreenY&&K.vertexViewSpaceX&&K.vertexViewSpaceY&&K.vertexViewSpaceZ){let N=this.faceInfo[A]>>2,O=this.texturedVertexA[N],Q=this.texturedVertexB[N],U=this.texturedVertexC[N];m.fillTexturedTriangle(K.vertexScreenX[_],K.vertexScreenX[E],K.vertexScreenX[I],K.vertexScreenY[_],K.vertexScreenY[E],K.vertexScreenY[I],this.faceColorA[A],this.faceColorA[A],this.faceColorA[A],K.vertexViewSpaceX[O],K.vertexViewSpaceY[O],K.vertexViewSpaceZ[O],K.vertexViewSpaceX[Q],K.vertexViewSpaceX[U],K.vertexViewSpaceY[Q],K.vertexViewSpaceY[U],K.vertexViewSpaceZ[Q],K.vertexViewSpaceZ[U],this.faceColor[A])}}drawNearClippedFace(A,R=!1){let _=0;if(K.vertexViewSpaceZ){let U=m.centerX,G=m.centerY,$=this.faceVertexA[A],L=this.faceVertexB[A],J=this.faceVertexC[A],q=K.vertexViewSpaceZ[$],V=K.vertexViewSpaceZ[L],B=K.vertexViewSpaceZ[J];if(q>=50&&K.vertexScreenX&&K.vertexScreenY&&this.faceColorA)K.clippedX[_]=K.vertexScreenX[$],K.clippedY[_]=K.vertexScreenY[$],K.clippedColor[_++]=this.faceColorA[A];else if(K.vertexViewSpaceX&&K.vertexViewSpaceY&&this.faceColorA){let F=K.vertexViewSpaceX[$],b=K.vertexViewSpaceY[$],T=this.faceColorA[A];if(B>=50&&this.faceColorC){let j=(50-q)*m.reciprocal16[B-q];K.clippedX[_]=U+((F+((K.vertexViewSpaceX[J]-F)*j>>16)<<9)/50|0),K.clippedY[_]=G+((b+((K.vertexViewSpaceY[J]-b)*j>>16)<<9)/50|0),K.clippedColor[_++]=T+((this.faceColorC[A]-T)*j>>16)}if(V>=50&&this.faceColorB){let j=(50-q)*m.reciprocal16[V-q];K.clippedX[_]=U+((F+((K.vertexViewSpaceX[L]-F)*j>>16)<<9)/50|0),K.clippedY[_]=G+((b+((K.vertexViewSpaceY[L]-b)*j>>16)<<9)/50|0),K.clippedColor[_++]=T+((this.faceColorB[A]-T)*j>>16)}}if(V>=50&&K.vertexScreenX&&K.vertexScreenY&&this.faceColorB)K.clippedX[_]=K.vertexScreenX[L],K.clippedY[_]=K.vertexScreenY[L],K.clippedColor[_++]=this.faceColorB[A];else if(K.vertexViewSpaceX&&K.vertexViewSpaceY&&this.faceColorB){let F=K.vertexViewSpaceX[L],b=K.vertexViewSpaceY[L],T=this.faceColorB[A];if(q>=50&&this.faceColorA){let j=(50-V)*m.reciprocal16[q-V];K.clippedX[_]=U+((F+((K.vertexViewSpaceX[$]-F)*j>>16)<<9)/50|0),K.clippedY[_]=G+((b+((K.vertexViewSpaceY[$]-b)*j>>16)<<9)/50|0),K.clippedColor[_++]=T+((this.faceColorA[A]-T)*j>>16)}if(B>=50&&this.faceColorC){let j=(50-V)*m.reciprocal16[B-V];K.clippedX[_]=U+((F+((K.vertexViewSpaceX[J]-F)*j>>16)<<9)/50|0),K.clippedY[_]=G+((b+((K.vertexViewSpaceY[J]-b)*j>>16)<<9)/50|0),K.clippedColor[_++]=T+((this.faceColorC[A]-T)*j>>16)}}if(B>=50&&K.vertexScreenX&&K.vertexScreenY&&this.faceColorC)K.clippedX[_]=K.vertexScreenX[J],K.clippedY[_]=K.vertexScreenY[J],K.clippedColor[_++]=this.faceColorC[A];else if(K.vertexViewSpaceX&&K.vertexViewSpaceY&&this.faceColorC){let F=K.vertexViewSpaceX[J],b=K.vertexViewSpaceY[J],T=this.faceColorC[A];if(V>=50&&this.faceColorB){let j=(50-B)*m.reciprocal16[V-B];K.clippedX[_]=U+((F+((K.vertexViewSpaceX[L]-F)*j>>16)<<9)/50|0),K.clippedY[_]=G+((b+((K.vertexViewSpaceY[L]-b)*j>>16)<<9)/50|0),K.clippedColor[_++]=T+((this.faceColorB[A]-T)*j>>16)}if(q>=50&&this.faceColorA){let j=(50-B)*m.reciprocal16[q-B];K.clippedX[_]=U+((F+((K.vertexViewSpaceX[$]-F)*j>>16)<<9)/50|0),K.clippedY[_]=G+((b+((K.vertexViewSpaceY[$]-b)*j>>16)<<9)/50|0),K.clippedColor[_++]=T+((this.faceColorA[A]-T)*j>>16)}}}let E=K.clippedX[0],I=K.clippedX[1],H=K.clippedX[2],N=K.clippedY[0],O=K.clippedY[1],Q=K.clippedY[2];if((E-I)*(Q-O)-(N-O)*(H-I)<=0)return;if(m.clipX=!1,_===3){if(E<0||I<0||H<0||E>k.boundX||I>k.boundX||H>k.boundX)m.clipX=!0;let U;if(!this.faceInfo)U=0;else U=this.faceInfo[A]&3;if(R)m.drawLine(E,I,N,O,K.clippedColor[0]),m.drawLine(I,H,O,Q,K.clippedColor[1]),m.drawLine(H,E,Q,N,K.clippedColor[2]);else if(U===0)m.fillGouraudTriangle(E,I,H,N,O,Q,K.clippedColor[0],K.clippedColor[1],K.clippedColor[2]);else if(U===1&&this.faceColorA)m.fillTriangle(E,I,H,N,O,Q,m.hslPal[this.faceColorA[A]]);else if(U===2&&this.faceInfo&&this.faceColor&&K.vertexViewSpaceX&&K.vertexViewSpaceY&&K.vertexViewSpaceZ){let G=this.faceInfo[A]>>2,$=this.texturedVertexA[G],L=this.texturedVertexB[G],J=this.texturedVertexC[G];m.fillTexturedTriangle(E,I,H,N,O,Q,K.clippedColor[0],K.clippedColor[1],K.clippedColor[2],K.vertexViewSpaceX[$],K.vertexViewSpaceY[$],K.vertexViewSpaceZ[$],K.vertexViewSpaceX[L],K.vertexViewSpaceX[J],K.vertexViewSpaceY[L],K.vertexViewSpaceY[J],K.vertexViewSpaceZ[L],K.vertexViewSpaceZ[J],this.faceColor[A])}else if(U===3&&this.faceInfo&&this.faceColor&&this.faceColorA&&K.vertexViewSpaceX&&K.vertexViewSpaceY&&K.vertexViewSpaceZ){let G=this.faceInfo[A]>>2,$=this.texturedVertexA[G],L=this.texturedVertexB[G],J=this.texturedVertexC[G];m.fillTexturedTriangle(E,I,H,N,O,Q,this.faceColorA[A],this.faceColorA[A],this.faceColorA[A],K.vertexViewSpaceX[$],K.vertexViewSpaceY[$],K.vertexViewSpaceZ[$],K.vertexViewSpaceX[L],K.vertexViewSpaceX[J],K.vertexViewSpaceY[L],K.vertexViewSpaceY[J],K.vertexViewSpaceZ[L],K.vertexViewSpaceZ[J],this.faceColor[A])}}else if(_===4){if(E<0||I<0||H<0||E>k.boundX||I>k.boundX||H>k.boundX||K.clippedX[3]<0||K.clippedX[3]>k.boundX)m.clipX=!0;let U;if(!this.faceInfo)U=0;else U=this.faceInfo[A]&3;if(R)m.drawLine(E,I,N,O,K.clippedColor[0]),m.drawLine(I,H,O,Q,K.clippedColor[1]),m.drawLine(H,K.clippedX[3],Q,K.clippedY[3],K.clippedColor[2]),m.drawLine(K.clippedX[3],E,K.clippedY[3],N,K.clippedColor[3]);else if(U===0)m.fillGouraudTriangle(E,I,H,N,O,Q,K.clippedColor[0],K.clippedColor[1],K.clippedColor[2]),m.fillGouraudTriangle(E,H,K.clippedX[3],N,Q,K.clippedY[3],K.clippedColor[0],K.clippedColor[2],K.clippedColor[3]);else if(U===1){if(this.faceColorA){let G=m.hslPal[this.faceColorA[A]];m.fillTriangle(E,I,H,N,O,Q,G),m.fillTriangle(E,H,K.clippedX[3],N,Q,K.clippedY[3],G)}}else if(U===2&&this.faceInfo&&this.faceColor&&K.vertexViewSpaceX&&K.vertexViewSpaceY&&K.vertexViewSpaceZ){let G=this.faceInfo[A]>>2,$=this.texturedVertexA[G],L=this.texturedVertexB[G],J=this.texturedVertexC[G];m.fillTexturedTriangle(E,I,H,N,O,Q,K.clippedColor[0],K.clippedColor[1],K.clippedColor[2],K.vertexViewSpaceX[$],K.vertexViewSpaceY[$],K.vertexViewSpaceZ[$],K.vertexViewSpaceX[L],K.vertexViewSpaceX[J],K.vertexViewSpaceY[L],K.vertexViewSpaceY[J],K.vertexViewSpaceZ[L],K.vertexViewSpaceZ[J],this.faceColor[A]),m.fillTexturedTriangle(E,H,K.clippedX[3],N,Q,K.clippedY[3],K.clippedColor[0],K.clippedColor[2],K.clippedColor[3],K.vertexViewSpaceX[$],K.vertexViewSpaceY[$],K.vertexViewSpaceZ[$],K.vertexViewSpaceX[L],K.vertexViewSpaceX[J],K.vertexViewSpaceY[L],K.vertexViewSpaceY[J],K.vertexViewSpaceZ[L],K.vertexViewSpaceZ[J],this.faceColor[A])}else if(U===3&&this.faceInfo&&this.faceColor&&this.faceColorA&&K.vertexViewSpaceX&&K.vertexViewSpaceY&&K.vertexViewSpaceZ){let G=this.faceInfo[A]>>2,$=this.texturedVertexA[G],L=this.texturedVertexB[G],J=this.texturedVertexC[G];m.fillTexturedTriangle(E,I,H,N,O,Q,this.faceColorA[A],this.faceColorA[A],this.faceColorA[A],K.vertexViewSpaceX[$],K.vertexViewSpaceY[$],K.vertexViewSpaceZ[$],K.vertexViewSpaceX[L],K.vertexViewSpaceX[J],K.vertexViewSpaceY[L],K.vertexViewSpaceY[J],K.vertexViewSpaceZ[L],K.vertexViewSpaceZ[J],this.faceColor[A]),m.fillTexturedTriangle(E,H,K.clippedX[3],N,Q,K.clippedY[3],this.faceColorA[A],this.faceColorA[A],this.faceColorA[A],K.vertexViewSpaceX[$],K.vertexViewSpaceY[$],K.vertexViewSpaceZ[$],K.vertexViewSpaceX[L],K.vertexViewSpaceX[J],K.vertexViewSpaceY[L],K.vertexViewSpaceY[J],K.vertexViewSpaceZ[L],K.vertexViewSpaceZ[J],this.faceColor[A])}}}applyTransform2(A,R,_,E,I){if(!E)return;let H=E.length;if(I===0){let N=0;K.baseX=0,K.baseY=0,K.baseZ=0;for(let O=0;O<H;O++){if(!this.labelVertices)continue;let Q=E[O];if(Q<this.labelVertices.length){let U=this.labelVertices[Q];if(U)for(let G=0;G<U.length;G++){let $=U[G];K.baseX+=this.vertexX[$],K.baseY+=this.vertexY[$],K.baseZ+=this.vertexZ[$],N++}}}if(N>0)K.baseX=(K.baseX/N|0)+A,K.baseY=(K.baseY/N|0)+R,K.baseZ=(K.baseZ/N|0)+_;else K.baseX=A,K.baseY=R,K.baseZ=_}else if(I===1)for(let N=0;N<H;N++){let O=E[N];if(!this.labelVertices||O>=this.labelVertices.length)continue;let Q=this.labelVertices[O];if(Q)for(let U=0;U<Q.length;U++){let G=Q[U];this.vertexX[G]+=A,this.vertexY[G]+=R,this.vertexZ[G]+=_}}else if(I===2)for(let N=0;N<H;N++){let O=E[N];if(!this.labelVertices||O>=this.labelVertices.length)continue;let Q=this.labelVertices[O];if(Q)for(let U=0;U<Q.length;U++){let G=Q[U];this.vertexX[G]-=K.baseX,this.vertexY[G]-=K.baseY,this.vertexZ[G]-=K.baseZ;let $=(A&255)*8,L=(R&255)*8,J=(_&255)*8,q,V;if(J!==0){q=m.sin[J],V=m.cos[J];let B=this.vertexY[G]*q+this.vertexX[G]*V>>16;this.vertexY[G]=this.vertexY[G]*V-this.vertexX[G]*q>>16,this.vertexX[G]=B}if($!==0){q=m.sin[$],V=m.cos[$];let B=this.vertexY[G]*V-this.vertexZ[G]*q>>16;this.vertexZ[G]=this.vertexY[G]*q+this.vertexZ[G]*V>>16,this.vertexY[G]=B}if(L!==0){q=m.sin[L],V=m.cos[L];let B=this.vertexZ[G]*q+this.vertexX[G]*V>>16;this.vertexZ[G]=this.vertexZ[G]*V-this.vertexX[G]*q>>16,this.vertexX[G]=B}this.vertexX[G]+=K.baseX,this.vertexY[G]+=K.baseY,this.vertexZ[G]+=K.baseZ}}else if(I===3)for(let N=0;N<H;N++){let O=E[N];if(!this.labelVertices||O>=this.labelVertices.length)continue;let Q=this.labelVertices[O];if(Q)for(let U=0;U<Q.length;U++){let G=Q[U];this.vertexX[G]-=K.baseX,this.vertexY[G]-=K.baseY,this.vertexZ[G]-=K.baseZ,this.vertexX[G]=this.vertexX[G]*A/128|0,this.vertexY[G]=this.vertexY[G]*R/128|0,this.vertexZ[G]=this.vertexZ[G]*_/128|0,this.vertexX[G]+=K.baseX,this.vertexY[G]+=K.baseY,this.vertexZ[G]+=K.baseZ}}else if(I===5&&this.labelFaces&&this.faceAlpha)for(let N=0;N<H;N++){let O=E[N];if(O>=this.labelFaces.length)continue;let Q=this.labelFaces[O];if(Q)for(let U=0;U<Q.length;U++){let G=Q[U];if(this.faceAlpha[G]+=A*8,this.faceAlpha[G]<0)this.faceAlpha[G]=0;if(this.faceAlpha[G]>255)this.faceAlpha[G]=255}}}calculateBoundsAABB(){this.maxY=0,this.radius=0,this.minY=0,this.minX=999999,this.maxX=-999999,this.maxZ=-99999,this.minZ=99999;for(let A=0;A<this.vertexCount;A++){let R=this.vertexX[A],_=this.vertexY[A],E=this.vertexZ[A];if(R<this.minX)this.minX=R;if(R>this.maxX)this.maxX=R;if(E<this.minZ)this.minZ=E;if(E>this.maxZ)this.maxZ=E;if(-_>this.maxY)this.maxY=-_;if(_>this.minY)this.minY=_;let I=R*R+E*E;if(I>this.radius)this.radius=I}this.radius=Math.sqrt(this.radius)|0,this.minDepth=Math.sqrt(this.radius*this.radius+this.maxY*this.maxY)|0,this.maxDepth=this.minDepth+(Math.sqrt(this.radius*this.radius+this.minY*this.minY)|0)}pointWithinTriangle(A,R,_,E,I,H,N,O){if(R<_&&R<E&&R<I)return!1;else if(R>_&&R>E&&R>I)return!1;else if(A<H&&A<N&&A<O)return!1;else return A<=H||A<=N||A<=O}drawFaceOutline(A){if(!K.vertexScreenX||!K.vertexScreenY||!this.faceColorA||!this.faceColorB||!this.faceColorC)return;let R=this.faceVertexA[A],_=this.faceVertexB[A],E=this.faceVertexC[A];m.drawLine(K.vertexScreenX[R],K.vertexScreenY[R],K.vertexScreenX[_],K.vertexScreenY[_],m.hslPal[1000]),m.drawLine(K.vertexScreenX[_],K.vertexScreenY[_],K.vertexScreenX[E],K.vertexScreenY[E],m.hslPal[1000]),m.drawLine(K.vertexScreenX[E],K.vertexScreenY[E],K.vertexScreenX[R],K.vertexScreenY[R],m.hslPal[1000])}}class J0 extends S0{static totalCount=0;static typeCache=null;static dat=null;static offsets=null;static cachePos=0;static modelCacheStatic=new b0(500);static modelCacheDynamic=new b0(30);static unpack(A){this.dat=new s(A.read("loc.dat"));let R=new s(A.read("loc.idx"));this.totalCount=R.g2(),this.offsets=new Int32Array(this.totalCount);let _=2;for(let E=0;E<this.totalCount;E++)this.offsets[E]=_,_+=R.g2();this.typeCache=new p(10,null);for(let E=0;E<10;E++)this.typeCache[E]=new J0(-1)}static get(A){if(!this.typeCache||!this.offsets||!this.dat)throw new Error;for(let _=0;_<10;_++){let E=this.typeCache[_];if(!E)continue;if(E.id===A)return E}this.cachePos=(this.cachePos+1)%10;let R=this.typeCache[this.cachePos];if(this.dat.pos=this.offsets[A],R.id=A,R.reset(),R.unpackType(this.dat),!R.shapes)R.shapes=new Int32Array(1);if(R.active2===-1&&R.shapes){if(R.locActive=R.shapes.length>0&&R.shapes[0]===D.CENTREPIECE_STRAIGHT.id,R.op)R.locActive=!0}return R}models=null;shapes=null;name=null;desc=null;recol_s=null;recol_d=null;width=1;length=1;blockwalk=!0;blockrange=!0;locActive=!1;active2=-1;hillskew=!1;sharelight=!1;occlude=!1;anim=-1;disposeAlpha=!1;wallwidth=16;ambient=0;contrast=0;op=null;mapfunction=-1;mapscene=-1;mirror=!1;shadow=!0;resizex=128;resizey=128;resizez=128;forceapproach=0;offsetx=0;offsety=0;offsetz=0;forcedecor=!1;unpack(A,R){if(A===1){let _=R.g1();this.models=new Int32Array(_),this.shapes=new Int32Array(_);for(let E=0;E<_;E++)this.models[E]=R.g2(),this.shapes[E]=R.g1()}else if(A===2)this.name=R.gjstr();else if(A===3)this.desc=R.gjstr();else if(A===14)this.width=R.g1();else if(A===15)this.length=R.g1();else if(A===17)this.blockwalk=!1;else if(A===18)this.blockrange=!1;else if(A===19){if(this.active2=R.g1(),this.active2===1)this.locActive=!0}else if(A===21)this.hillskew=!0;else if(A===22)this.sharelight=!0;else if(A===23)this.occlude=!0;else if(A===24){if(this.anim=R.g2(),this.anim===65535)this.anim=-1}else if(A===25)this.disposeAlpha=!0;else if(A===28)this.wallwidth=R.g1();else if(A===29)this.ambient=R.g1b();else if(A===39)this.contrast=R.g1b();else if(A>=30&&A<39){if(!this.op)this.op=new p(5,null);if(this.op[A-30]=R.gjstr(),this.op[A-30]?.toLowerCase()==="hidden")this.op[A-30]=null}else if(A===40){let _=R.g1();this.recol_s=new Uint16Array(_),this.recol_d=new Uint16Array(_);for(let E=0;E<_;E++)this.recol_s[E]=R.g2(),this.recol_d[E]=R.g2()}else if(A===60)this.mapfunction=R.g2();else if(A===62)this.mirror=!0;else if(A===64)this.shadow=!1;else if(A===65)this.resizex=R.g2();else if(A===66)this.resizey=R.g2();else if(A===67)this.resizez=R.g2();else if(A===68)this.mapscene=R.g2();else if(A===69)this.forceapproach=R.g1();else if(A===70)this.offsetx=R.g2b();else if(A===71)this.offsety=R.g2b();else if(A===72)this.offsetz=R.g2b();else if(A===73)this.forcedecor=!0}getModel(A,R,_,E,I,H,N){if(!this.shapes)return null;let O=-1;for(let B=0;B<this.shapes.length;B++)if(this.shapes[B]===A){O=B;break}if(O===-1)return null;let Q=BigInt(BigInt(this.id)<<6n)+BigInt(BigInt(O)<<3n)+BigInt(R)+BigInt(BigInt(N)+1n<<32n),U=J0.modelCacheDynamic?.get(Q);if(U){if(this.hillskew||this.sharelight)U=K.modelCopyFaces(U,this.hillskew,this.sharelight);if(this.hillskew){let B=(_+E+I+H)/4|0;for(let F=0;F<U.vertexCount;F++){let b=U.vertexX[F],T=U.vertexZ[F],j=_+((E-_)*(b+64)/128|0),w=H+((I-H)*(b+64)/128|0),Z=j+((w-j)*(T+64)/128|0);U.vertexY[F]+=Z-B}U.calculateBoundsY()}return U}if(!this.models)return null;if(O>=this.models.length)return null;let G=this.models[O];if(G===-1)return null;let $=this.mirror!==R>3;if($)G+=65536;let L=J0.modelCacheStatic?.get(BigInt(G));if(!L){if(L=K.model(G&65535),$)L.rotateY180();J0.modelCacheStatic?.put(BigInt(G),L)}let J=this.resizex!==128||this.resizey!==128||this.resizez!==128,q=this.offsetx!==0||this.offsety!==0||this.offsetz!==0,V=K.modelShareColored(L,!this.recol_s,!this.disposeAlpha,R===0&&N===-1&&!J&&!q);if(N!==-1)V.createLabelReferences(),V.applyTransform(N),V.labelFaces=null,V.labelVertices=null;while(R-- >0)V.rotateY90();if(this.recol_s&&this.recol_d)for(let B=0;B<this.recol_s.length;B++)V.recolor(this.recol_s[B],this.recol_d[B]);if(J)V.scale(this.resizex,this.resizey,this.resizez);if(q)V.translateModel(this.offsety,this.offsetx,this.offsetz);if(V.calculateNormals((this.ambient&255)+64,(this.contrast&255)*5+768,-50,-10,-50,!this.sharelight),this.blockwalk)V.objRaise=V.maxY;if(J0.modelCacheDynamic?.put(Q,V),this.hillskew||this.sharelight)V=K.modelCopyFaces(V,this.hillskew,this.sharelight);if(this.hillskew){let B=(_+E+I+H)/4|0;for(let F=0;F<V.vertexCount;F++){let b=V.vertexX[F],T=V.vertexZ[F],j=_+((E-_)*(b+64)/128|0),w=H+((I-H)*(b+64)/128|0),Z=j+((w-j)*(T+64)/128|0);V.vertexY[F]+=Z-B}V.calculateBoundsY()}return V}reset(){this.models=null,this.shapes=null,this.name=null,this.desc=null,this.recol_s=null,this.recol_d=null,this.width=1,this.length=1,this.blockwalk=!0,this.blockrange=!0,this.locActive=!1,this.active2=-1,this.hillskew=!1,this.sharelight=!1,this.occlude=!1,this.anim=-1,this.wallwidth=16,this.ambient=0,this.contrast=0,this.op=null,this.disposeAlpha=!1,this.mapfunction=-1,this.mapscene=-1,this.mirror=!1,this.shadow=!0,this.resizex=128,this.resizey=128,this.resizez=128,this.forceapproach=0,this.offsetx=0,this.offsety=0,this.offsetz=0,this.forcedecor=!1}}async function h1(A){if(A[0]!==255)A[0]=255;URL.revokeObjectURL(a0.src),a0.src=URL.createObjectURL(new Blob([A],{type:"image/jpeg"})),await new Promise((E)=>a0.onload=()=>E()),w6.clearRect(0,0,e0.width,e0.height);let R=a0.naturalWidth,_=a0.naturalHeight;return e0.width=R,e0.height=_,w6.drawImage(a0,0,0),w6.getImageData(0,0,R,_)}class _0 extends Y0{pixels;width2d;height2d;cropX;cropY;cropW;cropH;constructor(A,R){super();this.pixels=new Int32Array(A*R),this.width2d=this.cropW=A,this.height2d=this.cropH=R,this.cropX=this.cropY=0}static async fromJpeg(A,R){let _=A.read(R+".dat");if(!_)throw new Error;let E=await h1(_),I=new _0(E.width,E.height),H=new Uint32Array(E.data.buffer),N=I.pixels;for(let O=0;O<N.length;O++){let Q=H[O];N[O]=(Q>>24&255)<<24|(Q&255)<<16|(Q>>8&255)<<8|Q>>16&255}return I}static fromArchive(A,R,_=0){let E=new s(A.read(R+".dat")),I=new s(A.read("index.dat"));I.pos=E.g2();let H=I.g2(),N=I.g2(),O=I.g1(),Q=[],U=O-1;for(let B=0;B<U;B++)if(Q[B+1]=I.g3(),Q[B+1]===0)Q[B+1]=1;for(let B=0;B<_;B++)I.pos+=2,E.pos+=I.g2()*I.g2(),I.pos+=1;if(E.pos>E.length||I.pos>I.length)throw new Error;let G=I.g1(),$=I.g1(),L=I.g2(),J=I.g2(),q=new _0(L,J);q.cropX=G,q.cropY=$,q.cropW=H,q.cropH=N;let V=I.g1();if(V===0){let B=q.width2d*q.height2d;for(let F=0;F<B;F++)q.pixels[F]=Q[E.g1()]}else if(V===1){let B=q.width2d;for(let F=0;F<B;F++){let b=q.height2d;for(let T=0;T<b;T++)q.pixels[F+T*B]=Q[E.g1()]}}return q}bind(){k.bind(this.pixels,this.width2d,this.height2d)}draw(A,R){A|=0,R|=0,A+=this.cropX,R+=this.cropY;let _=A+R*k.width2d,E=0,I=this.height2d,H=this.width2d,N=k.width2d-H,O=0;if(R<k.top){let Q=k.top-R;I-=Q,R=k.top,E+=Q*H,_+=Q*k.width2d}if(R+I>k.bottom)I-=R+I-k.bottom;if(A<k.left){let Q=k.left-A;H-=Q,A=k.left,E+=Q,_+=Q,O+=Q,N+=Q}if(A+H>k.right){let Q=A+H-k.right;H-=Q,O+=Q,N+=Q}if(H>0&&I>0)this.copyImageDraw(H,I,this.pixels,E,O,k.pixels,_,N)}drawAlpha(A,R,_){R|=0,_|=0,R+=this.cropX,_+=this.cropY;let E=R+_*k.width2d,I=0,H=this.height2d,N=this.width2d,O=k.width2d-N,Q=0;if(_<k.top){let U=k.top-_;H-=U,_=k.top,I+=U*N,E+=U*k.width2d}if(_+H>k.bottom)H-=_+H-k.bottom;if(R<k.left){let U=k.left-R;N-=U,R=k.left,I+=U,E+=U,Q+=U,O+=U}if(R+N>k.right){let U=R+N-k.right;N-=U,Q+=U,O+=U}if(N>0&&H>0)this.copyPixelsAlpha(N,H,this.pixels,I,Q,k.pixels,E,O,A)}blitOpaque(A,R){A|=0,R|=0,A+=this.cropX,R+=this.cropY;let _=A+R*k.width2d,E=0,I=this.height2d,H=this.width2d,N=k.width2d-H,O=0;if(R<k.top){let Q=k.top-R;I-=Q,R=k.top,E+=Q*H,_+=Q*k.width2d}if(R+I>k.bottom)I-=R+I-k.bottom;if(A<k.left){let Q=k.left-A;H-=Q,A=k.left,E+=Q,_+=Q,O+=Q,N+=Q}if(A+H>k.right){let Q=A+H-k.right;H-=Q,O+=Q,N+=Q}if(H>0&&I>0)this.copyImageBlitOpaque(H,I,this.pixels,E,O,k.pixels,_,N)}flipHorizontally(){let A=this.pixels,R=this.width2d,_=this.height2d;for(let E=0;E<_;E++){let I=R/2|0;for(let H=0;H<I;H++){let N=H+E*R,O=R-H-1+E*R,Q=A[N];A[N]=A[O],A[O]=Q}}}flipVertically(){let A=this.pixels,R=this.width2d,_=this.height2d;for(let E=0;E<(_/2|0);E++)for(let I=0;I<R;I++){let H=I+E*R,N=I+(_-E-1)*R,O=A[H];A[H]=A[N],A[N]=O}}translate2d(A,R,_){for(let E=0;E<this.pixels.length;E++){let I=this.pixels[E];if(I!==0){let H=I>>16&255;if(H+=A,H<1)H=1;else if(H>255)H=255;let N=I>>8&255;if(N+=R,N<1)N=1;else if(N>255)N=255;let O=I&255;if(O+=_,O<1)O=1;else if(O>255)O=255;this.pixels[E]=(H<<16)+(N<<8)+O}}}crop(A,R,_,E){A|=0,R|=0,_|=0,E|=0;try{let I=this.width2d,H=0,N=0,O=this.cropW,Q=this.cropH,U=(O<<16)/_|0,G=(Q<<16)/E|0;if(A+=(this.cropX*_+O-1)/O|0,R+=(this.cropY*E+Q-1)/Q|0,this.cropX*_%O!==0)H=(O-this.cropX*_%O<<16)/_|0;if(this.cropY*E%Q!==0)N=(Q-this.cropY*E%Q<<16)/E|0;_=_*(this.width2d-(H>>16))/O|0,E=E*(this.height2d-(N>>16))/Q|0;let $=A+R*k.width2d,L=k.width2d-_;if(R<k.top){let J=k.top-R;E-=J,R=0,$+=J*k.width2d,N+=G*J}if(R+E>k.bottom)E-=R+E-k.bottom;if(A<k.left){let J=k.left-A;_-=J,A=0,$+=J,H+=U*J,L+=J}if(A+_>k.right){let J=A+_-k.right;_-=J,L+=J}this.scale(_,E,this.pixels,H,N,k.pixels,L,$,I,U,G)}catch(I){}}drawRotatedMasked(A,R,_,E,I,H,N,O,Q,U){A|=0,R|=0,_|=0,E|=0;try{let G=-_/2|0,$=-E/2|0,L=Math.sin(Q/326.11)*65536|0,J=Math.cos(Q/326.11)*65536|0,q=L*U>>8,V=J*U>>8,B=(N<<16)+$*q+G*V,F=(O<<16)+($*V-G*q),b=A+R*k.width2d;for(let T=0;T<E;T++){let j=I[T],w=b+j,Z=B+V*j,W=F-q*j;for(let Y=-H[T];Y<0;Y++)k.pixels[w++]=this.pixels[(Z>>16)+(W>>16)*this.width2d],Z+=V,W-=q;B+=q,F+=V,b+=k.width2d}}catch(G){}}drawMasked(A,R,_){A|=0,R|=0,A+=this.cropX,R+=this.cropY;let E=A+R*k.width2d,I=0,H=this.height2d,N=this.width2d,O=k.width2d-N,Q=0;if(R<k.top){let U=k.top-R;H-=U,R=k.top,I+=U*N,E+=U*k.width2d}if(R+H>k.bottom)H-=R+H-k.bottom;if(A<k.left){let U=k.left-A;N-=U,A=k.left,I+=U,E+=U,Q+=U,O+=U}if(A+N>k.right){let U=A+N-k.right;N-=U,Q+=U,O+=U}if(N>0&&H>0)this.copyPixelsMasked(N,H,this.pixels,Q,I,k.pixels,E,O,_.pixels)}scale(A,R,_,E,I,H,N,O,Q,U,G){try{let $=E;for(let L=-R;L<0;L++){let J=(I>>16)*Q;for(let q=-A;q<0;q++){let V=_[(E>>16)+J];if(V===0)O++;else H[O++]=V;E+=U}I+=G,E=$,O+=N}}catch($){}}copyImageBlitOpaque(A,R,_,E,I,H,N,O){let Q=-(A>>2);A=-(A&3);for(let U=-R;U<0;U++){for(let G=Q;G<0;G++)H[N++]=_[E++],H[N++]=_[E++],H[N++]=_[E++],H[N++]=_[E++];for(let G=A;G<0;G++)H[N++]=_[E++];N+=O,E+=I}}copyPixelsAlpha(A,R,_,E,I,H,N,O,Q){let U=256-Q;for(let G=-R;G<0;G++){for(let $=-A;$<0;$++){let L=_[E++];if(L===0)N++;else{let J=H[N];H[N++]=((L&16711935)*Q+(J&16711935)*U&4278255360)+((L&65280)*Q+(J&65280)*U&16711680)>>8}}N+=O,E+=I}}copyImageDraw(A,R,_,E,I,H,N,O){let Q=-(A>>2);A=-(A&3);for(let U=-R;U<0;U++){for(let G=Q;G<0;G++){let $=_[E++];if($===0)N++;else H[N++]=$;if($=_[E++],$===0)N++;else H[N++]=$;if($=_[E++],$===0)N++;else H[N++]=$;if($=_[E++],$===0)N++;else H[N++]=$}for(let G=A;G<0;G++){let $=_[E++];if($===0)N++;else H[N++]=$}N+=O,E+=I}}copyPixelsMasked(A,R,_,E,I,H,N,O,Q){let U=-(A>>2);A=-(A&3);for(let G=-R;G<0;G++){for(let $=U;$<0;$++){let L=_[I++];if(L!==0&&Q[N]===0)H[N++]=L;else N++;if(L=_[I++],L!==0&&Q[N]===0)H[N++]=L;else N++;if(L=_[I++],L!==0&&Q[N]===0)H[N++]=L;else N++;if(L=_[I++],L!==0&&Q[N]===0)H[N++]=L;else N++}for(let $=A;$<0;$++){let L=_[I++];if(L!==0&&Q[N]===0)H[N++]=L;else N++}N+=O,I+=E}}}class E0 extends S0{static totalCount=0;static typeCache=null;static dat=null;static offsets=null;static cachePos=0;static membersWorld=!0;static modelCache=new b0(50);static iconCache=new b0(200);static unpack(A,R){this.membersWorld=R,this.dat=new s(A.read("obj.dat"));let _=new s(A.read("obj.idx"));this.totalCount=_.g2(),this.offsets=new Int32Array(this.totalCount);let E=2;for(let I=0;I<this.totalCount;I++)this.offsets[I]=E,E+=_.g2();this.typeCache=new p(10,null);for(let I=0;I<10;I++)this.typeCache[I]=new E0(-1)}static get(A){if(!this.typeCache||!this.offsets||!this.dat)throw new Error;for(let _=0;_<10;_++){let E=this.typeCache[_];if(!E)continue;if(E.id===A)return E}this.cachePos=(this.cachePos+1)%10;let R=this.typeCache[this.cachePos];if(this.dat.pos=this.offsets[A],R.id=A,R.reset(),R.unpackType(this.dat),R.certtemplate!==-1)R.toCertificate();if(!this.membersWorld&&R.members)R.name="Members Object",R.desc="Login to a members' server to use this object.",R.op=null,R.iop=null;return R}static getIcon(A,R){if(E0.iconCache){let F=E0.iconCache.get(BigInt(A));if(F&&F.cropH!==R&&F.cropH!==-1)F.unlink(),F=null;if(F)return F}let _=E0.get(A);if(!_.countobj)R=-1;if(_.countobj&&_.countco&&R>1){let F=-1;for(let b=0;b<10;b++)if(R>=_.countco[b]&&_.countco[b]!==0)F=_.countobj[b];if(F!==-1)_=E0.get(F)}let E=new _0(32,32),I=m.centerX,H=m.centerY,N=m.lineOffset,O=k.pixels,Q=k.width2d,U=k.height2d,G=k.left,$=k.right,L=k.top,J=k.bottom;m.jagged=!1,k.bind(E.pixels,32,32),k.fillRect2d(0,0,32,32,0),m.init2D();let q=_.getInterfaceModel(1),V=m.sin[_.xan2d]*_.zoom2d>>16,B=m.cos[_.xan2d]*_.zoom2d>>16;q.drawSimple(0,_.yan2d,_.zan2d,_.xan2d,_.xof2d,V+(q.maxY/2|0)+_.yof2d,B+_.yof2d);for(let F=31;F>=0;F--)for(let b=31;b>=0;b--){if(E.pixels[F+b*32]!==0)continue;if(F>0&&E.pixels[F+b*32-1]>1)E.pixels[F+b*32]=1;else if(b>0&&E.pixels[F+(b-1)*32]>1)E.pixels[F+b*32]=1;else if(F<31&&E.pixels[F+b*32+1]>1)E.pixels[F+b*32]=1;else if(b<31&&E.pixels[F+(b+1)*32]>1)E.pixels[F+b*32]=1}for(let F=31;F>=0;F--)for(let b=31;b>=0;b--)if(E.pixels[F+b*32]===0&&F>0&&b>0&&E.pixels[F+(b-1)*32-1]>0)E.pixels[F+b*32]=3153952;if(_.certtemplate!==-1){let F=this.getIcon(_.certlink,10),b=F.cropW,T=F.cropH;F.cropW=32,F.cropH=32,F.crop(5,5,22,22),F.cropW=b,F.cropH=T}if(E0.iconCache?.put(BigInt(A),E),k.bind(O,Q,U),k.setBounds(G,L,$,J),m.centerX=I,m.centerY=H,m.lineOffset=N,m.jagged=!0,_.stackable)E.cropW=33;else E.cropW=32;return E.cropH=R,E}model=0;name=null;desc=null;recol_s=null;recol_d=null;zoom2d=2000;xan2d=0;yan2d=0;zan2d=0;xof2d=0;yof2d=0;code9=!1;code10=-1;stackable=!1;cost=1;members=!1;op=null;iop=null;manwear=-1;manwear2=-1;manwearOffsetY=0;womanwear=-1;womanwear2=-1;womanwearOffsetY=0;manwear3=-1;womanwear3=-1;manhead=-1;manhead2=-1;womanhead=-1;womanhead2=-1;countobj=null;countco=null;certlink=-1;certtemplate=-1;unpack(A,R){if(A===1)this.model=R.g2();else if(A===2)this.name=R.gjstr();else if(A===3)this.desc=R.gjstr();else if(A===4)this.zoom2d=R.g2();else if(A===5)this.xan2d=R.g2();else if(A===6)this.yan2d=R.g2();else if(A===7){if(this.xof2d=R.g2b(),this.xof2d>32767)this.xof2d-=65536}else if(A===8){if(this.yof2d=R.g2b(),this.yof2d>32767)this.yof2d-=65536}else if(A===9)this.code9=!0;else if(A===10)this.code10=R.g2();else if(A===11)this.stackable=!0;else if(A===12)this.cost=R.g4();else if(A===16)this.members=!0;else if(A===23)this.manwear=R.g2(),this.manwearOffsetY=R.g1b();else if(A===24)this.manwear2=R.g2();else if(A===25)this.womanwear=R.g2(),this.womanwearOffsetY=R.g1b();else if(A===26)this.womanwear2=R.g2();else if(A>=30&&A<35){if(!this.op)this.op=new p(5,null);if(this.op[A-30]=R.gjstr(),this.op[A-30]?.toLowerCase()==="hidden")this.op[A-30]=null}else if(A>=35&&A<40){if(!this.iop)this.iop=new p(5,null);this.iop[A-35]=R.gjstr()}else if(A===40){let _=R.g1();this.recol_s=new Uint16Array(_),this.recol_d=new Uint16Array(_);for(let E=0;E<_;E++)this.recol_s[E]=R.g2(),this.recol_d[E]=R.g2()}else if(A===78)this.manwear3=R.g2();else if(A===79)this.womanwear3=R.g2();else if(A===90)this.manhead=R.g2();else if(A===91)this.womanhead=R.g2();else if(A===92)this.manhead2=R.g2();else if(A===93)this.womanhead2=R.g2();else if(A===95)this.zan2d=R.g2();else if(A===97)this.certlink=R.g2();else if(A===98)this.certtemplate=R.g2();else if(A>=100&&A<110){if(!this.countobj||!this.countco)this.countobj=new Uint16Array(10),this.countco=new Uint16Array(10);this.countobj[A-100]=R.g2(),this.countco[A-100]=R.g2()}}getWornModel(A){let R=this.manwear;if(A===1)R=this.womanwear;if(R===-1)return null;let _=this.manwear2,E=this.manwear3;if(A===1)_=this.womanwear2,E=this.womanwear3;let I=K.model(R);if(_!==-1){let H=K.model(_);if(E===-1){let N=[I,H];I=K.modelFromModels(N,2)}else{let N=K.model(E),O=[I,H,N];I=K.modelFromModels(O,3)}}if(A===0&&this.manwearOffsetY!==0)I.translateModel(this.manwearOffsetY,0,0);if(A===1&&this.womanwearOffsetY!==0)I.translateModel(this.womanwearOffsetY,0,0);if(this.recol_s&&this.recol_d)for(let H=0;H<this.recol_s.length;H++)I.recolor(this.recol_s[H],this.recol_d[H]);return I}getHeadModel(A){let R=this.manhead;if(A===1)R=this.womanhead;if(R===-1)return null;let _=this.manhead2;if(A===1)_=this.womanhead2;let E=K.model(R);if(_!==-1){let I=K.model(_),H=[E,I];E=K.modelFromModels(H,2)}if(this.recol_s&&this.recol_d)for(let I=0;I<this.recol_s.length;I++)E.recolor(this.recol_s[I],this.recol_d[I]);return E}getInterfaceModel(A){if(this.countobj&&this.countco&&A>1){let _=-1;for(let E=0;E<10;E++)if(A>=this.countco[E]&&this.countco[E]!==0)_=this.countobj[E];if(_!==-1)return E0.get(_).getInterfaceModel(1)}if(E0.modelCache){let _=E0.modelCache.get(BigInt(this.id));if(_)return _}let R=K.model(this.model);if(this.recol_s&&this.recol_d)for(let _=0;_<this.recol_s.length;_++)R.recolor(this.recol_s[_],this.recol_d[_]);return R.calculateNormals(64,768,-50,-10,-50,!0),R.pickAabb=!0,E0.modelCache?.put(BigInt(this.id),R),R}toCertificate(){let A=E0.get(this.certtemplate);this.model=A.model,this.zoom2d=A.zoom2d,this.xan2d=A.xan2d,this.yan2d=A.yan2d,this.zan2d=A.zan2d,this.xof2d=A.xof2d,this.yof2d=A.yof2d,this.recol_s=A.recol_s,this.recol_d=A.recol_d;let R=E0.get(this.certlink);this.name=R.name,this.members=R.members,this.cost=R.cost;let _="a",E=(R.name||"").toLowerCase().charAt(0);if(E==="a"||E==="e"||E==="i"||E==="o"||E==="u")_="an";this.desc=`Swap this note at any bank for ${_} ${R.name}.`,this.stackable=!0}reset(){this.model=0,this.name=null,this.desc=null,this.recol_s=null,this.recol_d=null,this.zoom2d=2000,this.xan2d=0,this.yan2d=0,this.zan2d=0,this.xof2d=0,this.yof2d=0,this.code9=!1,this.code10=-1,this.stackable=!1,this.cost=1,this.members=!1,this.op=null,this.iop=null,this.manwear=-1,this.manwear2=-1,this.manwearOffsetY=0,this.womanwear=-1,this.womanwear2=-1,this.womanwearOffsetY=0,this.manwear3=-1,this.womanwear3=-1,this.manhead=-1,this.manhead2=-1,this.womanhead=-1,this.womanhead2=-1,this.countobj=null,this.countco=null,this.certlink=-1,this.certtemplate=-1}}class f0 extends S0{static totalCount=0;static typeCache=null;static dat=null;static offsets=null;static cachePos=0;static modelCache=new b0(30);static unpack(A){this.dat=new s(A.read("npc.dat"));let R=new s(A.read("npc.idx"));this.totalCount=R.g2(),this.offsets=new Int32Array(this.totalCount);let _=2;for(let E=0;E<this.totalCount;E++)this.offsets[E]=_,_+=R.g2();this.typeCache=new p(20,null);for(let E=0;E<20;E++)this.typeCache[E]=new f0(-1)}static get(A){if(!this.typeCache||!this.offsets||!this.dat)throw new Error;for(let _=0;_<20;_++){let E=this.typeCache[_];if(!E)continue;if(E.id===A)return E}this.cachePos=(this.cachePos+1)%20;let R=this.typeCache[this.cachePos]=new f0(A);return this.dat.pos=this.offsets[A],R.unpackType(this.dat),R}name=null;desc=null;size=1;models=null;heads=null;disposeAlpha=!1;readyanim=-1;walkanim=-1;walkanim_b=-1;walkanim_r=-1;walkanim_l=-1;recol_s=null;recol_d=null;op=null;resizex=-1;resizey=-1;resizez=-1;minimap=!0;vislevel=-1;resizeh=128;resizev=128;unpack(A,R){if(A===1){let _=R.g1();this.models=new Uint16Array(_);for(let E=0;E<_;E++)this.models[E]=R.g2()}else if(A===2)this.name=R.gjstr();else if(A===3)this.desc=R.gjstr();else if(A===12)this.size=R.g1b();else if(A===13)this.readyanim=R.g2();else if(A===14)this.walkanim=R.g2();else if(A===16)this.disposeAlpha=!0;else if(A===17)this.walkanim=R.g2(),this.walkanim_b=R.g2(),this.walkanim_r=R.g2(),this.walkanim_l=R.g2();else if(A>=30&&A<40){if(!this.op)this.op=new p(5,null);if(this.op[A-30]=R.gjstr(),this.op[A-30]?.toLowerCase()==="hidden")this.op[A-30]=null}else if(A===40){let _=R.g1();this.recol_s=new Uint16Array(_),this.recol_d=new Uint16Array(_);for(let E=0;E<_;E++)this.recol_s[E]=R.g2(),this.recol_d[E]=R.g2()}else if(A===60){let _=R.g1();this.heads=new Uint16Array(_);for(let E=0;E<_;E++)this.heads[E]=R.g2()}else if(A===90)this.resizex=R.g2();else if(A===91)this.resizey=R.g2();else if(A===92)this.resizez=R.g2();else if(A===93)this.minimap=!1;else if(A===95)this.vislevel=R.g2();else if(A===97)this.resizeh=R.g2();else if(A===98)this.resizev=R.g2()}getSequencedModel(A,R,_){let E=null,I=null;if(f0.modelCache){if(I=f0.modelCache.get(BigInt(this.id)),!I&&this.models){let H=new p(this.models.length,null);for(let N=0;N<this.models.length;N++)H[N]=K.model(this.models[N]);if(H.length===1)I=H[0];else I=K.modelFromModels(H,H.length);if(this.recol_s&&this.recol_d)for(let N=0;N<this.recol_s.length;N++)I?.recolor(this.recol_s[N],this.recol_d[N]);if(I?.createLabelReferences(),I?.calculateNormals(64,850,-30,-50,-30,!0),I)f0.modelCache.put(BigInt(this.id),I)}}if(I){if(E=K.modelShareAlpha(I,!this.disposeAlpha),A!==-1&&R!==-1)E.applyTransforms(A,R,_);else if(A!==-1)E.applyTransform(A);if(this.resizeh!==128||this.resizev!==128)E.scale(this.resizeh,this.resizev,this.resizeh);if(E.calculateBoundsCylinder(),E.labelFaces=null,E.labelVertices=null,this.size===1)E.pickAabb=!0;return E}return null}getHeadModel(){if(!this.heads)return null;let A=new p(this.heads.length,null);for(let _=0;_<this.heads.length;_++)A[_]=K.model(this.heads[_]);let R;if(A.length===1)R=A[0];else R=K.modelFromModels(A,A.length);if(this.recol_s&&this.recol_d)for(let _=0;_<this.recol_s.length;_++)R?.recolor(this.recol_s[_],this.recol_d[_]);return R}}class X0 extends S0{static totalCount=0;static instances=[];static unpack(A){let R=new s(A.read("idk.dat"));this.totalCount=R.g2();for(let _=0;_<this.totalCount;_++)this.instances[_]=new X0(_).unpackType(R)}bodyPart=-1;models=null;heads=new Int32Array(5).fill(-1);recol_s=new Int32Array(6);recol_d=new Int32Array(6);disableKit=!1;unpack(A,R){if(A===1)this.bodyPart=R.g1();else if(A===2){let _=R.g1();this.models=new Int32Array(_);for(let E=0;E<_;E++)this.models[E]=R.g2()}else if(A===3)this.disableKit=!0;else if(A>=40&&A<50)this.recol_s[A-40]=R.g2();else if(A>=50&&A<60)this.recol_d[A-50]=R.g2();else if(A>=60&&A<70)this.heads[A-60]=R.g2()}getModel(){if(!this.models)return null;let A=new p(this.models.length,null);for(let _=0;_<this.models.length;_++)A[_]=K.model(this.models[_]);let R;if(A.length===1)R=A[0];else R=K.modelFromModels(A,A.length);for(let _=0;_<6&&this.recol_s[_]!==0;_++)R?.recolor(this.recol_s[_],this.recol_d[_]);return R}getHeadModel(){let A=0,R=new p(5,null);for(let E=0;E<5;E++)if(this.heads[E]!==-1)R[A++]=K.model(this.heads[E]);let _=K.modelFromModels(R,A);for(let E=0;E<6&&this.recol_s[E]!==0;E++)_.recolor(this.recol_s[E],this.recol_d[E]);return _}}class T0 extends S0{static totalCount=0;static instances=[];static modelCache=new b0(30);static unpack(A){let R=new s(A.read("spotanim.dat"));this.totalCount=R.g2();for(let _=0;_<this.totalCount;_++)this.instances[_]=new T0(_).unpackType(R)}model=0;anim=-1;seq=null;disposeAlpha=!1;recol_s=new Uint16Array(6);recol_d=new Uint16Array(6);resizeh=128;resizev=128;spotAngle=0;ambient=0;contrast=0;unpack(A,R){if(A===1)this.model=R.g2();else if(A===2){if(this.anim=R.g2(),c.instances)this.seq=c.instances[this.anim]}else if(A===3)this.disposeAlpha=!0;else if(A===4)this.resizeh=R.g2();else if(A===5)this.resizev=R.g2();else if(A===6)this.spotAngle=R.g2();else if(A===7)this.ambient=R.g1();else if(A===8)this.contrast=R.g1();else if(A>=40&&A<50)this.recol_s[A-40]=R.g2();else if(A>=50&&A<60)this.recol_d[A-50]=R.g2()}getModel(){let A=T0.modelCache?.get(BigInt(this.id));if(A)return A;A=K.model(this.model);for(let R=0;R<6;R++)if(this.recol_s[0]!==0)A.recolor(this.recol_s[R],this.recol_d[R]);return T0.modelCache?.put(BigInt(this.id),A),A}}class p0 extends S0{static totalCount=0;static instances=[];static code3=[];static code3Count=0;static unpack(A){let R=new s(A.read("varp.dat"));this.totalCount=R.g2();for(let _=0;_<this.totalCount;_++)this.instances[_]=new p0(_).unpackType(R)}scope=0;varType=0;code3=!1;protect=!0;clientcode=0;code7=0;transmit=!1;code8=!1;unpack(A,R){if(A===1)this.scope=R.g1();else if(A===2)this.varType=R.g1();else if(A===3)this.code3=!0,p0.code3[p0.code3Count++]=this.id;else if(A===4)this.protect=!1;else if(A===5)this.clientcode=R.g2();else if(A===6)this.transmit=!0;else if(A===7)this.code7=R.g4();else if(A===8)this.code8=!0;else if(A===10)this.debugname=R.gjstr()}}class e{static BASE37_LOOKUP=["_","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9"];static toBase37(A){A=A.trim();let R=0n;for(let _=0;_<A.length&&_<12;_++){let E=A.charCodeAt(_);if(R*=37n,E>=65&&E<=90)R+=BigInt(E+1-65);else if(E>=97&&E<=122)R+=BigInt(E+1-97);else if(E>=48&&E<=57)R+=BigInt(E+27-48)}return R}static fromBase37(A){if(A<0n||A>=6582952005840035281n)return"invalid_name";if(A%37n===0n)return"invalid_name";let R=0,_=Array(12);while(A!==0n){let E=A;A/=37n,_[11-R++]=this.BASE37_LOOKUP[Number(E-A*37n)]}return _.slice(12-R).join("")}static toSentenceCase(A){let R=[...A.toLowerCase()],_=!0;for(let E=0;E<R.length;E++){let I=R[E];if(_&&I>="a"&&I<="z")R[E]=I.toUpperCase(),_=!1;if(I==="."||I==="!")_=!0}return R.join("")}static toAsterisks(A){let R="";for(let _=0;_<A.length;_++)R=R+"*";return R}static formatIPv4(A){return(A>>24&255)+"."+(A>>16&255)+"."+(A>>8&255)+"."+(A&255)}static formatName(A){if(A.length===0)return A;let R=[...A];for(let _=0;_<R.length;_++)if(R[_]==="_"){if(R[_]=" ",_+1<R.length&&R[_+1]>="a"&&R[_+1]<="z")R[_+1]=String.fromCharCode(R[_+1].charCodeAt(0)+65-97)}if(R[0]>="a"&&R[0]<="z")R[0]=String.fromCharCode(R[0].charCodeAt(0)+65-97);return R.join("")}static hashCode(A){let R=A.toUpperCase(),_=0n;for(let E=0;E<R.length;E++)_=_*61n+BigInt(R.charCodeAt(E))-32n,_=_+(_>>56n)&0xffffffffffffffn;return _}}class r{static instances=[];static imageCache=null;static modelCache=null;static unpack(A,R,_){this.imageCache=new b0(50000),this.modelCache=new b0(50000);let E=new s(A.read("data")),I=-1;E.pos+=2;while(E.pos<E.length){let H=E.g2();if(H===65535)I=E.g2(),H=E.g2();let N=this.instances[H]=new r;if(N.id=H,N.layer=I,N.comType=E.g1(),N.buttonType=E.g1(),N.clientCode=E.g2(),N.width=E.g2(),N.height=E.g2(),N.overLayer=E.g1(),N.overLayer===0)N.overLayer=-1;else N.overLayer=(N.overLayer-1<<8)+E.g1();let O=E.g1();if(O>0){N.scriptComparator=new Uint8Array(O),N.scriptOperand=new Uint16Array(O);for(let U=0;U<O;U++)N.scriptComparator[U]=E.g1(),N.scriptOperand[U]=E.g2()}let Q=E.g1();if(Q>0){N.script=new p(Q,null);for(let U=0;U<Q;U++){let G=E.g2(),$=new Uint16Array(G);N.script[U]=$;for(let L=0;L<G;L++)$[L]=E.g2()}}if(N.comType===0){N.scroll=E.g2(),N.hide=E.g1()===1;let U=E.g1();N.childId=new Array(U),N.childX=new Array(U),N.childY=new Array(U);for(let G=0;G<U;G++)N.childId[G]=E.g2(),N.childX[G]=E.g2b(),N.childY[G]=E.g2b()}if(N.comType===1)E.pos+=3;if(N.comType===2){N.invSlotObjId=new Int32Array(N.width*N.height),N.invSlotObjCount=new Int32Array(N.width*N.height),N.draggable=E.g1()===1,N.interactable=E.g1()===1,N.usable=E.g1()===1,N.marginX=E.g1(),N.marginY=E.g1(),N.invSlotOffsetX=new Int16Array(20),N.invSlotOffsetY=new Int16Array(20),N.invSlotSprite=new p(20,null);for(let U=0;U<20;U++)if(E.g1()===1){N.invSlotOffsetX[U]=E.g2b(),N.invSlotOffsetY[U]=E.g2b();let G=E.gjstr();if(G.length>0){let $=G.lastIndexOf(",");N.invSlotSprite[U]=this.getImage(R,G.substring(0,$),parseInt(G.substring($+1),10))}}N.iops=new p(5,null);for(let U=0;U<5;U++){let G=E.gjstr();if(N.iops[U]=G,G.length===0)N.iops[U]=null}}if(N.comType===3)N.fill=E.g1()===1;if(N.comType===4||N.comType===1){N.center=E.g1()===1;let U=E.g1();if(_)N.font=_[U];N.shadowed=E.g1()===1}if(N.comType===4)N.text=E.gjstr(),N.activeText=E.gjstr();if(N.comType===1||N.comType===3||N.comType===4)N.colour=E.g4();if(N.comType===3||N.comType===4)N.activeColour=E.g4(),N.overColour=E.g4();if(N.comType===5){let U=E.gjstr();if(U.length>0){let $=U.lastIndexOf(",");N.graphic=this.getImage(R,U.substring(0,$),parseInt(U.substring($+1),10))}let G=E.gjstr();if(G.length>0){let $=G.lastIndexOf(",");N.activeGraphic=this.getImage(R,G.substring(0,$),parseInt(G.substring($+1),10))}}if(N.comType===6){let U=E.g1();if(U!==0)N.model=this.getModel((U-1<<8)+E.g1());let G=E.g1();if(G!==0)N.activeModel=this.getModel((G-1<<8)+E.g1());if(N.anim=E.g1(),N.anim===0)N.anim=-1;else N.anim=(N.anim-1<<8)+E.g1();if(N.activeAnim=E.g1(),N.activeAnim===0)N.activeAnim=-1;else N.activeAnim=(N.activeAnim-1<<8)+E.g1();N.zoom=E.g2(),N.xan=E.g2(),N.yan=E.g2()}if(N.comType===7){N.invSlotObjId=new Int32Array(N.width*N.height),N.invSlotObjCount=new Int32Array(N.width*N.height),N.center=E.g1()===1;let U=E.g1();if(_)N.font=_[U];N.shadowed=E.g1()===1,N.colour=E.g4(),N.marginX=E.g2b(),N.marginY=E.g2b(),N.interactable=E.g1()===1,N.iops=new p(5,null);for(let G=0;G<5;G++){let $=E.gjstr();if(N.iops[G]=$,$.length===0)N.iops[G]=null}}if(N.buttonType===2||N.comType===2)N.actionVerb=E.gjstr(),N.action=E.gjstr(),N.actionTarget=E.g2();if(N.buttonType===1||N.buttonType===4||N.buttonType===5||N.buttonType===6){if(N.option=E.gjstr(),N.option.length===0){if(N.buttonType===1)N.option="Ok";else if(N.buttonType===4)N.option="Select";else if(N.buttonType===5)N.option="Select";else if(N.buttonType===6)N.option="Continue"}}}this.imageCache=null,this.modelCache=null}static getImage(A,R,_){let E=e.hashCode(R)<<8n|BigInt(_);if(this.imageCache){let H=this.imageCache.get(E);if(H)return H}let I;try{I=_0.fromArchive(A,R,_),this.imageCache?.put(E,I)}catch(H){return null}return I}static getModel(A){if(this.modelCache){let _=this.modelCache.get(BigInt(A));if(_)return _}let R=K.model(A);return this.modelCache?.put(BigInt(A),R),R}id=-1;layer=-1;comType=-1;buttonType=-1;clientCode=0;width=0;height=0;overLayer=-1;scriptComparator=null;scriptOperand=null;script=null;scroll=0;hide=!1;draggable=!1;interactable=!1;usable=!1;marginX=0;marginY=0;invSlotOffsetX=null;invSlotOffsetY=null;invSlotSprite=null;iops=null;fill=!1;center=!1;font=null;shadowed=!1;text=null;activeText=null;colour=0;activeColour=0;overColour=0;graphic=null;activeGraphic=null;model=null;activeModel=null;anim=-1;activeAnim=-1;zoom=0;xan=0;yan=0;actionVerb=null;action=null;actionTarget=-1;option=null;childId=null;childX=null;childY=null;x=0;y=0;scrollPosition=0;invSlotObjId=null;invSlotObjCount=null;seqFrame=0;seqCycle=0;getModel(A,R,_){let E=this.model;if(_)E=this.activeModel;if(!E)return null;if(A===-1&&R===-1&&!E.faceColor)return E;let I=K.modelShareColored(E,!0,!0,!1);if(A!==-1||R!==-1)I.createLabelReferences();if(A!==-1)I.applyTransform(A);if(R!==-1)I.applyTransform(R);return I.calculateNormals(64,768,-50,-10,-50,!0),I}getAbsoluteX(){if(this.layer===this.id)return this.x;let A=r.instances[this.layer];if(!A.childId||!A.childX||!A.childY)return this.x;let R=A.childId.indexOf(this.id);if(R===-1)return this.x;let _=A.childX[R];while(A.layer!==A.id){let E=r.instances[A.layer];if(E.childId&&E.childX&&E.childY){if(R=E.childId.indexOf(A.id),R!==-1)_+=E.childX[R]}A=E}return _}getAbsoluteY(){if(this.layer===this.id)return this.y;let A=r.instances[this.layer];if(!A.childId||!A.childX||!A.childY)return this.y;let R=A.childId.indexOf(this.id);if(R===-1)return this.y;let _=A.childY[R];while(A.layer!==A.id){let E=r.instances[A.layer];if(E.childId&&E.childX&&E.childY){if(R=E.childId.indexOf(A.id),R!==-1)_+=E.childY[R]}A=E}return _}outline(A){let R=this.getAbsoluteX(),_=this.getAbsoluteY();k.drawRect(R,_,this.width,this.height,A)}move(A,R){if(this.layer===this.id)return;this.x=0,this.y=0;let _=r.instances[this.layer];if(_.childId&&_.childX&&_.childY){let E=_.childId.indexOf(this.id);if(E!==-1)_.childX[E]=A,_.childY[E]=R}}delete(){if(this.layer===this.id)return;let A=r.instances[this.layer];if(A.childId&&A.childX&&A.childY){let R=A.childId.indexOf(this.id);if(R!==-1)A.childId.splice(R,1),A.childX.splice(R,1),A.childY.splice(R,1)}}}class R0{static index=(A,R)=>A*104+R;startX;startZ;sizeX;sizeZ;flags;constructor(){this.startX=0,this.startZ=0,this.sizeX=104,this.sizeZ=104,this.flags=new Int32Array(this.sizeX*this.sizeZ),this.reset()}reset(){for(let A=0;A<this.sizeX;A++)for(let R=0;R<this.sizeZ;R++){let _=R0.index(A,R);if(A===0||R===0||A===this.sizeX-1||R===this.sizeZ-1)this.flags[_]=16777215;else this.flags[_]=0}}addFloor(A,R){this.flags[R0.index(A-this.startX,R-this.startZ)]|=2097152}removeFloor(A,R){this.flags[R0.index(A-this.startX,R-this.startZ)]&=~2097152}addLoc(A,R,_,E,I,H){let N=256;if(H)N|=131072;let O=A-this.startX,Q=R-this.startZ;if(I===1||I===3){let U=_;_=E,E=U}for(let U=O;U<O+_;U++){if(!(U>=0&&U<this.sizeX))continue;for(let G=Q;G<Q+E;G++){if(!(G>=0&&G<this.sizeZ))continue;this.add(U,G,N)}}}removeLoc(A,R,_,E,I,H){let N=256;if(H)N|=131072;let O=A-this.startX,Q=R-this.startZ;if(I===1||I===3){let U=_;_=E,E=U}for(let U=O;U<O+_;U++){if(!(U>=0&&U<this.sizeX))continue;for(let G=Q;G<Q+E;G++){if(!(G>=0&&G<this.sizeZ))continue;this.remove(U,G,N)}}}addWall(A,R,_,E,I){let H=A-this.startX,N=R-this.startZ,O=I?65536:128,Q=I?4096:8,U=I?1024:2,G=I?16384:32,$=I?512:1,L=I?8192:16,J=I?2048:4,q=I?32768:64;if(_===D.WALL_STRAIGHT.id){if(E===0)this.add(H,N,O),this.add(H-1,N,Q);else if(E===1)this.add(H,N,U),this.add(H,N+1,G);else if(E===2)this.add(H,N,Q),this.add(H+1,N,O);else if(E===3)this.add(H,N,G),this.add(H,N-1,U)}else if(_===D.WALL_DIAGONAL_CORNER.id||_===D.WALL_SQUARE_CORNER.id){if(E===0)this.add(H,N,$),this.add(H-1,N+1,L);else if(E===1)this.add(H,N,J),this.add(H+1,N+1,q);else if(E===2)this.add(H,N,L),this.add(H+1,N-1,$);else if(E===3)this.add(H,N,q),this.add(H-1,N-1,J)}else if(_===D.WALL_L.id){if(E===0)this.add(H,N,U|O),this.add(H-1,N,Q),this.add(H,N+1,G);else if(E===1)this.add(H,N,U|Q),this.add(H,N+1,G),this.add(H+1,N,O);else if(E===2)this.add(H,N,G|Q),this.add(H+1,N,O),this.add(H,N-1,U);else if(E===3)this.add(H,N,G|O),this.add(H,N-1,U),this.add(H-1,N,Q)}if(I)this.addWall(A,R,_,E,!1)}removeWall(A,R,_,E,I){let H=A-this.startX,N=R-this.startZ,O=I?65536:128,Q=I?4096:8,U=I?1024:2,G=I?16384:32,$=I?512:1,L=I?8192:16,J=I?2048:4,q=I?32768:64;if(_===D.WALL_STRAIGHT.id){if(E===0)this.remove(H,N,O),this.remove(H-1,N,Q);else if(E===1)this.remove(H,N,U),this.remove(H,N+1,G);else if(E===2)this.remove(H,N,Q),this.remove(H+1,N,O);else if(E===3)this.remove(H,N,G),this.remove(H,N-1,U)}else if(_===D.WALL_DIAGONAL_CORNER.id||_===D.WALL_SQUARE_CORNER.id){if(E===0)this.remove(H,N,$),this.remove(H-1,N+1,L);else if(E===1)this.remove(H,N,J),this.remove(H+1,N+1,q);else if(E===2)this.remove(H,N,L),this.remove(H+1,N-1,$);else if(E===3)this.remove(H,N,q),this.remove(H-1,N-1,J)}else if(_===D.WALL_L.id){if(E===0)this.remove(H,N,U|O),this.remove(H-1,N,Q),this.remove(H,N+1,G);else if(E===1)this.remove(H,N,U|Q),this.remove(H,N+1,G),this.remove(H+1,N,O);else if(E===2)this.remove(H,N,G|Q),this.remove(H+1,N,O),this.remove(H,N-1,U);else if(E===3)this.remove(H,N,G|O),this.remove(H,N-1,U),this.remove(H-1,N,Q)}if(I)this.removeWall(A,R,_,E,!1)}reachedWall(A,R,_,E,I,H){if(A===_&&R===E)return!0;let N=A-this.startX,O=R-this.startZ,Q=_-this.startX,U=E-this.startZ,G=R0.index(N,O);if(I===D.WALL_STRAIGHT.id){if(H===0){if(N===Q-1&&O===U)return!0;else if(N===Q&&O===U+1&&(this.flags[G]&2621728)===0)return!0;else if(N===Q&&O===U-1&&(this.flags[G]&2621698)===0)return!0}else if(H===1){if(N===Q&&O===U+1)return!0;else if(N===Q-1&&O===U&&(this.flags[G]&2621704)===0)return!0;else if(N===Q+1&&O===U&&(this.flags[G]&2621824)===0)return!0}else if(H===2){if(N===Q+1&&O===U)return!0;else if(N===Q&&O===U+1&&(this.flags[G]&2621728)===0)return!0;else if(N===Q&&O===U-1&&(this.flags[G]&2621698)===0)return!0}else if(H===3){if(N===Q&&O===U-1)return!0;else if(N===Q-1&&O===U&&(this.flags[G]&2621704)===0)return!0;else if(N===Q+1&&O===U&&(this.flags[G]&2621824)===0)return!0}}else if(I===D.WALL_L.id){if(H===0){if(N===Q-1&&O===U)return!0;else if(N===Q&&O===U+1)return!0;else if(N===Q+1&&O===U&&(this.flags[G]&2621824)===0)return!0;else if(N===Q&&O===U-1&&(this.flags[G]&2621698)===0)return!0}else if(H===1){if(N===Q-1&&O===U&&(this.flags[G]&2621704)===0)return!0;else if(N===Q&&O===U+1)return!0;else if(N===Q+1&&O===U)return!0;else if(N===Q&&O===U-1&&(this.flags[G]&2621698)===0)return!0}else if(H===2){if(N===Q-1&&O===U&&(this.flags[G]&2621704)===0)return!0;else if(N===Q&&O===U+1&&(this.flags[G]&2621728)===0)return!0;else if(N===Q+1&&O===U)return!0;else if(N===Q&&O===U-1)return!0}else if(H===3){if(N===Q-1&&O===U)return!0;else if(N===Q&&O===U+1&&(this.flags[G]&2621728)===0)return!0;else if(N===Q+1&&O===U&&(this.flags[G]&2621824)===0)return!0;else if(N===Q&&O===U-1)return!0}}else if(I===D.WALL_DIAGONAL.id){if(N===Q&&O===U+1&&(this.flags[G]&32)===0)return!0;else if(N===Q&&O===U-1&&(this.flags[G]&2)===0)return!0;else if(N===Q-1&&O===U&&(this.flags[G]&8)===0)return!0;else if(N===Q+1&&O===U&&(this.flags[G]&128)===0)return!0}return!1}reachedWallDecoration(A,R,_,E,I,H){if(A===_&&R===E)return!0;let N=A-this.startX,O=R-this.startZ,Q=_-this.startX,U=E-this.startZ,G=R0.index(N,O);if(I===D.WALLDECOR_DIAGONAL_OFFSET.id||I===D.WALLDECOR_DIAGONAL_NOOFFSET.id){if(I===D.WALLDECOR_DIAGONAL_NOOFFSET.id)H=H+2&3;if(H===0){if(N===Q+1&&O===U&&(this.flags[G]&128)===0)return!0;else if(N===Q&&O===U-1&&(this.flags[G]&2)===0)return!0}else if(H===1){if(N===Q-1&&O===U&&(this.flags[G]&8)===0)return!0;else if(N===Q&&O===U-1&&(this.flags[G]&2)===0)return!0}else if(H===2){if(N===Q-1&&O===U&&(this.flags[G]&8)===0)return!0;else if(N===Q&&O===U+1&&(this.flags[G]&32)===0)return!0}else if(H===3){if(N===Q+1&&O===U&&(this.flags[G]&128)===0)return!0;else if(N===Q&&O===U+1&&(this.flags[G]&32)===0)return!0}}else if(I===D.WALLDECOR_DIAGONAL_BOTH.id){if(N===Q&&O===U+1&&(this.flags[G]&32)===0)return!0;else if(N===Q&&O===U-1&&(this.flags[G]&2)===0)return!0;else if(N===Q-1&&O===U&&(this.flags[G]&8)===0)return!0;else if(N===Q+1&&O===U&&(this.flags[G]&128)===0)return!0}return!1}reachedLoc(A,R,_,E,I,H,N){let O=_+I-1,Q=E+H-1,U=R0.index(A-this.startX,R-this.startZ);if(A>=_&&A<=O&&R>=E&&R<=Q)return!0;else if(A===_-1&&R>=E&&R<=Q&&(this.flags[U]&8)===0&&(N&8)===0)return!0;else if(A===O+1&&R>=E&&R<=Q&&(this.flags[U]&128)===0&&(N&2)===0)return!0;else if(R===E-1&&A>=_&&A<=O&&(this.flags[U]&2)===0&&(N&4)===0)return!0;else if(R===Q+1&&A>=_&&A<=O&&(this.flags[U]&32)===0&&(N&1)===0)return!0;return!1}add(A,R,_){this.flags[R0.index(A,R)]|=_}remove(A,R,_){this.flags[R0.index(A,R)]&=16777215-_}}class u6{minTileX;maxTileX;minTileZ;maxTileZ;type;minX;maxX;minZ;maxZ;minY;maxY;mode=0;minDeltaX=0;maxDeltaX=0;minDeltaZ=0;maxDeltaZ=0;minDeltaY=0;maxDeltaY=0;constructor(A,R,_,E,I,H,N,O,Q,U,G){this.minTileX=A,this.maxTileX=R,this.minTileZ=_,this.maxTileZ=E,this.type=I,this.minX=H,this.maxX=N,this.minZ=O,this.maxZ=Q,this.minY=U,this.maxY=G}}class W6{y;x;z;model;typecode;info;constructor(A,R,_,E,I,H){this.y=A,this.x=R,this.z=_,this.model=E,this.typecode=I,this.info=H}}class g6{locLevel;y;x;z;model;entity;yaw;minSceneTileX;maxSceneTileX;minSceneTileZ;maxSceneTileZ;typecode;info;distance=0;cycle=0;constructor(A,R,_,E,I,H,N,O,Q,U,G,$,L){this.locLevel=A,this.y=R,this.x=_,this.z=E,this.model=I,this.entity=H,this.yaw=N,this.minSceneTileX=O,this.maxSceneTileX=Q,this.minSceneTileZ=U,this.maxSceneTileZ=G,this.typecode=$,this.info=L}}class M6{y;x;z;topObj;middleObj;bottomObj;typecode;offset;constructor(A,R,_,E,I,H,N,O){this.y=A,this.x=R,this.z=_,this.topObj=E,this.middleObj=I,this.bottomObj=H,this.typecode=N,this.offset=O}}class n0 extends k0{groundLevel;x;z;occludeLevel;locs;locSpan;underlay=null;overlay=null;wall=null;wallDecoration=null;groundDecoration=null;objStack=null;bridge=null;locCount=0;locSpans=0;drawLevel=0;groundVisible=!1;update=!1;containsLocs=!1;checkLocSpans=0;blockLocSpans=0;inverseBlockLocSpans=0;backWallTypes=0;constructor(A,R,_){super();this.occludeLevel=this.groundLevel=A,this.x=R,this.z=_,this.locs=new p(5,null),this.locSpan=new Int32Array(5)}}class a{static tmpScreenX=new Int32Array(6);static tmpScreenY=new Int32Array(6);static tmpViewspaceX=new Int32Array(6);static tmpViewspaceY=new Int32Array(6);static tmpViewspaceZ=new Int32Array(6);static SHAPE_POINTS=[Int8Array.of(1,3,5,7),Int8Array.of(1,3,5,7),Int8Array.of(1,3,5,7),Int8Array.of(1,3,5,7,6),Int8Array.of(1,3,5,7,6),Int8Array.of(1,3,5,7,6),Int8Array.of(1,3,5,7,6),Int8Array.of(1,3,5,7,2,6),Int8Array.of(1,3,5,7,2,8),Int8Array.of(1,3,5,7,2,8),Int8Array.of(1,3,5,7,11,12),Int8Array.of(1,3,5,7,11,12),Int8Array.of(1,3,5,7,13,14)];static SHAPE_PATHS=[Int8Array.of(0,1,2,3,0,0,1,3),Int8Array.of(1,1,2,3,1,0,1,3),Int8Array.of(0,1,2,3,1,0,1,3),Int8Array.of(0,0,1,2,0,0,2,4,1,0,4,3),Int8Array.of(0,0,1,4,0,0,4,3,1,1,2,4),Int8Array.of(0,0,4,3,1,0,1,2,1,0,2,4),Int8Array.of(0,1,2,4,1,0,1,4,1,0,4,3),Int8Array.of(0,4,1,2,0,4,2,5,1,0,4,5,1,0,5,3),Int8Array.of(0,4,1,2,0,4,2,3,0,4,3,5,1,0,4,5),Int8Array.of(0,0,4,5,1,4,1,2,1,4,2,3,1,4,3,5),Int8Array.of(0,0,1,5,0,1,4,5,0,1,2,4,1,0,5,3,1,5,4,3,1,4,2,3),Int8Array.of(1,0,1,5,1,1,4,5,1,1,2,4,0,0,5,3,0,5,4,3,0,4,2,3),Int8Array.of(1,0,5,4,1,0,1,5,0,0,4,3,0,4,5,3,0,5,2,3,0,1,2,5)];static FULL_SQUARE=128;static HALF_SQUARE=this.FULL_SQUARE/2|0;static CORNER_SMALL=this.FULL_SQUARE/4|0;static CORNER_BIG=this.FULL_SQUARE*3/4|0;vertexX;vertexY;vertexZ;triangleColorA;triangleColorB;triangleColorC;triangleVertexA;triangleVertexB;triangleVertexC;triangleTextureIds;flat;shape;shapeAngle;backgroundRgb;foregroundRgb;constructor(A,R,_,E,I,H,N,O,Q,U,G,$,L,J,q,V,B,F,b){this.flat=!(B!==E||B!==J||B!==O),this.shape=R,this.shapeAngle=H,this.backgroundRgb=L,this.foregroundRgb=Q;let T=a.SHAPE_POINTS[R],j=T.length;this.vertexX=new Int32Array(j),this.vertexY=new Int32Array(j),this.vertexZ=new Int32Array(j);let w=new Int32Array(j),Z=new Int32Array(j),W=A*a.FULL_SQUARE,Y=F*a.FULL_SQUARE;for(let X=0;X<j;X++){let f=T[X];if((f&1)===0&&f<=8)f=(f-H-H-1&7)+1;if(f>8&&f<=12)f=(f-H-9&3)+9;if(f>12&&f<=16)f=(f-H-13&3)+13;let g,v,M,x,y;if(f===1)g=W,v=Y,M=B,x=N,y=U;else if(f===2)g=W+a.HALF_SQUARE,v=Y,M=B+E>>1,x=N+b>>1,y=U+_>>1;else if(f===3)g=W+a.FULL_SQUARE,v=Y,M=E,x=b,y=_;else if(f===4)g=W+a.FULL_SQUARE,v=Y+a.HALF_SQUARE,M=E+J>>1,x=b+I>>1,y=_+q>>1;else if(f===5)g=W+a.FULL_SQUARE,v=Y+a.FULL_SQUARE,M=J,x=I,y=q;else if(f===6)g=W+a.HALF_SQUARE,v=Y+a.FULL_SQUARE,M=J+O>>1,x=I+V>>1,y=q+$>>1;else if(f===7)g=W,v=Y+a.FULL_SQUARE,M=O,x=V,y=$;else if(f===8)g=W,v=Y+a.HALF_SQUARE,M=O+B>>1,x=V+N>>1,y=$+U>>1;else if(f===9)g=W+a.HALF_SQUARE,v=Y+a.CORNER_SMALL,M=B+E>>1,x=N+b>>1,y=U+_>>1;else if(f===10)g=W+a.CORNER_BIG,v=Y+a.HALF_SQUARE,M=E+J>>1,x=b+I>>1,y=_+q>>1;else if(f===11)g=W+a.HALF_SQUARE,v=Y+a.CORNER_BIG,M=J+O>>1,x=I+V>>1,y=q+$>>1;else if(f===12)g=W+a.CORNER_SMALL,v=Y+a.HALF_SQUARE,M=O+B>>1,x=V+N>>1,y=$+U>>1;else if(f===13)g=W+a.CORNER_SMALL,v=Y+a.CORNER_SMALL,M=B,x=N,y=U;else if(f===14)g=W+a.CORNER_BIG,v=Y+a.CORNER_SMALL,M=E,x=b,y=_;else if(f===15)g=W+a.CORNER_BIG,v=Y+a.CORNER_BIG,M=J,x=I,y=q;else g=W+a.CORNER_SMALL,v=Y+a.CORNER_BIG,M=O,x=V,y=$;this.vertexX[X]=g,this.vertexY[X]=M,this.vertexZ[X]=v,w[X]=x,Z[X]=y}let u=a.SHAPE_PATHS[R],h=u.length/4|0;if(this.triangleVertexA=new Int32Array(h),this.triangleVertexB=new Int32Array(h),this.triangleVertexC=new Int32Array(h),this.triangleColorA=new Int32Array(h),this.triangleColorB=new Int32Array(h),this.triangleColorC=new Int32Array(h),G!==-1)this.triangleTextureIds=new Int32Array(h);else this.triangleTextureIds=null;let n=0;for(let X=0;X<h;X++){let f=u[n],g=u[n+1],v=u[n+2],M=u[n+3];if(n+=4,g<4)g=g-H&3;if(v<4)v=v-H&3;if(M<4)M=M-H&3;if(this.triangleVertexA[X]=g,this.triangleVertexB[X]=v,this.triangleVertexC[X]=M,f===0){if(this.triangleColorA[X]=w[g],this.triangleColorB[X]=w[v],this.triangleColorC[X]=w[M],this.triangleTextureIds)this.triangleTextureIds[X]=-1}else if(this.triangleColorA[X]=Z[g],this.triangleColorB[X]=Z[v],this.triangleColorC[X]=Z[M],this.triangleTextureIds)this.triangleTextureIds[X]=G}}}class L6{southwestColor;southeastColor;northeastColor;northwestColor;textureId;colour;flat;constructor(A,R,_,E,I,H,N){this.southwestColor=A,this.southeastColor=R,this.northeastColor=_,this.northwestColor=E,this.textureId=I,this.colour=H,this.flat=N}}class P6{y;x;z;typeA;typeB;modelA;modelB;typecode;info;constructor(A,R,_,E,I,H,N,O,Q){this.y=A,this.x=R,this.z=_,this.typeA=E,this.typeB=I,this.modelA=H,this.modelB=N,this.typecode=O,this.info=Q}}class D6{y;x;z;decorType;decorAngle;model;typecode;info;constructor(A,R,_,E,I,H,N,O){this.y=A,this.x=R,this.z=_,this.decorType=E,this.decorAngle=I,this.model=H,this.typecode=N,this.info=O}}var F0=0.000001,g0=typeof Float32Array!=="undefined"?Float32Array:Array,Q1=Math.random;var U5=Math.PI/180;if(!Math.hypot)Math.hypot=function(){var A=0,R=arguments.length;while(R--)A+=arguments[R]*arguments[R];return Math.sqrt(A)};var Z0={};j1(Z0,{transpose:()=>D8,translate:()=>C8,targetTo:()=>JA,subtract:()=>D1,sub:()=>bA,str:()=>LA,set:()=>P8,scale:()=>r8,rotateZ:()=>y8,rotateY:()=>x8,rotateX:()=>i8,rotate:()=>p8,perspectiveZO:()=>OA,perspectiveNO:()=>M1,perspectiveFromFieldOfView:()=>QA,perspective:()=>NA,orthoZO:()=>GA,orthoNO:()=>P1,ortho:()=>UA,multiplyScalarAndAdd:()=>FA,multiplyScalar:()=>KA,multiply:()=>u1,mul:()=>SA,lookAt:()=>$A,invert:()=>s8,identity:()=>n1,getTranslation:()=>AA,getScaling:()=>g1,getRotation:()=>RA,frustum:()=>HA,fromZRotation:()=>o8,fromYRotation:()=>l8,fromXRotation:()=>t8,fromValues:()=>M8,fromTranslation:()=>c8,fromScaling:()=>a8,fromRotationTranslationScaleOrigin:()=>EA,fromRotationTranslationScale:()=>_A,fromRotationTranslation:()=>W1,fromRotation:()=>d8,fromQuat2:()=>e8,fromQuat:()=>IA,frob:()=>qA,exactEquals:()=>VA,equals:()=>kA,determinant:()=>v8,create:()=>u8,copy:()=>g8,clone:()=>W8,adjoint:()=>z8,add:()=>BA});function u8(){var A=new g0(16);if(g0!=Float32Array)A[1]=0,A[2]=0,A[3]=0,A[4]=0,A[6]=0,A[7]=0,A[8]=0,A[9]=0,A[11]=0,A[12]=0,A[13]=0,A[14]=0;return A[0]=1,A[5]=1,A[10]=1,A[15]=1,A}function W8(A){var R=new g0(16);return R[0]=A[0],R[1]=A[1],R[2]=A[2],R[3]=A[3],R[4]=A[4],R[5]=A[5],R[6]=A[6],R[7]=A[7],R[8]=A[8],R[9]=A[9],R[10]=A[10],R[11]=A[11],R[12]=A[12],R[13]=A[13],R[14]=A[14],R[15]=A[15],R}function g8(A,R){return A[0]=R[0],A[1]=R[1],A[2]=R[2],A[3]=R[3],A[4]=R[4],A[5]=R[5],A[6]=R[6],A[7]=R[7],A[8]=R[8],A[9]=R[9],A[10]=R[10],A[11]=R[11],A[12]=R[12],A[13]=R[13],A[14]=R[14],A[15]=R[15],A}function M8(A,R,_,E,I,H,N,O,Q,U,G,$,L,J,q,V){var B=new g0(16);return B[0]=A,B[1]=R,B[2]=_,B[3]=E,B[4]=I,B[5]=H,B[6]=N,B[7]=O,B[8]=Q,B[9]=U,B[10]=G,B[11]=$,B[12]=L,B[13]=J,B[14]=q,B[15]=V,B}function P8(A,R,_,E,I,H,N,O,Q,U,G,$,L,J,q,V,B){return A[0]=R,A[1]=_,A[2]=E,A[3]=I,A[4]=H,A[5]=N,A[6]=O,A[7]=Q,A[8]=U,A[9]=G,A[10]=$,A[11]=L,A[12]=J,A[13]=q,A[14]=V,A[15]=B,A}function n1(A){return A[0]=1,A[1]=0,A[2]=0,A[3]=0,A[4]=0,A[5]=1,A[6]=0,A[7]=0,A[8]=0,A[9]=0,A[10]=1,A[11]=0,A[12]=0,A[13]=0,A[14]=0,A[15]=1,A}function D8(A,R){if(A===R){var _=R[1],E=R[2],I=R[3],H=R[6],N=R[7],O=R[11];A[1]=R[4],A[2]=R[8],A[3]=R[12],A[4]=_,A[6]=R[9],A[7]=R[13],A[8]=E,A[9]=H,A[11]=R[14],A[12]=I,A[13]=N,A[14]=O}else A[0]=R[0],A[1]=R[4],A[2]=R[8],A[3]=R[12],A[4]=R[1],A[5]=R[5],A[6]=R[9],A[7]=R[13],A[8]=R[2],A[9]=R[6],A[10]=R[10],A[11]=R[14],A[12]=R[3],A[13]=R[7],A[14]=R[11],A[15]=R[15];return A}function s8(A,R){var _=R[0],E=R[1],I=R[2],H=R[3],N=R[4],O=R[5],Q=R[6],U=R[7],G=R[8],$=R[9],L=R[10],J=R[11],q=R[12],V=R[13],B=R[14],F=R[15],b=_*O-E*N,T=_*Q-I*N,j=_*U-H*N,w=E*Q-I*O,Z=E*U-H*O,W=I*U-H*Q,Y=G*V-$*q,u=G*B-L*q,h=G*F-J*q,n=$*B-L*V,X=$*F-J*V,f=L*F-J*B,g=b*f-T*X+j*n+w*h-Z*u+W*Y;if(!g)return null;return g=1/g,A[0]=(O*f-Q*X+U*n)*g,A[1]=(I*X-E*f-H*n)*g,A[2]=(V*W-B*Z+F*w)*g,A[3]=(L*Z-$*W-J*w)*g,A[4]=(Q*h-N*f-U*u)*g,A[5]=(_*f-I*h+H*u)*g,A[6]=(B*j-q*W-F*T)*g,A[7]=(G*W-L*j+J*T)*g,A[8]=(N*X-O*h+U*Y)*g,A[9]=(E*h-_*X-H*Y)*g,A[10]=(q*Z-V*j+F*b)*g,A[11]=($*j-G*Z-J*b)*g,A[12]=(O*u-N*n-Q*Y)*g,A[13]=(_*n-E*u+I*Y)*g,A[14]=(V*T-q*w-B*b)*g,A[15]=(G*w-$*T+L*b)*g,A}function z8(A,R){var _=R[0],E=R[1],I=R[2],H=R[3],N=R[4],O=R[5],Q=R[6],U=R[7],G=R[8],$=R[9],L=R[10],J=R[11],q=R[12],V=R[13],B=R[14],F=R[15];return A[0]=O*(L*F-J*B)-$*(Q*F-U*B)+V*(Q*J-U*L),A[1]=-(E*(L*F-J*B)-$*(I*F-H*B)+V*(I*J-H*L)),A[2]=E*(Q*F-U*B)-O*(I*F-H*B)+V*(I*U-H*Q),A[3]=-(E*(Q*J-U*L)-O*(I*J-H*L)+$*(I*U-H*Q)),A[4]=-(N*(L*F-J*B)-G*(Q*F-U*B)+q*(Q*J-U*L)),A[5]=_*(L*F-J*B)-G*(I*F-H*B)+q*(I*J-H*L),A[6]=-(_*(Q*F-U*B)-N*(I*F-H*B)+q*(I*U-H*Q)),A[7]=_*(Q*J-U*L)-N*(I*J-H*L)+G*(I*U-H*Q),A[8]=N*($*F-J*V)-G*(O*F-U*V)+q*(O*J-U*$),A[9]=-(_*($*F-J*V)-G*(E*F-H*V)+q*(E*J-H*$)),A[10]=_*(O*F-U*V)-N*(E*F-H*V)+q*(E*U-H*O),A[11]=-(_*(O*J-U*$)-N*(E*J-H*$)+G*(E*U-H*O)),A[12]=-(N*($*B-L*V)-G*(O*B-Q*V)+q*(O*L-Q*$)),A[13]=_*($*B-L*V)-G*(E*B-I*V)+q*(E*L-I*$),A[14]=-(_*(O*B-Q*V)-N*(E*B-I*V)+q*(E*Q-I*O)),A[15]=_*(O*L-Q*$)-N*(E*L-I*$)+G*(E*Q-I*O),A}function v8(A){var R=A[0],_=A[1],E=A[2],I=A[3],H=A[4],N=A[5],O=A[6],Q=A[7],U=A[8],G=A[9],$=A[10],L=A[11],J=A[12],q=A[13],V=A[14],B=A[15],F=R*N-_*H,b=R*O-E*H,T=R*Q-I*H,j=_*O-E*N,w=_*Q-I*N,Z=E*Q-I*O,W=U*q-G*J,Y=U*V-$*J,u=U*B-L*J,h=G*V-$*q,n=G*B-L*q,X=$*B-L*V;return F*X-b*n+T*h+j*u-w*Y+Z*W}function u1(A,R,_){var E=R[0],I=R[1],H=R[2],N=R[3],O=R[4],Q=R[5],U=R[6],G=R[7],$=R[8],L=R[9],J=R[10],q=R[11],V=R[12],B=R[13],F=R[14],b=R[15],T=_[0],j=_[1],w=_[2],Z=_[3];return A[0]=T*E+j*O+w*$+Z*V,A[1]=T*I+j*Q+w*L+Z*B,A[2]=T*H+j*U+w*J+Z*F,A[3]=T*N+j*G+w*q+Z*b,T=_[4],j=_[5],w=_[6],Z=_[7],A[4]=T*E+j*O+w*$+Z*V,A[5]=T*I+j*Q+w*L+Z*B,A[6]=T*H+j*U+w*J+Z*F,A[7]=T*N+j*G+w*q+Z*b,T=_[8],j=_[9],w=_[10],Z=_[11],A[8]=T*E+j*O+w*$+Z*V,A[9]=T*I+j*Q+w*L+Z*B,A[10]=T*H+j*U+w*J+Z*F,A[11]=T*N+j*G+w*q+Z*b,T=_[12],j=_[13],w=_[14],Z=_[15],A[12]=T*E+j*O+w*$+Z*V,A[13]=T*I+j*Q+w*L+Z*B,A[14]=T*H+j*U+w*J+Z*F,A[15]=T*N+j*G+w*q+Z*b,A}function C8(A,R,_){var E=_[0],I=_[1],H=_[2],N,O,Q,U,G,$,L,J,q,V,B,F;if(R===A)A[12]=R[0]*E+R[4]*I+R[8]*H+R[12],A[13]=R[1]*E+R[5]*I+R[9]*H+R[13],A[14]=R[2]*E+R[6]*I+R[10]*H+R[14],A[15]=R[3]*E+R[7]*I+R[11]*H+R[15];else N=R[0],O=R[1],Q=R[2],U=R[3],G=R[4],$=R[5],L=R[6],J=R[7],q=R[8],V=R[9],B=R[10],F=R[11],A[0]=N,A[1]=O,A[2]=Q,A[3]=U,A[4]=G,A[5]=$,A[6]=L,A[7]=J,A[8]=q,A[9]=V,A[10]=B,A[11]=F,A[12]=N*E+G*I+q*H+R[12],A[13]=O*E+$*I+V*H+R[13],A[14]=Q*E+L*I+B*H+R[14],A[15]=U*E+J*I+F*H+R[15];return A}function r8(A,R,_){var E=_[0],I=_[1],H=_[2];return A[0]=R[0]*E,A[1]=R[1]*E,A[2]=R[2]*E,A[3]=R[3]*E,A[4]=R[4]*I,A[5]=R[5]*I,A[6]=R[6]*I,A[7]=R[7]*I,A[8]=R[8]*H,A[9]=R[9]*H,A[10]=R[10]*H,A[11]=R[11]*H,A[12]=R[12],A[13]=R[13],A[14]=R[14],A[15]=R[15],A}function p8(A,R,_,E){var I=E[0],H=E[1],N=E[2],O=Math.hypot(I,H,N),Q,U,G,$,L,J,q,V,B,F,b,T,j,w,Z,W,Y,u,h,n,X,f,g,v;if(O<F0)return null;if(O=1/O,I*=O,H*=O,N*=O,Q=Math.sin(_),U=Math.cos(_),G=1-U,$=R[0],L=R[1],J=R[2],q=R[3],V=R[4],B=R[5],F=R[6],b=R[7],T=R[8],j=R[9],w=R[10],Z=R[11],W=I*I*G+U,Y=H*I*G+N*Q,u=N*I*G-H*Q,h=I*H*G-N*Q,n=H*H*G+U,X=N*H*G+I*Q,f=I*N*G+H*Q,g=H*N*G-I*Q,v=N*N*G+U,A[0]=$*W+V*Y+T*u,A[1]=L*W+B*Y+j*u,A[2]=J*W+F*Y+w*u,A[3]=q*W+b*Y+Z*u,A[4]=$*h+V*n+T*X,A[5]=L*h+B*n+j*X,A[6]=J*h+F*n+w*X,A[7]=q*h+b*n+Z*X,A[8]=$*f+V*g+T*v,A[9]=L*f+B*g+j*v,A[10]=J*f+F*g+w*v,A[11]=q*f+b*g+Z*v,R!==A)A[12]=R[12],A[13]=R[13],A[14]=R[14],A[15]=R[15];return A}function i8(A,R,_){var E=Math.sin(_),I=Math.cos(_),H=R[4],N=R[5],O=R[6],Q=R[7],U=R[8],G=R[9],$=R[10],L=R[11];if(R!==A)A[0]=R[0],A[1]=R[1],A[2]=R[2],A[3]=R[3],A[12]=R[12],A[13]=R[13],A[14]=R[14],A[15]=R[15];return A[4]=H*I+U*E,A[5]=N*I+G*E,A[6]=O*I+$*E,A[7]=Q*I+L*E,A[8]=U*I-H*E,A[9]=G*I-N*E,A[10]=$*I-O*E,A[11]=L*I-Q*E,A}function x8(A,R,_){var E=Math.sin(_),I=Math.cos(_),H=R[0],N=R[1],O=R[2],Q=R[3],U=R[8],G=R[9],$=R[10],L=R[11];if(R!==A)A[4]=R[4],A[5]=R[5],A[6]=R[6],A[7]=R[7],A[12]=R[12],A[13]=R[13],A[14]=R[14],A[15]=R[15];return A[0]=H*I-U*E,A[1]=N*I-G*E,A[2]=O*I-$*E,A[3]=Q*I-L*E,A[8]=H*E+U*I,A[9]=N*E+G*I,A[10]=O*E+$*I,A[11]=Q*E+L*I,A}function y8(A,R,_){var E=Math.sin(_),I=Math.cos(_),H=R[0],N=R[1],O=R[2],Q=R[3],U=R[4],G=R[5],$=R[6],L=R[7];if(R!==A)A[8]=R[8],A[9]=R[9],A[10]=R[10],A[11]=R[11],A[12]=R[12],A[13]=R[13],A[14]=R[14],A[15]=R[15];return A[0]=H*I+U*E,A[1]=N*I+G*E,A[2]=O*I+$*E,A[3]=Q*I+L*E,A[4]=U*I-H*E,A[5]=G*I-N*E,A[6]=$*I-O*E,A[7]=L*I-Q*E,A}function c8(A,R){return A[0]=1,A[1]=0,A[2]=0,A[3]=0,A[4]=0,A[5]=1,A[6]=0,A[7]=0,A[8]=0,A[9]=0,A[10]=1,A[11]=0,A[12]=R[0],A[13]=R[1],A[14]=R[2],A[15]=1,A}function a8(A,R){return A[0]=R[0],A[1]=0,A[2]=0,A[3]=0,A[4]=0,A[5]=R[1],A[6]=0,A[7]=0,A[8]=0,A[9]=0,A[10]=R[2],A[11]=0,A[12]=0,A[13]=0,A[14]=0,A[15]=1,A}function d8(A,R,_){var E=_[0],I=_[1],H=_[2],N=Math.hypot(E,I,H),O,Q,U;if(N<F0)return null;return N=1/N,E*=N,I*=N,H*=N,O=Math.sin(R),Q=Math.cos(R),U=1-Q,A[0]=E*E*U+Q,A[1]=I*E*U+H*O,A[2]=H*E*U-I*O,A[3]=0,A[4]=E*I*U-H*O,A[5]=I*I*U+Q,A[6]=H*I*U+E*O,A[7]=0,A[8]=E*H*U+I*O,A[9]=I*H*U-E*O,A[10]=H*H*U+Q,A[11]=0,A[12]=0,A[13]=0,A[14]=0,A[15]=1,A}function t8(A,R){var _=Math.sin(R),E=Math.cos(R);return A[0]=1,A[1]=0,A[2]=0,A[3]=0,A[4]=0,A[5]=E,A[6]=_,A[7]=0,A[8]=0,A[9]=-_,A[10]=E,A[11]=0,A[12]=0,A[13]=0,A[14]=0,A[15]=1,A}function l8(A,R){var _=Math.sin(R),E=Math.cos(R);return A[0]=E,A[1]=0,A[2]=-_,A[3]=0,A[4]=0,A[5]=1,A[6]=0,A[7]=0,A[8]=_,A[9]=0,A[10]=E,A[11]=0,A[12]=0,A[13]=0,A[14]=0,A[15]=1,A}function o8(A,R){var _=Math.sin(R),E=Math.cos(R);return A[0]=E,A[1]=_,A[2]=0,A[3]=0,A[4]=-_,A[5]=E,A[6]=0,A[7]=0,A[8]=0,A[9]=0,A[10]=1,A[11]=0,A[12]=0,A[13]=0,A[14]=0,A[15]=1,A}function W1(A,R,_){var E=R[0],I=R[1],H=R[2],N=R[3],O=E+E,Q=I+I,U=H+H,G=E*O,$=E*Q,L=E*U,J=I*Q,q=I*U,V=H*U,B=N*O,F=N*Q,b=N*U;return A[0]=1-(J+V),A[1]=$+b,A[2]=L-F,A[3]=0,A[4]=$-b,A[5]=1-(G+V),A[6]=q+B,A[7]=0,A[8]=L+F,A[9]=q-B,A[10]=1-(G+J),A[11]=0,A[12]=_[0],A[13]=_[1],A[14]=_[2],A[15]=1,A}function e8(A,R){var _=new g0(3),E=-R[0],I=-R[1],H=-R[2],N=R[3],O=R[4],Q=R[5],U=R[6],G=R[7],$=E*E+I*I+H*H+N*N;if($>0)_[0]=(O*N+G*E+Q*H-U*I)*2/$,_[1]=(Q*N+G*I+U*E-O*H)*2/$,_[2]=(U*N+G*H+O*I-Q*E)*2/$;else _[0]=(O*N+G*E+Q*H-U*I)*2,_[1]=(Q*N+G*I+U*E-O*H)*2,_[2]=(U*N+G*H+O*I-Q*E)*2;return W1(A,R,_),A}function AA(A,R){return A[0]=R[12],A[1]=R[13],A[2]=R[14],A}function g1(A,R){var _=R[0],E=R[1],I=R[2],H=R[4],N=R[5],O=R[6],Q=R[8],U=R[9],G=R[10];return A[0]=Math.hypot(_,E,I),A[1]=Math.hypot(H,N,O),A[2]=Math.hypot(Q,U,G),A}function RA(A,R){var _=new g0(3);g1(_,R);var E=1/_[0],I=1/_[1],H=1/_[2],N=R[0]*E,O=R[1]*I,Q=R[2]*H,U=R[4]*E,G=R[5]*I,$=R[6]*H,L=R[8]*E,J=R[9]*I,q=R[10]*H,V=N+G+q,B=0;if(V>0)B=Math.sqrt(V+1)*2,A[3]=0.25*B,A[0]=($-J)/B,A[1]=(L-Q)/B,A[2]=(O-U)/B;else if(N>G&&N>q)B=Math.sqrt(1+N-G-q)*2,A[3]=($-J)/B,A[0]=0.25*B,A[1]=(O+U)/B,A[2]=(L+Q)/B;else if(G>q)B=Math.sqrt(1+G-N-q)*2,A[3]=(L-Q)/B,A[0]=(O+U)/B,A[1]=0.25*B,A[2]=($+J)/B;else B=Math.sqrt(1+q-N-G)*2,A[3]=(O-U)/B,A[0]=(L+Q)/B,A[1]=($+J)/B,A[2]=0.25*B;return A}function _A(A,R,_,E){var I=R[0],H=R[1],N=R[2],O=R[3],Q=I+I,U=H+H,G=N+N,$=I*Q,L=I*U,J=I*G,q=H*U,V=H*G,B=N*G,F=O*Q,b=O*U,T=O*G,j=E[0],w=E[1],Z=E[2];return A[0]=(1-(q+B))*j,A[1]=(L+T)*j,A[2]=(J-b)*j,A[3]=0,A[4]=(L-T)*w,A[5]=(1-($+B))*w,A[6]=(V+F)*w,A[7]=0,A[8]=(J+b)*Z,A[9]=(V-F)*Z,A[10]=(1-($+q))*Z,A[11]=0,A[12]=_[0],A[13]=_[1],A[14]=_[2],A[15]=1,A}function EA(A,R,_,E,I){var H=R[0],N=R[1],O=R[2],Q=R[3],U=H+H,G=N+N,$=O+O,L=H*U,J=H*G,q=H*$,V=N*G,B=N*$,F=O*$,b=Q*U,T=Q*G,j=Q*$,w=E[0],Z=E[1],W=E[2],Y=I[0],u=I[1],h=I[2],n=(1-(V+F))*w,X=(J+j)*w,f=(q-T)*w,g=(J-j)*Z,v=(1-(L+F))*Z,M=(B+b)*Z,x=(q+T)*W,y=(B-b)*W,d=(1-(L+V))*W;return A[0]=n,A[1]=X,A[2]=f,A[3]=0,A[4]=g,A[5]=v,A[6]=M,A[7]=0,A[8]=x,A[9]=y,A[10]=d,A[11]=0,A[12]=_[0]+Y-(n*Y+g*u+x*h),A[13]=_[1]+u-(X*Y+v*u+y*h),A[14]=_[2]+h-(f*Y+M*u+d*h),A[15]=1,A}function IA(A,R){var _=R[0],E=R[1],I=R[2],H=R[3],N=_+_,O=E+E,Q=I+I,U=_*N,G=E*N,$=E*O,L=I*N,J=I*O,q=I*Q,V=H*N,B=H*O,F=H*Q;return A[0]=1-$-q,A[1]=G+F,A[2]=L-B,A[3]=0,A[4]=G-F,A[5]=1-U-q,A[6]=J+V,A[7]=0,A[8]=L+B,A[9]=J-V,A[10]=1-U-$,A[11]=0,A[12]=0,A[13]=0,A[14]=0,A[15]=1,A}function HA(A,R,_,E,I,H,N){var O=1/(_-R),Q=1/(I-E),U=1/(H-N);return A[0]=H*2*O,A[1]=0,A[2]=0,A[3]=0,A[4]=0,A[5]=H*2*Q,A[6]=0,A[7]=0,A[8]=(_+R)*O,A[9]=(I+E)*Q,A[10]=(N+H)*U,A[11]=-1,A[12]=0,A[13]=0,A[14]=N*H*2*U,A[15]=0,A}function M1(A,R,_,E,I){var H=1/Math.tan(R/2),N;if(A[0]=H/_,A[1]=0,A[2]=0,A[3]=0,A[4]=0,A[5]=H,A[6]=0,A[7]=0,A[8]=0,A[9]=0,A[11]=-1,A[12]=0,A[13]=0,A[15]=0,I!=null&&I!==1/0)N=1/(E-I),A[10]=(I+E)*N,A[14]=2*I*E*N;else A[10]=-1,A[14]=-2*E;return A}var NA=M1;function OA(A,R,_,E,I){var H=1/Math.tan(R/2),N;if(A[0]=H/_,A[1]=0,A[2]=0,A[3]=0,A[4]=0,A[5]=H,A[6]=0,A[7]=0,A[8]=0,A[9]=0,A[11]=-1,A[12]=0,A[13]=0,A[15]=0,I!=null&&I!==1/0)N=1/(E-I),A[10]=I*N,A[14]=I*E*N;else A[10]=-1,A[14]=-E;return A}function QA(A,R,_,E){var I=Math.tan(R.upDegrees*Math.PI/180),H=Math.tan(R.downDegrees*Math.PI/180),N=Math.tan(R.leftDegrees*Math.PI/180),O=Math.tan(R.rightDegrees*Math.PI/180),Q=2/(N+O),U=2/(I+H);return A[0]=Q,A[1]=0,A[2]=0,A[3]=0,A[4]=0,A[5]=U,A[6]=0,A[7]=0,A[8]=-((N-O)*Q*0.5),A[9]=(I-H)*U*0.5,A[10]=E/(_-E),A[11]=-1,A[12]=0,A[13]=0,A[14]=E*_/(_-E),A[15]=0,A}function P1(A,R,_,E,I,H,N){var O=1/(R-_),Q=1/(E-I),U=1/(H-N);return A[0]=-2*O,A[1]=0,A[2]=0,A[3]=0,A[4]=0,A[5]=-2*Q,A[6]=0,A[7]=0,A[8]=0,A[9]=0,A[10]=2*U,A[11]=0,A[12]=(R+_)*O,A[13]=(I+E)*Q,A[14]=(N+H)*U,A[15]=1,A}var UA=P1;function GA(A,R,_,E,I,H,N){var O=1/(R-_),Q=1/(E-I),U=1/(H-N);return A[0]=-2*O,A[1]=0,A[2]=0,A[3]=0,A[4]=0,A[5]=-2*Q,A[6]=0,A[7]=0,A[8]=0,A[9]=0,A[10]=U,A[11]=0,A[12]=(R+_)*O,A[13]=(I+E)*Q,A[14]=H*U,A[15]=1,A}function $A(A,R,_,E){var I,H,N,O,Q,U,G,$,L,J,q=R[0],V=R[1],B=R[2],F=E[0],b=E[1],T=E[2],j=_[0],w=_[1],Z=_[2];if(Math.abs(q-j)<F0&&Math.abs(V-w)<F0&&Math.abs(B-Z)<F0)return n1(A);if(G=q-j,$=V-w,L=B-Z,J=1/Math.hypot(G,$,L),G*=J,$*=J,L*=J,I=b*L-T*$,H=T*G-F*L,N=F*$-b*G,J=Math.hypot(I,H,N),!J)I=0,H=0,N=0;else J=1/J,I*=J,H*=J,N*=J;if(O=$*N-L*H,Q=L*I-G*N,U=G*H-$*I,J=Math.hypot(O,Q,U),!J)O=0,Q=0,U=0;else J=1/J,O*=J,Q*=J,U*=J;return A[0]=I,A[1]=O,A[2]=G,A[3]=0,A[4]=H,A[5]=Q,A[6]=$,A[7]=0,A[8]=N,A[9]=U,A[10]=L,A[11]=0,A[12]=-(I*q+H*V+N*B),A[13]=-(O*q+Q*V+U*B),A[14]=-(G*q+$*V+L*B),A[15]=1,A}function JA(A,R,_,E){var I=R[0],H=R[1],N=R[2],O=E[0],Q=E[1],U=E[2],G=I-_[0],$=H-_[1],L=N-_[2],J=G*G+$*$+L*L;if(J>0)J=1/Math.sqrt(J),G*=J,$*=J,L*=J;var q=Q*L-U*$,V=U*G-O*L,B=O*$-Q*G;if(J=q*q+V*V+B*B,J>0)J=1/Math.sqrt(J),q*=J,V*=J,B*=J;return A[0]=q,A[1]=V,A[2]=B,A[3]=0,A[4]=$*B-L*V,A[5]=L*q-G*B,A[6]=G*V-$*q,A[7]=0,A[8]=G,A[9]=$,A[10]=L,A[11]=0,A[12]=I,A[13]=H,A[14]=N,A[15]=1,A}function LA(A){return"mat4("+A[0]+", "+A[1]+", "+A[2]+", "+A[3]+", "+A[4]+", "+A[5]+", "+A[6]+", "+A[7]+", "+A[8]+", "+A[9]+", "+A[10]+", "+A[11]+", "+A[12]+", "+A[13]+", "+A[14]+", "+A[15]+")"}function qA(A){return Math.hypot(A[0],A[1],A[2],A[3],A[4],A[5],A[6],A[7],A[8],A[9],A[10],A[11],A[12],A[13],A[14],A[15])}function BA(A,R,_){return A[0]=R[0]+_[0],A[1]=R[1]+_[1],A[2]=R[2]+_[2],A[3]=R[3]+_[3],A[4]=R[4]+_[4],A[5]=R[5]+_[5],A[6]=R[6]+_[6],A[7]=R[7]+_[7],A[8]=R[8]+_[8],A[9]=R[9]+_[9],A[10]=R[10]+_[10],A[11]=R[11]+_[11],A[12]=R[12]+_[12],A[13]=R[13]+_[13],A[14]=R[14]+_[14],A[15]=R[15]+_[15],A}function D1(A,R,_){return A[0]=R[0]-_[0],A[1]=R[1]-_[1],A[2]=R[2]-_[2],A[3]=R[3]-_[3],A[4]=R[4]-_[4],A[5]=R[5]-_[5],A[6]=R[6]-_[6],A[7]=R[7]-_[7],A[8]=R[8]-_[8],A[9]=R[9]-_[9],A[10]=R[10]-_[10],A[11]=R[11]-_[11],A[12]=R[12]-_[12],A[13]=R[13]-_[13],A[14]=R[14]-_[14],A[15]=R[15]-_[15],A}function KA(A,R,_){return A[0]=R[0]*_,A[1]=R[1]*_,A[2]=R[2]*_,A[3]=R[3]*_,A[4]=R[4]*_,A[5]=R[5]*_,A[6]=R[6]*_,A[7]=R[7]*_,A[8]=R[8]*_,A[9]=R[9]*_,A[10]=R[10]*_,A[11]=R[11]*_,A[12]=R[12]*_,A[13]=R[13]*_,A[14]=R[14]*_,A[15]=R[15]*_,A}function FA(A,R,_,E){return A[0]=R[0]+_[0]*E,A[1]=R[1]+_[1]*E,A[2]=R[2]+_[2]*E,A[3]=R[3]+_[3]*E,A[4]=R[4]+_[4]*E,A[5]=R[5]+_[5]*E,A[6]=R[6]+_[6]*E,A[7]=R[7]+_[7]*E,A[8]=R[8]+_[8]*E,A[9]=R[9]+_[9]*E,A[10]=R[10]+_[10]*E,A[11]=R[11]+_[11]*E,A[12]=R[12]+_[12]*E,A[13]=R[13]+_[13]*E,A[14]=R[14]+_[14]*E,A[15]=R[15]+_[15]*E,A}function VA(A,R){return A[0]===R[0]&&A[1]===R[1]&&A[2]===R[2]&&A[3]===R[3]&&A[4]===R[4]&&A[5]===R[5]&&A[6]===R[6]&&A[7]===R[7]&&A[8]===R[8]&&A[9]===R[9]&&A[10]===R[10]&&A[11]===R[11]&&A[12]===R[12]&&A[13]===R[13]&&A[14]===R[14]&&A[15]===R[15]}function kA(A,R){var _=A[0],E=A[1],I=A[2],H=A[3],N=A[4],O=A[5],Q=A[6],U=A[7],G=A[8],$=A[9],L=A[10],J=A[11],q=A[12],V=A[13],B=A[14],F=A[15],b=R[0],T=R[1],j=R[2],w=R[3],Z=R[4],W=R[5],Y=R[6],u=R[7],h=R[8],n=R[9],X=R[10],f=R[11],g=R[12],v=R[13],M=R[14],x=R[15];return Math.abs(_-b)<=F0*Math.max(1,Math.abs(_),Math.abs(b))&&Math.abs(E-T)<=F0*Math.max(1,Math.abs(E),Math.abs(T))&&Math.abs(I-j)<=F0*Math.max(1,Math.abs(I),Math.abs(j))&&Math.abs(H-w)<=F0*Math.max(1,Math.abs(H),Math.abs(w))&&Math.abs(N-Z)<=F0*Math.max(1,Math.abs(N),Math.abs(Z))&&Math.abs(O-W)<=F0*Math.max(1,Math.abs(O),Math.abs(W))&&Math.abs(Q-Y)<=F0*Math.max(1,Math.abs(Q),Math.abs(Y))&&Math.abs(U-u)<=F0*Math.max(1,Math.abs(U),Math.abs(u))&&Math.abs(G-h)<=F0*Math.max(1,Math.abs(G),Math.abs(h))&&Math.abs($-n)<=F0*Math.max(1,Math.abs($),Math.abs(n))&&Math.abs(L-X)<=F0*Math.max(1,Math.abs(L),Math.abs(X))&&Math.abs(J-f)<=F0*Math.max(1,Math.abs(J),Math.abs(f))&&Math.abs(q-g)<=F0*Math.max(1,Math.abs(q),Math.abs(g))&&Math.abs(V-v)<=F0*Math.max(1,Math.abs(V),Math.abs(v))&&Math.abs(B-M)<=F0*Math.max(1,Math.abs(B),Math.abs(M))&&Math.abs(F-x)<=F0*Math.max(1,Math.abs(F),Math.abs(x))}var SA=u1,bA=D1;var s6={};j1(s6,{zero:()=>dA,transformQuat:()=>iA,transformMat4:()=>rA,transformMat3:()=>pA,subtract:()=>v1,sub:()=>eA,str:()=>tA,squaredLength:()=>x1,squaredDistance:()=>i1,sqrLen:()=>H7,sqrDist:()=>E7,set:()=>YA,scaleAndAdd:()=>WA,scale:()=>uA,round:()=>nA,rotateZ:()=>cA,rotateY:()=>yA,rotateX:()=>xA,random:()=>CA,normalize:()=>PA,negate:()=>gA,multiply:()=>C1,mul:()=>A7,min:()=>hA,max:()=>fA,lerp:()=>sA,length:()=>z1,len:()=>I7,inverse:()=>MA,hermite:()=>zA,fromValues:()=>jA,forEach:()=>N7,floor:()=>ZA,exactEquals:()=>lA,equals:()=>oA,dot:()=>y1,divide:()=>r1,div:()=>R7,distance:()=>p1,dist:()=>_7,cross:()=>DA,create:()=>s1,copy:()=>wA,clone:()=>TA,ceil:()=>XA,bezier:()=>vA,angle:()=>aA,add:()=>mA});function s1(){var A=new g0(3);if(g0!=Float32Array)A[0]=0,A[1]=0,A[2]=0;return A}function TA(A){var R=new g0(3);return R[0]=A[0],R[1]=A[1],R[2]=A[2],R}function z1(A){var R=A[0],_=A[1],E=A[2];return Math.hypot(R,_,E)}function jA(A,R,_){var E=new g0(3);return E[0]=A,E[1]=R,E[2]=_,E}function wA(A,R){return A[0]=R[0],A[1]=R[1],A[2]=R[2],A}function YA(A,R,_,E){return A[0]=R,A[1]=_,A[2]=E,A}function mA(A,R,_){return A[0]=R[0]+_[0],A[1]=R[1]+_[1],A[2]=R[2]+_[2],A}function v1(A,R,_){return A[0]=R[0]-_[0],A[1]=R[1]-_[1],A[2]=R[2]-_[2],A}function C1(A,R,_){return A[0]=R[0]*_[0],A[1]=R[1]*_[1],A[2]=R[2]*_[2],A}function r1(A,R,_){return A[0]=R[0]/_[0],A[1]=R[1]/_[1],A[2]=R[2]/_[2],A}function XA(A,R){return A[0]=Math.ceil(R[0]),A[1]=Math.ceil(R[1]),A[2]=Math.ceil(R[2]),A}function ZA(A,R){return A[0]=Math.floor(R[0]),A[1]=Math.floor(R[1]),A[2]=Math.floor(R[2]),A}function hA(A,R,_){return A[0]=Math.min(R[0],_[0]),A[1]=Math.min(R[1],_[1]),A[2]=Math.min(R[2],_[2]),A}function fA(A,R,_){return A[0]=Math.max(R[0],_[0]),A[1]=Math.max(R[1],_[1]),A[2]=Math.max(R[2],_[2]),A}function nA(A,R){return A[0]=Math.round(R[0]),A[1]=Math.round(R[1]),A[2]=Math.round(R[2]),A}function uA(A,R,_){return A[0]=R[0]*_,A[1]=R[1]*_,A[2]=R[2]*_,A}function WA(A,R,_,E){return A[0]=R[0]+_[0]*E,A[1]=R[1]+_[1]*E,A[2]=R[2]+_[2]*E,A}function p1(A,R){var _=R[0]-A[0],E=R[1]-A[1],I=R[2]-A[2];return Math.hypot(_,E,I)}function i1(A,R){var _=R[0]-A[0],E=R[1]-A[1],I=R[2]-A[2];return _*_+E*E+I*I}function x1(A){var R=A[0],_=A[1],E=A[2];return R*R+_*_+E*E}function gA(A,R){return A[0]=-R[0],A[1]=-R[1],A[2]=-R[2],A}function MA(A,R){return A[0]=1/R[0],A[1]=1/R[1],A[2]=1/R[2],A}function PA(A,R){var _=R[0],E=R[1],I=R[2],H=_*_+E*E+I*I;if(H>0)H=1/Math.sqrt(H);return A[0]=R[0]*H,A[1]=R[1]*H,A[2]=R[2]*H,A}function y1(A,R){return A[0]*R[0]+A[1]*R[1]+A[2]*R[2]}function DA(A,R,_){var E=R[0],I=R[1],H=R[2],N=_[0],O=_[1],Q=_[2];return A[0]=I*Q-H*O,A[1]=H*N-E*Q,A[2]=E*O-I*N,A}function sA(A,R,_,E){var I=R[0],H=R[1],N=R[2];return A[0]=I+E*(_[0]-I),A[1]=H+E*(_[1]-H),A[2]=N+E*(_[2]-N),A}function zA(A,R,_,E,I,H){var N=H*H,O=N*(2*H-3)+1,Q=N*(H-2)+H,U=N*(H-1),G=N*(3-2*H);return A[0]=R[0]*O+_[0]*Q+E[0]*U+I[0]*G,A[1]=R[1]*O+_[1]*Q+E[1]*U+I[1]*G,A[2]=R[2]*O+_[2]*Q+E[2]*U+I[2]*G,A}function vA(A,R,_,E,I,H){var N=1-H,O=N*N,Q=H*H,U=O*N,G=3*H*O,$=3*Q*N,L=Q*H;return A[0]=R[0]*U+_[0]*G+E[0]*$+I[0]*L,A[1]=R[1]*U+_[1]*G+E[1]*$+I[1]*L,A[2]=R[2]*U+_[2]*G+E[2]*$+I[2]*L,A}function CA(A,R){R=R||1;var _=Q1()*2*Math.PI,E=Q1()*2-1,I=Math.sqrt(1-E*E)*R;return A[0]=Math.cos(_)*I,A[1]=Math.sin(_)*I,A[2]=E*R,A}function rA(A,R,_){var E=R[0],I=R[1],H=R[2],N=_[3]*E+_[7]*I+_[11]*H+_[15];return N=N||1,A[0]=(_[0]*E+_[4]*I+_[8]*H+_[12])/N,A[1]=(_[1]*E+_[5]*I+_[9]*H+_[13])/N,A[2]=(_[2]*E+_[6]*I+_[10]*H+_[14])/N,A}function pA(A,R,_){var E=R[0],I=R[1],H=R[2];return A[0]=E*_[0]+I*_[3]+H*_[6],A[1]=E*_[1]+I*_[4]+H*_[7],A[2]=E*_[2]+I*_[5]+H*_[8],A}function iA(A,R,_){var E=_[0],I=_[1],H=_[2],N=_[3],O=R[0],Q=R[1],U=R[2],G=I*U-H*Q,$=H*O-E*U,L=E*Q-I*O,J=I*L-H*$,q=H*G-E*L,V=E*$-I*G,B=N*2;return G*=B,$*=B,L*=B,J*=2,q*=2,V*=2,A[0]=O+G+J,A[1]=Q+$+q,A[2]=U+L+V,A}function xA(A,R,_,E){var I=[],H=[];return I[0]=R[0]-_[0],I[1]=R[1]-_[1],I[2]=R[2]-_[2],H[0]=I[0],H[1]=I[1]*Math.cos(E)-I[2]*Math.sin(E),H[2]=I[1]*Math.sin(E)+I[2]*Math.cos(E),A[0]=H[0]+_[0],A[1]=H[1]+_[1],A[2]=H[2]+_[2],A}function yA(A,R,_,E){var I=[],H=[];return I[0]=R[0]-_[0],I[1]=R[1]-_[1],I[2]=R[2]-_[2],H[0]=I[2]*Math.sin(E)+I[0]*Math.cos(E),H[1]=I[1],H[2]=I[2]*Math.cos(E)-I[0]*Math.sin(E),A[0]=H[0]+_[0],A[1]=H[1]+_[1],A[2]=H[2]+_[2],A}function cA(A,R,_,E){var I=[],H=[];return I[0]=R[0]-_[0],I[1]=R[1]-_[1],I[2]=R[2]-_[2],H[0]=I[0]*Math.cos(E)-I[1]*Math.sin(E),H[1]=I[0]*Math.sin(E)+I[1]*Math.cos(E),H[2]=I[2],A[0]=H[0]+_[0],A[1]=H[1]+_[1],A[2]=H[2]+_[2],A}function aA(A,R){var _=A[0],E=A[1],I=A[2],H=R[0],N=R[1],O=R[2],Q=Math.sqrt(_*_+E*E+I*I),U=Math.sqrt(H*H+N*N+O*O),G=Q*U,$=G&&y1(A,R)/G;return Math.acos(Math.min(Math.max($,-1),1))}function dA(A){return A[0]=0,A[1]=0,A[2]=0,A}function tA(A){return"vec3("+A[0]+", "+A[1]+", "+A[2]+")"}function lA(A,R){return A[0]===R[0]&&A[1]===R[1]&&A[2]===R[2]}function oA(A,R){var _=A[0],E=A[1],I=A[2],H=R[0],N=R[1],O=R[2];return Math.abs(_-H)<=F0*Math.max(1,Math.abs(_),Math.abs(H))&&Math.abs(E-N)<=F0*Math.max(1,Math.abs(E),Math.abs(N))&&Math.abs(I-O)<=F0*Math.max(1,Math.abs(I),Math.abs(O))}var eA=v1,A7=C1,R7=r1,_7=p1,E7=i1,I7=z1,H7=x1,N7=function(){var A=s1();return function(R,_,E,I,H,N){var O,Q;if(!_)_=3;if(!E)E=0;if(I)Q=Math.min(I*_+E,R.length);else Q=R.length;for(O=E;O<Q;O+=_)A[0]=R[O],A[1]=R[O+1],A[2]=R[O+2],H(A,A,N),R[O]=A[0],R[O+1]=A[1],R[O+2]=A[2];return R}}();class q6{ctx;constructor(A){this.ctx=A}}class h0 extends q6{shader;constructor(A,R,_){super(A);let E=A.createShader(R);if(A.shaderSource(E,_),A.compileShader(E),!A.getShaderParameter(E,A.COMPILE_STATUS)){let H=A.getShaderInfoLog(E);throw A.deleteShader(E),Error(`Failed to compile WebGL shader:
${H}`)}this.shader=E}delete(){this.ctx.deleteShader(this.shader)}}function i0(A,R){let _=new c1(A);for(let E of R)_.attach(E);_.link();for(let E of R)E.delete();return _}class c1 extends q6{program;constructor(A){super(A);this.program=A.createProgram()}attach(A){this.ctx.attachShader(this.program,A.shader)}link(){let A=this.ctx;if(A.linkProgram(this.program),!A.getProgramParameter(this.program,A.LINK_STATUS)){let _=A.getProgramInfoLog(this.program);throw this.delete(),new Error(`Failed to link shader program: ${_}`)}}use(){this.ctx.useProgram(this.program)}delete(){this.ctx.deleteProgram(this.program)}}var B6=(A,R,_)=>Math.min(Math.max(A,R),_);function a1(A){return 1024-Math.round(A/0.015625)}class D0{static STRIDE=12;data;view;pos=0;constructor(A){this.data=new Uint8Array(A*D0.STRIDE),this.view=new DataView(this.data.buffer,this.data.byteOffset,this.data.byteLength)}growIfRequired(A){let R=this.pos+A*D0.STRIDE;if(this.data.byteLength<R){let _=new Uint8Array(R*2);_.set(this.data),this.data=_,this.view=new DataView(this.data.buffer,this.data.byteOffset,this.data.byteLength)}}addVertex(A,R,_,E,I,H,N,O){this.growIfRequired(1);let Q=this.pos/D0.STRIDE,U=B6(A+131072,0,262143),G=B6(-R+2048,0,4095),$=B6(_+131072,0,262143),L=H!==-1,J=L?1:0,q=E&65535;if(L)q&=127,q|=H<<7;let V=B6(a1(N),0,2047),B=B6(a1(O),0,2047),F=J<<30|G<<18|U,b=q>>2<<18|$,T=(q&3)<<30|I<<22|V<<11|B;return this.view.setUint32(this.pos,F,!0),this.view.setUint32(this.pos+4,b,!0),this.view.setUint32(this.pos+8,T,!0),this.pos+=D0.STRIDE,Q}addData(A){this.growIfRequired(A.length/D0.STRIDE),this.data.set(A,this.pos),this.pos+=A.length}}class d1{indices;pos=0;constructor(A){this.indices=new Int32Array(A)}growIfRequired(A){let R=this.pos+A;if(this.indices.length<R){let _=new Int32Array(R*2);_.set(this.indices),this.indices=_}}addIndices(...A){this.growIfRequired(A.length);for(let R of A)this.indices[this.pos++]=R}}class t1{positions;yaws;offsets;counts;count=0;constructor(A){this.positions=new Int32Array(A*3),this.yaws=new Int32Array(A),this.offsets=new Int32Array(A),this.counts=new Int32Array(A)}reset(){this.count=0}reduce(){let A=this.count;for(let R=0;R<A;R++){let _=this.positions[R*3],E=this.positions[R*3+1],I=this.positions[R*3+2],H=this.yaws[R],N=this.offsets[R];if(this.counts[R]===0)continue;for(let Q=R+1;Q<A;Q++)if(this.positions[Q*3]===_&&this.positions[Q*3+1]===E&&this.positions[Q*3+2]===I&&this.yaws[Q]===H&&N+this.counts[R]===this.offsets[Q])this.counts[R]+=this.counts[Q],this.counts[Q]=0;else break}}addCommand(A,R,_,E,I,H){if(H===0)return;if(this.count>=this.yaws.length){let N=new Int32Array(this.count*3*2),O=new Int32Array(this.count*2),Q=new Int32Array(this.count*2),U=new Int32Array(this.count*2);N.set(this.positions),O.set(this.yaws),Q.set(this.offsets),U.set(this.counts),this.positions=N,this.yaws=O,this.offsets=Q,this.counts=U}this.positions[this.count*3]=A,this.positions[this.count*3+1]=R,this.positions[this.count*3+2]=_,this.yaws[this.count]=E,this.offsets[this.count]=I,this.counts[this.count]=H,this.count++}}var O7=`
#version 300 es

out vec2 v_texCoord;

const vec2 vertices[3] = vec2[3](
    vec2(-1,-1), 
    vec2(3,-1), 
    vec2(-1, 3)
);

void main() {
    gl_Position = vec4(vertices[gl_VertexID], 0.0, 1.0);
    v_texCoord = gl_Position.xy * 0.5 + 0.5;
}
`.trim(),Q7=`
#version 300 es

precision highp float;

uniform highp sampler2D u_frame;

in vec2 v_texCoord;

out vec4 fragColor;

void main() {
    fragColor = texture(u_frame, v_texCoord);
}
`.trim(),U7=`
#version 300 es

out vec2 v_texCoord;

const vec2 vertices[3] = vec2[3](
    vec2(-1,-1), 
    vec2(3,-1), 
    vec2(-1, 3)
);

void main() {
    gl_Position = vec4(vertices[gl_VertexID], 0.0, 1.0);
    v_texCoord = gl_Position.xy * 0.5 + 0.5;
    // flip y
    v_texCoord.y = 1.0 - v_texCoord.y;
}
`.trim(),G7=`
#version 300 es

precision highp float;

uniform highp sampler2D u_frame;

in vec2 v_texCoord;

out vec4 fragColor;

void main() {
    fragColor = texture(u_frame, v_texCoord).bgra;
    fragColor.a = fragColor == vec4(1.0) ? 0.0 : 1.0;
}
`.trim(),l1=`
vec3 hslToRgb(int hsl, float brightness) {
    const float onethird = 1.0 / 3.0;
    const float twothird = 2.0 / 3.0;
    const float rcpsixth = 6.0;

    float hue = float(hsl >> 10) / 64.0 + 0.0078125;
    float sat = float((hsl >> 7) & 0x7) / 8.0 + 0.0625;
    float lum = (float(hsl & 0x7f) / 128.0);

    vec3 xt = vec3(
        rcpsixth * (hue - twothird),
        0.0,
        rcpsixth * (1.0 - hue)
    );

    if (hue < twothird) {
        xt.r = 0.0;
        xt.g = rcpsixth * (twothird - hue);
        xt.b = rcpsixth * (hue      - onethird);
    }

    if (hue < onethird) {
        xt.r = rcpsixth * (onethird - hue);
        xt.g = rcpsixth * hue;
        xt.b = 0.0;
    }

    xt = min( xt, 1.0 );

    float sat2   =  2.0 * sat;
    float satinv =  1.0 - sat;
    float luminv =  1.0 - lum;
    float lum2m1 = (2.0 * lum) - 1.0;
    vec3  ct     = (sat2 * xt) + satinv;

    vec3 rgb;
    if (lum >= 0.5)
         rgb = (luminv * ct) + lum2m1;
    else rgb =  lum    * ct;

    return pow(rgb, vec3(brightness));
}
`,$7=`
#version 300 es

#ifdef GL_NV_shader_noperspective_interpolation
#extension GL_NV_shader_noperspective_interpolation : require
#endif

#define TEXTURE_ANIM_UNIT (1.0f / 128.0f)

uniform float u_time;
uniform float u_brightness;
uniform mat4 u_viewProjectionMatrix;

uniform float u_angle;
uniform vec3 u_translation;

layout(location = 0) in uvec3 a_packed;

#ifdef GL_NV_shader_noperspective_interpolation
noperspective centroid out float v_hsl;
#else
out float v_hsl;
#endif
out vec4 v_color;
out vec3 v_texCoord;

${l1}

float unpackFloat11(uint v) {
    return 16.0 - float(v) / 64.0;
}

struct Vertex {
    ivec3 position;
    int hsl;
    float alpha;
    int textureId;
    vec2 texCoord;
};

Vertex decodeVertex(uint v0, uint v1, uint v2) {
    Vertex vertex;

    int isTextured = int(v0 >> 30u);

    vertex.position.x = int(v0 & 0x3ffffu) - 0x20000;
    vertex.position.y = -(int((v0 >> 18u) & 0xfffu) - 0x800);
    vertex.position.z = int(v1 & 0x3ffffu) - 0x20000;

    int hslPacked = int(v1 >> 18u) << 2 | int(v2 >> 30u);
    int textureId = ((hslPacked >> 7) + 1);

    vertex.hsl = hslPacked * (1 - isTextured) + (hslPacked & 0x7f) * isTextured;
    vertex.alpha = float((v2 >> 22u) & 0xffu) / 255.0;

    vertex.textureId = textureId * isTextured;

    vertex.texCoord.x = unpackFloat11(uint(v2 >> 11u) & 0x7ffu);
    vertex.texCoord.y = unpackFloat11(uint(v2 & 0x7ffu));

    return vertex;
}

mat4 rotationY( in float angle ) {
    return mat4(cos(angle),\t\t0,\t\tsin(angle),\t0,
                         0,\t\t1.0,\t\t\t 0,\t0,
                -sin(angle),\t0,\t\tcos(angle),\t0,
                        0, \t\t0,\t\t\t\t0,\t1);
}

void main() {
    Vertex vertex = decodeVertex(a_packed.x, a_packed.y, a_packed.z);

    gl_Position = rotationY(u_angle) * vec4(vec3(vertex.position), 1.0);
    gl_Position.xyz += u_translation;
    gl_Position = u_viewProjectionMatrix * gl_Position;
    int textureId = vertex.textureId - 1;
    if (textureId >= 0) {
        v_color.r = float(vertex.hsl) / 127.0;
    } else {
        v_color = vec4(hslToRgb(vertex.hsl, u_brightness), vertex.alpha);
    }
    v_hsl = float(vertex.hsl);
    v_texCoord = vec3(vertex.texCoord, float(textureId + 1));
    // scrolling textures
    if (textureId == 17 || textureId == 24) {
        v_texCoord.y += u_time / 0.02 * -2.0 * TEXTURE_ANIM_UNIT;
    }
}
`.trim(),J7=`
#version 300 es

#ifdef GL_NV_shader_noperspective_interpolation
#extension GL_NV_shader_noperspective_interpolation : require
#endif

precision highp float;

uniform float u_brightness;

uniform highp sampler2DArray u_textures;

#ifdef GL_NV_shader_noperspective_interpolation
noperspective centroid in float v_hsl;
#endif
in vec4 v_color;
in vec3 v_texCoord;

out vec4 fragColor;

${l1}

vec3 getShadedColor(int rgb, int shadowFactor) {
    int shadowFactors[4] = int[](
        rgb & 0xf8f8ff,
        (rgb - (rgb >> 3)) & 0xf8f8ff,
        (rgb - (rgb >> 2)) & 0xf8f8ff,
        (rgb - (rgb >> 2) - (rgb >> 3)) & 0xf8f8ff
    );
    rgb = shadowFactors[shadowFactor % 4] >> (shadowFactor / 4);

    return vec3(float((rgb >> 16) & 0xff) / 255.0, float((rgb >> 8) & 0xff) / 255.0, float(rgb & 0xff) / 255.0);
}

void main() {
    if (v_texCoord.z > 0.0) {
        // emulate texture color shading
        vec4 texColor = texture(u_textures, v_texCoord).bgra;
        int rgb = int(texColor.r * 255.0) << 16 | int(texColor.g * 255.0) << 8 | int(texColor.b * 255.0);
        int shadowFactor = int(floor(v_color.r / 0.125));

        fragColor.rgb = getShadedColor(rgb, shadowFactor);
        fragColor.a = texColor.a;
    } else {
        #ifdef GL_NV_shader_noperspective_interpolation
            fragColor.rgb = hslToRgb(int(v_hsl), u_brightness);
        #else
            // emulate color banding
            fragColor.rgb = round(v_color.rgb * 64.0) / 64.0;
        #endif
        fragColor.a = v_color.a;
    }
}
`.trim(),o1=Math.PI,L7=o1*2,U1=L7/2048,z6=0.09765625,q7=512,B7=50,K7=3500;function F7(A){let R=A.getExtension("WEBGL_provoking_vertex");if(R)R.provokingVertexWEBGL(R.FIRST_VERTEX_CONVENTION_WEBGL)}class z extends C{gl;updateTexture(A){}fillTriangle(A,R,_,E,I,H,N){return!1}fillGouraudTriangle(A,R,_,E,I,H,N,O,Q){return!1}fillTexturedTriangle(A,R,_,E,I,H,N,O,Q,U,G,$,L,J,q,V,B,F,b){return!1}destroy(){delete z.viewportFramebuffer,z.textureArray=null}frame=0;pixMapTextures=new Map;drawCommands=new t1(1024);static frameProgram;static frameLoc;static pixMapProgram;static pixMapLoc;static mainProgram;static timeLoc;static brightnessLoc;static viewProjectionMatrixLoc;static angleLoc;static translationLoc;static texturesLoc;static packedAttrLoc;static areaViewport;static viewportWidth;static viewportHeight;static viewportFramebuffer;static viewportColorTexture;static viewportDepthBuffer;isDrawingScene=!1;static textureArray;brightness=0.9;cameraPos=s6.create();static cameraYaw=0;static cameraPitch=0;projectionMatrix=Z0.create();cameraMatrix=Z0.create();viewMatrix=Z0.create();viewProjectionMatrix=Z0.create();vertexDataBuffer=new D0(1024);indexDataBuffer=new d1(2048);static vertexArray;static vertexBuffer;static indexBuffer;static modelStartIndex=0;static modelElementOffset=0;static modelStartIndexMap=new Map;static modelVertexDataCache=new Map;static modelsToCache=new Set;static init(A,R,_){let E=document.createElement("canvas");E.width=R,E.height=_,E.style.display=L0.style.display,E.style.position=L0.style.position,E.style.width="100%",E.style.height="100%",E.style.imageRendering=L0.style.imageRendering,A.appendChild(E);let I=E.getContext("webgl2",{preserveDrawingBuffer:!0});if(!I)throw E.remove(),new Error("WebGL2 is not supported.");return C.resetRenderer(),new z(E,I)}constructor(A,R){super(A);this.gl=R;this.init()}init(){this.gl.enable(this.gl.CULL_FACE),this.gl.enable(this.gl.BLEND),this.gl.blendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA),F7(this.gl),this.gl.getExtension("NV_shader_noperspective_interpolation");let A=new h0(this.gl,this.gl.VERTEX_SHADER,O7),R=new h0(this.gl,this.gl.FRAGMENT_SHADER,Q7);z.frameProgram=i0(this.gl,[A,R]),z.frameLoc=this.gl.getUniformLocation(z.frameProgram.program,"u_frame");let _=new h0(this.gl,this.gl.VERTEX_SHADER,U7),E=new h0(this.gl,this.gl.FRAGMENT_SHADER,G7);z.pixMapProgram=i0(this.gl,[_,E]),z.pixMapLoc=this.gl.getUniformLocation(z.pixMapProgram.program,"u_frame");let I=new h0(this.gl,this.gl.VERTEX_SHADER,$7),H=new h0(this.gl,this.gl.FRAGMENT_SHADER,J7);z.mainProgram=i0(this.gl,[I,H]),z.timeLoc=this.gl.getUniformLocation(z.mainProgram.program,"u_time"),z.brightnessLoc=this.gl.getUniformLocation(z.mainProgram.program,"u_brightness"),z.viewProjectionMatrixLoc=this.gl.getUniformLocation(z.mainProgram.program,"u_viewProjectionMatrix"),z.angleLoc=this.gl.getUniformLocation(z.mainProgram.program,"u_angle"),z.translationLoc=this.gl.getUniformLocation(z.mainProgram.program,"u_translation"),z.texturesLoc=this.gl.getUniformLocation(z.mainProgram.program,"u_textures"),z.packedAttrLoc=this.gl.getAttribLocation(z.mainProgram.program,"a_packed");let N=this.gl.createVertexArray();this.gl.bindVertexArray(N),this.gl.enableVertexAttribArray(z.packedAttrLoc),z.vertexArray=N,this.gl.bindVertexArray(null)}setBrightness(A){this.brightness=A,this.initTextureArray(!0)}initTextureArray(A=!1){if(z.textureArray&&!A)return;if(z.textureArray)this.gl.deleteTexture(z.textureArray);let R=128,_=R*R,E=m.textureCount,I=E+1,H=this.gl.createTexture();this.gl.bindTexture(this.gl.TEXTURE_2D_ARRAY,H),this.gl.texParameteri(this.gl.TEXTURE_2D_ARRAY,this.gl.TEXTURE_MIN_FILTER,this.gl.NEAREST),this.gl.texParameteri(this.gl.TEXTURE_2D_ARRAY,this.gl.TEXTURE_MAG_FILTER,this.gl.NEAREST),this.gl.texParameteri(this.gl.TEXTURE_2D_ARRAY,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE);let N=new Int32Array(I*_);N.fill(4294967295,0,_);for(let O=0;O<E;O++){let Q=m.getTexels(O);if(!Q)continue;for(let U=0;U<_;U++){let G=Q[U];if(G!==0)G|=4278190080;N[(O+1)*_+U]=G}}this.gl.texImage3D(this.gl.TEXTURE_2D_ARRAY,0,this.gl.RGBA,R,R,I,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,new Uint8Array(N.buffer)),z.textureArray=H}startFrame(){this.frame++,this.drawCommands.count=0,z.modelStartIndexMap.clear(),this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),this.gl.clearColor(0,0,0,1)}setFrustumProjectionMatrix(A,R,_,E,I,H,N,O,Q,U){let G=(R-E<<9)/U,$=(R+H-E<<9)/U,L=(_-I<<9)/U,J=(_+N-I<<9)/U;if(Z0.identity(A),Z0.frustum(A,G*z6,$*z6,-J*z6,-L*z6,B7,K7),Z0.rotateX(A,A,o1),Q!==0)Z0.rotateX(A,A,Q*U1);if(O!==0)Z0.rotateY(A,A,O*U1);return A}setCameraMatrix(A,R){return Z0.identity(A),Z0.translate(A,A,R),A}renderPixMap(A,R,_){let E=this.pixMapTextures.get(A);if(!E){let H=this.gl.createTexture();this.gl.bindTexture(this.gl.TEXTURE_2D,H),this.gl.texStorage2D(this.gl.TEXTURE_2D,1,this.gl.RGBA8,A.width2d,A.height2d),E={lastFrameUsed:this.frame,texture:H},this.pixMapTextures.set(A,E)}else E.lastFrameUsed=this.frame;if(A===z.areaViewport)this.drawTexture(z.viewportColorTexture,R,_,A.width2d,A.height2d),this.drawTexture(null,R+A.width2d-1,_,1,A.height2d);let I=new Uint8Array(A.pixels.buffer);return this.gl.bindTexture(this.gl.TEXTURE_2D,E.texture),this.gl.texSubImage2D(this.gl.TEXTURE_2D,0,0,0,A.width2d,A.height2d,this.gl.RGBA,this.gl.UNSIGNED_BYTE,I),this.drawPixMapTexture(E.texture,R,_,A.width2d,A.height2d),!0}drawTexture(A,R,_,E,I){z.frameProgram.use(),this.gl.bindTexture(this.gl.TEXTURE_2D,A),this.gl.viewport(R,this.gl.canvas.height-_-I,E,I),this.gl.drawArrays(this.gl.TRIANGLES,0,3)}drawPixMapTexture(A,R,_,E,I){z.pixMapProgram.use(),this.gl.bindTexture(this.gl.TEXTURE_2D,A),this.gl.viewport(R,this.gl.canvas.height-_-I,E,I),this.gl.drawArrays(this.gl.TRIANGLES,0,3)}startRenderScene(){this.isDrawingScene=!0,this.vertexDataBuffer.pos=0,this.indexDataBuffer.pos=0,this.initTextureArray()}endRenderScene(){this.isDrawingScene=!1;let A=z.areaViewport,R=A.width2d,_=A.height2d;if(z.viewportFramebuffer===void 0||z.viewportWidth!==R||z.viewportHeight!==_){if(z.viewportFramebuffer!==void 0)this.gl.deleteFramebuffer(z.viewportFramebuffer),this.gl.deleteTexture(z.viewportColorTexture),this.gl.deleteRenderbuffer(z.viewportDepthBuffer);z.viewportFramebuffer=this.gl.createFramebuffer(),z.viewportWidth=R,z.viewportHeight=_;let L=z.viewportColorTexture=this.gl.createTexture();this.gl.bindTexture(this.gl.TEXTURE_2D,L),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,R,_,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,null),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE);let J=z.viewportDepthBuffer=this.gl.createRenderbuffer();this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,J),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.DEPTH_COMPONENT16,R,_),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,z.viewportFramebuffer),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,L,0),this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER,this.gl.DEPTH_ATTACHMENT,this.gl.RENDERBUFFER,J)}else this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,z.viewportFramebuffer);let E=m.centerX,I=m.centerY;this.gl.viewport(0,0,R,_),this.gl.clearColor(0,0,0,1),this.gl.clear(this.gl.COLOR_BUFFER_BIT|this.gl.DEPTH_BUFFER_BIT),z.mainProgram.use(),this.gl.uniform1f(z.timeLoc,performance.now()/1000),this.gl.uniform1f(z.brightnessLoc,this.brightness),this.cameraPos[0]=S.eyeX,this.cameraPos[1]=S.eyeY,this.cameraPos[2]=S.eyeZ;let{cameraYaw:H,cameraPitch:N}=z,O=q7;if(this.setFrustumProjectionMatrix(this.projectionMatrix,0,0,E,I,R,_,H,N,O),this.setCameraMatrix(this.cameraMatrix,this.cameraPos),Z0.invert(this.viewMatrix,this.cameraMatrix),Z0.multiply(this.viewProjectionMatrix,this.projectionMatrix,this.viewMatrix),this.gl.uniformMatrix4fv(z.viewProjectionMatrixLoc,!1,this.viewProjectionMatrix),z.vertexBuffer)this.gl.deleteBuffer(z.vertexBuffer),z.vertexBuffer=null;if(z.indexBuffer)this.gl.deleteBuffer(z.indexBuffer),z.indexBuffer=null;let Q=this.vertexDataBuffer,U=this.indexDataBuffer,G=Q.pos/D0.STRIDE;if(U.pos>0){this.gl.bindTexture(this.gl.TEXTURE_2D_ARRAY,z.textureArray),this.gl.bindVertexArray(z.vertexArray),z.vertexBuffer=this.gl.createBuffer(),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,z.vertexBuffer),this.gl.bufferData(this.gl.ARRAY_BUFFER,Q.data,this.gl.STATIC_DRAW,0,Q.pos),this.gl.vertexAttribIPointer(z.packedAttrLoc,3,this.gl.UNSIGNED_INT,D0.STRIDE,0),z.indexBuffer=this.gl.createBuffer(),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,z.indexBuffer),this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER,U.indices,this.gl.STATIC_DRAW,0,U.pos);let L=new Float32Array(3),J=0,q=this.drawCommands;q.reduce();for(let V=0;V<q.count;V++){let B=q.offsets[V],F=q.counts[V];if(F===0)continue;let b=(2048-q.yaws[V]&2047)*U1;L[0]=q.positions[V*3],L[1]=q.positions[V*3+1],L[2]=q.positions[V*3+2],this.gl.uniform1f(z.angleLoc,b),this.gl.uniform3fv(z.translationLoc,L),this.gl.drawElements(this.gl.TRIANGLES,F,this.gl.UNSIGNED_INT,B*4),J++}this.gl.bindVertexArray(null),this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,null)}this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null)}drawTileUnderlay(A,R,_,E,I){if(R.southwestColor===12345678&&R.northeastColor===12345678)return!0;let H=E<<7,N=E+1<<7,O=I<<7,Q=I+1<<7,U=A.levelHeightmaps[_][E][I],G=A.levelHeightmaps[_][E+1][I],$=A.levelHeightmaps[_][E+1][I+1],L=A.levelHeightmaps[_][E][I+1],J=this.vertexDataBuffer,q=this.indexDataBuffer,V=R.textureId,B=0,F=0,b=1,T=0,j=1,w=1,Z=0,W=1,Y=q.pos;if(R.northeastColor!==12345678)if(R.flat){let u=J.addVertex(N,$,Q,R.northeastColor,255,V,j,w),h=J.addVertex(H,L,Q,R.northwestColor,255,V,Z,W),n=J.addVertex(N,G,O,R.southeastColor,255,V,b,T);q.addIndices(u,h,n)}else{let u=J.addVertex(N,$,Q,R.northeastColor,255,V,B,F),h=J.addVertex(H,L,Q,R.northwestColor,255,V,b,T),n=J.addVertex(N,G,O,R.southeastColor,255,V,Z,W);q.addIndices(u,h,n)}if(R.southwestColor!==12345678){let u=J.addVertex(H,U,O,R.southwestColor,255,V,B,F),h=J.addVertex(N,G,O,R.southeastColor,255,V,b,T),n=J.addVertex(H,L,Q,R.northwestColor,255,V,Z,W);q.addIndices(u,h,n)}return this.drawCommands.addCommand(0,0,0,0,Y,q.pos-Y),!0}tmpOverlayU=new Float32Array(6);tmpOverlayV=new Float32Array(6);drawTileOverlay(A,R,_,E){let I=this.vertexDataBuffer,H=this.indexDataBuffer,N=_<<7,O=E<<7,Q=H.pos,U=R.vertexX.length,G=R.triangleVertexA.length;if(R.triangleTextureIds)for(let $=0;$<U;$++){let L=R.vertexX[$]-N,J=R.vertexZ[$]-O;this.tmpOverlayU[$]=L/128,this.tmpOverlayV[$]=J/128}for(let $=0;$<G;$++){let L=R.triangleVertexA[$],J=R.triangleVertexB[$],q=R.triangleVertexC[$],V=R.vertexX[L],B=R.vertexY[L],F=R.vertexZ[L],b=R.vertexX[J],T=R.vertexY[J],j=R.vertexZ[J],w=R.vertexX[q],Z=R.vertexY[q],W=R.vertexZ[q],Y=R.triangleColorA[$],u=R.triangleColorB[$],h=R.triangleColorC[$],n=R.triangleTextureIds?.[$]??-1;if(n===-1&&Y===12345678)continue;if(R.flat){let X=I.addVertex(V,B,F,Y,255,n,this.tmpOverlayU[L],this.tmpOverlayV[L]),f=I.addVertex(b,T,j,u,255,n,this.tmpOverlayU[J],this.tmpOverlayV[J]),g=I.addVertex(w,Z,W,h,255,n,this.tmpOverlayU[q],this.tmpOverlayV[q]);H.addIndices(X,f,g)}else{let X=I.addVertex(V,B,F,Y,255,n,this.tmpOverlayU[0],this.tmpOverlayV[0]),f=I.addVertex(b,T,j,u,255,n,this.tmpOverlayU[1],this.tmpOverlayV[1]),g=I.addVertex(w,Z,W,h,255,n,this.tmpOverlayU[3],this.tmpOverlayV[3]);H.addIndices(X,f,g)}}return this.drawCommands.addCommand(0,0,0,0,Q,H.pos-Q),!0}cacheModelVertexData(A,R){if(z.modelVertexDataCache.has(A))return;let _=this.vertexDataBuffer,E=_.pos;this.addModelVertexData(_,A);let I=_.pos;if(R)_.pos=E;if(I-E>0){let N=_.data.slice(E,I);z.modelVertexDataCache.set(A,{frame:this.frame,data:N})}}static onSceneLoaded(A){if(!A)return;z.modelVertexDataCache.clear(),z.modelsToCache.clear();for(let R=0;R<A.maxLevel;R++)for(let _=0;_<A.maxTileX;_++)for(let E=0;E<A.maxTileZ;E++){let I=A.levelTiles[R][_][E];z.cacheTile(I)}}static cacheTile(A){if(!A)return;if(A.bridge)this.cacheTile(A.bridge);let R=A.wall?.modelA,_=A.wall?.modelB,E=A.wallDecoration?.model,I=A.groundDecoration?.model;if(R)this.modelsToCache.add(R);if(_)this.modelsToCache.add(_);if(E)this.modelsToCache.add(E);if(I)this.modelsToCache.add(I);for(let H of A.locs){if(!H)continue;let N=H.model;if(!N)continue;this.modelsToCache.add(N)}}static onSceneReset(A){z.modelStartIndexMap.clear(),z.modelVertexDataCache.clear(),z.modelsToCache.clear()}addModelVertexData(A,R){let{faceColorA:_,faceColorB:E,faceColorC:I}=R;if(!_||!E||!I)return;let{vertexX:H,vertexY:N,vertexZ:O,faceVertexA:Q,faceVertexB:U,faceVertexC:G,faceColor:$,faceAlpha:L,faceInfo:J,texturedVertexA:q,texturedVertexB:V,texturedVertexC:B,faceCount:F}=R;for(let b=0;b<F;b++){let T=Q[b],j=U[b],w=G[b],Z=H[T],W=N[T],Y=O[T],u=H[j],h=N[j],n=O[j],X=H[w],f=N[w],g=O[w],v=_[b],M=E[b],x=I[b],y=255;if(L)y=255-L[b];let d=0;if(J)d=J[b];let A0=d&3;if(A0===1||A0===3)x=M=v;let t=-1,N0=0,H0=0,B0=0,K0=0,J1=0,L1=0;if((A0===2||A0===3)&&$){t=$[b];let t6=d>>2,l6=q[t6],o6=V[t6],e6=B[t6],E6=H[l6],I6=N[l6],H6=O[l6],N6=H[o6]-E6,O6=N[o6]-I6,Q6=O[o6]-H6,U6=H[e6]-E6,G6=N[e6]-I6,$6=O[e6]-H6,q1=H[T]-E6,B1=N[T]-I6,K1=O[T]-H6,F1=H[j]-E6,V1=N[j]-I6,k1=O[j]-H6,S1=H[w]-E6,b1=N[w]-I6,T1=O[w]-H6,b6=O6*$6-Q6*G6,T6=Q6*U6-N6*$6,j6=N6*G6-O6*U6,s0=G6*j6-$6*T6,z0=$6*b6-U6*j6,v0=U6*T6-G6*b6,c0=1/(s0*N6+z0*O6+v0*Q6);N0=(s0*q1+z0*B1+v0*K1)*c0,B0=(s0*F1+z0*V1+v0*k1)*c0,J1=(s0*S1+z0*b1+v0*T1)*c0,s0=O6*j6-Q6*T6,z0=Q6*b6-N6*j6,v0=N6*T6-O6*b6,c0=1/(s0*U6+z0*G6+v0*$6),H0=(s0*q1+z0*B1+v0*K1)*c0,K0=(s0*F1+z0*V1+v0*k1)*c0,L1=(s0*S1+z0*b1+v0*T1)*c0}A.addVertex(Z,W,Y,v,y,t,N0,H0),A.addVertex(u,h,n,M,y,t,B0,K0),A.addVertex(X,f,g,x,y,t,J1,L1)}}startDrawModel(A,R,_,E,I,H){if(!this.isDrawingScene)return;let N=this.vertexDataBuffer,O=this.indexDataBuffer,Q=z.modelStartIndexMap.get(A);if(Q!==void 0){z.modelStartIndex=Q,z.modelElementOffset=O.pos;return}let{faceColorA:U,faceColorB:G,faceColorC:$}=A;if(!U||!G||!$)return;let L=N.pos;z.modelStartIndex=L/D0.STRIDE,z.modelElementOffset=O.pos,z.modelStartIndexMap.set(A,z.modelStartIndex);let J=z.modelVertexDataCache.get(A);if(J){N.addData(J.data);return}if(z.modelsToCache.has(A))this.cacheModelVertexData(A,!1);else this.addModelVertexData(N,A)}endDrawModel(A,R,_,E,I,H){if(!this.isDrawingScene)return;let N=this.indexDataBuffer.pos-z.modelElementOffset;if(N>0){let O=_+S.eyeX,Q=E+S.eyeY,U=I+S.eyeZ;this.drawCommands.addCommand(O,Q,U,R,z.modelElementOffset,N)}}drawModelTriangle(A,R){if(!this.isDrawingScene)return!1;let _=z.modelStartIndex+R*3;return this.indexDataBuffer.addIndices(_,_+1,_+2),!0}endFrame(){for(let[A,R]of this.pixMapTextures)if(this.frame-R.lastFrameUsed>5)this.gl.deleteTexture(R.texture),this.pixMapTextures.delete(A)}}class S{static visibilityMatrix=new m6(8,32,51,51,!1);static locBuffer=new p(100,null);static levelOccluderCount=new Int32Array(4);static levelOccluders=new _1(4,500,null);static activeOccluders=new p(500,null);static drawTileQueue=new m0;static cycle=0;static viewportLeft=0;static viewportTop=0;static viewportRight=0;static viewportBottom=0;static viewportCenterX=0;static viewportCenterY=0;static sinEyePitch=0;static cosEyePitch=0;static sinEyeYaw=0;static cosEyeYaw=0;static eyeX=0;static eyeY=0;static eyeZ=0;static eyeTileX=0;static eyeTileZ=0;static minDrawTileX=0;static maxDrawTileX=0;static minDrawTileZ=0;static maxDrawTileZ=0;static topLevel=0;static tilesRemaining=0;static takingInput=!1;static visibilityMap=null;static FRONT_WALL_TYPES=Uint8Array.of(19,55,38,155,255,110,137,205,76);static DIRECTION_ALLOW_WALL_CORNER_TYPE=Uint8Array.of(160,192,80,96,0,144,80,48,160);static BACK_WALL_TYPES=Uint8Array.of(76,8,137,4,0,1,38,2,19);static WALL_CORNER_TYPE_16_BLOCK_LOC_SPANS=Int8Array.of(0,0,2,0,0,2,1,1,0);static WALL_CORNER_TYPE_32_BLOCK_LOC_SPANS=Int8Array.of(2,0,0,2,0,0,0,4,4);static WALL_CORNER_TYPE_64_BLOCK_LOC_SPANS=Int8Array.of(0,4,4,8,0,0,8,0,0);static WALL_CORNER_TYPE_128_BLOCK_LOC_SPANS=Int8Array.of(1,1,0,0,0,8,0,0,8);static WALL_DECORATION_INSET_X=Int8Array.of(53,-53,-53,53);static WALL_DECORATION_INSET_Z=Int8Array.of(-53,-53,53,53);static WALL_DECORATION_OUTSET_X=Int8Array.of(-45,45,45,-45);static WALL_DECORATION_OUTSET_Z=Int8Array.of(45,45,-45,-45);static MINIMAP_TILE_MASK=[new Int8Array(16),Int8Array.of(1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1),Int8Array.of(1,0,0,0,1,1,0,0,1,1,1,0,1,1,1,1),Int8Array.of(1,1,0,0,1,1,0,0,1,0,0,0,1,0,0,0),Int8Array.of(0,0,1,1,0,0,1,1,0,0,0,1,0,0,0,1),Int8Array.of(0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1),Int8Array.of(1,1,1,0,1,1,1,0,1,1,1,1,1,1,1,1),Int8Array.of(1,1,0,0,1,1,0,0,1,1,0,0,1,1,0,0),Int8Array.of(0,0,0,0,0,0,0,0,1,0,0,0,1,1,0,0),Int8Array.of(1,1,1,1,1,1,1,1,0,1,1,1,0,0,1,1),Int8Array.of(1,1,1,1,1,1,0,0,1,0,0,0,1,0,0,0),Int8Array.of(0,0,0,0,0,0,1,1,0,1,1,1,0,1,1,1),Int8Array.of(0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1)];static MINIMAP_TILE_ROTATION_MAP=[Int8Array.of(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15),Int8Array.of(12,8,4,0,13,9,5,1,14,10,6,2,15,11,7,3),Int8Array.of(15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0),Int8Array.of(3,7,11,15,2,6,10,14,1,5,9,13,0,4,8,12)];static TEXTURE_HSL=Int32Array.of(41,39248,41,4643,41,41,41,41,41,41,41,41,41,41,41,43086,41,41,41,41,41,41,41,8602,41,28992,41,41,41,41,41,5056,41,41,41,41,41,41,41,41,41,41,41,41,41,41,3131,41,41,41);static activeOccluderCount=0;static mouseX=0;static mouseY=0;static clickTileX=-1;static clickTileZ=-1;static lowMemory=!0;static init(A,R,_,E,I){this.viewportLeft=0,this.viewportTop=0,this.viewportRight=A,this.viewportBottom=R,this.viewportCenterX=A/2|0,this.viewportCenterY=R/2|0;let H=new m6(9,32,53,53,!1);for(let N=128;N<=384;N+=32)for(let O=0;O<2048;O+=64){this.sinEyePitch=m.sin[N],this.cosEyePitch=m.cos[N],this.sinEyeYaw=m.sin[O],this.cosEyeYaw=m.cos[O];let Q=(N-128)/32|0,U=O/64|0;for(let G=-26;G<=26;G++)for(let $=-26;$<=26;$++){let L=G*128,J=$*128,q=!1;for(let V=-_;V<=E;V+=128)if(this.testPoint(L,J,I[Q]+V)){q=!0;break}H[Q][U][G+25+1][$+25+1]=q}}for(let N=0;N<8;N++)for(let O=0;O<32;O++)for(let Q=-25;Q<25;Q++)for(let U=-25;U<25;U++){let G=!1;A:for(let $=-1;$<=1;$++)for(let L=-1;L<=1;L++){if(H[N][O][Q+$+25+1][U+L+25+1]){G=!0;break A}if(H[N][(O+1)%31][Q+$+25+1][U+L+25+1]){G=!0;break A}if(H[N+1][O][Q+$+25+1][U+L+25+1]){G=!0;break A}if(H[N+1][(O+1)%31][Q+$+25+1][U+L+25+1]){G=!0;break A}}this.visibilityMatrix[N][O][Q+25][U+25]=G}}static addOccluder(A,R,_,E,I,H,N,O){S.levelOccluders[A][S.levelOccluderCount[A]++]=new u6(_/128|0,H/128|0,I/128|0,O/128|0,R,_,H,I,O,E,N)}static testPoint(A,R,_){let E=R*this.sinEyeYaw+A*this.cosEyeYaw>>16,I=R*this.cosEyeYaw-A*this.sinEyeYaw>>16,H=_*this.sinEyePitch+I*this.cosEyePitch>>16,N=_*this.cosEyePitch-I*this.sinEyePitch>>16;if(H<50||H>3500)return!1;let O=this.viewportCenterX+((E<<9)/H|0),Q=this.viewportCenterY+((N<<9)/H|0);return O>=this.viewportLeft&&O<=this.viewportRight&&Q>=this.viewportTop&&Q<=this.viewportBottom}maxLevel;maxTileX;maxTileZ;levelHeightmaps;levelTiles;temporaryLocs;levelTileOcclusionCycles;mergeIndexA;mergeIndexB;temporaryLocCount=0;minLevel=0;tmpMergeIndex=0;constructor(A,R,_,E){this.maxLevel=_,this.maxTileX=E,this.maxTileZ=R,this.levelTiles=new J6(_,E,R,null),this.levelTileOcclusionCycles=new d0(_,E+1,R+1),this.levelHeightmaps=A,this.temporaryLocs=new p(5000,null),this.mergeIndexA=new Int32Array(1e4),this.mergeIndexB=new Int32Array(1e4),this.reset()}reset(){for(let A=0;A<this.maxLevel;A++)for(let R=0;R<this.maxTileX;R++)for(let _=0;_<this.maxTileZ;_++)this.levelTiles[A][R][_]=null;for(let A=0;A<4;A++){for(let R=0;R<S.levelOccluderCount[A];R++)S.levelOccluders[A][R]=null;S.levelOccluderCount[A]=0}for(let A=0;A<this.temporaryLocCount;A++)this.temporaryLocs[A]=null;this.temporaryLocCount=0,S.locBuffer.fill(null),z.onSceneReset(this)}setMinLevel(A){this.minLevel=A;for(let R=0;R<this.maxTileX;R++)for(let _=0;_<this.maxTileZ;_++)this.levelTiles[A][R][_]=new n0(A,R,_)}setBridge(A,R){let _=this.levelTiles[0][A][R];for(let I=0;I<3;I++){this.levelTiles[I][A][R]=this.levelTiles[I+1][A][R];let H=this.levelTiles[I][A][R];if(H)H.groundLevel--}if(!this.levelTiles[0][A][R])this.levelTiles[0][A][R]=new n0(0,A,R);let E=this.levelTiles[0][A][R];if(E)E.bridge=_;this.levelTiles[3][A][R]=null}setDrawLevel(A,R,_,E){let I=this.levelTiles[A][R][_];if(!I)return;I.drawLevel=E}setTile(A,R,_,E,I,H,N,O,Q,U,G,$,L,J,q,V,B,F,b,T){if(E===0){for(let w=A;w>=0;w--)if(!this.levelTiles[w][R][_])this.levelTiles[w][R][_]=new n0(w,R,_);let j=this.levelTiles[A][R][_];if(j)j.underlay=new L6(G,$,L,J,-1,b,!1)}else if(E===1){for(let w=A;w>=0;w--)if(!this.levelTiles[w][R][_])this.levelTiles[w][R][_]=new n0(w,R,_);let j=this.levelTiles[A][R][_];if(j)j.underlay=new L6(q,V,B,F,H,T,N===O&&N===Q&&N===U)}else{for(let w=A;w>=0;w--)if(!this.levelTiles[w][R][_])this.levelTiles[w][R][_]=new n0(w,R,_);let j=this.levelTiles[A][R][_];if(j)j.overlay=new a(R,E,V,O,L,I,G,U,T,q,H,F,b,Q,B,J,N,_,$)}}addGroundDecoration(A,R,_,E,I,H,N){if(!this.levelTiles[R][_][E])this.levelTiles[R][_][E]=new n0(R,_,E);let O=this.levelTiles[R][_][E];if(O)O.groundDecoration=new W6(I,_*128+64,E*128+64,A,H,N)}removeGroundDecoration(A,R,_){let E=this.levelTiles[A][R][_];if(!E)return;E.groundDecoration=null}addObjStack(A,R,_,E,I,H,N,O){let Q=0,U=this.levelTiles[E][A][R];if(U)for(let $=0;$<U.locCount;$++){let L=U.locs[$];if(!L||!L.model)continue;let J=L.model.objRaise;if(J>Q)Q=J}else this.levelTiles[E][A][R]=new n0(E,A,R);let G=this.levelTiles[E][A][R];if(G)G.objStack=new M6(_,A*128+64,R*128+64,H,N,O,I,Q)}removeObjStack(A,R,_){let E=this.levelTiles[A][R][_];if(!E)return;E.objStack=null}addWall(A,R,_,E,I,H,N,O,Q,U){if(!N&&!O)return;for(let $=A;$>=0;$--)if(!this.levelTiles[$][R][_])this.levelTiles[$][R][_]=new n0($,R,_);let G=this.levelTiles[A][R][_];if(G)G.wall=new P6(E,R*128+64,_*128+64,I,H,N,O,Q,U)}removeWall(A,R,_,E){let I=this.levelTiles[A][R][_];if(E===1&&I)I.wall=null}setWallDecoration(A,R,_,E,I,H,N,O,Q,U,G){if(!O)return;for(let L=A;L>=0;L--)if(!this.levelTiles[L][R][_])this.levelTiles[L][R][_]=new n0(L,R,_);let $=this.levelTiles[A][R][_];if($)$.wallDecoration=new D6(E,R*128+I+64,_*128+H+64,G,U,O,N,Q)}removeWallDecoration(A,R,_){let E=this.levelTiles[A][R][_];if(!E)return;E.wallDecoration=null}setWallDecorationOffset(A,R,_,E){let I=this.levelTiles[A][R][_];if(!I)return;let H=I.wallDecoration;if(!H)return;let N=R*128+64,O=_*128+64;H.x=N+((H.x-N)*E/16|0),H.z=O+((H.z-O)*E/16|0)}setWallDecorationModel(A,R,_,E){if(!E)return;let I=this.levelTiles[A][R][_];if(!I)return;let H=I.wallDecoration;if(!H)return;H.model=E}setGroundDecorationModel(A,R,_,E){if(!E)return;let I=this.levelTiles[A][R][_];if(!I)return;let H=I.groundDecoration;if(!H)return;H.model=E}setWallModel(A,R,_,E){if(!E)return;let I=this.levelTiles[A][R][_];if(!I)return;let H=I.wall;if(!H)return;H.modelA=E}setWallModels(A,R,_,E,I){if(!E)return;let H=this.levelTiles[_][A][R];if(!H)return;let N=H.wall;if(!N)return;N.modelA=E,N.modelB=I}addLoc(A,R,_,E,I,H,N,O,Q,U,G){if(!I&&!H)return!0;let $=R*128+Q*64,L=_*128+U*64;return this.addLoc2($,L,E,A,R,_,Q,U,I,H,N,O,G,!1)}addTemporary(A,R,_,E,I,H,N,O,Q,U){if(!I&&!H)return!0;let G=R-Q,$=E-Q,L=R+Q,J=E+Q;if(U){if(O>640&&O<1408)J+=128;if(O>1152&&O<1920)L+=128;if(O>1664||O<384)$-=128;if(O>128&&O<896)G-=128}return G=G/128|0,$=$/128|0,L=L/128|0,J=J/128|0,this.addLoc2(R,E,_,A,G,$,L+1-G,J-$+1,I,H,N,0,O,!0)}addTemporary2(A,R,_,E,I,H,N,O,Q,U,G,$){return!Q&&!U||this.addLoc2(R,E,_,A,I,H,N+1-I,O-H+1,Q,U,G,0,$,!0)}removeLoc(A,R,_){let E=this.levelTiles[A][R][_];if(!E)return;for(let I=0;I<E.locCount;I++){let H=E.locs[I];if(H&&(H.typecode>>29&3)===2&&H.minSceneTileX===R&&H.minSceneTileZ===_){this.removeLoc2(H);return}}}setLocModel(A,R,_,E){if(!E)return;let I=this.levelTiles[A][R][_];if(!I)return;for(let H=0;H<I.locCount;H++){let N=I.locs[H];if(N&&(N.typecode>>29&3)===2){N.model=E;return}}}clearTemporaryLocs(){for(let A=0;A<this.temporaryLocCount;A++){let R=this.temporaryLocs[A];if(R)this.removeLoc2(R);this.temporaryLocs[A]=null}this.temporaryLocCount=0}getWallTypecode(A,R,_){let E=this.levelTiles[A][R][_];return!E||!E.wall?0:E.wall.typecode}getDecorTypecode(A,R,_){let E=this.levelTiles[A][_][R];return!E||!E.wallDecoration?0:E.wallDecoration.typecode}getLocTypecode(A,R,_){let E=this.levelTiles[A][R][_];if(!E)return 0;for(let I=0;I<E.locCount;I++){let H=E.locs[I];if(H&&(H.typecode>>29&3)===2&&H.minSceneTileX===R&&H.minSceneTileZ===_)return H.typecode}return 0}getGroundDecorTypecode(A,R,_){let E=this.levelTiles[A][R][_];return!E||!E.groundDecoration?0:E.groundDecoration.typecode}getInfo(A,R,_,E){let I=this.levelTiles[A][R][_];if(!I)return-1;else if(I.wall&&I.wall.typecode===E)return I.wall.info&255;else if(I.wallDecoration&&I.wallDecoration.typecode===E)return I.wallDecoration.info&255;else if(I.groundDecoration&&I.groundDecoration.typecode===E)return I.groundDecoration.info&255;else{for(let H=0;H<I.locCount;H++){let N=I.locs[H];if(N&&N.typecode===E)return N.info&255}return-1}}buildModels(A,R,_,E,I){let H=Math.sqrt(_*_+E*E+I*I)|0,N=R*H>>8;for(let O=0;O<this.maxLevel;O++)for(let Q=0;Q<this.maxTileX;Q++)for(let U=0;U<this.maxTileZ;U++){let G=this.levelTiles[O][Q][U];if(!G)continue;let $=G.wall;if($&&$.modelA&&$.modelA.vertexNormal){if(this.mergeLocNormals(O,Q,U,1,1,$.modelA),$.modelB&&$.modelB.vertexNormal)this.mergeLocNormals(O,Q,U,1,1,$.modelB),this.mergeNormals($.modelA,$.modelB,0,0,0,!1),$.modelB.applyLighting(A,N,_,E,I);$.modelA.applyLighting(A,N,_,E,I)}for(let J=0;J<G.locCount;J++){let q=G.locs[J];if(q&&q.model&&q.model.vertexNormal)this.mergeLocNormals(O,Q,U,q.maxSceneTileX+1-q.minSceneTileX,q.maxSceneTileZ-q.minSceneTileZ+1,q.model),q.model.applyLighting(A,N,_,E,I)}let L=G.groundDecoration;if(L&&L.model&&L.model.vertexNormal)this.mergeGroundDecorationNormals(O,Q,U,L.model),L.model.applyLighting(A,N,_,E,I)}}mergeGroundDecorationNormals(A,R,_,E){if(R<this.maxTileX){let I=this.levelTiles[A][R+1][_];if(I&&I.groundDecoration&&I.groundDecoration.model&&I.groundDecoration.model.vertexNormal)this.mergeNormals(E,I.groundDecoration.model,128,0,0,!0)}if(_<this.maxTileX){let I=this.levelTiles[A][R][_+1];if(I&&I.groundDecoration&&I.groundDecoration.model&&I.groundDecoration.model.vertexNormal)this.mergeNormals(E,I.groundDecoration.model,0,0,128,!0)}if(R<this.maxTileX&&_<this.maxTileZ){let I=this.levelTiles[A][R+1][_+1];if(I&&I.groundDecoration&&I.groundDecoration.model&&I.groundDecoration.model.vertexNormal)this.mergeNormals(E,I.groundDecoration.model,128,0,128,!0)}if(R<this.maxTileX&&_>0){let I=this.levelTiles[A][R+1][_-1];if(I&&I.groundDecoration&&I.groundDecoration.model&&I.groundDecoration.model.vertexNormal)this.mergeNormals(E,I.groundDecoration.model,128,0,-128,!0)}}mergeLocNormals(A,R,_,E,I,H){let N=!0,O=R,Q=R+E,U=_-1,G=_+I;for(let $=A;$<=A+1;$++){if($===this.maxLevel)continue;for(let L=O;L<=Q;L++){if(L<0||L>=this.maxTileX)continue;for(let J=U;J<=G;J++){if(J<0||J>=this.maxTileZ||N&&L<Q&&J<G&&(J>=_||L===R))continue;let q=this.levelTiles[$][L][J];if(!q)continue;let V=(L-R)*128+(1-E)*64,B=(J-_)*128+(1-I)*64,F=((this.levelHeightmaps[$][L][J]+this.levelHeightmaps[$][L+1][J]+this.levelHeightmaps[$][L][J+1]+this.levelHeightmaps[$][L+1][J+1])/4|0)-((this.levelHeightmaps[A][R][_]+this.levelHeightmaps[A][R+1][_]+this.levelHeightmaps[A][R][_+1]+this.levelHeightmaps[A][R+1][_+1])/4|0),b=q.wall;if(b&&b.modelA&&b.modelA.vertexNormal)this.mergeNormals(H,b.modelA,V,F,B,N);if(b&&b.modelB&&b.modelB.vertexNormal)this.mergeNormals(H,b.modelB,V,F,B,N);for(let T=0;T<q.locCount;T++){let j=q.locs[T];if(!j||!j.model||!j.model.vertexNormal)continue;let w=j.maxSceneTileX+1-j.minSceneTileX,Z=j.maxSceneTileZ+1-j.minSceneTileZ;this.mergeNormals(H,j.model,(j.minSceneTileX-R)*128+(w-E)*64,F,(j.minSceneTileZ-_)*128+(Z-I)*64,N)}}}O--,N=!1}}mergeNormals(A,R,_,E,I,H){this.tmpMergeIndex++;let N=0,O=R.vertexX,Q=R.vertexCount;if(A.vertexNormal&&A.vertexNormalOriginal)for(let U=0;U<A.vertexCount;U++){let G=A.vertexNormal[U],$=A.vertexNormalOriginal[U];if($&&$.w!==0){let L=A.vertexY[U]-E;if(L>R.minY)continue;let J=A.vertexX[U]-_;if(J<R.minX||J>R.maxX)continue;let q=A.vertexZ[U]-I;if(q<R.minZ||q>R.maxZ)continue;if(R.vertexNormal&&R.vertexNormalOriginal)for(let V=0;V<Q;V++){let B=R.vertexNormal[V],F=R.vertexNormalOriginal[V];if(J!==O[V]||q!==R.vertexZ[V]||L!==R.vertexY[V]||F&&F.w===0)continue;if(G&&B&&F)G.x+=F.x,G.y+=F.y,G.z+=F.z,G.w+=F.w,B.x+=$.x,B.y+=$.y,B.z+=$.z,B.w+=$.w,N++;this.mergeIndexA[U]=this.tmpMergeIndex,this.mergeIndexB[V]=this.tmpMergeIndex}}}if(N<3||!H)return;if(A.faceInfo){for(let U=0;U<A.faceCount;U++)if(this.mergeIndexA[A.faceVertexA[U]]===this.tmpMergeIndex&&this.mergeIndexA[A.faceVertexB[U]]===this.tmpMergeIndex&&this.mergeIndexA[A.faceVertexC[U]]===this.tmpMergeIndex)A.faceInfo[U]=-1}if(R.faceInfo){for(let U=0;U<R.faceCount;U++)if(this.mergeIndexB[R.faceVertexA[U]]===this.tmpMergeIndex&&this.mergeIndexB[R.faceVertexB[U]]===this.tmpMergeIndex&&this.mergeIndexB[R.faceVertexC[U]]===this.tmpMergeIndex)R.faceInfo[U]=-1}}drawMinimapTile(A,R,_,E,I,H){let N=this.levelTiles[A][R][_];if(!N)return;let O=N.underlay;if(O){let B=O.colour;if(B!==0)for(let F=0;F<4;F++)E[I]=B,E[I+1]=B,E[I+2]=B,E[I+3]=B,I+=H;return}let Q=N.overlay;if(!Q)return;let{shape:U,shapeAngle:G,backgroundRgb:$,foregroundRgb:L}=Q,J=S.MINIMAP_TILE_MASK[U],q=S.MINIMAP_TILE_ROTATION_MAP[G],V=0;if($!==0){for(let B=0;B<4;B++)E[I]=J[q[V++]]===0?$:L,E[I+1]=J[q[V++]]===0?$:L,E[I+2]=J[q[V++]]===0?$:L,E[I+3]=J[q[V++]]===0?$:L,I+=H;return}for(let B=0;B<4;B++){if(J[q[V++]]!==0)E[I]=L;if(J[q[V++]]!==0)E[I+1]=L;if(J[q[V++]]!==0)E[I+2]=L;if(J[q[V++]]!==0)E[I+3]=L;I+=H}}click(A,R){S.takingInput=!0,S.mouseX=A,S.mouseY=R,S.clickTileX=-1,S.clickTileZ=-1}draw(A,R,_,E,I,H,N){if(z.cameraYaw=I,z.cameraPitch=H,A<0)A=0;else if(A>=this.maxTileX*128)A=this.maxTileX*128-1;if(_<0)_=0;else if(_>=this.maxTileZ*128)_=this.maxTileZ*128-1;if(S.cycle++,S.sinEyePitch=m.sin[H],S.cosEyePitch=m.cos[H],S.sinEyeYaw=m.sin[I],S.cosEyeYaw=m.cos[I],S.visibilityMap=S.visibilityMatrix[(H-128)/32|0][I/64|0],S.eyeX=A,S.eyeY=R,S.eyeZ=_,S.eyeTileX=A/128|0,S.eyeTileZ=_/128|0,S.topLevel=E,S.minDrawTileX=S.eyeTileX-25,S.minDrawTileX<0)S.minDrawTileX=0;if(S.minDrawTileZ=S.eyeTileZ-25,S.minDrawTileZ<0)S.minDrawTileZ=0;if(S.maxDrawTileX=S.eyeTileX+25,S.maxDrawTileX>this.maxTileX)S.maxDrawTileX=this.maxTileX;if(S.maxDrawTileZ=S.eyeTileZ+25,S.maxDrawTileZ>this.maxTileZ)S.maxDrawTileZ=this.maxTileZ;this.updateActiveOccluders(),S.tilesRemaining=0;for(let O=this.minLevel;O<this.maxLevel;O++){let Q=this.levelTiles[O];for(let U=S.minDrawTileX;U<S.maxDrawTileX;U++)for(let G=S.minDrawTileZ;G<S.maxDrawTileZ;G++){let $=Q[U][G];if(!$)continue;if($.drawLevel<=E&&(S.visibilityMap[U+25-S.eyeTileX][G+25-S.eyeTileZ]||this.levelHeightmaps[O][U][G]-R>=2000))$.groundVisible=!0,$.update=!0,$.containsLocs=$.locCount>0,S.tilesRemaining++;else $.groundVisible=!1,$.update=!1,$.checkLocSpans=0}}for(let O=this.minLevel;O<this.maxLevel;O++){let Q=this.levelTiles[O];for(let U=-25;U<=0;U++){let G=S.eyeTileX+U,$=S.eyeTileX-U;if(G<S.minDrawTileX&&$>=S.maxDrawTileX)continue;for(let L=-25;L<=0;L++){let J=S.eyeTileZ+L,q=S.eyeTileZ-L,V;if(G>=S.minDrawTileX){if(J>=S.minDrawTileZ){if(V=Q[G][J],V&&V.groundVisible)this.drawTile(V,!0,N)}if(q<S.maxDrawTileZ){if(V=Q[G][q],V&&V.groundVisible)this.drawTile(V,!0,N)}}if($<S.maxDrawTileX){if(J>=S.minDrawTileZ){if(V=Q[$][J],V&&V.groundVisible)this.drawTile(V,!0,N)}if(q<S.maxDrawTileZ){if(V=Q[$][q],V&&V.groundVisible)this.drawTile(V,!0,N)}}if(S.tilesRemaining===0){S.takingInput=!1;return}}}}for(let O=this.minLevel;O<this.maxLevel;O++){let Q=this.levelTiles[O];for(let U=-25;U<=0;U++){let G=S.eyeTileX+U,$=S.eyeTileX-U;if(G<S.minDrawTileX&&$>=S.maxDrawTileX)continue;for(let L=-25;L<=0;L++){let J=S.eyeTileZ+L,q=S.eyeTileZ-L,V;if(G>=S.minDrawTileX){if(J>=S.minDrawTileZ){if(V=Q[G][J],V&&V.groundVisible)this.drawTile(V,!1,N)}if(q<S.maxDrawTileZ){if(V=Q[G][q],V&&V.groundVisible)this.drawTile(V,!1,N)}}if($<S.maxDrawTileX){if(J>=S.minDrawTileZ){if(V=Q[$][J],V&&V.groundVisible)this.drawTile(V,!1,N)}if(q<S.maxDrawTileZ){if(V=Q[$][q],V&&V.groundVisible)this.drawTile(V,!1,N)}}if(S.tilesRemaining===0){S.takingInput=!1;return}}}}}addLoc2(A,R,_,E,I,H,N,O,Q,U,G,$,L,J){if(!Q&&!U)return!1;for(let V=I;V<I+N;V++)for(let B=H;B<H+O;B++){if(V<0||B<0||V>=this.maxTileX||B>=this.maxTileZ)return!1;let F=this.levelTiles[E][V][B];if(F&&F.locCount>=5)return!1}let q=new g6(E,_,A,R,Q,U,L,I,I+N-1,H,H+O-1,G,$);for(let V=I;V<I+N;V++)for(let B=H;B<H+O;B++){let F=0;if(V>I)F|=1;if(V<I+N-1)F+=4;if(B>H)F+=8;if(B<H+O-1)F+=2;for(let T=E;T>=0;T--)if(!this.levelTiles[T][V][B])this.levelTiles[T][V][B]=new n0(T,V,B);let b=this.levelTiles[E][V][B];if(b)b.locs[b.locCount]=q,b.locSpan[b.locCount]=F,b.locSpans|=F,b.locCount++}if(J)this.temporaryLocs[this.temporaryLocCount++]=q;return!0}removeLoc2(A){for(let R=A.minSceneTileX;R<=A.maxSceneTileX;R++)for(let _=A.minSceneTileZ;_<=A.maxSceneTileZ;_++){let E=this.levelTiles[A.locLevel][R][_];if(!E)continue;for(let I=0;I<E.locCount;I++)if(E.locs[I]===A){E.locCount--;for(let H=I;H<E.locCount;H++)E.locs[H]=E.locs[H+1],E.locSpan[H]=E.locSpan[H+1];E.locs[E.locCount]=null;break}E.locSpans=0;for(let I=0;I<E.locCount;I++)E.locSpans|=E.locSpan[I]}}updateActiveOccluders(){let A=S.levelOccluderCount[S.topLevel],R=S.levelOccluders[S.topLevel];S.activeOccluderCount=0;for(let _=0;_<A;_++){let E=R[_];if(!E)continue;let I,H,N,O;if(E.type===1){if(I=E.minTileX+25-S.eyeTileX,I>=0&&I<=50){if(H=E.minTileZ+25-S.eyeTileZ,H<0)H=0;if(N=E.maxTileZ+25-S.eyeTileZ,N>50)N=50;let Q=!1;while(H<=N)if(S.visibilityMap&&S.visibilityMap[I][H++]){Q=!0;break}if(Q){if(O=S.eyeX-E.minX,O>32)E.mode=1;else{if(O>=-32)continue;E.mode=2,O=-O}E.minDeltaZ=(E.minZ-S.eyeZ<<8)/O|0,E.maxDeltaZ=(E.maxZ-S.eyeZ<<8)/O|0,E.minDeltaY=(E.minY-S.eyeY<<8)/O|0,E.maxDeltaY=(E.maxY-S.eyeY<<8)/O|0,S.activeOccluders[S.activeOccluderCount++]=E}}}else if(E.type===2){if(I=E.minTileZ+25-S.eyeTileZ,I>=0&&I<=50){if(H=E.minTileX+25-S.eyeTileX,H<0)H=0;if(N=E.maxTileX+25-S.eyeTileX,N>50)N=50;let Q=!1;while(H<=N)if(S.visibilityMap&&S.visibilityMap[H++][I]){Q=!0;break}if(Q){if(O=S.eyeZ-E.minZ,O>32)E.mode=3;else{if(O>=-32)continue;E.mode=4,O=-O}E.minDeltaX=(E.minX-S.eyeX<<8)/O|0,E.maxDeltaX=(E.maxX-S.eyeX<<8)/O|0,E.minDeltaY=(E.minY-S.eyeY<<8)/O|0,E.maxDeltaY=(E.maxY-S.eyeY<<8)/O|0,S.activeOccluders[S.activeOccluderCount++]=E}}}else if(E.type===4){if(I=E.minY-S.eyeY,I>128){if(H=E.minTileZ+25-S.eyeTileZ,H<0)H=0;if(N=E.maxTileZ+25-S.eyeTileZ,N>50)N=50;if(H<=N){let Q=E.minTileX+25-S.eyeTileX;if(Q<0)Q=0;if(O=E.maxTileX+25-S.eyeTileX,O>50)O=50;let U=!1;A:for(let G=Q;G<=O;G++)for(let $=H;$<=N;$++)if(S.visibilityMap&&S.visibilityMap[G][$]){U=!0;break A}if(U)E.mode=5,E.minDeltaX=(E.minX-S.eyeX<<8)/I|0,E.maxDeltaX=(E.maxX-S.eyeX<<8)/I|0,E.minDeltaZ=(E.minZ-S.eyeZ<<8)/I|0,E.maxDeltaZ=(E.maxZ-S.eyeZ<<8)/I|0,S.activeOccluders[S.activeOccluderCount++]=E}}}}}drawTile(A,R,_){S.drawTileQueue.addTail(A);while(!0){let E;do if(E=S.drawTileQueue.removeHead(),!E)return;while(!E.update);let{x:I,z:H,groundLevel:N,occludeLevel:O}=E,Q=this.levelTiles[N];if(E.groundVisible){if(R){if(N>0){let B=this.levelTiles[N-1][I][H];if(B&&B.update)continue}if(I<=S.eyeTileX&&I>S.minDrawTileX){let B=Q[I-1][H];if(B&&B.update&&(B.groundVisible||(E.locSpans&1)===0))continue}if(I>=S.eyeTileX&&I<S.maxDrawTileX-1){let B=Q[I+1][H];if(B&&B.update&&(B.groundVisible||(E.locSpans&4)===0))continue}if(H<=S.eyeTileZ&&H>S.minDrawTileZ){let B=Q[I][H-1];if(B&&B.update&&(B.groundVisible||(E.locSpans&8)===0))continue}if(H>=S.eyeTileZ&&H<S.maxDrawTileZ-1){let B=Q[I][H+1];if(B&&B.update&&(B.groundVisible||(E.locSpans&2)===0))continue}}else R=!0;if(E.groundVisible=!1,E.bridge){let B=E.bridge;if(!B.underlay){if(B.overlay&&!this.tileVisible(0,I,H))this.drawTileOverlay(I,H,B.overlay,S.sinEyePitch,S.cosEyePitch,S.sinEyeYaw,S.cosEyeYaw)}else if(!this.tileVisible(0,I,H))this.drawTileUnderlay(B.underlay,0,I,H,S.sinEyePitch,S.cosEyePitch,S.sinEyeYaw,S.cosEyeYaw);let F=B.wall;if(F)F.modelA?.draw(0,S.sinEyePitch,S.cosEyePitch,S.sinEyeYaw,S.cosEyeYaw,F.x-S.eyeX,F.y-S.eyeY,F.z-S.eyeZ,F.typecode);for(let b=0;b<B.locCount;b++){let T=B.locs[b];if(T){let j=T.model;if(!j)j=T.entity?.draw(_)??null;j?.draw(T.yaw,S.sinEyePitch,S.cosEyePitch,S.sinEyeYaw,S.cosEyeYaw,T.x-S.eyeX,T.y-S.eyeY,T.z-S.eyeZ,T.typecode)}}}let G=!1;if(!E.underlay){if(E.overlay&&!this.tileVisible(O,I,H))G=!0,this.drawTileOverlay(I,H,E.overlay,S.sinEyePitch,S.cosEyePitch,S.sinEyeYaw,S.cosEyeYaw)}else if(!this.tileVisible(O,I,H))G=!0,this.drawTileUnderlay(E.underlay,O,I,H,S.sinEyePitch,S.cosEyePitch,S.sinEyeYaw,S.cosEyeYaw);let $=0,L=0,J=E.wall,q=E.wallDecoration;if(J||q){if(S.eyeTileX===I)$+=1;else if(S.eyeTileX<I)$+=2;if(S.eyeTileZ===H)$+=3;else if(S.eyeTileZ>H)$+=6;L=S.FRONT_WALL_TYPES[$],E.backWallTypes=S.BACK_WALL_TYPES[$]}if(J){if((J.typeA&S.DIRECTION_ALLOW_WALL_CORNER_TYPE[$])===0)E.checkLocSpans=0;else if(J.typeA===16)E.checkLocSpans=3,E.blockLocSpans=S.WALL_CORNER_TYPE_16_BLOCK_LOC_SPANS[$],E.inverseBlockLocSpans=3-E.blockLocSpans;else if(J.typeA===32)E.checkLocSpans=6,E.blockLocSpans=S.WALL_CORNER_TYPE_32_BLOCK_LOC_SPANS[$],E.inverseBlockLocSpans=6-E.blockLocSpans;else if(J.typeA===64)E.checkLocSpans=12,E.blockLocSpans=S.WALL_CORNER_TYPE_64_BLOCK_LOC_SPANS[$],E.inverseBlockLocSpans=12-E.blockLocSpans;else E.checkLocSpans=9,E.blockLocSpans=S.WALL_CORNER_TYPE_128_BLOCK_LOC_SPANS[$],E.inverseBlockLocSpans=9-E.blockLocSpans;if((J.typeA&L)!==0&&!this.wallVisible(O,I,H,J.typeA))J.modelA?.draw(0,S.sinEyePitch,S.cosEyePitch,S.sinEyeYaw,S.cosEyeYaw,J.x-S.eyeX,J.y-S.eyeY,J.z-S.eyeZ,J.typecode);if((J.typeB&L)!==0&&!this.wallVisible(O,I,H,J.typeB))J.modelB?.draw(0,S.sinEyePitch,S.cosEyePitch,S.sinEyeYaw,S.cosEyeYaw,J.x-S.eyeX,J.y-S.eyeY,J.z-S.eyeZ,J.typecode)}if(q&&!this.visible(O,I,H,q.model.maxY)){if((q.decorType&L)!==0)q.model.draw(q.decorAngle,S.sinEyePitch,S.cosEyePitch,S.sinEyeYaw,S.cosEyeYaw,q.x-S.eyeX,q.y-S.eyeY,q.z-S.eyeZ,q.typecode);else if((q.decorType&768)!==0){let B=q.x-S.eyeX,F=q.y-S.eyeY,b=q.z-S.eyeZ,T=q.decorAngle,j;if(T===1||T===2)j=-B;else j=B;let w;if(T===2||T===3)w=-b;else w=b;if((q.decorType&256)!==0&&w<j){let Z=B+S.WALL_DECORATION_INSET_X[T],W=b+S.WALL_DECORATION_INSET_Z[T];q.model.draw(T*512+256,S.sinEyePitch,S.cosEyePitch,S.sinEyeYaw,S.cosEyeYaw,Z,F,W,q.typecode)}if((q.decorType&512)!==0&&w>j){let Z=B+S.WALL_DECORATION_OUTSET_X[T],W=b+S.WALL_DECORATION_OUTSET_Z[T];q.model.draw(T*512+1280&2047,S.sinEyePitch,S.cosEyePitch,S.sinEyeYaw,S.cosEyeYaw,Z,F,W,q.typecode)}}}if(G){let B=E.groundDecoration;if(B)B.model?.draw(0,S.sinEyePitch,S.cosEyePitch,S.sinEyeYaw,S.cosEyeYaw,B.x-S.eyeX,B.y-S.eyeY,B.z-S.eyeZ,B.typecode);let F=E.objStack;if(F&&F.offset===0){if(F.bottomObj)F.bottomObj.draw(0,S.sinEyePitch,S.cosEyePitch,S.sinEyeYaw,S.cosEyeYaw,F.x-S.eyeX,F.y-S.eyeY,F.z-S.eyeZ,F.typecode);if(F.middleObj)F.middleObj.draw(0,S.sinEyePitch,S.cosEyePitch,S.sinEyeYaw,S.cosEyeYaw,F.x-S.eyeX,F.y-S.eyeY,F.z-S.eyeZ,F.typecode);if(F.topObj)F.topObj.draw(0,S.sinEyePitch,S.cosEyePitch,S.sinEyeYaw,S.cosEyeYaw,F.x-S.eyeX,F.y-S.eyeY,F.z-S.eyeZ,F.typecode)}}let V=E.locSpans;if(V!==0){if(I<S.eyeTileX&&(V&4)!==0){let B=Q[I+1][H];if(B&&B.update)S.drawTileQueue.addTail(B)}if(H<S.eyeTileZ&&(V&2)!==0){let B=Q[I][H+1];if(B&&B.update)S.drawTileQueue.addTail(B)}if(I>S.eyeTileX&&(V&1)!==0){let B=Q[I-1][H];if(B&&B.update)S.drawTileQueue.addTail(B)}if(H>S.eyeTileZ&&(V&8)!==0){let B=Q[I][H-1];if(B&&B.update)S.drawTileQueue.addTail(B)}}}if(E.checkLocSpans!==0){let G=!0;for(let $=0;$<E.locCount;$++){let L=E.locs[$];if(!L)continue;if(L.cycle!==S.cycle&&(E.locSpan[$]&E.checkLocSpans)===E.blockLocSpans){G=!1;break}}if(G){let $=E.wall;if($&&!this.wallVisible(O,I,H,$.typeA))$.modelA?.draw(0,S.sinEyePitch,S.cosEyePitch,S.sinEyeYaw,S.cosEyeYaw,$.x-S.eyeX,$.y-S.eyeY,$.z-S.eyeZ,$.typecode);E.checkLocSpans=0}}if(E.containsLocs){let G=E.locCount;E.containsLocs=!1;let $=0;A:for(let L=0;L<G;L++){let J=E.locs[L];if(!J||J.cycle===S.cycle)continue;for(let b=J.minSceneTileX;b<=J.maxSceneTileX;b++)for(let T=J.minSceneTileZ;T<=J.maxSceneTileZ;T++){let j=Q[b][T];if(!j)continue;if(!j.groundVisible){if(j.checkLocSpans===0)continue;let w=0;if(b>J.minSceneTileX)w+=1;if(b<J.maxSceneTileX)w+=4;if(T>J.minSceneTileZ)w+=8;if(T<J.maxSceneTileZ)w+=2;if((w&j.checkLocSpans)!==E.inverseBlockLocSpans)continue}E.containsLocs=!0;continue A}S.locBuffer[$++]=J;let q=S.eyeTileX-J.minSceneTileX,V=J.maxSceneTileX-S.eyeTileX;if(V>q)q=V;let B=S.eyeTileZ-J.minSceneTileZ,F=J.maxSceneTileZ-S.eyeTileZ;if(F>B)J.distance=q+F;else J.distance=q+B}while(!0){let L=-50,J=-1;for(let V=0;V<$;V++){let B=S.locBuffer[V];if(!B)continue;if(B.cycle!==S.cycle){if(B.distance>L)L=B.distance,J=V}}if(J===-1)break;let q=S.locBuffer[J];if(q){q.cycle=S.cycle;let V=q.model;if(!V)V=q.entity?.draw(_)??null;if(V&&!this.locVisible(O,q.minSceneTileX,q.maxSceneTileX,q.minSceneTileZ,q.maxSceneTileZ,V.maxY))V.draw(q.yaw,S.sinEyePitch,S.cosEyePitch,S.sinEyeYaw,S.cosEyeYaw,q.x-S.eyeX,q.y-S.eyeY,q.z-S.eyeZ,q.typecode);for(let B=q.minSceneTileX;B<=q.maxSceneTileX;B++)for(let F=q.minSceneTileZ;F<=q.maxSceneTileZ;F++){let b=Q[B][F];if(!b)continue;if(b.checkLocSpans!==0)S.drawTileQueue.addTail(b);else if((B!==I||F!==H)&&b.update)S.drawTileQueue.addTail(b)}}}if(E.containsLocs)continue}if(!E.update||E.checkLocSpans!==0)continue;if(I<=S.eyeTileX&&I>S.minDrawTileX){let G=Q[I-1][H];if(G&&G.update)continue}if(I>=S.eyeTileX&&I<S.maxDrawTileX-1){let G=Q[I+1][H];if(G&&G.update)continue}if(H<=S.eyeTileZ&&H>S.minDrawTileZ){let G=Q[I][H-1];if(G&&G.update)continue}if(H>=S.eyeTileZ&&H<S.maxDrawTileZ-1){let G=Q[I][H+1];if(G&&G.update)continue}E.update=!1,S.tilesRemaining--;let U=E.objStack;if(U&&U.offset!==0){if(U.bottomObj)U.bottomObj.draw(0,S.sinEyePitch,S.cosEyePitch,S.sinEyeYaw,S.cosEyeYaw,U.x-S.eyeX,U.y-S.eyeY-U.offset,U.z-S.eyeZ,U.typecode);if(U.middleObj)U.middleObj.draw(0,S.sinEyePitch,S.cosEyePitch,S.sinEyeYaw,S.cosEyeYaw,U.x-S.eyeX,U.y-S.eyeY-U.offset,U.z-S.eyeZ,U.typecode);if(U.topObj)U.topObj.draw(0,S.sinEyePitch,S.cosEyePitch,S.sinEyeYaw,S.cosEyeYaw,U.x-S.eyeX,U.y-S.eyeY-U.offset,U.z-S.eyeZ,U.typecode)}if(E.backWallTypes!==0){let G=E.wallDecoration;if(G&&!this.visible(O,I,H,G.model.maxY)){if((G.decorType&E.backWallTypes)!==0)G.model.draw(G.decorAngle,S.sinEyePitch,S.cosEyePitch,S.sinEyeYaw,S.cosEyeYaw,G.x-S.eyeX,G.y-S.eyeY,G.z-S.eyeZ,G.typecode);else if((G.decorType&768)!==0){let L=G.x-S.eyeX,J=G.y-S.eyeY,q=G.z-S.eyeZ,V=G.decorAngle,B;if(V===1||V===2)B=-L;else B=L;let F;if(V===2||V===3)F=-q;else F=q;if((G.decorType&256)!==0&&F>=B){let b=L+S.WALL_DECORATION_INSET_X[V],T=q+S.WALL_DECORATION_INSET_Z[V];G.model.draw(V*512+256,S.sinEyePitch,S.cosEyePitch,S.sinEyeYaw,S.cosEyeYaw,b,J,T,G.typecode)}if((G.decorType&512)!==0&&F<=B){let b=L+S.WALL_DECORATION_OUTSET_X[V],T=q+S.WALL_DECORATION_OUTSET_Z[V];G.model.draw(V*512+1280&2047,S.sinEyePitch,S.cosEyePitch,S.sinEyeYaw,S.cosEyeYaw,b,J,T,G.typecode)}}}let $=E.wall;if($){if(($.typeB&E.backWallTypes)!==0&&!this.wallVisible(O,I,H,$.typeB))$.modelB?.draw(0,S.sinEyePitch,S.cosEyePitch,S.sinEyeYaw,S.cosEyeYaw,$.x-S.eyeX,$.y-S.eyeY,$.z-S.eyeZ,$.typecode);if(($.typeA&E.backWallTypes)!==0&&!this.wallVisible(O,I,H,$.typeA))$.modelA?.draw(0,S.sinEyePitch,S.cosEyePitch,S.sinEyeYaw,S.cosEyeYaw,$.x-S.eyeX,$.y-S.eyeY,$.z-S.eyeZ,$.typecode)}}if(N<this.maxLevel-1){let G=this.levelTiles[N+1][I][H];if(G&&G.update)S.drawTileQueue.addTail(G)}if(I<S.eyeTileX){let G=Q[I+1][H];if(G&&G.update)S.drawTileQueue.addTail(G)}if(H<S.eyeTileZ){let G=Q[I][H+1];if(G&&G.update)S.drawTileQueue.addTail(G)}if(I>S.eyeTileX){let G=Q[I-1][H];if(G&&G.update)S.drawTileQueue.addTail(G)}if(H>S.eyeTileZ){let G=Q[I][H-1];if(G&&G.update)S.drawTileQueue.addTail(G)}}}drawTileUnderlay(A,R,_,E,I,H,N,O){let Q=C.drawTileUnderlay(this,A,R,_,E),U,G=U=(_<<7)-S.eyeX,$,L=$=(E<<7)-S.eyeZ,J,q=J=G+128,V,B=V=L+128,F=this.levelHeightmaps[R][_][E]-S.eyeY,b=this.levelHeightmaps[R][_+1][E]-S.eyeY,T=this.levelHeightmaps[R][_+1][E+1]-S.eyeY,j=this.levelHeightmaps[R][_][E+1]-S.eyeY,w=L*N+G*O>>16;if(L=L*O-G*N>>16,G=w,w=F*H-L*I>>16,L=F*I+L*H>>16,F=w,L<50)return;if(w=$*N+q*O>>16,$=$*O-q*N>>16,q=w,w=b*H-$*I>>16,$=b*I+$*H>>16,b=w,$<50)return;if(w=B*N+J*O>>16,B=B*O-J*N>>16,J=w,w=T*H-B*I>>16,B=T*I+B*H>>16,T=w,B<50)return;if(w=V*N+U*O>>16,V=V*O-U*N>>16,U=w,w=j*H-V*I>>16,V=j*I+V*H>>16,j=w,V<50)return;let Z=m.centerX+((G<<9)/L|0),W=m.centerY+((F<<9)/L|0),Y=m.centerX+((q<<9)/$|0),u=m.centerY+((b<<9)/$|0),h=m.centerX+((J<<9)/B|0),n=m.centerY+((T<<9)/B|0),X=m.centerX+((U<<9)/V|0),f=m.centerY+((j<<9)/V|0);if(m.alpha=0,(h-X)*(u-f)-(n-f)*(Y-X)>0){if(m.clipX=h<0||X<0||Y<0||h>k.boundX||X>k.boundX||Y>k.boundX,S.takingInput&&this.pointInsideTriangle(S.mouseX,S.mouseY,n,f,u,h,X,Y))S.clickTileX=_,S.clickTileZ=E;if(!Q)if(A.textureId===-1){if(A.northeastColor!==12345678)m.fillGouraudTriangle(h,X,Y,n,f,u,A.northeastColor,A.northwestColor,A.southeastColor)}else if(S.lowMemory){let g=S.TEXTURE_HSL[A.textureId];m.fillGouraudTriangle(h,X,Y,n,f,u,this.mulLightness(g,A.northeastColor),this.mulLightness(g,A.northwestColor),this.mulLightness(g,A.southeastColor))}else if(A.flat)m.fillTexturedTriangle(h,X,Y,n,f,u,A.northeastColor,A.northwestColor,A.southeastColor,G,F,L,q,U,b,j,$,V,A.textureId);else m.fillTexturedTriangle(h,X,Y,n,f,u,A.northeastColor,A.northwestColor,A.southeastColor,J,T,B,U,q,j,b,V,$,A.textureId)}if((Z-Y)*(f-u)-(W-u)*(X-Y)<=0)return;if(m.clipX=Z<0||Y<0||X<0||Z>k.boundX||Y>k.boundX||X>k.boundX,S.takingInput&&this.pointInsideTriangle(S.mouseX,S.mouseY,W,u,f,Z,Y,X))S.clickTileX=_,S.clickTileZ=E;if(!Q){if(A.textureId!==-1){if(!S.lowMemory){m.fillTexturedTriangle(Z,Y,X,W,u,f,A.southwestColor,A.southeastColor,A.northwestColor,G,F,L,q,U,b,j,$,V,A.textureId);return}let g=S.TEXTURE_HSL[A.textureId];m.fillGouraudTriangle(Z,Y,X,W,u,f,this.mulLightness(g,A.southwestColor),this.mulLightness(g,A.southeastColor),this.mulLightness(g,A.northwestColor))}else if(A.southwestColor!==12345678)m.fillGouraudTriangle(Z,Y,X,W,u,f,A.southwestColor,A.southeastColor,A.northwestColor)}}drawTileOverlay(A,R,_,E,I,H,N){let O=_.vertexX.length;for(let U=0;U<O;U++){let G=_.vertexX[U]-S.eyeX,$=_.vertexY[U]-S.eyeY,L=_.vertexZ[U]-S.eyeZ,J=L*H+G*N>>16;if(L=L*N-G*H>>16,G=J,J=$*I-L*E>>16,L=$*E+L*I>>16,$=J,L<50)return;if(_.triangleTextureIds)a.tmpViewspaceX[U]=G,a.tmpViewspaceY[U]=$,a.tmpViewspaceZ[U]=L;a.tmpScreenX[U]=m.centerX+((G<<9)/L|0),a.tmpScreenY[U]=m.centerY+(($<<9)/L|0)}let Q=C.drawTileOverlay(this,_,A,R);m.alpha=0,O=_.triangleVertexA.length;for(let U=0;U<O;U++){let G=_.triangleVertexA[U],$=_.triangleVertexB[U],L=_.triangleVertexC[U],J=a.tmpScreenX[G],q=a.tmpScreenX[$],V=a.tmpScreenX[L],B=a.tmpScreenY[G],F=a.tmpScreenY[$],b=a.tmpScreenY[L];if((J-q)*(b-F)-(B-F)*(V-q)>0){if(m.clipX=J<0||q<0||V<0||J>k.boundX||q>k.boundX||V>k.boundX,S.takingInput&&this.pointInsideTriangle(S.mouseX,S.mouseY,B,F,b,J,q,V))S.clickTileX=A,S.clickTileZ=R;if(Q)continue;if(!_.triangleTextureIds||_.triangleTextureIds[U]===-1){if(_.triangleColorA[U]!==12345678)m.fillGouraudTriangle(J,q,V,B,F,b,_.triangleColorA[U],_.triangleColorB[U],_.triangleColorC[U])}else if(S.lowMemory){let T=S.TEXTURE_HSL[_.triangleTextureIds[U]];m.fillGouraudTriangle(J,q,V,B,F,b,this.mulLightness(T,_.triangleColorA[U]),this.mulLightness(T,_.triangleColorB[U]),this.mulLightness(T,_.triangleColorC[U]))}else if(_.flat)m.fillTexturedTriangle(J,q,V,B,F,b,_.triangleColorA[U],_.triangleColorB[U],_.triangleColorC[U],a.tmpViewspaceX[0],a.tmpViewspaceY[0],a.tmpViewspaceZ[0],a.tmpViewspaceX[1],a.tmpViewspaceX[3],a.tmpViewspaceY[1],a.tmpViewspaceY[3],a.tmpViewspaceZ[1],a.tmpViewspaceZ[3],_.triangleTextureIds[U]);else m.fillTexturedTriangle(J,q,V,B,F,b,_.triangleColorA[U],_.triangleColorB[U],_.triangleColorC[U],a.tmpViewspaceX[G],a.tmpViewspaceY[G],a.tmpViewspaceZ[G],a.tmpViewspaceX[$],a.tmpViewspaceX[L],a.tmpViewspaceY[$],a.tmpViewspaceY[L],a.tmpViewspaceZ[$],a.tmpViewspaceZ[L],_.triangleTextureIds[U])}}}tileVisible(A,R,_){let E=this.levelTileOcclusionCycles[A][R][_];if(E===-S.cycle)return!1;else if(E===S.cycle)return!0;else{let I=R<<7,H=_<<7;if(this.occluded(I+1,this.levelHeightmaps[A][R][_],H+1)&&this.occluded(I+128-1,this.levelHeightmaps[A][R+1][_],H+1)&&this.occluded(I+128-1,this.levelHeightmaps[A][R+1][_+1],H+128-1)&&this.occluded(I+1,this.levelHeightmaps[A][R][_+1],H+128-1))return this.levelTileOcclusionCycles[A][R][_]=S.cycle,!0;else return this.levelTileOcclusionCycles[A][R][_]=-S.cycle,!1}}wallVisible(A,R,_,E){if(!this.tileVisible(A,R,_))return!1;let I=R<<7,H=_<<7,N=this.levelHeightmaps[A][R][_]-1,O=N-120,Q=N-230,U=N-238;if(E<16){if(E===1){if(I>S.eyeX){if(!this.occluded(I,N,H))return!1;if(!this.occluded(I,N,H+128))return!1}if(A>0){if(!this.occluded(I,O,H))return!1;if(!this.occluded(I,O,H+128))return!1}if(!this.occluded(I,Q,H))return!1;return this.occluded(I,Q,H+128)}if(E===2){if(H<S.eyeZ){if(!this.occluded(I,N,H+128))return!1;if(!this.occluded(I+128,N,H+128))return!1}if(A>0){if(!this.occluded(I,O,H+128))return!1;if(!this.occluded(I+128,O,H+128))return!1}if(!this.occluded(I,Q,H+128))return!1;return this.occluded(I+128,Q,H+128)}if(E===4){if(I<S.eyeX){if(!this.occluded(I+128,N,H))return!1;if(!this.occluded(I+128,N,H+128))return!1}if(A>0){if(!this.occluded(I+128,O,H))return!1;if(!this.occluded(I+128,O,H+128))return!1}if(!this.occluded(I+128,Q,H))return!1;return this.occluded(I+128,Q,H+128)}if(E===8){if(H>S.eyeZ){if(!this.occluded(I,N,H))return!1;if(!this.occluded(I+128,N,H))return!1}if(A>0){if(!this.occluded(I,O,H))return!1;if(!this.occluded(I+128,O,H))return!1}if(!this.occluded(I,Q,H))return!1;return this.occluded(I+128,Q,H)}}if(!this.occluded(I+64,U,H+64))return!1;else if(E===16)return this.occluded(I,Q,H+128);else if(E===32)return this.occluded(I+128,Q,H+128);else if(E===64)return this.occluded(I+128,Q,H);else if(E===128)return this.occluded(I,Q,H);return!0}visible(A,R,_,E){if(this.tileVisible(A,R,_)){let I=R<<7,H=_<<7;return this.occluded(I+1,this.levelHeightmaps[A][R][_]-E,H+1)&&this.occluded(I+128-1,this.levelHeightmaps[A][R+1][_]-E,H+1)&&this.occluded(I+128-1,this.levelHeightmaps[A][R+1][_+1]-E,H+128-1)&&this.occluded(I+1,this.levelHeightmaps[A][R][_+1]-E,H+128-1)}return!1}locVisible(A,R,_,E,I,H){let N,O;if(R!==_||E!==I){for(N=R;N<=_;N++)for(O=E;O<=I;O++)if(this.levelTileOcclusionCycles[A][N][O]===-S.cycle)return!1;O=(R<<7)+1;let Q=(E<<7)+2,U=this.levelHeightmaps[A][R][E]-H;if(!this.occluded(O,U,Q))return!1;let G=(_<<7)-1;if(!this.occluded(G,U,Q))return!1;let $=(I<<7)-1;if(!this.occluded(O,U,$))return!1;else return this.occluded(G,U,$)}else if(this.tileVisible(A,R,E))return N=R<<7,O=E<<7,this.occluded(N+1,this.levelHeightmaps[A][R][E]-H,O+1)&&this.occluded(N+128-1,this.levelHeightmaps[A][R+1][E]-H,O+1)&&this.occluded(N+128-1,this.levelHeightmaps[A][R+1][E+1]-H,O+128-1)&&this.occluded(N+1,this.levelHeightmaps[A][R][E+1]-H,O+128-1);return!1}occluded(A,R,_){for(let E=0;E<S.activeOccluderCount;E++){let I=S.activeOccluders[E];if(!I)continue;if(I.mode===1){let H=I.minX-A;if(H>0){let N=I.minZ+(I.minDeltaZ*H>>8),O=I.maxZ+(I.maxDeltaZ*H>>8),Q=I.minY+(I.minDeltaY*H>>8),U=I.maxY+(I.maxDeltaY*H>>8);if(_>=N&&_<=O&&R>=Q&&R<=U)return!0}}else if(I.mode===2){let H=A-I.minX;if(H>0){let N=I.minZ+(I.minDeltaZ*H>>8),O=I.maxZ+(I.maxDeltaZ*H>>8),Q=I.minY+(I.minDeltaY*H>>8),U=I.maxY+(I.maxDeltaY*H>>8);if(_>=N&&_<=O&&R>=Q&&R<=U)return!0}}else if(I.mode===3){let H=I.minZ-_;if(H>0){let N=I.minX+(I.minDeltaX*H>>8),O=I.maxX+(I.maxDeltaX*H>>8),Q=I.minY+(I.minDeltaY*H>>8),U=I.maxY+(I.maxDeltaY*H>>8);if(A>=N&&A<=O&&R>=Q&&R<=U)return!0}}else if(I.mode===4){let H=_-I.minZ;if(H>0){let N=I.minX+(I.minDeltaX*H>>8),O=I.maxX+(I.maxDeltaX*H>>8),Q=I.minY+(I.minDeltaY*H>>8),U=I.maxY+(I.maxDeltaY*H>>8);if(A>=N&&A<=O&&R>=Q&&R<=U)return!0}}else if(I.mode===5){let H=R-I.minY;if(H>0){let N=I.minX+(I.minDeltaX*H>>8),O=I.maxX+(I.maxDeltaX*H>>8),Q=I.minZ+(I.minDeltaZ*H>>8),U=I.maxZ+(I.maxDeltaZ*H>>8);if(A>=N&&A<=O&&_>=Q&&_<=U)return!0}}}return!1}pointInsideTriangle(A,R,_,E,I,H,N,O){if(R<_&&R<E&&R<I)return!1;else if(R>_&&R>E&&R>I)return!1;else if(A<H&&A<N&&A<O)return!1;else if(A>H&&A>N&&A>O)return!1;let Q=(R-_)*(N-H)-(A-H)*(E-_),U=(R-I)*(H-O)-(A-O)*(_-I),G=(R-E)*(O-N)-(A-N)*(I-E);return Q*G>0&&G*U>0}mulLightness(A,R){if(R=(127-R)*(A&127)/160|0,R<2)R=2;else if(R>126)R=126;return(A&65408)+R}}class Q0 extends k0{heightmapSW;heightmapSE;heightmapNE;heightmapNW;index;seq;seqFrame;seqCycle;constructor(A,R,_,E,I,H,N){super();if(this.heightmapSW=R,this.heightmapSE=_,this.heightmapNE=E,this.heightmapNW=I,this.index=A,this.seq=H,N&&H.replayoff!==-1&&this.seq.seqDelay)this.seqFrame=Math.random()*this.seq.seqFrameCount|0,this.seqCycle=Math.random()*this.seq.seqDelay[this.seqFrame]|0;else this.seqFrame=-1,this.seqCycle=0}}class l{static ROTATION_WALL_TYPE=Int8Array.of(1,2,4,8);static ROTATION_WALL_CORNER_TYPE=Uint8Array.of(16,32,64,128);static WALL_DECORATION_ROTATION_FORWARD_X=Int8Array.of(1,0,-1,0);static WALL_DECORATION_ROTATION_FORWARD_Z=Int8Array.of(0,-1,0,1);static randomHueOffset=(Math.random()*17|0)-8;static randomLightnessOffset=(Math.random()*33|0)-16;static lowMemory=!0;static levelBuilt=0;static fullbright=!1;static perlin(A,R){let _=this.perlinScale(A+45365,R+91923,4)+(this.perlinScale(A+10294,R+37821,2)-128>>1)+(this.perlinScale(A,R,1)-128>>2)-128;if(_=(_*0.3|0)+35,_<10)_=10;else if(_>60)_=60;return _}static perlinScale(A,R,_){let E=A/_|0,I=A&_-1,H=R/_|0,N=R&_-1,O=this.smoothNoise(E,H),Q=this.smoothNoise(E+1,H),U=this.smoothNoise(E,H+1),G=this.smoothNoise(E+1,H+1),$=this.interpolate(O,Q,I,_),L=this.interpolate(U,G,I,_);return this.interpolate($,L,N,_)}static interpolate(A,R,_,E){let I=65536-m.cos[_*1024/E|0]>>1;return(A*(65536-I)>>16)+(R*I>>16)}static smoothNoise(A,R){let _=this.noise(A-1,R-1)+this.noise(A+1,R-1)+this.noise(A-1,R+1)+this.noise(A+1,R+1),E=this.noise(A-1,R)+this.noise(A+1,R)+this.noise(A,R-1)+this.noise(A,R+1),I=this.noise(A,R);return(_/16|0)+(E/8|0)+(I/4|0)}static noise(A,R){let _=A+R*57,E=BigInt(_<<13^_);return Number((E*(E*E*15731n+789221n)+1376312589n&0x7fffffffn)>>19n)&255}static addLoc(A,R,_,E,I,H,N,O,Q,U,G){let $=I[G][R][_],L=I[G][R+1][_],J=I[G][R+1][_+1],q=I[G][R][_+1],V=$+L+J+q>>2,B=J0.get(O),F=R+(_<<7)+(O<<14)+1073741824|0;if(!B.locActive)F+=-2147483648;F|=0;let b=((U<<6)+Q|0)<<24>>24;if(Q===D.GROUND_DECOR.id){if(E?.addGroundDecoration(B.getModel(D.GROUND_DECOR.id,U,$,L,J,q,-1),A,R,_,V,F,b),B.blockwalk&&B.locActive)N?.addFloor(R,_);if(B.anim!==-1)H.addTail(new Q0(O,A,3,R,_,c.instances[B.anim],!0))}else if(Q===D.CENTREPIECE_STRAIGHT.id||Q===D.CENTREPIECE_DIAGONAL.id){let T=B.getModel(D.CENTREPIECE_STRAIGHT.id,U,$,L,J,q,-1);if(T){let j=0;if(Q===D.CENTREPIECE_DIAGONAL.id)j+=256;let w,Z;if(U===1||U===3)w=B.length,Z=B.width;else w=B.width,Z=B.length;E?.addLoc(A,R,_,V,T,null,F,b,w,Z,j)}if(B.blockwalk)N?.addLoc(R,_,B.width,B.length,U,B.blockrange);if(B.anim!==-1)H.addTail(new Q0(O,A,2,R,_,c.instances[B.anim],!0))}else if(Q>=D.ROOF_STRAIGHT.id){if(E?.addLoc(A,R,_,V,B.getModel(Q,U,$,L,J,q,-1),null,F,b,1,1,0),B.blockwalk)N?.addLoc(R,_,B.width,B.length,U,B.blockrange);if(B.anim!==-1)H.addTail(new Q0(O,A,2,R,_,c.instances[B.anim],!0))}else if(Q===D.WALL_STRAIGHT.id){if(E?.addWall(A,R,_,V,l.ROTATION_WALL_TYPE[U],0,B.getModel(D.WALL_STRAIGHT.id,U,$,L,J,q,-1),null,F,b),B.blockwalk)N?.addWall(R,_,Q,U,B.blockrange);if(B.anim!==-1)H.addTail(new Q0(O,A,0,R,_,c.instances[B.anim],!0))}else if(Q===D.WALL_DIAGONAL_CORNER.id){if(E?.addWall(A,R,_,V,l.ROTATION_WALL_CORNER_TYPE[U],0,B.getModel(D.WALL_DIAGONAL_CORNER.id,U,$,L,J,q,-1),null,F,b),B.blockwalk)N?.addWall(R,_,Q,U,B.blockrange);if(B.anim!==-1)H.addTail(new Q0(O,A,0,R,_,c.instances[B.anim],!0))}else if(Q===D.WALL_L.id){let T=U+1&3;if(E?.addWall(A,R,_,V,l.ROTATION_WALL_TYPE[U],l.ROTATION_WALL_TYPE[T],B.getModel(D.WALL_L.id,U+4,$,L,J,q,-1),B.getModel(D.WALL_L.id,T,$,L,J,q,-1),F,b),B.blockwalk)N?.addWall(R,_,Q,U,B.blockrange);if(B.anim!==-1)H.addTail(new Q0(O,A,0,R,_,c.instances[B.anim],!0))}else if(Q===D.WALL_SQUARE_CORNER.id){if(E?.addWall(A,R,_,V,l.ROTATION_WALL_CORNER_TYPE[U],0,B.getModel(D.WALL_SQUARE_CORNER.id,U,$,L,J,q,-1),null,F,b),B.blockwalk)N?.addWall(R,_,Q,U,B.blockrange);if(B.anim!==-1)H.addTail(new Q0(O,A,0,R,_,c.instances[B.anim],!0))}else if(Q===D.WALL_DIAGONAL.id){if(E?.addLoc(A,R,_,V,B.getModel(Q,U,$,L,J,q,-1),null,F,b,1,1,0),B.blockwalk)N?.addLoc(R,_,B.width,B.length,U,B.blockrange);if(B.anim!==-1)H.addTail(new Q0(O,A,2,R,_,c.instances[B.anim],!0))}else if(Q===D.WALLDECOR_STRAIGHT_NOOFFSET.id){if(E?.setWallDecoration(A,R,_,V,0,0,F,B.getModel(D.WALLDECOR_STRAIGHT_NOOFFSET.id,0,$,L,J,q,-1),b,U*512,l.ROTATION_WALL_TYPE[U]),B.anim!==-1)H.addTail(new Q0(O,A,1,R,_,c.instances[B.anim],!0))}else if(Q===D.WALLDECOR_STRAIGHT_OFFSET.id){let T=16;if(E){let j=E.getWallTypecode(A,R,_);if(j>0)T=J0.get(j>>14&32767).wallwidth}if(E?.setWallDecoration(A,R,_,V,l.WALL_DECORATION_ROTATION_FORWARD_X[U]*T,l.WALL_DECORATION_ROTATION_FORWARD_Z[U]*T,F,B.getModel(D.WALLDECOR_STRAIGHT_NOOFFSET.id,0,$,L,J,q,-1),b,U*512,l.ROTATION_WALL_TYPE[U]),B.anim!==-1)H.addTail(new Q0(O,A,1,R,_,c.instances[B.anim],!0))}else if(Q===D.WALLDECOR_DIAGONAL_OFFSET.id){if(E?.setWallDecoration(A,R,_,V,0,0,F,B.getModel(D.WALLDECOR_STRAIGHT_NOOFFSET.id,0,$,L,J,q,-1),b,U,256),B.anim!==-1)H.addTail(new Q0(O,A,1,R,_,c.instances[B.anim],!0))}else if(Q===D.WALLDECOR_DIAGONAL_NOOFFSET.id){if(E?.setWallDecoration(A,R,_,V,0,0,F,B.getModel(D.WALLDECOR_STRAIGHT_NOOFFSET.id,0,$,L,J,q,-1),b,U,512),B.anim!==-1)H.addTail(new Q0(O,A,1,R,_,c.instances[B.anim],!0))}else if(Q===D.WALLDECOR_DIAGONAL_BOTH.id){if(E?.setWallDecoration(A,R,_,V,0,0,F,B.getModel(D.WALLDECOR_STRAIGHT_NOOFFSET.id,0,$,L,J,q,-1),b,U,768),B.anim!==-1)H.addTail(new Q0(O,A,1,R,_,c.instances[B.anim],!0))}}maxTileX;maxTileZ;levelHeightmap;levelTileFlags;levelTileUnderlayIds;levelTileOverlayIds;levelTileOverlayShape;levelTileOverlayRotation;levelShademap;levelLightmap;blendChroma;blendSaturation;blendLightness;blendLuminance;blendMagnitude;levelOccludemap;constructor(A,R,_,E){this.maxTileX=A,this.maxTileZ=R,this.levelHeightmap=_,this.levelTileFlags=E,this.levelTileUnderlayIds=new r0(4,A,R),this.levelTileOverlayIds=new r0(4,A,R),this.levelTileOverlayShape=new r0(4,A,R),this.levelTileOverlayRotation=new r0(4,A,R),this.levelOccludemap=new d0(4,A+1,R+1),this.levelShademap=new r0(4,A+1,R+1),this.levelLightmap=new M0(A+1,R+1),this.blendChroma=new Int32Array(R),this.blendSaturation=new Int32Array(R),this.blendLightness=new Int32Array(R),this.blendLuminance=new Int32Array(R),this.blendMagnitude=new Int32Array(R)}build(A,R){for(let _=0;_<4;_++)for(let E=0;E<104;E++)for(let I=0;I<104;I++)if((this.levelTileFlags[_][E][I]&1)===1){let H=_;if((this.levelTileFlags[1][E][I]&2)===2)H--;if(H>=0)R[H]?.addFloor(E,I)}if(l.randomHueOffset+=(Math.random()*5|0)-2,l.randomHueOffset<-8)l.randomHueOffset=-8;else if(l.randomHueOffset>8)l.randomHueOffset=8;if(l.randomLightnessOffset+=(Math.random()*5|0)-2,l.randomLightnessOffset<-16)l.randomLightnessOffset=-16;else if(l.randomLightnessOffset>16)l.randomLightnessOffset=16;for(let _=0;_<4;_++){let E=this.levelShademap[_],I=96,H=768,N=-50,O=-10,Q=-50,G=768*(Math.sqrt(5100)|0)>>8;for(let $=1;$<this.maxTileZ-1;$++)for(let L=1;L<this.maxTileX-1;L++){let J=this.levelHeightmap[_][L+1][$]-this.levelHeightmap[_][L-1][$],q=this.levelHeightmap[_][L][$+1]-this.levelHeightmap[_][L][$-1],V=Math.sqrt(J*J+q*q+65536)|0,B=(J<<8)/V|0,F=65536/V|0,b=(q<<8)/V|0,T=96+((-50*B+-10*F+-50*b)/G|0),j=(E[L-1][$]>>2)+(E[L+1][$]>>3)+(E[L][$-1]>>2)+(E[L][$+1]>>3)+(E[L][$]>>1);this.levelLightmap[L][$]=T-j}for(let $=0;$<this.maxTileZ;$++)this.blendChroma[$]=0,this.blendSaturation[$]=0,this.blendLightness[$]=0,this.blendLuminance[$]=0,this.blendMagnitude[$]=0;for(let $=-5;$<this.maxTileX+5;$++){for(let L=0;L<this.maxTileZ;L++){let J=$+5,q;if(J>=0&&J<this.maxTileX){let B=this.levelTileUnderlayIds[_][J][L]&255;if(B>0){let F=U0.instances[B-1];this.blendChroma[L]+=F.chroma,this.blendSaturation[L]+=F.saturation,this.blendLightness[L]+=F.lightness,this.blendLuminance[L]+=F.luminance,q=this.blendMagnitude[L]++}}let V=$-5;if(V>=0&&V<this.maxTileX){let B=this.levelTileUnderlayIds[_][V][L]&255;if(B>0){let F=U0.instances[B-1];this.blendChroma[L]-=F.chroma,this.blendSaturation[L]-=F.saturation,this.blendLightness[L]-=F.lightness,this.blendLuminance[L]-=F.luminance,q=this.blendMagnitude[L]--}}}if($>=1&&$<this.maxTileX-1){let L=0,J=0,q=0,V=0,B=0;for(let F=-5;F<this.maxTileZ+5;F++){let b=F+5;if(b>=0&&b<this.maxTileZ)L+=this.blendChroma[b],J+=this.blendSaturation[b],q+=this.blendLightness[b],V+=this.blendLuminance[b],B+=this.blendMagnitude[b];let T=F-5;if(T>=0&&T<this.maxTileZ)L-=this.blendChroma[T],J-=this.blendSaturation[T],q-=this.blendLightness[T],V-=this.blendLuminance[T],B-=this.blendMagnitude[T];if(F>=1&&F<this.maxTileZ-1&&(!l.lowMemory||(this.levelTileFlags[_][$][F]&16)===0&&this.getDrawLevel(_,$,F)===l.levelBuilt)){let j=this.levelTileUnderlayIds[_][$][F]&255,w=this.levelTileOverlayIds[_][$][F]&255;if(j>0||w>0){let Z=this.levelHeightmap[_][$][F],W=this.levelHeightmap[_][$+1][F],Y=this.levelHeightmap[_][$+1][F+1],u=this.levelHeightmap[_][$][F+1],h=this.levelLightmap[$][F],n=this.levelLightmap[$+1][F],X=this.levelLightmap[$+1][F+1],f=this.levelLightmap[$][F+1],g=-1,v=-1;if(j>0){let x=L*256/V|0,y=J/B|0,d=q/B|0;g=U0.hsl24to16(x,y,d);let A0=x+l.randomHueOffset&255;if(d+=l.randomLightnessOffset,d<0)d=0;else if(d>255)d=255;v=U0.hsl24to16(A0,y,d)}if(_>0){let x=j!==0||this.levelTileOverlayShape[_][$][F]===0;if(w>0&&!U0.instances[w-1].occlude)x=!1;if(x&&Z===W&&Z===Y&&Z===u)this.levelOccludemap[_][$][F]|=2340}let M=0;if(g!==-1)M=m.hslPal[U0.mulHSL(v,96)];if(w===0)A?.setTile(_,$,F,0,0,-1,Z,W,Y,u,U0.mulHSL(g,h),U0.mulHSL(g,n),U0.mulHSL(g,X),U0.mulHSL(g,f),0,0,0,0,M,0);else{let x=this.levelTileOverlayShape[_][$][F]+1,y=this.levelTileOverlayRotation[_][$][F],d=U0.instances[w-1],A0=d.overlayTexture,t,N0;if(A0>=0)N0=m.getAverageTextureRGB(A0),t=-1;else if(d.rgb===16711935)N0=0,t=-2,A0=-1;else t=U0.hsl24to16(d.hue,d.saturation,d.lightness),N0=m.hslPal[U0.adjustLightness(d.hsl,96)];A?.setTile(_,$,F,x,y,A0,Z,W,Y,u,U0.mulHSL(g,h),U0.mulHSL(g,n),U0.mulHSL(g,X),U0.mulHSL(g,f),U0.adjustLightness(t,h),U0.adjustLightness(t,n),U0.adjustLightness(t,X),U0.adjustLightness(t,f),M,N0)}}}}}}for(let $=1;$<this.maxTileZ-1;$++)for(let L=1;L<this.maxTileX-1;L++)A?.setDrawLevel(_,L,$,this.getDrawLevel(_,L,$))}if(!l.fullbright)A?.buildModels(64,768,-50,-10,-50);for(let _=0;_<this.maxTileX;_++)for(let E=0;E<this.maxTileZ;E++)if((this.levelTileFlags[1][_][E]&2)===2)A?.setBridge(_,E);if(!l.fullbright){let _=1,E=2,I=4;for(let H=0;H<4;H++){if(H>0)_<<=3,E<<=3,I<<=3;for(let N=0;N<=H;N++)for(let O=0;O<=this.maxTileZ;O++)for(let Q=0;Q<=this.maxTileX;Q++){if((this.levelOccludemap[N][Q][O]&_)!==0){let U=O,G=O,$=N,L=N;while(U>0&&(this.levelOccludemap[N][Q][U-1]&_)!==0)U--;while(G<this.maxTileZ&&(this.levelOccludemap[N][Q][G+1]&_)!==0)G++;A:while($>0){for(let q=U;q<=G;q++)if((this.levelOccludemap[$-1][Q][q]&_)===0)break A;$--}A:while(L<H){for(let q=U;q<=G;q++)if((this.levelOccludemap[L+1][Q][q]&_)===0)break A;L++}if((L+1-$)*(G+1-U)>=8){let q=this.levelHeightmap[L][Q][U]-240,V=this.levelHeightmap[$][Q][U];S.addOccluder(H,1,Q*128,q,U*128,Q*128,V,G*128+128);for(let B=$;B<=L;B++)for(let F=U;F<=G;F++)this.levelOccludemap[B][Q][F]&=~_}}if((this.levelOccludemap[N][Q][O]&E)!==0){let U=Q,G=Q,$=N,L=N;while(U>0&&(this.levelOccludemap[N][U-1][O]&E)!==0)U--;while(G<this.maxTileX&&(this.levelOccludemap[N][G+1][O]&E)!==0)G++;A:while($>0){for(let q=U;q<=G;q++)if((this.levelOccludemap[$-1][q][O]&E)===0)break A;$--}A:while(L<H){for(let q=U;q<=G;q++)if((this.levelOccludemap[L+1][q][O]&E)===0)break A;L++}if((L+1-$)*(G+1-U)>=8){let q=this.levelHeightmap[L][U][O]-240,V=this.levelHeightmap[$][U][O];S.addOccluder(H,2,U*128,q,O*128,G*128+128,V,O*128);for(let B=$;B<=L;B++)for(let F=U;F<=G;F++)this.levelOccludemap[B][F][O]&=~E}}if((this.levelOccludemap[N][Q][O]&I)!==0){let U=Q,G=Q,$=O,L=O;while($>0&&(this.levelOccludemap[N][Q][$-1]&I)!==0)$--;while(L<this.maxTileZ&&(this.levelOccludemap[N][Q][L+1]&I)!==0)L++;A:while(U>0){for(let J=$;J<=L;J++)if((this.levelOccludemap[N][U-1][J]&I)===0)break A;U--}A:while(G<this.maxTileX){for(let J=$;J<=L;J++)if((this.levelOccludemap[N][G+1][J]&I)===0)break A;G++}if((G+1-U)*(L+1-$)>=4){let J=this.levelHeightmap[N][U][$];S.addOccluder(H,4,U*128,J,$*128,G*128+128,J,L*128+128);for(let q=U;q<=G;q++)for(let V=$;V<=L;V++)this.levelOccludemap[N][q][V]&=~I}}}}}}clearLandscape(A,R,_,E){let I=0;for(let H=0;H<U0.totalCount;H++)if(U0.instances[H].debugname?.toLowerCase()==="water"){I=H+1<<24>>24;break}for(let H=A;H<A+_;H++)for(let N=R;N<R+E;N++)if(N>=0&&N<this.maxTileX&&H>=0&&H<this.maxTileZ){this.levelTileOverlayIds[0][N][H]=I;for(let O=0;O<4;O++)this.levelHeightmap[O][N][H]=0,this.levelTileFlags[O][N][H]=0}}readLandscape(A,R,_,E,I){let H=new s(I);for(let N=0;N<4;N++)for(let O=0;O<64;O++)for(let Q=0;Q<64;Q++){let U=O+_,G=Q+E,$;if(U>=0&&U<104&&G>=0&&G<104){this.levelTileFlags[N][U][G]=0;while(!0){if($=H.g1(),$===0){if(N===0)this.levelHeightmap[0][U][G]=-l.perlin(U+A+932731,G+556238+R)*8;else this.levelHeightmap[N][U][G]=this.levelHeightmap[N-1][U][G]-240;break}if($===1){let L=H.g1();if(L===1)L=0;if(N===0)this.levelHeightmap[0][U][G]=-L*8;else this.levelHeightmap[N][U][G]=this.levelHeightmap[N-1][U][G]-L*8;break}if($<=49)this.levelTileOverlayIds[N][U][G]=H.g1b(),this.levelTileOverlayShape[N][U][G]=(($-2)/4|0)<<24>>24,this.levelTileOverlayRotation[N][U][G]=($-2&3)<<24>>24;else if($<=81)this.levelTileFlags[N][U][G]=$-49<<24>>24;else this.levelTileUnderlayIds[N][U][G]=$-81<<24>>24}}else while(!0){if($=H.g1(),$===0)break;if($===1){H.g1();break}if($<=49)H.g1()}}}readLocs(A,R,_,E,I,H){let N=new s(E),O=-1;while(!0){let Q=N.gsmarts();if(Q===0)return;O+=Q;let U=0;while(!0){let G=N.gsmarts();if(G===0)break;U+=G-1;let $=U&63,L=U>>6&63,J=U>>12,q=N.g1(),V=q>>2,B=q&3,F=L+I,b=$+H;if(F>0&&b>0&&F<104-1&&b<104-1){let T=J;if((this.levelTileFlags[1][F][b]&2)===2)T=J-1;let j=null;if(T>=0)j=_[T];this.addLoc(J,F,b,A,R,j,O,V,B)}}}}addLoc(A,R,_,E,I,H,N,O,Q){if(l.lowMemory){if((this.levelTileFlags[A][R][_]&16)!==0)return;if(this.getDrawLevel(A,R,_)!==l.levelBuilt)return}let U=this.levelHeightmap[A][R][_],G=this.levelHeightmap[A][R+1][_],$=this.levelHeightmap[A][R+1][_+1],L=this.levelHeightmap[A][R][_+1],J=U+G+$+L>>2,q=J0.get(N),V=R+(_<<7)+(N<<14)+1073741824|0;if(!q.locActive)V+=-2147483648;V|=0;let B=((Q<<6)+O|0)<<24>>24;if(O===D.GROUND_DECOR.id){if(!l.lowMemory||q.locActive||q.forcedecor){if(E?.addGroundDecoration(q.getModel(D.GROUND_DECOR.id,Q,U,G,$,L,-1),A,R,_,J,V,B),q.blockwalk&&q.locActive)H?.addFloor(R,_);if(q.anim!==-1)I.addTail(new Q0(N,A,3,R,_,c.instances[q.anim],!0))}}else if(O===D.CENTREPIECE_STRAIGHT.id||O===D.CENTREPIECE_DIAGONAL.id){let F=q.getModel(D.CENTREPIECE_STRAIGHT.id,Q,U,G,$,L,-1);if(F){let b=0;if(O===D.CENTREPIECE_DIAGONAL.id)b+=256;let T,j;if(Q===1||Q===3)T=q.length,j=q.width;else T=q.width,j=q.length;if(E?.addLoc(A,R,_,J,F,null,V,B,T,j,b)&&q.shadow)for(let w=0;w<=T;w++)for(let Z=0;Z<=j;Z++){let W=F.radius/4|0;if(W>30)W=30;if(W>this.levelShademap[A][R+w][_+Z])this.levelShademap[A][R+w][_+Z]=W<<24>>24}}if(q.blockwalk)H?.addLoc(R,_,q.width,q.length,Q,q.blockrange);if(q.anim!==-1)I.addTail(new Q0(N,A,2,R,_,c.instances[q.anim],!0))}else if(O>=D.ROOF_STRAIGHT.id){if(E?.addLoc(A,R,_,J,q.getModel(O,Q,U,G,$,L,-1),null,V,B,1,1,0),O>=D.ROOF_STRAIGHT.id&&O<=D.ROOF_FLAT.id&&O!==D.ROOF_DIAGONAL_WITH_ROOFEDGE.id&&A>0)this.levelOccludemap[A][R][_]|=2340;if(q.blockwalk)H?.addLoc(R,_,q.width,q.length,Q,q.blockrange);if(q.anim!==-1)I.addTail(new Q0(N,A,2,R,_,c.instances[q.anim],!0))}else if(O===D.WALL_STRAIGHT.id){if(E?.addWall(A,R,_,J,l.ROTATION_WALL_TYPE[Q],0,q.getModel(D.WALL_STRAIGHT.id,Q,U,G,$,L,-1),null,V,B),Q===0){if(q.shadow)this.levelShademap[A][R][_]=50,this.levelShademap[A][R][_+1]=50;if(q.occlude)this.levelOccludemap[A][R][_]|=585}else if(Q===1){if(q.shadow)this.levelShademap[A][R][_+1]=50,this.levelShademap[A][R+1][_+1]=50;if(q.occlude)this.levelOccludemap[A][R][_+1]|=1170}else if(Q===2){if(q.shadow)this.levelShademap[A][R+1][_]=50,this.levelShademap[A][R+1][_+1]=50;if(q.occlude)this.levelOccludemap[A][R+1][_]|=585}else if(Q===3){if(q.shadow)this.levelShademap[A][R][_]=50,this.levelShademap[A][R+1][_]=50;if(q.occlude)this.levelOccludemap[A][R][_]|=1170}if(q.blockwalk)H?.addWall(R,_,O,Q,q.blockrange);if(q.anim!==-1)I.addTail(new Q0(N,A,0,R,_,c.instances[q.anim],!0));if(q.wallwidth!==16)E?.setWallDecorationOffset(A,R,_,q.wallwidth)}else if(O===D.WALL_DIAGONAL_CORNER.id){if(E?.addWall(A,R,_,J,l.ROTATION_WALL_CORNER_TYPE[Q],0,q.getModel(D.WALL_DIAGONAL_CORNER.id,Q,U,G,$,L,-1),null,V,B),q.shadow){if(Q===0)this.levelShademap[A][R][_+1]=50;else if(Q===1)this.levelShademap[A][R+1][_+1]=50;else if(Q===2)this.levelShademap[A][R+1][_]=50;else if(Q===3)this.levelShademap[A][R][_]=50}if(q.blockwalk)H?.addWall(R,_,O,Q,q.blockrange);if(q.anim!==-1)I.addTail(new Q0(N,A,0,R,_,c.instances[q.anim],!0))}else if(O===D.WALL_L.id){let F=Q+1&3;if(E?.addWall(A,R,_,J,l.ROTATION_WALL_TYPE[Q],l.ROTATION_WALL_TYPE[F],q.getModel(D.WALL_L.id,Q+4,U,G,$,L,-1),q.getModel(D.WALL_L.id,F,U,G,$,L,-1),V,B),q.occlude){if(Q===0)this.levelOccludemap[A][R][_]|=265,this.levelOccludemap[A][R][_+1]|=1170;else if(Q===1)this.levelOccludemap[A][R][_+1]|=1170,this.levelOccludemap[A][R+1][_]|=585;else if(Q===2)this.levelOccludemap[A][R+1][_]|=585,this.levelOccludemap[A][R][_]|=1170;else if(Q===3)this.levelOccludemap[A][R][_]|=1170,this.levelOccludemap[A][R][_]|=585}if(q.blockwalk)H?.addWall(R,_,O,Q,q.blockrange);if(q.anim!==-1)I.addTail(new Q0(N,A,0,R,_,c.instances[q.anim],!0));if(q.wallwidth!==16)E?.setWallDecorationOffset(A,R,_,q.wallwidth)}else if(O===D.WALL_SQUARE_CORNER.id){if(E?.addWall(A,R,_,J,l.ROTATION_WALL_CORNER_TYPE[Q],0,q.getModel(D.WALL_SQUARE_CORNER.id,Q,U,G,$,L,-1),null,V,B),q.shadow){if(Q===0)this.levelShademap[A][R][_+1]=50;else if(Q===1)this.levelShademap[A][R+1][_+1]=50;else if(Q===2)this.levelShademap[A][R+1][_]=50;else if(Q===3)this.levelShademap[A][R][_]=50}if(q.blockwalk)H?.addWall(R,_,O,Q,q.blockrange);if(q.anim!==-1)I.addTail(new Q0(N,A,0,R,_,c.instances[q.anim],!0))}else if(O===D.WALL_DIAGONAL.id){if(E?.addLoc(A,R,_,J,q.getModel(O,Q,U,G,$,L,-1),null,V,B,1,1,0),q.blockwalk)H?.addLoc(R,_,q.width,q.length,Q,q.blockrange);if(q.anim!==-1)I.addTail(new Q0(N,A,2,R,_,c.instances[q.anim],!0))}else if(O===D.WALLDECOR_STRAIGHT_NOOFFSET.id){if(E?.setWallDecoration(A,R,_,J,0,0,V,q.getModel(D.WALLDECOR_STRAIGHT_NOOFFSET.id,0,U,G,$,L,-1),B,Q*512,l.ROTATION_WALL_TYPE[Q]),q.anim!==-1)I.addTail(new Q0(N,A,1,R,_,c.instances[q.anim],!0))}else if(O===D.WALLDECOR_STRAIGHT_OFFSET.id){let F=16;if(E){let b=E.getWallTypecode(A,R,_);if(b>0)F=J0.get(b>>14&32767).wallwidth}if(E?.setWallDecoration(A,R,_,J,l.WALL_DECORATION_ROTATION_FORWARD_X[Q]*F,l.WALL_DECORATION_ROTATION_FORWARD_Z[Q]*F,V,q.getModel(D.WALLDECOR_STRAIGHT_NOOFFSET.id,0,U,G,$,L,-1),B,Q*512,l.ROTATION_WALL_TYPE[Q]),q.anim!==-1)I.addTail(new Q0(N,A,1,R,_,c.instances[q.anim],!0))}else if(O===D.WALLDECOR_DIAGONAL_OFFSET.id){if(E?.setWallDecoration(A,R,_,J,0,0,V,q.getModel(D.WALLDECOR_STRAIGHT_NOOFFSET.id,0,U,G,$,L,-1),B,Q,256),q.anim!==-1)I.addTail(new Q0(N,A,1,R,_,c.instances[q.anim],!0))}else if(O===D.WALLDECOR_DIAGONAL_NOOFFSET.id){if(E?.setWallDecoration(A,R,_,J,0,0,V,q.getModel(D.WALLDECOR_STRAIGHT_NOOFFSET.id,0,U,G,$,L,-1),B,Q,512),q.anim!==-1)I.addTail(new Q0(N,A,1,R,_,c.instances[q.anim],!0))}else if(O===D.WALLDECOR_DIAGONAL_BOTH.id){if(E?.setWallDecoration(A,R,_,J,0,0,V,q.getModel(D.WALLDECOR_STRAIGHT_NOOFFSET.id,0,U,G,$,L,-1),B,Q,768),q.anim!==-1)I.addTail(new Q0(N,A,1,R,_,c.instances[q.anim],!0))}}getDrawLevel(A,R,_){if((this.levelTileFlags[A][R][_]&8)===0)return A<=0||(this.levelTileFlags[1][R][_]&2)===0?A:A-1;return 0}}class x0 extends k0{}class R6 extends x0{x=0;z=0;yaw=0;seqStretches=!1;size=1;seqStandId=-1;seqTurnId=-1;seqWalkId=-1;seqTurnAroundId=-1;seqTurnLeftId=-1;seqTurnRightId=-1;seqRunId=-1;chat=null;chatTimer=100;chatColor=0;chatStyle=0;damage=0;damageType=0;combatCycle=-1000;health=0;totalHealth=0;targetId=-1;targetTileX=0;targetTileZ=0;secondarySeqId=-1;secondarySeqFrame=0;secondarySeqCycle=0;primarySeqId=-1;primarySeqFrame=0;primarySeqCycle=0;primarySeqDelay=0;primarySeqLoop=0;spotanimId=-1;spotanimFrame=0;spotanimCycle=0;spotanimLastCycle=0;spotanimOffset=0;forceMoveStartSceneTileX=0;forceMoveEndSceneTileX=0;forceMoveStartSceneTileZ=0;forceMoveEndSceneTileZ=0;forceMoveEndCycle=0;forceMoveStartCycle=0;forceMoveFaceDirection=0;cycle=0;maxY=0;dstYaw=0;routeLength=0;routeFlagX=new Int32Array(10);routeFlagZ=new Int32Array(10);routeRun=new p(10,!1);seqTrigger=0;lastMask=-1;lastMaskCycle=-1;lastFaceX=-1;lastFaceZ=-1;move(A,R,_){if(this.primarySeqId!==-1&&c.instances[this.primarySeqId].seqPriority<=1)this.primarySeqId=-1;if(!A){let E=R-this.routeFlagX[0],I=_-this.routeFlagZ[0];if(E>=-8&&E<=8&&I>=-8&&I<=8){if(this.routeLength<9)this.routeLength++;for(let H=this.routeLength;H>0;H--)this.routeFlagX[H]=this.routeFlagX[H-1],this.routeFlagZ[H]=this.routeFlagZ[H-1],this.routeRun[H]=this.routeRun[H-1];this.routeFlagX[0]=R,this.routeFlagZ[0]=_,this.routeRun[0]=!1;return}}this.routeLength=0,this.seqTrigger=0,this.routeFlagX[0]=R,this.routeFlagZ[0]=_,this.x=this.routeFlagX[0]*128+this.size*64,this.z=this.routeFlagZ[0]*128+this.size*64}step(A,R){let _=this.routeFlagX[0],E=this.routeFlagZ[0];if(R===0)_--,E++;else if(R===1)E++;else if(R===2)_++,E++;else if(R===3)_--;else if(R===4)_++;else if(R===5)_--,E--;else if(R===6)E--;else if(R===7)_++,E--;if(this.primarySeqId!==-1&&c.instances[this.primarySeqId].seqPriority<=1)this.primarySeqId=-1;if(this.routeLength<9)this.routeLength++;for(let I=this.routeLength;I>0;I--)this.routeFlagX[I]=this.routeFlagX[I-1],this.routeFlagZ[I]=this.routeFlagZ[I-1],this.routeRun[I]=this.routeRun[I-1];this.routeFlagX[0]=_,this.routeFlagZ[0]=E,this.routeRun[0]=A}}class v6 extends R6{npcType=null;draw(A){if(!this.npcType)return null;if(this.spotanimId===-1||this.spotanimFrame===-1)return this.getSequencedModel();let R=this.getSequencedModel();if(!R)return null;let _=T0.instances[this.spotanimId],E=K.modelShareColored(_.getModel(),!0,!_.disposeAlpha,!1);if(E.translateModel(-this.spotanimOffset,0,0),E.createLabelReferences(),_.seq&&_.seq.seqFrames)E.applyTransform(_.seq.seqFrames[this.spotanimFrame]);if(E.labelFaces=null,E.labelVertices=null,_.resizeh!==128||_.resizev!==128)E.scale(_.resizeh,_.resizev,_.resizeh);E.calculateNormals(64+_.ambient,850+_.contrast,-30,-50,-30,!0);let I=[R,E],H=K.modelFromModelsBounds(I,2);if(this.npcType.size===1)H.pickAabb=!0;return H}isVisibleNow(){return this.npcType!==null}getSequencedModel(){if(!this.npcType)return null;if(this.primarySeqId>=0&&this.primarySeqDelay===0){let _=c.instances[this.primarySeqId].seqFrames;if(_){let E=_[this.primarySeqFrame],I=-1;if(this.secondarySeqId>=0&&this.secondarySeqId!==this.seqStandId){let H=c.instances[this.secondarySeqId].seqFrames;if(H)I=H[this.secondarySeqFrame]}return this.npcType.getSequencedModel(E,I,c.instances[this.primarySeqId].walkmerge)}}let A=-1;if(this.secondarySeqId>=0){let _=c.instances[this.secondarySeqId].seqFrames;if(_)A=_[this.secondarySeqFrame]}let R=this.npcType.getSequencedModel(A,-1,null);if(!R)return null;return this.maxY=R.maxY,R}}class V0 extends R6{static TORSO_RECOLORS=[9104,10275,7595,3610,7975,8526,918,38802,24466,10145,58654,5027,1457,16565,34991,25486];static DESIGN_IDK_COLORS=[[6798,107,10283,16,4797,7744,5799,4634,33697,22433,2983,54193],[8741,12,64030,43162,7735,8404,1701,38430,24094,10153,56621,4783,1341,16578,35003,25239],[25238,8742,12,64030,43162,7735,8404,1701,38430,24094,10153,56621,4783,1341,16578,35003],[4626,11146,6439,12,4758,10270],[4550,4537,5681,5673,5790,6806,8076,4574]];static modelCache=new b0(200);name=null;playerVisible=!1;gender=0;headicons=0;appearances=new Uint16Array(12);colors=new Uint16Array(5);combatLevel=0;appearanceHashcode=0n;y=0;locStartCycle=0;locStopCycle=0;locOffsetX=0;locOffsetY=0;locOffsetZ=0;locModel=null;minTileX=0;minTileZ=0;maxTileX=0;maxTileZ=0;lowMemory=!1;draw(A){if(!this.playerVisible)return null;let R=this.getSequencedModel();if(this.maxY=R.maxY,R.pickAabb=!0,this.lowMemory)return R;if(this.spotanimId!==-1&&this.spotanimFrame!==-1){let _=T0.instances[this.spotanimId],E=K.modelShareColored(_.getModel(),!0,!_.disposeAlpha,!1);if(E.translateModel(-this.spotanimOffset,0,0),E.createLabelReferences(),_.seq&&_.seq.seqFrames)E.applyTransform(_.seq.seqFrames[this.spotanimFrame]);if(E.labelFaces=null,E.labelVertices=null,_.resizeh!==128||_.resizev!==128)E.scale(_.resizeh,_.resizev,_.resizeh);E.calculateNormals(_.ambient+64,_.contrast+850,-30,-50,-30,!0);let I=[R,E];R=K.modelFromModelsBounds(I,2)}if(this.locModel){if(A>=this.locStopCycle)this.locModel=null;if(A>=this.locStartCycle&&A<this.locStopCycle){let _=this.locModel;if(_){if(_.translateModel(this.locOffsetY-this.y,this.locOffsetX-this.x,this.locOffsetZ-this.z),this.dstYaw===512)_.rotateY90(),_.rotateY90(),_.rotateY90();else if(this.dstYaw===1024)_.rotateY90(),_.rotateY90();else if(this.dstYaw===1536)_.rotateY90();let E=[R,_];if(R=K.modelFromModelsBounds(E,2),this.dstYaw===512)_.rotateY90();else if(this.dstYaw===1024)_.rotateY90(),_.rotateY90();else if(this.dstYaw===1536)_.rotateY90(),_.rotateY90(),_.rotateY90();_.translateModel(this.y-this.locOffsetY,this.x-this.locOffsetX,this.z-this.locOffsetZ)}}}return R.pickAabb=!0,R}isVisibleNow(){return this.playerVisible}read(A){A.pos=0,this.gender=A.g1(),this.headicons=A.g1();for(let R=0;R<12;R++){let _=A.g1();if(_===0)this.appearances[R]=0;else this.appearances[R]=(_<<8)+A.g1()}for(let R=0;R<5;R++){let _=A.g1();if(_<0||_>=V0.DESIGN_IDK_COLORS[R].length)_=0;this.colors[R]=_}if(this.seqStandId=A.g2(),this.seqStandId===65535)this.seqStandId=-1;if(this.seqTurnId=A.g2(),this.seqTurnId===65535)this.seqTurnId=-1;if(this.seqWalkId=A.g2(),this.seqWalkId===65535)this.seqWalkId=-1;if(this.seqTurnAroundId=A.g2(),this.seqTurnAroundId===65535)this.seqTurnAroundId=-1;if(this.seqTurnLeftId=A.g2(),this.seqTurnLeftId===65535)this.seqTurnLeftId=-1;if(this.seqTurnRightId=A.g2(),this.seqTurnRightId===65535)this.seqTurnRightId=-1;if(this.seqRunId=A.g2(),this.seqRunId===65535)this.seqRunId=-1;this.name=e.formatName(e.fromBase37(A.g8())),this.combatLevel=A.g1(),this.playerVisible=!0,this.appearanceHashcode=0n;for(let R=0;R<12;R++)if(this.appearanceHashcode<<=0x4n,this.appearances[R]>=256)this.appearanceHashcode+=BigInt(this.appearances[R])-256n;if(this.appearances[0]>=256)this.appearanceHashcode+=BigInt(this.appearances[0])-256n>>4n;if(this.appearances[1]>=256)this.appearanceHashcode+=BigInt(this.appearances[1])-256n>>8n;for(let R=0;R<5;R++)this.appearanceHashcode<<=0x3n,this.appearanceHashcode+=BigInt(this.colors[R]);this.appearanceHashcode<<=0x1n,this.appearanceHashcode+=BigInt(this.gender)}getHeadModel(){if(!this.playerVisible)return null;let A=new p(12,null),R=0;for(let E=0;E<12;E++){let I=this.appearances[E];if(I>=256&&I<512)A[R++]=X0.instances[I-256].getHeadModel();if(I>=512){let H=E0.get(I-512).getHeadModel(this.gender);if(H)A[R++]=H}}let _=K.modelFromModels(A,R);for(let E=0;E<5;E++){if(this.colors[E]===0)continue;if(_.recolor(V0.DESIGN_IDK_COLORS[E][0],V0.DESIGN_IDK_COLORS[E][this.colors[E]]),E===1)_.recolor(V0.TORSO_RECOLORS[0],V0.TORSO_RECOLORS[this.colors[E]])}return _}getSequencedModel(){let A=this.appearanceHashcode,R=-1,_=-1,E=-1,I=-1;if(this.primarySeqId>=0&&this.primarySeqDelay===0){let O=c.instances[this.primarySeqId];if(O.seqFrames)R=O.seqFrames[this.primarySeqFrame];if(this.secondarySeqId>=0&&this.secondarySeqId!==this.seqStandId){let Q=c.instances[this.secondarySeqId].seqFrames;if(Q)_=Q[this.secondarySeqFrame]}if(O.righthand>=0)E=O.righthand,A+=BigInt(E-this.appearances[5])<<8n;if(O.lefthand>=0)I=O.lefthand,A+=BigInt(I-this.appearances[3])<<16n}else if(this.secondarySeqId>=0){let O=c.instances[this.secondarySeqId].seqFrames;if(O)R=O[this.secondarySeqFrame]}let H=V0.modelCache?.get(A);if(!H){let O=new p(12,null),Q=0;for(let U=0;U<12;U++){let G=this.appearances[U];if(I>=0&&U===3)G=I;if(E>=0&&U===5)G=E;if(G>=256&&G<512){let $=X0.instances[G-256].getModel();if($)O[Q++]=$}if(G>=512){let L=E0.get(G-512).getWornModel(this.gender);if(L)O[Q++]=L}}H=K.modelFromModels(O,Q);for(let U=0;U<5;U++){if(this.colors[U]===0)continue;if(H.recolor(V0.DESIGN_IDK_COLORS[U][0],V0.DESIGN_IDK_COLORS[U][this.colors[U]]),U===1)H.recolor(V0.TORSO_RECOLORS[0],V0.TORSO_RECOLORS[this.colors[U]])}H.createLabelReferences(),H.calculateNormals(64,850,-30,-50,-30,!0),V0.modelCache?.put(A,H)}if(this.lowMemory)return H;let N=K.modelShareAlpha(H,!0);if(R!==-1&&_!==-1)N.applyTransforms(R,_,c.instances[this.primarySeqId].walkmerge);else if(R!==-1)N.applyTransform(R);return N.calculateBoundsCylinder(),N.labelFaces=null,N.labelVertices=null,N}}class C6 extends k0{duration=-1;locIndex=0;locAngle=0;shape=0;plane=0;layer=0;x=0;z=0;lastLocIndex=0;lastAngle=0;lastShape=0;delay=0}class K6 extends k0{index;count;constructor(A,R){super();this.index=A,this.count=R}}class r6 extends x0{spotanim;projLevel;srcX;srcZ;srcY;projOffsetY;startCycle;lastCycle;peakPitch;projArc;projTarget;mobile=!1;x=0;z=0;y=0;projVelocityX=0;projVelocityZ=0;projVelocity=0;projVelocityY=0;accelerationY=0;yaw=0;pitch=0;seqFrame=0;seqCycle=0;constructor(A,R,_,E,I,H,N,O,Q,U,G){super();this.spotanim=T0.instances[A],this.projLevel=R,this.srcX=_,this.srcZ=I,this.srcY=E,this.startCycle=H,this.lastCycle=N,this.peakPitch=O,this.projArc=Q,this.projTarget=U,this.projOffsetY=G}updateVelocity(A,R,_,E){if(!this.mobile){let H=A-this.srcX,N=_-this.srcZ,O=Math.sqrt(H*H+N*N);this.x=this.srcX+H*this.projArc/O,this.z=this.srcZ+N*this.projArc/O,this.y=this.srcY}let I=this.lastCycle+1-E;if(this.projVelocityX=(A-this.x)/I,this.projVelocityZ=(_-this.z)/I,this.projVelocity=Math.sqrt(this.projVelocityX*this.projVelocityX+this.projVelocityZ*this.projVelocityZ),!this.mobile)this.projVelocityY=-this.projVelocity*Math.tan(this.peakPitch*0.02454369);this.accelerationY=(R-this.y-this.projVelocityY*I)*2/(I*I)}update(A){if(this.mobile=!0,this.x+=this.projVelocityX*A,this.z+=this.projVelocityZ*A,this.y+=this.projVelocityY*A+this.accelerationY*0.5*A*A,this.projVelocityY+=this.accelerationY*A,this.yaw=(Math.atan2(this.projVelocityX,this.projVelocityZ)*325.949+1024|0)&2047,this.pitch=(Math.atan2(this.projVelocityY,this.projVelocity)*325.949|0)&2047,!this.spotanim.seq||!this.spotanim.seq.seqDelay)return;this.seqCycle+=A;while(this.seqCycle>this.spotanim.seq.seqDelay[this.seqFrame])if(this.seqCycle-=this.spotanim.seq.seqDelay[this.seqFrame]+1,this.seqFrame++,this.seqFrame>=this.spotanim.seq.seqFrameCount)this.seqFrame=0}draw(){let A=this.spotanim.getModel(),R=K.modelShareColored(A,!0,!this.spotanim.disposeAlpha,!1);if(this.spotanim.seq&&this.spotanim.seq.seqFrames)R.createLabelReferences(),R.applyTransform(this.spotanim.seq.seqFrames[this.seqFrame]),R.labelFaces=null,R.labelVertices=null;if(this.spotanim.resizeh!==128||this.spotanim.resizev!==128)R.scale(this.spotanim.resizeh,this.spotanim.resizev,this.spotanim.resizeh);return R.rotateX(this.pitch),R.calculateNormals(64+this.spotanim.ambient,850+this.spotanim.contrast,-30,-50,-30,!0),R}}class p6 extends x0{spotType;spotLevel;x;z;y;startCycle;seqComplete=!1;seqFrame=0;seqCycle=0;constructor(A,R,_,E,I,H,N){super();this.spotType=T0.instances[A],this.spotLevel=R,this.x=_,this.z=E,this.y=I,this.startCycle=H+N}update(A){if(!this.spotType.seq||!this.spotType.seq.seqDelay)return;for(this.seqCycle+=A;this.seqCycle>this.spotType.seq.seqDelay[this.seqFrame];)if(this.seqCycle-=this.spotType.seq.seqDelay[this.seqFrame]+1,this.seqFrame++,this.seqFrame>=this.spotType.seq.seqFrameCount)this.seqFrame=0,this.seqComplete=!0}draw(){let A=this.spotType.getModel(),R=K.modelShareColored(A,!0,!this.spotType.disposeAlpha,!1);if(!this.seqComplete&&this.spotType.seq&&this.spotType.seq.seqFrames)R.createLabelReferences(),R.applyTransform(this.spotType.seq.seqFrames[this.seqFrame]),R.labelFaces=null,R.labelVertices=null;if(this.spotType.resizeh!==128||this.spotType.resizev!==128)R.scale(this.spotType.resizeh,this.spotType.resizev,this.spotType.resizeh);if(this.spotType.spotAngle!==0){if(this.spotType.spotAngle===90)R.rotateY90();else if(this.spotType.spotAngle===180)R.rotateY90(),R.rotateY90();else if(this.spotType.spotAngle===270)R.rotateY90(),R.rotateY90(),R.rotateY90()}return R.calculateNormals(64+this.spotType.ambient,850+this.spotType.contrast,-30,-50,-30,!0),R}}class i6{seed;constructor(A){this.seed=(A^0x5deece66dn)&(1n<<48n)-1n}setSeed(A){this.seed=(A^0x5deece66dn)&(1n<<48n)-1n}nextInt(){return this.next(32)}next(A){return this.seed=this.seed*0x5deece66dn+0xbn&(1n<<48n)-1n,Number(this.seed)>>>48-A}}class j0 extends Y0{static CHARSET=`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!"£$%^&*()-_=+[{]};:'@#~,<.>/?\\| `;static CHARCODESET=[];charMask=[];charMaskWidth=new Int32Array(94);charMaskHeight=new Int32Array(94);charOffsetX=new Int32Array(94);charOffsetY=new Int32Array(94);charAdvance=new Int32Array(95);drawWidth=new Int32Array(256);random=new i6(BigInt(Date.now()));height2d=0;static{let A=navigator.userAgent.includes("Capacitor");for(let R=0;R<256;R++){let _=j0.CHARSET.indexOf(String.fromCharCode(R));if(A){if(_>=63)_--}if(_===-1)_=74;j0.CHARCODESET[R]=_}}static fromArchive(A,R){let _=new s(A.read(R+".dat")),E=new s(A.read("index.dat"));E.pos=_.g2()+4;let I=E.g1();if(I>0)E.pos+=(I-1)*3;let H=new j0;for(let N=0;N<94;N++){H.charOffsetX[N]=E.g1(),H.charOffsetY[N]=E.g1();let O=H.charMaskWidth[N]=E.g2(),Q=H.charMaskHeight[N]=E.g2(),U=E.g1(),G=O*Q;if(H.charMask[N]=new Int8Array(G),U===0)for(let $=0;$<O*Q;$++)H.charMask[N][$]=_.g1b();else if(U===1)for(let $=0;$<O;$++)for(let L=0;L<Q;L++)H.charMask[N][$+L*O]=_.g1b();if(Q>H.height2d)H.height2d=Q;H.charOffsetX[N]=1,H.charAdvance[N]=O+2;{let $=0;for(let L=Q/7|0;L<Q;L++)$+=H.charMask[N][L*O];if($<=(Q/7|0))H.charAdvance[N]--,H.charOffsetX[N]=0}{let $=0;for(let L=Q/7|0;L<Q;L++)$+=H.charMask[N][O+L*O-1];if($<=(Q/7|0))H.charAdvance[N]--}}H.charAdvance[94]=H.charAdvance[8];for(let N=0;N<256;N++)H.drawWidth[N]=H.charAdvance[j0.CHARCODESET[N]];return H}drawString(A,R,_,E){if(!_)return;A|=0,R|=0;let I=_.length;R-=this.height2d;for(let H=0;H<I;H++){let N=j0.CHARCODESET[_.charCodeAt(H)];if(N!==94)this.drawChar(this.charMask[N],A+this.charOffsetX[N],R+this.charOffsetY[N],this.charMaskWidth[N],this.charMaskHeight[N],E);A+=this.charAdvance[N]}}drawStringTaggable(A,R,_,E,I){A|=0,R|=0;let H=_.length;R-=this.height2d;for(let N=0;N<H;N++)if(_.charAt(N)==="@"&&N+4<H&&_.charAt(N+4)==="@")E=this.evaluateTag(_.substring(N+1,N+4)),N+=4;else{let O=j0.CHARCODESET[_.charCodeAt(N)];if(O!==94){if(I)this.drawChar(this.charMask[O],A+this.charOffsetX[O]+1,R+this.charOffsetY[O]+1,this.charMaskWidth[O],this.charMaskHeight[O],0);this.drawChar(this.charMask[O],A+this.charOffsetX[O],R+this.charOffsetY[O],this.charMaskWidth[O],this.charMaskHeight[O],E)}A+=this.charAdvance[O]}}stringWidth(A){if(!A)return 0;let R=A.length,_=0;for(let E=0;E<R;E++)if(A.charAt(E)==="@"&&E+4<R&&A.charAt(E+4)==="@")E+=4;else _+=this.drawWidth[A.charCodeAt(E)];return _}drawStringTaggableCenter(A,R,_,E,I){A|=0,R|=0,this.drawStringTaggable(A-(this.stringWidth(_)/2|0),R,_,E,I)}drawStringCenter(A,R,_,E){if(!_)return;A|=0,R|=0,this.drawString(A-(this.stringWidth(_)/2|0),R,_,E)}drawStringTooltip(A,R,_,E,I,H){A|=0,R|=0,this.random.setSeed(BigInt(H));let N=(this.random.nextInt()&31)+192,O=R-this.height2d;for(let Q=0;Q<_.length;Q++)if(_.charAt(Q)==="@"&&Q+4<_.length&&_.charAt(Q+4)==="@")E=this.evaluateTag(_.substring(Q+1,Q+4)),Q+=4;else{let U=j0.CHARCODESET[_.charCodeAt(Q)];if(U!==94){if(I)this.drawCharAlpha(A+this.charOffsetX[U]+1,O+this.charOffsetY[U]+1,this.charMaskWidth[U],this.charMaskHeight[U],0,192,this.charMask[U]);this.drawCharAlpha(A+this.charOffsetX[U],O+this.charOffsetY[U],this.charMaskWidth[U],this.charMaskHeight[U],E,N,this.charMask[U])}if(A+=this.charAdvance[U],(this.random.nextInt()&3)===0)A++}}drawStringRight(A,R,_,E,I=!0){if(A|=0,R|=0,I)this.drawString(A-this.stringWidth(_)+1,R+1,_,0);this.drawString(A-this.stringWidth(_),R,_,E)}drawCenteredWave(A,R,_,E,I){if(!_)return;A|=0,R|=0,A-=this.stringWidth(_)/2|0;let H=R-this.height2d;for(let N=0;N<_.length;N++){let O=j0.CHARCODESET[_.charCodeAt(N)];if(O!=94)this.drawChar(this.charMask[O],A+this.charOffsetX[O],H+this.charOffsetY[O]+(Math.sin(N/2+I/5)*5|0),this.charMaskWidth[O],this.charMaskHeight[O],E);A+=this.charAdvance[O]}}drawChar(A,R,_,E,I,H){R|=0,_|=0,E|=0,I|=0;let N=R+_*k.width2d,O=k.width2d-E,Q=0,U=0;if(_<k.top){let G=k.top-_;I-=G,_=k.top,U+=G*E,N+=G*k.width2d}if(_+I>=k.bottom)I-=_+I+1-k.bottom;if(R<k.left){let G=k.left-R;E-=G,R=k.left,U+=G,N+=G,Q+=G,O+=G}if(R+E>=k.right){let G=R+E+1-k.right;E-=G,Q+=G,O+=G}if(E>0&&I>0)this.drawMask(E,I,A,U,Q,k.pixels,N,O,H)}drawCharAlpha(A,R,_,E,I,H,N){A|=0,R|=0,_|=0,E|=0;let O=A+R*k.width2d,Q=k.width2d-_,U=0,G=0;if(R<k.top){let $=k.top-R;E-=$,R=k.top,G+=$*_,O+=$*k.width2d}if(R+E>=k.bottom)E-=R+E+1-k.bottom;if(A<k.left){let $=k.left-A;_-=$,A=k.left,G+=$,O+=$,U+=$,Q+=$}if(A+_>=k.right){let $=A+_+1-k.right;_-=$,U+=$,Q+=$}if(_>0&&E>0)this.drawMaskAlpha(_,E,k.pixels,O,Q,N,G,U,I,H)}drawMask(A,R,_,E,I,H,N,O,Q){A|=0,R|=0;let U=-(A>>2);A=-(A&3);for(let G=-R;G<0;G++){for(let $=U;$<0;$++){if(_[E++]===0)N++;else H[N++]=Q;if(_[E++]===0)N++;else H[N++]=Q;if(_[E++]===0)N++;else H[N++]=Q;if(_[E++]===0)N++;else H[N++]=Q}for(let $=A;$<0;$++)if(_[E++]===0)N++;else H[N++]=Q;N+=O,E+=I}}drawMaskAlpha(A,R,_,E,I,H,N,O,Q,U){A|=0,R|=0;let G=((Q&16711935)*U&4278255360)+((Q&65280)*U&16711680)>>8,$=256-U;for(let L=-R;L<0;L++){for(let J=-A;J<0;J++)if(H[N++]===0)E++;else{let q=_[E];_[E++]=(((q&16711935)*$&4278255360)+((q&65280)*$&16711680)>>8)+G}E+=I,N+=O}}evaluateTag(A){if(A==="red")return 16711680;else if(A==="gre")return 65280;else if(A==="blu")return 255;else if(A==="yel")return 16776960;else if(A==="cya")return 65535;else if(A==="mag")return 16711935;else if(A==="whi")return 16777215;else if(A==="bla")return 0;else if(A==="lre")return 16748608;else if(A==="dre")return 8388608;else if(A==="dbl")return 128;else if(A==="or1")return 16756736;else if(A==="or2")return 16740352;else if(A==="or3")return 16723968;else if(A==="gr1")return 12648192;else if(A==="gr2")return 8453888;else if(A==="gr3")return 4259584;else return 0}split(A,R){if(A.length===0)return[A];let _=[];while(A.length>0){if(this.stringWidth(A)<=R&&A.indexOf("|")===-1){_.push(A);break}let I=A.length;for(let H=0;H<A.length;H++)if(A[H]===" "){if(this.stringWidth(A.substring(0,H))>R)break;I=H}else if(A[H]==="|"){I=H;break}_.push(A.substring(0,I)),A=A.substring(I+1)}return _}}var A8=`
struct PixelBuffer {
  data: array<u32>,
};

const textureCount = 50;

// Look-up tables
struct LUTs {
  palette: array<u32, 65536>,
  texturesTranslucent: array<i32, textureCount>,
  textures: array<array<u32, 65536>, textureCount>,
};

@group(0) @binding(0) var<storage, read_write> pixelBuffer: PixelBuffer;
@group(0) @binding(1) var<storage, read_write> depthBuffer: array<atomic<u32>>;
@group(0) @binding(2) var<storage, read> luts: LUTs;
@group(1) @binding(0) var<storage, read> triangleData: array<i32>;

@compute @workgroup_size(256, 1)
fn clear(@builtin(global_invocation_id) global_id: vec3u) {
  let index = global_id.x;
  pixelBuffer.data[index] = 0u;
  atomicStore(&depthBuffer[index], 0u);
}

const width = 512;
const height = 334;

const centerX = width / 2;
const centerY = height / 2;
// const centerX = 256;
// const centerY = 167;

const boundRight = width;
const boundBottom = height;
// const boundBottom = 334;
const boundX = width - 1;
// const boundX = 512 - 1;

var<private> jagged = true;
var<private> clipX = false;
var<private> alpha = 0u;

var<private> opaqueTexture = true;

var<private> depth = 0u;
var<private> writeDepth = false;

@compute @workgroup_size(1, 1)
fn renderFlat(@builtin(global_invocation_id) global_id: vec3u) {
  let offset = global_id.x * 8;
  depth = u32(triangleData[offset]);
  rasterTriangle(
    triangleData[offset + 1], triangleData[offset + 2], triangleData[offset + 3],
    triangleData[offset + 4], triangleData[offset + 5], triangleData[offset + 6],
    u32(triangleData[offset + 7]),
  );
}

@compute @workgroup_size(1, 1)
fn renderFlatDepth(@builtin(global_invocation_id) global_id: vec3u) {
  let offset = global_id.x * 8;
  depth = u32(triangleData[offset]);
  writeDepth = true;
  rasterTriangle(
    triangleData[offset + 1], triangleData[offset + 2], triangleData[offset + 3],
    triangleData[offset + 4], triangleData[offset + 5], triangleData[offset + 6],
    0,
  );
}

@compute @workgroup_size(1, 1)
fn renderGouraud(@builtin(global_invocation_id) global_id: vec3u) {
  let offset = global_id.x * 10;
  depth = u32(triangleData[offset]);
  rasterGouraudTriangle(
    triangleData[offset + 1], triangleData[offset + 2], triangleData[offset + 3],
    triangleData[offset + 4], triangleData[offset + 5], triangleData[offset + 6],
    triangleData[offset + 7], triangleData[offset + 8], triangleData[offset + 9],
  );
}

@compute @workgroup_size(1, 1)
fn renderGouraudDepth(@builtin(global_invocation_id) global_id: vec3u) {
  let offset = global_id.x * 10;
  depth = u32(triangleData[offset]);
  writeDepth = true;
  rasterTriangle(
    triangleData[offset + 1], triangleData[offset + 2], triangleData[offset + 3],
    triangleData[offset + 4], triangleData[offset + 5], triangleData[offset + 6],
    0,
  );
}

@compute @workgroup_size(1, 1)
fn renderTextured(@builtin(global_invocation_id) global_id: vec3u) {
  let offset = global_id.x * 20;
  depth = u32(triangleData[offset]);
  rasterTexturedTriangle(
    triangleData[offset + 1], triangleData[offset + 2], triangleData[offset + 3],
    triangleData[offset + 4], triangleData[offset + 5], triangleData[offset + 6],
    triangleData[offset + 7], triangleData[offset + 8], triangleData[offset + 9],
    triangleData[offset + 10], triangleData[offset + 11], triangleData[offset + 12],
    triangleData[offset + 13], triangleData[offset + 14], triangleData[offset + 15],
    triangleData[offset + 16], triangleData[offset + 17], triangleData[offset + 18],
    triangleData[offset + 19],
  );
}

@compute @workgroup_size(1, 1)
fn renderTexturedDepth(@builtin(global_invocation_id) global_id: vec3u) {
  let offset = global_id.x * 20;
  depth = u32(triangleData[offset]);
  writeDepth = true;
  opaqueTexture = luts.texturesTranslucent[triangleData[offset + 19]] == 0;
  if (opaqueTexture) {
    rasterTriangle(
      triangleData[offset + 1], triangleData[offset + 2], triangleData[offset + 3],
      triangleData[offset + 4], triangleData[offset + 5], triangleData[offset + 6],
      0,
    );
  } else {
    rasterTexturedTriangle(
      triangleData[offset + 1], triangleData[offset + 2], triangleData[offset + 3],
      triangleData[offset + 4], triangleData[offset + 5], triangleData[offset + 6],
      triangleData[offset + 7], triangleData[offset + 8], triangleData[offset + 9],
      triangleData[offset + 10], triangleData[offset + 11], triangleData[offset + 12],
      triangleData[offset + 13], triangleData[offset + 14], triangleData[offset + 15],
      triangleData[offset + 16], triangleData[offset + 17], triangleData[offset + 18],
      triangleData[offset + 19],
    );
  }
}

@compute @workgroup_size(1, 1)
fn renderAlpha(@builtin(global_invocation_id) global_id: vec3u) {
  let triangleCount = i32(arrayLength(&triangleData)) / 10;
  for (var i = 0; i < triangleCount; i++) {
    let offset = i * 10;
    depth = u32(triangleData[offset] & 0x7fffff);
    alpha = u32((triangleData[offset] >> 23) & 0xff);
    var isFlat = (u32(triangleData[offset]) >> 31) == 1;
    if (isFlat) {
      rasterTriangle(
        triangleData[offset + 1], triangleData[offset + 2], triangleData[offset + 3],
        triangleData[offset + 4], triangleData[offset + 5], triangleData[offset + 6],
        u32(triangleData[offset + 7]),
      );
    } else {
      rasterGouraudTriangle(
        triangleData[offset + 1], triangleData[offset + 2], triangleData[offset + 3],
        triangleData[offset + 4], triangleData[offset + 5], triangleData[offset + 6],
        triangleData[offset + 7], triangleData[offset + 8], triangleData[offset + 9],
      );
    }
  }
}

fn setPixel(index: i32, value: u32) {
  if (atomicLoad(&depthBuffer[index]) <= depth) {
    pixelBuffer.data[index] = value;
  }
}

fn rasterTriangle(x0In: i32, x1In: i32, x2In: i32, y0In: i32, y1In: i32, y2In: i32, color: u32) {
  var x0 = x0In;
  var x1 = x1In;
  var x2 = x2In;
  var y0 = y0In;
  var y1 = y1In;
  var y2 = y2In;
  clipX = x0 < 0 || x1 < 0 || x2 < 0 || x0 > boundX || x1 > boundX || x2 > boundX;
  var xStepAB = 0;
  if (y1 != y0) {
    xStepAB = ((x1 - x0) << 16) / (y1 - y0);
  }
  var xStepBC = 0;
  if (y2 != y1) {
    xStepBC = ((x2 - x1) << 16) / (y2 - y1);
  }
  var xStepAC = 0;
  if (y2 != y0) {
    xStepAC = ((x0 - x2) << 16) / (y0 - y2);
  }
  if (y0 <= y1 && y0 <= y2) {
    if (y0 < boundBottom) {
      if (y1 > boundBottom) {
        y1 = boundBottom;
      }
      if (y2 > boundBottom) {
        y2 = boundBottom;
      }
      if (y1 < y2) {
        x0 <<= 0x10;
        x2 = x0;
        if (y0 < 0) {
          x2 -= xStepAC * y0;
          x0 -= xStepAB * y0;
          y0 = 0;
        }
        x1 <<= 0x10;
        if (y1 < 0) {
          x1 -= xStepBC * y1;
          y1 = 0;
        }
        if ((y0 != y1 && xStepAC < xStepAB) || (y0 == y1 && xStepAC > xStepBC)) {
          y2 -= y1;
          y1 -= y0;
          y0 = y0 * width;
          while (true) {
            y1--;
            if (y1 < 0) {
              while (true) {
                y2--;
                if (y2 < 0) {
                  return;
                }
                rasterScanline(x2 >> 16, x1 >> 16, y0, color);
                x2 += xStepAC;
                x1 += xStepBC;
                y0 += width;
              }
            }
            rasterScanline(x2 >> 16, x0 >> 16, y0, color);
            x2 += xStepAC;
            x0 += xStepAB;
            y0 += width;
          }
        } else {
          y2 -= y1;
          y1 -= y0;
          y0 = y0 * width;
          while (true) {
            y1--;
            if (y1 < 0) {
              while (true) {
                y2--;
                if (y2 < 0) {
                  return;
                }
                rasterScanline(x1 >> 16, x2 >> 16, y0, color);
                x2 += xStepAC;
                x1 += xStepBC;
                y0 += width;
              }
            }
            rasterScanline(x0 >> 16, x2 >> 16, y0, color);
            x2 += xStepAC;
            x0 += xStepAB;
            y0 += width;
          }
        }
      } else {
        x0 <<= 0x10;
        x1 = x0;
        if (y0 < 0) {
          x1 -= xStepAC * y0;
          x0 -= xStepAB * y0;
          y0 = 0;
        }
        x2 <<= 0x10;
        if (y2 < 0) {
          x2 -= xStepBC * y2;
          y2 = 0;
        }
        if ((y0 != y2 && xStepAC < xStepAB) || (y0 == y2 && xStepBC > xStepAB)) {
          y1 -= y2;
          y2 -= y0;
          y0 = y0 * width;
          while (true) {
            y2--;
            if (y2 < 0) {
              while (true) {
                y1--;
                if (y1 < 0) {
                  return;
                }
                rasterScanline(x2 >> 16, x0 >> 16, y0, color);
                x2 += xStepBC;
                x0 += xStepAB;
                y0 += width;
              }
            }
            rasterScanline(x1 >> 16, x0 >> 16, y0, color);
            x1 += xStepAC;
            x0 += xStepAB;
            y0 += width;
          }
        } else {
          y1 -= y2;
          y2 -= y0;
          y0 = y0 * width;
          while (true) {
            y2--;
            if (y2 < 0) {
              while (true) {
                y1--;
                if (y1 < 0) {
                  return;
                }
                rasterScanline(x0 >> 16, x2 >> 16, y0, color);
                x2 += xStepBC;
                x0 += xStepAB;
                y0 += width;
              }
            }
            rasterScanline(x0 >> 16, x1 >> 16, y0, color);
            x1 += xStepAC;
            x0 += xStepAB;
            y0 += width;
          }
        }
      }
    }
  } else if (y1 <= y2) {
    if (y1 < boundBottom) {
      if (y2 > boundBottom) {
        y2 = boundBottom;
      }
      if (y0 > boundBottom) {
        y0 = boundBottom;
      }
      if (y2 < y0) {
        x1 <<= 0x10;
        x0 = x1;
        if (y1 < 0) {
          x0 -= xStepAB * y1;
          x1 -= xStepBC * y1;
          y1 = 0;
        }
        x2 <<= 0x10;
        if (y2 < 0) {
          x2 -= xStepAC * y2;
          y2 = 0;
        }
        if ((y1 != y2 && xStepAB < xStepBC) || (y1 == y2 && xStepAB > xStepAC)) {
          y0 -= y2;
          y2 -= y1;
          y1 = y1 * width;
          while (true) {
            y2--;
            if (y2 < 0) {
              while (true) {
                y0--;
                if (y0 < 0) {
                  return;
                }
                rasterScanline(x0 >> 16, x2 >> 16, y1, color);
                x0 += xStepAB;
                x2 += xStepAC;
                y1 += width;
              }
            }
            rasterScanline(x0 >> 16, x1 >> 16, y1, color);
            x0 += xStepAB;
            x1 += xStepBC;
            y1 += width;
          }
        } else {
          y0 -= y2;
          y2 -= y1;
          y1 = y1 * width;
          while (true) {
            y2--;
            if (y2 < 0) {
              while (true) {
                y0--;
                if (y0 < 0) {
                  return;
                }
                rasterScanline(x2 >> 16, x0 >> 16, y1, color);
                x0 += xStepAB;
                x2 += xStepAC;
                y1 += width;
              }
            }
            rasterScanline(x1 >> 16, x0 >> 16, y1, color);
            x0 += xStepAB;
            x1 += xStepBC;
            y1 += width;
          }
        }
      } else {
        x1 <<= 0x10;
        x2 = x1;
        if (y1 < 0) {
          x2 -= xStepAB * y1;
          x1 -= xStepBC * y1;
          y1 = 0;
        }
        x0 <<= 0x10;
        if (y0 < 0) {
          x0 -= xStepAC * y0;
          y0 = 0;
        }
        if (xStepAB < xStepBC) {
          y2 -= y0;
          y0 -= y1;
          y1 = y1 * width;
          while (true) {
            y0--;
            if (y0 < 0) {
              while (true) {
                y2--;
                if (y2 < 0) {
                  return;
                }
                rasterScanline(x0 >> 16, x1 >> 16, y1, color);
                x0 += xStepAC;
                x1 += xStepBC;
                y1 += width;
              }
            }
            rasterScanline(x2 >> 16, x1 >> 16, y1, color);
            x2 += xStepAB;
            x1 += xStepBC;
            y1 += width;
          }
        } else {
          y2 -= y0;
          y0 -= y1;
          y1 = y1 * width;
          while (true) {
            y0--;
            if (y0 < 0) {
              while (true) {
                y2--;
                if (y2 < 0) {
                  return;
                }
                rasterScanline(x1 >> 16, x0 >> 16, y1, color);
                x0 += xStepAC;
                x1 += xStepBC;
                y1 += width;
              }
            }
            rasterScanline(x1 >> 16, x2 >> 16, y1, color);
            x2 += xStepAB;
            x1 += xStepBC;
            y1 += width;
          }
        }
      }
    }
  } else if (y2 < boundBottom) {
    if (y0 > boundBottom) {
      y0 = boundBottom;
    }
    if (y1 > boundBottom) {
      y1 = boundBottom;
    }
    if (y0 < y1) {
      x2 <<= 0x10;
      x1 = x2;
      if (y2 < 0) {
        x1 -= xStepBC * y2;
        x2 -= xStepAC * y2;
        y2 = 0;
      }
      x0 <<= 0x10;
      if (y0 < 0) {
        x0 -= xStepAB * y0;
        y0 = 0;
      }
      if (xStepBC < xStepAC) {
        y1 -= y0;
        y0 -= y2;
        y2 = y2 * width;
        while (true) {
          y0--;
          if (y0 < 0) {
            while (true) {
              y1--;
              if (y1 < 0) {
                return;
              }
              rasterScanline(x1 >> 16, x0 >> 16, y2, color);
              x1 += xStepBC;
              x0 += xStepAB;
              y2 += width;
            }
          }
          rasterScanline(x1 >> 16, x2 >> 16, y2, color);
          x1 += xStepBC;
          x2 += xStepAC;
          y2 += width;
        }
      } else {
        y1 -= y0;
        y0 -= y2;
        y2 = y2 * width;
        while (true) {
          y0--;
          if (y0 < 0) {
            while (true) {
              y1--;
              if (y1 < 0) {
                return;
              }
              rasterScanline(x0 >> 16, x1 >> 16, y2, color);
              x1 += xStepBC;
              x0 += xStepAB;
              y2 += width;
            }
          }
          rasterScanline(x2 >> 16, x1 >> 16, y2, color);
          x1 += xStepBC;
          x2 += xStepAC;
          y2 += width;
        }
      }
    } else {
      x2 <<= 0x10;
      x0 = x2;
      if (y2 < 0) {
        x0 -= xStepBC * y2;
        x2 -= xStepAC * y2;
        y2 = 0;
      }
      x1 <<= 0x10;
      if (y1 < 0) {
        x1 -= xStepAB * y1;
        y1 = 0;
      }
      if (xStepBC < xStepAC) {
        y0 -= y1;
        y1 -= y2;
        y2 = y2 * width;
        while (true) {
          y1--;
          if (y1 < 0) {
            while (true) {
              y0--;
              if (y0 < 0) {
                return;
              }
              rasterScanline(x1 >> 16, x2 >> 16, y2, color);
              x1 += xStepAB;
              x2 += xStepAC;
              y2 += width;
            }
          }
          rasterScanline(x0 >> 16, x2 >> 16, y2, color);
          x0 += xStepBC;
          x2 += xStepAC;
          y2 += width;
        }
      } else {
        y0 -= y1;
        y1 -= y2;
        y2 = y2 * width;
        while (true) {
          y1--;
          if (y1 < 0) {
            while (true) {
              y0--;
              if (y0 < 0) {
                return;
              }
              rasterScanline(x2 >> 16, x1 >> 16, y2, color);
              x1 += xStepAB;
              x2 += xStepAC;
              y2 += width;
            }
          }
          rasterScanline(x2 >> 16, x0 >> 16, y2, color);
          x0 += xStepBC;
          x2 += xStepAC;
          y2 += width;
        }
      }
    }
  }
}

fn rasterScanline(x0In: i32, x1In: i32, offsetIn: i32, rgbIn: u32) {
  var x0 = x0In;
  var x1 = x1In;
  var offset = offsetIn;
  var rgb = rgbIn;
  if (clipX) {
    if (x1 > boundX) {
      x1 = boundX;
    }
    if (x0 < 0) {
      x0 = 0;
    }
  }  
  if (x0 >= x1) {
    return;
  }  
  offset += x0;  
  var length = x1 - x0;
  if (writeDepth) {
    for (var x = 0; x < length; x++) {
      atomicMax(&depthBuffer[offset + x], depth);
    }
  } else if (alpha == 0) {
    for (var x = 0; x < length; x++) {
      setPixel(offset + x, rgb);
    }
  } else {
    length >>= 2;
    let alpha = alpha;
    let invAlpha = 256 - alpha;
    rgb = ((((rgb & 0xff00ff) * invAlpha) >> 8) & 0xff00ff) + ((((rgb & 0xff00) * invAlpha) >> 8) & 0xff00);
    var blendRgb: u32;
    while (true) {
      length--;
      if (length < 0) {
        length = (x1 - x0) & 0x3;
        if (length > 0) {
          while (true) {
            blendRgb = pixelBuffer.data[offset + i32(atomicLoad(&depthBuffer[offset + 1]) < depth)];
            setPixel(offset, rgb + ((((blendRgb & 0xff00ff) * alpha) >> 8) & 0xff00ff) + ((((blendRgb & 0xff00) * alpha) >> 8) & 0xff00));
            offset++;
            length--;
            if (length <= 0) {
              break;
            }
          }
        }
        break;
      }
      blendRgb = pixelBuffer.data[offset + i32(atomicLoad(&depthBuffer[offset + 1]) < depth)];
      setPixel(offset, rgb + ((((blendRgb & 0xff00ff) * alpha) >> 8) & 0xff00ff) + ((((blendRgb & 0xff00) * alpha) >> 8) & 0xff00));
      offset++;
      blendRgb = pixelBuffer.data[offset + i32(atomicLoad(&depthBuffer[offset + 1]) < depth)];
      setPixel(offset, rgb + ((((blendRgb & 0xff00ff) * alpha) >> 8) & 0xff00ff) + ((((blendRgb & 0xff00) * alpha) >> 8) & 0xff00));
      offset++;
      blendRgb = pixelBuffer.data[offset + i32(atomicLoad(&depthBuffer[offset + 1]) < depth)];
      setPixel(offset, rgb + ((((blendRgb & 0xff00ff) * alpha) >> 8) & 0xff00ff) + ((((blendRgb & 0xff00) * alpha) >> 8) & 0xff00));
      offset++;
      blendRgb = pixelBuffer.data[offset + i32(atomicLoad(&depthBuffer[offset + 1]) < depth)];
      setPixel(offset, rgb + ((((blendRgb & 0xff00ff) * alpha) >> 8) & 0xff00ff) + ((((blendRgb & 0xff00) * alpha) >> 8) & 0xff00));
      offset++;
    }
  }
}

fn rasterGouraudTriangle(xAIn: i32, xBIn: i32, xCIn: i32, yAIn: i32, yBIn: i32, yCIn: i32, colorAIn: i32, colorBIn: i32, colorCIn: i32) {
  var xA = xAIn;
  var xB = xBIn;
  var xC = xCIn;
  var yA = yAIn;
  var yB = yBIn;
  var yC = yCIn;
  var colorA = colorAIn;
  var colorB = colorBIn;
  var colorC = colorCIn;
  clipX = xA < 0 || xB < 0 || xC < 0 || xA > boundX || xB > boundX || xC > boundX;
  var xStepAB: i32;
  var colorStepAB: i32;
  if (yB != yA) {
    xStepAB = ((xB - xA) << 16) / (yB - yA);
    colorStepAB = ((colorB - colorA) << 15) / (yB - yA);
  }
  var xStepBC: i32;
  var colorStepBC: i32;
  if (yC != yB) {
    xStepBC = ((xC - xB) << 16) / (yC - yB);
    colorStepBC = ((colorC - colorB) << 15) / (yC - yB);
  }
  var xStepAC: i32;
  var colorStepAC: i32;
  if (yC != yA) {
    xStepAC = ((xA - xC) << 16) / (yA - yC);
    colorStepAC = ((colorA - colorC) << 15) / (yA - yC);
  }

  if (yA <= yB && yA <= yC) {
    if (yA < boundBottom) {
      if (yB > boundBottom) {
        yB = boundBottom;
      }
      if (yC > boundBottom) {
        yC = boundBottom;
      }
      if (yB < yC) {
        xA <<= 0x10;
        xC = xA;
        colorA <<= 0xf;
        colorC = colorA;
        if (yA < 0) {
          xC -= xStepAC * yA;
          xA -= xStepAB * yA;
          colorC -= colorStepAC * yA;
          colorA -= colorStepAB * yA;
          yA = 0;
        }
        xB <<= 0x10;
        colorB <<= 0xf;
        if (yB < 0) {
          xB -= xStepBC * yB;
          colorB -= colorStepBC * yB;
          yB = 0;
        }
        if ((yA != yB && xStepAC < xStepAB) || (yA == yB && xStepAC > xStepBC)) {
          yC -= yB;
          yB -= yA;
          yA = yA * width;
          while (true) {
            yB--;
            if (yB < 0) {
              while (true) {
                yC--;
                if (yC < 0) {
                  return;
                }
                rasterGouraudScanline(xC >> 16, xB >> 16, colorC >> 7, colorB >> 7, yA);
                xC += xStepAC;
                xB += xStepBC;
                colorC += colorStepAC;
                colorB += colorStepBC;
                yA += width;
              }
            }
            rasterGouraudScanline(xC >> 16, xA >> 16, colorC >> 7, colorA >> 7, yA);
            xC += xStepAC;
            xA += xStepAB;
            colorC += colorStepAC;
            colorA += colorStepAB;
            yA += width;
          }
        } else {
          yC -= yB;
          yB -= yA;
          yA = yA * width;
          while (true) {
            yB--;
            if (yB < 0) {
              while (true) {
                yC--;
                if (yC < 0) {
                  return;
                }
                rasterGouraudScanline(xB >> 16, xC >> 16, colorB >> 7, colorC >> 7, yA);
                xC += xStepAC;
                xB += xStepBC;
                colorC += colorStepAC;
                colorB += colorStepBC;
                yA += width;
              }
            }
            rasterGouraudScanline(xA >> 16, xC >> 16, colorA >> 7, colorC >> 7, yA);
            xC += xStepAC;
            xA += xStepAB;
            colorC += colorStepAC;
            colorA += colorStepAB;
            yA += width;
          }
        }
      } else {
        xA <<= 0x10;
        xB = xA;
        colorA <<= 0xf;
        colorB = colorA;
        if (yA < 0) {
          xB -= xStepAC * yA;
          xA -= xStepAB * yA;
          colorB -= colorStepAC * yA;
          colorA -= colorStepAB * yA;
          yA = 0;
        }
        xC <<= 0x10;
        colorC <<= 0xf;
        if (yC < 0) {
          xC -= xStepBC * yC;
          colorC -= colorStepBC * yC;
          yC = 0;
        }
        if ((yA != yC && xStepAC < xStepAB) || (yA == yC && xStepBC > xStepAB)) {
          yB -= yC;
          yC -= yA;
          yA = yA * width;
          while (true) {
            yC--;
            if (yC < 0) {
              while (true) {
                yB--;
                if (yB < 0) {
                  return;
                }
                rasterGouraudScanline(xC >> 16, xA >> 16, colorC >> 7, colorA >> 7, yA);
                xC += xStepBC;
                xA += xStepAB;
                colorC += colorStepBC;
                colorA += colorStepAB;
                yA += width;
              }
            }
            rasterGouraudScanline(xB >> 16, xA >> 16, colorB >> 7, colorA >> 7, yA);
            xB += xStepAC;
            xA += xStepAB;
            colorB += colorStepAC;
            colorA += colorStepAB;
            yA += width;
          }
        } else {
          yB -= yC;
          yC -= yA;
          yA = yA * width;
          while (true) {
            yC--;
            if (yC < 0) {
              while (true) {
                yB--;
                if (yB < 0) {
                  return;
                }
                rasterGouraudScanline(xA >> 16, xC >> 16, colorA >> 7, colorC >> 7, yA);
                xC += xStepBC;
                xA += xStepAB;
                colorC += colorStepBC;
                colorA += colorStepAB;
                yA += width;
              }
            }
            rasterGouraudScanline(xA >> 16, xB >> 16, colorA >> 7, colorB >> 7, yA);
            xB += xStepAC;
            xA += xStepAB;
            colorB += colorStepAC;
            colorA += colorStepAB;
            yA += width;
          }
        }
      }
    }
  } else if (yB <= yC) {
    if (yB < boundBottom) {
      if (yC > boundBottom) {
        yC = boundBottom;
      }
      if (yA > boundBottom) {
        yA = boundBottom;
      }
      if (yC < yA) {
        xB <<= 0x10;
        xA = xB;
        colorB <<= 0xf;
        colorA = colorB;
        if (yB < 0) {
          xA -= xStepAB * yB;
          xB -= xStepBC * yB;
          colorA -= colorStepAB * yB;
          colorB -= colorStepBC * yB;
          yB = 0;
        }
        xC <<= 0x10;
        colorC <<= 0xf;
        if (yC < 0) {
          xC -= xStepAC * yC;
          colorC -= colorStepAC * yC;
          yC = 0;
        }
        if ((yB != yC && xStepAB < xStepBC) || (yB == yC && xStepAB > xStepAC)) {
          yA -= yC;
          yC -= yB;
          yB = yB * width;
          while (true) {
            yC--;
            if (yC < 0) {
              while (true) {
                yA--;
                if (yA < 0) {
                  return;
                }
                rasterGouraudScanline(xA >> 16, xC >> 16, colorA >> 7, colorC >> 7, yB);
                xA += xStepAB;
                xC += xStepAC;
                colorA += colorStepAB;
                colorC += colorStepAC;
                yB += width;
              }
            }
            rasterGouraudScanline(xA >> 16, xB >> 16, colorA >> 7, colorB >> 7, yB);
            xA += xStepAB;
            xB += xStepBC;
            colorA += colorStepAB;
            colorB += colorStepBC;
            yB += width;
          }
        } else {
          yA -= yC;
          yC -= yB;
          yB = yB * width;
          while (true) {
            yC--;
            if (yC < 0) {
              while (true) {
                yA--;
                if (yA < 0) {
                  return;
                }
                rasterGouraudScanline(xC >> 16, xA >> 16, colorC >> 7, colorA >> 7, yB);
                xA += xStepAB;
                xC += xStepAC;
                colorA += colorStepAB;
                colorC += colorStepAC;
                yB += width;
              }
            }
            rasterGouraudScanline(xB >> 16, xA >> 16, colorB >> 7, colorA >> 7, yB);
            xA += xStepAB;
            xB += xStepBC;
            colorA += colorStepAB;
            colorB += colorStepBC;
            yB += width;
          }
        }
      } else {
        xB <<= 0x10;
        xC = xB;
        colorB <<= 0xf;
        colorC = colorB;
        if (yB < 0) {
          xC -= xStepAB * yB;
          xB -= xStepBC * yB;
          colorC -= colorStepAB * yB;
          colorB -= colorStepBC * yB;
          yB = 0;
        }
        xA <<= 0x10;
        colorA <<= 0xf;
        if (yA < 0) {
          xA -= xStepAC * yA;
          colorA -= colorStepAC * yA;
          yA = 0;
        }
        yC -= yA;
        yA -= yB;
        yB = yB * width;
        if (xStepAB < xStepBC) {
          while (true) {
            yA--;
            if (yA < 0) {
              while (true) {
                yC--;
                if (yC < 0) {
                  return;
                }
                rasterGouraudScanline(xA >> 16, xB >> 16, colorA >> 7, colorB >> 7, yB);
                xA += xStepAC;
                xB += xStepBC;
                colorA += colorStepAC;
                colorB += colorStepBC;
                yB += width;
              }
            }
            rasterGouraudScanline(xC >> 16, xB >> 16, colorC >> 7, colorB >> 7, yB);
            xC += xStepAB;
            xB += xStepBC;
            colorC += colorStepAB;
            colorB += colorStepBC;
            yB += width;
          }
        } else {
          while (true) {
            yA--;
            if (yA < 0) {
              while (true) {
                yC--;
                if (yC < 0) {
                  return;
                }
                rasterGouraudScanline(xB >> 16, xA >> 16, colorB >> 7, colorA >> 7, yB);
                xA += xStepAC;
                xB += xStepBC;
                colorA += colorStepAC;
                colorB += colorStepBC;
                yB += width;
              }
            }
            rasterGouraudScanline(xB >> 16, xC >> 16, colorB >> 7, colorC >> 7, yB);
            xC += xStepAB;
            xB += xStepBC;
            colorC += colorStepAB;
            colorB += colorStepBC;
            yB += width;
          }
        }
      }
    }
  } else if (yC < boundBottom) {
    if (yA > boundBottom) {
      yA = boundBottom;
    }
    if (yB > boundBottom) {
      yB = boundBottom;
    }
    if (yA < yB) {
      xC <<= 0x10;
      xB = xC;
      colorC <<= 0xf;
      colorB = colorC;
      if (yC < 0) {
        xB -= xStepBC * yC;
        xC -= xStepAC * yC;
        colorB -= colorStepBC * yC;
        colorC -= colorStepAC * yC;
        yC = 0;
      }
      xA <<= 0x10;
      colorA <<= 0xf;
      if (yA < 0) {
        xA -= xStepAB * yA;
        colorA -= colorStepAB * yA;
        yA = 0;
      }
      yB -= yA;
      yA -= yC;
      yC = yC * width;
      if (xStepBC < xStepAC) {
        while (true) {
          yA--;
          if (yA < 0) {
            while (true) {
              yB--;
              if (yB < 0) {
                return;
              }
              rasterGouraudScanline(xB >> 16, xA >> 16, colorB >> 7, colorA >> 7, yC);
              xB += xStepBC;
              xA += xStepAB;
              colorB += colorStepBC;
              colorA += colorStepAB;
              yC += width;
            }
          }
          rasterGouraudScanline(xB >> 16, xC >> 16, colorB >> 7, colorC >> 7, yC);
          xB += xStepBC;
          xC += xStepAC;
          colorB += colorStepBC;
          colorC += colorStepAC;
          yC += width;
        }
      } else {
        while (true) {
          yA--;
          if (yA < 0) {
            while (true) {
              yB--;
              if (yB < 0) {
                return;
              }
              rasterGouraudScanline(xA >> 16, xB >> 16, colorA >> 7, colorB >> 7, yC);
              xB += xStepBC;
              xA += xStepAB;
              colorB += colorStepBC;
              colorA += colorStepAB;
              yC += width;
            }
          }
          rasterGouraudScanline(xC >> 16, xB >> 16, colorC >> 7, colorB >> 7, yC);
          xB += xStepBC;
          xC += xStepAC;
          colorB += colorStepBC;
          colorC += colorStepAC;
          yC += width;
        }
      }
    } else {
      xC <<= 0x10;
      xA = xC;
      colorC <<= 0xf;
      colorA = colorC;
      if (yC < 0) {
        xA -= xStepBC * yC;
        xC -= xStepAC * yC;
        colorA -= colorStepBC * yC;
        colorC -= colorStepAC * yC;
        yC = 0;
      }
      xB <<= 0x10;
      colorB <<= 0xf;
      if (yB < 0) {
        xB -= xStepAB * yB;
        colorB -= colorStepAB * yB;
        yB = 0;
      }
      yA -= yB;
      yB -= yC;
      yC = yC * width;
      if (xStepBC < xStepAC) {
        while (true) {
          yB--;
          if (yB < 0) {
            while (true) {
              yA--;
              if (yA < 0) {
                return;
              }
              rasterGouraudScanline(xB >> 16, xC >> 16, colorB >> 7, colorC >> 7, yC);
              xB += xStepAB;
              xC += xStepAC;
              colorB += colorStepAB;
              colorC += colorStepAC;
              yC += width;
            }
          }
          rasterGouraudScanline(xA >> 16, xC >> 16, colorA >> 7, colorC >> 7, yC);
          xA += xStepBC;
          xC += xStepAC;
          colorA += colorStepBC;
          colorC += colorStepAC;
          yC += width;
        }
      } else {
        while (true) {
          yB--;
          if (yB < 0) {
            while (true) {
              yA--;
              if (yA < 0) {
                return;
              }
              rasterGouraudScanline(xC >> 16, xB >> 16, colorC >> 7, colorB >> 7, yC);
              xB += xStepAB;
              xC += xStepAC;
              colorB += colorStepAB;
              colorC += colorStepAC;
              yC += width;
            }
          }
          rasterGouraudScanline(xC >> 16, xA >> 16, colorC >> 7, colorA >> 7, yC);
          xA += xStepBC;
          xC += xStepAC;
          colorA += colorStepBC;
          colorC += colorStepAC;
          yC += width;
        }
      }
    }
  }
}

fn rasterGouraudScanline(x0In: i32, x1In: i32, color0In: i32, color1: i32, offsetIn: i32) {
  var x0 = x0In;
  var x1 = x1In;
  var color0 = color0In;
  var offset = offsetIn;

  var rgb: u32;
  if (jagged) {
    var colorStep: i32;
    var length: i32;

    if (clipX) {
      if (x1 - x0 > 3) {
        colorStep = ((color1 - color0) / (x1 - x0));
      } else {
        colorStep = 0;
      }
      if (x1 > boundX) {
        x1 = boundX;
      }
      if (x0 < 0) {
        color0 -= x0 * colorStep;
        x0 = 0;
      }
      if (x0 >= x1) {
        return;
      }
      offset += x0;
      length = (x1 - x0) >> 2;
      colorStep <<= 0x2;
    } else if (x0 < x1) {
      offset += x0;
      length = (x1 - x0) >> 2;
      if (length > 0) {
        colorStep = ((color1 - color0) * reciprocal15(length)) >> 15;
      } else {
        colorStep = 0;
      }
    } else {
      return;
    }
    
    if (alpha == 0) {
      while (true) {
        length--;
        if (length < 0) {
          length = (x1 - x0) & 0x3;
          if (length > 0) {
            rgb = luts.palette[color0 >> 8];
            while (true) {
              setPixel(offset, rgb);
              offset++;
              length--;
              if (length <= 0) {
                break;
              }
            }
            return;
          }
          break;
        }
        rgb = luts.palette[color0 >> 8];
        color0 += colorStep;
        setPixel(offset, rgb);
        offset++;
        setPixel(offset, rgb);
        offset++;
        setPixel(offset, rgb);
        offset++;
        setPixel(offset, rgb);
        offset++;
      }
    } else {
      let alpha = alpha;
      let invAlpha = 256 - alpha;
      var blendRgb: u32;
      while (true) {
        length--;
        if (length < 0) {
          length = (x1 - x0) & 0x3;
          if (length > 0) {
            rgb = luts.palette[color0 >> 8];
            rgb = ((((rgb & 0xff00ff) * invAlpha) >> 8) & 0xff00ff) + ((((rgb & 0xff00) * invAlpha) >> 8) & 0xff00);
            while (true) {
              blendRgb = pixelBuffer.data[offset + i32(atomicLoad(&depthBuffer[offset + 1]) < depth)];
              setPixel(offset, rgb + ((((blendRgb & 0xff00ff) * alpha) >> 8) & 0xff00ff) + ((((blendRgb & 0xff00) * alpha) >> 8) & 0xff00));
              offset++;
              length--;
              if (length <= 0) {
                break;
              }
            }
          }
          break;
        }
        rgb = luts.palette[color0 >> 8];
        color0 += colorStep;
        rgb = ((((rgb & 0xff00ff) * invAlpha) >> 8) & 0xff00ff) + ((((rgb & 0xff00) * invAlpha) >> 8) & 0xff00);
        blendRgb = pixelBuffer.data[offset + i32(atomicLoad(&depthBuffer[offset + 1]) < depth)];
        setPixel(offset, rgb + ((((blendRgb & 0xff00ff) * alpha) >> 8) & 0xff00ff) + ((((blendRgb & 0xff00) * alpha) >> 8) & 0xff00));
        offset++;
        blendRgb = pixelBuffer.data[offset + i32(atomicLoad(&depthBuffer[offset + 1]) < depth)];
        setPixel(offset, rgb + ((((blendRgb & 0xff00ff) * alpha) >> 8) & 0xff00ff) + ((((blendRgb & 0xff00) * alpha) >> 8) & 0xff00));
        offset++;
        blendRgb = pixelBuffer.data[offset + i32(atomicLoad(&depthBuffer[offset + 1]) < depth)];
        setPixel(offset, rgb + ((((blendRgb & 0xff00ff) * alpha) >> 8) & 0xff00ff) + ((((blendRgb & 0xff00) * alpha) >> 8) & 0xff00));
        offset++;
        blendRgb = pixelBuffer.data[offset + i32(atomicLoad(&depthBuffer[offset + 1]) < depth)];
        setPixel(offset, rgb + ((((blendRgb & 0xff00ff) * alpha) >> 8) & 0xff00ff) + ((((blendRgb & 0xff00) * alpha) >> 8) & 0xff00));
        offset++;
      }
    }
  }
}

fn rasterTexturedTriangle(
  xAIn: i32,
  xBIn: i32,
  xCIn: i32,
  yAIn: i32,
  yBIn: i32,
  yCIn: i32,
  shadeAIn: i32,
  shadeBIn: i32,
  shadeCIn: i32,
  originXIn: i32,
  originYIn: i32,
  originZIn: i32,
  txBIn: i32,
  txCIn: i32,
  tyBIn: i32,
  tyCIn: i32,
  tzBIn: i32,
  tzCIn: i32,
  textureId: i32
) {
  var xA = xAIn;
  var xB = xBIn;
  var xC = xCIn;
  var yA = yAIn;
  var yB = yBIn;
  var yC = yCIn;
  var shadeA = shadeAIn;
  var shadeB = shadeBIn;
  var shadeC = shadeCIn;
  var originX = originXIn;
  var originY = originYIn;
  var originZ = originZIn;
  var txB = txBIn;
  var txC = txCIn;
  var tyB = tyBIn;
  var tyC = tyCIn;
  var tzB = tzBIn;
  var tzC = tzCIn;
  let texels = &luts.textures[textureId];
  opaqueTexture = luts.texturesTranslucent[textureId] == 0;
  clipX = xA < 0 || xB < 0 || xC < 0 || xA > boundX || xB > boundX || xC > boundX;

  let verticalX = originX - txB;
  let verticalY = originY - tyB;
  let verticalZ = originZ - tzB;

  let horizontalX = txC - originX;
  let horizontalY = tyC - originY;
  let horizontalZ = tzC - originZ;

  var u = (horizontalX * originY - horizontalY * originX) << 14;
  let uStride = (horizontalY * originZ - horizontalZ * originY) << 8;
  let uStepVertical = (horizontalZ * originX - horizontalX * originZ) << 5;

  var v = (verticalX * originY - verticalY * originX) << 14;
  let vStride = (verticalY * originZ - verticalZ * originY) << 8;
  let vStepVertical = (verticalZ * originX - verticalX * originZ) << 5;

  var w = (verticalY * horizontalX - verticalX * horizontalY) << 14;
  let wStride = (verticalZ * horizontalY - verticalY * horizontalZ) << 8;
  let wStepVertical = (verticalX * horizontalZ - verticalZ * horizontalX) << 5;

  var xStepAB = 0;
  var shadeStepAB = 0;
  if (yB != yA) {
    xStepAB = (((xB - xA) << 16) / (yB - yA));
    shadeStepAB = (((shadeB - shadeA) << 16) / (yB - yA));
  }

  var xStepBC = 0;
  var shadeStepBC = 0;
  if (yC != yB) {
    xStepBC = (((xC - xB) << 16) / (yC - yB));
    shadeStepBC = (((shadeC - shadeB) << 16) / (yC - yB));
  }

  var xStepAC = 0;
  var shadeStepAC = 0;
  if (yC != yA) {
    xStepAC = (((xA - xC) << 16) / (yA - yC));
    shadeStepAC = (((shadeA - shadeC) << 16) / (yA - yC));
  }

  if (yA <= yB && yA <= yC) {
    if (yA < boundBottom) {
      if (yB > boundBottom) {
        yB = boundBottom;
      }
  
      if (yC > boundBottom) {
        yC = boundBottom;
      }
  
      if (yB < yC) {
        xA <<= 0x10;
        xC = xA;
        shadeA <<= 0x10;
        shadeC = shadeA;
        if (yA < 0) {
          xC -= xStepAC * yA;
          xA -= xStepAB * yA;
          shadeC -= shadeStepAC * yA;
          shadeA -= shadeStepAB * yA;
          yA = 0;
        }
        xB <<= 0x10;
        shadeB <<= 0x10;
        if (yB < 0) {
          xB -= xStepBC * yB;
          shadeB -= shadeStepBC * yB;
          yB = 0;
        }
        let dy = yA - centerY;
        u += uStepVertical * dy;
        v += vStepVertical * dy;
        w += wStepVertical * dy;
        if ((yA != yB && xStepAC < xStepAB) || (yA == yB && xStepAC > xStepBC)) {
          yC -= yB;
          yB -= yA;
          yA = yA * width;
          while (true) {
            yB--;
            if (yB < 0) {
              while (true) {
                yC--;
                if (yC < 0) {
                  return;
                }
                rasterTexturedScanline(xC >> 16, xB >> 16, yA, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeC >> 8, shadeB >> 8);
                xC += xStepAC;
                xB += xStepBC;
                shadeC += shadeStepAC;
                shadeB += shadeStepBC;
                yA += width;
                u += uStepVertical;
                v += vStepVertical;
                w += wStepVertical;
              }
            }
            rasterTexturedScanline(xC >> 16, xA >> 16, yA, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeC >> 8, shadeA >> 8);
            xC += xStepAC;
            xA += xStepAB;
            shadeC += shadeStepAC;
            shadeA += shadeStepAB;
            yA += width;
            u += uStepVertical;
            v += vStepVertical;
            w += wStepVertical;
          }
        } else {
          yC -= yB;
          yB -= yA;
          yA = yA * width;
          while (true) {
            yB--;
            if (yB < 0) {
              while (true) {
                yC--;
                if (yC < 0) {
                  return;
                }
                rasterTexturedScanline(xB >> 16, xC >> 16, yA, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeB >> 8, shadeC >> 8);
                xC += xStepAC;
                xB += xStepBC;
                shadeC += shadeStepAC;
                shadeB += shadeStepBC;
                yA += width;
                u += uStepVertical;
                v += vStepVertical;
                w += wStepVertical;
              }
            }
            rasterTexturedScanline(xA >> 16, xC >> 16, yA, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeA >> 8, shadeC >> 8);
            xC += xStepAC;
            xA += xStepAB;
            shadeC += shadeStepAC;
            shadeA += shadeStepAB;
            yA += width;
            u += uStepVertical;
            v += vStepVertical;
            w += wStepVertical;
          }
        }
      } else {
        xA <<= 0x10;
        xB = xA;
        shadeA <<= 0x10;
        shadeB = shadeA;
        if (yA < 0) {
          xB -= xStepAC * yA;
          xA -= xStepAB * yA;
          shadeB -= shadeStepAC * yA;
          shadeA -= shadeStepAB * yA;
          yA = 0;
        }
        xC <<= 0x10;
        shadeC <<= 0x10;
        if (yC < 0) {
          xC -= xStepBC * yC;
          shadeC -= shadeStepBC * yC;
          yC = 0;
        }
        let dy = yA - centerY;
        u += uStepVertical * dy;
        v += vStepVertical * dy;
        w += wStepVertical * dy;
        if ((yA == yC || xStepAC >= xStepAB) && (yA != yC || xStepBC <= xStepAB)) {
          yB -= yC;
          yC -= yA;
          yA = yA * width;
          while (true) {
            yC--;
            if (yC < 0) {
              while (true) {
                yB--;
                if (yB < 0) {
                  return;
                }
                rasterTexturedScanline(xA >> 16, xC >> 16, yA, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeA >> 8, shadeC >> 8);
                xC += xStepBC;
                xA += xStepAB;
                shadeC += shadeStepBC;
                shadeA += shadeStepAB;
                yA += width;
                u += uStepVertical;
                v += vStepVertical;
                w += wStepVertical;
              }
            }
            rasterTexturedScanline(xA >> 16, xB >> 16, yA, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeA >> 8, shadeB >> 8);
            xB += xStepAC;
            xA += xStepAB;
            shadeB += shadeStepAC;
            shadeA += shadeStepAB;
            yA += width;
            u += uStepVertical;
            v += vStepVertical;
            w += wStepVertical;
          }
        } else {
          yB -= yC;
          yC -= yA;
          yA = yA * width;
          while (true) {
            yC--;
            if (yC < 0) {
              while (true) {
                yB--;
                if (yB < 0) {
                  return;
                }
                rasterTexturedScanline(xC >> 16, xA >> 16, yA, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeC >> 8, shadeA >> 8);
                xC += xStepBC;
                xA += xStepAB;
                shadeC += shadeStepBC;
                shadeA += shadeStepAB;
                yA += width;
                u += uStepVertical;
                v += vStepVertical;
                w += wStepVertical;
              }
            }
            rasterTexturedScanline(xB >> 16, xA >> 16, yA, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeB >> 8, shadeA >> 8);
            xB += xStepAC;
            xA += xStepAB;
            shadeB += shadeStepAC;
            shadeA += shadeStepAB;
            yA += width;
            u += uStepVertical;
            v += vStepVertical;
            w += wStepVertical;
          }
        }
      }
    }
  } else if (yB <= yC) {
    if (yB < boundBottom) {
      if (yC > boundBottom) {
        yC = boundBottom;
      }
      if (yA > boundBottom) {
        yA = boundBottom;
      }
      if (yC < yA) {
        xB <<= 0x10;
        xA = xB;
        shadeB <<= 0x10;
        shadeA = shadeB;
        if (yB < 0) {
          xA -= xStepAB * yB;
          xB -= xStepBC * yB;
          shadeA -= shadeStepAB * yB;
          shadeB -= shadeStepBC * yB;
          yB = 0;
        }
        xC <<= 0x10;
        shadeC <<= 0x10;
        if (yC < 0) {
          xC -= xStepAC * yC;
          shadeC -= shadeStepAC * yC;
          yC = 0;
        }
        let dy = yB - centerY;
        u += uStepVertical * dy;
        v += vStepVertical * dy;
        w += wStepVertical * dy;
        if ((yB != yC && xStepAB < xStepBC) || (yB == yC && xStepAB > xStepAC)) {
          yA -= yC;
          yC -= yB;
          yB = yB * width;
          while (true) {
            yC--;
            if (yC < 0) {
              while (true) {
                yA--;
                if (yA < 0) {
                  return;
                }
                rasterTexturedScanline(xA >> 16, xC >> 16, yB, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeA >> 8, shadeC >> 8);
                xA += xStepAB;
                xC += xStepAC;
                shadeA += shadeStepAB;
                shadeC += shadeStepAC;
                yB += width;
                u += uStepVertical;
                v += vStepVertical;
                w += wStepVertical;
              }
            }
            rasterTexturedScanline(xA >> 16, xB >> 16, yB, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeA >> 8, shadeB >> 8);
            xA += xStepAB;
            xB += xStepBC;
            shadeA += shadeStepAB;
            shadeB += shadeStepBC;
            yB += width;
            u += uStepVertical;
            v += vStepVertical;
            w += wStepVertical;
          }
        } else {
          yA -= yC;
          yC -= yB;
          yB = yB * width;
          while (true) {
            yC--;
            if (yC < 0) {
              while (true) {
                yA--;
                if (yA < 0) {
                  return;
                }
                rasterTexturedScanline(xC >> 16, xA >> 16, yB, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeC >> 8, shadeA >> 8);
                xA += xStepAB;
                xC += xStepAC;
                shadeA += shadeStepAB;
                shadeC += shadeStepAC;
                yB += width;
                u += uStepVertical;
                v += vStepVertical;
                w += wStepVertical;
              }
            }
            rasterTexturedScanline(xB >> 16, xA >> 16, yB, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeB >> 8, shadeA >> 8);
            xA += xStepAB;
            xB += xStepBC;
            shadeA += shadeStepAB;
            shadeB += shadeStepBC;
            yB += width;
            u += uStepVertical;
            v += vStepVertical;
            w += wStepVertical;
          }
        }
      } else {
        xB <<= 0x10;
        xC = xB;
        shadeB <<= 0x10;
        shadeC = shadeB;
        if (yB < 0) {
          xC -= xStepAB * yB;
          xB -= xStepBC * yB;
          shadeC -= shadeStepAB * yB;
          shadeB -= shadeStepBC * yB;
          yB = 0;
        }
        xA <<= 0x10;
        shadeA <<= 0x10;
        if (yA < 0) {
          xA -= xStepAC * yA;
          shadeA -= shadeStepAC * yA;
          yA = 0;
        }
        let dy = yB - centerY;
        u += uStepVertical * dy;
        v += vStepVertical * dy;
        w += wStepVertical * dy;
        yC -= yA;
        yA -= yB;
        yB = yB * width;
        if (xStepAB < xStepBC) {
          while (true) {
            yA--;
            if (yA < 0) {
              while (true) {
                yC--;
                if (yC < 0) {
                  return;
                }
                rasterTexturedScanline(xA >> 16, xB >> 16, yB, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeA >> 8, shadeB >> 8);
                xA += xStepAC;
                xB += xStepBC;
                shadeA += shadeStepAC;
                shadeB += shadeStepBC;
                yB += width;
                u += uStepVertical;
                v += vStepVertical;
                w += wStepVertical;
              }
            }
            rasterTexturedScanline(xC >> 16, xB >> 16, yB, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeC >> 8, shadeB >> 8);
            xC += xStepAB;
            xB += xStepBC;
            shadeC += shadeStepAB;
            shadeB += shadeStepBC;
            yB += width;
            u += uStepVertical;
            v += vStepVertical;
            w += wStepVertical;
          }
        } else {
          while (true) {
            yA--;
            if (yA < 0) {
              while (true) {
                yC--;
                if (yC < 0) {
                  return;
                }
                rasterTexturedScanline(xB >> 16, xA >> 16, yB, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeB >> 8, shadeA >> 8);
                xA += xStepAC;
                xB += xStepBC;
                shadeA += shadeStepAC;
                shadeB += shadeStepBC;
                yB += width;
                u += uStepVertical;
                v += vStepVertical;
                w += wStepVertical;
              }
            }
            rasterTexturedScanline(xB >> 16, xC >> 16, yB, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeB >> 8, shadeC >> 8);
            xC += xStepAB;
            xB += xStepBC;
            shadeC += shadeStepAB;
            shadeB += shadeStepBC;
            yB += width;
            u += uStepVertical;
            v += vStepVertical;
            w += wStepVertical;
          }
        }
      }
    }
  } else if (yC < boundBottom) {
    if (yA > boundBottom) {
      yA = boundBottom;
    }
    if (yB > boundBottom) {
      yB = boundBottom;
    }
    if (yA < yB) {
      xC <<= 0x10;
      xB = xC;
      shadeC <<= 0x10;
      shadeB = shadeC;
      if (yC < 0) {
        xB -= xStepBC * yC;
        xC -= xStepAC * yC;
        shadeB -= shadeStepBC * yC;
        shadeC -= shadeStepAC * yC;
        yC = 0;
      }
      xA <<= 0x10;
      shadeA <<= 0x10;
      if (yA < 0) {
        xA -= xStepAB * yA;
        shadeA -= shadeStepAB * yA;
        yA = 0;
      }
      let dy = yC - centerY;
      u += uStepVertical * dy;
      v += vStepVertical * dy;
      w += wStepVertical * dy;
      yB -= yA;
      yA -= yC;
      yC = yC * width;
      if (xStepBC < xStepAC) {
        while (true) {
          yA--;
          if (yA < 0) {
            while (true) {
              yB--;
              if (yB < 0) {
                return;
              }
              rasterTexturedScanline(xB >> 16, xA >> 16, yC, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeB >> 8, shadeA >> 8);
              xB += xStepBC;
              xA += xStepAB;
              shadeB += shadeStepBC;
              shadeA += shadeStepAB;
              yC += width;
              u += uStepVertical;
              v += vStepVertical;
              w += wStepVertical;
            }
          }
          rasterTexturedScanline(xB >> 16, xC >> 16, yC, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeB >> 8, shadeC >> 8);
          xB += xStepBC;
          xC += xStepAC;
          shadeB += shadeStepBC;
          shadeC += shadeStepAC;
          yC += width;
          u += uStepVertical;
          v += vStepVertical;
          w += wStepVertical;
        }
      } else {
        while (true) {
          yA--;
          if (yA < 0) {
            while (true) {
              yB--;
              if (yB < 0) {
                return;
              }
              rasterTexturedScanline(xA >> 16, xB >> 16, yC, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeA >> 8, shadeB >> 8);
              xB += xStepBC;
              xA += xStepAB;
              shadeB += shadeStepBC;
              shadeA += shadeStepAB;
              yC += width;
              u += uStepVertical;
              v += vStepVertical;
              w += wStepVertical;
            }
          }
          rasterTexturedScanline(xC >> 16, xB >> 16, yC, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeC >> 8, shadeB >> 8);
          xB += xStepBC;
          xC += xStepAC;
          shadeB += shadeStepBC;
          shadeC += shadeStepAC;
          yC += width;
          u += uStepVertical;
          v += vStepVertical;
          w += wStepVertical;
        }
      }
    } else {
      xC <<= 0x10;
      xA = xC;
      shadeC <<= 0x10;
      shadeA = shadeC;
      if (yC < 0) {
        xA -= xStepBC * yC;
        xC -= xStepAC * yC;
        shadeA -= shadeStepBC * yC;
        shadeC -= shadeStepAC * yC;
        yC = 0;
      }
      xB <<= 0x10;
      shadeB <<= 0x10;
      if (yB < 0) {
        xB -= xStepAB * yB;
        shadeB -= shadeStepAB * yB;
        yB = 0;
      }
      let dy = yC - centerY;
      u += uStepVertical * dy;
      v += vStepVertical * dy;
      w += wStepVertical * dy;
      yA -= yB;
      yB -= yC;
      yC = yC * width;
      if (xStepBC < xStepAC) {
        while (true) {
          yB--;
          if (yB < 0) {
            while (true) {
              yA--;
              if (yA < 0) {
                return;
              }
              rasterTexturedScanline(xB >> 16, xC >> 16, yC, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeB >> 8, shadeC >> 8);
              xB += xStepAB;
              xC += xStepAC;
              shadeB += shadeStepAB;
              shadeC += shadeStepAC;
              yC += width;
              u += uStepVertical;
              v += vStepVertical;
              w += wStepVertical;
            }
          }
          rasterTexturedScanline(xA >> 16, xC >> 16, yC, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeA >> 8, shadeC >> 8);
          xA += xStepBC;
          xC += xStepAC;
          shadeA += shadeStepBC;
          shadeC += shadeStepAC;
          yC += width;
          u += uStepVertical;
          v += vStepVertical;
          w += wStepVertical;
        }
      } else {
        while (true) {
          yB--;
          if (yB < 0) {
            while (true) {
              yA--;
              if (yA < 0) {
                return;
              }
              rasterTexturedScanline(xC >> 16, xB >> 16, yC, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeC >> 8, shadeB >> 8);
              xB += xStepAB;
              xC += xStepAC;
              shadeB += shadeStepAB;
              shadeC += shadeStepAC;
              yC += width;
              u += uStepVertical;
              v += vStepVertical;
              w += wStepVertical;
            }
          }
          rasterTexturedScanline(xC >> 16, xA >> 16, yC, texels, 0, 0, u, v, w, uStride, vStride, wStride, shadeC >> 8, shadeA >> 8);
          xA += xStepBC;
          xC += xStepAC;
          shadeA += shadeStepBC;
          shadeC += shadeStepAC;
          yC += width;
          u += uStepVertical;
          v += vStepVertical;
          w += wStepVertical;
        }
      }
    }
  }
}

fn rasterTexturedScanline(
  xAIn: i32, 
  xBIn: i32, 
  offsetIn: i32, 
  texels: ptr<storage, array<u32, 65536>>, 
  curUIn: i32, 
  curVIn: i32, 
  uIn: i32, 
  vIn: i32, 
  wIn: i32, 
  uStride: i32, 
  vStride: i32, 
  wStride: i32, 
  shadeAIn: i32, 
  shadeBIn: i32
) {
  var xA = xAIn;
  var xB = xBIn;
  var offset = offsetIn;
  var curU = curUIn;
  var curV = curVIn;
  var u = uIn;
  var v = vIn;
  var w = wIn;
  var shadeA = shadeAIn;
  var shadeB = shadeBIn;
  if (xA >= xB) {
      return;
  } 
  var shadeStrides: i32;
  var strides: i32;
  if (clipX) {
    shadeStrides = ((shadeB - shadeA) / (xB - xA));   
    if (xB > boundX) {
      xB = boundX;
    }   
    if (xA < 0) {
      shadeA -= xA * shadeStrides;
      xA = 0;
    }   
    if (xA >= xB) {
      return;
    }   
    strides = (xB - xA) >> 3;
    shadeStrides <<= 0xc;
  } else {
    if (xB - xA > 7) {
      strides = (xB - xA) >> 3;
      shadeStrides = ((shadeB - shadeA) * reciprocal15(strides)) >> 6;
    } else {
      strides = 0;
      shadeStrides = 0;
    }
  }

  shadeA <<= 0x9;
  offset += xA;

  var nextU = 0;
  var nextV = 0;
  var dx = xA - centerX;
  u = u + (uStride >> 3) * dx;
  v = v + (vStride >> 3) * dx;
  w = w + (wStride >> 3) * dx;
  var curW = w >> 14;
  if (curW != 0) {
    curU = (u / curW);
    curV = (v / curW);
    if (curU < 0) {
      curU = 0;
    } else if (curU > 16256) {
      curU = 16256;
    }
  }
  u = u + uStride;
  v = v + vStride;
  w = w + wStride;
  curW = w >> 14;
  if (curW != 0) {
    nextU = (u / curW);
    nextV = (v / curW);
    if (nextU < 7) {
      nextU = 7;
    } else if (nextU > 16256) {
      nextU = 16256;
    }
  }
  var stepU = (nextU - curU) >> 3;
  var stepV = (nextV - curV) >> 3;
  curU += shadeA & 0x600000;
  var shadeShift = u32(shadeA >> 23);
  if (writeDepth) {
    while (strides > 0) {
      strides--;
      var rgb = texels[(curV & 0x3f80) + (curU >> 7)] >> shadeShift;
      if (rgb != 0) {
        atomicMax(&depthBuffer[offset], depth);
      }
      offset = offset + 1;
      curU += stepU;
      curV += stepV;
      rgb = texels[(curV & 0x3f80) + (curU >> 7)] >> shadeShift;
      if (rgb != 0) {
        atomicMax(&depthBuffer[offset], depth);
      }
      offset++;
      curU += stepU;
      curV += stepV;
      rgb = texels[(curV & 0x3f80) + (curU >> 7)] >> shadeShift;
      if (rgb != 0) {
        atomicMax(&depthBuffer[offset], depth);
      }
      offset++;
      curU += stepU;
      curV += stepV;
      rgb = texels[(curV & 0x3f80) + (curU >> 7)] >> shadeShift;
      if (rgb != 0) {
        atomicMax(&depthBuffer[offset], depth);
      }
      offset++;
      curU += stepU;
      curV += stepV;
      rgb = texels[(curV & 0x3f80) + (curU >> 7)] >> shadeShift;
      if (rgb != 0) {
        atomicMax(&depthBuffer[offset], depth);
      }
      offset++;
      curU += stepU;
      curV += stepV;
      rgb = texels[(curV & 0x3f80) + (curU >> 7)] >> shadeShift;
      if (rgb != 0) {
        atomicMax(&depthBuffer[offset], depth);
      }
      offset++;
      curU += stepU;
      curV += stepV;
      rgb = texels[(curV & 0x3f80) + (curU >> 7)] >> shadeShift;
      if (rgb != 0) {
        atomicMax(&depthBuffer[offset], depth);
      }
      offset++;
      curU += stepU;
      curV += stepV;
      rgb = texels[(curV & 0x3f80) + (curU >> 7)] >> shadeShift;
      if (rgb != 0) {
        atomicMax(&depthBuffer[offset], depth);
      }
      offset++;
      curU = nextU;
      curV = nextV;
      u += uStride;
      v += vStride;
      w += wStride;
      curW = w >> 14;
      if (curW != 0) {
        nextU = (u / curW);
        nextV = (v / curW);
        if (nextU < 7) {
          nextU = 7;
        } else if (nextU > 16256) {
          nextU = 16256;
        }
      }
      stepU = (nextU - curU) >> 3;
      stepV = (nextV - curV) >> 3;
      shadeA += shadeStrides;
      curU += shadeA & 0x600000;
      shadeShift = u32(shadeA >> 23);
    }
    strides = (xB - xA) & 0x7;
    while (strides > 0) {
      strides--;
      var rgb = texels[(curV & 0x3f80) + (curU >> 7)] >> shadeShift;
      if (rgb != 0) {
        atomicMax(&depthBuffer[offset], depth);
      }
      offset++;
      curU += stepU;
      curV += stepV;
    }
  } else if (opaqueTexture) {
    while (strides > 0) {
      strides--;
      setPixel(offset, texels[(curV & 0x3f80) + (curU >> 7)] >> shadeShift);
      offset++;
      curU += stepU;
      curV += stepV;
      setPixel(offset, texels[(curV & 0x3f80) + (curU >> 7)] >> shadeShift);
      offset++;
      curU += stepU;
      curV += stepV;
      setPixel(offset, texels[(curV & 0x3f80) + (curU >> 7)] >> shadeShift);
      offset++;
      curU += stepU;
      curV += stepV;
      setPixel(offset, texels[(curV & 0x3f80) + (curU >> 7)] >> shadeShift);
      offset++;
      curU += stepU;
      curV += stepV;
      setPixel(offset, texels[(curV & 0x3f80) + (curU >> 7)] >> shadeShift);
      offset++;
      curU += stepU;
      curV += stepV;
      setPixel(offset, texels[(curV & 0x3f80) + (curU >> 7)] >> shadeShift);
      offset++;
      curU += stepU;
      curV += stepV;
      setPixel(offset, texels[(curV & 0x3f80) + (curU >> 7)] >> shadeShift);
      offset++;
      curU += stepU;
      curV += stepV;
      setPixel(offset, texels[(curV & 0x3f80) + (curU >> 7)] >> shadeShift);
      offset++;
      curU = nextU;
      curV = nextV;
      u += uStride;
      v += vStride;
      w += wStride;
      curW = w >> 14;
      if (curW != 0) {
        nextU = (u / curW);
        nextV = (v / curW);
        if (nextU < 7) {
          nextU = 7;
        } else if (nextU > 16256) {
          nextU = 16256;
        }
      }
      stepU = (nextU - curU) >> 3;
      stepV = (nextV - curV) >> 3;
      shadeA += shadeStrides;
      curU += shadeA & 0x600000;
      shadeShift = u32(shadeA >> 23);
    }
    strides = (xB - xA) & 0x7;
    while (strides > 0) {
      strides--;
      setPixel(offset, texels[(curV & 0x3f80) + (curU >> 7)] >> shadeShift);
      offset++;
      curU += stepU;
      curV += stepV;
    }
  } else {
    while (strides > 0) {
      strides--;
      var rgb = texels[(curV & 0x3f80) + (curU >> 7)] >> shadeShift;
      if (rgb != 0) {
        setPixel(offset, rgb);
      }
      offset = offset + 1;
      curU += stepU;
      curV += stepV;
      rgb = texels[(curV & 0x3f80) + (curU >> 7)] >> shadeShift;
      if (rgb != 0) {
        setPixel(offset, rgb);
      }
      offset++;
      curU += stepU;
      curV += stepV;
      rgb = texels[(curV & 0x3f80) + (curU >> 7)] >> shadeShift;
      if (rgb != 0) {
        setPixel(offset, rgb);
      }
      offset++;
      curU += stepU;
      curV += stepV;
      rgb = texels[(curV & 0x3f80) + (curU >> 7)] >> shadeShift;
      if (rgb != 0) {
        setPixel(offset, rgb);
      }
      offset++;
      curU += stepU;
      curV += stepV;
      rgb = texels[(curV & 0x3f80) + (curU >> 7)] >> shadeShift;
      if (rgb != 0) {
        setPixel(offset, rgb);
      }
      offset++;
      curU += stepU;
      curV += stepV;
      rgb = texels[(curV & 0x3f80) + (curU >> 7)] >> shadeShift;
      if (rgb != 0) {
        setPixel(offset, rgb);
      }
      offset++;
      curU += stepU;
      curV += stepV;
      rgb = texels[(curV & 0x3f80) + (curU >> 7)] >> shadeShift;
      if (rgb != 0) {
        setPixel(offset, rgb);
      }
      offset++;
      curU += stepU;
      curV += stepV;
      rgb = texels[(curV & 0x3f80) + (curU >> 7)] >> shadeShift;
      if (rgb != 0) {
        setPixel(offset, rgb);
      }
      offset++;
      curU = nextU;
      curV = nextV;
      u += uStride;
      v += vStride;
      w += wStride;
      curW = w >> 14;
      if (curW != 0) {
        nextU = (u / curW);
        nextV = (v / curW);
        if (nextU < 7) {
          nextU = 7;
        } else if (nextU > 16256) {
          nextU = 16256;
        }
      }
      stepU = (nextU - curU) >> 3;
      stepV = (nextV - curV) >> 3;
      shadeA += shadeStrides;
      curU += shadeA & 0x600000;
      shadeShift = u32(shadeA >> 23);
    }
    strides = (xB - xA) & 0x7;
    while (strides > 0) {
      strides--;
      var rgb = texels[(curV & 0x3f80) + (curU >> 7)] >> shadeShift;
      if (rgb != 0) {
        setPixel(offset, rgb);
      }
      offset++;
      curU += stepU;
      curV += stepV;
    }
  }
}

fn reciprocal15(value: i32) -> i32 {
  return 32768 / value;
}

fn reciprocal16(value: i32) -> i32 {
  return 65536 / value;
}
`;var R8=`
fn unpackColor888(rgb: u32) -> vec3f {
  let r = f32((rgb >> 16) & 0xff) / 255.0;
  let g = f32((rgb >> 8) & 0xff) / 255.0;
  let b = f32(rgb & 0xff) / 255.0;
  return vec3f(r, g, b);
}
`;var _8=`
struct PixelBuffer {
  data: array<u32>,
};

struct Uniforms {
  screenWidth: f32,
  screenHeight: f32,
};

@group(0) @binding(0) var<uniform> uniforms: Uniforms;
@group(0) @binding(1) var<storage, read> pixelBuffer: PixelBuffer;

${R8}

@fragment
fn frag_main(@location(0) TexCoord: vec2f) -> @location(0) vec4f {
  let coord = floor(vec2f(TexCoord.x * uniforms.screenWidth, TexCoord.y * uniforms.screenHeight));
  let index = u32(coord.y * uniforms.screenWidth + coord.x);

  let finalColor = vec4f(unpackColor888(pixelBuffer.data[index]), 1.0);
  return finalColor;
}

`;var E8=`
@group(0) @binding(0) var textureSampler: sampler;
@group(0) @binding(1) var texture: texture_2d<f32>;

@fragment
fn frag_main(@location(0) TexCoord: vec2f) -> @location(0) vec4f {
  var color = textureSample(texture, textureSampler, TexCoord).bgra;
  if (all(color == vec4f(1.0))) {
    discard;
  }
  return color;
}
`;var I8=`
@group(0) @binding(0) var textureSampler: sampler;
@group(0) @binding(1) var texture: texture_2d<f32>;

@fragment
fn frag_main(@location(0) TexCoord: vec2f) -> @location(0) vec4f {
  var color = textureSample(texture, textureSampler, TexCoord);
  return color;
}
`;var H8=`
struct VertexOutput {
  @builtin(position) Position: vec4f,
  @location(0) TexCoord: vec2f,
};

@vertex
fn vert_main(@builtin(vertex_index) VertexIndex: u32) -> VertexOutput {
  var pos = array(
    vec2f(-1,  3),
    vec2f( 3, -1),
    vec2f(-1, -1),
  );

  var output: VertexOutput;
  output.Position = vec4f(pos[VertexIndex], 0.0, 1.0);
  output.TexCoord = pos[VertexIndex] * 0.5 + 0.5;
  output.TexCoord.y = 1.0 - output.TexCoord.y;
  return output;
}
`;var x6=65536,F6=50,N8=128,O8=N8*N8,G1=262144,$1=F6*4,k7=F6*O8*4*4;class l0 extends C{drawTileUnderlay(A,R,_,E,I){return!1}drawTileOverlay(A,R,_,E){return!1}startDrawModel(A,R,_,E,I,H){}endDrawModel(A,R,_,E,I,H){}drawModelTriangle(A,R){return!1}device;context;defaultSampler;samplerTextureGroupLayout;frameTexture;frameBindGroup;uniformBuffer;pixelBuffer;depthBuffer;lutsBuffer;rasterizerShaderModule;rasterizerBindGroupLayout;triangleDataBindGroupLayout;rasterizerBindGroup;clearPipeline;renderFlatDepthPipeline;renderGouraudDepthPipeline;renderTexturedDepthPipeline;renderFlatPipeline;renderGouraudPipeline;renderTexturedPipeline;renderAlphaPipeline;fullscreenVertexShaderModule;pixMapShaderModule;pixMapPipeline;textureShaderModule;frameTexturePipeline;pixelBufferShaderModule;pixelBufferPipeline;pixelBufferBindGroup;frameRenderPassDescriptor;renderPassDescriptor;flatTriangleDataBuffer;gouraudTriangleDataBuffer;texturedTriangleDataBuffer;alphaTriangleDataBuffer;encoder;mainPass;isRenderingFrame=!1;isRenderingScene=!1;queuedRenderPixMapCommands=[];triangleCount=0;flatTriangleData=new Uint32Array(x6*8);flatTriangleCount=0;gouraudTriangleData=new Uint32Array(x6*10);gouraudTriangleCount=0;texturedTriangleData=new Uint32Array(x6*20);texturedTriangleCount=0;alphaTriangleData=new Uint32Array(x6*10);alphaTriangleCount=0;texturesToDelete=[];texturesUsed=new Array(F6).fill(!1);textureStagingBuffers=[];frameCount=0;static hasWebGPUSupport(){return"gpu"in navigator}static async init(A,R,_){if(!l0.hasWebGPUSupport())throw Error("WebGPU is not supported.");let E=await navigator.gpu.requestAdapter();if(!E)throw Error("Request for WebGPU adapter failed.");let I=await E.requestDevice();if(!I)throw new Error("Request for WebGPU device failed.");let H=document.createElement("canvas");H.width=R,H.height=_,H.style.display=L0.style.display,H.style.position=L0.style.position,H.style.width="100%",H.style.height="100%",H.style.imageRendering=L0.style.imageRendering,A.appendChild(H);let N=H.getContext("webgpu");if(!N)throw H.remove(),new Error("WebGPU context could not be created.");let O=navigator.gpu.getPreferredCanvasFormat();return N.configure({device:I,format:O}),C.resetRenderer(),new l0(H,I,N)}constructor(A,R,_){super(A);this.device=R,this.context=_,this.init()}init(){let A=S.viewportRight,R=S.viewportBottom;this.defaultSampler=this.device.createSampler(),this.samplerTextureGroupLayout=this.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,sampler:{type:"filtering"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float"}}]}),this.frameTexture=this.device.createTexture({size:{width:this.canvas.width,height:this.canvas.height},format:"rgba8unorm",usage:GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING}),this.frameBindGroup=this.device.createBindGroup({layout:this.samplerTextureGroupLayout,entries:[{binding:0,resource:this.defaultSampler},{binding:1,resource:this.frameTexture.createView()}]}),this.device.queue.copyExternalImageToTexture({source:L0},{texture:this.frameTexture},{width:this.canvas.width,height:this.canvas.height}),this.uniformBuffer=this.device.createBuffer({size:8,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.device.queue.writeBuffer(this.uniformBuffer,0,new Float32Array([A,R])),this.pixelBuffer=this.device.createBuffer({size:A*R*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this.depthBuffer=this.device.createBuffer({size:A*R*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this.lutsBuffer=this.device.createBuffer({size:G1+$1+k7,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this.updatePalette(),this.updateTextures(),this.rasterizerShaderModule=this.device.createShaderModule({label:"rasterizer shaders",code:A8}),this.rasterizerBindGroupLayout=this.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:1,visibility:GPUShaderStage.COMPUTE,buffer:{type:"storage"}},{binding:2,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}}]}),this.triangleDataBindGroupLayout=this.device.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:"read-only-storage"}}]}),this.rasterizerBindGroup=this.device.createBindGroup({layout:this.rasterizerBindGroupLayout,entries:[{binding:0,resource:{buffer:this.pixelBuffer}},{binding:1,resource:{buffer:this.depthBuffer}},{binding:2,resource:{buffer:this.lutsBuffer}}]}),this.clearPipeline=this.device.createComputePipeline({label:"clear pixels pipeline",layout:this.device.createPipelineLayout({bindGroupLayouts:[this.rasterizerBindGroupLayout]}),compute:{module:this.rasterizerShaderModule,entryPoint:"clear"}}),this.renderFlatDepthPipeline=this.device.createComputePipeline({label:"render flat depth pipeline",layout:this.device.createPipelineLayout({bindGroupLayouts:[this.rasterizerBindGroupLayout,this.triangleDataBindGroupLayout]}),compute:{module:this.rasterizerShaderModule,entryPoint:"renderFlatDepth"}}),this.renderGouraudDepthPipeline=this.device.createComputePipeline({label:"render gouraud depth pipeline",layout:this.device.createPipelineLayout({bindGroupLayouts:[this.rasterizerBindGroupLayout,this.triangleDataBindGroupLayout]}),compute:{module:this.rasterizerShaderModule,entryPoint:"renderGouraudDepth"}}),this.renderTexturedDepthPipeline=this.device.createComputePipeline({label:"render textured depth pipeline",layout:this.device.createPipelineLayout({bindGroupLayouts:[this.rasterizerBindGroupLayout,this.triangleDataBindGroupLayout]}),compute:{module:this.rasterizerShaderModule,entryPoint:"renderTexturedDepth"}}),this.renderFlatPipeline=this.device.createComputePipeline({label:"render flat pipeline",layout:this.device.createPipelineLayout({bindGroupLayouts:[this.rasterizerBindGroupLayout,this.triangleDataBindGroupLayout]}),compute:{module:this.rasterizerShaderModule,entryPoint:"renderFlat"}}),this.renderGouraudPipeline=this.device.createComputePipeline({label:"render gouraud pipeline",layout:this.device.createPipelineLayout({bindGroupLayouts:[this.rasterizerBindGroupLayout,this.triangleDataBindGroupLayout]}),compute:{module:this.rasterizerShaderModule,entryPoint:"renderGouraud"}}),this.renderTexturedPipeline=this.device.createComputePipeline({label:"render textured pipeline",layout:this.device.createPipelineLayout({bindGroupLayouts:[this.rasterizerBindGroupLayout,this.triangleDataBindGroupLayout]}),compute:{module:this.rasterizerShaderModule,entryPoint:"renderTextured"}}),this.renderAlphaPipeline=this.device.createComputePipeline({label:"render alpha pipeline",layout:this.device.createPipelineLayout({bindGroupLayouts:[this.rasterizerBindGroupLayout,this.triangleDataBindGroupLayout]}),compute:{module:this.rasterizerShaderModule,entryPoint:"renderAlpha"}}),this.fullscreenVertexShaderModule=this.device.createShaderModule({label:"fullscreen vertex shader",code:H8}),this.pixMapShaderModule=this.device.createShaderModule({label:"pixmap shader",code:E8}),this.pixMapPipeline=this.device.createRenderPipeline({label:"pixmap pipeline",layout:this.device.createPipelineLayout({bindGroupLayouts:[this.samplerTextureGroupLayout]}),vertex:{module:this.fullscreenVertexShaderModule},fragment:{module:this.pixMapShaderModule,targets:[{format:"rgba8unorm"}]}}),this.textureShaderModule=this.device.createShaderModule({label:"texture shader",code:I8}),this.frameTexturePipeline=this.device.createRenderPipeline({label:"frame texture pipeline",layout:this.device.createPipelineLayout({bindGroupLayouts:[this.samplerTextureGroupLayout]}),vertex:{module:this.fullscreenVertexShaderModule},fragment:{module:this.textureShaderModule,targets:[{format:navigator.gpu.getPreferredCanvasFormat()}]}}),this.pixelBufferShaderModule=this.device.createShaderModule({label:"pixel buffer shader",code:_8}),this.pixelBufferPipeline=this.device.createRenderPipeline({label:"pixel buffer pipeline",layout:"auto",vertex:{module:this.fullscreenVertexShaderModule},fragment:{module:this.pixelBufferShaderModule,targets:[{format:"rgba8unorm"}]}}),this.pixelBufferBindGroup=this.device.createBindGroup({layout:this.pixelBufferPipeline.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniformBuffer}},{binding:1,resource:{buffer:this.pixelBuffer}}]}),this.frameRenderPassDescriptor={label:"frame render pass",colorAttachments:[{view:this.context.getCurrentTexture().createView(),clearValue:{r:0,g:0,b:0,a:1},loadOp:"load",storeOp:"store"}]},this.renderPassDescriptor={label:"main render pass",colorAttachments:[{view:this.frameTexture.createView(),clearValue:{r:0,g:0,b:0,a:1},loadOp:"load",storeOp:"store"}]}}resize(A,R){super.resize(A,R)}startFrame(){this.isRenderingFrame=!0,this.texturesUsed.fill(!1),this.encoder=this.device.createCommandEncoder({label:"render command encoder"}),this.mainPass=this.encoder.beginRenderPass(this.renderPassDescriptor);for(let A of this.queuedRenderPixMapCommands)this.renderPixMap(A.pixMap,A.x,A.y);this.queuedRenderPixMapCommands.length=0}endFrame(){if(!this.isRenderingFrame)return;this.isRenderingFrame=!1,this.mainPass.end();for(let _ of this.frameRenderPassDescriptor.colorAttachments)_.view=this.context.getCurrentTexture().createView();let A=this.encoder.beginRenderPass(this.frameRenderPassDescriptor);A.setViewport(0,0,this.canvas.width,this.canvas.height,0,1),A.setPipeline(this.frameTexturePipeline),A.setBindGroup(0,this.frameBindGroup),A.draw(3),A.end();let R=this.encoder.finish();this.device.queue.submit([R]);for(let _ of this.texturesToDelete)_.destroy();this.texturesToDelete.length=0}updatePalette(){this.device.queue.writeBuffer(this.lutsBuffer,0,m.hslPal)}updateTextures(){for(let R=0;R<F6;R++)this.updateTexture(R,!1);let A=new Uint32Array($1);for(let R=0;R<F6;R++)A[R]=m.textureTranslucent[R]?1:0;this.device.queue.writeBuffer(this.lutsBuffer,G1,A)}updateTexture(A,R=!0){let _=m.getTexels(A);if(!_)return;let E=O8*4*4,I=G1+$1+A*E;if(R){let H;if(this.textureStagingBuffers.length>0)H=this.textureStagingBuffers.pop();else H=this.device.createBuffer({size:E,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.MAP_WRITE,mappedAtCreation:!0});new Uint32Array(H.getMappedRange()).set(_),H.unmap();let N=this.device.createCommandEncoder();N.copyBufferToBuffer(H,0,this.lutsBuffer,I,E),this.device.queue.submit([N.finish()]),H.mapAsync(GPUMapMode.WRITE).then(()=>{this.textureStagingBuffers.push(H)})}else this.device.queue.writeBuffer(this.lutsBuffer,I,_)}setBrightness(A){this.updatePalette()}renderPixMap(A,R,_){if(!this.isRenderingFrame)return this.queuedRenderPixMapCommands.push({pixMap:A,x:R,y:_}),!0;let E=S.viewportRight,I=S.viewportBottom;if(A.width2d===E&&A.height2d===I)this.mainPass.setViewport(R,_,E,I,0,1),this.mainPass.setPipeline(this.pixelBufferPipeline),this.mainPass.setBindGroup(0,this.pixelBufferBindGroup),this.mainPass.draw(3);let H=this.device.createTexture({size:{width:A.width2d,height:A.height2d},format:"rgba8unorm",usage:GPUTextureUsage.COPY_DST|GPUTextureUsage.TEXTURE_BINDING});this.device.queue.writeTexture({texture:H},A.pixels,{bytesPerRow:A.width2d*4},{width:A.width2d,height:A.height2d});let N=this.device.createBindGroup({layout:this.samplerTextureGroupLayout,entries:[{binding:0,resource:this.defaultSampler},{binding:1,resource:H.createView()}]});return this.mainPass.setViewport(R,_,A.width2d,A.height2d,0,1),this.mainPass.setPipeline(this.pixMapPipeline),this.mainPass.setBindGroup(0,N),this.mainPass.draw(3),this.texturesToDelete.push(H),!0}startRenderScene(){this.isRenderingScene=!0,this.triangleCount=0,this.flatTriangleCount=0,this.texturedTriangleCount=0,this.gouraudTriangleCount=0,this.alphaTriangleCount=0}endRenderScene(){this.isRenderingScene=!1,this.renderScene()}renderScene(){let A=S.viewportRight,R=S.viewportBottom,_=this.flatTriangleDataBuffer;if(_)_.destroy(),this.flatTriangleDataBuffer=void 0;let E=this.gouraudTriangleDataBuffer;if(E)E.destroy(),this.gouraudTriangleDataBuffer=void 0;let I=this.texturedTriangleDataBuffer;if(I)I.destroy(),this.texturedTriangleDataBuffer=void 0;let H=this.alphaTriangleDataBuffer;if(H)H.destroy(),this.alphaTriangleDataBuffer=void 0;let N;if(this.flatTriangleCount>0)_=this.device.createBuffer({size:this.flatTriangleCount*8*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this.flatTriangleDataBuffer=_,this.device.queue.writeBuffer(_,0,this.flatTriangleData.subarray(0,this.flatTriangleCount*8)),N=this.device.createBindGroup({layout:this.triangleDataBindGroupLayout,entries:[{binding:0,resource:{buffer:_}}]});let O;if(this.gouraudTriangleCount>0)E=this.device.createBuffer({size:this.gouraudTriangleCount*10*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this.gouraudTriangleDataBuffer=E,this.device.queue.writeBuffer(E,0,this.gouraudTriangleData.subarray(0,this.gouraudTriangleCount*10)),O=this.device.createBindGroup({layout:this.triangleDataBindGroupLayout,entries:[{binding:0,resource:{buffer:E}}]});let Q;if(this.texturedTriangleCount>0)I=this.device.createBuffer({size:this.texturedTriangleCount*20*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this.texturedTriangleDataBuffer=I,this.device.queue.writeBuffer(this.texturedTriangleDataBuffer,0,this.texturedTriangleData.subarray(0,this.texturedTriangleCount*20)),Q=this.device.createBindGroup({layout:this.triangleDataBindGroupLayout,entries:[{binding:0,resource:{buffer:I}}]});let U;if(this.alphaTriangleCount>0)H=this.device.createBuffer({size:this.alphaTriangleCount*10*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this.alphaTriangleDataBuffer=H,this.device.queue.writeBuffer(H,0,this.alphaTriangleData.subarray(0,this.alphaTriangleCount*10)),U=this.device.createBindGroup({layout:this.triangleDataBindGroupLayout,entries:[{binding:0,resource:{buffer:H}}]});let G=this.device.createCommandEncoder({label:"render scene command encoder"}),$=G.beginComputePass();if($.setPipeline(this.clearPipeline),$.setBindGroup(0,this.rasterizerBindGroup),$.dispatchWorkgroups(Math.ceil(A*R/256)),this.flatTriangleCount>0&&N)$.setPipeline(this.renderFlatDepthPipeline),$.setBindGroup(0,this.rasterizerBindGroup),$.setBindGroup(1,N),$.dispatchWorkgroups(this.flatTriangleCount);if(this.gouraudTriangleCount>0&&O)$.setPipeline(this.renderGouraudDepthPipeline),$.setBindGroup(0,this.rasterizerBindGroup),$.setBindGroup(1,O),$.dispatchWorkgroups(this.gouraudTriangleCount);if(this.texturedTriangleCount>0&&Q)$.setPipeline(this.renderTexturedDepthPipeline),$.setBindGroup(0,this.rasterizerBindGroup),$.setBindGroup(1,Q),$.dispatchWorkgroups(this.texturedTriangleCount);if(this.flatTriangleCount>0&&N)$.setPipeline(this.renderFlatPipeline),$.setBindGroup(0,this.rasterizerBindGroup),$.setBindGroup(1,N),$.dispatchWorkgroups(this.flatTriangleCount);if(this.gouraudTriangleCount>0&&O)$.setPipeline(this.renderGouraudPipeline),$.setBindGroup(0,this.rasterizerBindGroup),$.setBindGroup(1,O),$.dispatchWorkgroups(this.gouraudTriangleCount);if(this.texturedTriangleCount>0&&Q)$.setPipeline(this.renderTexturedPipeline),$.setBindGroup(0,this.rasterizerBindGroup),$.setBindGroup(1,Q),$.dispatchWorkgroups(this.texturedTriangleCount);if(this.alphaTriangleCount>0&&U)$.setPipeline(this.renderAlphaPipeline),$.setBindGroup(0,this.rasterizerBindGroup),$.setBindGroup(1,U),$.dispatchWorkgroups(1);$.end();let L=G.finish();this.device.queue.submit([L])}fillTriangle(A,R,_,E,I,H,N){if(!this.isRenderingScene)return!1;let O=this.triangleCount++;if(m.alpha!==0){let Q=this.alphaTriangleCount*10;if(Q>=this.alphaTriangleData.length){let U=new Uint32Array(this.alphaTriangleData.length*2);U.set(this.alphaTriangleData),this.alphaTriangleData=U}this.alphaTriangleData[Q++]=-2147483648|m.alpha<<23|O,this.alphaTriangleData[Q++]=A,this.alphaTriangleData[Q++]=R,this.alphaTriangleData[Q++]=_,this.alphaTriangleData[Q++]=E,this.alphaTriangleData[Q++]=I,this.alphaTriangleData[Q++]=H,this.alphaTriangleData[Q++]=N,this.alphaTriangleCount++}else{let Q=this.flatTriangleCount*8;if(Q>=this.flatTriangleData.length){let U=new Uint32Array(this.flatTriangleData.length*2);U.set(this.flatTriangleData),this.flatTriangleData=U}this.flatTriangleData[Q++]=O,this.flatTriangleData[Q++]=A,this.flatTriangleData[Q++]=R,this.flatTriangleData[Q++]=_,this.flatTriangleData[Q++]=E,this.flatTriangleData[Q++]=I,this.flatTriangleData[Q++]=H,this.flatTriangleData[Q++]=N,this.flatTriangleCount++}return!0}fillGouraudTriangle(A,R,_,E,I,H,N,O,Q){if(!this.isRenderingScene)return!1;let U=this.triangleCount++;if(m.alpha!==0){let G=this.alphaTriangleCount*10;if(G>=this.alphaTriangleData.length){let $=new Uint32Array(this.alphaTriangleData.length*2);$.set(this.alphaTriangleData),this.alphaTriangleData=$}this.alphaTriangleData[G++]=m.alpha<<23|U,this.alphaTriangleData[G++]=A,this.alphaTriangleData[G++]=R,this.alphaTriangleData[G++]=_,this.alphaTriangleData[G++]=E,this.alphaTriangleData[G++]=I,this.alphaTriangleData[G++]=H,this.alphaTriangleData[G++]=N,this.alphaTriangleData[G++]=O,this.alphaTriangleData[G++]=Q,this.alphaTriangleCount++}else{let G=this.gouraudTriangleCount*10;if(G>=this.gouraudTriangleData.length){let $=new Uint32Array(this.gouraudTriangleData.length*2);$.set(this.gouraudTriangleData),this.gouraudTriangleData=$}this.gouraudTriangleData[G++]=U,this.gouraudTriangleData[G++]=A,this.gouraudTriangleData[G++]=R,this.gouraudTriangleData[G++]=_,this.gouraudTriangleData[G++]=E,this.gouraudTriangleData[G++]=I,this.gouraudTriangleData[G++]=H,this.gouraudTriangleData[G++]=N,this.gouraudTriangleData[G++]=O,this.gouraudTriangleData[G++]=Q,this.gouraudTriangleCount++}return!0}fillTexturedTriangle(A,R,_,E,I,H,N,O,Q,U,G,$,L,J,q,V,B,F,b){if(!this.isRenderingScene)return!1;if(!this.texturesUsed[b])m.textureCycle[b]=m.cycle++,this.texturesUsed[b]=!0;let T=this.triangleCount++,j=this.texturedTriangleCount*20;if(j>=this.texturedTriangleData.length){let w=new Uint32Array(this.texturedTriangleData.length*2);w.set(this.texturedTriangleData),this.texturedTriangleData=w}return this.texturedTriangleData[j++]=T,this.texturedTriangleData[j++]=A,this.texturedTriangleData[j++]=R,this.texturedTriangleData[j++]=_,this.texturedTriangleData[j++]=E,this.texturedTriangleData[j++]=I,this.texturedTriangleData[j++]=H,this.texturedTriangleData[j++]=N,this.texturedTriangleData[j++]=O,this.texturedTriangleData[j++]=Q,this.texturedTriangleData[j++]=U,this.texturedTriangleData[j++]=G,this.texturedTriangleData[j++]=$,this.texturedTriangleData[j++]=L,this.texturedTriangleData[j++]=J,this.texturedTriangleData[j++]=q,this.texturedTriangleData[j++]=V,this.texturedTriangleData[j++]=B,this.texturedTriangleData[j++]=F,this.texturedTriangleData[j++]=b,this.texturedTriangleCount++,!0}destroy(){this.device.destroy()}}var Q8=`
#version 300 es

precision highp float;

uniform highp sampler2D u_frame;

in vec2 v_texCoord;

out vec4 fragColor;

void main() {
    fragColor = texture(u_frame, v_texCoord).bgra;
    if (fragColor == vec4(1.0)) {
        discard;
    }
    fragColor.a = 1.0;
}
`.trim();var U8=`
#version 300 es

out vec2 v_texCoord;

const vec2 vertices[3] = vec2[3](
    vec2(-1, -1), 
    vec2( 3, -1), 
    vec2(-1,  3)
);

void main() {
    gl_Position = vec4(vertices[gl_VertexID], 0.0, 1.0);
    v_texCoord = gl_Position.xy * 0.5 + 0.5;
    // flip y
    v_texCoord.y = 1.0 - v_texCoord.y;
}
`.trim();var G8=`
#version 300 es

precision highp float;

uniform highp sampler2D u_frame;

in vec2 v_texCoord;

out vec4 fragColor;

void main() {
    fragColor = texture(u_frame, v_texCoord);
}
`.trim();var $8=`
#version 300 es

out vec2 v_texCoord;

const vec2 vertices[3] = vec2[3](
    vec2(-1, -1), 
    vec2( 3, -1), 
    vec2(-1,  3)
);

void main() {
    gl_Position = vec4(vertices[gl_VertexID], 0.0, 1.0);
    v_texCoord = gl_Position.xy * 0.5 + 0.5;
}
`.trim();var J8=`
vec3 hslToRgb(int hsl, float brightness) {
    const float onethird = 1.0 / 3.0;
    const float twothird = 2.0 / 3.0;
    const float rcpsixth = 6.0;

    float hue = float(hsl >> 10) / 64.0 + 0.0078125;
    float sat = float((hsl >> 7) & 0x7) / 8.0 + 0.0625;
    float lum = (float(hsl & 0x7f) / 128.0);

    vec3 xt = vec3(
        rcpsixth * (hue - twothird),
        0.0,
        rcpsixth * (1.0 - hue)
    );

    if (hue < twothird) {
        xt.r = 0.0;
        xt.g = rcpsixth * (twothird - hue);
        xt.b = rcpsixth * (hue      - onethird);
    }

    if (hue < onethird) {
        xt.r = rcpsixth * (onethird - hue);
        xt.g = rcpsixth * hue;
        xt.b = 0.0;
    }

    xt = min( xt, 1.0 );

    float sat2   =  2.0 * sat;
    float satinv =  1.0 - sat;
    float luminv =  1.0 - lum;
    float lum2m1 = (2.0 * lum) - 1.0;
    vec3  ct     = (sat2 * xt) + satinv;

    vec3 rgb;
    if (lum >= 0.5)
         rgb = (luminv * ct) + lum2m1;
    else rgb =  lum    * ct;

    return pow(rgb, vec3(brightness));
}
`;var L8=`
#version 300 es

precision highp float;
precision highp int;

flat in ivec3 xs;
flat in ivec3 ys;
flat in ivec3 colors;

out vec4 fragColor;

const vec2 vertices[3] = vec2[3](
    vec2(20, 200),
    vec2(400, 190),
    vec2(200, 20)
);

// const int colors[3] = int[3](
//     56255,
//     959,
//     22463
// );

const float brightness = 0.9;


const int width = 512;
const int height = 334;

const int boundBottom = height;

${J8}

int reciprocal15(int value) {
    return 32768 / value;
}

bool isOutsideScanline(int xA, int xB) {
    return false;
    // int fragX = int(gl_FragCoord.x);
    // return fragX < xA || fragX >= xB || xA >= xB;
}

vec3 getScanlineColor(int xA, int xB, int colorA, int colorB) {
    int fragX = int(gl_FragCoord.x);
    if (fragX < xA || fragX >= xB) {
        // discard;
    }
    int colorStep;
    int length;
    if (xA < xB) {
        length = (xB - xA) >> 2;
        if (length > 0) {
            colorStep = (colorB - colorA) * reciprocal15(length) >> 15;
        }
    } else {
        // discard;
    }
    int scanlineX = fragX - xA;
    colorA += colorStep * (scanlineX >> 2);
    return hslToRgb(colorA >> 8, brightness);
}

void main() {
    // float x = v_barycentric.x * vertices[0].x + v_barycentric.y * vertices[1].x + v_barycentric.z * vertices[2].x;
    // float y = float(gl_FragCoord.y);
    fragColor = vec4(1.0, 0.0, 0.0, 1.0);
    // fragColor.r = x / 512.0;
    // fragColor.r = y / 255.0;
    int xA = xs.x;
    int xB = xs.y;
    int xC = xs.z;
    int yA = ys.x;
    int yB = ys.y;
    int yC = ys.z;
    int colorA = colors.x;
    int colorB = colors.y;
    int colorC = colors.z;

    // fragColor.rgb = hslToRgb(colorA, brightness);

    int minScanlineY = min(yA, min(yB, yC));
    int maxScanlineY = max(yA, max(yB, yC));
    int scanlineY = height - int(gl_FragCoord.y) - 1 - minScanlineY + 1;
    if (scanlineY < 0 || scanlineY > maxScanlineY - minScanlineY) {
        // discard;
    }
    // scanlineY++;
    // fragColor.r = float(scanlineY) / 255.0;

    int dxAB = xB - xA;
\tint dyAB = yB - yA;
\tint dxAC = xC - xA;
\tint dyAC = yC - yA;

\tint xStepAB = 0;
\tint colorStepAB = 0;
\tif (yB != yA) {
\t\txStepAB = (dxAB << 16) / dyAB;
        colorStepAB = ((colorB - colorA) << 15) / dyAB;
\t}

\tint xStepBC = 0;
\tint colorStepBC = 0;
\tif (yC != yB) {
        xStepBC = ((xC - xB) << 16) / (yC - yB);
        colorStepBC = ((colorC - colorB) << 15) / (yC - yB);
\t}

\tint xStepAC = 0;
\tint colorStepAC = 0;
\tif (yC != yA) {
        xStepAC = ((xA - xC) << 16) / (yA - yC);
        colorStepAC = ((colorA - colorC) << 15) / (yA - yC);
\t}

    int currentScanline = 0;

\tif (yA <= yB && yA <= yC) {
        if (yA < boundBottom) {
            if (yB > boundBottom) {
                yB = boundBottom;
            }

            if (yC > boundBottom) {
                yC = boundBottom;
            }

            if (yB < yC) {
                xC = xA <<= 16;
                colorC = colorA <<= 15;
                if (yA < 0) {
                    xC -= xStepAC * yA;
                    xA -= xStepAB * yA;
                    colorC -= colorStepAC * yA;
                    colorA -= colorStepAB * yA;
                    yA = 0;
                }

                xB <<= 16;
                colorB <<= 15;
                if (yB < 0) {
                    xB -= xStepBC * yB;
                    colorB -= colorStepBC * yB;
                    yB = 0;
                }

                if (yA != yB && xStepAC < xStepAB || yA == yB && xStepAC > xStepBC) {
                    yC -= yB;
                    yB -= yA;
                    // yA = lineOffset[yA];

                    while (--yB >= 0) {
                        if (currentScanline == scanlineY) {
                            int scanlineXA = xA >> 16;
                            int scanlineXB = xC >> 16;
                            if (isOutsideScanline(scanlineXA, scanlineXB)) {
                                discard;
                            }
                            fragColor.rgb = getScanlineColor(scanlineXA, scanlineXB, colorC >> 7, colorA >> 7);
                            return;
                        }
                        // gouraudRaster(xC >> 16, xA >> 16, colorC >> 7, colorA >> 7, data, yA, 0);
                        xC += xStepAC;
                        xA += xStepAB;
                        colorC += colorStepAC;
                        colorA += colorStepAB;
                        // yA += width2d;
                        currentScanline++;
                    }
                    while (--yC >= 0) {
                        if (currentScanline == scanlineY) {
                            int scanlineXA = xC >> 16;
                            int scanlineXB = xB >> 16;
                            if (isOutsideScanline(scanlineXA, scanlineXB)) {
                                discard;
                            }
                            fragColor.rgb = getScanlineColor(scanlineXA, scanlineXB, colorC >> 7, colorB >> 7);
                            return;
                        }
                        // gouraudRaster(xC >> 16, xB >> 16, colorC >> 7, colorB >> 7, data, yA, 0);
                        xC += xStepAC;
                        xB += xStepBC;
                        colorC += colorStepAC;
                        colorB += colorStepBC;
                        // yA += width2d;
                        currentScanline++;
                    }
                } else {
                    yC -= yB;
                    yB -= yA;
                    // yA = lineOffset[yA];

                    while (--yB >= 0) {
                        if (currentScanline == scanlineY) {
                            int scanlineXA = xA >> 16;
                            int scanlineXB = xC >> 16;
                            if (isOutsideScanline(scanlineXA, scanlineXB)) {
                                discard;
                            }
                            fragColor.rgb = getScanlineColor(scanlineXA, scanlineXB, colorA >> 7, colorC >> 7);
                            return;
                        }
                        // gouraudRaster(xA >> 16, xC >> 16, colorA >> 7, colorC >> 7, data, yA, 0);
                        xC += xStepAC;
                        xA += xStepAB;
                        colorC += colorStepAC;
                        colorA += colorStepAB;
                        // yA += width2d;
                        currentScanline++;
                    }
                    while (--yC >= 0) {
                        if (currentScanline == scanlineY) {
                            int scanlineXA = xB >> 16;
                            int scanlineXB = xC >> 16;
                            if (isOutsideScanline(scanlineXA, scanlineXB)) {
                                discard;
                            }
                            fragColor.rgb = getScanlineColor(scanlineXA, scanlineXB, colorB >> 7, colorC >> 7);
                            return;
                        }
                        // gouraudRaster(xB >> 16, xC >> 16, colorB >> 7, colorC >> 7, data, yA, 0);
                        xC += xStepAC;
                        xB += xStepBC;
                        colorC += colorStepAC;
                        colorB += colorStepBC;
                        // yA += width2d;
                        currentScanline++;
                    }
                }
            } else {
                xB = xA <<= 16;
                colorB = colorA <<= 15;
                if (yA < 0) {
                    xB -= xStepAC * yA;
                    xA -= xStepAB * yA;
                    colorB -= colorStepAC * yA;
                    colorA -= colorStepAB * yA;
                    yA = 0;
                }

                xC <<= 16;
                colorC <<= 15;
                if (yC < 0) {
                    xC -= xStepBC * yC;
                    colorC -= colorStepBC * yC;
                    yC = 0;
                }

                if (yA != yC && xStepAC < xStepAB || yA == yC && xStepBC > xStepAB) {
                    yB -= yC;
                    yC -= yA;
                    // yA = lineOffset[yA];

                    while (--yC >= 0) {
                        if (currentScanline == scanlineY) {
                            int scanlineXA = xB >> 16;
                            int scanlineXB = xA >> 16;
                            if (isOutsideScanline(scanlineXA, scanlineXB)) {
                                discard;
                            }
                            fragColor.rgb = getScanlineColor(scanlineXA, scanlineXB, colorB >> 7, colorA >> 7);
                            return;
                        }
                        // gouraudRaster(xB >> 16, xA >> 16, colorB >> 7, colorA >> 7, data, yA, 0);
                        xB += xStepAC;
                        xA += xStepAB;
                        colorB += colorStepAC;
                        colorA += colorStepAB;
                        // yA += width2d;
                        currentScanline++;
                    }
                    while (--yB >= 0) {
                        if (currentScanline == scanlineY) {
                            int scanlineXA = xC >> 16;
                            int scanlineXB = xA >> 16;
                            if (isOutsideScanline(scanlineXA, scanlineXB)) {
                                discard;
                            }
                            fragColor.rgb = getScanlineColor(scanlineXA, scanlineXB, colorC >> 7, colorA >> 7);
                            return;
                        }
                        // gouraudRaster(xC >> 16, xA >> 16, colorC >> 7, colorA >> 7, data, yA, 0);
                        xC += xStepBC;
                        xA += xStepAB;
                        colorC += colorStepBC;
                        colorA += colorStepAB;
                        // yA += width2d;
                        currentScanline++;
                    }
                } else {
                    yB -= yC;
                    yC -= yA;
                    // yA = lineOffset[yA];

                    while (--yC >= 0) {
                        if (currentScanline == scanlineY) {
                            int scanlineXA = xA >> 16;
                            int scanlineXB = xB >> 16;
                            if (isOutsideScanline(scanlineXA, scanlineXB)) {
                                discard;
                            }
                            fragColor.rgb = getScanlineColor(scanlineXA, scanlineXB, colorA >> 7, colorB >> 7);
                            return;
                        }
                        // gouraudRaster(xA >> 16, xB >> 16, colorA >> 7, colorB >> 7, data, yA, 0);
                        xB += xStepAC;
                        xA += xStepAB;
                        colorB += colorStepAC;
                        colorA += colorStepAB;
                        // yA += width2d;
                        currentScanline++;
                    }
                    while (--yB >= 0) {
                        if (currentScanline == scanlineY) {
                            int scanlineXA = xA >> 16;
                            int scanlineXB = xC >> 16;
                            if (isOutsideScanline(scanlineXA, scanlineXB)) {
                                discard;
                            }
                            fragColor.rgb = getScanlineColor(scanlineXA, scanlineXB, colorA >> 7, colorC >> 7);
                            return;
                        }
                        // gouraudRaster(xA >> 16, xC >> 16, colorA >> 7, colorC >> 7, data, yA, 0);
                        xC += xStepBC;
                        xA += xStepAB;
                        colorC += colorStepBC;
                        colorA += colorStepAB;
                        // yA += width2d;
                        currentScanline++;
                    }
                }
            }
        }
\t} else if (yB <= yC) {
\t\tif (yB < boundBottom) {
\t\t\tif (yC > boundBottom) {
\t\t\t\tyC = boundBottom;
\t\t\t}

\t\t\tif (yA > boundBottom) {
\t\t\t\tyA = boundBottom;
\t\t\t}

\t\t\tif (yC < yA) {
\t\t\t\txA = xB <<= 16;
\t\t\t\tcolorA = colorB <<= 15;
\t\t\t\tif (yB < 0) {
\t\t\t\t\txA -= xStepAB * yB;
\t\t\t\t\txB -= xStepBC * yB;
\t\t\t\t\tcolorA -= colorStepAB * yB;
\t\t\t\t\tcolorB -= colorStepBC * yB;
\t\t\t\t\tyB = 0;
\t\t\t\t}

\t\t\t\txC <<= 16;
\t\t\t\tcolorC <<= 15;
\t\t\t\tif (yC < 0) {
\t\t\t\t\txC -= xStepAC * yC;
\t\t\t\t\tcolorC -= colorStepAC * yC;
\t\t\t\t\tyC = 0;
\t\t\t\t}

\t\t\t\tif (yB != yC && xStepAB < xStepBC || yB == yC && xStepAB > xStepAC) {
\t\t\t\t\tyA -= yC;
\t\t\t\t\tyC -= yB;
\t\t\t\t\t// yB = lineOffset[yB];

\t\t\t\t\twhile (--yC >= 0) {
                        if (currentScanline == scanlineY) {
                            int scanlineXA = xA >> 16;
                            int scanlineXB = xB >> 16;
                            if (isOutsideScanline(scanlineXA, scanlineXB)) {
                                discard;
                            }
                            fragColor.rgb = getScanlineColor(scanlineXA, scanlineXB, colorA >> 7, colorB >> 7);
                            return;
                        }
\t\t\t\t\t\t// gouraudRaster(xA >> 16, xB >> 16, colorA >> 7, colorB >> 7, data, yB, 0);
\t\t\t\t\t\txA += xStepAB;
\t\t\t\t\t\txB += xStepBC;
\t\t\t\t\t\tcolorA += colorStepAB;
\t\t\t\t\t\tcolorB += colorStepBC;
\t\t\t\t\t\t// yB += width2d;
                        currentScanline++;
\t\t\t\t\t}
\t\t\t\t\twhile (--yA >= 0) {
                        if (currentScanline == scanlineY) {
                            int scanlineXA = xA >> 16;
                            int scanlineXB = xC >> 16;
                            if (isOutsideScanline(scanlineXA, scanlineXB)) {
                                discard;
                            }
                            fragColor.rgb = getScanlineColor(scanlineXA, scanlineXB, colorA >> 7, colorC >> 7);
                            return;
                        }
\t\t\t\t\t\t// gouraudRaster(xA >> 16, xC >> 16, colorA >> 7, colorC >> 7, data, yB, 0);
\t\t\t\t\t\txA += xStepAB;
\t\t\t\t\t\txC += xStepAC;
\t\t\t\t\t\tcolorA += colorStepAB;
\t\t\t\t\t\tcolorC += colorStepAC;
\t\t\t\t\t\t// yB += width2d;
                        currentScanline++;
\t\t\t\t\t}
\t\t\t\t} else {
\t\t\t\t\tyA -= yC;
\t\t\t\t\tyC -= yB;
\t\t\t\t\t// yB = lineOffset[yB];

\t\t\t\t\twhile (--yC >= 0) {
                        if (currentScanline == scanlineY) {
                            int scanlineXA = xB >> 16;
                            int scanlineXB = xA >> 16;
                            if (isOutsideScanline(scanlineXA, scanlineXB)) {
                                discard;
                            }
                            fragColor.rgb = getScanlineColor(scanlineXA, scanlineXB, colorB >> 7, colorA >> 7);
                            return;
                        }
\t\t\t\t\t\t// gouraudRaster(xB >> 16, xA >> 16, colorB >> 7, colorA >> 7, data, yB, 0);
\t\t\t\t\t\txA += xStepAB;
\t\t\t\t\t\txB += xStepBC;
\t\t\t\t\t\tcolorA += colorStepAB;
\t\t\t\t\t\tcolorB += colorStepBC;
\t\t\t\t\t\t// yB += width2d;
                        currentScanline++;
\t\t\t\t\t}
\t\t\t\t\twhile (--yA >= 0) {
                        if (currentScanline == scanlineY) {
                            int scanlineXA = xC >> 16;
                            int scanlineXB = xA >> 16;
                            if (isOutsideScanline(scanlineXA, scanlineXB)) {
                                discard;
                            }
                            fragColor.rgb = getScanlineColor(scanlineXA, scanlineXB, colorC >> 7, colorA >> 7);
                            return;
                        }
\t\t\t\t\t\t// gouraudRaster(xC >> 16, xA >> 16, colorC >> 7, colorA >> 7, data, yB, 0);
\t\t\t\t\t\txA += xStepAB;
\t\t\t\t\t\txC += xStepAC;
\t\t\t\t\t\tcolorA += colorStepAB;
\t\t\t\t\t\tcolorC += colorStepAC;
\t\t\t\t\t\t// yB += width2d;
                        currentScanline++;
\t\t\t\t\t}
\t\t\t\t}
\t\t\t} else {
\t\t\t\txC = xB <<= 16;
\t\t\t\tcolorC = colorB <<= 15;
\t\t\t\tif (yB < 0) {
\t\t\t\t\txC -= xStepAB * yB;
\t\t\t\t\txB -= xStepBC * yB;
\t\t\t\t\tcolorC -= colorStepAB * yB;
\t\t\t\t\tcolorB -= colorStepBC * yB;
\t\t\t\t\tyB = 0;
\t\t\t\t}

\t\t\t\txA <<= 16;
\t\t\t\tcolorA <<= 15;
\t\t\t\tif (yA < 0) {
\t\t\t\t\txA -= xStepAC * yA;
\t\t\t\t\tcolorA -= colorStepAC * yA;
\t\t\t\t\tyA = 0;
\t\t\t\t}

\t\t\t\tif (xStepAB < xStepBC) {
\t\t\t\t\tyC -= yA;
\t\t\t\t\tyA -= yB;
\t\t\t\t\t// yB = lineOffset[yB];

\t\t\t\t\twhile (--yA >= 0) {
                        if (currentScanline == scanlineY) {
                            int scanlineXA = xC >> 16;
                            int scanlineXB = xB >> 16;
                            if (isOutsideScanline(scanlineXA, scanlineXB)) {
                                discard;
                            }
                            fragColor.rgb = getScanlineColor(scanlineXA, scanlineXB, colorC >> 7, colorB >> 7);
                            return;
                        }
\t\t\t\t\t\t// gouraudRaster(xC >> 16, xB >> 16, colorC >> 7, colorB >> 7, data, yB, 0);
\t\t\t\t\t\txC += xStepAB;
\t\t\t\t\t\txB += xStepBC;
\t\t\t\t\t\tcolorC += colorStepAB;
\t\t\t\t\t\tcolorB += colorStepBC;
\t\t\t\t\t\t// yB += width2d;
                        currentScanline++;
\t\t\t\t\t}
\t\t\t\t\twhile (--yC >= 0) {
                        if (currentScanline == scanlineY) {
                            int scanlineXA = xA >> 16;
                            int scanlineXB = xB >> 16;
                            if (isOutsideScanline(scanlineXA, scanlineXB)) {
                                discard;
                            }
                            fragColor.rgb = getScanlineColor(scanlineXA, scanlineXB, colorA >> 7, colorB >> 7);
                            return;
                        }
\t\t\t\t\t\t// gouraudRaster(xA >> 16, xB >> 16, colorA >> 7, colorB >> 7, data, yB, 0);
\t\t\t\t\t\txA += xStepAC;
\t\t\t\t\t\txB += xStepBC;
\t\t\t\t\t\tcolorA += colorStepAC;
\t\t\t\t\t\tcolorB += colorStepBC;
\t\t\t\t\t\t// yB += width2d;
                        currentScanline++;
\t\t\t\t\t}
\t\t\t\t} else {
\t\t\t\t\tyC -= yA;
\t\t\t\t\tyA -= yB;
\t\t\t\t\t// yB = lineOffset[yB];

\t\t\t\t\twhile (--yA >= 0) {
                        if (currentScanline == scanlineY) {
                            int scanlineXA = xB >> 16;
                            int scanlineXB = xC >> 16;
                            if (isOutsideScanline(scanlineXA, scanlineXB)) {
                                discard;
                            }
                            fragColor.rgb = getScanlineColor(scanlineXA, scanlineXB, colorB >> 7, colorC >> 7);
                            return;
                        }
\t\t\t\t\t\t// gouraudRaster(xB >> 16, xC >> 16, colorB >> 7, colorC >> 7, data, yB, 0);
\t\t\t\t\t\txC += xStepAB;
\t\t\t\t\t\txB += xStepBC;
\t\t\t\t\t\tcolorC += colorStepAB;
\t\t\t\t\t\tcolorB += colorStepBC;
\t\t\t\t\t\t// yB += width2d;
                        currentScanline++;
\t\t\t\t\t}
\t\t\t\t\twhile (--yC >= 0) {
                        if (currentScanline == scanlineY) {
                            int scanlineXA = xB >> 16;
                            int scanlineXB = xA >> 16;
                            if (isOutsideScanline(scanlineXA, scanlineXB)) {
                                discard;
                            }
                            fragColor.rgb = getScanlineColor(scanlineXA, scanlineXB, colorB >> 7, colorA >> 7);
                            return;
                        }
\t\t\t\t\t\t// gouraudRaster(xB >> 16, xA >> 16, colorB >> 7, colorA >> 7, data, yB, 0);
\t\t\t\t\t\txA += xStepAC;
\t\t\t\t\t\txB += xStepBC;
\t\t\t\t\t\tcolorA += colorStepAC;
\t\t\t\t\t\tcolorB += colorStepBC;
\t\t\t\t\t\t// yB += width2d;
                        currentScanline++;
\t\t\t\t\t}
\t\t\t\t}
\t\t\t}
\t\t}
    } else if (yC < boundBottom) {
     \tif (yA > boundBottom) {
\t\t\tyA = boundBottom;
\t\t}

\t\tif (yB > boundBottom) {
\t\t\tyB = boundBottom;
\t\t}

\t\tif (yA < yB) {
\t\t\txB = xC <<= 16;
\t\t\tcolorB = colorC <<= 15;
\t\t\tif (yC < 0) {
\t\t\t\txB -= xStepBC * yC;
\t\t\t\txC -= xStepAC * yC;
\t\t\t\tcolorB -= colorStepBC * yC;
\t\t\t\tcolorC -= colorStepAC * yC;
\t\t\t\tyC = 0;
\t\t\t}

\t\t\txA <<= 16;
\t\t\tcolorA <<= 15;
\t\t\tif (yA < 0) {
\t\t\t\txA -= xStepAB * yA;
\t\t\t\tcolorA -= colorStepAB * yA;
\t\t\t\tyA = 0;
\t\t\t}

            if (xStepBC < xStepAC) {
\t\t\t\tyB -= yA;
\t\t\t\tyA -= yC;
\t\t\t\t// yC = lineOffset[yC];

\t\t\t\twhile (--yA >= 0) {
                    if (currentScanline == scanlineY) {
                        int scanlineXA = xB >> 16;
                        int scanlineXB = xC >> 16;
                        if (isOutsideScanline(scanlineXA, scanlineXB)) {
                            discard;
                        }
                        fragColor.rgb = getScanlineColor(scanlineXA, scanlineXB, colorB >> 7, colorC >> 7);
                        return;
                    }
\t\t\t\t\t// gouraudRaster(xB >> 16, xC >> 16, colorB >> 7, colorC >> 7, data, yC, 0);
\t\t\t\t\txB += xStepBC;
\t\t\t\t\txC += xStepAC;
\t\t\t\t\tcolorB += colorStepBC;
\t\t\t\t\tcolorC += colorStepAC;
\t\t\t\t\t// yC += width2d;
                    currentScanline++;
\t\t\t\t}
\t\t\t\twhile (--yB >= 0) {
                    if (currentScanline == scanlineY) {
                        int scanlineXA = xB >> 16;
                        int scanlineXB = xA >> 16;
                        if (isOutsideScanline(scanlineXA, scanlineXB)) {
                            discard;
                        }
                        fragColor.rgb = getScanlineColor(scanlineXA, scanlineXB, colorB >> 7, colorA >> 7);
                        return;
                    }
\t\t\t\t\t// gouraudRaster(xB >> 16, xA >> 16, colorB >> 7, colorA >> 7, data, yC, 0);
\t\t\t\t\txB += xStepBC;
\t\t\t\t\txA += xStepAB;
\t\t\t\t\tcolorB += colorStepBC;
\t\t\t\t\tcolorA += colorStepAB;
\t\t\t\t\t// yC += width2d;
                    currentScanline++;
\t\t\t\t}
\t\t\t} else {
\t\t\t\tyB -= yA;
\t\t\t\tyA -= yC;
\t\t\t\t// yC = lineOffset[yC];

\t\t\t\twhile (--yA >= 0) {
                    if (currentScanline == scanlineY) {
                        int scanlineXA = xC >> 16;
                        int scanlineXB = xB >> 16;
                        if (isOutsideScanline(scanlineXA, scanlineXB)) {
                            discard;
                        }
                        fragColor.rgb = getScanlineColor(scanlineXA, scanlineXB, colorC >> 7, colorB >> 7);
                        return;
                    }
\t\t\t\t\t// gouraudRaster(xC >> 16, xB >> 16, colorC >> 7, colorB >> 7, data, yC, 0);
\t\t\t\t\txB += xStepBC;
\t\t\t\t\txC += xStepAC;
\t\t\t\t\tcolorB += colorStepBC;
\t\t\t\t\tcolorC += colorStepAC;
\t\t\t\t\t// yC += width2d;
                    currentScanline++;
\t\t\t\t}
\t\t\t\twhile (--yB >= 0) {
                    if (currentScanline == scanlineY) {
                        int scanlineXA = xA >> 16;
                        int scanlineXB = xB >> 16;
                        if (isOutsideScanline(scanlineXA, scanlineXB)) {
                            discard;
                        }
                        fragColor.rgb = getScanlineColor(scanlineXA, scanlineXB, colorA >> 7, colorB >> 7);
                        return;
                    }
\t\t\t\t\t// gouraudRaster(xA >> 16, xB >> 16, colorA >> 7, colorB >> 7, data, yC, 0);
\t\t\t\t\txB += xStepBC;
\t\t\t\t\txA += xStepAB;
\t\t\t\t\tcolorB += colorStepBC;
\t\t\t\t\tcolorA += colorStepAB;
\t\t\t\t\t// yC += width2d;
                    currentScanline++;
\t\t\t\t}
\t\t\t}
        } else {
\t\t\txA = xC <<= 16;
\t\t\tcolorA = colorC <<= 15;
\t\t\tif (yC < 0) {
\t\t\t\txA -= xStepBC * yC;
\t\t\t\txC -= xStepAC * yC;
\t\t\t\tcolorA -= colorStepBC * yC;
\t\t\t\tcolorC -= colorStepAC * yC;
\t\t\t\tyC = 0;
\t\t\t}

\t\t\txB <<= 16;
\t\t\tcolorB <<= 15;
\t\t\tif (yB < 0) {
\t\t\t\txB -= xStepAB * yB;
\t\t\t\tcolorB -= colorStepAB * yB;
\t\t\t\tyB = 0;
\t\t\t}

\t\t\tif (xStepBC < xStepAC) {
                yA -= yB;
                yB -= yC;

                while (--yB >= 0) {
                    if (currentScanline == scanlineY) {
                        int scanlineXA = xA >> 16;
                        int scanlineXB = xC >> 16;
                        if (isOutsideScanline(scanlineXA, scanlineXB)) {
                            discard;
                        }
                        fragColor.rgb = getScanlineColor(scanlineXA, scanlineXB, colorA >> 7, colorC >> 7);
                        return;
                    }
                    // gouraudRaster(xA >> 16, xC >> 16, colorA >> 7, colorC >> 7, data, yC, 0);
                    xA += xStepBC;
                    xC += xStepAC;
                    colorA += colorStepBC;
                    colorC += colorStepAC;
                    // yC += width2d;
                    currentScanline++;
                }
                while (--yA >= 0) {
                    if (currentScanline == scanlineY) {
                        int scanlineXA = xB >> 16;
                        int scanlineXB = xC >> 16;
                        if (isOutsideScanline(scanlineXA, scanlineXB)) {
                            discard;
                        }
                        fragColor.rgb = getScanlineColor(scanlineXA, scanlineXB, colorB >> 7, colorC >> 7);
                        return;
                    }
                    // gouraudRaster(xB >> 16, xC >> 16, colorB >> 7, colorC >> 7, data, yC, 0);
                    xB += xStepAB;
                    xC += xStepAC;
                    colorB += colorStepAB;
                    colorC += colorStepAC;
                    // yC += width2d;
                    currentScanline++;
                }
            } else {
\t\t\t\tyA -= yB;
\t\t\t\tyB -= yC;
\t\t\t\t\t
                while (--yB >= 0) {
                    if (currentScanline == scanlineY) {
                        int scanlineXA = xC >> 16;
                        int scanlineXB = xA >> 16;
                        if (isOutsideScanline(scanlineXA, scanlineXB)) {
                            discard;
                        }
                        fragColor.rgb = getScanlineColor(scanlineXA, scanlineXB, colorC >> 7, colorA >> 7);
                        return;
                    }
\t\t\t\t\t// gouraudRaster(xC >> 16, xA >> 16, colorC >> 7, colorA >> 7, data, yC, 0);
\t\t\t\t\txA += xStepBC;
\t\t\t\t\txC += xStepAC;
\t\t\t\t\tcolorA += colorStepBC;
\t\t\t\t\tcolorC += colorStepAC;
\t\t\t\t\t// yC += width2d;
                    currentScanline++;
\t\t\t\t}
\t\t\t\twhile (--yA >= 0) {
                    if (currentScanline == scanlineY) {
                        int scanlineXA = xC >> 16;
                        int scanlineXB = xB >> 16;
                        if (isOutsideScanline(scanlineXA, scanlineXB)) {
                            discard;
                        }
                        fragColor.rgb = getScanlineColor(scanlineXA, scanlineXB, colorC >> 7, colorB >> 7);
                        return;
                    }
\t\t\t\t\t// gouraudRaster(xC >> 16, xB >> 16, colorC >> 7, colorB >> 7, data, yC, 0);
\t\t\t\t\txB += xStepAB;
\t\t\t\t\txC += xStepAC;
\t\t\t\t\tcolorB += colorStepAB;
\t\t\t\t\tcolorC += colorStepAC;
\t\t\t\t\t// yC += width2d;
                    currentScanline++;
\t\t\t\t}
            }
        }
    }
    
    // discard;
    // fragColor = vec4(1.0, 1.0, 1.0, 1.0);
}

`.trim();var q8=`
#version 300 es

uniform highp usampler2D u_triangleData;

flat out ivec3 xs;
flat out ivec3 ys;
flat out ivec3 colors;

const float width = 512.0;
const float height = 334.0;
const vec2 dimensions = vec2(width, height);

// const vec2 vertices[3] = vec2[3](
//     vec2(20, 200),
//     vec2(400, 190),
//     vec2(200, 20)
// );

// const vec3 barycentric[3] = vec3[3](
//     vec3(1, 0, 0),
//     vec3(0, 1, 0),
//     vec3(0, 0, 1)
// );

const vec2 vertices[3] = vec2[3](
    vec2(-1, -1), 
    vec2( 3, -1), 
    vec2(-1,  3)
);

void main() {
    int triangleIndex = gl_VertexID / 3;

    uvec4 triangleData = texelFetch(u_triangleData, ivec2(triangleIndex, 0), 0);
    xs = ivec3(
        int(triangleData.x >> 20u),
        int((triangleData.x >> 8u) & 0xFFFu),
        (int(triangleData.x & 0xFFu) << 4) | int(triangleData.y & 0xFFu)
    ) - 2048;
    ys = ivec3(
        int(triangleData.y >> 20u),
        int((triangleData.y >> 8u) & 0xFFFu),
        int(triangleData.z >> 16u)
    ) - 2048;
    colors = ivec3(
        int(triangleData.z & 0xFFFFu),
        int(triangleData.w >> 16u),
        int(triangleData.w & 0xFFFFu)
    );

    int vertexIndex = gl_VertexID % 0x3;

    // vec2 screenPos = vertices[gl_VertexID];
    vec2 screenPos = vec2(xs[vertexIndex], ys[vertexIndex]);
    // screenPos.y = height - screenPos.y - 1.0;
    screenPos += 0.5;
    // screenPos *= 1.1;
    gl_Position = vec4(screenPos * 2.0 / dimensions - 1.0, 0.0, 1.0);
    // flip y
    gl_Position.y *= -1.0;
    // v_texCoord = gl_Position.xy * 0.5 + 0.5;
    // v_barycentric = barycentric[gl_VertexID];
    
    // gl_Position = vec4(vertices[gl_VertexID], 0.0, 1.0);
}
`.trim();var S7=1e5;class y6 extends C{gl;drawTileUnderlay(A,R,_,E,I){return!1}drawTileOverlay(A,R,_,E){return!1}startDrawModel(A,R,_,E,I,H){}endDrawModel(A,R,_,E,I,H){}drawModelTriangle(A,R){return!1}pixMapProgram;textureProgram;mainProgram;viewportFramebuffer;viewportColorTarget;texturesToDelete=[];isRenderingScene=!1;gouraudTriangleData=new Uint32Array(S7*4);gouraudTriangleDataView=new DataView(this.gouraudTriangleData.buffer);gouraudTriangleCount=0;static init(A,R,_){let E=document.createElement("canvas");E.width=R,E.height=_,E.style.display=L0.style.display,E.style.position=L0.style.position,E.style.width="100%",E.style.height="100%",E.style.imageRendering=L0.style.imageRendering,A.appendChild(E);let I=E.getContext("webgl2",{preserveDrawingBuffer:!0});if(!I)throw E.remove(),new Error("WebGL2 is not supported.");return C.resetRenderer(),new y6(E,I)}constructor(A,R){super(A);this.gl=R;this.init()}init(){this.gl.enable(this.gl.CULL_FACE);let A=new h0(this.gl,this.gl.VERTEX_SHADER,U8),R=new h0(this.gl,this.gl.FRAGMENT_SHADER,Q8);this.pixMapProgram=i0(this.gl,[A,R]);let _=new h0(this.gl,this.gl.VERTEX_SHADER,$8),E=new h0(this.gl,this.gl.FRAGMENT_SHADER,G8);this.textureProgram=i0(this.gl,[_,E]);let I=new h0(this.gl,this.gl.VERTEX_SHADER,q8),H=new h0(this.gl,this.gl.FRAGMENT_SHADER,L8);this.mainProgram=i0(this.gl,[I,H]);let N=S.viewportRight,O=S.viewportBottom;this.viewportFramebuffer=this.gl.createFramebuffer(),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.viewportFramebuffer),this.viewportColorTarget=this.gl.createTexture(),this.gl.bindTexture(this.gl.TEXTURE_2D,this.viewportColorTarget),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,N,O,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,null),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER,this.gl.COLOR_ATTACHMENT0,this.gl.TEXTURE_2D,this.viewportColorTarget,0),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null)}startFrame(){}endFrame(){for(let A of this.texturesToDelete)this.gl.deleteTexture(A);this.texturesToDelete.length=0}updateTexture(A){}setBrightness(A){}renderPixMap(A,R,_){this.gl.viewport(R,this.canvas.height-_-A.height2d,A.width2d,A.height2d);let E=S.viewportRight,I=S.viewportBottom;if(A.width2d===E&&A.height2d===I)this.gl.bindTexture(this.gl.TEXTURE_2D,this.viewportColorTarget),this.textureProgram.use(),this.gl.drawArrays(this.gl.TRIANGLES,0,3);let H=new Uint8Array(A.pixels.buffer),N=this.gl.createTexture();return this.gl.bindTexture(this.gl.TEXTURE_2D,N),this.gl.texStorage2D(this.gl.TEXTURE_2D,1,this.gl.RGBA8,A.width2d,A.height2d),this.gl.texSubImage2D(this.gl.TEXTURE_2D,0,0,0,A.width2d,A.height2d,this.gl.RGBA,this.gl.UNSIGNED_BYTE,H),this.pixMapProgram.use(),this.gl.drawArrays(this.gl.TRIANGLES,0,3),this.texturesToDelete.push(N),!0}startRenderScene(){this.isRenderingScene=!0,this.gouraudTriangleCount=0}endRenderScene(){this.isRenderingScene=!1;let A=S.viewportRight,R=S.viewportBottom;if(this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,this.viewportFramebuffer),this.gl.viewport(0,0,A,R),this.gl.clearColor(0,0,0,1),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.gouraudTriangleCount>0){let _=this.gl.createTexture();this.gl.bindTexture(this.gl.TEXTURE_2D,_),this.gl.texStorage2D(this.gl.TEXTURE_2D,1,this.gl.RGBA32UI,this.gouraudTriangleCount,1),this.gl.texSubImage2D(this.gl.TEXTURE_2D,0,0,0,this.gouraudTriangleCount,1,this.gl.RGBA_INTEGER,this.gl.UNSIGNED_INT,this.gouraudTriangleData),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.NEAREST),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.NEAREST),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.mainProgram.use(),this.gl.drawArrays(this.gl.TRIANGLES,0,this.gouraudTriangleCount*3),this.texturesToDelete.push(_)}this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null)}fillTriangle(A,R,_,E,I,H,N){if(!this.isRenderingScene)return!1;return!0}fillGouraudTriangle(A,R,_,E,I,H,N,O,Q){if(!this.isRenderingScene)return!1;let U=this.gouraudTriangleCount*4;if(U>=this.gouraudTriangleData.length){let G=new Uint32Array(this.gouraudTriangleData.length*2);G.set(this.gouraudTriangleData),this.gouraudTriangleData=G,this.gouraudTriangleDataView=new DataView(this.gouraudTriangleData.buffer)}return A+=2048,R+=2048,_+=2048,E+=2048,I+=2048,H+=2048,this.gouraudTriangleDataView.setUint32(U++*4,A<<20|R<<8|_>>4,!0),this.gouraudTriangleDataView.setUint32(U++*4,E<<20|I<<8|_&15,!0),this.gouraudTriangleDataView.setUint32(U++*4,H<<16|N,!0),this.gouraudTriangleDataView.setUint32(U++*4,O<<16|Q,!0),this.gouraudTriangleCount++,!0}fillTexturedTriangle(A,R,_,E,I,H,N,O,Q,U,G,$,L,J,q,V,B,F,b){if(!this.isRenderingScene)return!1;return!0}destroy(){}}class V6{socket;wsin;wsout;closed=!1;ioerror=!1;static async openSocket(A,R){return await new Promise((_,E)=>{let H=new WebSocket(`${R?"wss":"ws"}://${A}`,"binary");H.addEventListener("open",()=>{_(H)}),H.addEventListener("error",()=>{E(H)})})}constructor(A){A.onclose=this.onclose,A.onerror=this.onerror,this.wsin=new F8(A,5000),this.wsout=new B8(A,5000),this.socket=A}get host(){return this.socket.url.split("/")[2]}get port(){return parseInt(this.socket.url.split(":")[2],10)}get available(){return this.closed?0:this.wsin.available}write(A,R){if(!this.closed)this.wsout.write(A,R)}async read(){return this.closed?0:await this.wsin.read()}async readBytes(A,R,_){if(this.closed)return;await this.wsin.readBytes(A,R,_)}close(){this.closed=!0,this.socket.close(),this.wsin.close(),this.wsout.close()}onclose=(A)=>{if(this.closed)return;this.close()};onerror=(A)=>{if(this.closed)return;this.ioerror=!0,this.close()}}class B8{socket;limit;closed=!1;ioerror=!1;constructor(A,R){this.socket=A,this.limit=R}write(A,R){if(this.closed)return;if(this.ioerror)throw this.ioerror=!1,new Error;if(R>this.limit||A.length>this.limit)throw new Error;try{this.socket.send(A.slice(0,R))}catch(_){this.ioerror=!0}}close(){this.closed=!0}}class K8{bytes;position;constructor(A){this.bytes=A,this.position=0}get available(){return this.bytes.length-this.position}get read(){return this.bytes[this.position++]}get len(){return this.bytes.length}}class F8{limit;queue=[];event=null;callback=null;closed=!1;total=0;constructor(A,R){this.limit=R,A.binaryType="arraybuffer",A.onmessage=this.onmessage}get available(){return this.total}onmessage=(A)=>{if(this.closed)throw new Error;let R=new K8(new Uint8Array(A.data));if(this.total+=R.available,this.callback){let _=this.callback;this.callback=null,_(R)}else this.queue.push(R)};async read(){if(this.closed)throw new Error;return await Promise.race([new Promise((A)=>{if(!this.event||this.event.available===0)this.event=this.queue.shift()??null;if(this.event&&this.event.available>0)A(this.event.read),this.total--;else this.callback=(R)=>{this.event=R,this.total--,A(R.read)}}),new Promise((A,R)=>{setTimeout(()=>{if(this.closed)R(new Error);else R(new Error)},20000)})])}async readBytes(A,R,_){if(this.closed)throw new Error;for(let E=0;E<_;E++)A[R+E]=await this.read();return A}close(){this.closed=!0,this.callback=null,this.event=null,this.queue=[]}}class k6{db;constructor(A){A.onerror=this.onerror,A.onclose=this.onclose,this.db=A}static async openDatabase(){return await new Promise((A,R)=>{let _=indexedDB.open("lostcity",1);_.onsuccess=(E)=>{let I=E.target;A(I.result)},_.onupgradeneeded=(E)=>{E.target.result.createObjectStore("cache")},_.onerror=(E)=>{let I=E.target;R(I.result)}})}async cacheload(A){return await new Promise((R)=>{let I=this.db.transaction("cache","readonly").objectStore("cache").get(A);I.onsuccess=()=>{if(I.result)R(new Uint8Array(I.result));else R(void 0)},I.onerror=()=>{R(void 0)}})}async cachesave(A,R){if(R===null)return;return await new Promise((_,E)=>{let N=this.db.transaction("cache","readwrite").objectStore("cache").put(R,A);N.onsuccess=()=>{_()},N.onerror=()=>{_()}})}onclose=(A)=>{};onerror=(A)=>{}}class S6{count=0;rsl=new Int32Array(256);mem=new Int32Array(256);a=0;b=0;c=0;constructor(A){for(let R=0;R<A.length;R++)this.rsl[R]=A[R];this.init()}get nextInt(){if(this.count--===0)this.isaac(),this.count=255;return this.rsl[this.count]}init(){let A=2654435769,R=2654435769,_=2654435769,E=2654435769,I=2654435769,H=2654435769,N=2654435769,O=2654435769;for(let Q=0;Q<4;Q++)A^=R<<11,E+=A,R+=_,R^=_>>>2,I+=R,_+=E,_^=E<<8,H+=_,E+=I,E^=I>>>16,N+=E,I+=H,I^=H<<10,O+=I,H+=N,H^=N>>>4,A+=H,N+=O,N^=O<<8,R+=N,O+=A,O^=A>>>9,_+=O,A+=R;for(let Q=0;Q<256;Q+=8)A+=this.rsl[Q],R+=this.rsl[Q+1],_+=this.rsl[Q+2],E+=this.rsl[Q+3],I+=this.rsl[Q+4],H+=this.rsl[Q+5],N+=this.rsl[Q+6],O+=this.rsl[Q+7],A^=R<<11,E+=A,R+=_,R^=_>>>2,I+=R,_+=E,_^=E<<8,H+=_,E+=I,E^=I>>>16,N+=E,I+=H,I^=H<<10,O+=I,H+=N,H^=N>>>4,A+=H,N+=O,N^=O<<8,R+=N,O+=A,O^=A>>>9,_+=O,A+=R,this.mem[Q]=A,this.mem[Q+1]=R,this.mem[Q+2]=_,this.mem[Q+3]=E,this.mem[Q+4]=I,this.mem[Q+5]=H,this.mem[Q+6]=N,this.mem[Q+7]=O;for(let Q=0;Q<256;Q+=8)A+=this.mem[Q],R+=this.mem[Q+1],_+=this.mem[Q+2],E+=this.mem[Q+3],I+=this.mem[Q+4],H+=this.mem[Q+5],N+=this.mem[Q+6],O+=this.mem[Q+7],A^=R<<11,E+=A,R+=_,R^=_>>>2,I+=R,_+=E,_^=E<<8,H+=_,E+=I,E^=I>>>16,N+=E,I+=H,I^=H<<10,O+=I,H+=N,H^=N>>>4,A+=H,N+=O,N^=O<<8,R+=N,O+=A,O^=A>>>9,_+=O,A+=R,this.mem[Q]=A,this.mem[Q+1]=R,this.mem[Q+2]=_,this.mem[Q+3]=E,this.mem[Q+4]=I,this.mem[Q+5]=H,this.mem[Q+6]=N,this.mem[Q+7]=O;this.isaac(),this.count=256}isaac(){this.c++,this.b+=this.c;for(let A=0;A<256;A++){let R=this.mem[A],_=A&3;if(_===0)this.a^=this.a<<13;else if(_===1)this.a^=this.a>>>6;else if(_===2)this.a^=this.a<<2;else if(_===3)this.a^=this.a>>>16;this.a+=this.mem[A+128&255];let E;this.mem[A]=E=this.mem[R>>>2&255]+this.a+this.b,this.rsl[A]=this.b=this.mem[E>>>8>>>2&255]+R}}}import{BZip2 as V8}from"./deps.js";class _6{static genHash(A){let R=0;A=A.toUpperCase();for(let _=0;_<A.length;_++)R=R*61+A.charCodeAt(_)-32|0;return R}jagSrc;compressedWhole;fileCount;fileHash;fileUnpackedSize;filePackedSize;fileOffset;fileUnpacked=[];constructor(A){let R=new s(new Uint8Array(A)),_=R.g3(),E=R.g3();if(_===E)this.jagSrc=A,this.compressedWhole=!1;else this.jagSrc=V8.decompress(A.subarray(6),_,!0),R=new s(new Uint8Array(this.jagSrc)),this.compressedWhole=!0;this.fileCount=R.g2(),this.fileHash=[],this.fileUnpackedSize=[],this.filePackedSize=[],this.fileOffset=[];let I=R.pos+this.fileCount*10;for(let H=0;H<this.fileCount;H++)this.fileHash.push(R.g4()),this.fileUnpackedSize.push(R.g3()),this.filePackedSize.push(R.g3()),this.fileOffset.push(I),I+=this.filePackedSize[H]}read(A){let R=_6.genHash(A),_=this.fileHash.indexOf(R);if(_===-1)return null;return this.readIndex(_)}readIndex(A){if(A<0||A>=this.fileCount)return null;if(this.fileUnpacked[A])return this.fileUnpacked[A];let R=this.fileOffset[A],_=R+this.filePackedSize[A],E=new Uint8Array(this.jagSrc.subarray(R,R+_));if(this.compressedWhole)return this.fileUnpacked[A]=E,E;else{let I=V8.decompress(E,this.fileUnpackedSize[A],!0);return this.fileUnpacked[A]=I,I}}}var k8=[0,-2,4,6,-1,0,0,2,0,0,0,0,5,4,2,2,0,0,0,0,2,-2,2,14,0,6,3,0,4,0,0,0,3,0,0,0,0,0,0,0,0,-1,4,2,6,0,6,0,0,3,7,0,0,0,-1,0,0,0,0,4,0,0,0,0,0,0,0,0,1,15,0,0,0,0,6,0,2,0,0,0,2,0,0,0,1,0,0,4,0,0,0,0,0,0,0,0,0,0,-2,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,-2,0,0,2,0,0,0,2,9,0,0,0,0,0,4,0,0,0,3,7,9,0,0,0,0,0,0,0,0,0,-2,0,0,0,0,3,2,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,-2,2,0,0,0,0,0,6,0,0,0,2,0,2,0,0,0,-2,0,0,4,0,0,0,0,6,0,0,-2,-2,0,0,0,0,0,0,-2,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,-2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0];class y0{static PERIOD=new Uint16Array(["d","o","t"].join("").split("").map((A)=>A.charCodeAt(0)));static AMPERSAT=new Uint16Array(["(","a",")"].join("").split("").map((A)=>A.charCodeAt(0)));static SLASH=new Uint16Array(["s","l","a","s","h"].join("").split("").map((A)=>A.charCodeAt(0)));static whitelist=["cook","cook's","cooks","seeks","sheet"];static tlds=[];static tldTypes=[];static bads=[];static badCombinations=[];static domains=[];static fragments=[];static unpack(A){let R=new s(A.read("fragmentsenc.txt")),_=new s(A.read("badenc.txt")),E=new s(A.read("domainenc.txt")),I=new s(A.read("tldlist.txt"));this.read(_,E,R,I)}static filter(A){let R=[...A];this.format(R);let _=R.join("").trim(),E=_.toLowerCase(),I=[...E];this.filterTlds(I),this.filterBadWords(I),this.filterDomains(I),this.filterFragments(I);for(let H=0;H<this.whitelist.length;H++){let N=-1;while((N=E.indexOf(this.whitelist[H],N+1))!==-1){let O=[...this.whitelist[H]];for(let Q=0;Q<O.length;Q++)I[Q+N]=O[Q]}}return this.replaceUppercases(I,[..._]),this.formatUppercases(I),I.join("").trim()}static read(A,R,_,E){this.readBadWords(A),this.readDomains(R),this.readFragments(_),this.readTld(E)}static readTld(A){let R=A.g4();for(let _=0;_<R;_++)this.tldTypes[_]=A.g1(),this.tlds[_]=new Uint16Array(A.g1()).map(()=>A.g1())}static readBadWords(A){let R=A.g4();for(let _=0;_<R;_++){this.bads[_]=new Uint16Array(A.g1()).map(()=>A.g1());let E=new Array(A.g1()).fill([]).map(()=>[A.g1b(),A.g1b()]);if(E.length>0)this.badCombinations[_]=E}}static readDomains(A){let R=A.g4();for(let _=0;_<R;_++)this.domains[_]=new Uint16Array(A.g1()).map(()=>A.g1())}static readFragments(A){let R=A.g4();for(let _=0;_<R;_++)this.fragments[_]=A.g2()}static filterTlds(A){let R=[...A],_=[...A];this.filterBadCombinations(null,R,this.PERIOD),this.filterBadCombinations(null,_,this.SLASH);for(let E=0;E<this.tlds.length;E++)this.filterTld(_,this.tldTypes[E],A,this.tlds[E],R)}static filterBadWords(A){for(let R=0;R<2;R++)for(let _=this.bads.length-1;_>=0;_--)this.filterBadCombinations(this.badCombinations[_],A,this.bads[_])}static filterDomains(A){let R=[...A],_=[...A];this.filterBadCombinations(null,R,this.AMPERSAT),this.filterBadCombinations(null,_,this.PERIOD);for(let E=this.domains.length-1;E>=0;E--)this.filterDomain(_,R,this.domains[E],A)}static filterFragments(A){for(let R=0;R<A.length;){let _=this.indexOfNumber(A,R);if(_===-1)return;let E=!1;for(let N=R;N>=0&&N<_&&!E;N++)if(!this.isSymbol(A[N])&&!this.isNotLowercaseAlpha(A[N]))E=!0;let I=0;if(E)I=0;if(I===0)I=1,R=_;let H=0;for(let N=_;N<A.length&&N<R;N++)H=H*10+A[N].charCodeAt(0)-48;if(H<=255&&R-_<=8)I++;else I=0;if(I===4)this.maskChars(_,R,A),I=0;R=this.indexOfNonNumber(R,A)}}static isBadFragment(A){if(this.isNumericalChars(A))return!0;let R=this.getInteger(A),_=this.fragments,E=_.length;if(R===_[0]||R===_[E-1])return!0;let I=0,H=E-1;while(I<=H){let N=(I+H)/2|0;if(R===_[N])return!0;else if(R<_[N])H=N-1;else I=N+1}return!1}static getInteger(A){if(A.length>6)return 0;let R=0;for(let _=0;_<A.length;_++){let E=A[A.length-_-1];if(this.isLowercaseAlpha(E))R=R*38+E.charCodeAt(0)+1-97;else if(E==="'")R=R*38+27;else if(this.isNumerical(E))R=R*38+E.charCodeAt(0)+28-48;else if(E!=="\x00")return 0}return R}static indexOfNumber(A,R){for(let _=R;_<A.length&&_>=0;_++)if(this.isNumerical(A[_]))return _;return-1}static indexOfNonNumber(A,R){for(let _=A;_<R.length&&_>=0;_++)if(!this.isNumerical(R[_]))return _;return R.length}static getEmulatedDomainCharLen(A,R,_){if(R===_)return 1;else if(R==="o"&&_==="0")return 1;else if(R==="o"&&_==="("&&A===")")return 2;else if(R==="c"&&(_==="("||_==="<"||_==="["))return 1;else if(R==="e"&&_==="€")return 1;else if(R==="s"&&_==="$")return 1;else if(R==="l"&&_==="i")return 1;return 0}static filterDomain(A,R,_,E){let I=_.length,H=E.length;for(let N=0;N<=H-I;N++){let{matched:O,currentIndex:Q}=this.findMatchingDomain(N,_,E);if(!O)continue;let U=this.prefixSymbolStatus(N,E,3,R,["@"]),G=this.suffixSymbolStatus(Q-1,E,3,A,[".",","]);if(!(U>2||G>2))continue;this.maskChars(N,Q,E)}}static findMatchingDomain(A,R,_){let E=R.length,I=A,H=0;while(I<_.length&&H<E){let N=_[I],O=I+1<_.length?_[I+1]:"\x00",Q=this.getEmulatedDomainCharLen(O,String.fromCharCode(R[H]),N);if(Q>0)I+=Q,H++;else{if(H===0)break;let U=this.getEmulatedDomainCharLen(O,String.fromCharCode(R[H-1]),N);if(U>0){if(I+=U,H===1)A++}else{if(H>=E||!this.isSymbol(N))break;I++}}}return{matched:H>=E,currentIndex:I}}static filterBadCombinations(A,R,_){if(_.length>R.length)return;for(let E=0;E<=R.length-_.length;E++){let I=E,{currentIndex:H,badIndex:N,hasSymbol:O,hasNumber:Q,hasDigit:U}=this.processBadCharacters(R,_,I);I=H;let G=R[I],$=I+1<R.length?R[I+1]:"\x00";if(!(N>=_.length&&(!Q||!U)))continue;let L=!0,J;if(O){let B=!1,F=!1;if(E-1<0||this.isSymbol(R[E-1])&&R[E-1]!=="'")B=!0;if(I>=R.length||this.isSymbol(R[I])&&R[I]!=="'")F=!0;if(!B||!F){let b=!1;if(J=E-2,B)J=E;while(!b&&J<I){if(J>=0&&(!this.isSymbol(R[J])||R[J]==="'")){let T=[],j;for(j=0;j<3&&J+j<R.length&&(!this.isSymbol(R[J+j])||R[J+j]==="'");j++)T[j]=R[J+j];let w=!0;if(j===0)w=!1;if(j<3&&J-1>=0&&(!this.isSymbol(R[J-1])||R[J-1]==="'"))w=!1;if(w&&!this.isBadFragment(T))b=!0}J++}if(!b)L=!1}}else{if(G=" ",E-1>=0)G=R[E-1];if($=" ",I<R.length)$=R[I];let B=this.getIndex(G),F=this.getIndex($);if(A&&this.comboMatches(B,A,F))L=!1}if(!L)continue;let q=0,V=0;for(let B=E;B<I;B++)if(this.isNumerical(R[B]))q++;else if(this.isAlpha(R[B]))V++;if(q<=V)this.maskChars(E,I,R)}}static processBadCharacters(A,R,_){let E=_,I=0,H=0,N=!1,O=!1,Q=!1;for(;E<A.length&&!(O&&Q);){if(E>=A.length||O&&Q)break;let U=A[E],G=E+1<A.length?A[E+1]:"\x00",$;if(I<R.length&&($=this.getEmulatedBadCharLen(G,String.fromCharCode(R[I]),U))>0){if($===1&&this.isNumerical(U))O=!0;if($===2&&(this.isNumerical(U)||this.isNumerical(G)))O=!0;E+=$,I++}else{if(I===0)break;let L;if((L=this.getEmulatedBadCharLen(G,String.fromCharCode(R[I-1]),U))>0)E+=L;else{if(I>=R.length||!this.isNotLowercaseAlpha(U))break;if(this.isSymbol(U)&&U!=="'")N=!0;if(this.isNumerical(U))Q=!0;if(E++,H++,(H*100/(E-_)|0)>90)break}}}return{currentIndex:E,badIndex:I,hasSymbol:N,hasNumber:O,hasDigit:Q}}static getEmulatedBadCharLen(A,R,_){if(R===_)return 1;if(R>="a"&&R<="m"){if(R==="a"){if(_!=="4"&&_!=="@"&&_!=="^"){if(_==="/"&&A==="\\")return 2;return 0}return 1}if(R==="b"){if(_!=="6"&&_!=="8"){if(_==="1"&&A==="3")return 2;return 0}return 1}if(R==="c"){if(_!=="("&&_!=="<"&&_!=="{"&&_!=="[")return 0;return 1}if(R==="d"){if(_==="["&&A===")")return 2;return 0}if(R==="e"){if(_!=="3"&&_!=="€")return 0;return 1}if(R==="f"){if(_==="p"&&A==="h")return 2;if(_==="£")return 1;return 0}if(R==="g"){if(_!=="9"&&_!=="6")return 0;return 1}if(R==="h"){if(_==="#")return 1;return 0}if(R==="i"){if(_!=="y"&&_!=="l"&&_!=="j"&&_!=="1"&&_!=="!"&&_!==":"&&_!==";"&&_!=="|")return 0;return 1}if(R==="j")return 0;if(R==="k")return 0;if(R==="l"){if(_!=="1"&&_!=="|"&&_!=="i")return 0;return 1}if(R==="m")return 0}if(R>="n"&&R<="z"){if(R==="n")return 0;if(R==="o"){if(_!=="0"&&_!=="*"){if((_!=="("||A!==")")&&(_!=="["||A!=="]")&&(_!=="{"||A!=="}")&&(_!=="<"||A!==">"))return 0;return 2}return 1}if(R==="p")return 0;if(R==="q")return 0;if(R==="r")return 0;if(R==="s"){if(_!=="5"&&_!=="z"&&_!=="$"&&_!=="2")return 0;return 1}if(R==="t"){if(_!=="7"&&_!=="+")return 0;return 1}if(R==="u"){if(_==="v")return 1;if((_!=="\\"||A!=="/")&&(_!=="\\"||A!=="|")&&(_!=="|"||A!=="/"))return 0;return 2}if(R==="v"){if((_!=="\\"||A!=="/")&&(_!=="\\"||A!=="|")&&(_!=="|"||A!=="/"))return 0;return 2}if(R==="w"){if(_==="v"&&A==="v")return 2;return 0}if(R==="x"){if((_!==")"||A!=="(")&&(_!=="}"||A!=="{")&&(_!=="]"||A!=="[")&&(_!==">"||A!=="<"))return 0;return 2}if(R==="y")return 0;if(R==="z")return 0}if(R>="0"&&R<="9")if(R==="0")if(_==="o"||_==="O")return 1;else if((_!=="("||A!==")")&&(_!=="{"||A!=="}")&&(_!=="["||A!=="]"))return 0;else return 2;else if(R==="1")return _==="l"?1:0;else return 0;else if(R===",")return _==="."?1:0;else if(R===".")return _===","?1:0;else if(R==="!")return _==="i"?1:0;return 0}static comboMatches(A,R,_){let E=0,I=R.length-1;while(E<=I){let H=(E+I)/2|0;if(R[H][0]===A&&R[H][1]===_)return!0;else if(A<R[H][0]||A===R[H][0]&&_<R[H][1])I=H-1;else E=H+1}return!1}static getIndex(A){if(this.isLowercaseAlpha(A))return A.charCodeAt(0)+1-97;else if(A==="'")return 28;else if(this.isNumerical(A))return A.charCodeAt(0)+29-48;return 27}static filterTld(A,R,_,E,I){if(E.length>_.length)return;for(let H=0;H<=_.length-E.length;H++){let{currentIndex:N,tldIndex:O}=this.processTlds(_,E,H);if(O<E.length)continue;let Q=!1,U=this.prefixSymbolStatus(H,_,3,I,[",","."]),G=this.suffixSymbolStatus(N-1,_,5,A,["\\","/"]);if(R===1&&U>0&&G>0)Q=!0;if(R===2&&(U>2&&G>0||U>0&&G>2))Q=!0;if(R===3&&U>0&&G>2)Q=!0;if(!Q)continue;let $=H,L=N-1,J=!1,q;if(U>2){if(U===4){J=!1;for(q=H-1;q>=0;q--)if(J){if(I[q]!=="*")break;$=q}else if(I[q]==="*")$=q,J=!0}J=!1;for(q=$-1;q>=0;q--)if(J){if(this.isSymbol(_[q]))break;$=q}else if(!this.isSymbol(_[q]))J=!0,$=q}if(G>2){if(G===4){J=!1;for(q=L+1;q<_.length;q++)if(J){if(A[q]!=="*")break;L=q}else if(A[q]==="*")L=q,J=!0}J=!1;for(q=L+1;q<_.length;q++)if(J){if(this.isSymbol(_[q]))break;L=q}else if(!this.isSymbol(_[q]))J=!0,L=q}this.maskChars($,L+1,_)}}static processTlds(A,R,_){let E=0;while(_<A.length&&E<R.length){let I=A[_],H=_+1<A.length?A[_+1]:"\x00",N;if((N=this.getEmulatedDomainCharLen(H,String.fromCharCode(R[E]),I))>0)_+=N,E++;else{if(E===0)break;let O;if((O=this.getEmulatedDomainCharLen(H,String.fromCharCode(R[E-1]),I))>0)_+=O;else{if(!this.isSymbol(I))break;_++}}}return{currentIndex:_,tldIndex:E}}static isSymbol(A){return!this.isAlpha(A)&&!this.isNumerical(A)}static isNotLowercaseAlpha(A){return this.isLowercaseAlpha(A)?A==="v"||A==="x"||A==="j"||A==="q"||A==="z":!0}static isAlpha(A){return this.isLowercaseAlpha(A)||this.isUppercaseAlpha(A)}static isNumerical(A){return A>="0"&&A<="9"}static isLowercaseAlpha(A){return A>="a"&&A<="z"}static isUppercaseAlpha(A){return A>="A"&&A<="Z"}static isNumericalChars(A){for(let R=0;R<A.length;R++)if(!this.isNumerical(A[R])&&A[R]!=="\x00")return!1;return!0}static maskChars(A,R,_){for(let E=A;E<R;E++)_[E]="*"}static maskedCountBackwards(A,R){let _=0;for(let E=R-1;E>=0&&this.isSymbol(A[E]);E--)if(A[E]==="*")_++;return _}static maskedCountForwards(A,R){let _=0;for(let E=R+1;E<A.length&&this.isSymbol(A[E]);E++)if(A[E]==="*")_++;return _}static maskedCharsStatus(A,R,_,E,I){if((I?this.maskedCountBackwards(R,_):this.maskedCountForwards(R,_))>=E)return 4;else if(this.isSymbol(I?A[_-1]:A[_+1]))return 1;return 0}static prefixSymbolStatus(A,R,_,E,I){if(A===0)return 2;for(let H=A-1;H>=0&&this.isSymbol(R[H]);H--)if(I.includes(R[H]))return 3;return this.maskedCharsStatus(R,E,A,_,!0)}static suffixSymbolStatus(A,R,_,E,I){if(A+1===R.length)return 2;for(let H=A+1;H<R.length&&this.isSymbol(R[H]);H++)if(I.includes(R[H]))return 3;return this.maskedCharsStatus(R,E,A,_,!1)}static format(A){let R=0;for(let _=0;_<A.length;_++){if(this.isCharacterAllowed(A[_]))A[R]=A[_];else A[R]=" ";if(R===0||A[R]!==" "||A[R-1]!==" ")R++}for(let _=R;_<A.length;_++)A[_]=" "}static isCharacterAllowed(A){return A>=" "&&A<=""||A===" "||A===`
`||A==="\t"||A==="£"||A==="€"}static replaceUppercases(A,R){for(let _=0;_<R.length;_++)if(A[_]!=="*"&&this.isUppercaseAlpha(R[_]))A[_]=R[_]}static formatUppercases(A){let R=!0;for(let _=0;_<A.length;_++){let E=A[_];if(!this.isAlpha(E))R=!0;else if(R){if(this.isLowercaseAlpha(E))R=!1}else if(this.isUppercaseAlpha(E))A[_]=String.fromCharCode(E.charCodeAt(0)+97-65)}}}class o0{static TABLE=[" ","e","t","a","o","i","h","n","s","r","d","l","u","m","w","c","y","f","g","p","b","v","k","x","j","q","z","0","1","2","3","4","5","6","7","8","9"," ","!","?",".",",",":",";","(",")","-","&","*","\\","'","@","#","+","=","£","$","%",'"',"[","]"];static charBuffer=[];static unpack(A,R){let _=0,E=-1,I;for(let N=0;N<R&&_<100;N++){let O=A.g1();if(I=O>>4&15,E!==-1)this.charBuffer[_++]=this.TABLE[(E<<4)+I-195],E=-1;else if(I<13)this.charBuffer[_++]=this.TABLE[I];else E=I;if(I=O&15,E!==-1)this.charBuffer[_++]=this.TABLE[(E<<4)+I-195],E=-1;else if(I<13)this.charBuffer[_++]=this.TABLE[I];else E=I}let H=!0;for(let N=0;N<_;N++){let O=this.charBuffer[N];if(H&&O>="a"&&O<="z")this.charBuffer[N]=O.toUpperCase(),H=!1;if(O==="."||O==="!")H=!0}return this.charBuffer.slice(0,_).join("")}static pack(A,R){if(R.length>80)R=R.substring(0,80);R=R.toLowerCase();let _=-1;for(let E=0;E<R.length;E++){let I=R.charAt(E),H=0;for(let N=0;N<this.TABLE.length;N++)if(I===this.TABLE[N]){H=N;break}if(H>12)H+=195;if(_===-1)if(H<13)_=H;else A.p1(H);else if(H<13)A.p1((_<<4)+H),_=-1;else A.p1((_<<4)+(H>>4)),_=H&15}if(_!==-1)A.p1(_<<4)}}class P0{start=0;end=0;form=0;envLength=0;shapeDelta=null;shapePeak=null;envThreshold=0;envPosition=0;delta=0;envAmplitude=0;ticks=0;read(A){this.form=A.g1(),this.start=A.g4(),this.end=A.g4(),this.envLength=A.g1(),this.shapeDelta=new Int32Array(this.envLength),this.shapePeak=new Int32Array(this.envLength);for(let R=0;R<this.envLength;R++)this.shapeDelta[R]=A.g2(),this.shapePeak[R]=A.g2()}reset(){this.envThreshold=0,this.envPosition=0,this.delta=0,this.envAmplitude=0,this.ticks=0}evaluateAt(A){if(this.ticks>=this.envThreshold&&this.shapePeak&&this.shapeDelta){if(this.envAmplitude=this.shapePeak[this.envPosition++]<<15,this.envPosition>=this.envLength)this.envPosition=this.envLength-1;if(this.envThreshold=this.shapeDelta[this.envPosition]/65536*A|0,this.envThreshold>this.ticks)this.delta=((this.shapePeak[this.envPosition]<<15)-this.envAmplitude)/(this.envThreshold-this.ticks)|0}return this.envAmplitude+=this.delta,this.ticks++,this.envAmplitude-this.delta>>15}}class G0{static toneSrc=null;static noise=null;static sin=null;static tmpPhases=new Int32Array(5);static tmpDelays=new Int32Array(5);static tmpVolumes=new Int32Array(5);static tmpSemitones=new Int32Array(5);static tmpStarts=new Int32Array(5);frequencyBase=null;amplitudeBase=null;frequencyModRate=null;frequencyModRange=null;amplitudeModRate=null;amplitudeModRange=null;envRelease=null;envAttack=null;harmonicVolume=new Int32Array(5);harmonicSemitone=new Int32Array(5);harmonicDelay=new Int32Array(5);toneStart=0;toneLength=500;reverbVolume=100;reverbDelay=0;static init(){this.noise=new Int32Array(32768);for(let A=0;A<32768;A++)if(Math.random()>0.5)this.noise[A]=1;else this.noise[A]=-1;this.sin=new Int32Array(32768);for(let A=0;A<32768;A++)this.sin[A]=Math.sin(A/5215.1903)*16384|0;this.toneSrc=new Int32Array(220500)}generate(A,R){for(let U=0;U<A;U++)G0.toneSrc[U]=0;if(R<10)return G0.toneSrc;let _=A/R|0;this.frequencyBase?.reset(),this.amplitudeBase?.reset();let E=0,I=0,H=0;if(this.frequencyModRate&&this.frequencyModRange)this.frequencyModRate.reset(),this.frequencyModRange.reset(),E=(this.frequencyModRate.end-this.frequencyModRate.start)*32.768/_|0,I=this.frequencyModRate.start*32.768/_|0;let N=0,O=0,Q=0;if(this.amplitudeModRate&&this.amplitudeModRange)this.amplitudeModRate.reset(),this.amplitudeModRange.reset(),N=(this.amplitudeModRate.end-this.amplitudeModRate.start)*32.768/_|0,O=this.amplitudeModRate.start*32.768/_|0;for(let U=0;U<5;U++)if(this.frequencyBase&&this.harmonicVolume[U]!==0)G0.tmpPhases[U]=0,G0.tmpDelays[U]=this.harmonicDelay[U]*_,G0.tmpVolumes[U]=(this.harmonicVolume[U]<<14)/100|0,G0.tmpSemitones[U]=(this.frequencyBase.end-this.frequencyBase.start)*32.768*Math.pow(1.0057929410678534,this.harmonicSemitone[U])/_|0,G0.tmpStarts[U]=this.frequencyBase.start*32.768/_|0;if(this.frequencyBase&&this.amplitudeBase)for(let U=0;U<A;U++){let G=this.frequencyBase.evaluateAt(A),$=this.amplitudeBase.evaluateAt(A);if(this.frequencyModRate&&this.frequencyModRange){let L=this.frequencyModRate.evaluateAt(A),J=this.frequencyModRange.evaluateAt(A);G+=this.generate2(J,H,this.frequencyModRate.form)>>1,H+=(L*E>>16)+I}if(this.amplitudeModRate&&this.amplitudeModRange){let L=this.amplitudeModRate.evaluateAt(A),J=this.amplitudeModRange.evaluateAt(A);$=$*((this.generate2(J,Q,this.amplitudeModRate.form)>>1)+32768)>>15,Q+=(L*N>>16)+O}for(let L=0;L<5;L++)if(this.harmonicVolume[L]!==0){let J=U+G0.tmpDelays[L];if(J<A)G0.toneSrc[J]+=this.generate2($*G0.tmpVolumes[L]>>15,G0.tmpPhases[L],this.frequencyBase.form),G0.tmpPhases[L]+=(G*G0.tmpSemitones[L]>>16)+G0.tmpStarts[L]}}if(this.envRelease&&this.envAttack){this.envRelease.reset(),this.envAttack.reset();let U=0,G=!0;for(let $=0;$<A;$++){let L=this.envRelease.evaluateAt(A),J=this.envAttack.evaluateAt(A),q;if(G)q=this.envRelease.start+((this.envRelease.end-this.envRelease.start)*L>>8);else q=this.envRelease.start+((this.envRelease.end-this.envRelease.start)*J>>8);if(U+=256,U>=q)U=0,G=!G;if(G)G0.toneSrc[$]=0}}if(this.reverbDelay>0&&this.reverbVolume>0){let U=this.reverbDelay*_;for(let G=U;G<A;G++)G0.toneSrc[G]+=G0.toneSrc[G-U]*this.reverbVolume/100|0,G0.toneSrc[G]|=0}for(let U=0;U<A;U++){if(G0.toneSrc[U]<-32768)G0.toneSrc[U]=-32768;if(G0.toneSrc[U]>32767)G0.toneSrc[U]=32767}return G0.toneSrc}generate2(A,R,_){if(_===1)return(R&32767)<16384?A:-A;else if(_===2)return G0.sin[R&32767]*A>>14;else if(_===3)return((R&32767)*A>>14)-A;else if(_===4)return G0.noise[(R/2607|0)&32767]*A;else return 0}read(A){if(this.frequencyBase=new P0,this.frequencyBase.read(A),this.amplitudeBase=new P0,this.amplitudeBase.read(A),A.g1()!==0)A.pos--,this.frequencyModRate=new P0,this.frequencyModRate.read(A),this.frequencyModRange=new P0,this.frequencyModRange.read(A);if(A.g1()!==0)A.pos--,this.amplitudeModRate=new P0,this.amplitudeModRate.read(A),this.amplitudeModRange=new P0,this.amplitudeModRange.read(A);if(A.g1()!==0)A.pos--,this.envRelease=new P0,this.envRelease.read(A),this.envAttack=new P0,this.envAttack.read(A);for(let R=0;R<10;R++){let _=A.gsmarts();if(_===0)break;this.harmonicVolume[R]=_,this.harmonicSemitone[R]=A.gsmart(),this.harmonicDelay[R]=A.gsmarts()}this.reverbDelay=A.gsmarts(),this.reverbVolume=A.gsmarts(),this.toneLength=A.g2(),this.toneStart=A.g2()}}class I0{static delays=new Int32Array(1000);static waveBytes=null;static waveBuffer=null;static tracks=new p(1000,null);tones=new p(10,null);waveLoopBegin=0;waveLoopEnd=0;static unpack(A){let R=new s(A.read("sounds.dat"));this.waveBytes=new Uint8Array(441000),this.waveBuffer=new s(this.waveBytes),G0.init();while(!0){let _=R.g2();if(_===65535)break;let E=new I0;E.read(R),this.tracks[_]=E,this.delays[_]=E.trim()}}static generate(A,R){if(!this.tracks[A])return null;return this.tracks[A]?.getWave(R)??null}read(A){for(let R=0;R<10;R++)if(A.g1()!==0)A.pos--,this.tones[R]=new G0,this.tones[R]?.read(A);this.waveLoopBegin=A.g2(),this.waveLoopEnd=A.g2()}trim(){let A=9999999;for(let R=0;R<10;R++)if(this.tones[R]&&(this.tones[R].toneStart/20|0)<A)A=this.tones[R].toneStart/20|0;if(this.waveLoopBegin<this.waveLoopEnd&&(this.waveLoopBegin/20|0)<A)A=this.waveLoopBegin/20|0;if(A===9999999||A===0)return 0;for(let R=0;R<10;R++)if(this.tones[R])this.tones[R].toneStart-=A*20;if(this.waveLoopBegin<this.waveLoopEnd)this.waveLoopBegin-=A*20,this.waveLoopEnd-=A*20;return A}getWave(A){let R=this.generate(A);return I0.waveBuffer.pos=0,I0.waveBuffer?.p4(1380533830),I0.waveBuffer?.ip4(R+36),I0.waveBuffer?.p4(1463899717),I0.waveBuffer?.p4(1718449184),I0.waveBuffer?.ip4(16),I0.waveBuffer?.ip2(1),I0.waveBuffer?.ip2(1),I0.waveBuffer?.ip4(22050),I0.waveBuffer?.ip4(22050),I0.waveBuffer?.ip2(1),I0.waveBuffer?.ip2(8),I0.waveBuffer?.p4(1684108385),I0.waveBuffer?.ip4(R),I0.waveBuffer.pos+=R,I0.waveBuffer}generate(A){let R=0;for(let N=0;N<10;N++)if(this.tones[N]&&this.tones[N].toneLength+this.tones[N].toneStart>R)R=this.tones[N].toneLength+this.tones[N].toneStart;if(R===0)return 0;let _=R*22050/1000|0,E=this.waveLoopBegin*22050/1000|0,I=this.waveLoopEnd*22050/1000|0;if(E<0||I<0||I>_||E>=I)A=0;let H=_+(I-E)*(A-1);for(let N=44;N<H+44;N++)if(I0.waveBytes)I0.waveBytes[N]=-128;for(let N=0;N<10;N++)if(this.tones[N]){let O=this.tones[N].toneLength*22050/1000|0,Q=this.tones[N].toneStart*22050/1000|0,U=this.tones[N].generate(O,this.tones[N].toneLength);for(let G=0;G<O;G++)if(I0.waveBytes)I0.waveBytes[G+Q+44]+=U[G]>>8<<24>>24}if(A>1){E+=44,I+=44,_+=44,H+=44;let N=H-_;for(let O=_-1;O>=I;O--)if(I0.waveBytes)I0.waveBytes[O+N]=I0.waveBytes[O];for(let O=1;O<A;O++){let Q=(I-E)*O;for(let U=E;U<I;U++)if(I0.waveBytes)I0.waveBytes[U+Q]=I0.waveBytes[U]}H-=44}return H}}class i extends X6{static nodeId=10;static members=!0;static lowMemory=!1;static cyclelogic1=0;static cyclelogic2=0;static cyclelogic3=0;static cyclelogic4=0;static cyclelogic5=0;static cyclelogic6=0;static oplogic1=0;static oplogic2=0;static oplogic3=0;static oplogic4=0;static oplogic5=0;static oplogic6=0;static oplogic7=0;static oplogic8=0;static oplogic9=0;alreadyStarted=!1;errorStarted=!1;errorLoading=!1;errorHost=!1;errorMessage=null;db=null;loopCycle=0;archiveChecksums=[];netStream=null;in=s.alloc(1);out=s.alloc(1);loginout=s.alloc(1);serverSeed=0n;idleNetCycles=0;idleTimeout=0;systemUpdateTimer=0;randomIn=null;inPacketType=0;inPacketSize=0;lastPacketType0=0;lastPacketType1=0;lastPacketType2=0;titleArchive=null;redrawTitleBackground=!0;titleScreenState=0;titleLoginField=0;imageTitle2=null;imageTitle3=null;imageTitle4=null;imageTitle0=null;imageTitle1=null;imageTitle5=null;imageTitle6=null;imageTitle7=null;imageTitle8=null;imageTitlebox=null;imageTitlebutton=null;loginMessage0="";loginMessage1="";usernameInput="";passwordInput="";fontPlain11=null;fontPlain12=null;fontBold12=null;fontQuill8=null;imageRunes=[];flameActive=!1;imageFlamesLeft=null;imageFlamesRight=null;flameBuffer1=null;flameBuffer0=null;flameBuffer3=null;flameBuffer2=null;flameGradient=null;flameGradient0=null;flameGradient1=null;flameGradient2=null;flameLineOffset=new Int32Array(256);flameCycle0=0;flameGradientCycle0=0;flameGradientCycle1=0;flamesInterval=null;areaSidebar=null;areaMapback=null;areaViewport=null;areaChatback=null;areaBackbase1=null;areaBackbase2=null;areaBackhmid1=null;areaBackleft1=null;areaBackleft2=null;areaBackright1=null;areaBackright2=null;areaBacktop1=null;areaBacktop2=null;areaBackvmid1=null;areaBackvmid2=null;areaBackvmid3=null;areaBackhmid2=null;areaChatbackOffsets=null;areaSidebarOffsets=null;areaViewportOffsets=null;compassMaskLineOffsets=new Int32Array(33);compassMaskLineLengths=new Int32Array(33);minimapMaskLineOffsets=new Int32Array(151);minimapMaskLineLengths=new Int32Array(151);imageInvback=null;imageChatback=null;imageMapback=null;imageBackbase1=null;imageBackbase2=null;imageBackhmid1=null;imageSideicons=new p(13,null);imageMinimap=null;imageCompass=null;imageMapscene=new p(50,null);imageMapfunction=new p(50,null);imageHitmarks=new p(20,null);imageHeadicons=new p(20,null);imageMapflag=null;imageCrosses=new p(8,null);imageMapdot0=null;imageMapdot1=null;imageMapdot2=null;imageMapdot3=null;imageScrollbar0=null;imageScrollbar1=null;imageRedstone1=null;imageRedstone2=null;imageRedstone3=null;imageRedstone1h=null;imageRedstone2h=null;imageRedstone1v=null;imageRedstone2v=null;imageRedstone3v=null;imageRedstone1hv=null;imageRedstone2hv=null;genderButtonImage0=null;genderButtonImage1=null;activeMapFunctions=new p(1000,null);redrawSidebar=!1;redrawChatback=!1;redrawSideicons=!1;redrawPrivacySettings=!1;viewportInterfaceId=-1;dragCycles=0;crossMode=0;crossCycle=0;crossX=0;crossY=0;overrideChat=0;menuVisible=!1;menuArea=0;menuX=0;menuY=0;menuWidth=0;menuHeight=0;menuSize=0;menuOption=[];sidebarInterfaceId=-1;chatInterfaceId=-1;chatInterface=new r;chatScrollHeight=78;chatScrollOffset=0;ignoreCount=0;ignoreName37=[];hintType=0;hintNpc=0;hintOffsetX=0;hintOffsetZ=0;hintPlayer=0;hintTileX=0;hintTileZ=0;hintHeight=0;skillExperience=[];skillLevel=[];skillBaseLevel=[];levelExperience=[];modalMessage=null;flashingTab=-1;selectedTab=3;tabInterfaceId=[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];publicChatSetting=0;privateChatSetting=0;tradeChatSetting=0;scrollGrabbed=!1;scrollInputPadding=0;showSocialInput=!1;socialMessage="";socialInput="";socialAction=0;chatbackInput="";chatbackInputOpen=!1;stickyChatInterfaceId=-1;messageText=new p(100,null);messageTextSender=new p(100,null);messageTextType=new Int32Array(100);messageTextIds=new Int32Array(100);privateMessageCount=0;splitPrivateChat=0;chatEffects=0;chatTyped="";viewportHoveredInterfaceIndex=0;sidebarHoveredInterfaceIndex=0;chatHoveredInterfaceIndex=0;objDragInterfaceId=0;objDragSlot=0;objDragArea=0;objGrabX=0;objGrabY=0;objDragCycles=0;objGrabThreshold=!1;objSelected=0;objSelectedSlot=0;objSelectedInterface=0;objInterface=0;objSelectedName=null;selectedArea=0;selectedItem=0;selectedInterface=0;selectedCycle=0;pressedContinueOption=!1;varps=[];varCache=[];spellSelected=0;activeSpellId=0;activeSpellFlags=0;spellCaption=null;mouseButtonsOption=0;menuAction=new Int32Array(500);menuParamA=new Int32Array(500);menuParamB=new Int32Array(500);menuParamC=new Int32Array(500);hoveredSlotParentId=0;hoveredSlot=0;lastHoveredInterfaceId=0;reportAbuseInput="";reportAbuseMuteOption=!1;reportAbuseInterfaceID=-1;lastAddress=0;daysSinceLastLogin=0;daysSinceRecoveriesChanged=0;unreadMessages=0;activeMapFunctionCount=0;activeMapFunctionX=new Int32Array(1000);activeMapFunctionZ=new Int32Array(1000);scene=null;sceneState=0;sceneDelta=0;sceneCycle=0;flagSceneTileX=0;flagSceneTileZ=0;cutscene=!1;cameraOffsetCycle=0;cameraAnticheatOffsetX=0;cameraAnticheatOffsetZ=0;cameraAnticheatAngle=0;cameraOffsetXModifier=2;cameraOffsetZModifier=2;cameraOffsetYawModifier=1;cameraModifierCycle=new Int32Array(5);cameraModifierEnabled=new p(5,!1);cameraModifierJitter=new Int32Array(5);cameraModifierWobbleScale=new Int32Array(5);cameraModifierWobbleSpeed=new Int32Array(5);cameraX=0;cameraY=0;cameraZ=0;cameraPitch=0;cameraYaw=0;cameraPitchClamp=0;minimapOffsetCycle=0;minimapAnticheatAngle=0;minimapZoom=0;minimapZoomModifier=1;minimapAngleModifier=2;minimapLevel=-1;baseX=0;baseZ=0;sceneCenterZoneX=0;sceneCenterZoneZ=0;sceneBaseTileX=0;sceneBaseTileZ=0;sceneMapLandData=null;sceneMapLandReady=null;sceneMapLocData=null;sceneMapLocReady=null;sceneMapIndex=null;sceneAwaitingSync=!1;scenePrevBaseTileX=0;scenePrevBaseTileZ=0;textureBuffer=new Int8Array(16384);levelCollisionMap=new p(4,null);currentLevel=0;cameraMovedWrite=0;orbitCameraPitch=128;orbitCameraYaw=0;orbitCameraYawVelocity=0;orbitCameraPitchVelocity=0;orbitCameraX=0;orbitCameraZ=0;levelHeightmap=null;levelTileFlags=null;tileLastOccupiedCycle=new M0(104,104);projectX=0;projectY=0;cutsceneDstLocalTileX=0;cutsceneDstLocalTileZ=0;cutsceneDstHeight=0;cutsceneRotateSpeed=0;cutsceneRotateAcceleration=0;cutsceneSrcLocalTileX=0;cutsceneSrcLocalTileZ=0;cutsceneSrcHeight=0;cutsceneMoveSpeed=0;cutsceneMoveAcceleration=0;players=new p(2048,null);playerCount=0;playerIds=new Int32Array(2048);entityUpdateCount=0;entityRemovalCount=0;entityUpdateIds=new Int32Array(2048);entityRemovalIds=new Int32Array(1000);playerAppearanceBuffer=new p(2048,null);npcs=new p(8192,null);npcCount=0;npcIds=new Int32Array(8192);projectiles=new m0;spotanims=new m0;locList=new m0;objStacks=new J6(4,104,104,null);addedLocs=new m0;bfsStepX=new Int32Array(4000);bfsStepZ=new Int32Array(4000);bfsDirection=new Int32Array(104*104);bfsCost=new Int32Array(104*104);tryMoveNearest=0;localPlayer=null;energy=0;inMultizone=0;localPid=-1;weightCarried=0;heartbeatTimer=0;wildernessLevel=0;worldLocationState=0;rights=!1;designGenderMale=!0;updateDesignModel=!1;designIdentikits=new Int32Array(7);designColors=new Int32Array(5);static CHAT_COLORS=Int32Array.of(16776960,16711680,65280,65535,16711935,16777215);friendCount=0;chatCount=0;chatX=new Int32Array(50);chatY=new Int32Array(50);chatHeight=new Int32Array(50);chatWidth=new Int32Array(50);chatColors=new Int32Array(50);chatStyles=new Int32Array(50);chatTimers=new Int32Array(50);chats=new p(50,null);friendName=new p(100,null);friendName37=new BigInt64Array(100);friendWorld=new Int32Array(100);socialName37=null;waveCount=0;waveEnabled=!0;waveIds=new Int32Array(50);waveLoops=new Int32Array(50);waveDelay=new Int32Array(50);waveVolume=64;lastWaveId=-1;lastWaveLoops=-1;lastWaveLength=0;lastWaveStartTime=0;nextMusicDelay=0;midiActive=!0;currentMidi=null;midiCrc=0;midiSize=0;midiVolume=64;static setHighMemory(){S.lowMemory=!1,m.lowMemory=!1,i.lowMemory=!1,l.lowMemory=!1}static setLowMemory(){S.lowMemory=!0,m.lowMemory=!0,i.lowMemory=!0,l.lowMemory=!0}constructor(A,R,_){super();if(typeof A==="undefined"||typeof R==="undefined"||typeof _==="undefined")return;if(i.nodeId=A,i.members=_,R)i.setLowMemory();else i.setHighMemory();this.run()}getTitleScreenState(){return this.titleScreenState}isChatBackInputOpen(){return this.chatbackInputOpen}isShowSocialInput(){return this.showSocialInput}getChatInterfaceId(){return this.chatInterfaceId}getViewportInterfaceId(){return this.viewportInterfaceId}getReportAbuseInterfaceId(){return this.reportAbuseInterfaceID}unloadTitle(){if(this.flameActive=!1,this.flamesInterval)clearInterval(this.flamesInterval),this.flamesInterval=null;this.imageTitlebox=null,this.imageTitlebutton=null,this.imageRunes=[],this.flameGradient=null,this.flameGradient0=null,this.flameGradient1=null,this.flameGradient2=null,this.flameBuffer0=null,this.flameBuffer1=null,this.flameBuffer3=null,this.flameBuffer2=null,this.imageFlamesLeft=null,this.imageFlamesRight=null}async loadArchive(A,R,_,E){let I=5,H=await this.db?.cacheload(A);if(H&&s.crc32(H)!==_)H=void 0;if(H)return new _6(H);while(!H){await this.showProgress(E,`Requesting ${R}`);try{H=await Y6(`/${A}${_}`)}catch(N){H=void 0;for(let O=I;O>0;O--)await this.showProgress(E,`Error loading - Will retry in ${O} secs.`),await A6(1000);if(I*=2,I>60)I=60}}return await this.db?.cachesave(A,H),new _6(H)}async setMidi(A,R,_,E){try{let I=await this.db?.cacheload(A+".mid");if(I&&R!==12345678&&s.crc32(I)!==R)I=void 0;if(!I||!I.length)try{if(I=await Y6(`/${A}_${R}.mid`),_!==I.length)I=I.slice(0,_)}catch(H){}if(!I)return;try{await this.db?.cachesave(A+".mid",I);let H=a6.decompress(I,-1,!1,!0);S8(H,this.midiVolume,E)}catch(H){}}catch(I){}}drawError(){C.resetRenderer(),o.fillStyle="black",o.fillRect(0,0,this.width,this.height),this.setUpdateRate(1),this.flameActive=!1;let A=35;if(this.errorLoading)o.font="bold 16px helvetica, sans-serif",o.textAlign="left",o.fillStyle="yellow",o.fillText("Sorry, an error has occured whilst loading RuneScape",30,A),A+=50,o.fillStyle="white",o.fillText("To fix this try the following (in order):",30,A),A+=50,o.font="bold 12px helvetica, sans-serif",o.fillText("1: Try closing ALL open web-browser windows, and reloading",30,A),A+=30,o.fillText("2: Try clearing your web-browsers cache",30,A),A+=30,o.fillText("3: Try using a different game-world",30,A),A+=30,o.fillText("4: Try rebooting your computer",30,A);else if(this.errorHost)o.font="bold 20px helvetica, sans-serif",o.textAlign="left",o.fillStyle="white",o.fillText("Error - unable to load game!",50,50),o.fillText("To play RuneScape make sure you play from an approved domain",50,100);else if(this.errorStarted)o.font="bold 13px helvetica, sans-serif",o.textAlign="left",o.fillStyle="yellow",o.fillText("Error a copy of RuneScape already appears to be loaded",30,A),A+=50,o.fillStyle="white",o.fillText("To fix this try the following (in order):",30,A),A+=50,o.font="bold 12px helvetica, sans-serif",o.fillText("1: Try closing ALL open web-browser windows, and reloading",30,A),A+=30,o.fillText("2: Try rebooting your computer, and reloading",30,A);if(this.errorMessage)A+=50,o.fillStyle="red",o.fillText("Error: "+this.errorMessage,30,A)}executeInterfaceScript(A){if(!A.scriptComparator)return!1;for(let R=0;R<A.scriptComparator.length;R++){let _=this.executeClientscript1(A,R);if(!A.scriptOperand)return!1;let E=A.scriptOperand[R];if(A.scriptComparator[R]===2){if(_>=E)return!1}else if(A.scriptComparator[R]===3){if(_<=E)return!1}else if(A.scriptComparator[R]===4){if(_===E)return!1}else if(_!==E)return!1}return!0}drawScrollbar(A,R,_,E,I){this.imageScrollbar0?.draw(A,R),this.imageScrollbar1?.draw(A,R+I-16),k.fillRect2d(A,R+16,16,I-32,2301979);let H=(I-32)*I/E|0;if(H<8)H=8;let N=(I-H-32)*_/(E-I)|0;k.fillRect2d(A,R+N+16,16,H,5063219),k.drawVerticalLine(A,R+N+16,7759444,H),k.drawVerticalLine(A+1,R+N+16,7759444,H),k.drawHorizontalLine(A,R+N+16,7759444,16),k.drawHorizontalLine(A,R+N+17,7759444,16),k.drawVerticalLine(A+15,R+N+16,3353893,H),k.drawVerticalLine(A+14,R+N+17,3353893,H-1),k.drawHorizontalLine(A,R+N+H+15,3353893,16),k.drawHorizontalLine(A+1,R+N+H+14,3353893,15)}updateInterfaceAnimation(A,R){let _=!1,E=r.instances[A];if(!E.childId)return!1;for(let I=0;I<E.childId.length&&E.childId[I]!==-1;I++){let H=r.instances[E.childId[I]];if(H.comType===1)_||=this.updateInterfaceAnimation(H.id,R);if(H.comType===6&&(H.anim!==-1||H.activeAnim!==-1)){let N=this.executeInterfaceScript(H),O;if(N)O=H.activeAnim;else O=H.anim;if(O!==-1){let Q=c.instances[O];if(H.seqCycle+=R,Q.seqDelay)while(H.seqCycle>Q.seqDelay[H.seqFrame]){if(H.seqCycle-=Q.seqDelay[H.seqFrame]+1,H.seqFrame++,H.seqFrame>=Q.seqFrameCount){if(H.seqFrame-=Q.replayoff,H.seqFrame<0||H.seqFrame>=Q.seqFrameCount)H.seqFrame=0}_=!0}}}}return _}drawInterface(A,R,_,E,I=!1){if(A.comType!==0||!A.childId||A.hide&&this.viewportHoveredInterfaceIndex!==A.id&&this.sidebarHoveredInterfaceIndex!==A.id&&this.chatHoveredInterfaceIndex!==A.id)return;let H=k.left,N=k.top,O=k.right,Q=k.bottom;k.setBounds(R,_,R+A.width,_+A.height);let U=A.childId.length;for(let G=0;G<U;G++){if(!A.childX||!A.childY)continue;let $=A.childX[G]+R,L=A.childY[G]+_-E,J=r.instances[A.childId[G]];if($+=J.x,L+=J.y,I)k.drawRect($,L,J.width,J.height,16777215);if(J.clientCode>0)this.updateInterfaceContent(J);if(J.comType===0){if(J.scrollPosition>J.scroll-J.height)J.scrollPosition=J.scroll-J.height;if(J.scrollPosition<0)J.scrollPosition=0;if(this.drawInterface(J,$,L,J.scrollPosition,I),J.scroll>J.height)this.drawScrollbar($+J.width,L,J.scrollPosition,J.scroll,J.height)}else if(J.comType===2){let q=0;for(let V=0;V<J.height;V++)for(let B=0;B<J.width;B++){if(!J.invSlotOffsetX||!J.invSlotOffsetY||!J.invSlotObjId||!J.invSlotObjCount)continue;let F=$+B*(J.marginX+32),b=L+V*(J.marginY+32);if(q<20)F+=J.invSlotOffsetX[q],b+=J.invSlotOffsetY[q];if(J.invSlotObjId[q]>0){let T=0,j=0,w=J.invSlotObjId[q]-1;if(F>=-32&&F<=512&&b>=-32&&b<=334||this.objDragArea!==0&&this.objDragSlot===q){let Z=E0.getIcon(w,J.invSlotObjCount[q]);if(this.objDragArea!==0&&this.objDragSlot===q&&this.objDragInterfaceId===J.id){if(T=this.mouseX-this.objGrabX,j=this.mouseY-this.objGrabY,T<5&&T>-5)T=0;if(j<5&&j>-5)j=0;if(this.objDragCycles<5)T=0,j=0;Z.drawAlpha(128,F+T,b+j)}else if(this.selectedArea!==0&&this.selectedItem===q&&this.selectedInterface===J.id)Z.drawAlpha(128,F,b);else Z.draw(F,b);if(Z.cropW===33||J.invSlotObjCount[q]!==1){let W=J.invSlotObjCount[q];this.fontPlain11?.drawString(F+T+1,b+10+j,this.formatObjCount(W),0),this.fontPlain11?.drawString(F+T,b+9+j,this.formatObjCount(W),16776960)}}}else if(J.invSlotSprite&&q<20)J.invSlotSprite[q]?.draw(F,b);q++}}else if(J.comType===3)if(J.fill)k.fillRect2d($,L,J.width,J.height,J.colour);else k.drawRect($,L,J.width,J.height,J.colour);else if(J.comType===4){let{font:q,colour:V,text:B}=J;if((this.chatHoveredInterfaceIndex===J.id||this.sidebarHoveredInterfaceIndex===J.id||this.viewportHoveredInterfaceIndex===J.id)&&J.overColour!==0)V=J.overColour;if(this.executeInterfaceScript(J)){if(V=J.activeColour,J.activeText&&J.activeText.length>0)B=J.activeText}if(J.buttonType===6&&this.pressedContinueOption)B="Please wait...",V=J.colour;if(!q||!B)continue;for(let F=L+q.height2d;B.length>0;F+=q.height2d){if(B.indexOf("%")!==-1){do{let j=B.indexOf("%1");if(j===-1)break;B=B.substring(0,j)+this.getIntString(this.executeClientscript1(J,0))+B.substring(j+2)}while(!0);do{let j=B.indexOf("%2");if(j===-1)break;B=B.substring(0,j)+this.getIntString(this.executeClientscript1(J,1))+B.substring(j+2)}while(!0);do{let j=B.indexOf("%3");if(j===-1)break;B=B.substring(0,j)+this.getIntString(this.executeClientscript1(J,2))+B.substring(j+2)}while(!0);do{let j=B.indexOf("%4");if(j===-1)break;B=B.substring(0,j)+this.getIntString(this.executeClientscript1(J,3))+B.substring(j+2)}while(!0);do{let j=B.indexOf("%5");if(j===-1)break;B=B.substring(0,j)+this.getIntString(this.executeClientscript1(J,4))+B.substring(j+2)}while(!0)}let b=B.indexOf("\\n"),T;if(b!==-1)T=B.substring(0,b),B=B.substring(b+2);else T=B,B="";if(J.center)q.drawStringTaggableCenter($+(J.width/2|0),F,T,V,J.shadowed);else q.drawStringTaggable($,F,T,V,J.shadowed)}}else if(J.comType===5){let q;if(this.executeInterfaceScript(J))q=J.activeGraphic;else q=J.graphic;q?.draw($,L)}else if(J.comType===6){let q=m.centerX,V=m.centerY;m.centerX=$+(J.width/2|0),m.centerY=L+(J.height/2|0);let B=m.sin[J.xan]*J.zoom>>16,F=m.cos[J.xan]*J.zoom>>16,b=this.executeInterfaceScript(J),T;if(b)T=J.activeAnim;else T=J.anim;let j=null;if(T===-1)j=J.getModel(-1,-1,b);else{let w=c.instances[T];if(w.seqFrames&&w.seqIframes)j=J.getModel(w.seqFrames[J.seqFrame],w.seqIframes[J.seqFrame],b)}if(j)j.drawSimple(0,J.yan,0,J.xan,0,B,F);m.centerX=q,m.centerY=V}else if(J.comType===7){let q=J.font;if(!q||!J.invSlotObjId||!J.invSlotObjCount)continue;let V=0;for(let B=0;B<J.height;B++)for(let F=0;F<J.width;F++){if(J.invSlotObjId[V]>0){let b=E0.get(J.invSlotObjId[V]-1),T=b.name;if(b.stackable||J.invSlotObjCount[V]!==1)T=T+" x"+this.formatObjCountTagged(J.invSlotObjCount[V]);if(!T)continue;let j=$+F*(J.marginX+115),w=L+B*(J.marginY+12);if(J.center)q.drawStringTaggableCenter(j+(J.width/2|0),w,T,J.colour,J.shadowed);else q.drawStringTaggable(j,w,T,J.colour,J.shadowed)}V++}}}k.setBounds(H,N,O,Q)}updateInterfaceContent(A){let R=A.clientCode;if(R>=1&&R<=100)if(R--,R>=this.friendCount)A.text="",A.buttonType=0;else A.text=this.friendName[R],A.buttonType=1;else if(R>=101&&R<=200)if(R-=101,R>=this.friendCount)A.text="",A.buttonType=0;else{if(this.friendWorld[R]===0)A.text="@red@Offline";else if(this.friendWorld[R]===i.nodeId)A.text="@gre@World-"+(this.friendWorld[R]-9);else A.text="@yel@World-"+(this.friendWorld[R]-9);A.buttonType=1}else if(R===203){if(A.scroll=this.friendCount*15+20,A.scroll<=A.height)A.scroll=A.height+1}else if(R>=401&&R<=500)if(R-=401,R>=this.ignoreCount)A.text="",A.buttonType=0;else A.text=e.formatName(e.fromBase37(this.ignoreName37[R])),A.buttonType=1;else if(R===503){if(A.scroll=this.ignoreCount*15+20,A.scroll<=A.height)A.scroll=A.height+1}else if(R===327){if(A.xan=150,A.yan=(Math.sin(this.loopCycle/40)*256|0)&2047,this.updateDesignModel){this.updateDesignModel=!1;let _=new p(7,null),E=0;for(let H=0;H<7;H++){let N=this.designIdentikits[H];if(N>=0)_[E++]=X0.instances[N].getModel()}let I=K.modelFromModels(_,E);for(let H=0;H<5;H++)if(this.designColors[H]!==0){if(I.recolor(V0.DESIGN_IDK_COLORS[H][0],V0.DESIGN_IDK_COLORS[H][this.designColors[H]]),H===1)I.recolor(V0.TORSO_RECOLORS[0],V0.TORSO_RECOLORS[this.designColors[H]])}if(this.localPlayer){let H=c.instances[this.localPlayer.seqStandId].seqFrames;if(H)I.createLabelReferences(),I.applyTransform(H[0]),I.calculateNormals(64,850,-30,-50,-30,!0),A.model=I}}}else if(R===324){if(!this.genderButtonImage0)this.genderButtonImage0=A.graphic,this.genderButtonImage1=A.activeGraphic;if(this.designGenderMale)A.graphic=this.genderButtonImage1;else A.graphic=this.genderButtonImage0}else if(R===325){if(!this.genderButtonImage0)this.genderButtonImage0=A.graphic,this.genderButtonImage1=A.activeGraphic;if(this.designGenderMale)A.graphic=this.genderButtonImage0;else A.graphic=this.genderButtonImage1}else if(R===600)if(A.text=this.reportAbuseInput,this.loopCycle%20<10)A.text=A.text+"|";else A.text=A.text+" ";else if(R===613)if(!this.rights)A.text="";else if(this.reportAbuseMuteOption)A.colour=16711680,A.text="Moderator option: Mute player for 48 hours: <ON>";else A.colour=16777215,A.text="Moderator option: Mute player for 48 hours: <OFF>";else if(R===650||R===655)if(this.lastAddress===0)A.text="";else{let _;if(this.daysSinceLastLogin===0)_="earlier today";else if(this.daysSinceLastLogin===1)_="yesterday";else _=this.daysSinceLastLogin+" days ago";let E=e.formatIPv4(this.lastAddress);A.text="You last logged in "+_+(E==="127.0.0.1"?".":" from: "+E)}else if(R===651){if(this.unreadMessages===0)A.text="0 unread messages",A.colour=16776960;if(this.unreadMessages===1)A.text="1 unread message",A.colour=65280;if(this.unreadMessages>1)A.text=this.unreadMessages+" unread messages",A.colour=65280}else if(R===652)if(this.daysSinceRecoveriesChanged===201)A.text="";else if(this.daysSinceRecoveriesChanged===200)A.text="You have not yet set any password recovery questions.";else{let _;if(this.daysSinceRecoveriesChanged===0)_="Earlier today";else if(this.daysSinceRecoveriesChanged===1)_="Yesterday";else _=this.daysSinceRecoveriesChanged+" days ago";A.text=_+" you changed your recovery questions"}else if(R===653)if(this.daysSinceRecoveriesChanged===201)A.text="";else if(this.daysSinceRecoveriesChanged===200)A.text="We strongly recommend you do so now to secure your account.";else A.text="If you do not remember making this change then cancel it immediately";else if(R===654)if(this.daysSinceRecoveriesChanged===201)A.text="";else if(this.daysSinceRecoveriesChanged===200)A.text="Do this from the 'account management' area on our front webpage";else A.text="Do this from the 'account management' area on our front webpage"}executeClientscript1(A,R){if(!A.script||R>=A.script.length)return-2;try{let _=A.script[R];if(!_)return-1;let E=0,I=0;while(!0){let H=_[I++];if(H===0)return E;if(H===1)E+=this.skillLevel[_[I++]];else if(H===2)E+=this.skillBaseLevel[_[I++]];else if(H===3)E+=this.skillExperience[_[I++]];else if(H===4){let N=r.instances[_[I++]],O=_[I++]+1;if(N.invSlotObjId&&N.invSlotObjCount){for(let Q=0;Q<N.invSlotObjId.length;Q++)if(N.invSlotObjId[Q]===O)E+=N.invSlotObjCount[Q]}else E+=0}else if(H===5)E+=this.varps[_[I++]];else if(H===6)E+=this.levelExperience[this.skillBaseLevel[_[I++]]-1];else if(H===7)E+=this.varps[_[I++]]*100/46875|0;else if(H===8)E+=this.localPlayer?.combatLevel||0;else if(H===9)for(let N=0;N<19;N++){if(N===18)N=20;E+=this.skillBaseLevel[N]}else if(H===10){let N=r.instances[_[I++]],O=_[I++]+1;for(let Q=0;Q<N.invSlotObjId.length;Q++)if(N.invSlotObjId[Q]===O){E+=999999999;break}}else if(H===11)E+=this.energy;else if(H===12)E+=this.weightCarried;else if(H===13){let N=this.varps[_[I++]],O=_[I++];E+=(N&1<<O)===0?0:1}}}catch(_){return-1}}getIntString(A){return A<999999999?String(A):"*"}formatObjCountTagged(A){let R=String(A);for(let _=R.length-3;_>0;_-=3)R=R.substring(0,_)+","+R.substring(_);if(R.length>8)R="@gre@"+R.substring(0,R.length-8)+" million @whi@("+R+")";else if(R.length>4)R="@cya@"+R.substring(0,R.length-4)+"K @whi@("+R+")";return" "+R}formatObjCount(A){if(A<1e5)return String(A);else if(A<1e7)return(A/1000|0)+"K";else return(A/1e6|0)+"M"}async load(){if(this.alreadyStarted){this.errorStarted=!0;return}this.alreadyStarted=!0;try{await this.showProgress(10,"Connecting to fileserver");try{this.db=new k6(await k6.openDatabase())}catch(Y){this.db=null}let A=new s(await Y6("/crc"));for(let Y=0;Y<9;Y++)this.archiveChecksums[Y]=A.g4();if(!i.lowMemory)await this.setMidi("scape_main",12345678,40000,!1);let R=await this.loadArchive("title","title screen",this.archiveChecksums[1],10);this.titleArchive=R,this.fontPlain11=j0.fromArchive(R,"p11"),this.fontPlain12=j0.fromArchive(R,"p12"),this.fontBold12=j0.fromArchive(R,"b12"),this.fontQuill8=j0.fromArchive(R,"q8"),await this.loadTitleBackground(),this.loadTitleImages();let _=await this.loadArchive("config","config",this.archiveChecksums[2],15),E=await this.loadArchive("interface","interface",this.archiveChecksums[3],20),I=await this.loadArchive("media","2d graphics",this.archiveChecksums[4],30),H=await this.loadArchive("models","3d graphics",this.archiveChecksums[5],40),N=await this.loadArchive("textures","textures",this.archiveChecksums[6],60),O=await this.loadArchive("wordenc","chat system",this.archiveChecksums[7],65),Q=await this.loadArchive("sounds","sound effects",this.archiveChecksums[8],70);if(this.levelTileFlags=new r0(4,104,104),this.levelHeightmap=new d0(4,104+1,104+1),this.levelHeightmap)this.scene=new S(this.levelHeightmap,104,4,104);for(let Y=0;Y<4;Y++)this.levelCollisionMap[Y]=new R0;this.imageMinimap=new _0(512,512),await this.showProgress(75,"Unpacking media"),this.imageInvback=$0.fromArchive(I,"invback",0),this.imageChatback=$0.fromArchive(I,"chatback",0),this.imageMapback=$0.fromArchive(I,"mapback",0),this.imageBackbase1=$0.fromArchive(I,"backbase1",0),this.imageBackbase2=$0.fromArchive(I,"backbase2",0),this.imageBackhmid1=$0.fromArchive(I,"backhmid1",0);for(let Y=0;Y<13;Y++)this.imageSideicons[Y]=$0.fromArchive(I,"sideicons",Y);this.imageCompass=_0.fromArchive(I,"compass",0);try{for(let Y=0;Y<50;Y++){if(Y===22)continue;this.imageMapscene[Y]=$0.fromArchive(I,"mapscene",Y)}}catch(Y){}try{for(let Y=0;Y<50;Y++)this.imageMapfunction[Y]=_0.fromArchive(I,"mapfunction",Y)}catch(Y){}try{for(let Y=0;Y<20;Y++)this.imageHitmarks[Y]=_0.fromArchive(I,"hitmarks",Y)}catch(Y){}try{for(let Y=0;Y<20;Y++)this.imageHeadicons[Y]=_0.fromArchive(I,"headicons",Y)}catch(Y){}this.imageMapflag=_0.fromArchive(I,"mapflag",0);for(let Y=0;Y<8;Y++)this.imageCrosses[Y]=_0.fromArchive(I,"cross",Y);this.imageMapdot0=_0.fromArchive(I,"mapdots",0),this.imageMapdot1=_0.fromArchive(I,"mapdots",1),this.imageMapdot2=_0.fromArchive(I,"mapdots",2),this.imageMapdot3=_0.fromArchive(I,"mapdots",3),this.imageScrollbar0=$0.fromArchive(I,"scrollbar",0),this.imageScrollbar1=$0.fromArchive(I,"scrollbar",1),this.imageRedstone1=$0.fromArchive(I,"redstone1",0),this.imageRedstone2=$0.fromArchive(I,"redstone2",0),this.imageRedstone3=$0.fromArchive(I,"redstone3",0),this.imageRedstone1h=$0.fromArchive(I,"redstone1",0),this.imageRedstone1h?.flipHorizontally(),this.imageRedstone2h=$0.fromArchive(I,"redstone2",0),this.imageRedstone2h?.flipHorizontally(),this.imageRedstone1v=$0.fromArchive(I,"redstone1",0),this.imageRedstone1v?.flipVertically(),this.imageRedstone2v=$0.fromArchive(I,"redstone2",0),this.imageRedstone2v?.flipVertically(),this.imageRedstone3v=$0.fromArchive(I,"redstone3",0),this.imageRedstone3v?.flipVertically(),this.imageRedstone1hv=$0.fromArchive(I,"redstone1",0),this.imageRedstone1hv?.flipHorizontally(),this.imageRedstone1hv?.flipVertically(),this.imageRedstone2hv=$0.fromArchive(I,"redstone2",0),this.imageRedstone2hv?.flipHorizontally(),this.imageRedstone2hv?.flipVertically();let U=_0.fromArchive(I,"backleft1",0);this.areaBackleft1=new O0(U.width2d,U.height2d),U.blitOpaque(0,0);let G=_0.fromArchive(I,"backleft2",0);this.areaBackleft2=new O0(G.width2d,G.height2d),G.blitOpaque(0,0);let $=_0.fromArchive(I,"backright1",0);this.areaBackright1=new O0($.width2d,$.height2d),$.blitOpaque(0,0);let L=_0.fromArchive(I,"backright2",0);this.areaBackright2=new O0(L.width2d,L.height2d),L.blitOpaque(0,0);let J=_0.fromArchive(I,"backtop1",0);this.areaBacktop1=new O0(J.width2d,J.height2d),J.blitOpaque(0,0);let q=_0.fromArchive(I,"backtop2",0);this.areaBacktop2=new O0(q.width2d,q.height2d),q.blitOpaque(0,0);let V=_0.fromArchive(I,"backvmid1",0);this.areaBackvmid1=new O0(V.width2d,V.height2d),V.blitOpaque(0,0);let B=_0.fromArchive(I,"backvmid2",0);this.areaBackvmid2=new O0(B.width2d,B.height2d),B.blitOpaque(0,0);let F=_0.fromArchive(I,"backvmid3",0);this.areaBackvmid3=new O0(F.width2d,F.height2d),F.blitOpaque(0,0);let b=_0.fromArchive(I,"backhmid2",0);this.areaBackhmid2=new O0(b.width2d,b.height2d),b.blitOpaque(0,0);let T=(Math.random()*21|0)-10,j=(Math.random()*21|0)-10,w=(Math.random()*21|0)-10,Z=(Math.random()*41|0)-20;for(let Y=0;Y<50;Y++){if(this.imageMapfunction[Y])this.imageMapfunction[Y]?.translate2d(T+Z,j+Z,w+Z);if(this.imageMapscene[Y])this.imageMapscene[Y]?.translate2d(T+Z,j+Z,w+Z)}if(await this.showProgress(80,"Unpacking textures"),m.unpackTextures(N),m.setBrightness(0.8),m.initPool(20),await this.showProgress(83,"Unpacking models"),K.unpack(H),t0.unpack(H),W0.unpack(H),await this.showProgress(86,"Unpacking config"),c.unpack(_),J0.unpack(_),U0.unpack(_),E0.unpack(_,i.members),f0.unpack(_),X0.unpack(_),T0.unpack(_),p0.unpack(_),!i.lowMemory)await this.showProgress(90,"Unpacking sounds"),I0.unpack(Q);await this.showProgress(92,"Unpacking interfaces"),r.unpack(E,I,[this.fontPlain11,this.fontPlain12,this.fontBold12,this.fontQuill8]),await this.showProgress(97,"Preparing game engine");for(let Y=0;Y<33;Y++){let u=999,h=0;for(let n=0;n<35;n++)if(this.imageMapback.pixels[n+Y*this.imageMapback.width2d]===0){if(u===999)u=n}else if(u!==999){h=n;break}this.compassMaskLineOffsets[Y]=u,this.compassMaskLineLengths[Y]=h-u}for(let Y=9;Y<160;Y++){let u=999,h=0;for(let n=10;n<168;n++)if(this.imageMapback.pixels[n+Y*this.imageMapback.width2d]===0&&(n>34||Y>34)){if(u===999)u=n}else if(u!==999){h=n;break}this.minimapMaskLineOffsets[Y-9]=u-21,this.minimapMaskLineLengths[Y-9]=h-u}m.init3D(479,96),this.areaChatbackOffsets=m.lineOffset,m.init3D(190,261),this.areaSidebarOffsets=m.lineOffset,m.init3D(512,334),this.areaViewportOffsets=m.lineOffset;let W=new Int32Array(9);for(let Y=0;Y<9;Y++){let u=Y*32+128+15,h=u*3+600,n=m.sin[u];W[Y]=h*n>>16}S.init(512,334,500,800,W),y0.unpack(O),this.initializeLevelExperience()}catch(A){if(this.errorLoading=!0,A instanceof Error)this.errorMessage=A.message}try{if(l0.hasWebGPUSupport())C.renderer=await l0.init(C0,this.width,this.height);if(!C.renderer)C.renderer=z.init(C0,this.width,this.height)}catch(A){}}async update(){if(this.errorStarted||this.errorLoading||this.errorHost)return;if(this.loopCycle++,this.ingame)await this.updateGame();else await this.updateTitleScreen()}async draw(){if(this.errorStarted||this.errorLoading||this.errorHost){this.drawError();return}if(C.startFrame(),this.ingame)this.drawGame();else await this.drawTitleScreen();C.endFrame(),this.dragCycles=0}async refresh(){this.redrawTitleBackground=!0}async showProgress(A,R){if(await this.loadTitle(),!this.titleArchive){await super.showProgress(A,R);return}this.imageTitle4?.bind();let _=360,E=200,I=20;this.fontBold12?.drawStringCenter(_/2|0,(E/2|0)-I-26,"RuneScape is loading - please wait...",16777215);let H=(E/2|0)-18-I;if(k.drawRect((_/2|0)-152,H,304,34,9179409),k.drawRect((_/2|0)-151,H+1,302,32,0),k.fillRect2d((_/2|0)-150,H+2,A*3,30,9179409),k.fillRect2d((_/2|0)-150+A*3,H+2,300-A*3,30,0),this.fontBold12?.drawStringCenter(_/2|0,(E/2|0)+5-I,R,16777215),this.imageTitle4?.draw(214,186),this.redrawTitleBackground){if(this.redrawTitleBackground=!1,!this.flameActive)this.imageTitle0?.draw(0,0),this.imageTitle1?.draw(661,0);this.imageTitle2?.draw(128,0),this.imageTitle3?.draw(214,386),this.imageTitle5?.draw(0,265),this.imageTitle6?.draw(574,265),this.imageTitle7?.draw(128,186),this.imageTitle8?.draw(574,186)}await A6(5)}runFlames(){if(!this.flameActive)return;this.updateFlames(),this.updateFlames(),this.drawFlames()}async loadTitle(){if(!this.imageTitle2){if(this.drawArea=null,this.areaChatback=null,this.areaMapback=null,this.areaSidebar=null,this.areaViewport=null,this.areaBackbase1=null,this.areaBackbase2=null,this.areaBackhmid1=null,this.imageTitle0=new O0(128,265),k.clear(),this.imageTitle1=new O0(128,265),k.clear(),this.imageTitle2=new O0(533,186),k.clear(),this.imageTitle3=new O0(360,146),k.clear(),this.imageTitle4=new O0(360,200),k.clear(),this.imageTitle5=new O0(214,267),k.clear(),this.imageTitle6=new O0(215,267),k.clear(),this.imageTitle7=new O0(86,79),k.clear(),this.imageTitle8=new O0(87,79),k.clear(),this.titleArchive)await this.loadTitleBackground(),this.loadTitleImages();this.redrawTitleBackground=!0}}async loadTitleBackground(){if(!this.titleArchive)return;let A=await _0.fromJpeg(this.titleArchive,"title");this.imageTitle0?.bind(),A.blitOpaque(0,0),this.imageTitle1?.bind(),A.blitOpaque(-661,0),this.imageTitle2?.bind(),A.blitOpaque(-128,0),this.imageTitle3?.bind(),A.blitOpaque(-214,-386),this.imageTitle4?.bind(),A.blitOpaque(-214,-186),this.imageTitle5?.bind(),A.blitOpaque(0,-265),this.imageTitle6?.bind(),A.blitOpaque(-128,-186),this.imageTitle7?.bind(),A.blitOpaque(-128,-186),this.imageTitle8?.bind(),A.blitOpaque(-574,-186),A.flipHorizontally(),this.imageTitle0?.bind(),A.blitOpaque(394,0),this.imageTitle1?.bind(),A.blitOpaque(-267,0),this.imageTitle2?.bind(),A.blitOpaque(266,0),this.imageTitle3?.bind(),A.blitOpaque(180,-386),this.imageTitle4?.bind(),A.blitOpaque(180,-186),this.imageTitle5?.bind(),A.blitOpaque(394,-265),this.imageTitle6?.bind(),A.blitOpaque(-180,-265),this.imageTitle7?.bind(),A.blitOpaque(212,-186),this.imageTitle8?.bind(),A.blitOpaque(-180,-186);let R=_0.fromArchive(this.titleArchive,"logo");this.imageTitle2?.bind(),R.draw((this.width/2|0)-(R.width2d/2|0)-128,18)}updateFlameBuffer(A){if(!this.flameBuffer0||!this.flameBuffer1)return;let R=256;this.flameBuffer0.fill(0);for(let _=0;_<5000;_++){let E=Math.random()*128*R|0;this.flameBuffer0[E]=Math.random()*256|0}for(let _=0;_<20;_++){for(let I=1;I<R-1;I++)for(let H=1;H<127;H++){let N=H+(I<<7);this.flameBuffer1[N]=(this.flameBuffer0[N-1]+this.flameBuffer0[N+1]+this.flameBuffer0[N-128]+this.flameBuffer0[N+128])/4|0}let E=this.flameBuffer0;this.flameBuffer0=this.flameBuffer1,this.flameBuffer1=E}if(A){let _=0;for(let E=0;E<A.height2d;E++)for(let I=0;I<A.width2d;I++)if(A.pixels[_++]!==0){let H=I+A.cropX+16,N=E+A.cropY+16,O=H+(N<<7);this.flameBuffer0[O]=0}}}loadTitleImages(){if(!this.titleArchive)return;this.imageTitlebox=$0.fromArchive(this.titleArchive,"titlebox"),this.imageTitlebutton=$0.fromArchive(this.titleArchive,"titlebutton");for(let A=0;A<12;A++)this.imageRunes[A]=$0.fromArchive(this.titleArchive,"runes",A);if(this.imageFlamesLeft=new _0(128,265),this.imageFlamesRight=new _0(128,265),this.imageTitle0)R1(this.imageTitle0.pixels,0,this.imageFlamesLeft.pixels,0,33920);if(this.imageTitle1)R1(this.imageTitle1.pixels,0,this.imageFlamesRight.pixels,0,33920);this.flameGradient0=new Int32Array(256);for(let A=0;A<64;A++)this.flameGradient0[A]=A*262144;for(let A=0;A<64;A++)this.flameGradient0[A+64]=A*1024+16711680;for(let A=0;A<64;A++)this.flameGradient0[A+128]=A*4+16776960;for(let A=0;A<64;A++)this.flameGradient0[A+192]=16777215;this.flameGradient1=new Int32Array(256);for(let A=0;A<64;A++)this.flameGradient1[A]=A*1024;for(let A=0;A<64;A++)this.flameGradient1[A+64]=A*4+65280;for(let A=0;A<64;A++)this.flameGradient1[A+128]=A*262144+65535;for(let A=0;A<64;A++)this.flameGradient1[A+192]=16777215;this.flameGradient2=new Int32Array(256);for(let A=0;A<64;A++)this.flameGradient2[A]=A*4;for(let A=0;A<64;A++)this.flameGradient2[A+64]=A*262144+255;for(let A=0;A<64;A++)this.flameGradient2[A+128]=A*1024+16711935;for(let A=0;A<64;A++)this.flameGradient2[A+192]=16777215;this.flameGradient=new Int32Array(256),this.flameBuffer0=new Int32Array(32768),this.flameBuffer1=new Int32Array(32768),this.updateFlameBuffer(null),this.flameBuffer3=new Int32Array(32768),this.flameBuffer2=new Int32Array(32768),this.showProgress(10,"Connecting to fileserver").then(()=>{if(!this.flameActive)this.flameActive=!0,this.flamesInterval=setInterval(this.runFlames.bind(this),35)})}async updateTitleScreen(){if(this.titleScreenState===0){let A=(this.width/2|0)-80,R=(this.height/2|0)+20;if(R+=20,this.mouseClickButton===1&&this.mouseClickX>=A-75&&this.mouseClickX<=A+75&&this.mouseClickY>=R-20&&this.mouseClickY<=R+20)this.titleScreenState=3,this.titleLoginField=0;if(A=(this.width/2|0)+80,this.mouseClickButton===1&&this.mouseClickX>=A-75&&this.mouseClickX<=A+75&&this.mouseClickY>=R-20&&this.mouseClickY<=R+20)this.loginMessage0="",this.loginMessage1="Enter your username & password.",this.titleScreenState=2,this.titleLoginField=0}else if(this.titleScreenState===2){let A=(this.height/2|0)-40;if(A+=30,A+=25,this.mouseClickButton===1&&this.mouseClickY>=A-15&&this.mouseClickY<A)this.titleLoginField=0;if(A+=15,this.mouseClickButton===1&&this.mouseClickY>=A-15&&this.mouseClickY<A)this.titleLoginField=1;let R=(this.width/2|0)-80,_=(this.height/2|0)+50;if(_+=20,this.mouseClickButton===1&&this.mouseClickX>=R-75&&this.mouseClickX<=R+75&&this.mouseClickY>=_-20&&this.mouseClickY<=_+20)await this.tryLogin(this.usernameInput,this.passwordInput,!1);if(R=(this.width/2|0)+80,this.mouseClickButton===1&&this.mouseClickX>=R-75&&this.mouseClickX<=R+75&&this.mouseClickY>=_-20&&this.mouseClickY<=_+20)this.titleScreenState=0,this.usernameInput="",this.passwordInput="";while(!0){let E=this.pollKey();if(E===-1)return;let I=!1;for(let H=0;H<j0.CHARSET.length;H++)if(String.fromCharCode(E)===j0.CHARSET.charAt(H)){I=!0;break}if(this.titleLoginField===0){if(E===8&&this.usernameInput.length>0)this.usernameInput=this.usernameInput.substring(0,this.usernameInput.length-1);if(E===9||E===10||E===13)this.titleLoginField=1;if(I)this.usernameInput=this.usernameInput+String.fromCharCode(E);if(this.usernameInput.length>12)this.usernameInput=this.usernameInput.substring(0,12)}else if(this.titleLoginField===1){if(E===8&&this.passwordInput.length>0)this.passwordInput=this.passwordInput.substring(0,this.passwordInput.length-1);if(E===9||E===10||E===13)this.titleLoginField=0;if(I)this.passwordInput=this.passwordInput+String.fromCharCode(E);if(this.passwordInput.length>20)this.passwordInput=this.passwordInput.substring(0,20)}}}else if(this.titleScreenState===3){let A=this.width/2|0,R=(this.height/2|0)+50;if(R+=20,this.mouseClickButton===1&&this.mouseClickX>=A-75&&this.mouseClickX<=A+75&&this.mouseClickY>=R-20&&this.mouseClickY<=R+20)this.titleScreenState=0}}async drawTitleScreen(){await this.loadTitle(),this.imageTitle4?.bind(),this.imageTitlebox?.draw(0,0);let A=360,R=200;if(this.titleScreenState===0){let _=A/2|0,E=(R/2|0)-20;this.fontBold12?.drawStringTaggableCenter(_,E,"Welcome to RuneScape",16776960,!0),_=(A/2|0)-80,E=(R/2|0)+20,this.imageTitlebutton?.draw(_-73,E-20),this.fontBold12?.drawStringTaggableCenter(_,E+5,"New user",16777215,!0),_=(A/2|0)+80,this.imageTitlebutton?.draw(_-73,E-20),this.fontBold12?.drawStringTaggableCenter(_,E+5,"Existing User",16777215,!0)}else if(this.titleScreenState===2){let _=(A/2|0)-80,E=(R/2|0)-40;if(this.loginMessage0.length>0)this.fontBold12?.drawStringTaggableCenter(A/2,E-15,this.loginMessage0,16776960,!0),this.fontBold12?.drawStringTaggableCenter(A/2,E,this.loginMessage1,16776960,!0),E+=30;else this.fontBold12?.drawStringTaggableCenter(A/2,E-7,this.loginMessage1,16776960,!0),E+=30;this.fontBold12?.drawStringTaggable(A/2-90,E,`Username: ${this.usernameInput}${this.titleLoginField===0&&this.loopCycle%40<20?"@yel@|":""}`,16777215,!0),E+=15,this.fontBold12?.drawStringTaggable(A/2-88,E,`Password: ${e.toAsterisks(this.passwordInput)}${this.titleLoginField===1&&this.loopCycle%40<20?"@yel@|":""}`,16777215,!0),E=(R/2|0)+50,this.imageTitlebutton?.draw(_-73,E-20),this.fontBold12?.drawStringTaggableCenter(_,E+5,"Login",16777215,!0),_=(A/2|0)+80,this.imageTitlebutton?.draw(_-73,E-20),this.fontBold12?.drawStringTaggableCenter(_,E+5,"Cancel",16777215,!0)}else if(this.titleScreenState===3){this.fontBold12?.drawStringTaggableCenter(A/2,R/2-60,"Create a free account",16776960,!0);let _=A/2|0,E=(R/2|0)-35;this.fontBold12?.drawStringTaggableCenter(A/2|0,E,"To create a new account you need to",16777215,!0),E+=15,this.fontBold12?.drawStringTaggableCenter(A/2|0,E,"go back to the main RuneScape webpage",16777215,!0),E+=15,this.fontBold12?.drawStringTaggableCenter(A/2|0,E,"and choose the red 'create account'",16777215,!0),E+=15,this.fontBold12?.drawStringTaggableCenter(A/2|0,E,"button at the top right of that page.",16777215,!0),E=(R/2|0)+50,this.imageTitlebutton?.draw(_-73,E-20),this.fontBold12?.drawStringTaggableCenter(_,E+5,"Cancel",16777215,!0)}if(this.imageTitle4?.draw(214,186),this.redrawTitleBackground)this.redrawTitleBackground=!1,this.imageTitle2?.draw(128,0),this.imageTitle3?.draw(214,386),this.imageTitle5?.draw(0,265),this.imageTitle6?.draw(574,265),this.imageTitle7?.draw(128,186),this.imageTitle8?.draw(574,186)}async tryLogin(A,R,_){try{if(!_)this.loginMessage0="",this.loginMessage1="Connecting to server...",await this.drawTitleScreen();this.netStream=new V6(await V6.openSocket(window.location.host,window.location.protocol==="https:")),await this.netStream.readBytes(this.in.data,0,8),this.in.pos=0,this.serverSeed=this.in.g8();let E=new Int32Array([Math.floor(Math.random()*99999999),Math.floor(Math.random()*99999999),Number(this.serverSeed>>32n),Number(this.serverSeed&BigInt(4294967295))]);if(this.out.pos=0,this.out.p1(10),this.out.p4(E[0]),this.out.p4(E[1]),this.out.p4(E[2]),this.out.p4(E[3]),this.out.p4(1337),this.out.pjstr(A),this.out.pjstr(R),this.out.rsaenc(BigInt("7162900525229798032761816791230527296329313291232324290237849263501208207972894053929065636522363163621000728841182238772712427862772219676577293600221789"),BigInt("58778699976184461502525193738213253649000149147835990136706041084440742975821")),this.loginout.pos=0,_)this.loginout.p1(18);else this.loginout.p1(16);this.loginout.p1(this.out.pos+36+1+1),this.loginout.p1(225),this.loginout.p1(i.lowMemory?1:0);for(let H=0;H<9;H++)this.loginout.p4(this.archiveChecksums[H]);this.loginout.pdata(this.out.data,this.out.pos,0),this.out.random=new S6(E);for(let H=0;H<4;H++)E[H]+=50;this.randomIn=new S6(E),this.netStream?.write(this.loginout.data,this.loginout.pos);let I=await this.netStream.read();if(I===1){await A6(2000),await this.tryLogin(A,R,_);return}if(I===2||I===18){this.rights=I===18,q0.setDisabled(),this.ingame=!0,this.out.pos=0,this.in.pos=0,this.inPacketType=-1,this.lastPacketType0=-1,this.lastPacketType1=-1,this.lastPacketType2=-1,this.inPacketSize=0,this.idleNetCycles=0,this.systemUpdateTimer=0,this.idleTimeout=0,this.hintType=0,this.menuSize=0,this.menuVisible=!1,this.idleCycles=performance.now();for(let H=0;H<100;H++)this.messageText[H]=null;this.objSelected=0,this.spellSelected=0,this.sceneState=0,this.waveCount=0,this.cameraAnticheatOffsetX=(Math.random()*100|0)-50,this.cameraAnticheatOffsetZ=(Math.random()*110|0)-55,this.cameraAnticheatAngle=(Math.random()*80|0)-40,this.minimapAnticheatAngle=(Math.random()*120|0)-60,this.minimapZoom=(Math.random()*30|0)-20,this.orbitCameraYaw=(Math.random()*20|0)-10&2047,this.minimapLevel=-1,this.flagSceneTileX=0,this.flagSceneTileZ=0,this.playerCount=0,this.npcCount=0;for(let H=0;H<2048;H++)this.players[H]=null,this.playerAppearanceBuffer[H]=null;for(let H=0;H<8192;H++)this.npcs[H]=null;this.localPlayer=this.players[2047]=new V0,this.projectiles.clear(),this.spotanims.clear();for(let H=0;H<4;H++)for(let N=0;N<104;N++)for(let O=0;O<104;O++)this.objStacks[H][N][O]=null;this.addedLocs=new m0,this.friendCount=0,this.stickyChatInterfaceId=-1,this.chatInterfaceId=-1,this.viewportInterfaceId=-1,this.sidebarInterfaceId=-1,this.pressedContinueOption=!1,this.selectedTab=3,this.chatbackInputOpen=!1,this.menuVisible=!1,this.showSocialInput=!1,this.modalMessage=null,this.inMultizone=0,this.flashingTab=-1,this.designGenderMale=!0,this.validateCharacterDesign();for(let H=0;H<5;H++)this.designColors[H]=0;i.oplogic1=0,i.oplogic2=0,i.oplogic3=0,i.oplogic4=0,i.oplogic5=0,i.oplogic6=0,i.oplogic7=0,i.oplogic8=0,i.oplogic9=0,this.prepareGameScreen();return}if(I===3){this.loginMessage0="",this.loginMessage1="Invalid username or password.";return}if(I===4){this.loginMessage0="Your account has been disabled.",this.loginMessage1="Please check your message-centre for details.";return}if(I===5){this.loginMessage0="Your account is already logged in.",this.loginMessage1="Try again in 60 secs...";return}if(I===6){this.loginMessage0="RuneScape has been updated!",this.loginMessage1="Please reload this page.";return}if(I===7){this.loginMessage0="This world is full.",this.loginMessage1="Please use a different world.";return}if(I===8){this.loginMessage0="Unable to connect.",this.loginMessage1="Login server offline.";return}if(I===9){this.loginMessage0="Login limit exceeded.",this.loginMessage1="Too many connections from your address.";return}if(I===10){this.loginMessage0="Unable to connect.",this.loginMessage1="Bad session id.";return}if(I===11){this.loginMessage1="Login server rejected session.",this.loginMessage1="Please try again.";return}if(I===12){this.loginMessage0="You need a members account to login to this world.",this.loginMessage1="Please subscribe, or use a different world.";return}if(I===13){this.loginMessage0="Could not complete login.",this.loginMessage1="Please try using a different world.";return}if(I===14){this.loginMessage0="The server is being updated.",this.loginMessage1="Please wait 1 minute and try again.";return}if(I===15){this.ingame=!0,this.out.pos=0,this.in.pos=0,this.inPacketType=-1,this.lastPacketType0=-1,this.lastPacketType1=-1,this.lastPacketType2=-1,this.inPacketSize=0,this.idleNetCycles=0,this.systemUpdateTimer=0,this.menuSize=0,this.menuVisible=!1;return}if(I===16){this.loginMessage0="Login attempts exceeded.",this.loginMessage1="Please wait 1 minute and try again.";return}if(I===17)this.loginMessage0="You are standing in a members-only area.",this.loginMessage1="To play on this world move to a free area first"}catch(E){this.loginMessage0="",this.loginMessage1="Error connecting to server."}}async updateGame(){if(this.players===null)return;if(this.systemUpdateTimer>1)this.systemUpdateTimer--;if(this.idleTimeout>0)this.idleTimeout--;for(let A=0;A<5&&await this.read();A++);if(this.ingame){for(let R=0;R<this.waveCount;R++)if(this.waveDelay[R]<=0){try{let _=I0.generate(this.waveIds[R],this.waveLoops[R]);if(!_)throw new Error;if(performance.now()+(_.pos/22|0)>this.lastWaveStartTime+(this.lastWaveLength/22|0))this.lastWaveLength=_.pos,this.lastWaveStartTime=performance.now(),this.lastWaveId=this.waveIds[R],this.lastWaveLoops=this.waveLoops[R],await b7(_.data.slice(0,_.pos))}catch(_){}this.waveCount--;for(let _=R;_<this.waveCount;_++)this.waveIds[_]=this.waveIds[_+1],this.waveLoops[_]=this.waveLoops[_+1],this.waveDelay[_]=this.waveDelay[_+1];R--}else this.waveDelay[R]--;if(this.nextMusicDelay>0){if(this.nextMusicDelay-=20,this.nextMusicDelay<0)this.nextMusicDelay=0;if(this.nextMusicDelay===0&&this.midiActive&&!i.lowMemory&&this.currentMidi)await this.setMidi(this.currentMidi,this.midiCrc,this.midiSize,!1)}let A=q0.flush();if(A)this.out.p1isaac(81),this.out.p2(A.pos),this.out.pdata(A.data,A.pos,0),A.release();if(this.updateSceneState(),this.updateAddedLocs(),this.idleNetCycles++,this.idleNetCycles>250)await this.tryReconnect();if(this.updatePlayers(),this.updateNpcs(),this.updateEntityChats(),(this.actionKey[1]===1||this.actionKey[2]===1||this.actionKey[3]===1||this.actionKey[4]===1)&&this.cameraMovedWrite++>5)this.cameraMovedWrite=0,this.out.p1isaac(189),this.out.p2(this.orbitCameraPitch),this.out.p2(this.orbitCameraYaw),this.out.p1(this.minimapAnticheatAngle),this.out.p1(this.minimapZoom);if(this.sceneDelta++,this.crossMode!==0){if(this.crossCycle+=20,this.crossCycle>=400)this.crossMode=0}if(this.selectedArea!==0){if(this.selectedCycle++,this.selectedCycle>=15){if(this.selectedArea===2)this.redrawSidebar=!0;if(this.selectedArea===3)this.redrawChatback=!0;this.selectedArea=0}}if(this.objDragArea!==0){if(this.objDragCycles++,this.mouseX>this.objGrabX+5||this.mouseX<this.objGrabX-5||this.mouseY>this.objGrabY+5||this.mouseY<this.objGrabY-5)this.objGrabThreshold=!0;if(this.mouseButton===0){if(this.objDragArea===2)this.redrawSidebar=!0;if(this.objDragArea===3)this.redrawChatback=!0;if(this.objDragArea=0,this.objGrabThreshold&&this.objDragCycles>=5){if(this.hoveredSlotParentId=-1,this.handleInput(),this.hoveredSlotParentId===this.objDragInterfaceId&&this.hoveredSlot!==this.objDragSlot){let R=r.instances[this.objDragInterfaceId];if(R.invSlotObjId){let _=R.invSlotObjId[this.hoveredSlot];R.invSlotObjId[this.hoveredSlot]=R.invSlotObjId[this.objDragSlot],R.invSlotObjId[this.objDragSlot]=_}if(R.invSlotObjCount){let _=R.invSlotObjCount[this.hoveredSlot];R.invSlotObjCount[this.hoveredSlot]=R.invSlotObjCount[this.objDragSlot],R.invSlotObjCount[this.objDragSlot]=_}this.out.p1isaac(159),this.out.p2(this.objDragInterfaceId),this.out.p2(this.objDragSlot),this.out.p2(this.hoveredSlot)}}else if((this.mouseButtonsOption===1||this.isAddFriendOption(this.menuSize-1))&&this.menuSize>2)this.showContextMenu();else if(this.menuSize>0)await this.useMenuOption(this.menuSize-1);this.selectedCycle=10,this.mouseClickButton=0}}if(i.cyclelogic3++,i.cyclelogic3>127)i.cyclelogic3=0,this.out.p1isaac(215),this.out.p3(4991788);if(S.clickTileX!==-1){if(this.localPlayer){let R=S.clickTileX,_=S.clickTileZ,E=this.tryMove(this.localPlayer.routeFlagX[0],this.localPlayer.routeFlagZ[0],R,_,0,0,0,0,0,0,!0);if(S.clickTileX=-1,E)this.crossX=this.mouseClickX,this.crossY=this.mouseClickY,this.crossMode=1,this.crossCycle=0}}if(this.mouseClickButton===1&&this.modalMessage)this.modalMessage=null,this.redrawChatback=!0,this.mouseClickButton=0;if(await this.handleMouseInput(),this.handleMinimapInput(),this.handleTabInput(),this.handleChatSettingsInput(),this.mouseButton===1||this.mouseClickButton===1)this.dragCycles++;if(this.sceneState===2)this.updateOrbitCamera();if(this.sceneState===2&&this.cutscene)this.applyCutscene();for(let R=0;R<5;R++)this.cameraModifierCycle[R]++;if(await this.handleInputKey(),performance.now()-this.idleCycles>90000)this.idleTimeout=250,this.idleCycles=performance.now()-1e4,this.out.p1isaac(70);if(this.cameraOffsetCycle++,this.cameraOffsetCycle>500){this.cameraOffsetCycle=0;let R=Math.random()*8|0;if((R&1)===1)this.cameraAnticheatOffsetX+=this.cameraOffsetXModifier;if((R&2)===2)this.cameraAnticheatOffsetZ+=this.cameraOffsetZModifier;if((R&4)===4)this.cameraAnticheatAngle+=this.cameraOffsetYawModifier}if(this.cameraAnticheatOffsetX<-50)this.cameraOffsetXModifier=2;if(this.cameraAnticheatOffsetX>50)this.cameraOffsetXModifier=-2;if(this.cameraAnticheatOffsetZ<-55)this.cameraOffsetZModifier=2;if(this.cameraAnticheatOffsetZ>55)this.cameraOffsetZModifier=-2;if(this.cameraAnticheatAngle<-40)this.cameraOffsetYawModifier=1;if(this.cameraAnticheatAngle>40)this.cameraOffsetYawModifier=-1;if(this.minimapOffsetCycle++,this.minimapOffsetCycle>500){this.minimapOffsetCycle=0;let R=Math.random()*8|0;if((R&1)===1)this.minimapAnticheatAngle+=this.minimapAngleModifier;if((R&2)===2)this.minimapZoom+=this.minimapZoomModifier}if(this.minimapAnticheatAngle<-60)this.minimapAngleModifier=2;if(this.minimapAnticheatAngle>60)this.minimapAngleModifier=-2;if(this.minimapZoom<-20)this.minimapZoomModifier=1;if(this.minimapZoom>10)this.minimapZoomModifier=-1;if(i.cyclelogic4++,i.cyclelogic4>110)i.cyclelogic4=0,this.out.p1isaac(236),this.out.p4(0);if(this.heartbeatTimer++,this.heartbeatTimer>50)this.out.p1isaac(108);try{if(this.netStream&&this.out.pos>0)this.netStream.write(this.out.data,this.out.pos),this.out.pos=0,this.heartbeatTimer=0}catch(R){await this.tryReconnect()}}}updateSceneState(){if(i.lowMemory&&this.sceneState===2&&l.levelBuilt!==this.currentLevel)this.areaViewport?.bind(),this.fontPlain12?.drawStringCenter(257,151,"Loading - please wait.",0),this.fontPlain12?.drawStringCenter(256,150,"Loading - please wait.",16777215),this.areaViewport?.draw(8,11),this.sceneState=1;if(this.sceneState===1)this.checkScene();if(this.sceneState===2&&this.currentLevel!==this.minimapLevel)this.minimapLevel=this.currentLevel,this.createMinimap(this.currentLevel)}checkScene(){if(!this.sceneMapLandData||!this.sceneMapLandReady||!this.sceneMapLocData||!this.sceneMapLocReady)return-1000;for(let A=0;A<this.sceneMapLandReady.length;A++){if(this.sceneMapLandReady[A]===!1)return-1;if(this.sceneMapLocReady[A]===!1)return-2}if(this.sceneAwaitingSync)return-3;return this.sceneState=2,l.levelBuilt=this.currentLevel,this.buildScene(),0}updateAddedLocs(){if(this.sceneState!==2)return;for(let A=this.addedLocs.head();A;A=this.addedLocs.next()){if(A.duration>0)A.duration--;if(A.duration!=0){if(A.delay>0)A.delay--;if(A.delay===0&&A.x>=1&&A.z>=1&&A.x<=102&&A.z<=102){if(this.addLoc(A.plane,A.x,A.z,A.locIndex,A.locAngle,A.shape,A.layer),A.delay=-1,A.lastLocIndex===A.locIndex&&A.lastLocIndex===-1)A.unlink();else if(A.lastLocIndex===A.locIndex&&A.lastAngle===A.locAngle&&A.lastShape===A.shape)A.unlink()}}else this.addLoc(A.plane,A.x,A.z,A.lastLocIndex,A.lastAngle,A.lastShape,A.layer),A.unlink()}if(i.cyclelogic5++,i.cyclelogic5>85)i.cyclelogic5=0,this.out.p1isaac(85)}clearAddedLocs(){for(let A=this.addedLocs.head();A;A=this.addedLocs.next())if(A.duration===-1)A.delay=0,this.storeLoc(A);else A.unlink()}appendLoc(A,R,_,E,I,H,N,O,Q){let U=null;for(let G=this.addedLocs.head();G;G=this.addedLocs.next())if(G.plane===this.currentLevel&&G.x===O&&G.z===I&&G.layer===E){U=G;break}if(!U)U=new C6,U.plane=N,U.layer=E,U.x=O,U.z=I,this.storeLoc(U),this.addedLocs.addTail(U);U.locIndex=R,U.shape=H,U.locAngle=_,U.delay=Q,U.duration=A}storeLoc(A){if(!this.scene)return;let R=0,_=-1,E=0,I=0;if(A.layer===0)R=this.scene.getWallTypecode(A.plane,A.x,A.z);else if(A.layer===1)R=this.scene.getDecorTypecode(A.plane,A.z,A.x);else if(A.layer===2)R=this.scene.getLocTypecode(A.plane,A.x,A.z);else if(A.layer===3)R=this.scene.getGroundDecorTypecode(A.plane,A.x,A.z);if(R!==0){let H=this.scene.getInfo(A.plane,A.x,A.z,R);_=R>>14&32767,E=H&31,I=H>>6}A.lastLocIndex=_,A.lastShape=E,A.lastAngle=I}drawGame(){if(this.players===null)return;if(this.redrawTitleBackground){if(this.redrawTitleBackground=!1,this.areaBackleft1?.draw(0,11),this.areaBackleft2?.draw(0,375),this.areaBackright1?.draw(729,5),this.areaBackright2?.draw(752,231),this.areaBacktop1?.draw(0,0),this.areaBacktop2?.draw(561,0),this.areaBackvmid1?.draw(520,11),this.areaBackvmid2?.draw(520,231),this.areaBackvmid3?.draw(501,375),this.areaBackhmid2?.draw(0,345),this.redrawSidebar=!0,this.redrawChatback=!0,this.redrawSideicons=!0,this.redrawPrivacySettings=!0,this.sceneState!==2)this.areaViewport?.draw(8,11),this.areaMapback?.draw(561,5)}if(this.sceneState===2)this.drawScene();if(this.menuVisible&&this.menuArea===1)this.redrawSidebar=!0;let A=!1;if(this.sidebarInterfaceId!==-1){if(A=this.updateInterfaceAnimation(this.sidebarInterfaceId,this.sceneDelta),A)this.redrawSidebar=!0}if(this.selectedArea===2)this.redrawSidebar=!0;if(this.objDragArea===2)this.redrawSidebar=!0;if(this.redrawSidebar)this.drawSidebar(),this.redrawSidebar=!1;if(this.chatInterfaceId===-1){if(this.chatInterface.scrollPosition=this.chatScrollHeight-this.chatScrollOffset-77,this.mouseX>453&&this.mouseX<565&&this.mouseY>350)this.handleScrollInput(this.mouseX-22,this.mouseY-375,this.chatScrollHeight,77,!1,463,0,this.chatInterface);let R=this.chatScrollHeight-this.chatInterface.scrollPosition-77;if(R<0)R=0;if(R>this.chatScrollHeight-77)R=this.chatScrollHeight-77;if(this.chatScrollOffset!==R)this.chatScrollOffset=R,this.redrawChatback=!0}if(this.chatInterfaceId!==-1){if(A=this.updateInterfaceAnimation(this.chatInterfaceId,this.sceneDelta),A)this.redrawChatback=!0}if(this.selectedArea===3)this.redrawChatback=!0;if(this.objDragArea===3)this.redrawChatback=!0;if(this.modalMessage)this.redrawChatback=!0;if(this.menuVisible&&this.menuArea===2)this.redrawChatback=!0;if(this.redrawChatback)this.drawChatback(),this.redrawChatback=!1;if(this.sceneState===2)this.drawMinimap(),this.areaMapback?.draw(561,5);if(this.flashingTab!==-1)this.redrawSideicons=!0;if(this.redrawSideicons){if(this.flashingTab!==-1&&this.flashingTab===this.selectedTab)this.flashingTab=-1,this.out.p1isaac(175),this.out.p1(this.selectedTab);if(this.redrawSideicons=!1,this.areaBackhmid1?.bind(),this.imageBackhmid1?.draw(0,0),this.sidebarInterfaceId===-1){if(this.tabInterfaceId[this.selectedTab]!==-1){if(this.selectedTab===0)this.imageRedstone1?.draw(29,30);else if(this.selectedTab===1)this.imageRedstone2?.draw(59,29);else if(this.selectedTab===2)this.imageRedstone2?.draw(87,29);else if(this.selectedTab===3)this.imageRedstone3?.draw(115,29);else if(this.selectedTab===4)this.imageRedstone2h?.draw(156,29);else if(this.selectedTab===5)this.imageRedstone2h?.draw(184,29);else if(this.selectedTab===6)this.imageRedstone1h?.draw(212,30)}if(this.tabInterfaceId[0]!==-1&&(this.flashingTab!==0||this.loopCycle%20<10))this.imageSideicons[0]?.draw(35,34);if(this.tabInterfaceId[1]!==-1&&(this.flashingTab!==1||this.loopCycle%20<10))this.imageSideicons[1]?.draw(59,32);if(this.tabInterfaceId[2]!==-1&&(this.flashingTab!==2||this.loopCycle%20<10))this.imageSideicons[2]?.draw(86,32);if(this.tabInterfaceId[3]!==-1&&(this.flashingTab!==3||this.loopCycle%20<10))this.imageSideicons[3]?.draw(121,33);if(this.tabInterfaceId[4]!==-1&&(this.flashingTab!==4||this.loopCycle%20<10))this.imageSideicons[4]?.draw(157,34);if(this.tabInterfaceId[5]!==-1&&(this.flashingTab!==5||this.loopCycle%20<10))this.imageSideicons[5]?.draw(185,32);if(this.tabInterfaceId[6]!==-1&&(this.flashingTab!==6||this.loopCycle%20<10))this.imageSideicons[6]?.draw(212,34)}if(this.areaBackhmid1?.draw(520,165),this.areaBackbase2?.bind(),this.imageBackbase2?.draw(0,0),this.sidebarInterfaceId===-1){if(this.tabInterfaceId[this.selectedTab]!==-1){if(this.selectedTab===7)this.imageRedstone1v?.draw(49,0);else if(this.selectedTab===8)this.imageRedstone2v?.draw(81,0);else if(this.selectedTab===9)this.imageRedstone2v?.draw(108,0);else if(this.selectedTab===10)this.imageRedstone3v?.draw(136,1);else if(this.selectedTab===11)this.imageRedstone2hv?.draw(178,0);else if(this.selectedTab===12)this.imageRedstone2hv?.draw(205,0);else if(this.selectedTab===13)this.imageRedstone1hv?.draw(233,0)}if(this.tabInterfaceId[8]!==-1&&(this.flashingTab!==8||this.loopCycle%20<10))this.imageSideicons[7]?.draw(80,2);if(this.tabInterfaceId[9]!==-1&&(this.flashingTab!==9||this.loopCycle%20<10))this.imageSideicons[8]?.draw(107,3);if(this.tabInterfaceId[10]!==-1&&(this.flashingTab!==10||this.loopCycle%20<10))this.imageSideicons[9]?.draw(142,4);if(this.tabInterfaceId[11]!==-1&&(this.flashingTab!==11||this.loopCycle%20<10))this.imageSideicons[10]?.draw(179,2);if(this.tabInterfaceId[12]!==-1&&(this.flashingTab!==12||this.loopCycle%20<10))this.imageSideicons[11]?.draw(206,2);if(this.tabInterfaceId[13]!==-1&&(this.flashingTab!==13||this.loopCycle%20<10))this.imageSideicons[12]?.draw(230,2)}this.areaBackbase2?.draw(501,492),this.areaViewport?.bind()}if(this.redrawPrivacySettings){if(this.redrawPrivacySettings=!1,this.areaBackbase1?.bind(),this.imageBackbase1?.draw(0,0),this.fontPlain12?.drawStringTaggableCenter(57,33,"Public chat",16777215,!0),this.publicChatSetting===0)this.fontPlain12?.drawStringTaggableCenter(57,46,"On",65280,!0);if(this.publicChatSetting===1)this.fontPlain12?.drawStringTaggableCenter(57,46,"Friends",16776960,!0);if(this.publicChatSetting===2)this.fontPlain12?.drawStringTaggableCenter(57,46,"Off",16711680,!0);if(this.publicChatSetting===3)this.fontPlain12?.drawStringTaggableCenter(57,46,"Hide",65535,!0);if(this.fontPlain12?.drawStringTaggableCenter(186,33,"Private chat",16777215,!0),this.privateChatSetting===0)this.fontPlain12?.drawStringTaggableCenter(186,46,"On",65280,!0);if(this.privateChatSetting===1)this.fontPlain12?.drawStringTaggableCenter(186,46,"Friends",16776960,!0);if(this.privateChatSetting===2)this.fontPlain12?.drawStringTaggableCenter(186,46,"Off",16711680,!0);if(this.fontPlain12?.drawStringTaggableCenter(326,33,"Trade/duel",16777215,!0),this.tradeChatSetting===0)this.fontPlain12?.drawStringTaggableCenter(326,46,"On",65280,!0);if(this.tradeChatSetting===1)this.fontPlain12?.drawStringTaggableCenter(326,46,"Friends",16776960,!0);if(this.tradeChatSetting===2)this.fontPlain12?.drawStringTaggableCenter(326,46,"Off",16711680,!0);this.fontPlain12?.drawStringTaggableCenter(462,38,"Report abuse",16777215,!0),this.areaBackbase1?.draw(0,471),this.areaViewport?.bind()}this.sceneDelta=0}drawScene(){if(this.sceneCycle++,this.pushPlayers(),this.pushNpcs(),this.pushProjectiles(),this.pushSpotanims(),this.pushLocs(),!this.cutscene){let O=this.orbitCameraPitch;if((this.cameraPitchClamp/256|0)>O)O=this.cameraPitchClamp/256|0;if(this.cameraModifierEnabled[4]&&this.cameraModifierWobbleScale[4]+128>O)O=this.cameraModifierWobbleScale[4]+128;let Q=this.orbitCameraYaw+this.cameraAnticheatAngle&2047;if(this.localPlayer)this.orbitCamera(this.orbitCameraX,this.getHeightmapY(this.currentLevel,this.localPlayer.x,this.localPlayer.z)-50,this.orbitCameraZ,Q,O,O*3+600);if(i.cyclelogic2++,i.cyclelogic2>1802){i.cyclelogic2=0,this.out.p1isaac(146),this.out.p1(0);let U=this.out.pos;if(this.out.p2(29711),this.out.p1(70),this.out.p1(Math.random()*256|0),this.out.p1(242),this.out.p1(186),this.out.p1(39),this.out.p1(61),(Math.random()*2|0)===0)this.out.p1(13);if((Math.random()*2|0)===0)this.out.p2(57856);this.out.p2(Math.random()*65536|0),this.out.psize1(this.out.pos-U)}}let A;if(this.cutscene)A=this.getTopLevelCutscene();else A=this.getTopLevel();let R=this.cameraX,_=this.cameraY,E=this.cameraZ,I=this.cameraPitch,H=this.cameraYaw,N;for(let O=0;O<5;O++)if(this.cameraModifierEnabled[O]){if(N=Math.random()*(this.cameraModifierJitter[O]*2+1)-this.cameraModifierJitter[O]+Math.sin(this.cameraModifierCycle[O]*(this.cameraModifierWobbleSpeed[O]/100))*this.cameraModifierWobbleScale[O]|0,O===0)this.cameraX+=N;if(O===1)this.cameraY+=N;if(O===2)this.cameraZ+=N;if(O===3)this.cameraYaw=this.cameraYaw+N&2047;if(O===4){if(this.cameraPitch+=N,this.cameraPitch<128)this.cameraPitch=128;if(this.cameraPitch>383)this.cameraPitch=383}}N=m.cycle,K.checkHover=!0,K.pickedCount=0,K.mouseX=this.mouseX-8,K.mouseY=this.mouseY-11,k.clear(C.getSceneClearColor()),C.startRenderScene(),this.scene?.draw(this.cameraX,this.cameraY,this.cameraZ,A,this.cameraYaw,this.cameraPitch,this.loopCycle),C.endRenderScene(),this.scene?.clearTemporaryLocs(),this.draw2DEntityElements(),this.drawTileHint(),this.updateTextures(N),this.draw3DEntityElements(),this.areaViewport?.draw(8,11),this.cameraX=R,this.cameraY=_,this.cameraZ=E,this.cameraPitch=I,this.cameraYaw=H}clearCaches(){J0.modelCacheStatic?.clear(),J0.modelCacheDynamic?.clear(),f0.modelCache?.clear(),E0.modelCache?.clear(),E0.iconCache?.clear(),V0.modelCache?.clear(),T0.modelCache?.clear()}projectFromEntity(A,R){this.projectFromGround(A.x,R,A.z)}projectFromGround(A,R,_){if(A<128||_<128||A>13056||_>13056){this.projectX=-1,this.projectY=-1;return}let E=this.getHeightmapY(this.currentLevel,A,_)-R;this.project(A,E,_)}project(A,R,_){let E=A-this.cameraX,I=R-this.cameraY,H=_-this.cameraZ,N=m.sin[this.cameraPitch],O=m.cos[this.cameraPitch],Q=m.sin[this.cameraYaw],U=m.cos[this.cameraYaw],G=H*Q+E*U>>16;if(H=H*U-E*Q>>16,E=G,G=I*O-H*N>>16,H=I*N+H*O>>16,I=G,H>=50)this.projectX=m.centerX+((E<<9)/H|0),this.projectY=m.centerY+((I<<9)/H|0);else this.projectX=-1,this.projectY=-1}draw2DEntityElements(){this.chatCount=0;for(let A=-1;A<this.playerCount+this.npcCount;A++){let R=null;if(A===-1)R=this.localPlayer;else if(A<this.playerCount)R=this.players[this.playerIds[A]];else R=this.npcs[this.npcIds[A-this.playerCount]];if(!R||!R.isVisibleNow())continue;if(A<this.playerCount){let _=30,E=R;if(E.headicons!==0){if(this.projectFromEntity(R,R.maxY+15),this.projectX>-1){for(let I=0;I<8;I++)if((E.headicons&1<<I)!==0)this.imageHeadicons[I]?.draw(this.projectX-12,this.projectY-_),_-=25}}if(A>=0&&this.hintType===10&&this.hintPlayer===this.playerIds[A]){if(this.projectFromEntity(R,R.maxY+15),this.projectX>-1)this.imageHeadicons[7]?.draw(this.projectX-12,this.projectY-_)}}else if(this.hintType===1&&this.hintNpc===this.npcIds[A-this.playerCount]&&this.loopCycle%20<10){if(this.projectFromEntity(R,R.maxY+15),this.projectX>-1)this.imageHeadicons[2]?.draw(this.projectX-12,this.projectY-28)}if(R.chat&&(A>=this.playerCount||this.publicChatSetting===0||this.publicChatSetting===3||this.publicChatSetting===1&&this.isFriend(R.name))){if(this.projectFromEntity(R,R.maxY),this.projectX>-1&&this.chatCount<50&&this.fontBold12){if(this.chatWidth[this.chatCount]=this.fontBold12.stringWidth(R.chat)/2|0,this.chatHeight[this.chatCount]=this.fontBold12.height2d,this.chatX[this.chatCount]=this.projectX,this.chatY[this.chatCount]=this.projectY,this.chatColors[this.chatCount]=R.chatColor,this.chatStyles[this.chatCount]=R.chatStyle,this.chatTimers[this.chatCount]=R.chatTimer,this.chats[this.chatCount++]=R.chat,this.chatEffects===0&&R.chatStyle===1)this.chatHeight[this.chatCount]+=10,this.chatY[this.chatCount]+=5;if(this.chatEffects===0&&R.chatStyle===2)this.chatWidth[this.chatCount]=60}}if(R.combatCycle>this.loopCycle+100){if(this.projectFromEntity(R,R.maxY+15),this.projectX>-1){let _=R.health*30/R.totalHealth|0;if(_>30)_=30;k.fillRect2d(this.projectX-15,this.projectY-3,_,5,65280),k.fillRect2d(this.projectX-15+_,this.projectY-3,30-_,5,16711680)}}if(R.combatCycle>this.loopCycle+330){if(this.projectFromEntity(R,R.maxY/2|0),this.projectX>-1)this.imageHitmarks[R.damageType]?.draw(this.projectX-12,this.projectY-12),this.fontPlain11?.drawStringCenter(this.projectX,this.projectY+4,R.damage.toString(),0),this.fontPlain11?.drawStringCenter(this.projectX-1,this.projectY+3,R.damage.toString(),16777215)}}for(let A=0;A<this.chatCount;A++){let R=this.chatX[A],_=this.chatY[A],E=this.chatWidth[A],I=this.chatHeight[A],H=!0;while(H){H=!1;for(let O=0;O<A;O++)if(_+2>this.chatY[O]-this.chatHeight[O]&&_-I<this.chatY[O]+2&&R-E<this.chatX[O]+this.chatWidth[O]&&R+E>this.chatX[O]-this.chatWidth[O]&&this.chatY[O]-this.chatHeight[O]<_)_=this.chatY[O]-this.chatHeight[O],H=!0}this.projectX=this.chatX[A],this.projectY=this.chatY[A]=_;let N=this.chats[A];if(this.chatEffects===0){let O=16776960;if(this.chatColors[A]<6)O=i.CHAT_COLORS[this.chatColors[A]];if(this.chatColors[A]===6)O=this.sceneCycle%20<10?16711680:16776960;if(this.chatColors[A]===7)O=this.sceneCycle%20<10?255:65535;if(this.chatColors[A]===8)O=this.sceneCycle%20<10?45056:8454016;if(this.chatColors[A]===9){let Q=150-this.chatTimers[A];if(Q<50)O=Q*1280+16711680;else if(Q<100)O=16776960-(Q-50)*327680;else if(Q<150)O=(Q-100)*5+65280}if(this.chatColors[A]===10){let Q=150-this.chatTimers[A];if(Q<50)O=Q*5+16711680;else if(Q<100)O=16711935-(Q-50)*327680;else if(Q<150)O=(Q-100)*327680+255-(Q-100)*5}if(this.chatColors[A]===11){let Q=150-this.chatTimers[A];if(Q<50)O=16777215-Q*327685;else if(Q<100)O=(Q-50)*327685+65280;else if(Q<150)O=16777215-(Q-100)*327680}if(this.chatStyles[A]===0)this.fontBold12?.drawStringCenter(this.projectX,this.projectY+1,N,0),this.fontBold12?.drawStringCenter(this.projectX,this.projectY,N,O);if(this.chatStyles[A]===1)this.fontBold12?.drawCenteredWave(this.projectX,this.projectY+1,N,0,this.sceneCycle),this.fontBold12?.drawCenteredWave(this.projectX,this.projectY,N,O,this.sceneCycle);if(this.chatStyles[A]===2){let Q=this.fontBold12?.stringWidth(N)??0,U=(150-this.chatTimers[A])*(Q+100)/150;k.setBounds(this.projectX-50,0,this.projectX+50,334),this.fontBold12?.drawString(this.projectX+50-U,this.projectY+1,N,0),this.fontBold12?.drawString(this.projectX+50-U,this.projectY,N,O),k.resetBounds()}}else this.fontBold12?.drawStringCenter(this.projectX,this.projectY+1,N,0),this.fontBold12?.drawStringCenter(this.projectX,this.projectY,N,16776960)}}drawTileHint(){if(this.hintType!==2||!this.imageHeadicons[2])return;if(this.projectFromGround((this.hintTileX-this.sceneBaseTileX<<7)+this.hintOffsetX,this.hintHeight*2,(this.hintTileZ-this.sceneBaseTileZ<<7)+this.hintOffsetZ),this.projectX>-1&&this.loopCycle%20<10)this.imageHeadicons[2].draw(this.projectX-12,this.projectY-28)}draw3DEntityElements(){if(this.drawPrivateMessages(),this.crossMode===1)this.imageCrosses[this.crossCycle/100|0]?.draw(this.crossX-8-8,this.crossY-8-11);if(this.crossMode===2)this.imageCrosses[(this.crossCycle/100|0)+4]?.draw(this.crossX-8-8,this.crossY-8-11);if(this.viewportInterfaceId!==-1)this.updateInterfaceAnimation(this.viewportInterfaceId,this.sceneDelta),this.drawInterface(r.instances[this.viewportInterfaceId],0,0,0);if(this.drawWildyLevel(),!this.menuVisible)this.handleInput(),this.drawTooltip();else if(this.menuArea===0)this.drawMenu();if(this.inMultizone===1)if(this.wildernessLevel>0||this.worldLocationState===1)this.imageHeadicons[1]?.draw(472,258);else this.imageHeadicons[1]?.draw(472,296);if(this.wildernessLevel>0)this.imageHeadicons[0]?.draw(472,296),this.fontPlain12?.drawStringCenter(484,329,"Level: "+this.wildernessLevel,16776960);if(this.worldLocationState===1)this.imageHeadicons[6]?.draw(472,296),this.fontPlain12?.drawStringCenter(484,329,"Arena",16776960);if(this.systemUpdateTimer!==0){let A=this.systemUpdateTimer/50|0,R=A/60|0;if(A%=60,A<10)this.fontPlain12?.drawString(4,329,"System update in: "+R+":0"+A,16776960);else this.fontPlain12?.drawString(4,329,"System update in: "+R+":"+A,16776960)}}drawPrivateMessages(){if(this.splitPrivateChat===0)return;let A=this.fontPlain12,R=0;if(this.systemUpdateTimer!==0)R=1;for(let _=0;_<100;_++){if(!this.messageText[_])continue;let E=this.messageTextType[_],I;if((E===3||E===7)&&(E===7||this.privateChatSetting===0||this.privateChatSetting===1&&this.isFriend(this.messageTextSender[_]))){if(I=329-R*13,A?.drawString(4,I,"From "+this.messageTextSender[_]+": "+this.messageText[_],0),A?.drawString(4,I-1,"From "+this.messageTextSender[_]+": "+this.messageText[_],65535),R++,R>=5)return}if(E===5&&this.privateChatSetting<2){if(I=329-R*13,A?.drawString(4,I,this.messageText[_],0),A?.drawString(4,I-1,this.messageText[_],65535),R++,R>=5)return}if(E===6&&this.privateChatSetting<2){if(I=329-R*13,A?.drawString(4,I,"To "+this.messageTextSender[_]+": "+this.messageText[_],0),A?.drawString(4,I-1,"To "+this.messageTextSender[_]+": "+this.messageText[_],65535),R++,R>=5)return}}}drawWildyLevel(){if(!this.localPlayer)return;let A=(this.localPlayer.x>>7)+this.sceneBaseTileX,R=(this.localPlayer.z>>7)+this.sceneBaseTileZ;if(A>=2944&&A<3392&&R>=3520&&R<6400)this.wildernessLevel=((R-3520)/8|0)+1;else if(A>=2944&&A<3392&&R>=9920&&R<12800)this.wildernessLevel=((R-9920)/8|0)+1;else this.wildernessLevel=0;if(this.worldLocationState=0,A>=3328&&A<3392&&R>=3200&&R<3264){let _=A&63,E=R&63;if(_>=4&&_<=29&&E>=44&&E<=58)this.worldLocationState=1;else if(_>=36&&_<=61&&E>=44&&E<=58)this.worldLocationState=1;else if(_>=4&&_<=29&&E>=25&&E<=39)this.worldLocationState=1;else if(_>=36&&_<=61&&E>=25&&E<=39)this.worldLocationState=1;else if(_>=4&&_<=29&&E>=6&&E<=20)this.worldLocationState=1;else if(_>=36&&_<=61&&E>=6&&E<=20)this.worldLocationState=1}if(this.worldLocationState===0&&A>=3328&&A<=3393&&R>=3203&&R<=3325)this.worldLocationState=2;if(this.overrideChat=0,A>=3053&&A<=3156&&R>=3056&&R<=3136)this.overrideChat=1;else if(A>=3072&&A<=3118&&R>=9492&&R<=9535)this.overrideChat=1;if(this.overrideChat===1&&A>=3139&&A<=3199&&R>=3008&&R<=3062)this.overrideChat=0}drawSidebar(){if(this.areaSidebar?.bind(),this.areaSidebarOffsets)m.lineOffset=this.areaSidebarOffsets;if(this.imageInvback?.draw(0,0),this.sidebarInterfaceId!==-1)this.drawInterface(r.instances[this.sidebarInterfaceId],0,0,0);else if(this.tabInterfaceId[this.selectedTab]!==-1)this.drawInterface(r.instances[this.tabInterfaceId[this.selectedTab]],0,0,0);if(this.menuVisible&&this.menuArea===1)this.drawMenu();if(this.areaSidebar?.draw(562,231),this.areaViewport?.bind(),this.areaViewportOffsets)m.lineOffset=this.areaViewportOffsets}drawChatback(){if(this.areaChatback?.bind(),this.areaChatbackOffsets)m.lineOffset=this.areaChatbackOffsets;if(this.imageChatback?.draw(0,0),this.showSocialInput)this.fontBold12?.drawStringCenter(239,40,this.socialMessage,0),this.fontBold12?.drawStringCenter(239,60,this.socialInput+"*",128);else if(this.chatbackInputOpen)this.fontBold12?.drawStringCenter(239,40,"Enter amount:",0),this.fontBold12?.drawStringCenter(239,60,this.chatbackInput+"*",128);else if(this.modalMessage)this.fontBold12?.drawStringCenter(239,40,this.modalMessage,0),this.fontBold12?.drawStringCenter(239,60,"Click to continue",128);else if(this.chatInterfaceId!==-1)this.drawInterface(r.instances[this.chatInterfaceId],0,0,0);else if(this.stickyChatInterfaceId===-1){let A=this.fontPlain12,R=0;k.setBounds(0,0,463,77);for(let _=0;_<100;_++){let E=this.messageText[_];if(!E)continue;let I=this.messageTextType[_],H=this.chatScrollOffset+70-R*14;if(I===0){if(H>0&&H<110)A?.drawString(4,H,E,0);R++}if(I===1){if(H>0&&H<110)A?.drawString(4,H,this.messageTextSender[_]+":",16777215),A?.drawString(A.stringWidth(this.messageTextSender[_])+12,H,E,255);R++}if(I===2&&(this.publicChatSetting===0||this.publicChatSetting===1&&this.isFriend(this.messageTextSender[_]))){if(H>0&&H<110)A?.drawString(4,H,this.messageTextSender[_]+":",0),A?.drawString(A.stringWidth(this.messageTextSender[_])+12,H,E,255);R++}if((I===3||I===7)&&this.splitPrivateChat===0&&(I===7||this.privateChatSetting===0||this.privateChatSetting===1&&this.isFriend(this.messageTextSender[_]))){if(H>0&&H<110)A?.drawString(4,H,"From "+this.messageTextSender[_]+":",0),A?.drawString(A.stringWidth("From "+this.messageTextSender[_])+12,H,E,8388608);R++}if(I===4&&(this.tradeChatSetting===0||this.tradeChatSetting===1&&this.isFriend(this.messageTextSender[_]))){if(H>0&&H<110)A?.drawString(4,H,this.messageTextSender[_]+" "+this.messageText[_],8388736);R++}if(I===5&&this.splitPrivateChat===0&&this.privateChatSetting<2){if(H>0&&H<110)A?.drawString(4,H,E,8388608);R++}if(I===6&&this.splitPrivateChat===0&&this.privateChatSetting<2){if(H>0&&H<110)A?.drawString(4,H,"To "+this.messageTextSender[_]+":",0),A?.drawString(A.stringWidth("To "+this.messageTextSender[_])+12,H,E,8388608);R++}if(I===8&&(this.tradeChatSetting===0||this.tradeChatSetting===1&&this.isFriend(this.messageTextSender[_]))){if(H>0&&H<110)A?.drawString(4,H,this.messageTextSender[_]+" "+this.messageText[_],13350793);R++}}if(k.resetBounds(),this.chatScrollHeight=R*14+7,this.chatScrollHeight<78)this.chatScrollHeight=78;this.drawScrollbar(463,0,this.chatScrollHeight-this.chatScrollOffset-77,this.chatScrollHeight,77),A?.drawString(4,90,e.formatName(this.usernameInput)+":",0),A?.drawString(A.stringWidth(this.usernameInput+": ")+6,90,this.chatTyped+"*",255),k.drawHorizontalLine(0,77,0,479)}else this.drawInterface(r.instances[this.stickyChatInterfaceId],0,0,0);if(this.menuVisible&&this.menuArea===2)this.drawMenu();if(this.areaChatback?.draw(22,375),this.areaViewport?.bind(),this.areaViewportOffsets)m.lineOffset=this.areaViewportOffsets}drawMinimap(){if(this.areaMapback?.bind(),!this.localPlayer)return;let A=this.orbitCameraYaw+this.minimapAnticheatAngle&2047,R=(this.localPlayer.x/32|0)+48,_=464-(this.localPlayer.z/32|0);this.imageMinimap?.drawRotatedMasked(21,9,146,151,this.minimapMaskLineOffsets,this.minimapMaskLineLengths,R,_,A,this.minimapZoom+256),this.imageCompass?.drawRotatedMasked(0,0,33,33,this.compassMaskLineOffsets,this.compassMaskLineLengths,25,25,this.orbitCameraYaw,256);for(let E=0;E<this.activeMapFunctionCount;E++)R=this.activeMapFunctionX[E]*4+2-(this.localPlayer.x/32|0),_=this.activeMapFunctionZ[E]*4+2-(this.localPlayer.z/32|0),this.drawOnMinimap(_,this.activeMapFunctions[E],R);for(let E=0;E<104;E++)for(let I=0;I<104;I++)if(this.objStacks[this.currentLevel][E][I])R=E*4+2-(this.localPlayer.x/32|0),_=I*4+2-(this.localPlayer.z/32|0),this.drawOnMinimap(_,this.imageMapdot0,R);for(let E=0;E<this.npcCount;E++){let I=this.npcs[this.npcIds[E]];if(I&&I.isVisibleNow()&&I.npcType&&I.npcType.minimap)R=(I.x/32|0)-(this.localPlayer.x/32|0),_=(I.z/32|0)-(this.localPlayer.z/32|0),this.drawOnMinimap(_,this.imageMapdot1,R)}for(let E=0;E<this.playerCount;E++){let I=this.players[this.playerIds[E]];if(I&&I.isVisibleNow()&&I.name){R=(I.x/32|0)-(this.localPlayer.x/32|0),_=(I.z/32|0)-(this.localPlayer.z/32|0);let H=!1,N=e.toBase37(I.name);for(let O=0;O<this.friendCount;O++)if(N===this.friendName37[O]&&this.friendWorld[O]!==0){H=!0;break}if(H)this.drawOnMinimap(_,this.imageMapdot3,R);else this.drawOnMinimap(_,this.imageMapdot2,R)}}if(this.flagSceneTileX!==0)R=this.flagSceneTileX*4+2-(this.localPlayer.x/32|0),_=this.flagSceneTileZ*4+2-(this.localPlayer.z/32|0),this.drawOnMinimap(_,this.imageMapflag,R);k.fillRect2d(93,82,3,3,16777215),this.areaViewport?.bind()}drawOnMinimap(A,R,_){if(!R)return;let E=this.orbitCameraYaw+this.minimapAnticheatAngle&2047,I=_*_+A*A;if(I>6400)return;let H=m.sin[E],N=m.cos[E];H=H*256/(this.minimapZoom+256)|0,N=N*256/(this.minimapZoom+256)|0;let O=A*H+_*N>>16,Q=A*N-_*H>>16;if(I>2500&&this.imageMapback)R.drawMasked(O+94-(R.cropW/2|0),83-Q-(R.cropH/2|0),this.imageMapback);else R.draw(O+94-(R.cropW/2|0),83-Q-(R.cropH/2|0))}createMinimap(A){if(!this.imageMinimap)return;let R=this.imageMinimap.pixels,_=R.length;for(let H=0;H<_;H++)R[H]=0;for(let H=1;H<104-1;H++){let N=(104-1-H)*512*4+24628;for(let O=1;O<104-1;O++){if(this.levelTileFlags&&(this.levelTileFlags[A][O][H]&24)===0)this.scene?.drawMinimapTile(A,O,H,R,N,512);if(A<3&&this.levelTileFlags&&(this.levelTileFlags[A+1][O][H]&8)!==0)this.scene?.drawMinimapTile(A+1,O,H,R,N,512);N+=4}}let E=((Math.random()*20|0)+238-10<<16)+((Math.random()*20|0)+238-10<<8)+(Math.random()*20|0)+238-10,I=(Math.random()*20|0)+238-10<<16;this.imageMinimap.bind();for(let H=1;H<104-1;H++)for(let N=1;N<104-1;N++){if(this.levelTileFlags&&(this.levelTileFlags[A][N][H]&24)===0)this.drawMinimapLoc(N,H,A,E,I);if(A<3&&this.levelTileFlags&&(this.levelTileFlags[A+1][N][H]&8)!==0)this.drawMinimapLoc(N,H,A+1,E,I)}this.areaViewport?.bind(),this.activeMapFunctionCount=0;for(let H=0;H<104;H++)for(let N=0;N<104;N++){let O=this.scene?.getGroundDecorTypecode(this.currentLevel,H,N)??0;if(O===0)continue;O=O>>14&32767;let Q=J0.get(O).mapfunction;if(Q<0)continue;let U=H,G=N;if(Q!==22&&Q!==29&&Q!==34&&Q!==36&&Q!==46&&Q!==47&&Q!==48){let $=104,L=104,J=this.levelCollisionMap[this.currentLevel];if(J){let q=J.flags;for(let V=0;V<10;V++){let B=Math.random()*4|0;if(B===0&&U>0&&U>H-3&&(q[R0.index(U-1,G)]&2621704)===0)U--;if(B===1&&U<$-1&&U<H+3&&(q[R0.index(U+1,G)]&2621824)===0)U++;if(B===2&&G>0&&G>N-3&&(q[R0.index(U,G-1)]&2621698)===0)G--;if(B===3&&G<L-1&&G<N+3&&(q[R0.index(U,G+1)]&2621728)===0)G++}}}this.activeMapFunctions[this.activeMapFunctionCount]=this.imageMapfunction[Q],this.activeMapFunctionX[this.activeMapFunctionCount]=U,this.activeMapFunctionZ[this.activeMapFunctionCount]=G,this.activeMapFunctionCount++}}drawMinimapLoc(A,R,_,E,I){if(!this.scene||!this.imageMinimap)return;let H=this.scene.getWallTypecode(_,A,R);if(H!==0){let N=this.scene.getInfo(_,A,R,H),O=N>>6&3,Q=N&31,U=E;if(H>0)U=I;let G=this.imageMinimap.pixels,$=A*4+(103-R)*512*4+24624,L=H>>14&32767,J=J0.get(L);if(J.mapscene===-1){if(Q===D.WALL_STRAIGHT.id||Q===D.WALL_L.id){if(O===0)G[$]=U,G[$+512]=U,G[$+1024]=U,G[$+1536]=U;else if(O===1)G[$]=U,G[$+1]=U,G[$+2]=U,G[$+3]=U;else if(O===2)G[$+3]=U,G[$+3+512]=U,G[$+3+1024]=U,G[$+3+1536]=U;else if(O===3)G[$+1536]=U,G[$+1536+1]=U,G[$+1536+2]=U,G[$+1536+3]=U}if(Q===D.WALL_SQUARE_CORNER.id){if(O===0)G[$]=U;else if(O===1)G[$+3]=U;else if(O===2)G[$+3+1536]=U;else if(O===3)G[$+1536]=U}if(Q===D.WALL_L.id){if(O===3)G[$]=U,G[$+512]=U,G[$+1024]=U,G[$+1536]=U;else if(O===0)G[$]=U,G[$+1]=U,G[$+2]=U,G[$+3]=U;else if(O===1)G[$+3]=U,G[$+3+512]=U,G[$+3+1024]=U,G[$+3+1536]=U;else if(O===2)G[$+1536]=U,G[$+1536+1]=U,G[$+1536+2]=U,G[$+1536+3]=U}}else{let q=this.imageMapscene[J.mapscene];if(q){let V=(J.width*4-q.width2d)/2|0,B=(J.length*4-q.height2d)/2|0;q.draw(A*4+48+V,(104-R-J.length)*4+B+48)}}}if(H=this.scene.getLocTypecode(_,A,R),H!==0){let N=this.scene.getInfo(_,A,R,H),O=N>>6&3,Q=N&31,U=H>>14&32767,G=J0.get(U);if(G.mapscene!==-1){let $=this.imageMapscene[G.mapscene];if($){let L=(G.width*4-$.width2d)/2|0,J=(G.length*4-$.height2d)/2|0;$.draw(A*4+48+L,(104-R-G.length)*4+J+48)}}else if(Q===D.WALL_DIAGONAL.id){let $=15658734;if(H>0)$=15597568;let L=this.imageMinimap.pixels,J=A*4+(104-1-R)*512*4+24624;if(O===0||O===2)L[J+1536]=$,L[J+1024+1]=$,L[J+512+2]=$,L[J+3]=$;else L[J]=$,L[J+512+1]=$,L[J+1024+2]=$,L[J+1536+3]=$}}if(H=this.scene.getGroundDecorTypecode(_,A,R),H!==0){let N=J0.get(H>>14&32767);if(N.mapscene!==-1){let O=this.imageMapscene[N.mapscene];if(O){let Q=(N.width*4-O.width2d)/2|0,U=(N.length*4-O.height2d)/2|0;O.draw(A*4+48+Q,(104-R-N.length)*4+U+48)}}}}drawTooltip(){if(this.menuSize<2&&this.objSelected===0&&this.spellSelected===0)return;let A;if(this.objSelected===1&&this.menuSize<2)A="Use "+this.objSelectedName+" with...";else if(this.spellSelected===1&&this.menuSize<2)A=this.spellCaption+"...";else A=this.menuOption[this.menuSize-1];if(this.menuSize>2)A=A+"@whi@ / "+(this.menuSize-2)+" more options";this.fontBold12?.drawStringTooltip(4,15,A,16777215,!0,this.loopCycle/1000|0)}drawMenu(){let A=this.menuX,R=this.menuY,_=this.menuWidth,E=this.menuHeight,I=6116423;k.fillRect2d(A,R,_,E,I),k.fillRect2d(A+1,R+1,_-2,16,0),k.drawRect(A+1,R+18,_-2,E-19,0),this.fontBold12?.drawString(A+3,R+14,"Choose Option",I);let H=this.mouseX,N=this.mouseY;if(this.menuArea===0)H-=8,N-=11;if(this.menuArea===1)H-=562,N-=231;if(this.menuArea===2)H-=22,N-=375;for(let O=0;O<this.menuSize;O++){let Q=R+(this.menuSize-1-O)*15+31,U=16777215;if(H>A&&H<A+_&&N>Q-13&&N<Q+3)U=16776960;this.fontBold12?.drawStringTaggable(A+3,Q,this.menuOption[O],U,!0)}}async handleMouseInput(){if(this.objDragArea!==0)return;let A=this.mouseClickButton;if(this.spellSelected===1&&this.mouseClickX>=520&&this.mouseClickY>=165&&this.mouseClickX<=788&&this.mouseClickY<=230)A=0;if(this.menuVisible){if(A!==1){let R=this.mouseX,_=this.mouseY;if(this.menuArea===0)R-=8,_-=11;else if(this.menuArea===1)R-=562,_-=231;else if(this.menuArea===2)R-=22,_-=375;if(R<this.menuX-10||R>this.menuX+this.menuWidth+10||_<this.menuY-10||_>this.menuY+this.menuHeight+10){if(this.menuVisible=!1,this.menuArea===1)this.redrawSidebar=!0;if(this.menuArea===2)this.redrawChatback=!0}}if(A===1){let R=this.menuX,_=this.menuY,E=this.menuWidth,I=this.mouseClickX,H=this.mouseClickY;if(this.menuArea===0)I-=8,H-=11;else if(this.menuArea===1)I-=562,H-=231;else if(this.menuArea===2)I-=22,H-=375;let N=-1;for(let O=0;O<this.menuSize;O++){let Q=_+(this.menuSize-1-O)*15+31;if(I>R&&I<R+E&&H>Q-13&&H<Q+3)N=O}if(N!==-1)await this.useMenuOption(N);if(this.menuVisible=!1,this.menuArea===1)this.redrawSidebar=!0;else if(this.menuArea===2)this.redrawChatback=!0}}else{if(A===1&&this.menuSize>0){let R=this.menuAction[this.menuSize-1];if(R===602||R===596||R===22||R===892||R===415||R===405||R===38||R===422||R===478||R===347||R===188){let _=this.menuParamB[this.menuSize-1],E=this.menuParamC[this.menuSize-1];if(r.instances[E].draggable){if(this.objGrabThreshold=!1,this.objDragCycles=0,this.objDragInterfaceId=E,this.objDragSlot=_,this.objDragArea=2,this.objGrabX=this.mouseClickX,this.objGrabY=this.mouseClickY,r.instances[E].layer===this.viewportInterfaceId)this.objDragArea=1;if(r.instances[E].layer===this.chatInterfaceId)this.objDragArea=3;return}}}if(A===1&&(this.mouseButtonsOption===1||this.isAddFriendOption(this.menuSize-1))&&this.menuSize>2)A=2;if(A===1&&this.menuSize>0)await this.useMenuOption(this.menuSize-1);if(A!==2||this.menuSize<=0)return;this.showContextMenu()}}handleMinimapInput(){if(this.mouseClickButton===1&&this.localPlayer){let A=this.mouseClickX-21-561,R=this.mouseClickY-9-5;if(A>=0&&R>=0&&A<146&&R<151){A-=73,R-=75;let _=this.orbitCameraYaw+this.minimapAnticheatAngle&2047,E=m.sin[_],I=m.cos[_];E=E*(this.minimapZoom+256)>>8,I=I*(this.minimapZoom+256)>>8;let H=R*E+A*I>>11,N=R*I-A*E>>11,O=this.localPlayer.x+H>>7,Q=this.localPlayer.z-N>>7;if(this.tryMove(this.localPlayer.routeFlagX[0],this.localPlayer.routeFlagZ[0],O,Q,1,0,0,0,0,0,!0))this.out.p1(A),this.out.p1(R),this.out.p2(this.orbitCameraYaw),this.out.p1(57),this.out.p1(this.minimapAnticheatAngle),this.out.p1(this.minimapZoom),this.out.p1(89),this.out.p2(this.localPlayer.x),this.out.p2(this.localPlayer.z),this.out.p1(this.tryMoveNearest),this.out.p1(63)}}}isAddFriendOption(A){if(A<0)return!1;let R=this.menuAction[A];if(R>=2000)R-=2000;return R===406}async useMenuOption(A){if(A<0)return;if(this.chatbackInputOpen)this.chatbackInputOpen=!1,this.redrawChatback=!0;let R=this.menuAction[A],_=this.menuParamA[A],E=this.menuParamB[A],I=this.menuParamC[A];if(R>=2000)R-=2000;if(R===903||R===363){let H=this.menuOption[A],N=H.indexOf("@whi@");if(N!==-1){H=H.substring(N+5).trim();let O=e.formatName(e.fromBase37(e.toBase37(H))),Q=!1;for(let U=0;U<this.playerCount;U++){let G=this.players[this.playerIds[U]];if(G&&G.name&&G.name.toLowerCase()===O.toLowerCase()&&this.localPlayer){if(this.tryMove(this.localPlayer.routeFlagX[0],this.localPlayer.routeFlagZ[0],G.routeFlagX[0],G.routeFlagZ[0],2,1,1,0,0,0,!1),R===903)this.out.p1isaac(206);else if(R===363)this.out.p1isaac(164);this.out.p2(this.playerIds[U]),Q=!0;break}}if(!Q)this.addMessage(0,"Unable to find "+O,"")}}else if(R===450&&this.interactWithLoc(75,E,I,_))this.out.p2(this.objInterface),this.out.p2(this.objSelectedSlot),this.out.p2(this.objSelectedInterface);else if(R===405||R===38||R===422||R===478||R===347){if(R===478){if((E&3)===0)i.oplogic5++;if(i.oplogic5>=90)this.out.p1isaac(220);this.out.p1isaac(157)}else if(R===347)this.out.p1isaac(211);else if(R===422)this.out.p1isaac(133);else if(R===405){if(i.oplogic3+=_,i.oplogic3>=97)this.out.p1isaac(30),this.out.p3(14953816);this.out.p1isaac(195)}else if(R===38)this.out.p1isaac(71);if(this.out.p2(_),this.out.p2(E),this.out.p2(I),this.selectedCycle=0,this.selectedInterface=I,this.selectedItem=E,this.selectedArea=2,r.instances[I].layer===this.viewportInterfaceId)this.selectedArea=1;if(r.instances[I].layer===this.chatInterfaceId)this.selectedArea=3}else if(R===728||R===542||R===6||R===963||R===245){let H=this.npcs[_];if(H&&this.localPlayer){if(this.tryMove(this.localPlayer.routeFlagX[0],this.localPlayer.routeFlagZ[0],H.routeFlagX[0],H.routeFlagZ[0],2,1,1,0,0,0,!1),this.crossX=this.mouseClickX,this.crossY=this.mouseClickY,this.crossMode=2,this.crossCycle=0,R===542)this.out.p1isaac(8);else if(R===6){if((_&3)===0)i.oplogic2++;if(i.oplogic2>=124)this.out.p1isaac(88),this.out.p4(0);this.out.p1isaac(27)}else if(R===963)this.out.p1isaac(113);else if(R===728)this.out.p1isaac(194);else if(R===245){if((_&3)===0)i.oplogic4++;if(i.oplogic4>=85)this.out.p1isaac(176),this.out.p2(39596);this.out.p1isaac(100)}this.out.p2(_)}}else if(R===217){if(this.localPlayer){if(!this.tryMove(this.localPlayer.routeFlagX[0],this.localPlayer.routeFlagZ[0],E,I,2,0,0,0,0,0,!1))this.tryMove(this.localPlayer.routeFlagX[0],this.localPlayer.routeFlagZ[0],E,I,2,1,1,0,0,0,!1);this.crossX=this.mouseClickX,this.crossY=this.mouseClickY,this.crossMode=2,this.crossCycle=0,this.out.p1isaac(239),this.out.p2(E+this.sceneBaseTileX),this.out.p2(I+this.sceneBaseTileZ),this.out.p2(_),this.out.p2(this.objInterface),this.out.p2(this.objSelectedSlot),this.out.p2(this.objSelectedInterface)}}else if(R===1175){let H=_>>14&32767,N=J0.get(H),O;if(!N.desc)O="It's a "+N.name+".";else O=N.desc;this.addMessage(0,O,"")}else if(R===285)this.interactWithLoc(245,E,I,_);else if(R===881){if(this.out.p1isaac(130),this.out.p2(_),this.out.p2(E),this.out.p2(I),this.out.p2(this.objInterface),this.out.p2(this.objSelectedSlot),this.out.p2(this.objSelectedInterface),this.selectedCycle=0,this.selectedInterface=I,this.selectedItem=E,this.selectedArea=2,r.instances[I].layer===this.viewportInterfaceId)this.selectedArea=1;if(r.instances[I].layer===this.chatInterfaceId)this.selectedArea=3}else if(R===391){if(this.out.p1isaac(48),this.out.p2(_),this.out.p2(E),this.out.p2(I),this.out.p2(this.activeSpellId),this.selectedCycle=0,this.selectedInterface=I,this.selectedItem=E,this.selectedArea=2,r.instances[I].layer===this.viewportInterfaceId)this.selectedArea=1;if(r.instances[I].layer===this.chatInterfaceId)this.selectedArea=3}else if(R===660)if(this.menuVisible)this.scene?.click(E-8,I-11);else this.scene?.click(this.mouseClickX-8,this.mouseClickY-11);else if(R===188){this.objSelected=1,this.objSelectedSlot=E,this.objSelectedInterface=I,this.objInterface=_,this.objSelectedName=E0.get(_).name,this.spellSelected=0;return}else if(R===44){if(!this.pressedContinueOption)this.out.p1isaac(235),this.out.p2(I),this.pressedContinueOption=!0}else if(R===1773){let H=E0.get(_),N;if(I>=1e5)N=I+" x "+H.name;else if(!H.desc)N="It's a "+H.name+".";else N=H.desc;this.addMessage(0,N,"")}else if(R===900){let H=this.npcs[_];if(H&&this.localPlayer)this.tryMove(this.localPlayer.routeFlagX[0],this.localPlayer.routeFlagZ[0],H.routeFlagX[0],H.routeFlagZ[0],2,1,1,0,0,0,!1),this.crossX=this.mouseClickX,this.crossY=this.mouseClickY,this.crossMode=2,this.crossCycle=0,this.out.p1isaac(202),this.out.p2(_),this.out.p2(this.objInterface),this.out.p2(this.objSelectedSlot),this.out.p2(this.objSelectedInterface)}else if(R===1373||R===1544||R===151||R===1101){let H=this.players[_];if(H&&this.localPlayer){if(this.tryMove(this.localPlayer.routeFlagX[0],this.localPlayer.routeFlagZ[0],H.routeFlagX[0],H.routeFlagZ[0],2,1,1,0,0,0,!1),this.crossX=this.mouseClickX,this.crossY=this.mouseClickY,this.crossMode=2,this.crossCycle=0,R===1101)this.out.p1isaac(164);else if(R===151){if(i.oplogic8++,i.oplogic8>=90)this.out.p1isaac(2),this.out.p2(31114);this.out.p1isaac(53)}else if(R===1373)this.out.p1isaac(206);else if(R===1544)this.out.p1isaac(185);this.out.p2(_)}}else if(R===265){let H=this.npcs[_];if(H&&this.localPlayer)this.tryMove(this.localPlayer.routeFlagX[0],this.localPlayer.routeFlagZ[0],H.routeFlagX[0],H.routeFlagZ[0],2,1,1,0,0,0,!1),this.crossX=this.mouseClickX,this.crossY=this.mouseClickY,this.crossMode=2,this.crossCycle=0,this.out.p1isaac(134),this.out.p2(_),this.out.p2(this.activeSpellId)}else if(R===679){let H=this.menuOption[A],N=H.indexOf("@whi@");if(N!==-1){let O=e.toBase37(H.substring(N+5).trim()),Q=-1;for(let U=0;U<this.friendCount;U++)if(this.friendName37[U]===O){Q=U;break}if(Q!==-1&&this.friendWorld[Q]>0)this.redrawChatback=!0,this.chatbackInputOpen=!1,this.showSocialInput=!0,this.socialInput="",this.socialAction=3,this.socialName37=this.friendName37[Q],this.socialMessage="Enter message to send to "+this.friendName[Q]}}else if(R===55){if(this.interactWithLoc(9,E,I,_))this.out.p2(this.activeSpellId)}else if(R===224||R===993||R===99||R===746||R===877){if(this.localPlayer){if(!this.tryMove(this.localPlayer.routeFlagX[0],this.localPlayer.routeFlagZ[0],E,I,2,0,0,0,0,0,!1))this.tryMove(this.localPlayer.routeFlagX[0],this.localPlayer.routeFlagZ[0],E,I,2,1,1,0,0,0,!1);if(this.crossX=this.mouseClickX,this.crossY=this.mouseClickY,this.crossMode=2,this.crossCycle=0,R===224)this.out.p1isaac(140);else if(R===746)this.out.p1isaac(178);else if(R===877)this.out.p1isaac(247);else if(R===99)this.out.p1isaac(200);else if(R===993)this.out.p1isaac(40);this.out.p2(E+this.sceneBaseTileX),this.out.p2(I+this.sceneBaseTileZ),this.out.p2(_)}}else if(R===1607){let H=this.npcs[_];if(H&&H.npcType){let N;if(!H.npcType.desc)N="It's a "+H.npcType.name+".";else N=H.npcType.desc;this.addMessage(0,N,"")}}else if(R===504)this.interactWithLoc(172,E,I,_);else if(R===930){let H=r.instances[I];this.spellSelected=1,this.activeSpellId=I,this.activeSpellFlags=H.actionTarget,this.objSelected=0;let N=H.actionVerb;if(N&&N.indexOf(" ")!==-1)N=N.substring(0,N.indexOf(" "));let O=H.actionVerb;if(O&&O.indexOf(" ")!==-1)O=O.substring(O.indexOf(" ")+1);if(this.spellCaption=N+" "+H.action+" "+O,this.activeSpellFlags===16)this.redrawSidebar=!0,this.selectedTab=3,this.redrawSideicons=!0;return}else if(R===951){let H=r.instances[I],N=!0;if(H.clientCode>0)N=this.handleInterfaceAction(H);if(N)this.out.p1isaac(155),this.out.p2(I)}else if(R===602||R===596||R===22||R===892||R===415){if(R===22)this.out.p1isaac(212);else if(R===415){if((I&3)===0)i.oplogic7++;if(i.oplogic7>=55)this.out.p1isaac(17),this.out.p4(0);this.out.p1isaac(6)}else if(R===602)this.out.p1isaac(31);else if(R===892){if((E&3)===0)i.oplogic9++;if(i.oplogic9>=130)this.out.p1isaac(238),this.out.p1(177);this.out.p1isaac(38)}else if(R===596)this.out.p1isaac(59);if(this.out.p2(_),this.out.p2(E),this.out.p2(I),this.selectedCycle=0,this.selectedInterface=I,this.selectedItem=E,this.selectedArea=2,r.instances[I].layer===this.viewportInterfaceId)this.selectedArea=1;if(r.instances[I].layer===this.chatInterfaceId)this.selectedArea=3}else if(R===581){if((_&3)===0)i.oplogic1++;if(i.oplogic1>=99)this.out.p1isaac(7),this.out.p4(0);this.interactWithLoc(97,E,I,_)}else if(R===965){if(this.localPlayer){if(!this.tryMove(this.localPlayer.routeFlagX[0],this.localPlayer.routeFlagZ[0],E,I,2,0,0,0,0,0,!1))this.tryMove(this.localPlayer.routeFlagX[0],this.localPlayer.routeFlagZ[0],E,I,2,1,1,0,0,0,!1);this.crossX=this.mouseClickX,this.crossY=this.mouseClickY,this.crossMode=2,this.crossCycle=0,this.out.p1isaac(138),this.out.p2(E+this.sceneBaseTileX),this.out.p2(I+this.sceneBaseTileZ),this.out.p2(_),this.out.p2(this.activeSpellId)}}else if(R===1501){if(i.oplogic6+=this.sceneBaseTileZ,i.oplogic6>=92)this.out.p1isaac(66),this.out.p4(0);this.interactWithLoc(116,E,I,_)}else if(R===364)this.interactWithLoc(96,E,I,_);else if(R===1102){let H=E0.get(_),N;if(!H.desc)N="It's a "+H.name+".";else N=H.desc;this.addMessage(0,N,"")}else if(R===960){this.out.p1isaac(155),this.out.p2(I);let H=r.instances[I];if(H.script&&H.script[0]&&H.script[0][0]===5){let N=H.script[0][1];if(H.scriptOperand&&this.varps[N]!==H.scriptOperand[0])this.varps[N]=H.scriptOperand[0],await this.updateVarp(N),this.redrawSidebar=!0}}else if(R===34){let H=this.menuOption[A],N=H.indexOf("@whi@");if(N!==-1){this.closeInterfaces(),this.reportAbuseInput=H.substring(N+5).trim(),this.reportAbuseMuteOption=!1;for(let O=0;O<r.instances.length;O++)if(r.instances[O]&&r.instances[O].clientCode===600){this.reportAbuseInterfaceID=this.viewportInterfaceId=r.instances[O].layer;break}}}else if(R===947)this.closeInterfaces();else if(R===367){let H=this.players[_];if(H&&this.localPlayer)this.tryMove(this.localPlayer.routeFlagX[0],this.localPlayer.routeFlagZ[0],H.routeFlagX[0],H.routeFlagZ[0],2,1,1,0,0,0,!1),this.crossX=this.mouseClickX,this.crossY=this.mouseClickY,this.crossMode=2,this.crossCycle=0,this.out.p1isaac(248),this.out.p2(_),this.out.p2(this.objInterface),this.out.p2(this.objSelectedSlot),this.out.p2(this.objSelectedInterface)}else if(R===465){this.out.p1isaac(155),this.out.p2(I);let H=r.instances[I];if(H.script&&H.script[0]&&H.script[0][0]===5){let N=H.script[0][1];this.varps[N]=1-this.varps[N],await this.updateVarp(N),this.redrawSidebar=!0}}else if(R===406||R===436||R===557||R===556){let H=this.menuOption[A],N=H.indexOf("@whi@");if(N!==-1){let O=e.toBase37(H.substring(N+5).trim());if(R===406)this.addFriend(O);else if(R===436)this.addIgnore(O);else if(R===557)this.removeFriend(O);else if(R===556)this.removeIgnore(O)}}else if(R===651){let H=this.players[_];if(H&&this.localPlayer)this.tryMove(this.localPlayer.routeFlagX[0],this.localPlayer.routeFlagZ[0],H.routeFlagX[0],H.routeFlagZ[0],2,1,1,0,0,0,!1),this.crossX=this.mouseClickX,this.crossY=this.mouseClickY,this.crossMode=2,this.crossCycle=0,this.out.p1isaac(177),this.out.p2(_),this.out.p2(this.activeSpellId)}this.objSelected=0,this.spellSelected=0}handleInterfaceAction(A){let R=A.clientCode;if(R===201)this.redrawChatback=!0,this.chatbackInputOpen=!1,this.showSocialInput=!0,this.socialInput="",this.socialAction=1,this.socialMessage="Enter name of friend to add to list";if(R===202)this.redrawChatback=!0,this.chatbackInputOpen=!1,this.showSocialInput=!0,this.socialInput="",this.socialAction=2,this.socialMessage="Enter name of friend to delete from list";if(R===205)return this.idleTimeout=250,!0;if(R===501)this.redrawChatback=!0,this.chatbackInputOpen=!1,this.showSocialInput=!0,this.socialInput="",this.socialAction=4,this.socialMessage="Enter name of player to add to list";if(R===502)this.redrawChatback=!0,this.chatbackInputOpen=!1,this.showSocialInput=!0,this.socialInput="",this.socialAction=5,this.socialMessage="Enter name of player to delete from list";if(R>=300&&R<=313){let _=(R-300)/2|0,E=R&1,I=this.designIdentikits[_];if(I!==-1)while(!0){if(E===0){if(I--,I<0)I=X0.totalCount-1}if(E===1){if(I++,I>=X0.totalCount)I=0}if(!X0.instances[I].disableKit&&X0.instances[I].bodyPart===_+(this.designGenderMale?0:7)){this.designIdentikits[_]=I,this.updateDesignModel=!0;break}}}if(R>=314&&R<=323){let _=(R-314)/2|0,E=R&1,I=this.designColors[_];if(E===0){if(I--,I<0)I=V0.DESIGN_IDK_COLORS[_].length-1}if(E===1){if(I++,I>=V0.DESIGN_IDK_COLORS[_].length)I=0}this.designColors[_]=I,this.updateDesignModel=!0}if(R===324&&!this.designGenderMale)this.designGenderMale=!0,this.validateCharacterDesign();if(R===325&&this.designGenderMale)this.designGenderMale=!1,this.validateCharacterDesign();if(R===326){this.out.p1isaac(52),this.out.p1(this.designGenderMale?0:1);for(let _=0;_<7;_++)this.out.p1(this.designIdentikits[_]);for(let _=0;_<5;_++)this.out.p1(this.designColors[_]);return!0}if(R===613)this.reportAbuseMuteOption=!this.reportAbuseMuteOption;if(R>=601&&R<=612){if(this.closeInterfaces(),this.reportAbuseInput.length>0)this.out.p1isaac(190),this.out.p8(e.toBase37(this.reportAbuseInput)),this.out.p1(R-601),this.out.p1(this.reportAbuseMuteOption?1:0)}return!1}validateCharacterDesign(){this.updateDesignModel=!0;for(let A=0;A<7;A++){this.designIdentikits[A]=-1;for(let R=0;R<X0.totalCount;R++)if(!X0.instances[R].disableKit&&X0.instances[R].bodyPart===A+(this.designGenderMale?0:7)){this.designIdentikits[A]=R;break}}}interactWithLoc(A,R,_,E){if(!this.localPlayer||!this.scene)return!1;let I=E>>14&32767,H=this.scene.getInfo(this.currentLevel,R,_,E);if(H===-1)return!1;let N=H&31,O=H>>6&3;if(N===D.CENTREPIECE_STRAIGHT.id||N===D.CENTREPIECE_DIAGONAL.id||N===D.GROUND_DECOR.id){let Q=J0.get(I),U,G;if(O===0||O===2)U=Q.width,G=Q.length;else U=Q.length,G=Q.width;let $=Q.forceapproach;if(O!==0)$=($<<O&15)+($>>4-O);this.tryMove(this.localPlayer.routeFlagX[0],this.localPlayer.routeFlagZ[0],R,_,2,U,G,0,0,$,!1)}else this.tryMove(this.localPlayer.routeFlagX[0],this.localPlayer.routeFlagZ[0],R,_,2,0,0,O,N+1,0,!1);return this.crossX=this.mouseClickX,this.crossY=this.mouseClickY,this.crossMode=2,this.crossCycle=0,this.out.p1isaac(A),this.out.p2(R+this.sceneBaseTileX),this.out.p2(_+this.sceneBaseTileZ),this.out.p2(I),!0}handleTabInput(){if(this.mouseClickButton===1){if(this.mouseClickX>=549&&this.mouseClickX<=583&&this.mouseClickY>=195&&this.mouseClickY<231&&this.tabInterfaceId[0]!==-1)this.redrawSidebar=!0,this.selectedTab=0,this.redrawSideicons=!0;else if(this.mouseClickX>=579&&this.mouseClickX<=609&&this.mouseClickY>=194&&this.mouseClickY<231&&this.tabInterfaceId[1]!==-1)this.redrawSidebar=!0,this.selectedTab=1,this.redrawSideicons=!0;else if(this.mouseClickX>=607&&this.mouseClickX<=637&&this.mouseClickY>=194&&this.mouseClickY<231&&this.tabInterfaceId[2]!==-1)this.redrawSidebar=!0,this.selectedTab=2,this.redrawSideicons=!0;else if(this.mouseClickX>=635&&this.mouseClickX<=679&&this.mouseClickY>=194&&this.mouseClickY<229&&this.tabInterfaceId[3]!==-1)this.redrawSidebar=!0,this.selectedTab=3,this.redrawSideicons=!0;else if(this.mouseClickX>=676&&this.mouseClickX<=706&&this.mouseClickY>=194&&this.mouseClickY<231&&this.tabInterfaceId[4]!==-1)this.redrawSidebar=!0,this.selectedTab=4,this.redrawSideicons=!0;else if(this.mouseClickX>=704&&this.mouseClickX<=734&&this.mouseClickY>=194&&this.mouseClickY<231&&this.tabInterfaceId[5]!==-1)this.redrawSidebar=!0,this.selectedTab=5,this.redrawSideicons=!0;else if(this.mouseClickX>=732&&this.mouseClickX<=766&&this.mouseClickY>=195&&this.mouseClickY<231&&this.tabInterfaceId[6]!==-1)this.redrawSidebar=!0,this.selectedTab=6,this.redrawSideicons=!0;else if(this.mouseClickX>=550&&this.mouseClickX<=584&&this.mouseClickY>=492&&this.mouseClickY<528&&this.tabInterfaceId[7]!==-1)this.redrawSidebar=!0,this.selectedTab=7,this.redrawSideicons=!0;else if(this.mouseClickX>=582&&this.mouseClickX<=612&&this.mouseClickY>=492&&this.mouseClickY<529&&this.tabInterfaceId[8]!==-1)this.redrawSidebar=!0,this.selectedTab=8,this.redrawSideicons=!0;else if(this.mouseClickX>=609&&this.mouseClickX<=639&&this.mouseClickY>=492&&this.mouseClickY<529&&this.tabInterfaceId[9]!==-1)this.redrawSidebar=!0,this.selectedTab=9,this.redrawSideicons=!0;else if(this.mouseClickX>=637&&this.mouseClickX<=681&&this.mouseClickY>=493&&this.mouseClickY<528&&this.tabInterfaceId[10]!==-1)this.redrawSidebar=!0,this.selectedTab=10,this.redrawSideicons=!0;else if(this.mouseClickX>=679&&this.mouseClickX<=709&&this.mouseClickY>=492&&this.mouseClickY<529&&this.tabInterfaceId[11]!==-1)this.redrawSidebar=!0,this.selectedTab=11,this.redrawSideicons=!0;else if(this.mouseClickX>=706&&this.mouseClickX<=736&&this.mouseClickY>=492&&this.mouseClickY<529&&this.tabInterfaceId[12]!==-1)this.redrawSidebar=!0,this.selectedTab=12,this.redrawSideicons=!0;else if(this.mouseClickX>=734&&this.mouseClickX<=768&&this.mouseClickY>=492&&this.mouseClickY<528&&this.tabInterfaceId[13]!==-1)this.redrawSidebar=!0,this.selectedTab=13,this.redrawSideicons=!0;if(i.cyclelogic1++,i.cyclelogic1>150)i.cyclelogic1=0,this.out.p1isaac(233),this.out.p1(43)}}async handleInputKey(){while(!0){let A;do while(!0){if(A=this.pollKey(),A===-1)return;if(this.viewportInterfaceId!==-1&&this.viewportInterfaceId===this.reportAbuseInterfaceID){if(A===8&&this.reportAbuseInput.length>0)this.reportAbuseInput=this.reportAbuseInput.substring(0,this.reportAbuseInput.length-1);break}if(this.showSocialInput){if(A>=32&&A<=122&&this.socialInput.length<80)this.socialInput=this.socialInput+String.fromCharCode(A),this.redrawChatback=!0;if(A===8&&this.socialInput.length>0)this.socialInput=this.socialInput.substring(0,this.socialInput.length-1),this.redrawChatback=!0;if(A===13||A===10){this.showSocialInput=!1,this.redrawChatback=!0;let R;if(this.socialAction===1)R=e.toBase37(this.socialInput),this.addFriend(R);if(this.socialAction===2&&this.friendCount>0)R=e.toBase37(this.socialInput),this.removeFriend(R);if(this.socialAction===3&&this.socialInput.length>0&&this.socialName37){this.out.p1isaac(148),this.out.p1(0);let _=this.out.pos;if(this.out.p8(this.socialName37),o0.pack(this.out,this.socialInput),this.out.psize1(this.out.pos-_),this.socialInput=e.toSentenceCase(this.socialInput),this.socialInput=y0.filter(this.socialInput),this.addMessage(6,this.socialInput,e.formatName(e.fromBase37(this.socialName37))),this.privateChatSetting===2)this.privateChatSetting=1,this.redrawPrivacySettings=!0,this.out.p1isaac(244),this.out.p1(this.publicChatSetting),this.out.p1(this.privateChatSetting),this.out.p1(this.tradeChatSetting)}if(this.socialAction===4&&this.ignoreCount<100)R=e.toBase37(this.socialInput),this.addIgnore(R);if(this.socialAction===5&&this.ignoreCount>0)R=e.toBase37(this.socialInput),this.removeIgnore(R)}}else if(this.chatbackInputOpen){if(A>=48&&A<=57&&this.chatbackInput.length<10)this.chatbackInput=this.chatbackInput+String.fromCharCode(A),this.redrawChatback=!0;if(A===8&&this.chatbackInput.length>0)this.chatbackInput=this.chatbackInput.substring(0,this.chatbackInput.length-1),this.redrawChatback=!0;if(A===13||A===10){if(this.chatbackInput.length>0){let R=0;try{R=parseInt(this.chatbackInput,10)}catch(_){}this.out.p1isaac(237),this.out.p4(R)}this.chatbackInputOpen=!1,this.redrawChatback=!0}}else if(this.chatInterfaceId===-1){if(A>=32&&(A<=122||this.chatTyped.startsWith("::")&&A<=126)&&this.chatTyped.length<80)this.chatTyped=this.chatTyped+String.fromCharCode(A),this.redrawChatback=!0;if(A===8&&this.chatTyped.length>0)this.chatTyped=this.chatTyped.substring(0,this.chatTyped.length-1),this.redrawChatback=!0;if((A===13||A===10)&&this.chatTyped.length>0){if(this.chatTyped.startsWith("::"))if(this.chatTyped==="::fpson")this.drawStats.dom.style.display="block",this.updateStats.dom.style.display="block";else if(this.chatTyped==="::fpsoff")this.drawStats.dom.style.display="none",this.updateStats.dom.style.display="none";else if(this.chatTyped==="::tk0"){if(C.renderer)C.resetRenderer(),this.redrawChatback=!0,this.redrawPrivacySettings=!0,this.redrawSidebar=!0,this.redrawSideicons=!0,this.redrawTitleBackground=!0}else if(this.chatTyped==="::tk1")try{if(C.renderer=await l0.init(C0,this.width,this.height),!C.renderer)this.addMessage(0,"Failed to change renderer","")}catch(R){if(R instanceof Error)this.addMessage(0,"Error enabling renderer: "+R.message,"")}else if(this.chatTyped==="::tk2")try{if(C.renderer=y6.init(C0,this.width,this.height),!C.renderer)this.addMessage(0,"Failed to change renderer","")}catch(R){if(R instanceof Error)this.addMessage(0,"Error enabling renderer: "+R.message,"")}else if(this.chatTyped==="::tk3")try{if(C.renderer=z.init(C0,this.width,this.height),z.onSceneLoaded(this.scene),z.setBrightness(0.8),!C.renderer)this.addMessage(0,"Failed to change renderer","")}catch(R){if(R instanceof Error)this.addMessage(0,"Error enabling renderer: "+R.message,"")}else this.out.p1isaac(4),this.out.p1(this.chatTyped.length-1),this.out.pjstr(this.chatTyped.substring(2));else{let R=0;if(this.chatTyped.startsWith("yellow:"))R=0,this.chatTyped=this.chatTyped.substring(7);else if(this.chatTyped.startsWith("red:"))R=1,this.chatTyped=this.chatTyped.substring(4);else if(this.chatTyped.startsWith("green:"))R=2,this.chatTyped=this.chatTyped.substring(6);else if(this.chatTyped.startsWith("cyan:"))R=3,this.chatTyped=this.chatTyped.substring(5);else if(this.chatTyped.startsWith("purple:"))R=4,this.chatTyped=this.chatTyped.substring(7);else if(this.chatTyped.startsWith("white:"))R=5,this.chatTyped=this.chatTyped.substring(6);else if(this.chatTyped.startsWith("flash1:"))R=6,this.chatTyped=this.chatTyped.substring(7);else if(this.chatTyped.startsWith("flash2:"))R=7,this.chatTyped=this.chatTyped.substring(7);else if(this.chatTyped.startsWith("flash3:"))R=8,this.chatTyped=this.chatTyped.substring(7);else if(this.chatTyped.startsWith("glow1:"))R=9,this.chatTyped=this.chatTyped.substring(6);else if(this.chatTyped.startsWith("glow2:"))R=10,this.chatTyped=this.chatTyped.substring(6);else if(this.chatTyped.startsWith("glow3:"))R=11,this.chatTyped=this.chatTyped.substring(6);let _=0;if(this.chatTyped.startsWith("wave:"))_=1,this.chatTyped=this.chatTyped.substring(5);if(this.chatTyped.startsWith("scroll:"))_=2,this.chatTyped=this.chatTyped.substring(7);this.out.p1isaac(158),this.out.p1(0);let E=this.out.pos;if(this.out.p1(R),this.out.p1(_),o0.pack(this.out,this.chatTyped),this.out.psize1(this.out.pos-E),this.chatTyped=e.toSentenceCase(this.chatTyped),this.chatTyped=y0.filter(this.chatTyped),this.localPlayer&&this.localPlayer.name)this.localPlayer.chat=this.chatTyped,this.localPlayer.chatColor=R,this.localPlayer.chatStyle=_,this.localPlayer.chatTimer=150,this.addMessage(2,this.localPlayer.chat,this.localPlayer.name);if(this.publicChatSetting===2)this.publicChatSetting=3,this.redrawPrivacySettings=!0,this.out.p1isaac(244),this.out.p1(this.publicChatSetting),this.out.p1(this.privateChatSetting),this.out.p1(this.tradeChatSetting)}this.chatTyped="",this.redrawChatback=!0}}}while((A<97||A>122)&&(A<65||A>90)&&(A<48||A>57)&&A!==32);if(this.reportAbuseInput.length<12)this.reportAbuseInput=this.reportAbuseInput+String.fromCharCode(A)}}handleChatSettingsInput(){if(this.mouseClickButton===1){if(this.mouseClickX>=8&&this.mouseClickX<=108&&this.mouseClickY>=490&&this.mouseClickY<=522)this.publicChatSetting=(this.publicChatSetting+1)%4,this.redrawPrivacySettings=!0,this.redrawChatback=!0,this.out.p1isaac(244),this.out.p1(this.publicChatSetting),this.out.p1(this.privateChatSetting),this.out.p1(this.tradeChatSetting);else if(this.mouseClickX>=137&&this.mouseClickX<=237&&this.mouseClickY>=490&&this.mouseClickY<=522)this.privateChatSetting=(this.privateChatSetting+1)%3,this.redrawPrivacySettings=!0,this.redrawChatback=!0,this.out.p1isaac(244),this.out.p1(this.publicChatSetting),this.out.p1(this.privateChatSetting),this.out.p1(this.tradeChatSetting);else if(this.mouseClickX>=275&&this.mouseClickX<=375&&this.mouseClickY>=490&&this.mouseClickY<=522)this.tradeChatSetting=(this.tradeChatSetting+1)%3,this.redrawPrivacySettings=!0,this.redrawChatback=!0,this.out.p1isaac(244),this.out.p1(this.publicChatSetting),this.out.p1(this.privateChatSetting),this.out.p1(this.tradeChatSetting);else if(this.mouseClickX>=416&&this.mouseClickX<=516&&this.mouseClickY>=490&&this.mouseClickY<=522){this.closeInterfaces(),this.reportAbuseInput="",this.reportAbuseMuteOption=!1;for(let A=0;A<r.instances.length;A++)if(r.instances[A]&&r.instances[A].clientCode===600){this.reportAbuseInterfaceID=this.viewportInterfaceId=r.instances[A].layer;return}}}}handleScrollInput(A,R,_,E,I,H,N,O){if(this.scrollGrabbed)this.scrollInputPadding=32;else this.scrollInputPadding=0;if(this.scrollGrabbed=!1,A>=H&&A<H+16&&R>=N&&R<N+16){if(O.scrollPosition-=this.dragCycles*4,I)this.redrawSidebar=!0}else if(A>=H&&A<H+16&&R>=N+E-16&&R<N+E){if(O.scrollPosition+=this.dragCycles*4,I)this.redrawSidebar=!0}else if(A>=H-this.scrollInputPadding&&A<H+this.scrollInputPadding+16&&R>=N+16&&R<N+E-16&&this.dragCycles>0){let Q=(E-32)*E/_|0;if(Q<8)Q=8;let U=R-N-(Q/2|0)-16,G=E-Q-32;if(O.scrollPosition=(_-E)*U/G|0,I)this.redrawSidebar=!0;this.scrollGrabbed=!0}}prepareGameScreen(){if(!this.areaChatback)this.unloadTitle(),this.drawArea=null,this.imageTitle2=null,this.imageTitle3=null,this.imageTitle4=null,this.imageTitle0=null,this.imageTitle1=null,this.imageTitle5=null,this.imageTitle6=null,this.imageTitle7=null,this.imageTitle8=null,this.areaChatback=new O0(479,96),this.areaMapback=new O0(168,160),k.clear(),this.imageMapback?.draw(0,0),this.areaSidebar=new O0(190,261),this.areaViewport=z.areaViewport=new O0(512,334),k.clear(),this.areaBackbase1=new O0(501,61),this.areaBackbase2=new O0(288,40),this.areaBackhmid1=new O0(269,66),this.redrawTitleBackground=!0}isFriend(A){if(!A)return!1;for(let R=0;R<this.friendCount;R++)if(A.toLowerCase()===this.friendName[R]?.toLowerCase())return!0;if(!this.localPlayer)return!1;return A.toLowerCase()===this.localPlayer.name?.toLowerCase()}addFriend(A){if(A===0n)return;if(this.friendCount>=100){this.addMessage(0,"Your friends list is full. Max of 100 hit","");return}let R=e.formatName(e.fromBase37(A));for(let _=0;_<this.friendCount;_++)if(this.friendName37[_]===A){this.addMessage(0,R+" is already on your friend list","");return}for(let _=0;_<this.ignoreCount;_++)if(this.ignoreName37[_]===A){this.addMessage(0,"Please remove "+R+" from your ignore list first","");return}if(!this.localPlayer||!this.localPlayer.name)return;if(R!==this.localPlayer.name)this.friendName[this.friendCount]=R,this.friendName37[this.friendCount]=A,this.friendWorld[this.friendCount]=0,this.friendCount++,this.redrawSidebar=!0,this.out.p1isaac(118),this.out.p8(A)}removeFriend(A){if(A===0n)return;for(let R=0;R<this.friendCount;R++)if(this.friendName37[R]===A){this.friendCount--,this.redrawSidebar=!0;for(let _=R;_<this.friendCount;_++)this.friendName[_]=this.friendName[_+1],this.friendWorld[_]=this.friendWorld[_+1],this.friendName37[_]=this.friendName37[_+1];this.out.p1isaac(11),this.out.p8(A);return}}addIgnore(A){if(A===0n)return;if(this.ignoreCount>=100){this.addMessage(0,"Your ignore list is full. Max of 100 hit","");return}let R=e.formatName(e.fromBase37(A));for(let _=0;_<this.ignoreCount;_++)if(this.ignoreName37[_]===A){this.addMessage(0,R+" is already on your ignore list","");return}for(let _=0;_<this.friendCount;_++)if(this.friendName37[_]===A){this.addMessage(0,"Please remove "+R+" from your friend list first","");return}this.ignoreName37[this.ignoreCount++]=A,this.redrawSidebar=!0,this.out.p1isaac(79),this.out.p8(A)}removeIgnore(A){if(A===0n)return;for(let R=0;R<this.ignoreCount;R++)if(this.ignoreName37[R]===A){this.ignoreCount--,this.redrawSidebar=!0;for(let _=R;_<this.ignoreCount;_++)this.ignoreName37[_]=this.ignoreName37[_+1];this.out.p1isaac(171),this.out.p8(A);return}}sortObjStacks(A,R){let _=this.objStacks[this.currentLevel][A][R];if(!_){this.scene?.removeObjStack(this.currentLevel,A,R);return}let E=-99999999,I=null;for(let J=_.head();J;J=_.next()){let q=E0.get(J.index),V=q.cost;if(q.stackable)V*=J.count+1;if(V>E)E=V,I=J}if(!I)return;_.addHead(I);let H=-1,N=-1,O=0,Q=0;for(let J=_.head();J;J=_.next()){if(J.index!==I.index&&H===-1)H=J.index,O=J.count;if(J.index!==I.index&&J.index!==H&&N===-1)N=J.index,Q=J.count}let U=null;if(H!==-1)U=E0.get(H).getInterfaceModel(O);let G=null;if(N!==-1)G=E0.get(N).getInterfaceModel(Q);let $=A+(R<<7)+1610612736|0,L=E0.get(I.index);this.scene?.addObjStack(A,R,this.getHeightmapY(this.currentLevel,A*128+64,R*128+64),this.currentLevel,$,L.getInterfaceModel(I.count),G,U)}addLoc(A,R,_,E,I,H,N){if(R<1||_<1||R>102||_>102)return;if(i.lowMemory&&A!==this.currentLevel)return;if(!this.scene)return;let O=0;if(N===0)O=this.scene.getWallTypecode(A,R,_);else if(N===1)O=this.scene.getDecorTypecode(A,_,R);else if(N===2)O=this.scene.getLocTypecode(A,R,_);else if(N===3)O=this.scene.getGroundDecorTypecode(A,R,_);if(O!==0){let Q=this.scene.getInfo(A,R,_,O),U=O>>14&32767,G=Q&31,$=Q>>6;if(N===0){this.scene?.removeWall(A,R,_,1);let L=J0.get(U);if(L.blockwalk)this.levelCollisionMap[A]?.removeWall(R,_,G,$,L.blockrange)}else if(N===1)this.scene?.removeWallDecoration(A,R,_);else if(N===2){this.scene.removeLoc(A,R,_);let L=J0.get(U);if(R+L.width>104-1||_+L.width>104-1||R+L.length>104-1||_+L.length>104-1)return;if(L.blockwalk)this.levelCollisionMap[A]?.removeLoc(R,_,L.width,L.length,$,L.blockrange)}else if(N===3){this.scene?.removeGroundDecoration(A,R,_);let L=J0.get(U);if(L.blockwalk&&L.locActive)this.levelCollisionMap[A]?.removeFloor(R,_)}}if(E>=0){let Q=A;if(this.levelTileFlags&&A<3&&(this.levelTileFlags[1][R][_]&2)===2)Q=A+1;if(this.levelHeightmap)l.addLoc(A,R,_,this.scene,this.levelHeightmap,this.locList,this.levelCollisionMap[A],E,H,I,Q)}}closeInterfaces(){if(this.out.p1isaac(231),this.sidebarInterfaceId!==-1)this.sidebarInterfaceId=-1,this.redrawSidebar=!0,this.pressedContinueOption=!1,this.redrawSideicons=!0;if(this.chatInterfaceId!==-1)this.chatInterfaceId=-1,this.redrawChatback=!0,this.pressedContinueOption=!1;this.viewportInterfaceId=-1}async tryReconnect(){if(this.idleTimeout>0)await this.logout();else if(this.areaViewport?.bind(),this.fontPlain12?.drawStringCenter(257,144,"Connection lost",0),this.fontPlain12?.drawStringCenter(256,143,"Connection lost",16777215),this.fontPlain12?.drawStringCenter(257,159,"Please wait - attempting to reestablish",0),this.fontPlain12?.drawStringCenter(256,158,"Please wait - attempting to reestablish",16777215),this.areaViewport?.draw(8,11),this.flagSceneTileX=0,this.netStream?.close(),this.ingame=!1,await this.tryLogin(this.usernameInput,this.passwordInput,!0),!this.ingame)await this.logout()}async logout(){if(this.netStream)this.netStream.close();this.netStream=null,this.ingame=!1,this.titleScreenState=0,this.usernameInput="",this.passwordInput="",q0.setDisabled(),this.clearCaches(),this.scene?.reset();for(let A=0;A<4;A++)this.levelCollisionMap[A]?.reset();b8(!1),this.currentMidi=null,this.nextMusicDelay=0}async read(){if(!this.netStream)return!1;try{let A=this.netStream.available;if(A===0)return!1;if(this.inPacketType===-1){if(await this.netStream.readBytes(this.in.data,0,1),this.inPacketType=this.in.data[0]&255,this.randomIn)this.inPacketType=this.inPacketType-this.randomIn.nextInt&255;this.inPacketSize=k8[this.inPacketType],A--}if(this.inPacketSize===-1){if(A<=0)return!1;await this.netStream.readBytes(this.in.data,0,1),this.inPacketSize=this.in.data[0]&255,A--}if(this.inPacketSize===-2){if(A<=1)return!1;await this.netStream.readBytes(this.in.data,0,2),this.in.pos=0,this.inPacketSize=this.in.g2(),A-=2}if(A<this.inPacketSize)return!1;if(this.in.pos=0,await this.netStream.readBytes(this.in.data,0,this.inPacketSize),this.idleNetCycles=0,this.lastPacketType2=this.lastPacketType1,this.lastPacketType1=this.lastPacketType0,this.lastPacketType0=this.inPacketType,this.inPacketType===150){let R=this.in.g2(),_=this.in.g1b();if(this.varCache[R]=_,this.varps[R]!==_){if(this.varps[R]=_,await this.updateVarp(R),this.redrawSidebar=!0,this.stickyChatInterfaceId!==-1)this.redrawChatback=!0}return this.inPacketType=-1,!0}if(this.inPacketType===152){let R=this.in.g8(),_=this.in.g1(),E=e.formatName(e.fromBase37(R));for(let H=0;H<this.friendCount;H++)if(R===this.friendName37[H]){if(this.friendWorld[H]!==_){if(this.friendWorld[H]=_,this.redrawSidebar=!0,_>0)this.addMessage(5,E+" has logged in.","");if(_===0)this.addMessage(5,E+" has logged out.","")}E=null;break}if(E&&this.friendCount<100)this.friendName37[this.friendCount]=R,this.friendName[this.friendCount]=E,this.friendWorld[this.friendCount]=_,this.friendCount++,this.redrawSidebar=!0;let I=!1;while(!I){I=!0;for(let H=0;H<this.friendCount-1;H++)if(this.friendWorld[H]!==i.nodeId&&this.friendWorld[H+1]===i.nodeId||this.friendWorld[H]===0&&this.friendWorld[H+1]!==0){let N=this.friendWorld[H];this.friendWorld[H]=this.friendWorld[H+1],this.friendWorld[H+1]=N;let O=this.friendName[H];this.friendName[H]=this.friendName[H+1],this.friendName[H+1]=O;let Q=this.friendName37[H];this.friendName37[H]=this.friendName37[H+1],this.friendName37[H+1]=Q,this.redrawSidebar=!0,I=!1}}return this.inPacketType=-1,!0}if(this.inPacketType===43)return this.systemUpdateTimer=this.in.g2()*30,this.inPacketType=-1,!0;if(this.inPacketType===80){let R=this.in.g1(),_=this.in.g1();if(this.sceneMapIndex&&this.sceneMapLandData&&this.sceneMapLandReady){let E=-1;for(let I=0;I<this.sceneMapIndex.length;I++)if(this.sceneMapIndex[I]===(R<<8)+_)E=I;if(E!==-1)this.db?.cachesave(`m${R}_${_}`,this.sceneMapLandData[E]),this.sceneMapLandReady[E]=!0}return this.inPacketType=-1,!0}if(this.inPacketType===1)return this.readNpcInfo(this.in,this.inPacketSize),this.inPacketType=-1,!0;if(this.inPacketType===237){let R=this.in.g2(),_=this.in.g2();if(this.sceneCenterZoneX===R&&this.sceneCenterZoneZ===_&&this.sceneState!==0)return this.inPacketType=-1,!0;this.sceneCenterZoneX=R,this.sceneCenterZoneZ=_,this.sceneBaseTileX=(this.sceneCenterZoneX-6)*8,this.sceneBaseTileZ=(this.sceneCenterZoneZ-6)*8,this.sceneState=1,this.areaViewport?.bind(),this.fontPlain12?.drawStringCenter(257,151,"Loading - please wait.",0),this.fontPlain12?.drawStringCenter(256,150,"Loading - please wait.",16777215),this.areaViewport?.draw(8,11);let E=(this.inPacketSize-2)/10|0;this.sceneMapLandData=new p(E,null),this.sceneMapLandReady=new p(E,!1),this.sceneMapLocData=new p(E,null),this.sceneMapLocReady=new p(E,!1),this.sceneMapIndex=new Int32Array(E),this.out.p1isaac(150),this.out.p1(0);let I=0;for(let J=0;J<E;J++){let q=this.in.g1(),V=this.in.g1(),B=this.in.g4(),F=this.in.g4();this.sceneMapIndex[J]=(q<<8)+V;let b;if(B!==0){if(b=await this.db?.cacheload(`m${q}_${V}`),b&&s.crc32(b)!==B)b=void 0;if(!b)this.out.p1(0),this.out.p1(q),this.out.p1(V),I+=3;else this.sceneMapLandData[J]=b,this.sceneMapLandReady[J]=!0}else this.sceneMapLandReady[J]=!0;if(F!==0){if(b=await this.db?.cacheload(`l${q}_${V}`),b&&s.crc32(b)!==F)b=void 0;if(!b)this.out.p1(1),this.out.p1(q),this.out.p1(V),I+=3;else this.sceneMapLocData[J]=b,this.sceneMapLocReady[J]=!0}else this.sceneMapLocReady[J]=!0}if(this.out.psize1(I),this.areaViewport?.bind(),this.sceneState===0)this.fontPlain12?.drawStringCenter(257,166,"Map area updated since last visit, so load will take longer this time only",0),this.fontPlain12?.drawStringCenter(256,165,"Map area updated since last visit, so load will take longer this time only",16777215);this.areaViewport?.draw(8,11);let H=this.sceneBaseTileX-this.scenePrevBaseTileX,N=this.sceneBaseTileZ-this.scenePrevBaseTileZ;this.scenePrevBaseTileX=this.sceneBaseTileX,this.scenePrevBaseTileZ=this.sceneBaseTileZ;for(let J=0;J<8192;J++){let q=this.npcs[J];if(q){for(let V=0;V<10;V++)q.routeFlagX[V]-=H,q.routeFlagZ[V]-=N;q.x-=H*128,q.z-=N*128}}for(let J=0;J<2048;J++){let q=this.players[J];if(q){for(let V=0;V<10;V++)q.routeFlagX[V]-=H,q.routeFlagZ[V]-=N;q.x-=H*128,q.z-=N*128}}this.sceneAwaitingSync=!0;let O=0,Q=104,U=1;if(H<0)O=104-1,Q=-1,U=-1;let G=0,$=104,L=1;if(N<0)G=104-1,$=-1,L=-1;for(let J=O;J!==Q;J+=U)for(let q=G;q!==$;q+=L){let V=J+H,B=q+N;for(let F=0;F<4;F++)if(V>=0&&B>=0&&V<104&&B<104)this.objStacks[F][J][q]=this.objStacks[F][V][B];else this.objStacks[F][J][q]=null}for(let J=this.addedLocs.head();J;J=this.addedLocs.next())if(J.x-=H,J.z-=N,J.x<0||J.z<0||J.x>=104||J.z>=104)J.unlink();if(this.flagSceneTileX!==0)this.flagSceneTileX-=H,this.flagSceneTileZ-=N;return this.cutscene=!1,this.inPacketType=-1,!0}if(this.inPacketType===197)return r.instances[this.in.g2()].model=this.localPlayer?.getHeadModel()||null,this.inPacketType=-1,!0;if(this.inPacketType===25){if(this.hintType=this.in.g1(),this.hintType===1)this.hintNpc=this.in.g2();if(this.hintType>=2&&this.hintType<=6){if(this.hintType===2)this.hintOffsetX=64,this.hintOffsetZ=64;if(this.hintType===3)this.hintOffsetX=0,this.hintOffsetZ=64;if(this.hintType===4)this.hintOffsetX=128,this.hintOffsetZ=64;if(this.hintType===5)this.hintOffsetX=64,this.hintOffsetZ=0;if(this.hintType===6)this.hintOffsetX=64,this.hintOffsetZ=128;this.hintType=2,this.hintTileX=this.in.g2(),this.hintTileZ=this.in.g2(),this.hintHeight=this.in.g1()}if(this.hintType===10)this.hintPlayer=this.in.g2();return this.inPacketType=-1,!0}if(this.inPacketType===54){let R=this.in.gjstr(),_=this.in.g4(),E=this.in.g4();if(R!==this.currentMidi&&this.midiActive&&!i.lowMemory)await this.setMidi(R,_,E,!0);return this.currentMidi=R,this.midiCrc=_,this.midiSize=E,this.nextMusicDelay=0,this.inPacketType=-1,!0}if(this.inPacketType===142)return await this.logout(),this.inPacketType=-1,!1;if(this.inPacketType===20){let R=this.in.g1(),_=this.in.g1();if(this.sceneMapIndex&&this.sceneMapLocData&&this.sceneMapLocReady){let E=-1;for(let I=0;I<this.sceneMapIndex.length;I++)if(this.sceneMapIndex[I]===(R<<8)+_)E=I;if(E!==-1)this.db?.cachesave(`l${R}_${_}`,this.sceneMapLocData[E]),this.sceneMapLocReady[E]=!0}return this.inPacketType=-1,!0}if(this.inPacketType===19)return this.flagSceneTileX=0,this.inPacketType=-1,!0;if(this.inPacketType===139)return this.localPid=this.in.g2(),this.inPacketType=-1,!0;if(this.inPacketType===151||this.inPacketType===23||this.inPacketType===50||this.inPacketType===191||this.inPacketType===69||this.inPacketType===49||this.inPacketType===223||this.inPacketType===42||this.inPacketType===76||this.inPacketType===59)return this.readZonePacket(this.in,this.inPacketType),this.inPacketType=-1,!0;if(this.inPacketType===28){let R=this.in.g2(),_=this.in.g2();if(this.chatInterfaceId!==-1)this.chatInterfaceId=-1,this.redrawChatback=!0;if(this.chatbackInputOpen)this.chatbackInputOpen=!1,this.redrawChatback=!0;return this.viewportInterfaceId=R,this.sidebarInterfaceId=_,this.redrawSidebar=!0,this.redrawSideicons=!0,this.pressedContinueOption=!1,this.inPacketType=-1,!0}if(this.inPacketType===175){let R=this.in.g2(),_=this.in.g4();if(this.varCache[R]=_,this.varps[R]!==_){if(this.varps[R]=_,await this.updateVarp(R),this.redrawSidebar=!0,this.stickyChatInterfaceId!==-1)this.redrawChatback=!0}return this.inPacketType=-1,!0}if(this.inPacketType===146){let R=this.in.g2();return r.instances[R].anim=this.in.g2(),this.inPacketType=-1,!0}if(this.inPacketType===167){let R=this.in.g2(),_=this.in.g1();if(R===65535)R=-1;return this.tabInterfaceId[_]=R,this.redrawSidebar=!0,this.redrawSideicons=!0,this.inPacketType=-1,!0}if(this.inPacketType===220){let R=this.in.g1(),_=this.in.g1(),E=this.in.g2(),I=this.in.g2(),H=-1;if(this.sceneMapIndex){for(let N=0;N<this.sceneMapIndex.length;N++)if(this.sceneMapIndex[N]===(R<<8)+_)H=N}if(H!==-1&&this.sceneMapLocData){if(!this.sceneMapLocData[H]||this.sceneMapLocData[H]?.length!==I)this.sceneMapLocData[H]=new Uint8Array(I);let N=this.sceneMapLocData[H];if(N)this.in.gdata(this.inPacketSize-6,E,N)}return this.inPacketType=-1,!0}if(this.inPacketType===133){let R=q0.stop();if(R)this.out.p1isaac(81),this.out.p2(R.pos),this.out.pdata(R.data,R.pos,0),R.release();return this.inPacketType=-1,!0}if(this.inPacketType===98){this.redrawSidebar=!0;let R=this.in.g2(),_=r.instances[R],E=this.in.g1();if(_.invSlotObjId&&_.invSlotObjCount){for(let I=0;I<E;I++){_.invSlotObjId[I]=this.in.g2();let H=this.in.g1();if(H===255)H=this.in.g4();_.invSlotObjCount[I]=H}for(let I=E;I<_.invSlotObjId.length;I++)_.invSlotObjId[I]=0,_.invSlotObjCount[I]=0}else for(let I=0;I<E;I++)if(this.in.g2(),this.in.g1()===255)this.in.g4();return this.inPacketType=-1,!0}if(this.inPacketType===226)return q0.setEnabled(),this.inPacketType=-1,!0;if(this.inPacketType===243){if(this.showSocialInput=!1,this.chatbackInputOpen=!0,this.chatbackInput="",this.redrawChatback=!0,this.inPacketType=-1,this.isMobile)T8.show();return!0}if(this.inPacketType===15){let R=r.instances[this.in.g2()];if(R.invSlotObjId)for(let _=0;_<R.invSlotObjId.length;_++)R.invSlotObjId[_]=-1,R.invSlotObjId[_]=0;return this.inPacketType=-1,!0}if(this.inPacketType===140){if(this.lastAddress=this.in.g4(),this.daysSinceLastLogin=this.in.g2(),this.daysSinceRecoveriesChanged=this.in.g1(),this.unreadMessages=this.in.g2(),this.lastAddress!==0&&this.viewportInterfaceId===-1){this.closeInterfaces();let R=650;if(this.daysSinceRecoveriesChanged!==201)R=655;this.reportAbuseInput="",this.reportAbuseMuteOption=!1;for(let _=0;_<r.instances.length;_++)if(r.instances[_]&&r.instances[_].clientCode===R){this.viewportInterfaceId=r.instances[_].layer;break}}return this.inPacketType=-1,!0}if(this.inPacketType===126){if(this.flashingTab=this.in.g1(),this.flashingTab===this.selectedTab){if(this.flashingTab===3)this.selectedTab=1;else this.selectedTab=3;this.redrawSidebar=!0}return this.inPacketType=-1,!0}if(this.inPacketType===212){if(this.midiActive&&!i.lowMemory){let R=this.in.g2(),_=this.in.data.subarray(this.in.pos,this.inPacketSize),E=a6.decompress(_,-1,!1,!0);S8(E,this.midiVolume,!1),this.nextMusicDelay=R}return this.inPacketType=-1,!0}if(this.inPacketType===254)return this.inMultizone=this.in.g1(),this.inPacketType=-1,!0;if(this.inPacketType===12){let R=this.in.g2(),_=this.in.g1(),E=this.in.g2();if(this.waveEnabled&&!i.lowMemory&&this.waveCount<50)this.waveIds[this.waveCount]=R,this.waveLoops[this.waveCount]=_,this.waveDelay[this.waveCount]=E+I0.delays[R],this.waveCount++;return this.inPacketType=-1,!0}if(this.inPacketType===204){let R=this.in.g2(),_=this.in.g2(),E=f0.get(_);return r.instances[R].model=E.getHeadModel(),this.inPacketType=-1,!0}if(this.inPacketType===7)return this.baseX=this.in.g1(),this.baseZ=this.in.g1(),this.inPacketType=-1,!0;if(this.inPacketType===103){let R=this.in.g2(),_=this.in.g2(),E=this.in.g2();return r.instances[R].model?.recolor(_,E),this.inPacketType=-1,!0}if(this.inPacketType===32)return this.publicChatSetting=this.in.g1(),this.privateChatSetting=this.in.g1(),this.tradeChatSetting=this.in.g1(),this.redrawPrivacySettings=!0,this.redrawChatback=!0,this.inPacketType=-1,!0;if(this.inPacketType===195){let R=this.in.g2();if(this.resetInterfaceAnimation(R),this.chatInterfaceId!==-1)this.chatInterfaceId=-1,this.redrawChatback=!0;if(this.chatbackInputOpen)this.chatbackInputOpen=!1,this.redrawChatback=!0;return this.sidebarInterfaceId=R,this.redrawSidebar=!0,this.redrawSideicons=!0,this.viewportInterfaceId=-1,this.pressedContinueOption=!1,this.inPacketType=-1,!0}if(this.inPacketType===14){let R=this.in.g2();if(this.resetInterfaceAnimation(R),this.sidebarInterfaceId!==-1)this.sidebarInterfaceId=-1,this.redrawSidebar=!0,this.redrawSideicons=!0;return this.chatInterfaceId=R,this.redrawChatback=!0,this.viewportInterfaceId=-1,this.pressedContinueOption=!1,this.inPacketType=-1,!0}if(this.inPacketType===209){let R=this.in.g2(),_=this.in.g2b(),E=this.in.g2b(),I=r.instances[R];return I.x=_,I.y=E,this.inPacketType=-1,!0}if(this.inPacketType===3){if(this.cutscene=!0,this.cutsceneSrcLocalTileX=this.in.g1(),this.cutsceneSrcLocalTileZ=this.in.g1(),this.cutsceneSrcHeight=this.in.g2(),this.cutsceneMoveSpeed=this.in.g1(),this.cutsceneMoveAcceleration=this.in.g1(),this.cutsceneMoveAcceleration>=100)this.cameraX=this.cutsceneSrcLocalTileX*128+64,this.cameraZ=this.cutsceneSrcLocalTileZ*128+64,this.cameraY=this.getHeightmapY(this.currentLevel,this.cutsceneSrcLocalTileX,this.cutsceneSrcLocalTileZ)-this.cutsceneSrcHeight;return this.inPacketType=-1,!0}if(this.inPacketType===135){this.baseX=this.in.g1(),this.baseZ=this.in.g1();for(let R=this.baseX;R<this.baseX+8;R++)for(let _=this.baseZ;_<this.baseZ+8;_++)if(this.objStacks[this.currentLevel][R][_])this.objStacks[this.currentLevel][R][_]=null,this.sortObjStacks(R,_);for(let R=this.addedLocs.head();R;R=this.addedLocs.next())if(R.x>=this.baseX&&R.x<this.baseX+8&&R.z>=this.baseZ&&R.z<this.baseZ+8&&R.plane===this.currentLevel)R.duration=0;return this.inPacketType=-1,!0}if(this.inPacketType===132){let R=this.in.g1(),_=this.in.g1(),E=this.in.g2(),I=this.in.g2(),H=-1;if(this.sceneMapIndex){for(let N=0;N<this.sceneMapIndex.length;N++)if(this.sceneMapIndex[N]===(R<<8)+_)H=N}if(H!==-1&&this.sceneMapLandData){if(!this.sceneMapLandData[H]||this.sceneMapLandData[H]?.length!==I)this.sceneMapLandData[H]=new Uint8Array(I);let N=this.sceneMapLandData[H];if(N)this.in.gdata(this.inPacketSize-6,E,N)}return this.inPacketType=-1,!0}if(this.inPacketType===41){let R=this.in.g8(),_=this.in.g4(),E=this.in.g1(),I=!1;for(let H=0;H<100;H++)if(this.messageTextIds[H]===_){I=!0;break}if(E<=1){for(let H=0;H<this.ignoreCount;H++)if(this.ignoreName37[H]===R){I=!0;break}}if(!I&&this.overrideChat===0)try{this.messageTextIds[this.privateMessageCount]=_,this.privateMessageCount=(this.privateMessageCount+1)%100;let H=o0.unpack(this.in,this.inPacketSize-13),N=y0.filter(H);if(E>1)this.addMessage(7,N,e.formatName(e.fromBase37(R)));else this.addMessage(3,N,e.formatName(e.fromBase37(R)))}catch(H){}return this.inPacketType=-1,!0}if(this.inPacketType===193){for(let R=0;R<this.varps.length;R++)if(this.varps[R]!==this.varCache[R])this.varps[R]=this.varCache[R],await this.updateVarp(R),this.redrawSidebar=!0;return this.inPacketType=-1,!0}if(this.inPacketType===87){let R=this.in.g2(),_=this.in.g2();return r.instances[R].model=K.model(_),this.inPacketType=-1,!0}if(this.inPacketType===185)return this.stickyChatInterfaceId=this.in.g2b(),this.redrawChatback=!0,this.inPacketType=-1,!0;if(this.inPacketType===68){if(this.selectedTab===12)this.redrawSidebar=!0;return this.energy=this.in.g1(),this.inPacketType=-1,!0}if(this.inPacketType===74){if(this.cutscene=!0,this.cutsceneDstLocalTileX=this.in.g1(),this.cutsceneDstLocalTileZ=this.in.g1(),this.cutsceneDstHeight=this.in.g2(),this.cutsceneRotateSpeed=this.in.g1(),this.cutsceneRotateAcceleration=this.in.g1(),this.cutsceneRotateAcceleration>=100){let R=this.cutsceneDstLocalTileX*128+64,_=this.cutsceneDstLocalTileZ*128+64,E=this.getHeightmapY(this.currentLevel,this.cutsceneDstLocalTileX,this.cutsceneDstLocalTileZ)-this.cutsceneDstHeight,I=R-this.cameraX,H=E-this.cameraY,N=_-this.cameraZ,O=Math.sqrt(I*I+N*N)|0;if(this.cameraPitch=(Math.atan2(H,O)*325.949|0)&2047,this.cameraYaw=(Math.atan2(I,N)*-325.949|0)&2047,this.cameraPitch<128)this.cameraPitch=128;if(this.cameraPitch>383)this.cameraPitch=383}return this.inPacketType=-1,!0}if(this.inPacketType===84)return this.selectedTab=this.in.g1(),this.redrawSidebar=!0,this.redrawSideicons=!0,this.inPacketType=-1,!0;if(this.inPacketType===4){let R=this.in.gjstr(),_;if(R.endsWith(":tradereq:")){let E=R.substring(0,R.indexOf(":"));_=e.toBase37(E);let I=!1;for(let H=0;H<this.ignoreCount;H++)if(this.ignoreName37[H]===_){I=!0;break}if(!I&&this.overrideChat===0)this.addMessage(4,"wishes to trade with you.",E)}else if(R.endsWith(":duelreq:")){let E=R.substring(0,R.indexOf(":"));_=e.toBase37(E);let I=!1;for(let H=0;H<this.ignoreCount;H++)if(this.ignoreName37[H]===_){I=!0;break}if(!I&&this.overrideChat===0)this.addMessage(8,"wishes to duel with you.",E)}else this.addMessage(0,R,"");return this.inPacketType=-1,!0}if(this.inPacketType===46){let R=this.in.g2(),_=this.in.g2(),E=this.in.g2(),I=E0.get(_);return r.instances[R].model=I.getInterfaceModel(50),r.instances[R].xan=I.xan2d,r.instances[R].yan=I.yan2d,r.instances[R].zoom=I.zoom2d*100/E|0,this.inPacketType=-1,!0}if(this.inPacketType===168){let R=this.in.g2();if(this.resetInterfaceAnimation(R),this.sidebarInterfaceId!==-1)this.sidebarInterfaceId=-1,this.redrawSidebar=!0,this.redrawSideicons=!0;if(this.chatInterfaceId!==-1)this.chatInterfaceId=-1,this.redrawChatback=!0;if(this.chatbackInputOpen)this.chatbackInputOpen=!1,this.redrawChatback=!0;return this.viewportInterfaceId=R,this.pressedContinueOption=!1,this.inPacketType=-1,!0}if(this.inPacketType===2){let R=this.in.g2(),_=this.in.g2(),E=_>>10&31,I=_>>5&31,H=_&31;return r.instances[R].colour=(E<<19)+(I<<11)+(H<<3),this.inPacketType=-1,!0}if(this.inPacketType===136){for(let R=0;R<this.players.length;R++){let _=this.players[R];if(!_)continue;_.primarySeqId=-1}for(let R=0;R<this.npcs.length;R++){let _=this.npcs[R];if(!_)continue;_.primarySeqId=-1}return this.inPacketType=-1,!0}if(this.inPacketType===26){let R=this.in.g2();return r.instances[R].hide=this.in.g1()===1,this.inPacketType=-1,!0}if(this.inPacketType===21){this.ignoreCount=this.inPacketSize/8|0;for(let R=0;R<this.ignoreCount;R++)this.ignoreName37[R]=this.in.g8();return this.inPacketType=-1,!0}if(this.inPacketType===239){this.cutscene=!1;for(let R=0;R<5;R++)this.cameraModifierEnabled[R]=!1;return this.inPacketType=-1,!0}if(this.inPacketType===129){if(this.sidebarInterfaceId!==-1)this.sidebarInterfaceId=-1,this.redrawSidebar=!0,this.redrawSideicons=!0;if(this.chatInterfaceId!==-1)this.chatInterfaceId=-1,this.redrawChatback=!0;if(this.chatbackInputOpen)this.chatbackInputOpen=!1,this.redrawChatback=!0;return this.viewportInterfaceId=-1,this.pressedContinueOption=!1,this.inPacketType=-1,!0}if(this.inPacketType===201){let R=this.in.g2();if(r.instances[R].text=this.in.gjstr(),r.instances[R].layer===this.tabInterfaceId[this.selectedTab])this.redrawSidebar=!0;return this.inPacketType=-1,!0}if(this.inPacketType===44){this.redrawSidebar=!0;let R=this.in.g1(),_=this.in.g4(),E=this.in.g1();this.skillExperience[R]=_,this.skillLevel[R]=E,this.skillBaseLevel[R]=1;for(let I=0;I<98;I++)if(_>=this.levelExperience[I])this.skillBaseLevel[R]=I+2;return this.inPacketType=-1,!0}if(this.inPacketType===162){this.baseX=this.in.g1(),this.baseZ=this.in.g1();while(this.in.pos<this.inPacketSize){let R=this.in.g1();this.readZonePacket(this.in,R)}return this.inPacketType=-1,!0}if(this.inPacketType===22){if(this.selectedTab===12)this.redrawSidebar=!0;return this.weightCarried=this.in.g2b(),this.inPacketType=-1,!0}if(this.inPacketType===13){let R=this.in.g1(),_=this.in.g1(),E=this.in.g1(),I=this.in.g1();return this.cameraModifierEnabled[R]=!0,this.cameraModifierJitter[R]=_,this.cameraModifierWobbleScale[R]=E,this.cameraModifierWobbleSpeed[R]=I,this.cameraModifierCycle[R]=0,this.inPacketType=-1,!0}if(this.inPacketType===213){this.redrawSidebar=!0;let R=this.in.g2(),_=r.instances[R];while(this.in.pos<this.inPacketSize){let E=this.in.g1(),I=this.in.g2(),H=this.in.g1();if(H===255)H=this.in.g4();if(_.invSlotObjId&&_.invSlotObjCount&&E>=0&&E<_.invSlotObjId.length)_.invSlotObjId[E]=I,_.invSlotObjCount[E]=H}return this.inPacketType=-1,!0}if(this.inPacketType===184)return this.readPlayerInfo(this.in,this.inPacketSize),this.sceneAwaitingSync=!1,this.inPacketType=-1,!0;await this.logout()}catch(A){await this.logout()}return!0}buildScene(){try{this.minimapLevel=-1,this.locList.clear(),this.spotanims.clear(),this.projectiles.clear(),m.clearTexels(),this.clearCaches(),this.scene?.reset();for(let _=0;_<4;_++)this.levelCollisionMap[_]?.reset();let A=new l(104,104,this.levelHeightmap,this.levelTileFlags);l.lowMemory=i.lowMemory;let R=this.sceneMapLandData?.length??0;if(this.sceneMapIndex)for(let _=0;_<R;_++){let E=this.sceneMapIndex[_]>>8,I=this.sceneMapIndex[_]&255;if(E===33&&I>=71&&I<=73){l.lowMemory=!1;break}}if(i.lowMemory)this.scene?.setMinLevel(this.currentLevel);else this.scene?.setMinLevel(0);if(this.sceneMapIndex&&this.sceneMapLandData){this.out.p1isaac(108);for(let _=0;_<R;_++){let E=(this.sceneMapIndex[_]>>8)*64-this.sceneBaseTileX,I=(this.sceneMapIndex[_]&255)*64-this.sceneBaseTileZ,H=this.sceneMapLandData[_];if(H){let N=a6.decompress(H,-1,!1,!0);A.readLandscape((this.sceneCenterZoneX-6)*8,(this.sceneCenterZoneZ-6)*8,E,I,N)}else if(this.sceneCenterZoneZ<800)A.clearLandscape(I,E,64,64)}}if(this.sceneMapIndex&&this.sceneMapLocData){this.out.p1isaac(108);for(let _=0;_<R;_++){let E=(this.sceneMapIndex[_]>>8)*64-this.sceneBaseTileX,I=(this.sceneMapIndex[_]&255)*64-this.sceneBaseTileZ,H=this.sceneMapLocData[_];if(H){let N=a6.decompress(H,-1,!1,!0);A.readLocs(this.scene,this.locList,this.levelCollisionMap,N,E,I)}}}this.out.p1isaac(108),A.build(this.scene,this.levelCollisionMap),this.areaViewport?.bind(),this.out.p1isaac(108);for(let _=this.locList.head();_;_=this.locList.next())if((this.levelTileFlags&&this.levelTileFlags[1][_.heightmapNE][_.heightmapNW]&2)===2){if(_.heightmapSW--,_.heightmapSW<0)_.unlink()}z.onSceneLoaded(this.scene);for(let _=0;_<104;_++)for(let E=0;E<104;E++)this.sortObjStacks(_,E);this.clearAddedLocs()}catch(A){}J0.modelCacheStatic?.clear(),m.initPool(20)}resetInterfaceAnimation(A){let R=r.instances[A];if(!R.childId)return;for(let _=0;_<R.childId.length&&R.childId[_]!==-1;_++){let E=r.instances[R.childId[_]];if(E.comType===1)this.resetInterfaceAnimation(E.id);E.seqFrame=0,E.seqCycle=0}}initializeLevelExperience(){let A=0;for(let R=0;R<99;R++){let _=R+1,E=_+Math.pow(2,_/7)*300|0;A+=E,this.levelExperience[R]=A/4|0}}addMessage(A,R,_){if(A===0&&this.stickyChatInterfaceId!==-1)this.modalMessage=R,this.mouseClickButton=0;if(this.chatInterfaceId===-1)this.redrawChatback=!0;for(let E=99;E>0;E--)this.messageTextType[E]=this.messageTextType[E-1],this.messageTextSender[E]=this.messageTextSender[E-1],this.messageText[E]=this.messageText[E-1];this.messageTextType[0]=A,this.messageTextSender[0]=_,this.messageText[0]=R}async updateVarp(A){let R=p0.instances[A].clientcode;if(R!==0){let _=this.varps[A];if(R===1){if(_===1)m.setBrightness(0.9);if(_===2)m.setBrightness(0.8);if(_===3)m.setBrightness(0.7);if(_===4)m.setBrightness(0.6);E0.iconCache?.clear(),this.redrawTitleBackground=!0}if(R===3){let E=this.midiActive;if(_===0)this.midiVolume=128,d6(128),this.midiActive=!0;if(_===1)this.midiVolume=96,d6(96),this.midiActive=!0;if(_===2)this.midiVolume=64,d6(64),this.midiActive=!0;if(_===3)this.midiVolume=32,d6(32),this.midiActive=!0;if(_===4)this.midiActive=!1;if(this.midiActive!==E){if(this.midiActive&&this.currentMidi)await this.setMidi(this.currentMidi,this.midiCrc,this.midiSize,!1);else b8(!1);this.nextMusicDelay=0}}if(R===4){if(_===0)this.waveVolume=128,c6(128),this.waveEnabled=!0;if(_===1)this.waveVolume=96,c6(96),this.waveEnabled=!0;if(_===2)this.waveVolume=64,c6(64),this.waveEnabled=!0;if(_===3)this.waveVolume=32,c6(32),this.waveEnabled=!0;if(_===4)this.waveEnabled=!1}if(R===5)this.mouseButtonsOption=_;if(R===6)this.chatEffects=_;if(R===8)this.splitPrivateChat=_,this.redrawChatback=!0}}handleChatMouseInput(A,R){let _=0;for(let E=0;E<100;E++){if(!this.messageText[E])continue;let I=this.messageTextType[E],H=this.chatScrollOffset+70+4-_*14;if(H<-20)break;if(I===0)_++;if((I===1||I===2)&&(I===1||this.publicChatSetting===0||this.publicChatSetting===1&&this.isFriend(this.messageTextSender[E]))){if(R>H-14&&R<=H&&this.localPlayer&&this.messageTextSender[E]!==this.localPlayer.name){if(this.rights)this.menuOption[this.menuSize]="Report abuse @whi@"+this.messageTextSender[E],this.menuAction[this.menuSize]=34,this.menuSize++;this.menuOption[this.menuSize]="Add ignore @whi@"+this.messageTextSender[E],this.menuAction[this.menuSize]=436,this.menuSize++,this.menuOption[this.menuSize]="Add friend @whi@"+this.messageTextSender[E],this.menuAction[this.menuSize]=406,this.menuSize++}_++}if((I===3||I===7)&&this.splitPrivateChat===0&&(I===7||this.privateChatSetting===0||this.privateChatSetting===1&&this.isFriend(this.messageTextSender[E]))){if(R>H-14&&R<=H){if(this.rights)this.menuOption[this.menuSize]="Report abuse @whi@"+this.messageTextSender[E],this.menuAction[this.menuSize]=34,this.menuSize++;this.menuOption[this.menuSize]="Add ignore @whi@"+this.messageTextSender[E],this.menuAction[this.menuSize]=436,this.menuSize++,this.menuOption[this.menuSize]="Add friend @whi@"+this.messageTextSender[E],this.menuAction[this.menuSize]=406,this.menuSize++}_++}if(I===4&&(this.tradeChatSetting===0||this.tradeChatSetting===1&&this.isFriend(this.messageTextSender[E]))){if(R>H-14&&R<=H)this.menuOption[this.menuSize]="Accept trade @whi@"+this.messageTextSender[E],this.menuAction[this.menuSize]=903,this.menuSize++;_++}if((I===5||I===6)&&this.splitPrivateChat===0&&this.privateChatSetting<2)_++;if(I===8&&(this.tradeChatSetting===0||this.tradeChatSetting===1&&this.isFriend(this.messageTextSender[E]))){if(R>H-14&&R<=H)this.menuOption[this.menuSize]="Accept duel @whi@"+this.messageTextSender[E],this.menuAction[this.menuSize]=363,this.menuSize++;_++}}}handlePrivateChatInput(A){if(this.splitPrivateChat===0)return;let R=0;if(this.systemUpdateTimer!==0)R=1;for(let _=0;_<100;_++)if(this.messageText[_]!==null){let E=this.messageTextType[_];if((E===3||E===7)&&(E===7||this.privateChatSetting===0||this.privateChatSetting===1&&this.isFriend(this.messageTextSender[_]))){let I=329-R*13;if(this.mouseX>8&&this.mouseX<520&&A-11>I-10&&A-11<=I+3){if(this.rights)this.menuOption[this.menuSize]="Report abuse @whi@"+this.messageTextSender[_],this.menuAction[this.menuSize]=2034,this.menuSize++;this.menuOption[this.menuSize]="Add ignore @whi@"+this.messageTextSender[_],this.menuAction[this.menuSize]=2436,this.menuSize++,this.menuOption[this.menuSize]="Add friend @whi@"+this.messageTextSender[_],this.menuAction[this.menuSize]=2406,this.menuSize++}if(R++,R>=5)return}if((E===5||E===6)&&this.privateChatSetting<2){if(R++,R>=5)return}}}handleInterfaceInput(A,R,_,E,I,H){if(A.comType!==0||!A.childId||A.hide||R<E||_<I||R>E+A.width||_>I+A.height||!A.childX||!A.childY)return;let N=A.childId.length;for(let O=0;O<N;O++){let Q=A.childX[O]+E,U=A.childY[O]+I-H,G=r.instances[A.childId[O]];if(Q+=G.x,U+=G.y,(G.overLayer>=0||G.overColour!==0)&&R>=Q&&_>=U&&R<Q+G.width&&_<U+G.height)if(G.overLayer>=0)this.lastHoveredInterfaceId=G.overLayer;else this.lastHoveredInterfaceId=G.id;if(G.comType===0){if(this.handleInterfaceInput(G,R,_,Q,U,G.scrollPosition),G.scroll>G.height)this.handleScrollInput(R,_,G.scroll,G.height,!0,Q+G.width,U,G)}else if(G.comType===2){let $=0;for(let L=0;L<G.height;L++)for(let J=0;J<G.width;J++){let q=Q+J*(G.marginX+32),V=U+L*(G.marginY+32);if($<20&&G.invSlotOffsetX&&G.invSlotOffsetY)q+=G.invSlotOffsetX[$],V+=G.invSlotOffsetY[$];if(R<q||_<V||R>=q+32||_>=V+32){$++;continue}if(this.hoveredSlot=$,this.hoveredSlotParentId=G.id,!G.invSlotObjId||G.invSlotObjId[$]<=0){$++;continue}let B=E0.get(G.invSlotObjId[$]-1);if(this.objSelected===1&&G.interactable){if(G.id!==this.objSelectedInterface||$!==this.objSelectedSlot)this.menuOption[this.menuSize]="Use "+this.objSelectedName+" with @lre@"+B.name,this.menuAction[this.menuSize]=881,this.menuParamA[this.menuSize]=B.id,this.menuParamB[this.menuSize]=$,this.menuParamC[this.menuSize]=G.id,this.menuSize++}else if(this.spellSelected===1&&G.interactable){if((this.activeSpellFlags&16)===16)this.menuOption[this.menuSize]=this.spellCaption+" @lre@"+B.name,this.menuAction[this.menuSize]=391,this.menuParamA[this.menuSize]=B.id,this.menuParamB[this.menuSize]=$,this.menuParamC[this.menuSize]=G.id,this.menuSize++}else{if(G.interactable){for(let F=4;F>=3;F--)if(B.iop&&B.iop[F]){if(this.menuOption[this.menuSize]=B.iop[F]+" @lre@"+B.name,F===3)this.menuAction[this.menuSize]=478;else if(F===4)this.menuAction[this.menuSize]=347;this.menuParamA[this.menuSize]=B.id,this.menuParamB[this.menuSize]=$,this.menuParamC[this.menuSize]=G.id,this.menuSize++}else if(F===4)this.menuOption[this.menuSize]="Drop @lre@"+B.name,this.menuAction[this.menuSize]=347,this.menuParamA[this.menuSize]=B.id,this.menuParamB[this.menuSize]=$,this.menuParamC[this.menuSize]=G.id,this.menuSize++}if(G.usable)this.menuOption[this.menuSize]="Use @lre@"+B.name,this.menuAction[this.menuSize]=188,this.menuParamA[this.menuSize]=B.id,this.menuParamB[this.menuSize]=$,this.menuParamC[this.menuSize]=G.id,this.menuSize++;if(G.interactable&&B.iop){for(let F=2;F>=0;F--)if(B.iop[F]){if(this.menuOption[this.menuSize]=B.iop[F]+" @lre@"+B.name,F===0)this.menuAction[this.menuSize]=405;else if(F===1)this.menuAction[this.menuSize]=38;else if(F===2)this.menuAction[this.menuSize]=422;this.menuParamA[this.menuSize]=B.id,this.menuParamB[this.menuSize]=$,this.menuParamC[this.menuSize]=G.id,this.menuSize++}}if(G.iops){for(let F=4;F>=0;F--)if(G.iops[F]){if(this.menuOption[this.menuSize]=G.iops[F]+" @lre@"+B.name,F===0)this.menuAction[this.menuSize]=602;else if(F===1)this.menuAction[this.menuSize]=596;else if(F===2)this.menuAction[this.menuSize]=22;else if(F===3)this.menuAction[this.menuSize]=892;else if(F===4)this.menuAction[this.menuSize]=415;this.menuParamA[this.menuSize]=B.id,this.menuParamB[this.menuSize]=$,this.menuParamC[this.menuSize]=G.id,this.menuSize++}}if(this.menuOption[this.menuSize]="Examine @lre@"+B.name,this.menuAction[this.menuSize]=1773,this.menuParamA[this.menuSize]=B.id,G.invSlotObjCount)this.menuParamC[this.menuSize]=G.invSlotObjCount[$];this.menuSize++}$++}}else if(R>=Q&&_>=U&&R<Q+G.width&&_<U+G.height){if(G.buttonType===1){let $=!1;if(G.clientCode!==0)$=this.handleSocialMenuOption(G);if(!$&&G.option)this.menuOption[this.menuSize]=G.option,this.menuAction[this.menuSize]=951,this.menuParamC[this.menuSize]=G.id,this.menuSize++}else if(G.buttonType===2&&this.spellSelected===0){let $=G.actionVerb;if($&&$.indexOf(" ")!==-1)$=$.substring(0,$.indexOf(" "));this.menuOption[this.menuSize]=$+" @gre@"+G.action,this.menuAction[this.menuSize]=930,this.menuParamC[this.menuSize]=G.id,this.menuSize++}else if(G.buttonType===3)this.menuOption[this.menuSize]="Close",this.menuAction[this.menuSize]=947,this.menuParamC[this.menuSize]=G.id,this.menuSize++;else if(G.buttonType===4&&G.option)this.menuOption[this.menuSize]=G.option,this.menuAction[this.menuSize]=465,this.menuParamC[this.menuSize]=G.id,this.menuSize++;else if(G.buttonType===5&&G.option)this.menuOption[this.menuSize]=G.option,this.menuAction[this.menuSize]=960,this.menuParamC[this.menuSize]=G.id,this.menuSize++;else if(G.buttonType===6&&!this.pressedContinueOption&&G.option)this.menuOption[this.menuSize]=G.option,this.menuAction[this.menuSize]=44,this.menuParamC[this.menuSize]=G.id,this.menuSize++}}}handleSocialMenuOption(A){let R=A.clientCode;if(R>=1&&R<=200){if(R>=101)R-=101;else R--;return this.menuOption[this.menuSize]="Remove @whi@"+this.friendName[R],this.menuAction[this.menuSize]=557,this.menuSize++,this.menuOption[this.menuSize]="Message @whi@"+this.friendName[R],this.menuAction[this.menuSize]=679,this.menuSize++,!0}else if(R>=401&&R<=500)return this.menuOption[this.menuSize]="Remove @whi@"+A.text,this.menuAction[this.menuSize]=556,this.menuSize++,!0;return!1}handleViewportOptions(){if(this.objSelected===0&&this.spellSelected===0)this.menuOption[this.menuSize]="Walk here",this.menuAction[this.menuSize]=660,this.menuParamB[this.menuSize]=this.mouseX,this.menuParamC[this.menuSize]=this.mouseY,this.menuSize++;let A=-1;for(let R=0;R<K.pickedCount;R++){let _=K.picked[R],E=_&127,I=_>>7&127,H=_>>29&3,N=_>>14&32767;if(_===A)continue;if(A=_,H===2&&this.scene&&this.scene.getInfo(this.currentLevel,E,I,_)>=0){let O=J0.get(N);if(this.objSelected===1)this.menuOption[this.menuSize]="Use "+this.objSelectedName+" with @cya@"+O.name,this.menuAction[this.menuSize]=450,this.menuParamA[this.menuSize]=_,this.menuParamB[this.menuSize]=E,this.menuParamC[this.menuSize]=I,this.menuSize++;else if(this.spellSelected!==1){if(O.op){for(let Q=4;Q>=0;Q--)if(O.op[Q]){if(this.menuOption[this.menuSize]=O.op[Q]+" @cya@"+O.name,Q===0)this.menuAction[this.menuSize]=285;if(Q===1)this.menuAction[this.menuSize]=504;if(Q===2)this.menuAction[this.menuSize]=364;if(Q===3)this.menuAction[this.menuSize]=581;if(Q===4)this.menuAction[this.menuSize]=1501;this.menuParamA[this.menuSize]=_,this.menuParamB[this.menuSize]=E,this.menuParamC[this.menuSize]=I,this.menuSize++}}this.menuOption[this.menuSize]="Examine @cya@"+O.name,this.menuAction[this.menuSize]=1175,this.menuParamA[this.menuSize]=_,this.menuParamB[this.menuSize]=E,this.menuParamC[this.menuSize]=I,this.menuSize++}else if((this.activeSpellFlags&4)===4)this.menuOption[this.menuSize]=this.spellCaption+" @cya@"+O.name,this.menuAction[this.menuSize]=55,this.menuParamA[this.menuSize]=_,this.menuParamB[this.menuSize]=E,this.menuParamC[this.menuSize]=I,this.menuSize++}if(H===1){let O=this.npcs[N];if(O&&O.npcType&&O.npcType.size===1&&(O.x&127)===64&&(O.z&127)===64)for(let Q=0;Q<this.npcCount;Q++){let U=this.npcs[this.npcIds[Q]];if(U&&U!==O&&U.npcType&&U.npcType.size===1&&U.x===O.x&&U.z===O.z)this.addNpcOptions(U.npcType,this.npcIds[Q],E,I)}if(O&&O.npcType)this.addNpcOptions(O.npcType,N,E,I)}if(H===0){let O=this.players[N];if(O&&(O.x&127)===64&&(O.z&127)===64){for(let Q=0;Q<this.npcCount;Q++){let U=this.npcs[this.npcIds[Q]];if(U&&U.npcType&&U.npcType.size===1&&U.x===O.x&&U.z===O.z)this.addNpcOptions(U.npcType,this.npcIds[Q],E,I)}for(let Q=0;Q<this.playerCount;Q++){let U=this.players[this.playerIds[Q]];if(U&&U!==O&&U.x===O.x&&U.z===O.z)this.addPlayerOptions(U,this.playerIds[Q],E,I)}}if(O)this.addPlayerOptions(O,N,E,I)}if(H===3){let O=this.objStacks[this.currentLevel][E][I];if(!O)continue;for(let Q=O.tail();Q;Q=O.prev()){let U=E0.get(Q.index);if(this.objSelected===1)this.menuOption[this.menuSize]="Use "+this.objSelectedName+" with @lre@"+U.name,this.menuAction[this.menuSize]=217,this.menuParamA[this.menuSize]=Q.index,this.menuParamB[this.menuSize]=E,this.menuParamC[this.menuSize]=I,this.menuSize++;else if(this.spellSelected!==1){for(let G=4;G>=0;G--)if(U.op&&U.op[G]){if(this.menuOption[this.menuSize]=U.op[G]+" @lre@"+U.name,G===0)this.menuAction[this.menuSize]=224;if(G===1)this.menuAction[this.menuSize]=993;if(G===2)this.menuAction[this.menuSize]=99;if(G===3)this.menuAction[this.menuSize]=746;if(G===4)this.menuAction[this.menuSize]=877;this.menuParamA[this.menuSize]=Q.index,this.menuParamB[this.menuSize]=E,this.menuParamC[this.menuSize]=I,this.menuSize++}else if(G===2)this.menuOption[this.menuSize]="Take @lre@"+U.name,this.menuAction[this.menuSize]=99,this.menuParamA[this.menuSize]=Q.index,this.menuParamB[this.menuSize]=E,this.menuParamC[this.menuSize]=I,this.menuSize++;this.menuOption[this.menuSize]="Examine @lre@"+U.name,this.menuAction[this.menuSize]=1102,this.menuParamA[this.menuSize]=Q.index,this.menuParamB[this.menuSize]=E,this.menuParamC[this.menuSize]=I,this.menuSize++}else if((this.activeSpellFlags&1)===1)this.menuOption[this.menuSize]=this.spellCaption+" @lre@"+U.name,this.menuAction[this.menuSize]=965,this.menuParamA[this.menuSize]=Q.index,this.menuParamB[this.menuSize]=E,this.menuParamC[this.menuSize]=I,this.menuSize++}}}}addNpcOptions(A,R,_,E){if(this.menuSize>=400)return;let I=A.name;if(A.vislevel!==0&&this.localPlayer)I=I+this.getCombatLevelColorTag(this.localPlayer.combatLevel,A.vislevel)+" (level-"+A.vislevel+")";if(this.objSelected===1)this.menuOption[this.menuSize]="Use "+this.objSelectedName+" with @yel@"+I,this.menuAction[this.menuSize]=900,this.menuParamA[this.menuSize]=R,this.menuParamB[this.menuSize]=_,this.menuParamC[this.menuSize]=E,this.menuSize++;else if(this.spellSelected!==1){let H;if(A.op){for(H=4;H>=0;H--)if(A.op[H]&&A.op[H]?.toLowerCase()!=="attack"){if(this.menuOption[this.menuSize]=A.op[H]+" @yel@"+I,H===0)this.menuAction[this.menuSize]=728;else if(H===1)this.menuAction[this.menuSize]=542;else if(H===2)this.menuAction[this.menuSize]=6;else if(H===3)this.menuAction[this.menuSize]=963;else if(H===4)this.menuAction[this.menuSize]=245;this.menuParamA[this.menuSize]=R,this.menuParamB[this.menuSize]=_,this.menuParamC[this.menuSize]=E,this.menuSize++}}if(A.op){for(H=4;H>=0;H--)if(A.op[H]&&A.op[H]?.toLowerCase()==="attack"){let N=0;if(this.localPlayer&&A.vislevel>this.localPlayer.combatLevel)N=2000;if(this.menuOption[this.menuSize]=A.op[H]+" @yel@"+I,H===0)this.menuAction[this.menuSize]=N+728;else if(H===1)this.menuAction[this.menuSize]=N+542;else if(H===2)this.menuAction[this.menuSize]=N+6;else if(H===3)this.menuAction[this.menuSize]=N+963;else if(H===4)this.menuAction[this.menuSize]=N+245;this.menuParamA[this.menuSize]=R,this.menuParamB[this.menuSize]=_,this.menuParamC[this.menuSize]=E,this.menuSize++}}this.menuOption[this.menuSize]="Examine @yel@"+I,this.menuAction[this.menuSize]=1607,this.menuParamA[this.menuSize]=R,this.menuParamB[this.menuSize]=_,this.menuParamC[this.menuSize]=E,this.menuSize++}else if((this.activeSpellFlags&2)===2)this.menuOption[this.menuSize]=this.spellCaption+" @yel@"+I,this.menuAction[this.menuSize]=265,this.menuParamA[this.menuSize]=R,this.menuParamB[this.menuSize]=_,this.menuParamC[this.menuSize]=E,this.menuSize++}addPlayerOptions(A,R,_,E){if(A===this.localPlayer||this.menuSize>=400)return;let I=null;if(this.localPlayer)I=A.name+this.getCombatLevelColorTag(this.localPlayer.combatLevel,A.combatLevel)+" (level-"+A.combatLevel+")";if(this.objSelected===1)this.menuOption[this.menuSize]="Use "+this.objSelectedName+" with @whi@"+I,this.menuAction[this.menuSize]=367,this.menuParamA[this.menuSize]=R,this.menuParamB[this.menuSize]=_,this.menuParamC[this.menuSize]=E,this.menuSize++;else if(this.spellSelected!==1){if(this.menuOption[this.menuSize]="Follow @whi@"+I,this.menuAction[this.menuSize]=1544,this.menuParamA[this.menuSize]=R,this.menuParamB[this.menuSize]=_,this.menuParamC[this.menuSize]=E,this.menuSize++,this.overrideChat===0)this.menuOption[this.menuSize]="Trade with @whi@"+I,this.menuAction[this.menuSize]=1373,this.menuParamA[this.menuSize]=R,this.menuParamB[this.menuSize]=_,this.menuParamC[this.menuSize]=E,this.menuSize++;if(this.wildernessLevel>0){if(this.menuOption[this.menuSize]="Attack @whi@"+I,this.localPlayer&&this.localPlayer.combatLevel>=A.combatLevel)this.menuAction[this.menuSize]=151;else this.menuAction[this.menuSize]=2151;this.menuParamA[this.menuSize]=R,this.menuParamB[this.menuSize]=_,this.menuParamC[this.menuSize]=E,this.menuSize++}if(this.worldLocationState===1)this.menuOption[this.menuSize]="Fight @whi@"+I,this.menuAction[this.menuSize]=151,this.menuParamA[this.menuSize]=R,this.menuParamB[this.menuSize]=_,this.menuParamC[this.menuSize]=E,this.menuSize++;if(this.worldLocationState===2)this.menuOption[this.menuSize]="Duel-with @whi@"+I,this.menuAction[this.menuSize]=1101,this.menuParamA[this.menuSize]=R,this.menuParamB[this.menuSize]=_,this.menuParamC[this.menuSize]=E,this.menuSize++}else if((this.activeSpellFlags&8)===8)this.menuOption[this.menuSize]=this.spellCaption+" @whi@"+I,this.menuAction[this.menuSize]=651,this.menuParamA[this.menuSize]=R,this.menuParamB[this.menuSize]=_,this.menuParamC[this.menuSize]=E,this.menuSize++;for(let H=0;H<this.menuSize;H++)if(this.menuAction[H]===660){this.menuOption[H]="Walk here @whi@"+I;return}}getCombatLevelColorTag(A,R){let _=A-R;if(_<-9)return"@red@";else if(_<-6)return"@or3@";else if(_<-3)return"@or2@";else if(_<0)return"@or1@";else if(_>9)return"@gre@";else if(_>6)return"@gr3@";else if(_>3)return"@gr2@";else if(_>0)return"@gr1@";else return"@yel@"}handleInput(){if(this.objDragArea===0){if(this.menuOption[0]="Cancel",this.menuAction[0]=1252,this.menuSize=1,this.handlePrivateChatInput(this.mouseY),this.lastHoveredInterfaceId=0,this.mouseX>8&&this.mouseY>11&&this.mouseX<520&&this.mouseY<345)if(this.viewportInterfaceId===-1)this.handleViewportOptions();else this.handleInterfaceInput(r.instances[this.viewportInterfaceId],this.mouseX,this.mouseY,8,11,0);if(this.lastHoveredInterfaceId!==this.viewportHoveredInterfaceIndex)this.viewportHoveredInterfaceIndex=this.lastHoveredInterfaceId;if(this.lastHoveredInterfaceId=0,this.mouseX>562&&this.mouseY>231&&this.mouseX<752&&this.mouseY<492){if(this.sidebarInterfaceId!==-1)this.handleInterfaceInput(r.instances[this.sidebarInterfaceId],this.mouseX,this.mouseY,562,231,0);else if(this.tabInterfaceId[this.selectedTab]!==-1)this.handleInterfaceInput(r.instances[this.tabInterfaceId[this.selectedTab]],this.mouseX,this.mouseY,562,231,0)}if(this.lastHoveredInterfaceId!==this.sidebarHoveredInterfaceIndex)this.redrawSidebar=!0,this.sidebarHoveredInterfaceIndex=this.lastHoveredInterfaceId;if(this.lastHoveredInterfaceId=0,this.mouseX>22&&this.mouseY>375&&this.mouseX<431&&this.mouseY<471)if(this.chatInterfaceId===-1)this.handleChatMouseInput(this.mouseX-22,this.mouseY-375);else this.handleInterfaceInput(r.instances[this.chatInterfaceId],this.mouseX,this.mouseY,22,375,0);if(this.chatInterfaceId!==-1&&this.lastHoveredInterfaceId!==this.chatHoveredInterfaceIndex)this.redrawChatback=!0,this.chatHoveredInterfaceIndex=this.lastHoveredInterfaceId;let A=!1;while(!A){A=!0;for(let R=0;R<this.menuSize-1;R++)if(this.menuAction[R]<1000&&this.menuAction[R+1]>1000){let _=this.menuOption[R];this.menuOption[R]=this.menuOption[R+1],this.menuOption[R+1]=_;let E=this.menuAction[R];this.menuAction[R]=this.menuAction[R+1],this.menuAction[R+1]=E;let I=this.menuParamB[R];this.menuParamB[R]=this.menuParamB[R+1],this.menuParamB[R+1]=I;let H=this.menuParamC[R];this.menuParamC[R]=this.menuParamC[R+1],this.menuParamC[R+1]=H;let N=this.menuParamA[R];this.menuParamA[R]=this.menuParamA[R+1],this.menuParamA[R+1]=N,A=!1}}}}showContextMenu(){let A=0;if(this.fontBold12){A=this.fontBold12.stringWidth("Choose Option");let I;for(let H=0;H<this.menuSize;H++)if(I=this.fontBold12.stringWidth(this.menuOption[H]),I>A)A=I}A+=8;let R=this.menuSize*15+21,_,E;if(this.mouseClickX>8&&this.mouseClickY>11&&this.mouseClickX<520&&this.mouseClickY<345){if(_=this.mouseClickX-(A/2|0)-8,_+A>512)_=512-A;else if(_<0)_=0;if(E=this.mouseClickY-11,E+R>334)E=334-R;else if(E<0)E=0;this.menuVisible=!0,this.menuArea=0,this.menuX=_,this.menuY=E,this.menuWidth=A,this.menuHeight=this.menuSize*15+22}if(this.mouseClickX>562&&this.mouseClickY>231&&this.mouseClickX<752&&this.mouseClickY<492){if(_=this.mouseClickX-(A/2|0)-562,_<0)_=0;else if(_+A>190)_=190-A;if(E=this.mouseClickY-231,E<0)E=0;else if(E+R>261)E=261-R;this.menuVisible=!0,this.menuArea=1,this.menuX=_,this.menuY=E,this.menuWidth=A,this.menuHeight=this.menuSize*15+22}if(this.mouseClickX>22&&this.mouseClickY>375&&this.mouseClickX<501&&this.mouseClickY<471){if(_=this.mouseClickX-(A/2|0)-22,_<0)_=0;else if(_+A>479)_=479-A;if(E=this.mouseClickY-375,E<0)E=0;else if(E+R>96)E=96-R;this.menuVisible=!0,this.menuArea=2,this.menuX=_,this.menuY=E,this.menuWidth=A,this.menuHeight=this.menuSize*15+22}}tryMove(A,R,_,E,I,H,N,O,Q,U,G){let $=this.levelCollisionMap[this.currentLevel];if(!$)return!1;let L=104,J=104;for(let Y=0;Y<L;Y++)for(let u=0;u<J;u++){let h=R0.index(Y,u);this.bfsDirection[h]=0,this.bfsCost[h]=99999999}let q=A,V=R,B=R0.index(A,R);this.bfsDirection[B]=99,this.bfsCost[B]=0;let F=0,b=0;this.bfsStepX[F]=A,this.bfsStepZ[F++]=R;let T=!1,j=this.bfsStepX.length,w=$.flags;while(b!==F){if(q=this.bfsStepX[b],V=this.bfsStepZ[b],b=(b+1)%j,q===_&&V===E){T=!0;break}if(Q!==D.WALL_STRAIGHT.id){if((Q<D.WALLDECOR_STRAIGHT_OFFSET.id||Q===D.CENTREPIECE_STRAIGHT.id)&&$.reachedWall(q,V,_,E,Q-1,O)){T=!0;break}if(Q<D.CENTREPIECE_STRAIGHT.id&&$.reachedWallDecoration(q,V,_,E,Q-1,O)){T=!0;break}}if(H!==0&&N!==0&&$.reachedLoc(q,V,_,E,H,N,U)){T=!0;break}let Y=this.bfsCost[R0.index(q,V)]+1,u=R0.index(q-1,V);if(q>0&&this.bfsDirection[u]===0&&(w[u]&2621704)===0)this.bfsStepX[F]=q-1,this.bfsStepZ[F]=V,F=(F+1)%j,this.bfsDirection[u]=2,this.bfsCost[u]=Y;if(u=R0.index(q+1,V),q<L-1&&this.bfsDirection[u]===0&&(w[u]&2621824)===0)this.bfsStepX[F]=q+1,this.bfsStepZ[F]=V,F=(F+1)%j,this.bfsDirection[u]=8,this.bfsCost[u]=Y;if(u=R0.index(q,V-1),V>0&&this.bfsDirection[u]===0&&(w[u]&2621698)===0)this.bfsStepX[F]=q,this.bfsStepZ[F]=V-1,F=(F+1)%j,this.bfsDirection[u]=1,this.bfsCost[u]=Y;if(u=R0.index(q,V+1),V<J-1&&this.bfsDirection[u]===0&&(w[u]&2621728)===0)this.bfsStepX[F]=q,this.bfsStepZ[F]=V+1,F=(F+1)%j,this.bfsDirection[u]=4,this.bfsCost[u]=Y;if(u=R0.index(q-1,V-1),q>0&&V>0&&this.bfsDirection[u]===0&&(w[u]&2621710)===0&&(w[R0.index(q-1,V)]&2621704)===0&&(w[R0.index(q,V-1)]&2621698)===0)this.bfsStepX[F]=q-1,this.bfsStepZ[F]=V-1,F=(F+1)%j,this.bfsDirection[u]=3,this.bfsCost[u]=Y;if(u=R0.index(q+1,V-1),q<L-1&&V>0&&this.bfsDirection[u]===0&&(w[u]&2621827)===0&&(w[R0.index(q+1,V)]&2621824)===0&&(w[R0.index(q,V-1)]&2621698)===0)this.bfsStepX[F]=q+1,this.bfsStepZ[F]=V-1,F=(F+1)%j,this.bfsDirection[u]=9,this.bfsCost[u]=Y;if(u=R0.index(q-1,V+1),q>0&&V<J-1&&this.bfsDirection[u]===0&&(w[u]&2621752)===0&&(w[R0.index(q-1,V)]&2621704)===0&&(w[R0.index(q,V+1)]&2621728)===0)this.bfsStepX[F]=q-1,this.bfsStepZ[F]=V+1,F=(F+1)%j,this.bfsDirection[u]=6,this.bfsCost[u]=Y;if(u=R0.index(q+1,V+1),q<L-1&&V<J-1&&this.bfsDirection[u]===0&&(w[u]&2621920)===0&&(w[R0.index(q+1,V)]&2621824)===0&&(w[R0.index(q,V+1)]&2621728)===0)this.bfsStepX[F]=q+1,this.bfsStepZ[F]=V+1,F=(F+1)%j,this.bfsDirection[u]=12,this.bfsCost[u]=Y}if(this.tryMoveNearest=0,!T){if(G){let Y=100;for(let u=1;u<2;u++){for(let h=_-u;h<=_+u;h++)for(let n=E-u;n<=E+u;n++){let X=R0.index(h,n);if(h>=0&&n>=0&&h<104&&n<104&&this.bfsCost[X]<Y)Y=this.bfsCost[X],q=h,V=n,this.tryMoveNearest=1,T=!0}if(T)break}}if(!T)return!1}b=0,this.bfsStepX[b]=q,this.bfsStepZ[b++]=V;let Z=this.bfsDirection[R0.index(q,V)],W=Z;while(q!==A||V!==R){if(W!==Z)Z=W,this.bfsStepX[b]=q,this.bfsStepZ[b++]=V;if((W&2)!==0)q++;else if((W&8)!==0)q--;if((W&1)!==0)V++;else if((W&4)!==0)V--;W=this.bfsDirection[R0.index(q,V)]}if(b>0){j=Math.min(b,25),b--;let Y=this.bfsStepX[b],u=this.bfsStepZ[b];if(I===0)this.out.p1isaac(181),this.out.p1(j+j+3);else if(I===1)this.out.p1isaac(165),this.out.p1(j+j+3+14);else if(I===2)this.out.p1isaac(93),this.out.p1(j+j+3);if(this.actionKey[5]===1)this.out.p1(1);else this.out.p1(0);this.out.p2(Y+this.sceneBaseTileX),this.out.p2(u+this.sceneBaseTileZ),this.flagSceneTileX=this.bfsStepX[0],this.flagSceneTileZ=this.bfsStepZ[0];for(let h=1;h<j;h++)b--,this.out.p1(this.bfsStepX[b]-Y),this.out.p1(this.bfsStepZ[b]-u);return!0}return I!==1}readPlayerInfo(A,R){this.entityRemovalCount=0,this.entityUpdateCount=0,this.readLocalPlayer(A),this.readPlayers(A),this.readNewPlayers(A,R),this.readPlayerUpdates(A);for(let _=0;_<this.entityRemovalCount;_++){let E=this.entityRemovalIds[_],I=this.players[E];if(!I)continue;if(I.cycle!==this.loopCycle)this.players[E]=null}if(A.pos!==R)throw new Error;for(let _=0;_<this.playerCount;_++)if(!this.players[this.playerIds[_]])throw new Error}readLocalPlayer(A){if(A.bits(),A.gBit(1)!==0){let _=A.gBit(2);if(_===0)this.entityUpdateIds[this.entityUpdateCount++]=2047;else if(_===1){let E=A.gBit(3);if(this.localPlayer?.step(!1,E),A.gBit(1)===1)this.entityUpdateIds[this.entityUpdateCount++]=2047}else if(_===2){let E=A.gBit(3);this.localPlayer?.step(!0,E);let I=A.gBit(3);if(this.localPlayer?.step(!0,I),A.gBit(1)===1)this.entityUpdateIds[this.entityUpdateCount++]=2047}else if(_===3){this.currentLevel=A.gBit(2);let E=A.gBit(7),I=A.gBit(7),H=A.gBit(1);if(this.localPlayer?.move(H===1,E,I),A.gBit(1)===1)this.entityUpdateIds[this.entityUpdateCount++]=2047}}}readPlayers(A){let R=A.gBit(8);if(R<this.playerCount)for(let _=R;_<this.playerCount;_++)this.entityRemovalIds[this.entityRemovalCount++]=this.playerIds[_];if(R>this.playerCount)throw new Error;this.playerCount=0;for(let _=0;_<R;_++){let E=this.playerIds[_],I=this.players[E];if(A.gBit(1)===0){if(this.playerIds[this.playerCount++]=E,I)I.cycle=this.loopCycle}else{let N=A.gBit(2);if(N===0){if(this.playerIds[this.playerCount++]=E,I)I.cycle=this.loopCycle;this.entityUpdateIds[this.entityUpdateCount++]=E}else if(N===1){if(this.playerIds[this.playerCount++]=E,I)I.cycle=this.loopCycle;let O=A.gBit(3);if(I?.step(!1,O),A.gBit(1)===1)this.entityUpdateIds[this.entityUpdateCount++]=E}else if(N===2){if(this.playerIds[this.playerCount++]=E,I)I.cycle=this.loopCycle;let O=A.gBit(3);I?.step(!0,O);let Q=A.gBit(3);if(I?.step(!0,Q),A.gBit(1)===1)this.entityUpdateIds[this.entityUpdateCount++]=E}else if(N===3)this.entityRemovalIds[this.entityRemovalCount++]=E}}}readNewPlayers(A,R){let _;while(A.bitPos+10<R*8){if(_=A.gBit(11),_===2047)break;if(!this.players[_]){this.players[_]=new V0;let Q=this.playerAppearanceBuffer[_];if(Q)this.players[_]?.read(Q)}this.playerIds[this.playerCount++]=_;let E=this.players[_];if(E)E.cycle=this.loopCycle;let I=A.gBit(5);if(I>15)I-=32;let H=A.gBit(5);if(H>15)H-=32;let N=A.gBit(1);if(this.localPlayer)E?.move(N===1,this.localPlayer.routeFlagX[0]+I,this.localPlayer.routeFlagZ[0]+H);if(A.gBit(1)===1)this.entityUpdateIds[this.entityUpdateCount++]=_}A.bytes()}readPlayerUpdates(A){for(let R=0;R<this.entityUpdateCount;R++){let _=this.entityUpdateIds[R],E=this.players[_];if(!E)continue;let I=A.g1();if((I&128)!==0)I+=A.g1()<<8;this.readPlayerUpdatesBlocks(E,_,I,A)}}readPlayerUpdatesBlocks(A,R,_,E){if(A.lastMask=_,A.lastMaskCycle=this.loopCycle,(_&1)!==0){let I=E.g1(),H=new Uint8Array(I),N=new s(H);E.gdata(I,0,H),this.playerAppearanceBuffer[R]=N,A.read(N)}if((_&2)!==0){let I=E.g2();if(I===65535)I=-1;if(I===A.primarySeqId)A.primarySeqLoop=0;let H=E.g1();if(I===-1||A.primarySeqId===-1||c.instances[I].seqPriority>c.instances[A.primarySeqId].seqPriority||c.instances[A.primarySeqId].seqPriority===0)A.primarySeqId=I,A.primarySeqFrame=0,A.primarySeqCycle=0,A.primarySeqDelay=H,A.primarySeqLoop=0}if((_&4)!==0){if(A.targetId=E.g2(),A.targetId===65535)A.targetId=-1}if((_&8)!==0){if(A.chat=E.gjstr(),A.chatColor=0,A.chatStyle=0,A.chatTimer=150,A.name)this.addMessage(2,A.chat,A.name)}if((_&16)!==0)A.damage=E.g1(),A.damageType=E.g1(),A.combatCycle=this.loopCycle+400,A.health=E.g1(),A.totalHealth=E.g1();if((_&32)!==0)A.targetTileX=E.g2(),A.targetTileZ=E.g2(),A.lastFaceX=A.targetTileX,A.lastFaceZ=A.targetTileZ;if((_&64)!==0){let I=E.g2(),H=E.g1(),N=E.g1(),O=E.pos;if(A.name){let Q=e.toBase37(A.name),U=!1;if(H<=1){for(let G=0;G<this.ignoreCount;G++)if(this.ignoreName37[G]===Q){U=!0;break}}if(!U&&this.overrideChat===0)try{let G=o0.unpack(E,N),$=y0.filter(G);if(A.chat=$,A.chatColor=I>>8,A.chatStyle=I&255,A.chatTimer=150,H>1)this.addMessage(1,$,A.name);else this.addMessage(2,$,A.name)}catch(G){}}E.pos=O+N}if((_&256)!==0){A.spotanimId=E.g2();let I=E.g4();if(A.spotanimOffset=I>>16,A.spotanimLastCycle=this.loopCycle+(I&65535),A.spotanimFrame=0,A.spotanimCycle=0,A.spotanimLastCycle>this.loopCycle)A.spotanimFrame=-1;if(A.spotanimId===65535)A.spotanimId=-1}if((_&512)!==0)A.forceMoveStartSceneTileX=E.g1(),A.forceMoveStartSceneTileZ=E.g1(),A.forceMoveEndSceneTileX=E.g1(),A.forceMoveEndSceneTileZ=E.g1(),A.forceMoveEndCycle=E.g2()+this.loopCycle,A.forceMoveStartCycle=E.g2()+this.loopCycle,A.forceMoveFaceDirection=E.g1(),A.routeLength=0,A.routeFlagX[0]=A.forceMoveEndSceneTileX,A.routeFlagZ[0]=A.forceMoveEndSceneTileZ}readNpcInfo(A,R){this.entityRemovalCount=0,this.entityUpdateCount=0,this.readNpcs(A),this.readNewNpcs(A,R),this.readNpcUpdates(A);for(let _=0;_<this.entityRemovalCount;_++){let E=this.entityRemovalIds[_],I=this.npcs[E];if(!I)continue;if(I.cycle!==this.loopCycle)I.npcType=null,this.npcs[E]=null}if(A.pos!==R)throw new Error;for(let _=0;_<this.npcCount;_++)if(!this.npcs[this.npcIds[_]])throw new Error}readNpcs(A){A.bits();let R=A.gBit(8);if(R<this.npcCount)for(let _=R;_<this.npcCount;_++)this.entityRemovalIds[this.entityRemovalCount++]=this.npcIds[_];if(R>this.npcCount)throw new Error;this.npcCount=0;for(let _=0;_<R;_++){let E=this.npcIds[_],I=this.npcs[E];if(A.gBit(1)===0){if(this.npcIds[this.npcCount++]=E,I)I.cycle=this.loopCycle}else{let N=A.gBit(2);if(N===0){if(this.npcIds[this.npcCount++]=E,I)I.cycle=this.loopCycle;this.entityUpdateIds[this.entityUpdateCount++]=E}else if(N===1){if(this.npcIds[this.npcCount++]=E,I)I.cycle=this.loopCycle;let O=A.gBit(3);if(I?.step(!1,O),A.gBit(1)===1)this.entityUpdateIds[this.entityUpdateCount++]=E}else if(N===2){if(this.npcIds[this.npcCount++]=E,I)I.cycle=this.loopCycle;let O=A.gBit(3);I?.step(!0,O);let Q=A.gBit(3);if(I?.step(!0,Q),A.gBit(1)===1)this.entityUpdateIds[this.entityUpdateCount++]=E}else if(N===3)this.entityRemovalIds[this.entityRemovalCount++]=E}}}readNewNpcs(A,R){while(A.bitPos+21<R*8){let _=A.gBit(13);if(_===8191)break;if(!this.npcs[_])this.npcs[_]=new v6;let E=this.npcs[_];if(this.npcIds[this.npcCount++]=_,E)E.cycle=this.loopCycle,E.npcType=f0.get(A.gBit(11)),E.size=E.npcType.size,E.seqWalkId=E.npcType.walkanim,E.seqTurnAroundId=E.npcType.walkanim_b,E.seqTurnLeftId=E.npcType.walkanim_r,E.seqTurnRightId=E.npcType.walkanim_l,E.seqStandId=E.npcType.readyanim;else A.gBit(11);let I=A.gBit(5);if(I>15)I-=32;let H=A.gBit(5);if(H>15)H-=32;if(this.localPlayer)E?.move(!1,this.localPlayer.routeFlagX[0]+I,this.localPlayer.routeFlagZ[0]+H);if(A.gBit(1)===1)this.entityUpdateIds[this.entityUpdateCount++]=_}A.bytes()}readNpcUpdates(A){for(let R=0;R<this.entityUpdateCount;R++){let _=this.entityUpdateIds[R],E=this.npcs[_];if(!E)continue;let I=A.g1();if(E.lastMask=I,E.lastMaskCycle=this.loopCycle,(I&2)!==0){let H=A.g2();if(H===65535)H=-1;if(H===E.primarySeqId)E.primarySeqLoop=0;let N=A.g1();if(H===-1||E.primarySeqId===-1||c.instances[H].seqPriority>c.instances[E.primarySeqId].seqPriority||c.instances[E.primarySeqId].seqPriority===0)E.primarySeqId=H,E.primarySeqFrame=0,E.primarySeqCycle=0,E.primarySeqDelay=N,E.primarySeqLoop=0}if((I&4)!==0){if(E.targetId=A.g2(),E.targetId===65535)E.targetId=-1}if((I&8)!==0)E.chat=A.gjstr(),E.chatTimer=100;if((I&16)!==0)E.damage=A.g1(),E.damageType=A.g1(),E.combatCycle=this.loopCycle+400,E.health=A.g1(),E.totalHealth=A.g1();if((I&32)!==0)E.npcType=f0.get(A.g2()),E.seqWalkId=E.npcType.walkanim,E.seqTurnAroundId=E.npcType.walkanim_b,E.seqTurnLeftId=E.npcType.walkanim_r,E.seqTurnRightId=E.npcType.walkanim_l,E.seqStandId=E.npcType.readyanim;if((I&64)!==0){E.spotanimId=A.g2();let H=A.g4();if(E.spotanimOffset=H>>16,E.spotanimLastCycle=this.loopCycle+(H&65535),E.spotanimFrame=0,E.spotanimCycle=0,E.spotanimLastCycle>this.loopCycle)E.spotanimFrame=-1;if(E.spotanimId===65535)E.spotanimId=-1}if((I&128)!==0)E.targetTileX=A.g2(),E.targetTileZ=A.g2(),E.lastFaceX=E.targetTileX,E.lastFaceZ=E.targetTileZ}}updatePlayers(){for(let A=-1;A<this.playerCount;A++){let R;if(A===-1)R=2047;else R=this.playerIds[A];let _=this.players[R];if(_)this.updateEntity(_)}if(i.cyclelogic6++,i.cyclelogic6>1406){i.cyclelogic6=0,this.out.p1isaac(219),this.out.p1(0);let A=this.out.pos;if(this.out.p1(162),this.out.p1(22),(Math.random()*2|0)===0)this.out.p1(84);if(this.out.p2(31824),this.out.p2(13490),(Math.random()*2|0)===0)this.out.p1(123);if((Math.random()*2|0)===0)this.out.p1(134);this.out.p1(100),this.out.p1(94),this.out.p2(35521),this.out.psize1(this.out.pos-A)}}updateEntity(A){if(A.x<128||A.z<128||A.x>=13184||A.z>=13184)A.primarySeqId=-1,A.spotanimId=-1,A.forceMoveEndCycle=0,A.forceMoveStartCycle=0,A.x=A.routeFlagX[0]*128+A.size*64,A.z=A.routeFlagZ[0]*128+A.size*64,A.routeLength=0;if(A===this.localPlayer&&(A.x<1536||A.z<1536||A.x>=11776||A.z>=11776))A.primarySeqId=-1,A.spotanimId=-1,A.forceMoveEndCycle=0,A.forceMoveStartCycle=0,A.x=A.routeFlagX[0]*128+A.size*64,A.z=A.routeFlagZ[0]*128+A.size*64,A.routeLength=0;if(A.forceMoveEndCycle>this.loopCycle)this.updateForceMovement(A);else if(A.forceMoveStartCycle>=this.loopCycle)this.startForceMovement(A);else this.updateMovement(A);this.updateFacingDirection(A),this.updateSequences(A)}pushPlayers(){if(!this.localPlayer)return;if(this.localPlayer.x>>7===this.flagSceneTileX&&this.localPlayer.z>>7===this.flagSceneTileZ)this.flagSceneTileX=0;for(let A=-1;A<this.playerCount;A++){let R,_;if(A===-1)R=this.localPlayer,_=33538048;else R=this.players[this.playerIds[A]],_=this.playerIds[A]<<14;if(!R||!R.isVisibleNow())continue;R.lowMemory=(i.lowMemory&&this.playerCount>50||this.playerCount>200)&&A!==-1&&R.secondarySeqId===R.seqStandId;let E=R.x>>7,I=R.z>>7;if(E<0||E>=104||I<0||I>=104)continue;if(!R.locModel||this.loopCycle<R.locStartCycle||this.loopCycle>=R.locStopCycle){if((R.x&127)===64&&(R.z&127)===64){if(this.tileLastOccupiedCycle[E][I]===this.sceneCycle)continue;this.tileLastOccupiedCycle[E][I]=this.sceneCycle}R.y=this.getHeightmapY(this.currentLevel,R.x,R.z),this.scene?.addTemporary(this.currentLevel,R.x,R.y,R.z,null,R,_,R.yaw,60,R.seqStretches)}else R.lowMemory=!1,R.y=this.getHeightmapY(this.currentLevel,R.x,R.z),this.scene?.addTemporary2(this.currentLevel,R.x,R.y,R.z,R.minTileX,R.minTileZ,R.maxTileX,R.maxTileZ,null,R,_,R.yaw)}}updateNpcs(){for(let A=0;A<this.npcCount;A++){let R=this.npcIds[A],_=this.npcs[R];if(_&&_.npcType)this.updateEntity(_)}}pushNpcs(){for(let A=0;A<this.npcCount;A++){let R=this.npcs[this.npcIds[A]],_=(this.npcIds[A]<<14)+536870911+1|0;if(!R||!R.isVisibleNow())continue;let E=R.x>>7,I=R.z>>7;if(E<0||E>=104||I<0||I>=104)continue;if(R.size===1&&(R.x&127)===64&&(R.z&127)===64){if(this.tileLastOccupiedCycle[E][I]===this.sceneCycle)continue;this.tileLastOccupiedCycle[E][I]=this.sceneCycle}this.scene?.addTemporary(this.currentLevel,R.x,this.getHeightmapY(this.currentLevel,R.x,R.z),R.z,null,R,_,R.yaw,(R.size-1)*64+60,R.seqStretches)}}pushProjectiles(){for(let A=this.projectiles.head();A;A=this.projectiles.next())if(A.projLevel!==this.currentLevel||this.loopCycle>A.lastCycle)A.unlink();else if(this.loopCycle>=A.startCycle){if(A.projTarget>0){let R=this.npcs[A.projTarget-1];if(R)A.updateVelocity(R.x,this.getHeightmapY(A.projLevel,R.x,R.z)-A.projOffsetY,R.z,this.loopCycle)}if(A.projTarget<0){let R=-A.projTarget-1,_;if(R===this.localPid)_=this.localPlayer;else _=this.players[R];if(_)A.updateVelocity(_.x,this.getHeightmapY(A.projLevel,_.x,_.z)-A.projOffsetY,_.z,this.loopCycle)}A.update(this.sceneDelta),this.scene?.addTemporary(this.currentLevel,A.x|0,A.y|0,A.z|0,null,A,-1,A.yaw,60,!1)}}pushSpotanims(){for(let A=this.spotanims.head();A;A=this.spotanims.next())if(A.spotLevel!==this.currentLevel||A.seqComplete)A.unlink();else if(this.loopCycle>=A.startCycle)if(A.update(this.sceneDelta),A.seqComplete)A.unlink();else this.scene?.addTemporary(A.spotLevel,A.x,A.y,A.z,null,A,-1,0,60,!1)}pushLocs(){for(let A=this.locList.head();A;A=this.locList.next()){let R=!1;if(A.seqCycle+=this.sceneDelta,A.seqFrame===-1)A.seqFrame=0,R=!0;if(A.seq.seqDelay){while(A.seqCycle>A.seq.seqDelay[A.seqFrame])if(A.seqCycle-=A.seq.seqDelay[A.seqFrame]+1,A.seqFrame++,R=!0,A.seqFrame>=A.seq.seqFrameCount){if(A.seqFrame-=A.seq.replayoff,A.seqFrame<0||A.seqFrame>=A.seq.seqFrameCount){A.unlink(),R=!1;break}}}if(R&&this.scene){let{heightmapSW:_,heightmapNE:E,heightmapNW:I}=A,H=0;if(A.heightmapSE===0)H=this.scene.getWallTypecode(_,E,I);else if(A.heightmapSE===1)H=this.scene.getDecorTypecode(_,I,E);else if(A.heightmapSE===2)H=this.scene.getLocTypecode(_,E,I);else if(A.heightmapSE===3)H=this.scene.getGroundDecorTypecode(_,E,I);if(this.levelHeightmap&&H!==0&&(H>>14&32767)===A.index){let N=this.levelHeightmap[_][E][I],O=this.levelHeightmap[_][E+1][I],Q=this.levelHeightmap[_][E+1][I+1],U=this.levelHeightmap[_][E][I+1],G=J0.get(A.index),$=-1;if(A.seqFrame!==-1&&A.seq.seqFrames)$=A.seq.seqFrames[A.seqFrame];if(A.heightmapSE===2){let L=this.scene.getInfo(_,E,I,H),J=L&31,q=L>>6;if(J===D.CENTREPIECE_DIAGONAL.id)J=D.CENTREPIECE_STRAIGHT.id;this.scene?.setLocModel(_,E,I,G.getModel(J,q,N,O,Q,U,$))}else if(A.heightmapSE===1)this.scene?.setWallDecorationModel(_,E,I,G.getModel(D.WALLDECOR_STRAIGHT_NOOFFSET.id,0,N,O,Q,U,$));else if(A.heightmapSE===0){let L=this.scene.getInfo(_,E,I,H),J=L&31,q=L>>6;if(J===D.WALL_L.id){let V=q+1&3;this.scene?.setWallModels(E,I,_,G.getModel(D.WALL_L.id,q+4,N,O,Q,U,$),G.getModel(D.WALL_L.id,V,N,O,Q,U,$))}else this.scene?.setWallModel(_,E,I,G.getModel(J,q,N,O,Q,U,$))}else if(A.heightmapSE===3){let J=this.scene.getInfo(_,E,I,H)>>6;this.scene?.setGroundDecorationModel(_,E,I,G.getModel(D.GROUND_DECOR.id,J,N,O,Q,U,$))}}else A.unlink()}}}updateEntityChats(){for(let A=-1;A<this.playerCount;A++){let R;if(A===-1)R=2047;else R=this.playerIds[A];let _=this.players[R];if(_&&_.chatTimer>0){if(_.chatTimer--,_.chatTimer===0)_.chat=null}}for(let A=0;A<this.npcCount;A++){let R=this.npcIds[A],_=this.npcs[R];if(_&&_.chatTimer>0){if(_.chatTimer--,_.chatTimer===0)_.chat=null}}}updateForceMovement(A){let R=A.forceMoveEndCycle-this.loopCycle,_=A.forceMoveStartSceneTileX*128+A.size*64,E=A.forceMoveStartSceneTileZ*128+A.size*64;if(A.x+=(_-A.x)/R|0,A.z+=(E-A.z)/R|0,A.seqTrigger=0,A.forceMoveFaceDirection===0)A.dstYaw=1024;if(A.forceMoveFaceDirection===1)A.dstYaw=1536;if(A.forceMoveFaceDirection===2)A.dstYaw=0;if(A.forceMoveFaceDirection===3)A.dstYaw=512}startForceMovement(A){if(A.forceMoveStartCycle===this.loopCycle||A.primarySeqId===-1||A.primarySeqDelay!==0||A.primarySeqCycle+1>c.instances[A.primarySeqId].seqDelay[A.primarySeqFrame]){let R=A.forceMoveStartCycle-A.forceMoveEndCycle,_=this.loopCycle-A.forceMoveEndCycle,E=A.forceMoveStartSceneTileX*128+A.size*64,I=A.forceMoveStartSceneTileZ*128+A.size*64,H=A.forceMoveEndSceneTileX*128+A.size*64,N=A.forceMoveEndSceneTileZ*128+A.size*64;A.x=(E*(R-_)+H*_)/R|0,A.z=(I*(R-_)+N*_)/R|0}if(A.seqTrigger=0,A.forceMoveFaceDirection===0)A.dstYaw=1024;if(A.forceMoveFaceDirection===1)A.dstYaw=1536;if(A.forceMoveFaceDirection===2)A.dstYaw=0;if(A.forceMoveFaceDirection===3)A.dstYaw=512;A.yaw=A.dstYaw}updateFacingDirection(A){if(A.targetId!==-1&&A.targetId<32768){let _=this.npcs[A.targetId];if(_){let E=A.x-_.x,I=A.z-_.z;if(E!==0||I!==0)A.dstYaw=(Math.atan2(E,I)*325.949|0)&2047}}if(A.targetId>=32768){let _=A.targetId-32768;if(_===this.localPid)_=2047;let E=this.players[_];if(E){let I=A.x-E.x,H=A.z-E.z;if(I!==0||H!==0)A.dstYaw=(Math.atan2(I,H)*325.949|0)&2047}}if((A.targetTileX!==0||A.targetTileZ!==0)&&(A.routeLength===0||A.seqTrigger>0)){let _=A.x-(A.targetTileX-this.sceneBaseTileX-this.sceneBaseTileX)*64,E=A.z-(A.targetTileZ-this.sceneBaseTileZ-this.sceneBaseTileZ)*64;if(_!==0||E!==0)A.dstYaw=(Math.atan2(_,E)*325.949|0)&2047;A.targetTileX=0,A.targetTileZ=0}let R=A.dstYaw-A.yaw&2047;if(R!==0){if(R<32||R>2016)A.yaw=A.dstYaw;else if(R>1024)A.yaw-=32;else A.yaw+=32;if(A.yaw&=2047,A.secondarySeqId===A.seqStandId&&A.yaw!==A.dstYaw){if(A.seqTurnId!==-1){A.secondarySeqId=A.seqTurnId;return}A.secondarySeqId=A.seqWalkId}}}updateSequences(A){A.seqStretches=!1;let R;if(A.secondarySeqId!==-1){if(R=c.instances[A.secondarySeqId],A.secondarySeqCycle++,R.seqDelay&&A.secondarySeqFrame<R.seqFrameCount&&A.secondarySeqCycle>R.seqDelay[A.secondarySeqFrame])A.secondarySeqCycle=0,A.secondarySeqFrame++;if(A.secondarySeqFrame>=R.seqFrameCount)A.secondarySeqCycle=0,A.secondarySeqFrame=0}if(A.primarySeqId!==-1&&A.primarySeqDelay===0){R=c.instances[A.primarySeqId],A.primarySeqCycle++;while(R.seqDelay&&A.primarySeqFrame<R.seqFrameCount&&A.primarySeqCycle>R.seqDelay[A.primarySeqFrame])A.primarySeqCycle-=R.seqDelay[A.primarySeqFrame],A.primarySeqFrame++;if(A.primarySeqFrame>=R.seqFrameCount){if(A.primarySeqFrame-=R.replayoff,A.primarySeqLoop++,A.primarySeqLoop>=R.replaycount)A.primarySeqId=-1;if(A.primarySeqFrame<0||A.primarySeqFrame>=R.seqFrameCount)A.primarySeqId=-1}A.seqStretches=R.stretches}if(A.primarySeqDelay>0)A.primarySeqDelay--;if(A.spotanimId!==-1&&this.loopCycle>=A.spotanimLastCycle){if(A.spotanimFrame<0)A.spotanimFrame=0;R=T0.instances[A.spotanimId].seq,A.spotanimCycle++;while(R&&R.seqDelay&&A.spotanimFrame<R.seqFrameCount&&A.spotanimCycle>R.seqDelay[A.spotanimFrame])A.spotanimCycle-=R.seqDelay[A.spotanimFrame],A.spotanimFrame++;if(R&&A.spotanimFrame>=R.seqFrameCount){if(A.spotanimFrame<0||A.spotanimFrame>=R.seqFrameCount)A.spotanimId=-1}}}updateMovement(A){if(A.secondarySeqId=A.seqStandId,A.routeLength===0){A.seqTrigger=0;return}if(A.primarySeqId!==-1&&A.primarySeqDelay===0){if(!c.instances[A.primarySeqId].walkmerge){A.seqTrigger++;return}}let{x:R,z:_}=A,E=A.routeFlagX[A.routeLength-1]*128+A.size*64,I=A.routeFlagZ[A.routeLength-1]*128+A.size*64;if(E-R<=256&&E-R>=-256&&I-_<=256&&I-_>=-256){if(R<E)if(_<I)A.dstYaw=1280;else if(_>I)A.dstYaw=1792;else A.dstYaw=1536;else if(R>E)if(_<I)A.dstYaw=768;else if(_>I)A.dstYaw=256;else A.dstYaw=512;else if(_<I)A.dstYaw=1024;else A.dstYaw=0;let H=A.dstYaw-A.yaw&2047;if(H>1024)H-=2048;let N=A.seqTurnAroundId;if(H>=-256&&H<=256)N=A.seqWalkId;else if(H>=256&&H<768)N=A.seqTurnRightId;else if(H>=-768&&H<=-256)N=A.seqTurnLeftId;if(N===-1)N=A.seqWalkId;A.secondarySeqId=N;let O=4;if(A.yaw!==A.dstYaw&&A.targetId===-1)O=2;if(A.routeLength>2)O=6;if(A.routeLength>3)O=8;if(A.seqTrigger>0&&A.routeLength>1)O=8,A.seqTrigger--;if(A.routeRun[A.routeLength-1])O<<=1;if(O>=8&&A.secondarySeqId===A.seqWalkId&&A.seqRunId!==-1)A.secondarySeqId=A.seqRunId;if(R<E){if(A.x+=O,A.x>E)A.x=E}else if(R>E){if(A.x-=O,A.x<E)A.x=E}if(_<I){if(A.z+=O,A.z>I)A.z=I}else if(_>I){if(A.z-=O,A.z<I)A.z=I}if(A.x===E&&A.z===I)A.routeLength--}else A.x=E,A.z=I}getTopLevel(){let A=3;if(this.cameraPitch<310&&this.localPlayer){let R=this.cameraX>>7,_=this.cameraZ>>7,E=this.localPlayer.x>>7,I=this.localPlayer.z>>7;if(this.levelTileFlags&&(this.levelTileFlags[this.currentLevel][R][_]&4)!==0)A=this.currentLevel;let H;if(E>R)H=E-R;else H=R-E;let N;if(I>_)N=I-_;else N=_-I;let O,Q;if(H>N){O=N*65536/H|0,Q=32768;while(R!==E){if(R<E)R++;else if(R>E)R--;if(this.levelTileFlags&&(this.levelTileFlags[this.currentLevel][R][_]&4)!==0)A=this.currentLevel;if(Q+=O,Q>=65536){if(Q-=65536,_<I)_++;else if(_>I)_--;if(this.levelTileFlags&&(this.levelTileFlags[this.currentLevel][R][_]&4)!==0)A=this.currentLevel}}}else{O=H*65536/N|0,Q=32768;while(_!==I){if(_<I)_++;else if(_>I)_--;if(this.levelTileFlags&&(this.levelTileFlags[this.currentLevel][R][_]&4)!==0)A=this.currentLevel;if(Q+=O,Q>=65536){if(Q-=65536,R<E)R++;else if(R>E)R--;if(this.levelTileFlags&&(this.levelTileFlags[this.currentLevel][R][_]&4)!==0)A=this.currentLevel}}}}if(this.localPlayer&&this.levelTileFlags&&(this.levelTileFlags[this.currentLevel][this.localPlayer.x>>7][this.localPlayer.z>>7]&4)!==0)A=this.currentLevel;return A}getTopLevelCutscene(){if(!this.levelTileFlags)return 0;return this.getHeightmapY(this.currentLevel,this.cameraX,this.cameraZ)-this.cameraY>=800||(this.levelTileFlags[this.currentLevel][this.cameraX>>7][this.cameraZ>>7]&4)===0?3:this.currentLevel}getHeightmapY(A,R,_){if(!this.levelHeightmap)return 0;let E=Math.min(R>>7,104-1),I=Math.min(_>>7,104-1),H=A;if(A<3&&this.levelTileFlags&&(this.levelTileFlags[1][E][I]&2)===2)H=A+1;let N=R&127,O=_&127,Q=this.levelHeightmap[H][E][I]*(128-N)+this.levelHeightmap[H][E+1][I]*N>>7,U=this.levelHeightmap[H][E][I+1]*(128-N)+this.levelHeightmap[H][E+1][I+1]*N>>7;return Q*(128-O)+U*O>>7}orbitCamera(A,R,_,E,I,H){let N=2048-I&2047,O=2048-E&2047,Q=0,U=0,G=H,$,L,J;if(N!==0)$=m.sin[N],L=m.cos[N],J=U*L-H*$>>16,G=U*$+H*L>>16,U=J;if(O!==0)$=m.sin[O],L=m.cos[O],J=G*$+Q*L>>16,G=G*L-Q*$>>16,Q=J;this.cameraX=A-Q,this.cameraY=R-U,this.cameraZ=_-G,this.cameraPitch=I,this.cameraYaw=E}updateOrbitCamera(){if(!this.localPlayer)return;let A=this.localPlayer.x+this.cameraAnticheatOffsetX,R=this.localPlayer.z+this.cameraAnticheatOffsetZ;if(this.orbitCameraX-A<-500||this.orbitCameraX-A>500||this.orbitCameraZ-R<-500||this.orbitCameraZ-R>500)this.orbitCameraX=A,this.orbitCameraZ=R;if(this.orbitCameraX!==A)this.orbitCameraX+=(A-this.orbitCameraX)/16|0;if(this.orbitCameraZ!==R)this.orbitCameraZ+=(R-this.orbitCameraZ)/16|0;if(this.actionKey[1]===1)this.orbitCameraYawVelocity+=(-this.orbitCameraYawVelocity-24)/2|0;else if(this.actionKey[2]===1)this.orbitCameraYawVelocity+=(24-this.orbitCameraYawVelocity)/2|0;else this.orbitCameraYawVelocity=this.orbitCameraYawVelocity/2|0;if(this.actionKey[3]===1)this.orbitCameraPitchVelocity+=(12-this.orbitCameraPitchVelocity)/2|0;else if(this.actionKey[4]===1)this.orbitCameraPitchVelocity+=(-this.orbitCameraPitchVelocity-12)/2|0;else this.orbitCameraPitchVelocity=this.orbitCameraPitchVelocity/2|0;if(this.orbitCameraYaw=(this.orbitCameraYaw+this.orbitCameraYawVelocity/2|0)&2047,this.orbitCameraPitch+=this.orbitCameraPitchVelocity/2|0,this.orbitCameraPitch<128)this.orbitCameraPitch=128;if(this.orbitCameraPitch>383)this.orbitCameraPitch=383;let _=this.orbitCameraX>>7,E=this.orbitCameraZ>>7,I=this.getHeightmapY(this.currentLevel,this.orbitCameraX,this.orbitCameraZ),H=0;if(this.levelHeightmap){if(_>3&&E>3&&_<100&&E<100)for(let O=_-4;O<=_+4;O++)for(let Q=E-4;Q<=E+4;Q++){let U=this.currentLevel;if(U<3&&this.levelTileFlags&&(this.levelTileFlags[1][O][Q]&2)===2)U++;let G=I-this.levelHeightmap[U][O][Q];if(G>H)H=G}}let N=H*192;if(N>98048)N=98048;if(N<32768)N=32768;if(N>this.cameraPitchClamp)this.cameraPitchClamp+=(N-this.cameraPitchClamp)/24|0;else if(N<this.cameraPitchClamp)this.cameraPitchClamp+=(N-this.cameraPitchClamp)/80|0}applyCutscene(){let A=this.cutsceneSrcLocalTileX*128+64,R=this.cutsceneSrcLocalTileZ*128+64,_=this.getHeightmapY(this.currentLevel,this.cutsceneSrcLocalTileX,this.cutsceneSrcLocalTileZ)-this.cutsceneSrcHeight;if(this.cameraX<A){if(this.cameraX+=this.cutsceneMoveSpeed+((A-this.cameraX)*this.cutsceneMoveAcceleration/1000|0),this.cameraX>A)this.cameraX=A}if(this.cameraX>A){if(this.cameraX-=this.cutsceneMoveSpeed+((this.cameraX-A)*this.cutsceneMoveAcceleration/1000|0),this.cameraX<A)this.cameraX=A}if(this.cameraY<_){if(this.cameraY+=this.cutsceneMoveSpeed+((_-this.cameraY)*this.cutsceneMoveAcceleration/1000|0),this.cameraY>_)this.cameraY=_}if(this.cameraY>_){if(this.cameraY-=this.cutsceneMoveSpeed+((this.cameraY-_)*this.cutsceneMoveAcceleration/1000|0),this.cameraY<_)this.cameraY=_}if(this.cameraZ<R){if(this.cameraZ+=this.cutsceneMoveSpeed+((R-this.cameraZ)*this.cutsceneMoveAcceleration/1000|0),this.cameraZ>R)this.cameraZ=R}if(this.cameraZ>R){if(this.cameraZ-=this.cutsceneMoveSpeed+((this.cameraZ-R)*this.cutsceneMoveAcceleration/1000|0),this.cameraZ<R)this.cameraZ=R}A=this.cutsceneDstLocalTileX*128+64,R=this.cutsceneDstLocalTileZ*128+64,_=this.getHeightmapY(this.currentLevel,this.cutsceneDstLocalTileX,this.cutsceneDstLocalTileZ)-this.cutsceneDstHeight;let E=A-this.cameraX,I=_-this.cameraY,H=R-this.cameraZ,N=Math.sqrt(E*E+H*H)|0,O=(Math.atan2(I,N)*325.949|0)&2047,Q=(Math.atan2(E,H)*-325.949|0)&2047;if(O<128)O=128;if(O>383)O=383;if(this.cameraPitch<O){if(this.cameraPitch+=this.cutsceneRotateSpeed+((O-this.cameraPitch)*this.cutsceneRotateAcceleration/1000|0),this.cameraPitch>O)this.cameraPitch=O}if(this.cameraPitch>O){if(this.cameraPitch-=this.cutsceneRotateSpeed+((this.cameraPitch-O)*this.cutsceneRotateAcceleration/1000|0),this.cameraPitch<O)this.cameraPitch=O}let U=Q-this.cameraYaw;if(U>1024)U-=2048;if(U<-1024)U+=2048;if(U>0)this.cameraYaw+=this.cutsceneRotateSpeed+(U*this.cutsceneRotateAcceleration/1000|0),this.cameraYaw&=2047;if(U<0)this.cameraYaw-=this.cutsceneRotateSpeed+(-U*this.cutsceneRotateAcceleration/1000|0),this.cameraYaw&=2047;let G=Q-this.cameraYaw;if(G>1024)G-=2048;if(G<-1024)G+=2048;if(G<0&&U>0||G>0&&U<0)this.cameraYaw=Q}readZonePacket(A,R){let _=A.g1(),E=this.baseX+(_>>4&7),I=this.baseZ+(_&7);if(R===59){let H=A.g1(),N=A.g2(),O=H>>2,Q=H&3,U=D.of(O).layer;if(E>=0&&I>=0&&E<104&&I<104)this.appendLoc(-1,N,Q,U,I,O,this.currentLevel,E,0)}else if(R===76){let H=A.g1(),N=H>>2,O=H&3,Q=D.of(N).layer;if(E>=0&&I>=0&&E<104&&I<104)this.appendLoc(-1,-1,O,Q,I,N,this.currentLevel,E,0)}else if(R===42){let N=A.g1()>>2,O=D.of(N).layer,Q=A.g2();if(E>=0&&I>=0&&E<104&&I<104&&this.scene){let U=0;if(O===0)U=this.scene.getWallTypecode(this.currentLevel,E,I);else if(O===1)U=this.scene.getDecorTypecode(this.currentLevel,I,E);else if(O===2)U=this.scene.getLocTypecode(this.currentLevel,E,I);else if(O===3)U=this.scene.getGroundDecorTypecode(this.currentLevel,E,I);if(U!==0){let G=new Q0(U>>14&32767,this.currentLevel,O,E,I,c.instances[Q],!1);this.locList.addTail(G)}}}else if(R===223){let H=A.g2(),N=A.g2();if(E>=0&&I>=0&&E<104&&I<104){let O=new K6(H,N);if(!this.objStacks[this.currentLevel][E][I])this.objStacks[this.currentLevel][E][I]=new m0;this.objStacks[this.currentLevel][E][I]?.addTail(O),this.sortObjStacks(E,I)}}else if(R===49){let H=A.g2();if(E>=0&&I>=0&&E<104&&I<104){let N=this.objStacks[this.currentLevel][E][I];if(N){for(let O=N.head();O;O=N.next())if(O.index===(H&32767)){O.unlink();break}if(!N.head())this.objStacks[this.currentLevel][E][I]=null;this.sortObjStacks(E,I)}}}else if(R===69){let H=E+A.g1b(),N=I+A.g1b(),O=A.g2b(),Q=A.g2(),U=A.g1(),G=A.g1(),$=A.g2(),L=A.g2(),J=A.g1(),q=A.g1();if(E>=0&&I>=0&&E<104&&I<104&&H>=0&&N>=0&&H<104&&N<104){E=E*128+64,I=I*128+64,H=H*128+64,N=N*128+64;let V=new r6(Q,this.currentLevel,E,this.getHeightmapY(this.currentLevel,E,I)-U,I,$+this.loopCycle,L+this.loopCycle,J,q,O,G);V.updateVelocity(H,this.getHeightmapY(this.currentLevel,H,N)-G,N,$+this.loopCycle),this.projectiles.addTail(V)}}else if(R===191){let H=A.g2(),N=A.g1(),O=A.g2();if(E>=0&&I>=0&&E<104&&I<104){E=E*128+64,I=I*128+64;let Q=new p6(H,this.currentLevel,E,I,this.getHeightmapY(this.currentLevel,E,I)-N,this.loopCycle,O);this.spotanims.addTail(Q)}}else if(R===50){let H=A.g2(),N=A.g2(),O=A.g2();if(E>=0&&I>=0&&E<104&&I<104&&O!==this.localPid){let Q=new K6(H,N);if(!this.objStacks[this.currentLevel][E][I])this.objStacks[this.currentLevel][E][I]=new m0;this.objStacks[this.currentLevel][E][I]?.addTail(Q),this.sortObjStacks(E,I)}}else if(R===23){let H=A.g1(),N=H>>2,O=H&3,Q=D.of(N).layer,U=A.g2(),G=A.g2(),$=A.g2(),L=A.g2(),J=A.g1b(),q=A.g1b(),V=A.g1b(),B=A.g1b(),F;if(L===this.localPid)F=this.localPlayer;else F=this.players[L];if(F&&this.levelHeightmap){this.appendLoc(G+this.loopCycle,-1,O,Q,I,N,this.currentLevel,E,$+this.loopCycle);let b=this.levelHeightmap[this.currentLevel][E][I],T=this.levelHeightmap[this.currentLevel][E+1][I],j=this.levelHeightmap[this.currentLevel][E+1][I+1],w=this.levelHeightmap[this.currentLevel][E][I+1],Z=J0.get(U);F.locStartCycle=G+this.loopCycle,F.locStopCycle=$+this.loopCycle,F.locModel=Z.getModel(N,O,b,T,j,w,-1);let{width:W,length:Y}=Z;if(O===1||O===3)W=Z.length,Y=Z.width;F.locOffsetX=E*128+W*64,F.locOffsetZ=I*128+Y*64,F.locOffsetY=this.getHeightmapY(this.currentLevel,F.locOffsetX,F.locOffsetZ);let u;if(J>V)u=J,J=V,V=u;if(q>B)u=q,q=B,B=u;F.minTileX=E+J,F.maxTileX=E+V,F.minTileZ=I+q,F.maxTileZ=I+B}}else if(R===151){let H=A.g2(),N=A.g2(),O=A.g2();if(E>=0&&I>=0&&E<104&&I<104){let Q=this.objStacks[this.currentLevel][E][I];if(Q){for(let U=Q.head();U;U=Q.next())if(U.index===(H&32767)&&U.count===N){U.count=O;break}this.sortObjStacks(E,I)}}}}updateTextures(A){if(!i.lowMemory){if(m.textureCycle[17]>=A){let R=m.textures[17];if(!R)return;let _=R.width2d*R.height2d-1,E=R.width2d*this.sceneDelta*2,I=R.pixels,H=this.textureBuffer;for(let N=0;N<=_;N++)H[N]=I[N-E&_];R.pixels=H,this.textureBuffer=I,m.pushTexture(17)}if(m.textureCycle[24]>=A){let R=m.textures[24];if(!R)return;let _=R.width2d*R.height2d-1,E=R.width2d*this.sceneDelta*2,I=R.pixels,H=this.textureBuffer;for(let N=0;N<=_;N++)H[N]=I[N-E&_];R.pixels=H,this.textureBuffer=I,m.pushTexture(24)}}}updateFlames(){if(!this.flameBuffer3||!this.flameBuffer2||!this.flameBuffer0||!this.flameLineOffset)return;let A=256;for(let R=10;R<117;R++)if((Math.random()*100|0)<50)this.flameBuffer3[R+(A-2<<7)]=255;for(let R=0;R<100;R++){let _=(Math.random()*124|0)+2,E=(Math.random()*128|0)+128,I=_+(E<<7);this.flameBuffer3[I]=192}for(let R=1;R<A-1;R++)for(let _=1;_<127;_++){let E=_+(R<<7);this.flameBuffer2[E]=(this.flameBuffer3[E-1]+this.flameBuffer3[E+1]+this.flameBuffer3[E-128]+this.flameBuffer3[E+128])/4|0}if(this.flameCycle0+=128,this.flameCycle0>this.flameBuffer0.length)this.flameCycle0-=this.flameBuffer0.length,this.updateFlameBuffer(this.imageRunes[Math.random()*12|0]);for(let R=1;R<A-1;R++)for(let _=1;_<127;_++){let E=_+(R<<7),I=this.flameBuffer2[E+128]-(this.flameBuffer0[E+this.flameCycle0&this.flameBuffer0.length-1]/5|0);if(I<0)I=0;this.flameBuffer3[E]=I}for(let R=0;R<A-1;R++)this.flameLineOffset[R]=this.flameLineOffset[R+1];if(this.flameLineOffset[A-1]=Math.sin(this.loopCycle/14)*16+Math.sin(this.loopCycle/15)*14+Math.sin(this.loopCycle/16)*12|0,this.flameGradientCycle0>0)this.flameGradientCycle0-=4;if(this.flameGradientCycle1>0)this.flameGradientCycle1-=4;if(this.flameGradientCycle0===0&&this.flameGradientCycle1===0){let R=Math.random()*2000|0;if(R===0)this.flameGradientCycle0=1024;else if(R===1)this.flameGradientCycle1=1024}}mix(A,R,_){let E=256-R;return((A&16711935)*E+(_&16711935)*R&4278255360)+((A&65280)*E+(_&65280)*R&16711680)>>8}drawFlames(){if(!this.flameGradient||!this.flameGradient0||!this.flameGradient1||!this.flameGradient2||!this.flameLineOffset||!this.flameBuffer3)return;let A=256;if(this.flameGradientCycle0>0)for(let E=0;E<256;E++)if(this.flameGradientCycle0>768)this.flameGradient[E]=this.mix(this.flameGradient0[E],1024-this.flameGradientCycle0,this.flameGradient1[E]);else if(this.flameGradientCycle0>256)this.flameGradient[E]=this.flameGradient1[E];else this.flameGradient[E]=this.mix(this.flameGradient1[E],256-this.flameGradientCycle0,this.flameGradient0[E]);else if(this.flameGradientCycle1>0)for(let E=0;E<256;E++)if(this.flameGradientCycle1>768)this.flameGradient[E]=this.mix(this.flameGradient0[E],1024-this.flameGradientCycle1,this.flameGradient2[E]);else if(this.flameGradientCycle1>256)this.flameGradient[E]=this.flameGradient2[E];else this.flameGradient[E]=this.mix(this.flameGradient2[E],256-this.flameGradientCycle1,this.flameGradient0[E]);else for(let E=0;E<256;E++)this.flameGradient[E]=this.flameGradient0[E];for(let E=0;E<33920;E++)if(this.imageTitle0&&this.imageFlamesLeft)this.imageTitle0.pixels[E]=this.imageFlamesLeft.pixels[E];let R=0,_=1152;for(let E=1;E<A-1;E++){let H=(this.flameLineOffset[E]*(A-E)/A|0)+22;if(H<0)H=0;R+=H;for(let N=H;N<128;N++){let O=this.flameBuffer3[R++];if(O===0)_++;else{let Q=O,U=256-O;if(O=this.flameGradient[O],this.imageTitle0){let G=this.imageTitle0.pixels[_];this.imageTitle0.pixels[_++]=((O&16711935)*Q+(G&16711935)*U&4278255360)+((O&65280)*Q+(G&65280)*U&16711680)>>8}}}_+=H}this.imageTitle0?.draw(0,0);for(let E=0;E<33920;E++)if(this.imageTitle1&&this.imageFlamesRight)this.imageTitle1.pixels[E]=this.imageFlamesRight.pixels[E];R=0,_=1176;for(let E=1;E<A-1;E++){let I=this.flameLineOffset[E]*(A-E)/A|0,H=103-I;_+=I;for(let N=0;N<H;N++){let O=this.flameBuffer3[R++];if(O===0)_++;else{let Q=O,U=256-O;if(O=this.flameGradient[O],this.imageTitle1){let G=this.imageTitle1.pixels[_];this.imageTitle1.pixels[_++]=((O&16711935)*Q+(G&16711935)*U&4278255360)+((O&65280)*Q+(G&65280)*U&16711680)>>8}}}R+=128-H,_+=128-H-I}if(this.imageTitle1?.draw(661,0),this.isMobile)T8.draw()}}export{i as Client};

//# debugId=C985E770D61E140964756E2164756E21
