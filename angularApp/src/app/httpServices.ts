import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class HttpServices {
    endpoint = 'http://localhost:3000/'

    constructor(private httpClient: HttpClient) {}

    private formatErrors(error: any) {
        return throwError(error.error);
    }


    checkLogin(userId: string){
        return this.httpClient.get(`${this.endpoint}login/${userId}`).pipe(
            map((response: any) => {
                return response;
            })
        )
    }
}