import { ApiResponseProperty } from '@nestjs/swagger'
import { IsString, MaxLength } from 'class-validator'

export class CommentDTO {
  @IsString()
  @MaxLength(120)
  body: string
}

export class CommentResponseDTO extends CommentDTO {
  @ApiResponseProperty() id: number
  @ApiResponseProperty() updatedAt: Date
  @ApiResponseProperty() createdAt: Date
  @ApiResponseProperty() author
}

export class CommentResponsePayload {
  @ApiResponseProperty() comment: CommentResponseDTO
}

export class CommentsResponsePayload {
  @ApiResponseProperty() comments: CommentResponseDTO[]
}
