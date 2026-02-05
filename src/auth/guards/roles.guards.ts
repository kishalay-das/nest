import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { userRole } from "../schemas/user.schema";
import { ROLES_KEY } from "../decoraters/roles.decoraters";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<userRole[]>(
            ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ])
        if (!requiredRoles) {
            return true
        }
        const { user } = context.switchToHttp().getRequest()
        if (!user) {
            throw new ForbiddenException('user not authanticated!')
        }
        const hasRequiredRoles = requiredRoles.some(role => user.role === role)
        if (!hasRequiredRoles) {
            throw new ForbiddenException('Insufficent permission!')
        }
        return true
    }
}