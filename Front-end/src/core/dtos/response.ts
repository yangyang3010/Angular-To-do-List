export class ResponseDto<T> {
  message? : string[] = [];
  status!: number;
  result!: T;
}
