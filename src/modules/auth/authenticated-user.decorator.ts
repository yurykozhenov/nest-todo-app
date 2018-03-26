import { createRouteParamDecorator } from '@nestjs/common';

// tslint:disable-next-line:variable-name
export const AuthenticatedUser = createRouteParamDecorator((data, req) => req.user);
