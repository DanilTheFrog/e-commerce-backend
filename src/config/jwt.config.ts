import { ConfigService } from '@nestjs/config'
import { JwtModuleOptions } from '@nestjs/jwt'

export const getJwtConfig = async (
    configServise: ConfigService
): Promise<JwtModuleOptions> => ({
    secret: configServise.get("JWT_SECRET")
})