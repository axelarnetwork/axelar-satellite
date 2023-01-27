// language=css
export const modalStyle = `
@keyframes wallet-select-modal--dim-enter {
  0% {
    opacity: 0;
  }
  
  100% {
    opacity: 1;
  }
}

@keyframes wallet-select-modal--content-enter {
  0% {
    opacity: 0;
    transform: scale(0.4);
  }
  
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.wallet-select-modal {
  position: fixed;
  z-index: 100000;
  
  color: #212121;
  
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  
  font-family: sans-serif;
  
  display: grid;
  place-content: center;
}

.wallet-select-modal > .wallet-select-modal--dim {
  position: fixed;
  z-index: -1;
  
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  
  animation: wallet-select-modal--dim-enter 0.2s ease-in-out;
}

.wallet-select-modal > .wallet-select-modal--content {
  box-sizing: border-box;
  
  border-radius: 8px;
  
  background-color: #ffffff;
  box-shadow: 0 4px 18px 3px rgba(0, 0, 0, 0.43);
  
  animation: wallet-select-modal--content-enter 0.2s ease-in-out;
  
  width: 100vw;
  max-width: 480px;
  padding: 40px;
}

.wallet-select-modal > .wallet-select-modal--content h1 {
  font-size: 20px;
  font-weight: bold;
  
  margin: 0 0 32px 0;
  
  text-align: center;
}

.wallet-select-modal > .wallet-select-modal--content ul {
  padding: 0;
  margin: 0;
  list-style: none;
  
  display: flex;
  flex-direction: column;
}

.wallet-select-modal > .wallet-select-modal--content ul li {
  border-top: 1px solid #cfd8ea;
}

.wallet-select-modal > .wallet-select-modal--content ul li:last-child {
  border-bottom: 1px solid #cfd8ea;
}

.wallet-select-modal > .wallet-select-modal--content ul button {
  width: 100%;
  height: 66px;
  
  border: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  
  display: flex;
  gap: 10px;
  align-items: center;
}

.wallet-select-modal > .wallet-select-modal--content ul button:hover {
  background-color: hsl(220, 39%, 86%, 0.25);
}

.wallet-select-modal > .wallet-select-modal--content ul button .wallet-select-modal--icon {
  display: inline-grid;
  width: 50px;
  height: 50px;
  
  place-content: center;
}

.wallet-select-modal > .wallet-select-modal--content ul button .wallet-select-modal--icon img {
  width: 30px;
  height: 30px;
}

.wallet-select-modal > .wallet-select-modal--content ul button .wallet-select-modal--description {
  flex: 1;
  text-align: left;
  
  font-size: 16px;
  font-weight: 600;
  color: #212121;
}

.wallet-select-modal > .wallet-select-modal--content ul button svg {
  width: 18px;
  height: 18px;
  
  fill: #cfd8ea;
}

.wallet-select-modal > .wallet-select-modal--content ul button:hover svg {
  fill: #2043b5;
}

@media (max-width: 450px) {
  .wallet-select-modal {
    place-content: flex-end;
  }
  
  .wallet-select-modal > .wallet-select-modal--content {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuc3R5bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvQHRlcnJhLW1vbmV5L3dhbGxldC1jb250cm9sbGVyL21vZHVsZXMvZXh0ZW5zaW9uLXJvdXRlci9tb2RhbC5zdHlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxlQUFlO0FBQ2YsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQTJKekIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGxhbmd1YWdlPWNzc1xuZXhwb3J0IGNvbnN0IG1vZGFsU3R5bGUgPSBgXG5Aa2V5ZnJhbWVzIHdhbGxldC1zZWxlY3QtbW9kYWwtLWRpbS1lbnRlciB7XG4gIDAlIHtcbiAgICBvcGFjaXR5OiAwO1xuICB9XG4gIFxuICAxMDAlIHtcbiAgICBvcGFjaXR5OiAxO1xuICB9XG59XG5cbkBrZXlmcmFtZXMgd2FsbGV0LXNlbGVjdC1tb2RhbC0tY29udGVudC1lbnRlciB7XG4gIDAlIHtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMC40KTtcbiAgfVxuICBcbiAgMTAwJSB7XG4gICAgb3BhY2l0eTogMTtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICB9XG59XG5cbi53YWxsZXQtc2VsZWN0LW1vZGFsIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB6LWluZGV4OiAxMDAwMDA7XG4gIFxuICBjb2xvcjogIzIxMjEyMTtcbiAgXG4gIGxlZnQ6IDA7XG4gIHRvcDogMDtcbiAgd2lkdGg6IDEwMHZ3O1xuICBoZWlnaHQ6IDEwMHZoO1xuICBcbiAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XG4gIFxuICBkaXNwbGF5OiBncmlkO1xuICBwbGFjZS1jb250ZW50OiBjZW50ZXI7XG59XG5cbi53YWxsZXQtc2VsZWN0LW1vZGFsID4gLndhbGxldC1zZWxlY3QtbW9kYWwtLWRpbSB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgei1pbmRleDogLTE7XG4gIFxuICBsZWZ0OiAwO1xuICB0b3A6IDA7XG4gIHdpZHRoOiAxMDB2dztcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjMpO1xuICBcbiAgYW5pbWF0aW9uOiB3YWxsZXQtc2VsZWN0LW1vZGFsLS1kaW0tZW50ZXIgMC4ycyBlYXNlLWluLW91dDtcbn1cblxuLndhbGxldC1zZWxlY3QtbW9kYWwgPiAud2FsbGV0LXNlbGVjdC1tb2RhbC0tY29udGVudCB7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIFxuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICBib3gtc2hhZG93OiAwIDRweCAxOHB4IDNweCByZ2JhKDAsIDAsIDAsIDAuNDMpO1xuICBcbiAgYW5pbWF0aW9uOiB3YWxsZXQtc2VsZWN0LW1vZGFsLS1jb250ZW50LWVudGVyIDAuMnMgZWFzZS1pbi1vdXQ7XG4gIFxuICB3aWR0aDogMTAwdnc7XG4gIG1heC13aWR0aDogNDgwcHg7XG4gIHBhZGRpbmc6IDQwcHg7XG59XG5cbi53YWxsZXQtc2VsZWN0LW1vZGFsID4gLndhbGxldC1zZWxlY3QtbW9kYWwtLWNvbnRlbnQgaDEge1xuICBmb250LXNpemU6IDIwcHg7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBcbiAgbWFyZ2luOiAwIDAgMzJweCAwO1xuICBcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4ud2FsbGV0LXNlbGVjdC1tb2RhbCA+IC53YWxsZXQtc2VsZWN0LW1vZGFsLS1jb250ZW50IHVsIHtcbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luOiAwO1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cblxuLndhbGxldC1zZWxlY3QtbW9kYWwgPiAud2FsbGV0LXNlbGVjdC1tb2RhbC0tY29udGVudCB1bCBsaSB7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjY2ZkOGVhO1xufVxuXG4ud2FsbGV0LXNlbGVjdC1tb2RhbCA+IC53YWxsZXQtc2VsZWN0LW1vZGFsLS1jb250ZW50IHVsIGxpOmxhc3QtY2hpbGQge1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2NmZDhlYTtcbn1cblxuLndhbGxldC1zZWxlY3QtbW9kYWwgPiAud2FsbGV0LXNlbGVjdC1tb2RhbC0tY29udGVudCB1bCBidXR0b24ge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiA2NnB4O1xuICBcbiAgYm9yZGVyOiBub25lO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgb3V0bGluZTogbm9uZTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiAxMHB4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4ud2FsbGV0LXNlbGVjdC1tb2RhbCA+IC53YWxsZXQtc2VsZWN0LW1vZGFsLS1jb250ZW50IHVsIGJ1dHRvbjpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6IGhzbCgyMjAsIDM5JSwgODYlLCAwLjI1KTtcbn1cblxuLndhbGxldC1zZWxlY3QtbW9kYWwgPiAud2FsbGV0LXNlbGVjdC1tb2RhbC0tY29udGVudCB1bCBidXR0b24gLndhbGxldC1zZWxlY3QtbW9kYWwtLWljb24ge1xuICBkaXNwbGF5OiBpbmxpbmUtZ3JpZDtcbiAgd2lkdGg6IDUwcHg7XG4gIGhlaWdodDogNTBweDtcbiAgXG4gIHBsYWNlLWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuLndhbGxldC1zZWxlY3QtbW9kYWwgPiAud2FsbGV0LXNlbGVjdC1tb2RhbC0tY29udGVudCB1bCBidXR0b24gLndhbGxldC1zZWxlY3QtbW9kYWwtLWljb24gaW1nIHtcbiAgd2lkdGg6IDMwcHg7XG4gIGhlaWdodDogMzBweDtcbn1cblxuLndhbGxldC1zZWxlY3QtbW9kYWwgPiAud2FsbGV0LXNlbGVjdC1tb2RhbC0tY29udGVudCB1bCBidXR0b24gLndhbGxldC1zZWxlY3QtbW9kYWwtLWRlc2NyaXB0aW9uIHtcbiAgZmxleDogMTtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgXG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6ICMyMTIxMjE7XG59XG5cbi53YWxsZXQtc2VsZWN0LW1vZGFsID4gLndhbGxldC1zZWxlY3QtbW9kYWwtLWNvbnRlbnQgdWwgYnV0dG9uIHN2ZyB7XG4gIHdpZHRoOiAxOHB4O1xuICBoZWlnaHQ6IDE4cHg7XG4gIFxuICBmaWxsOiAjY2ZkOGVhO1xufVxuXG4ud2FsbGV0LXNlbGVjdC1tb2RhbCA+IC53YWxsZXQtc2VsZWN0LW1vZGFsLS1jb250ZW50IHVsIGJ1dHRvbjpob3ZlciBzdmcge1xuICBmaWxsOiAjMjA0M2I1O1xufVxuXG5AbWVkaWEgKG1heC13aWR0aDogNDUwcHgpIHtcbiAgLndhbGxldC1zZWxlY3QtbW9kYWwge1xuICAgIHBsYWNlLWNvbnRlbnQ6IGZsZXgtZW5kO1xuICB9XG4gIFxuICAud2FsbGV0LXNlbGVjdC1tb2RhbCA+IC53YWxsZXQtc2VsZWN0LW1vZGFsLS1jb250ZW50IHtcbiAgICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAwO1xuICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiAwO1xuICB9XG59XG5gO1xuIl19