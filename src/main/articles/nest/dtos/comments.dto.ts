import { ApiResponseProperty } from '@nestjs/swagger'
import { IsString, MaxLength } from 'class-validator'
import { ProfileResponseDTO } from '../../../profiles/nest/profiles.dto'

export class CommentDTO {
  @IsString()
  @MaxLength(120)
  body: string
}

export class CommentResponseDTO extends CommentDTO {
  @ApiResponseProperty() id: number
  @ApiResponseProperty() updatedAt: Date
  @ApiResponseProperty() createdAt: Date
  @ApiResponseProperty() author: ProfileResponseDTO
}

export class CommentResponsePayload {
  @ApiResponseProperty() comment: CommentResponseDTO
}

export class CommentsResponsePayload {
  @ApiResponseProperty() comments: CommentResponseDTO[]
}
