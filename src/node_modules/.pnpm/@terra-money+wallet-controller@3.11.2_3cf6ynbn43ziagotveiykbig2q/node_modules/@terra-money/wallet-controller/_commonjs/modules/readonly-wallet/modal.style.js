"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modalStyle = void 0;
// language=css
exports.modalStyle = `

@keyframes wallet-readonly-modal--dim-enter {
  0% {
    opacity: 0;
  }
  
  100% {
    opacity: 1;
  }
}

@keyframes wallet-readonly-modal--content-enter {
  0% {
    opacity: 0;
    transform: scale(0.4);
  }
  
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes wallet-readonly-modal--content-slide {
  0% {
    opacity: 0;
    transform: translateY(300px);
  }
  
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.wallet-readonly-modal {
  position: fixed;
  z-index: 100000;

  color: #212121;
  font-family: sans-serif;

  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;

  display: grid;
  place-content: center;
}

.wallet-readonly-modal select, .wallet-readonly-modal input {
  color: #212121;
  background-color: #ffffff;
}

.wallet-readonly-modal > .wallet-readonly-modal--dim {
  position: fixed;
  z-index: -1;

  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);

  animation: wallet-readonly-modal--dim-enter 0.2s ease-in-out;
}

.wallet-readonly-modal > .wallet-readonly-modal--content {
  box-sizing: border-box;
  
  max-width: 640px;
  width: 100vw;

  border-radius: 8px;

  background-color: #ffffff;
  box-shadow: 0 4px 18px 3px rgba(0, 0, 0, 0.43);

  animation: wallet-readonly-modal--content-enter 0.2s ease-in-out;

  padding: 40px;
  
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.wallet-readonly-modal > .wallet-readonly-modal--content h1 {
  font-size: 20px;
  font-weight: bold;
  
  margin: 0 0 12px 0;

  text-align: center;
}

.wallet-readonly-modal > .wallet-readonly-modal--content label {
  display: block;

  color: #2043b5;
  font-size: 14px;
  font-weight: 600;

  margin-bottom: 8px;
}

.wallet-readonly-modal > .wallet-readonly-modal--content .select-wrapper {
  position: relative;
}

.wallet-readonly-modal > .wallet-readonly-modal--content .select-wrapper svg {
  position: absolute;
  right: 10px;
  top: 11px;
  
  width: 20px;
  height: 20px;
}

.wallet-readonly-modal > .wallet-readonly-modal--content .select-wrapper svg path {
  color: #212121;
}

.wallet-readonly-modal > .wallet-readonly-modal--content .select-wrapper select {
  outline: none;
  appearance: none;

  width: 100%;
  height: 45px;

  border: 1px solid #cfd8ea;
  border-radius: 8px;

  padding: 0 25px 0 15px;
}

.wallet-readonly-modal > .wallet-readonly-modal--content .select-wrapper select:focus {
  border-color: #2043b5;
}

.wallet-readonly-modal > .wallet-readonly-modal--content input {
  box-sizing: border-box;
  outline: none;

  width: 100%;
  height: 45px;

  border: 1px solid #cfd8ea;
  border-radius: 8px;

  padding: 0 15px;
}

.wallet-readonly-modal > .wallet-readonly-modal--content input:focus {
  border-color: #2043b5;
}

.wallet-readonly-modal > .wallet-readonly-modal--content button {
  margin-top: 20px;
  
  display: block;
  
  cursor: pointer;
  outline: none;
  border: 0;
  
  width: 100%;
  height: 48px;
  border-radius: 30px;
  
  font-size: 14px;
  font-weight: bold;
  
  color: #ffffff;
  background-color: #2043b5;
}

.wallet-readonly-modal > .wallet-readonly-modal--content button:disabled {
  opacity: 0.4;
}

@media (max-width: 450px) {
  .wallet-readonly-modal {
    place-content: flex-end;
  }
  
  .wallet-readonly-modal > .wallet-readonly-modal--content {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    
    padding-bottom: 100px;
    
    animation: wallet-readonly-modal--content-slide 0.2s ease-in-out;
  }
}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuc3R5bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvQHRlcnJhLW1vbmV5L3dhbGxldC1jb250cm9sbGVyL21vZHVsZXMvcmVhZG9ubHktd2FsbGV0L21vZGFsLnN0eWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGVBQWU7QUFDRixRQUFBLFVBQVUsR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBc016QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gbGFuZ3VhZ2U9Y3NzXG5leHBvcnQgY29uc3QgbW9kYWxTdHlsZSA9IGBcblxuQGtleWZyYW1lcyB3YWxsZXQtcmVhZG9ubHktbW9kYWwtLWRpbS1lbnRlciB7XG4gIDAlIHtcbiAgICBvcGFjaXR5OiAwO1xuICB9XG4gIFxuICAxMDAlIHtcbiAgICBvcGFjaXR5OiAxO1xuICB9XG59XG5cbkBrZXlmcmFtZXMgd2FsbGV0LXJlYWRvbmx5LW1vZGFsLS1jb250ZW50LWVudGVyIHtcbiAgMCUge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjQpO1xuICB9XG4gIFxuICAxMDAlIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gIH1cbn1cblxuQGtleWZyYW1lcyB3YWxsZXQtcmVhZG9ubHktbW9kYWwtLWNvbnRlbnQtc2xpZGUge1xuICAwJSB7XG4gICAgb3BhY2l0eTogMDtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMzAwcHgpO1xuICB9XG4gIFxuICAxMDAlIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgfVxufVxuXG4ud2FsbGV0LXJlYWRvbmx5LW1vZGFsIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB6LWluZGV4OiAxMDAwMDA7XG5cbiAgY29sb3I6ICMyMTIxMjE7XG4gIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xuXG4gIGxlZnQ6IDA7XG4gIHRvcDogMDtcbiAgd2lkdGg6IDEwMHZ3O1xuICBoZWlnaHQ6IDEwMHZoO1xuXG4gIGRpc3BsYXk6IGdyaWQ7XG4gIHBsYWNlLWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuLndhbGxldC1yZWFkb25seS1tb2RhbCBzZWxlY3QsIC53YWxsZXQtcmVhZG9ubHktbW9kYWwgaW5wdXQge1xuICBjb2xvcjogIzIxMjEyMTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbn1cblxuLndhbGxldC1yZWFkb25seS1tb2RhbCA+IC53YWxsZXQtcmVhZG9ubHktbW9kYWwtLWRpbSB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgei1pbmRleDogLTE7XG5cbiAgbGVmdDogMDtcbiAgdG9wOiAwO1xuICB3aWR0aDogMTAwdnc7XG4gIGhlaWdodDogMTAwdmg7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zKTtcblxuICBhbmltYXRpb246IHdhbGxldC1yZWFkb25seS1tb2RhbC0tZGltLWVudGVyIDAuMnMgZWFzZS1pbi1vdXQ7XG59XG5cbi53YWxsZXQtcmVhZG9ubHktbW9kYWwgPiAud2FsbGV0LXJlYWRvbmx5LW1vZGFsLS1jb250ZW50IHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgXG4gIG1heC13aWR0aDogNjQwcHg7XG4gIHdpZHRoOiAxMDB2dztcblxuICBib3JkZXItcmFkaXVzOiA4cHg7XG5cbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbiAgYm94LXNoYWRvdzogMCA0cHggMThweCAzcHggcmdiYSgwLCAwLCAwLCAwLjQzKTtcblxuICBhbmltYXRpb246IHdhbGxldC1yZWFkb25seS1tb2RhbC0tY29udGVudC1lbnRlciAwLjJzIGVhc2UtaW4tb3V0O1xuXG4gIHBhZGRpbmc6IDQwcHg7XG4gIFxuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDIwcHg7XG59XG5cbi53YWxsZXQtcmVhZG9ubHktbW9kYWwgPiAud2FsbGV0LXJlYWRvbmx5LW1vZGFsLS1jb250ZW50IGgxIHtcbiAgZm9udC1zaXplOiAyMHB4O1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgXG4gIG1hcmdpbjogMCAwIDEycHggMDtcblxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi53YWxsZXQtcmVhZG9ubHktbW9kYWwgPiAud2FsbGV0LXJlYWRvbmx5LW1vZGFsLS1jb250ZW50IGxhYmVsIHtcbiAgZGlzcGxheTogYmxvY2s7XG5cbiAgY29sb3I6ICMyMDQzYjU7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcblxuICBtYXJnaW4tYm90dG9tOiA4cHg7XG59XG5cbi53YWxsZXQtcmVhZG9ubHktbW9kYWwgPiAud2FsbGV0LXJlYWRvbmx5LW1vZGFsLS1jb250ZW50IC5zZWxlY3Qtd3JhcHBlciB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLndhbGxldC1yZWFkb25seS1tb2RhbCA+IC53YWxsZXQtcmVhZG9ubHktbW9kYWwtLWNvbnRlbnQgLnNlbGVjdC13cmFwcGVyIHN2ZyB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6IDEwcHg7XG4gIHRvcDogMTFweDtcbiAgXG4gIHdpZHRoOiAyMHB4O1xuICBoZWlnaHQ6IDIwcHg7XG59XG5cbi53YWxsZXQtcmVhZG9ubHktbW9kYWwgPiAud2FsbGV0LXJlYWRvbmx5LW1vZGFsLS1jb250ZW50IC5zZWxlY3Qtd3JhcHBlciBzdmcgcGF0aCB7XG4gIGNvbG9yOiAjMjEyMTIxO1xufVxuXG4ud2FsbGV0LXJlYWRvbmx5LW1vZGFsID4gLndhbGxldC1yZWFkb25seS1tb2RhbC0tY29udGVudCAuc2VsZWN0LXdyYXBwZXIgc2VsZWN0IHtcbiAgb3V0bGluZTogbm9uZTtcbiAgYXBwZWFyYW5jZTogbm9uZTtcblxuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiA0NXB4O1xuXG4gIGJvcmRlcjogMXB4IHNvbGlkICNjZmQ4ZWE7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcblxuICBwYWRkaW5nOiAwIDI1cHggMCAxNXB4O1xufVxuXG4ud2FsbGV0LXJlYWRvbmx5LW1vZGFsID4gLndhbGxldC1yZWFkb25seS1tb2RhbC0tY29udGVudCAuc2VsZWN0LXdyYXBwZXIgc2VsZWN0OmZvY3VzIHtcbiAgYm9yZGVyLWNvbG9yOiAjMjA0M2I1O1xufVxuXG4ud2FsbGV0LXJlYWRvbmx5LW1vZGFsID4gLndhbGxldC1yZWFkb25seS1tb2RhbC0tY29udGVudCBpbnB1dCB7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIG91dGxpbmU6IG5vbmU7XG5cbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogNDVweDtcblxuICBib3JkZXI6IDFweCBzb2xpZCAjY2ZkOGVhO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG5cbiAgcGFkZGluZzogMCAxNXB4O1xufVxuXG4ud2FsbGV0LXJlYWRvbmx5LW1vZGFsID4gLndhbGxldC1yZWFkb25seS1tb2RhbC0tY29udGVudCBpbnB1dDpmb2N1cyB7XG4gIGJvcmRlci1jb2xvcjogIzIwNDNiNTtcbn1cblxuLndhbGxldC1yZWFkb25seS1tb2RhbCA+IC53YWxsZXQtcmVhZG9ubHktbW9kYWwtLWNvbnRlbnQgYnV0dG9uIHtcbiAgbWFyZ2luLXRvcDogMjBweDtcbiAgXG4gIGRpc3BsYXk6IGJsb2NrO1xuICBcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBvdXRsaW5lOiBub25lO1xuICBib3JkZXI6IDA7XG4gIFxuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiA0OHB4O1xuICBib3JkZXItcmFkaXVzOiAzMHB4O1xuICBcbiAgZm9udC1zaXplOiAxNHB4O1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgXG4gIGNvbG9yOiAjZmZmZmZmO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjA0M2I1O1xufVxuXG4ud2FsbGV0LXJlYWRvbmx5LW1vZGFsID4gLndhbGxldC1yZWFkb25seS1tb2RhbC0tY29udGVudCBidXR0b246ZGlzYWJsZWQge1xuICBvcGFjaXR5OiAwLjQ7XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiA0NTBweCkge1xuICAud2FsbGV0LXJlYWRvbmx5LW1vZGFsIHtcbiAgICBwbGFjZS1jb250ZW50OiBmbGV4LWVuZDtcbiAgfVxuICBcbiAgLndhbGxldC1yZWFkb25seS1tb2RhbCA+IC53YWxsZXQtcmVhZG9ubHktbW9kYWwtLWNvbnRlbnQge1xuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDA7XG4gICAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDA7XG4gICAgXG4gICAgcGFkZGluZy1ib3R0b206IDEwMHB4O1xuICAgIFxuICAgIGFuaW1hdGlvbjogd2FsbGV0LXJlYWRvbmx5LW1vZGFsLS1jb250ZW50LXNsaWRlIDAuMnMgZWFzZS1pbi1vdXQ7XG4gIH1cbn1cbmA7XG4iXX0=