(self.webpackChunksudoku_solver=self.webpackChunksudoku_solver||[]).push([[3272],{3272:(e,t,r)=>{"use strict";r.r(t),r.d(t,{createSwipeBackGesture:()=>n});var s=r(2377),a=r(9461);r(960);const n=(e,t,r,n,o)=>{const u=e.ownerDocument.defaultView;return(0,a.createGesture)({el:e,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:e=>e.startX<=50&&t(),onStart:r,onMove:e=>{n(e.deltaX/u.innerWidth)},onEnd:e=>{const t=u.innerWidth,r=e.deltaX/t,a=e.velocityX,n=a>=0&&(a>.2||e.deltaX>t/2),c=(n?1-r:r)*t;let i=0;if(c>5){const e=c/Math.abs(a);i=Math.min(e,540)}o(n,r<=0?.01:(0,s.j)(0,r,.9999),i)}})}}}]);