"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modalStyle = void 0;
// language=css
exports.modalStyle = `

@keyframes wallet-wc-modal--dim-enter {
  0% {
    opacity: 0;
  }
  
  100% {
    opacity: 1;
  }
}

@keyframes wallet-wc-modal--content-enter {
  0% {
    opacity: 0;
    transform: scale(0.4);
  }
  
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.wallet-wc-modal {
  position: fixed;
  z-index: 100000;

  color: #212121;

  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;

  display: grid;
  place-content: center;
}

.wallet-wc-modal > .wallet-wc-modal--dim {
  position: fixed;
  z-index: -1;

  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);

  animation: wallet-wc-modal--dim-enter 0.2s ease-in-out;
}

.wallet-wc-modal > .wallet-wc-modal--content {
  border-radius: 8px;

  background-color: #ffffff;
  box-shadow: 0 4px 18px 3px rgba(0, 0, 0, 0.43);
  
  text-align: center;

  animation: wallet-wc-modal--content-enter 0.2s ease-in-out;
}

.wallet-wc-modal > .wallet-wc-modal--content h1 {
  color: #3b99fc;
  
  font-size: 20px;
  font-family: sans-serif;
  font-weight: bold;
  
  margin: 0 0 12px 0;
}

.wallet-wc-modal > .wallet-wc-modal--content p {
  color: #212121;
  
  font-size: 14px;
  font-family: sans-serif;
  
  margin: 0 0 32px 0;
}

.wallet-wc-modal > .wallet-wc-modal--content button {
  display: block;
  
  cursor: pointer;
  outline: none;
  border: 0;
  
  width: 295px;
  height: 48px;
  border-radius: 30px;
  
  font-size: 14px;
  font-weight: bold;
  
  color: #ffffff;
  background-color: #2043b5;
}

.wallet-wc-modal > .wallet-wc-modal--content[data-device="desktop"] {
  padding: 40px 80px;
}

.wallet-wc-modal > .wallet-wc-modal--content[data-device="mobile"] {
  padding: 40px 20px;
}

.wallet-wc-modal > .wallet-wc-modal--content[data-device="mobile"] h1 {
  margin-bottom: 32px;
}

.wallet-wc-modal > .wallet-wc-modal--content[data-device="mobile"] p {
  display: none;
}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuc3R5bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvQHRlcnJhLW1vbmV5L3dhbGxldC1jb250cm9sbGVyL21vZHVsZXMvd2FsbGV0Y29ubmVjdC9tb2RhbC5zdHlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxlQUFlO0FBQ0YsUUFBQSxVQUFVLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FtSHpCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBsYW5ndWFnZT1jc3NcbmV4cG9ydCBjb25zdCBtb2RhbFN0eWxlID0gYFxuXG5Aa2V5ZnJhbWVzIHdhbGxldC13Yy1tb2RhbC0tZGltLWVudGVyIHtcbiAgMCUge1xuICAgIG9wYWNpdHk6IDA7XG4gIH1cbiAgXG4gIDEwMCUge1xuICAgIG9wYWNpdHk6IDE7XG4gIH1cbn1cblxuQGtleWZyYW1lcyB3YWxsZXQtd2MtbW9kYWwtLWNvbnRlbnQtZW50ZXIge1xuICAwJSB7XG4gICAgb3BhY2l0eTogMDtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNCk7XG4gIH1cbiAgXG4gIDEwMCUge1xuICAgIG9wYWNpdHk6IDE7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgfVxufVxuXG4ud2FsbGV0LXdjLW1vZGFsIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB6LWluZGV4OiAxMDAwMDA7XG5cbiAgY29sb3I6ICMyMTIxMjE7XG5cbiAgbGVmdDogMDtcbiAgdG9wOiAwO1xuICB3aWR0aDogMTAwdnc7XG4gIGhlaWdodDogMTAwdmg7XG5cbiAgZGlzcGxheTogZ3JpZDtcbiAgcGxhY2UtY29udGVudDogY2VudGVyO1xufVxuXG4ud2FsbGV0LXdjLW1vZGFsID4gLndhbGxldC13Yy1tb2RhbC0tZGltIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB6LWluZGV4OiAtMTtcblxuICBsZWZ0OiAwO1xuICB0b3A6IDA7XG4gIHdpZHRoOiAxMDB2dztcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjMpO1xuXG4gIGFuaW1hdGlvbjogd2FsbGV0LXdjLW1vZGFsLS1kaW0tZW50ZXIgMC4ycyBlYXNlLWluLW91dDtcbn1cblxuLndhbGxldC13Yy1tb2RhbCA+IC53YWxsZXQtd2MtbW9kYWwtLWNvbnRlbnQge1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG5cbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbiAgYm94LXNoYWRvdzogMCA0cHggMThweCAzcHggcmdiYSgwLCAwLCAwLCAwLjQzKTtcbiAgXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcblxuICBhbmltYXRpb246IHdhbGxldC13Yy1tb2RhbC0tY29udGVudC1lbnRlciAwLjJzIGVhc2UtaW4tb3V0O1xufVxuXG4ud2FsbGV0LXdjLW1vZGFsID4gLndhbGxldC13Yy1tb2RhbC0tY29udGVudCBoMSB7XG4gIGNvbG9yOiAjM2I5OWZjO1xuICBcbiAgZm9udC1zaXplOiAyMHB4O1xuICBmb250LWZhbWlseTogc2Fucy1zZXJpZjtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIFxuICBtYXJnaW46IDAgMCAxMnB4IDA7XG59XG5cbi53YWxsZXQtd2MtbW9kYWwgPiAud2FsbGV0LXdjLW1vZGFsLS1jb250ZW50IHAge1xuICBjb2xvcjogIzIxMjEyMTtcbiAgXG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XG4gIFxuICBtYXJnaW46IDAgMCAzMnB4IDA7XG59XG5cbi53YWxsZXQtd2MtbW9kYWwgPiAud2FsbGV0LXdjLW1vZGFsLS1jb250ZW50IGJ1dHRvbiB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBvdXRsaW5lOiBub25lO1xuICBib3JkZXI6IDA7XG4gIFxuICB3aWR0aDogMjk1cHg7XG4gIGhlaWdodDogNDhweDtcbiAgYm9yZGVyLXJhZGl1czogMzBweDtcbiAgXG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIFxuICBjb2xvcjogI2ZmZmZmZjtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIwNDNiNTtcbn1cblxuLndhbGxldC13Yy1tb2RhbCA+IC53YWxsZXQtd2MtbW9kYWwtLWNvbnRlbnRbZGF0YS1kZXZpY2U9XCJkZXNrdG9wXCJdIHtcbiAgcGFkZGluZzogNDBweCA4MHB4O1xufVxuXG4ud2FsbGV0LXdjLW1vZGFsID4gLndhbGxldC13Yy1tb2RhbC0tY29udGVudFtkYXRhLWRldmljZT1cIm1vYmlsZVwiXSB7XG4gIHBhZGRpbmc6IDQwcHggMjBweDtcbn1cblxuLndhbGxldC13Yy1tb2RhbCA+IC53YWxsZXQtd2MtbW9kYWwtLWNvbnRlbnRbZGF0YS1kZXZpY2U9XCJtb2JpbGVcIl0gaDEge1xuICBtYXJnaW4tYm90dG9tOiAzMnB4O1xufVxuXG4ud2FsbGV0LXdjLW1vZGFsID4gLndhbGxldC13Yy1tb2RhbC0tY29udGVudFtkYXRhLWRldmljZT1cIm1vYmlsZVwiXSBwIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cbmA7XG4iXX0=