// import { ExecutionContext, Injectable } from '@nestjs/common';
// import { AuthenticatedGuard } from './authenticated.guard';

// @Injectable()
// export class AdminGuard extends AuthenticatedGuard {
//   canActivate(context: ExecutionContext) {
//     const req = context.switchToHttp().getRequest();
//     return (
//       super.canActivate(context) && req.session.passport.user.role === 'admin'
//     );
//   }
// }
