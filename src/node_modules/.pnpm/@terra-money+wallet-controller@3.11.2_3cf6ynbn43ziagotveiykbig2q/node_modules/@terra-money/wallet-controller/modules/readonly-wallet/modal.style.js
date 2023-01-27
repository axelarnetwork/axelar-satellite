// language=css
export const modalStyle = `

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuc3R5bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvQHRlcnJhLW1vbmV5L3dhbGxldC1jb250cm9sbGVyL21vZHVsZXMvcmVhZG9ubHktd2FsbGV0L21vZGFsLnN0eWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGVBQWU7QUFDZixNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXNNekIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGxhbmd1YWdlPWNzc1xuZXhwb3J0IGNvbnN0IG1vZGFsU3R5bGUgPSBgXG5cbkBrZXlmcmFtZXMgd2FsbGV0LXJlYWRvbmx5LW1vZGFsLS1kaW0tZW50ZXIge1xuICAwJSB7XG4gICAgb3BhY2l0eTogMDtcbiAgfVxuICBcbiAgMTAwJSB7XG4gICAgb3BhY2l0eTogMTtcbiAgfVxufVxuXG5Aa2V5ZnJhbWVzIHdhbGxldC1yZWFkb25seS1tb2RhbC0tY29udGVudC1lbnRlciB7XG4gIDAlIHtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMC40KTtcbiAgfVxuICBcbiAgMTAwJSB7XG4gICAgb3BhY2l0eTogMTtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICB9XG59XG5cbkBrZXlmcmFtZXMgd2FsbGV0LXJlYWRvbmx5LW1vZGFsLS1jb250ZW50LXNsaWRlIHtcbiAgMCUge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDMwMHB4KTtcbiAgfVxuICBcbiAgMTAwJSB7XG4gICAgb3BhY2l0eTogMTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG4gIH1cbn1cblxuLndhbGxldC1yZWFkb25seS1tb2RhbCB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgei1pbmRleDogMTAwMDAwO1xuXG4gIGNvbG9yOiAjMjEyMTIxO1xuICBmb250LWZhbWlseTogc2Fucy1zZXJpZjtcblxuICBsZWZ0OiAwO1xuICB0b3A6IDA7XG4gIHdpZHRoOiAxMDB2dztcbiAgaGVpZ2h0OiAxMDB2aDtcblxuICBkaXNwbGF5OiBncmlkO1xuICBwbGFjZS1jb250ZW50OiBjZW50ZXI7XG59XG5cbi53YWxsZXQtcmVhZG9ubHktbW9kYWwgc2VsZWN0LCAud2FsbGV0LXJlYWRvbmx5LW1vZGFsIGlucHV0IHtcbiAgY29sb3I6ICMyMTIxMjE7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG59XG5cbi53YWxsZXQtcmVhZG9ubHktbW9kYWwgPiAud2FsbGV0LXJlYWRvbmx5LW1vZGFsLS1kaW0ge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHotaW5kZXg6IC0xO1xuXG4gIGxlZnQ6IDA7XG4gIHRvcDogMDtcbiAgd2lkdGg6IDEwMHZ3O1xuICBoZWlnaHQ6IDEwMHZoO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMyk7XG5cbiAgYW5pbWF0aW9uOiB3YWxsZXQtcmVhZG9ubHktbW9kYWwtLWRpbS1lbnRlciAwLjJzIGVhc2UtaW4tb3V0O1xufVxuXG4ud2FsbGV0LXJlYWRvbmx5LW1vZGFsID4gLndhbGxldC1yZWFkb25seS1tb2RhbC0tY29udGVudCB7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIFxuICBtYXgtd2lkdGg6IDY0MHB4O1xuICB3aWR0aDogMTAwdnc7XG5cbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDE4cHggM3B4IHJnYmEoMCwgMCwgMCwgMC40Myk7XG5cbiAgYW5pbWF0aW9uOiB3YWxsZXQtcmVhZG9ubHktbW9kYWwtLWNvbnRlbnQtZW50ZXIgMC4ycyBlYXNlLWluLW91dDtcblxuICBwYWRkaW5nOiA0MHB4O1xuICBcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiAyMHB4O1xufVxuXG4ud2FsbGV0LXJlYWRvbmx5LW1vZGFsID4gLndhbGxldC1yZWFkb25seS1tb2RhbC0tY29udGVudCBoMSB7XG4gIGZvbnQtc2l6ZTogMjBweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIFxuICBtYXJnaW46IDAgMCAxMnB4IDA7XG5cbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4ud2FsbGV0LXJlYWRvbmx5LW1vZGFsID4gLndhbGxldC1yZWFkb25seS1tb2RhbC0tY29udGVudCBsYWJlbCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuXG4gIGNvbG9yOiAjMjA0M2I1O1xuICBmb250LXNpemU6IDE0cHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG5cbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xufVxuXG4ud2FsbGV0LXJlYWRvbmx5LW1vZGFsID4gLndhbGxldC1yZWFkb25seS1tb2RhbC0tY29udGVudCAuc2VsZWN0LXdyYXBwZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi53YWxsZXQtcmVhZG9ubHktbW9kYWwgPiAud2FsbGV0LXJlYWRvbmx5LW1vZGFsLS1jb250ZW50IC5zZWxlY3Qtd3JhcHBlciBzdmcge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiAxMHB4O1xuICB0b3A6IDExcHg7XG4gIFxuICB3aWR0aDogMjBweDtcbiAgaGVpZ2h0OiAyMHB4O1xufVxuXG4ud2FsbGV0LXJlYWRvbmx5LW1vZGFsID4gLndhbGxldC1yZWFkb25seS1tb2RhbC0tY29udGVudCAuc2VsZWN0LXdyYXBwZXIgc3ZnIHBhdGgge1xuICBjb2xvcjogIzIxMjEyMTtcbn1cblxuLndhbGxldC1yZWFkb25seS1tb2RhbCA+IC53YWxsZXQtcmVhZG9ubHktbW9kYWwtLWNvbnRlbnQgLnNlbGVjdC13cmFwcGVyIHNlbGVjdCB7XG4gIG91dGxpbmU6IG5vbmU7XG4gIGFwcGVhcmFuY2U6IG5vbmU7XG5cbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogNDVweDtcblxuICBib3JkZXI6IDFweCBzb2xpZCAjY2ZkOGVhO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG5cbiAgcGFkZGluZzogMCAyNXB4IDAgMTVweDtcbn1cblxuLndhbGxldC1yZWFkb25seS1tb2RhbCA+IC53YWxsZXQtcmVhZG9ubHktbW9kYWwtLWNvbnRlbnQgLnNlbGVjdC13cmFwcGVyIHNlbGVjdDpmb2N1cyB7XG4gIGJvcmRlci1jb2xvcjogIzIwNDNiNTtcbn1cblxuLndhbGxldC1yZWFkb25seS1tb2RhbCA+IC53YWxsZXQtcmVhZG9ubHktbW9kYWwtLWNvbnRlbnQgaW5wdXQge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBvdXRsaW5lOiBub25lO1xuXG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDQ1cHg7XG5cbiAgYm9yZGVyOiAxcHggc29saWQgI2NmZDhlYTtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuXG4gIHBhZGRpbmc6IDAgMTVweDtcbn1cblxuLndhbGxldC1yZWFkb25seS1tb2RhbCA+IC53YWxsZXQtcmVhZG9ubHktbW9kYWwtLWNvbnRlbnQgaW5wdXQ6Zm9jdXMge1xuICBib3JkZXItY29sb3I6ICMyMDQzYjU7XG59XG5cbi53YWxsZXQtcmVhZG9ubHktbW9kYWwgPiAud2FsbGV0LXJlYWRvbmx5LW1vZGFsLS1jb250ZW50IGJ1dHRvbiB7XG4gIG1hcmdpbi10b3A6IDIwcHg7XG4gIFxuICBkaXNwbGF5OiBibG9jaztcbiAgXG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgb3V0bGluZTogbm9uZTtcbiAgYm9yZGVyOiAwO1xuICBcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogNDhweDtcbiAgYm9yZGVyLXJhZGl1czogMzBweDtcbiAgXG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIFxuICBjb2xvcjogI2ZmZmZmZjtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIwNDNiNTtcbn1cblxuLndhbGxldC1yZWFkb25seS1tb2RhbCA+IC53YWxsZXQtcmVhZG9ubHktbW9kYWwtLWNvbnRlbnQgYnV0dG9uOmRpc2FibGVkIHtcbiAgb3BhY2l0eTogMC40O1xufVxuXG5AbWVkaWEgKG1heC13aWR0aDogNDUwcHgpIHtcbiAgLndhbGxldC1yZWFkb25seS1tb2RhbCB7XG4gICAgcGxhY2UtY29udGVudDogZmxleC1lbmQ7XG4gIH1cbiAgXG4gIC53YWxsZXQtcmVhZG9ubHktbW9kYWwgPiAud2FsbGV0LXJlYWRvbmx5LW1vZGFsLS1jb250ZW50IHtcbiAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAwO1xuICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAwO1xuICAgIFxuICAgIHBhZGRpbmctYm90dG9tOiAxMDBweDtcbiAgICBcbiAgICBhbmltYXRpb246IHdhbGxldC1yZWFkb25seS1tb2RhbC0tY29udGVudC1zbGlkZSAwLjJzIGVhc2UtaW4tb3V0O1xuICB9XG59XG5gO1xuIl19