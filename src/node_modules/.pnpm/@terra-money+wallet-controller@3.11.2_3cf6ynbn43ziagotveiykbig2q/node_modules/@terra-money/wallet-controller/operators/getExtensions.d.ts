import { Observable } from 'rxjs';
interface InstallableExtension {
    name: string;
    identifier: string;
    icon: string;
    url: string;
}
export declare function getExtensions(): Observable<InstallableExtension[]>;
export {};
