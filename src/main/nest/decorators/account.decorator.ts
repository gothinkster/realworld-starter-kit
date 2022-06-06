import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const InjectAccount = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest().user
  },
)
