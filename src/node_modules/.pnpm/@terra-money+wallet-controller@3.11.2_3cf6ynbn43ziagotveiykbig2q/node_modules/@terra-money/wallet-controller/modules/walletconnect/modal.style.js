// language=css
export const modalStyle = `

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuc3R5bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvQHRlcnJhLW1vbmV5L3dhbGxldC1jb250cm9sbGVyL21vZHVsZXMvd2FsbGV0Y29ubmVjdC9tb2RhbC5zdHlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxlQUFlO0FBQ2YsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBbUh6QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gbGFuZ3VhZ2U9Y3NzXG5leHBvcnQgY29uc3QgbW9kYWxTdHlsZSA9IGBcblxuQGtleWZyYW1lcyB3YWxsZXQtd2MtbW9kYWwtLWRpbS1lbnRlciB7XG4gIDAlIHtcbiAgICBvcGFjaXR5OiAwO1xuICB9XG4gIFxuICAxMDAlIHtcbiAgICBvcGFjaXR5OiAxO1xuICB9XG59XG5cbkBrZXlmcmFtZXMgd2FsbGV0LXdjLW1vZGFsLS1jb250ZW50LWVudGVyIHtcbiAgMCUge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjQpO1xuICB9XG4gIFxuICAxMDAlIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gIH1cbn1cblxuLndhbGxldC13Yy1tb2RhbCB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgei1pbmRleDogMTAwMDAwO1xuXG4gIGNvbG9yOiAjMjEyMTIxO1xuXG4gIGxlZnQ6IDA7XG4gIHRvcDogMDtcbiAgd2lkdGg6IDEwMHZ3O1xuICBoZWlnaHQ6IDEwMHZoO1xuXG4gIGRpc3BsYXk6IGdyaWQ7XG4gIHBsYWNlLWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuLndhbGxldC13Yy1tb2RhbCA+IC53YWxsZXQtd2MtbW9kYWwtLWRpbSB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgei1pbmRleDogLTE7XG5cbiAgbGVmdDogMDtcbiAgdG9wOiAwO1xuICB3aWR0aDogMTAwdnc7XG4gIGhlaWdodDogMTAwdmg7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zKTtcblxuICBhbmltYXRpb246IHdhbGxldC13Yy1tb2RhbC0tZGltLWVudGVyIDAuMnMgZWFzZS1pbi1vdXQ7XG59XG5cbi53YWxsZXQtd2MtbW9kYWwgPiAud2FsbGV0LXdjLW1vZGFsLS1jb250ZW50IHtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDE4cHggM3B4IHJnYmEoMCwgMCwgMCwgMC40Myk7XG4gIFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG5cbiAgYW5pbWF0aW9uOiB3YWxsZXQtd2MtbW9kYWwtLWNvbnRlbnQtZW50ZXIgMC4ycyBlYXNlLWluLW91dDtcbn1cblxuLndhbGxldC13Yy1tb2RhbCA+IC53YWxsZXQtd2MtbW9kYWwtLWNvbnRlbnQgaDEge1xuICBjb2xvcjogIzNiOTlmYztcbiAgXG4gIGZvbnQtc2l6ZTogMjBweDtcbiAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBcbiAgbWFyZ2luOiAwIDAgMTJweCAwO1xufVxuXG4ud2FsbGV0LXdjLW1vZGFsID4gLndhbGxldC13Yy1tb2RhbC0tY29udGVudCBwIHtcbiAgY29sb3I6ICMyMTIxMjE7XG4gIFxuICBmb250LXNpemU6IDE0cHg7XG4gIGZvbnQtZmFtaWx5OiBzYW5zLXNlcmlmO1xuICBcbiAgbWFyZ2luOiAwIDAgMzJweCAwO1xufVxuXG4ud2FsbGV0LXdjLW1vZGFsID4gLndhbGxldC13Yy1tb2RhbC0tY29udGVudCBidXR0b24ge1xuICBkaXNwbGF5OiBibG9jaztcbiAgXG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgb3V0bGluZTogbm9uZTtcbiAgYm9yZGVyOiAwO1xuICBcbiAgd2lkdGg6IDI5NXB4O1xuICBoZWlnaHQ6IDQ4cHg7XG4gIGJvcmRlci1yYWRpdXM6IDMwcHg7XG4gIFxuICBmb250LXNpemU6IDE0cHg7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBcbiAgY29sb3I6ICNmZmZmZmY7XG4gIGJhY2tncm91bmQtY29sb3I6ICMyMDQzYjU7XG59XG5cbi53YWxsZXQtd2MtbW9kYWwgPiAud2FsbGV0LXdjLW1vZGFsLS1jb250ZW50W2RhdGEtZGV2aWNlPVwiZGVza3RvcFwiXSB7XG4gIHBhZGRpbmc6IDQwcHggODBweDtcbn1cblxuLndhbGxldC13Yy1tb2RhbCA+IC53YWxsZXQtd2MtbW9kYWwtLWNvbnRlbnRbZGF0YS1kZXZpY2U9XCJtb2JpbGVcIl0ge1xuICBwYWRkaW5nOiA0MHB4IDIwcHg7XG59XG5cbi53YWxsZXQtd2MtbW9kYWwgPiAud2FsbGV0LXdjLW1vZGFsLS1jb250ZW50W2RhdGEtZGV2aWNlPVwibW9iaWxlXCJdIGgxIHtcbiAgbWFyZ2luLWJvdHRvbTogMzJweDtcbn1cblxuLndhbGxldC13Yy1tb2RhbCA+IC53YWxsZXQtd2MtbW9kYWwtLWNvbnRlbnRbZGF0YS1kZXZpY2U9XCJtb2JpbGVcIl0gcCB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5gO1xuIl19