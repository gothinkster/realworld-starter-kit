import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger'
import {
  ApiModelProperty,
  ApiResponseModelProperty,
} from '@nestjs/swagger/dist/decorators/api-model-property.decorator'
import { Type } from 'class-transformer'
import { IsString, MaxLength, ValidateNested } from 'class-validator'
import { CommentEntity } from '../../persistence/comment.entity'
import { cloneProfileToOutput, ProfileResponseDTO } from './authors.dto'

export class CommentDTO {
  @ApiProperty({
    description: "The comment body. Exemple: 'I liked that article'",
    required: true,
    maxLength: 255,
  })
  @IsString()
  @MaxLength(255)
  body: string
}

export class CreateCommentBody {
  @ApiModelProperty({ type: CommentDTO, required: true })
  @ValidateNested()
  @Type(() => CommentDTO)
  comment: CommentDTO
}

export class CommentResponseDTO extends CommentDTO {
  @ApiResponseProperty()
  body: string
  @ApiResponseProperty()
  id: number
  @ApiResponseProperty()
  updatedAt: Date
  @ApiResponseProperty()
  createdAt: Date
  @ApiResponseModelProperty({ type: ProfileResponseDTO })
  author: ProfileResponseDTO
}

export class CommentResponseBody {
  @ApiResponseProperty({ type: CommentResponseDTO })
  comment: CommentResponseDTO
}
export class CommentsResponseBody {
  @ApiResponseProperty({ type: [CommentResponseDTO] })
  comments: CommentResponseDTO[]
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
