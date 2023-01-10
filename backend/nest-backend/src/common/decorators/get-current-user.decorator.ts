import { JwtPayloadWithRt } from '../../auth/strategies/rt.strategy';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const GetCurrentUser = createParamDecorator(
  (data: keyof JwtPayloadWithRt | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();
    if (!data) return request.user as JwtPayloadWithRt;

    return request.user[data] as JwtPayloadWithRt;
  },
);
