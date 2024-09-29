import { HttpException } from '@nestjs/common';
import { Observable } from 'rxjs';

/**
 * Validate a microservice response.
 *
 * @param {Observable<T>} response - The respone from the microservice.
 * @param {HttpException} exception - The exception to thrown on undefined response.
 * @returns {Observable<T>} Validate response.
 */
export const validateMicroserviceResponse = async <T>(response: Observable<T>, exception: HttpException) => {
  await response.forEach((_response) => {
    if (!_response) throw exception;
  });

  return response;
};
