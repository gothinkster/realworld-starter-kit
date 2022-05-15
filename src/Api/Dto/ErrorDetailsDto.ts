export default interface ErrorDetailsDto {
    code: string;
    message: string;
    details?: string;
    statusCode?: number;
}
