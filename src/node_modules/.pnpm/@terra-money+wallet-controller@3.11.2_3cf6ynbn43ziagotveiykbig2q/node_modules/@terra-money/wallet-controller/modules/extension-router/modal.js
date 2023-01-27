import { modalStyle } from './modal.style';
export function selectModal(extensionInfos) {
    return new Promise((resolve) => {
        var _a, _b;
        const modalContainer = document.createElement('div');
        const styleContainer = document.createElement('style');
        function onComplete(extensionInfo) {
            var _a, _b;
            resolve(extensionInfo);
            (_a = modalContainer.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(modalContainer);
            (_b = styleContainer.parentElement) === null || _b === void 0 ? void 0 : _b.removeChild(styleContainer);
        }
        const element = createModalElement({
            extensionInfos,
            onComplete,
        });
        styleContainer.textContent = modalStyle;
        modalContainer.appendChild(element);
        (_a = document.querySelector('head')) === null || _a === void 0 ? void 0 : _a.appendChild(styleContainer);
        (_b = document.querySelector('body')) === null || _b === void 0 ? void 0 : _b.appendChild(modalContainer);
    });
}
function createModalElement({ extensionInfos, onComplete, }) {
    // ---------------------------------------------
    // container
    // ---------------------------------------------
    const container = document.createElement('div');
    container.setAttribute('class', 'wallet-select-modal');
    // ---------------------------------------------
    // container > div.wallet-select-modal--dim
    // ---------------------------------------------
    const dim = document.createElement('div');
    dim.setAttribute('class', 'wallet-select-modal--dim');
    container.appendChild(dim);
    // ---------------------------------------------
    // content > div.wallet-select-modal--content
    // ---------------------------------------------
    const content = document.createElement('section');
    content.setAttribute('class', 'wallet-select-modal--content');
    container.appendChild(content);
    // h1
    const title = document.createElement('h1');
    title.textContent = 'Select a Wallet';
    content.appendChild(title);
    // ul
    const list = document.createElement('ul');
    content.appendChild(list);
    for (const extensionInfo of extensionInfos) {
        const item = document.createElement('li');
        const button = document.createElement('button');
        button.addEventListener('click', () => onComplete(extensionInfo));
        item.appendChild(button);
        const icon = document.createElement('span');
        icon.setAttribute('class', 'wallet-select-modal--icon');
        button.appendChild(icon);
        const iconImg = document.createElement('img');
        iconImg.setAttribute('src', extensionInfo.icon);
        iconImg.setAttribute('alt', `${extensionInfo.name} [${extensionInfo.identifier}]`);
        icon.appendChild(iconImg);
        const description = document.createElement('span');
        description.setAttribute('class', 'wallet-select-modal--description');
        description.textContent = extensionInfo.name;
        button.appendChild(description);
        const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        arrow.setAttribute('viewBox', '0 0 24 24');
        button.appendChild(arrow);
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z');
        arrow.appendChild(path);
        list.appendChild(item);
    }
    // events
    dim.addEventListener('click', () => onComplete(null));
    return container;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvQHRlcnJhLW1vbmV5L3dhbGxldC1jb250cm9sbGVyL21vZHVsZXMvZXh0ZW5zaW9uLXJvdXRlci9tb2RhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE1BQU0sVUFBVSxXQUFXLENBQ3pCLGNBQStCO0lBRS9CLE9BQU8sSUFBSSxPQUFPLENBQXVCLENBQUMsT0FBTyxFQUFFLEVBQUU7O1FBQ25ELE1BQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckQsTUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV2RCxTQUFTLFVBQVUsQ0FBQyxhQUFtQzs7WUFDckQsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3ZCLE1BQUEsY0FBYyxDQUFDLGFBQWEsMENBQUUsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzFELE1BQUEsY0FBYyxDQUFDLGFBQWEsMENBQUUsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzVELENBQUM7UUFFRCxNQUFNLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztZQUNqQyxjQUFjO1lBQ2QsVUFBVTtTQUNYLENBQUMsQ0FBQztRQUVILGNBQWMsQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1FBQ3hDLGNBQWMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFcEMsTUFBQSxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQywwQ0FBRSxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDNUQsTUFBQSxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQywwQ0FBRSxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDOUQsQ0FBQyxDQUFDLENBQUM7QUFDTCxD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QVcsQ0FBQyxDQUFDO1FBRTNDLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFMUIsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQyw0QkFBNEIsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM1RSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxnREFBZ0QsQ0FBQyxDQUFDO1FBRXpFLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFeEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN4QjtJQUVELFNBQVM7SUFDVCxHQUFHLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRXRELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFeHRlbnNpb25JbmZvIH0gZnJvbSAnLi9tdWx0aUNoYW5uZWwnO1xuaW1wb3J0IHsgbW9kYWxTdHlsZSB9IGZyb20gJy4vbW9kYWwuc3R5bGUnO1xuXG5leHBvcnQgZnVuY3Rpb24gc2VsZWN0TW9kYWwoXG4gIGV4dGVuc2lvbkluZm9zOiBFeHRlbnNpb25JbmZvW10sXG4pOiBQcm9taXNlPEV4dGVuc2lvbkluZm8gfCBudWxsPiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZTxFeHRlbnNpb25JbmZvIHwgbnVsbD4oKHJlc29sdmUpID0+IHtcbiAgICBjb25zdCBtb2RhbENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGNvbnN0IHN0eWxlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblxuICAgIGZ1bmN0aW9uIG9uQ29tcGxldGUoZXh0ZW5zaW9uSW5mbzogRXh0ZW5zaW9uSW5mbyB8IG51bGwpIHtcbiAgICAgIHJlc29sdmUoZXh0ZW5zaW9uSW5mbyk7XG4gICAgICBtb2RhbENvbnRhaW5lci5wYXJlbnRFbGVtZW50Py5yZW1vdmVDaGlsZChtb2RhbENvbnRhaW5lcik7XG4gICAgICBzdHlsZUNvbnRhaW5lci5wYXJlbnRFbGVtZW50Py5yZW1vdmVDaGlsZChzdHlsZUNvbnRhaW5lcik7XG4gICAgfVxuXG4gICAgY29uc3QgZWxlbWVudCA9IGNyZWF0ZU1vZGFsRWxlbWVudCh7XG4gICAgICBleHRlbnNpb25JbmZvcyxcbiAgICAgIG9uQ29tcGxldGUsXG4gICAgfSk7XG5cbiAgICBzdHlsZUNvbnRhaW5lci50ZXh0Q29udGVudCA9IG1vZGFsU3R5bGU7XG4gICAgbW9kYWxDb250YWluZXIuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkJyk/LmFwcGVuZENoaWxkKHN0eWxlQ29udGFpbmVyKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk/LmFwcGVuZENoaWxkKG1vZGFsQ29udGFpbmVyKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU1vZGFsRWxlbWVudCh7XG4gIGV4dGVuc2lvbkluZm9zLFxuICBvbkNvbXBsZXRlLFxufToge1xuICBleHRlbnNpb25JbmZvczogRXh0ZW5zaW9uSW5mb1tdO1xuICBvbkNvbXBsZXRlOiAoZXh0ZW5zaW9uSW5mbzogRXh0ZW5zaW9uSW5mbyB8IG51bGwpID0+IHZvaWQ7XG59KTogSFRNTEVsZW1lbnQge1xuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gY29udGFpbmVyXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29udGFpbmVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnd2FsbGV0LXNlbGVjdC1tb2RhbCcpO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBjb250YWluZXIgPiBkaXYud2FsbGV0LXNlbGVjdC1tb2RhbC0tZGltXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBjb25zdCBkaW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZGltLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnd2FsbGV0LXNlbGVjdC1tb2RhbC0tZGltJyk7XG5cbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRpbSk7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIGNvbnRlbnQgPiBkaXYud2FsbGV0LXNlbGVjdC1tb2RhbC0tY29udGVudFxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlY3Rpb24nKTtcbiAgY29udGVudC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3dhbGxldC1zZWxlY3QtbW9kYWwtLWNvbnRlbnQnKTtcblxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY29udGVudCk7XG5cbiAgLy8gaDFcbiAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICB0aXRsZS50ZXh0Q29udGVudCA9ICdTZWxlY3QgYSBXYWxsZXQnO1xuICBjb250ZW50LmFwcGVuZENoaWxkKHRpdGxlKTtcblxuICAvLyB1bFxuICBjb25zdCBsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgY29udGVudC5hcHBlbmRDaGlsZChsaXN0KTtcblxuICBmb3IgKGNvbnN0IGV4dGVuc2lvbkluZm8gb2YgZXh0ZW5zaW9uSW5mb3MpIHtcbiAgICBjb25zdCBpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcblxuICAgIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IG9uQ29tcGxldGUoZXh0ZW5zaW9uSW5mbykpO1xuXG4gICAgaXRlbS5hcHBlbmRDaGlsZChidXR0b24pO1xuXG4gICAgY29uc3QgaWNvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBpY29uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnd2FsbGV0LXNlbGVjdC1tb2RhbC0taWNvbicpO1xuXG4gICAgYnV0dG9uLmFwcGVuZENoaWxkKGljb24pO1xuXG4gICAgY29uc3QgaWNvbkltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIGljb25JbWcuc2V0QXR0cmlidXRlKCdzcmMnLCBleHRlbnNpb25JbmZvLmljb24pO1xuICAgIGljb25JbWcuc2V0QXR0cmlidXRlKFxuICAgICAgJ2FsdCcsXG4gICAgICBgJHtleHRlbnNpb25JbmZvLm5hbWV9IFske2V4dGVuc2lvbkluZm8uaWRlbnRpZmllcn1dYCxcbiAgICApO1xuXG4gICAgaWNvbi5hcHBlbmRDaGlsZChpY29uSW1nKTtcblxuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgIGRlc2NyaXB0aW9uLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnd2FsbGV0LXNlbGVjdC1tb2RhbC0tZGVzY3JpcHRpb24nKTtcbiAgICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGV4dGVuc2lvbkluZm8ubmFtZTtcblxuICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbik7XG5cbiAgICBjb25zdCBhcnJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAnc3ZnJyk7XG4gICAgYXJyb3cuc2V0QXR0cmlidXRlKCd2aWV3Qm94JywgJzAgMCAyNCAyNCcpO1xuXG4gICAgYnV0dG9uLmFwcGVuZENoaWxkKGFycm93KTtcblxuICAgIGNvbnN0IHBhdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ3BhdGgnKTtcbiAgICBwYXRoLnNldEF0dHJpYnV0ZSgnZCcsICdNMTAgNkw4LjU5IDcuNDEgMTMuMTcgMTJsLTQuNTggNC41OUwxMCAxOGw2LTZ6Jyk7XG5cbiAgICBhcnJvdy5hcHBlbmRDaGlsZChwYXRoKTtcblxuICAgIGxpc3QuYXBwZW5kQ2hpbGQoaXRlbSk7XG4gIH1cblxuICAvLyBldmVudHNcbiAgZGltLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gb25Db21wbGV0ZShudWxsKSk7XG5cbiAgcmV0dXJuIGNvbnRhaW5lcjtcbn1cbiJdfQ==