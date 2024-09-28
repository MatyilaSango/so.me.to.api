import { applyDecorators, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';

/**
 * Response serialisation to exclude named class properties
 */
export const ResponseSerialisation = applyDecorators(UseInterceptors(ClassSerializerInterceptor));
