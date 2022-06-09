import { ApiResponseProperty } from '@nestjs/swagger'
import { IsString, MaxLength } from 'class-validator'
import { CommentEntity } from '../../persistence/comment.entity'
import { cloneProfileToOutput } from './profiles.dto'

export class CommentDTO {
  @IsString()
  @MaxLength(255)
  body: string
}

export class CommentResponseDTO extends CommentDTO {
  @ApiResponseProperty() id: number
  @ApiResponseProperty() updatedAt: Date
  @ApiResponseProperty() createdAt: Date
  @ApiResponseProperty() author
}

export function cloneCommentToOutput(
  comment: CommentEntity,
): CommentResponseDTO {
  return {
    id: comment.id,
    body: comment.body,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
    author: cloneProfileToOutput(comment.author),
  }
}
