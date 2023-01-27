"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExtensions = void 0;
const rxjs_1 = require("rxjs");
const fetch_1 = require("rxjs/fetch");
const operators_1 = require("rxjs/operators");
const browser_check_1 = require("../utils/browser-check");
const FALLBACK = {
    whitelist: [
        {
            name: 'Terra Station',
            identifier: 'station',
            icon: 'https://assets.terra.money/icon/station-extension/icon.png',
            urls: [
                {
                    browser: 'chrome',
                    url: 'https://chrome.google.com/webstore/detail/terra-station/aiifbnbfobpmeekipheeijimdpnlpgpp',
                },
                {
                    browser: 'firefox',
                    url: 'https://addons.mozilla.org/en-US/firefox/addon/terra-station-wallet/',
                },
            ],
        },
        {
            name: 'XDEFI Wallet',
            identifier: 'xdefi-wallet',
            icon: 'https://xdefi-prod-common-ui.s3.eu-west-1.amazonaws.com/logo.svg',
            urls: [
                {
                    browser: 'chrome',
                    url: 'https://chrome.google.com/webstore/detail/xdefi-wallet/hmeobnfnfcmdkdcmlblgagmfpfboieaf',
                },
            ],
        },
    ],
};
function getExtensions() {
    const currentBrowser = (0, browser_check_1.getDesktopBrowserType)(navigator.userAgent);
    if (!currentBrowser) {
        return (0, rxjs_1.of)([]);
    }
    return (0, fetch_1.fromFetch)('https://assets.terra.money/extensions.json').pipe((0, rxjs_1.switchMap)((res) => {
        if (res.ok) {
            return res.json();
        }
        else {
            return (0, rxjs_1.of)(FALLBACK);
        }
    }), (0, operators_1.catchError)(() => {
        return (0, rxjs_1.of)(FALLBACK);
    }), (0, operators_1.map)(({ whitelist }) => {
        return whitelist
            .filter(({ urls }) => urls.some(({ browser }) => currentBrowser === browser))
            .map(({ name, identifier, icon, urls }) => {
            return {
                name,
                identifier,
                icon,
                url: urls.find(({ browser }) => currentBrowser === browser).url,
            };
        });
    }));
}
exports.getExtensions = getExtensions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0RXh0ZW5zaW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9AdGVycmEtbW9uZXkvd2FsbGV0LWNvbnRyb2xsZXIvb3BlcmF0b3JzL2dldEV4dGVuc2lvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBQWlEO0FBQ2pELHNDQUF1QztBQUN2Qyw4Q0FBaUQ7QUFDakQsMERBQStEO0FBYy9ELE1BQU0sUUFBUSxHQUFlO0lBQzNCLFNBQVMsRUFBRTtRQUNUO1lBQ0UsSUFBSSxFQUFFLGVBQWU7WUFDckIsVUFBVSxFQUFFLFNBQVM7WUFDckIsSUFBSSxFQUFFLDREQUE0RDtZQUNsRSxJQUFJLEVBQUU7Z0JBQ0o7b0JBQ0UsT0FBTyxFQUFFLFFBQVE7b0JBQ2pCLEdBQUcsRUFBRSwwRkFBMEY7aUJBQ2hHO2dCQUNEO29CQUNFLE9BQU8sRUFBRSxTQUFTO29CQUNsQixHQUFHLEVBQUUsc0VBQXNFO2lCQUM1RTthQUNGO1NBQ0Y7UUFDRDtZQUNFLElBQUksRUFBRSxjQUFjO1lBQ3BCLFVBQVUsRUFBRSxjQUFjO1lBQzFCLElBQUksRUFBRSxrRUFBa0U7WUFDeEUsSUFBSSxFQUFFO2dCQUNKO29CQUNFLE9BQU8sRUFBRSxRQUFRO29CQUNqQixHQUFHLEVBQUUseUZBQXlGO2lCQUMvRjthQUNGO1NBQ0Y7S0FDRjtDQUNGLENBQUM7QUFTRixTQUFnQixhQUFhO0lBQzNCLE1BQU0sY0FBYyxHQUFHLElBQUEscUNBQXFCLEVBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRWxFLElBQUksQ0FBQyxjQUFjLEVBQUU7UUFDbkIsT0FBTyxJQUFBLFNBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQztLQUNmO0lBRUQsT0FBTyxJQUFBLGlCQUFTLEVBQUMsNENBQTRDLENBQUMsQ0FBQyxJQUFJLENBS2pFLElBQUEsZ0JBQVMsRUFBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ2hCLElBQUksR0FBRyxDQUFDLEVBQUUsRUFBRTtZQUNWLE9BQU8sR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ25CO2FBQU07WUFDTCxPQUFPLElBQUEsU0FBRSxFQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3JCO0lBQ0gsQ0FBQyxDQUFDLEVBQ0YsSUFBQSxzQkFBVSxFQUFDLEdBQUcsRUFBRTtRQUNkLE9BQU8sSUFBQSxTQUFFLEVBQUMsUUFBUSxDQUFDLENBQUM7SUFDdEIsQ0FBQyxDQUFDLEVBQ0YsSUFBQSxlQUFHLEVBQUMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7UUFDcEIsT0FBTyxTQUFTO2FBQ2IsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FBQyxjQUFjLEtBQUssT0FBTyxDQUFDLENBQ3ZEO2FBQ0EsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQ3hDLE9BQU87Z0JBQ0wsSUFBSTtnQkFDSixVQUFVO2dCQUNWLElBQUk7Z0JBQ0osR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FBQyxjQUFjLEtBQUssT0FBTyxDQUFFLENBQUMsR0FBRzthQUNqRSxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FDSCxDQUFDO0FBQ0osQ0FBQztBQXJDRCxzQ0FxQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmcm9tRmV0Y2ggfSBmcm9tICdyeGpzL2ZldGNoJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IGdldERlc2t0b3BCcm93c2VyVHlwZSB9IGZyb20gJy4uL3V0aWxzL2Jyb3dzZXItY2hlY2snO1xuXG5pbnRlcmZhY2UgRXh0ZW5zaW9ucyB7XG4gIHdoaXRlbGlzdDogQXJyYXk8e1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBpZGVudGlmaWVyOiBzdHJpbmc7XG4gICAgaWNvbjogc3RyaW5nO1xuICAgIHVybHM6IEFycmF5PHtcbiAgICAgIGJyb3dzZXI6ICdjaHJvbWUnIHwgJ2VkZ2UnIHwgJ2ZpcmVmb3gnIHwgJ3NhZmFyaSc7XG4gICAgICB1cmw6IHN0cmluZztcbiAgICB9PjtcbiAgfT47XG59XG5cbmNvbnN0IEZBTExCQUNLOiBFeHRlbnNpb25zID0ge1xuICB3aGl0ZWxpc3Q6IFtcbiAgICB7XG4gICAgICBuYW1lOiAnVGVycmEgU3RhdGlvbicsXG4gICAgICBpZGVudGlmaWVyOiAnc3RhdGlvbicsXG4gICAgICBpY29uOiAnaHR0cHM6Ly9hc3NldHMudGVycmEubW9uZXkvaWNvbi9zdGF0aW9uLWV4dGVuc2lvbi9pY29uLnBuZycsXG4gICAgICB1cmxzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBicm93c2VyOiAnY2hyb21lJyxcbiAgICAgICAgICB1cmw6ICdodHRwczovL2Nocm9tZS5nb29nbGUuY29tL3dlYnN0b3JlL2RldGFpbC90ZXJyYS1zdGF0aW9uL2FpaWZibmJmb2JwbWVla2lwaGVlaWppbWRwbmxwZ3BwJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGJyb3dzZXI6ICdmaXJlZm94JyxcbiAgICAgICAgICB1cmw6ICdodHRwczovL2FkZG9ucy5tb3ppbGxhLm9yZy9lbi1VUy9maXJlZm94L2FkZG9uL3RlcnJhLXN0YXRpb24td2FsbGV0LycsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ1hERUZJIFdhbGxldCcsXG4gICAgICBpZGVudGlmaWVyOiAneGRlZmktd2FsbGV0JyxcbiAgICAgIGljb246ICdodHRwczovL3hkZWZpLXByb2QtY29tbW9uLXVpLnMzLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tL2xvZ28uc3ZnJyxcbiAgICAgIHVybHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGJyb3dzZXI6ICdjaHJvbWUnLFxuICAgICAgICAgIHVybDogJ2h0dHBzOi8vY2hyb21lLmdvb2dsZS5jb20vd2Vic3RvcmUvZGV0YWlsL3hkZWZpLXdhbGxldC9obWVvYm5mbmZjbWRrZGNtbGJsZ2FnbWZwZmJvaWVhZicsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gIF0sXG59O1xuXG5pbnRlcmZhY2UgSW5zdGFsbGFibGVFeHRlbnNpb24ge1xuICBuYW1lOiBzdHJpbmc7XG4gIGlkZW50aWZpZXI6IHN0cmluZztcbiAgaWNvbjogc3RyaW5nO1xuICB1cmw6IHN0cmluZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEV4dGVuc2lvbnMoKTogT2JzZXJ2YWJsZTxJbnN0YWxsYWJsZUV4dGVuc2lvbltdPiB7XG4gIGNvbnN0IGN1cnJlbnRCcm93c2VyID0gZ2V0RGVza3RvcEJyb3dzZXJUeXBlKG5hdmlnYXRvci51c2VyQWdlbnQpO1xuXG4gIGlmICghY3VycmVudEJyb3dzZXIpIHtcbiAgICByZXR1cm4gb2YoW10pO1xuICB9XG5cbiAgcmV0dXJuIGZyb21GZXRjaCgnaHR0cHM6Ly9hc3NldHMudGVycmEubW9uZXkvZXh0ZW5zaW9ucy5qc29uJykucGlwZTxcbiAgICBFeHRlbnNpb25zLFxuICAgIEV4dGVuc2lvbnMsXG4gICAgSW5zdGFsbGFibGVFeHRlbnNpb25bXVxuICA+KFxuICAgIHN3aXRjaE1hcCgocmVzKSA9PiB7XG4gICAgICBpZiAocmVzLm9rKSB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG9mKEZBTExCQUNLKTtcbiAgICAgIH1cbiAgICB9KSxcbiAgICBjYXRjaEVycm9yKCgpID0+IHtcbiAgICAgIHJldHVybiBvZihGQUxMQkFDSyk7XG4gICAgfSksXG4gICAgbWFwKCh7IHdoaXRlbGlzdCB9KSA9PiB7XG4gICAgICByZXR1cm4gd2hpdGVsaXN0XG4gICAgICAgIC5maWx0ZXIoKHsgdXJscyB9KSA9PlxuICAgICAgICAgIHVybHMuc29tZSgoeyBicm93c2VyIH0pID0+IGN1cnJlbnRCcm93c2VyID09PSBicm93c2VyKSxcbiAgICAgICAgKVxuICAgICAgICAubWFwKCh7IG5hbWUsIGlkZW50aWZpZXIsIGljb24sIHVybHMgfSkgPT4ge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgaWRlbnRpZmllcixcbiAgICAgICAgICAgIGljb24sXG4gICAgICAgICAgICB1cmw6IHVybHMuZmluZCgoeyBicm93c2VyIH0pID0+IGN1cnJlbnRCcm93c2VyID09PSBicm93c2VyKSEudXJsLFxuICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH0pLFxuICApO1xufVxuIl19