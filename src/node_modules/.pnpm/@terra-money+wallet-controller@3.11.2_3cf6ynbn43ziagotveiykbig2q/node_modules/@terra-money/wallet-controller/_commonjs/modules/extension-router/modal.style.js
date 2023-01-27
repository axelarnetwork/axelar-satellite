"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modalStyle = void 0;
// language=css
exports.modalStyle = `
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuc3R5bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvQHRlcnJhLW1vbmV5L3dhbGxldC1jb250cm9sbGVyL21vZHVsZXMvZXh0ZW5zaW9uLXJvdXRlci9tb2RhbC5zdHlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxlQUFlO0FBQ0YsUUFBQSxVQUFVLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBMkp6QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gbGFuZ3VhZ2U9Y3NzXG5leHBvcnQgY29uc3QgbW9kYWxTdHlsZSA9IGBcbkBrZXlmcmFtZXMgd2FsbGV0LXNlbGVjdC1tb2RhbC0tZGltLWVudGVyIHtcbiAgMCUge1xuICAgIG9wYWNpdHk6IDA7XG4gIH1cbiAgXG4gIDEwMCUge1xuICAgIG9wYWNpdHk6IDE7XG4gIH1cbn1cblxuQGtleWZyYW1lcyB3YWxsZXQtc2VsZWN0LW1vZGFsLS1jb250ZW50LWVudGVyIHtcbiAgMCUge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjQpO1xuICB9XG4gIFxuICAxMDAlIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gIH1cbn1cblxuLndhbGxldC1zZWxlY3QtbW9kYWwge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHotaW5kZXg6IDEwMDAwMDtcbiAgXG4gIGNvbG9yOiAjMjEyMTIxO1xuICBcbiAgbGVmdDogMDtcbiAgdG9wOiAwO1xuICB3aWR0aDogMTAwdnc7XG4gIGhlaWdodDogMTAwdmg7XG4gIFxuICBmb250LWZhbWlseTogc2Fucy1zZXJpZjtcbiAgXG4gIGRpc3BsYXk6IGdyaWQ7XG4gIHBsYWNlLWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuLndhbGxldC1zZWxlY3QtbW9kYWwgPiAud2FsbGV0LXNlbGVjdC1tb2RhbC0tZGltIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB6LWluZGV4OiAtMTtcbiAgXG4gIGxlZnQ6IDA7XG4gIHRvcDogMDtcbiAgd2lkdGg6IDEwMHZ3O1xuICBoZWlnaHQ6IDEwMHZoO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMyk7XG4gIFxuICBhbmltYXRpb246IHdhbGxldC1zZWxlY3QtbW9kYWwtLWRpbS1lbnRlciAwLjJzIGVhc2UtaW4tb3V0O1xufVxuXG4ud2FsbGV0LXNlbGVjdC1tb2RhbCA+IC53YWxsZXQtc2VsZWN0LW1vZGFsLS1jb250ZW50IHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgXG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDE4cHggM3B4IHJnYmEoMCwgMCwgMCwgMC40Myk7XG4gIFxuICBhbmltYXRpb246IHdhbGxldC1zZWxlY3QtbW9kYWwtLWNvbnRlbnQtZW50ZXIgMC4ycyBlYXNlLWluLW91dDtcbiAgXG4gIHdpZHRoOiAxMDB2dztcbiAgbWF4LXdpZHRoOiA0ODBweDtcbiAgcGFkZGluZzogNDBweDtcbn1cblxuLndhbGxldC1zZWxlY3QtbW9kYWwgPiAud2FsbGV0LXNlbGVjdC1tb2RhbC0tY29udGVudCBoMSB7XG4gIGZvbnQtc2l6ZTogMjBweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIFxuICBtYXJnaW46IDAgMCAzMnB4IDA7XG4gIFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi53YWxsZXQtc2VsZWN0LW1vZGFsID4gLndhbGxldC1zZWxlY3QtbW9kYWwtLWNvbnRlbnQgdWwge1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW46IDA7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG4gIFxuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuXG4ud2FsbGV0LXNlbGVjdC1tb2RhbCA+IC53YWxsZXQtc2VsZWN0LW1vZGFsLS1jb250ZW50IHVsIGxpIHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNjZmQ4ZWE7XG59XG5cbi53YWxsZXQtc2VsZWN0LW1vZGFsID4gLndhbGxldC1zZWxlY3QtbW9kYWwtLWNvbnRlbnQgdWwgbGk6bGFzdC1jaGlsZCB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjY2ZkOGVhO1xufVxuXG4ud2FsbGV0LXNlbGVjdC1tb2RhbCA+IC53YWxsZXQtc2VsZWN0LW1vZGFsLS1jb250ZW50IHVsIGJ1dHRvbiB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDY2cHg7XG4gIFxuICBib3JkZXI6IG5vbmU7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICBvdXRsaW5lOiBub25lO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIFxuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDEwcHg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi53YWxsZXQtc2VsZWN0LW1vZGFsID4gLndhbGxldC1zZWxlY3QtbW9kYWwtLWNvbnRlbnQgdWwgYnV0dG9uOmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogaHNsKDIyMCwgMzklLCA4NiUsIDAuMjUpO1xufVxuXG4ud2FsbGV0LXNlbGVjdC1tb2RhbCA+IC53YWxsZXQtc2VsZWN0LW1vZGFsLS1jb250ZW50IHVsIGJ1dHRvbiAud2FsbGV0LXNlbGVjdC1tb2RhbC0taWNvbiB7XG4gIGRpc3BsYXk6IGlubGluZS1ncmlkO1xuICB3aWR0aDogNTBweDtcbiAgaGVpZ2h0OiA1MHB4O1xuICBcbiAgcGxhY2UtY29udGVudDogY2VudGVyO1xufVxuXG4ud2FsbGV0LXNlbGVjdC1tb2RhbCA+IC53YWxsZXQtc2VsZWN0LW1vZGFsLS1jb250ZW50IHVsIGJ1dHRvbiAud2FsbGV0LXNlbGVjdC1tb2RhbC0taWNvbiBpbWcge1xuICB3aWR0aDogMzBweDtcbiAgaGVpZ2h0OiAzMHB4O1xufVxuXG4ud2FsbGV0LXNlbGVjdC1tb2RhbCA+IC53YWxsZXQtc2VsZWN0LW1vZGFsLS1jb250ZW50IHVsIGJ1dHRvbiAud2FsbGV0LXNlbGVjdC1tb2RhbC0tZGVzY3JpcHRpb24ge1xuICBmbGV4OiAxO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBcbiAgZm9udC1zaXplOiAxNnB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogIzIxMjEyMTtcbn1cblxuLndhbGxldC1zZWxlY3QtbW9kYWwgPiAud2FsbGV0LXNlbGVjdC1tb2RhbC0tY29udGVudCB1bCBidXR0b24gc3ZnIHtcbiAgd2lkdGg6IDE4cHg7XG4gIGhlaWdodDogMThweDtcbiAgXG4gIGZpbGw6ICNjZmQ4ZWE7XG59XG5cbi53YWxsZXQtc2VsZWN0LW1vZGFsID4gLndhbGxldC1zZWxlY3QtbW9kYWwtLWNvbnRlbnQgdWwgYnV0dG9uOmhvdmVyIHN2ZyB7XG4gIGZpbGw6ICMyMDQzYjU7XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiA0NTBweCkge1xuICAud2FsbGV0LXNlbGVjdC1tb2RhbCB7XG4gICAgcGxhY2UtY29udGVudDogZmxleC1lbmQ7XG4gIH1cbiAgXG4gIC53YWxsZXQtc2VsZWN0LW1vZGFsID4gLndhbGxldC1zZWxlY3QtbW9kYWwtLWNvbnRlbnQge1xuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDA7XG4gICAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDA7XG4gIH1cbn1cbmA7XG4iXX0=