import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();

    await super.logIn(request);
    return result;
  }
}
// @Injectable()
// export class LocalAuthGuard extends AuthGuard('local') {
//   async canActivate(context: ExecutionContext) {
//     const result = (await super.canActivate(context)) as boolean;
//     const request = context.switchToHttp().getRequest();

//     await super.logIn(request);
//     return result;
//   }
// }
