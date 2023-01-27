import { of, switchMap } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { catchError, map } from 'rxjs/operators';
import { getDesktopBrowserType } from '../utils/browser-check';
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
export function getExtensions() {
    const currentBrowser = getDesktopBrowserType(navigator.userAgent);
    if (!currentBrowser) {
        return of([]);
    }
    return fromFetch('https://assets.terra.money/extensions.json').pipe(switchMap((res) => {
        if (res.ok) {
            return res.json();
        }
        else {
            return of(FALLBACK);
        }
    }), catchError(() => {
        return of(FALLBACK);
    }), map(({ whitelist }) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0RXh0ZW5zaW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9AdGVycmEtbW9uZXkvd2FsbGV0LWNvbnRyb2xsZXIvb3BlcmF0b3JzL2dldEV4dGVuc2lvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFjLEVBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDakQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUN2QyxPQUFPLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBYy9ELE1BQU0sUUFBUSxHQUFlO0lBQzNCLFNBQVMsRUFBRTtRQUNUO1lBQ0UsSUFBSSxFQUFFLGVBQWU7WUFDckIsVUFBVSxFQUFFLFNBQVM7WUFDckIsSUFBSSxFQUFFLDREQUE0RDtZQUNsRSxJQUFJLEVBQUU7Z0JBQ0o7b0JBQ0UsT0FBTyxFQUFFLFFBQVE7b0JBQ2pCLEdBQUcsRUFBRSwwRkFBMEY7aUJBQ2hHO2dCQUNEO29CQUNFLE9BQU8sRUFBRSxTQUFTO29CQUNsQixHQUFHLEVBQUUsc0VBQXNFO2lCQUM1RTthQUNGO1NBQ0Y7UUFDRDtZQUNFLElBQUksRUFBRSxjQUFjO1lBQ3BCLFVBQVUsRUFBRSxjQUFjO1lBQzFCLElBQUksRUFBRSxrRUFBa0U7WUFDeEUsSUFBSSxFQUFFO2dCQUNKO29CQUNFLE9BQU8sRUFBRSxRQUFRO29CQUNqQixHQUFHLEVBQUUseUZBQXlGO2lCQUMvRjthQUNGO1NBQ0Y7S0FDRjtDQUNGLENBQUM7QUFTRixNQUFNLFVBQVUsYUFBYTtJQUMzQixNQUFNLGNBQWMsR0FBRyxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFbEUsSUFBSSxDQUFDLGNBQWMsRUFBRTtRQUNuQixPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUNmO0lBRUQsT0FBTyxTQUFTLENBQUMsNENBQTRDLENBQUMsQ0FBQyxJQUFJLENBS2pFLFNBQVMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ2hCLElBQUksR0FBRyxDQUFDLEVBQUUsRUFBRTtZQUNWLE9BQU8sR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ25CO2FBQU07WUFDTCxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNyQjtJQUNILENBQUMsQ0FBQyxFQUNGLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0QixDQUFDLENBQUMsRUFDRixHQUFHLENBQUMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUU7UUFDcEIsT0FBTyxTQUFTO2FBQ2IsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FBQyxjQUFjLEtBQUssT0FBTyxDQUFDLENBQ3ZEO2FBQ0EsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQ3hDLE9BQU87Z0JBQ0wsSUFBSTtnQkFDSixVQUFVO2dCQUNWLElBQUk7Z0JBQ0osR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsQ0FBQyxjQUFjLEtBQUssT0FBTyxDQUFFLENBQUMsR0FBRzthQUNqRSxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FDSCxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIG9mLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZyb21GZXRjaCB9IGZyb20gJ3J4anMvZmV0Y2gnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgZ2V0RGVza3RvcEJyb3dzZXJUeXBlIH0gZnJvbSAnLi4vdXRpbHMvYnJvd3Nlci1jaGVjayc7XG5cbmludGVyZmFjZSBFeHRlbnNpb25zIHtcbiAgd2hpdGVsaXN0OiBBcnJheTx7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIGlkZW50aWZpZXI6IHN0cmluZztcbiAgICBpY29uOiBzdHJpbmc7XG4gICAgdXJsczogQXJyYXk8e1xuICAgICAgYnJvd3NlcjogJ2Nocm9tZScgfCAnZWRnZScgfCAnZmlyZWZveCcgfCAnc2FmYXJpJztcbiAgICAgIHVybDogc3RyaW5nO1xuICAgIH0+O1xuICB9Pjtcbn1cblxuY29uc3QgRkFMTEJBQ0s6IEV4dGVuc2lvbnMgPSB7XG4gIHdoaXRlbGlzdDogW1xuICAgIHtcbiAgICAgIG5hbWU6ICdUZXJyYSBTdGF0aW9uJyxcbiAgICAgIGlkZW50aWZpZXI6ICdzdGF0aW9uJyxcbiAgICAgIGljb246ICdodHRwczovL2Fzc2V0cy50ZXJyYS5tb25leS9pY29uL3N0YXRpb24tZXh0ZW5zaW9uL2ljb24ucG5nJyxcbiAgICAgIHVybHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIGJyb3dzZXI6ICdjaHJvbWUnLFxuICAgICAgICAgIHVybDogJ2h0dHBzOi8vY2hyb21lLmdvb2dsZS5jb20vd2Vic3RvcmUvZGV0YWlsL3RlcnJhLXN0YXRpb24vYWlpZmJuYmZvYnBtZWVraXBoZWVpamltZHBubHBncHAnLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgYnJvd3NlcjogJ2ZpcmVmb3gnLFxuICAgICAgICAgIHVybDogJ2h0dHBzOi8vYWRkb25zLm1vemlsbGEub3JnL2VuLVVTL2ZpcmVmb3gvYWRkb24vdGVycmEtc3RhdGlvbi13YWxsZXQvJyxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnWERFRkkgV2FsbGV0JyxcbiAgICAgIGlkZW50aWZpZXI6ICd4ZGVmaS13YWxsZXQnLFxuICAgICAgaWNvbjogJ2h0dHBzOi8veGRlZmktcHJvZC1jb21tb24tdWkuczMuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb20vbG9nby5zdmcnLFxuICAgICAgdXJsczogW1xuICAgICAgICB7XG4gICAgICAgICAgYnJvd3NlcjogJ2Nocm9tZScsXG4gICAgICAgICAgdXJsOiAnaHR0cHM6Ly9jaHJvbWUuZ29vZ2xlLmNvbS93ZWJzdG9yZS9kZXRhaWwveGRlZmktd2FsbGV0L2htZW9ibmZuZmNtZGtkY21sYmxnYWdtZnBmYm9pZWFmJyxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgXSxcbn07XG5cbmludGVyZmFjZSBJbnN0YWxsYWJsZUV4dGVuc2lvbiB7XG4gIG5hbWU6IHN0cmluZztcbiAgaWRlbnRpZmllcjogc3RyaW5nO1xuICBpY29uOiBzdHJpbmc7XG4gIHVybDogc3RyaW5nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RXh0ZW5zaW9ucygpOiBPYnNlcnZhYmxlPEluc3RhbGxhYmxlRXh0ZW5zaW9uW10+IHtcbiAgY29uc3QgY3VycmVudEJyb3dzZXIgPSBnZXREZXNrdG9wQnJvd3NlclR5cGUobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG5cbiAgaWYgKCFjdXJyZW50QnJvd3Nlcikge1xuICAgIHJldHVybiBvZihbXSk7XG4gIH1cblxuICByZXR1cm4gZnJvbUZldGNoKCdodHRwczovL2Fzc2V0cy50ZXJyYS5tb25leS9leHRlbnNpb25zLmpzb24nKS5waXBlPFxuICAgIEV4dGVuc2lvbnMsXG4gICAgRXh0ZW5zaW9ucyxcbiAgICBJbnN0YWxsYWJsZUV4dGVuc2lvbltdXG4gID4oXG4gICAgc3dpdGNoTWFwKChyZXMpID0+IHtcbiAgICAgIGlmIChyZXMub2spIHtcbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gb2YoRkFMTEJBQ0spO1xuICAgICAgfVxuICAgIH0pLFxuICAgIGNhdGNoRXJyb3IoKCkgPT4ge1xuICAgICAgcmV0dXJuIG9mKEZBTExCQUNLKTtcbiAgICB9KSxcbiAgICBtYXAoKHsgd2hpdGVsaXN0IH0pID0+IHtcbiAgICAgIHJldHVybiB3aGl0ZWxpc3RcbiAgICAgICAgLmZpbHRlcigoeyB1cmxzIH0pID0+XG4gICAgICAgICAgdXJscy5zb21lKCh7IGJyb3dzZXIgfSkgPT4gY3VycmVudEJyb3dzZXIgPT09IGJyb3dzZXIpLFxuICAgICAgICApXG4gICAgICAgIC5tYXAoKHsgbmFtZSwgaWRlbnRpZmllciwgaWNvbiwgdXJscyB9KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICBpZGVudGlmaWVyLFxuICAgICAgICAgICAgaWNvbixcbiAgICAgICAgICAgIHVybDogdXJscy5maW5kKCh7IGJyb3dzZXIgfSkgPT4gY3VycmVudEJyb3dzZXIgPT09IGJyb3dzZXIpIS51cmwsXG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfSksXG4gICk7XG59XG4iXX0=