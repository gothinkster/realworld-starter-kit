import { IsString, MaxLength, ValidateNested } from 'class-validator'
import { ProfileResponseDTO } from '../../../profiles/nest/profiles.dto'

export class CommentDTO {
  @IsString()
  @MaxLength(120)
  body: string
}

export class CommentResponseDTO extends CommentDTO {
  id: number
  updatedAt: Date
  createdAt: Date
  author: ProfileResponseDTO
}

export class CommentResponsePayload {
  comment: CommentResponseDTO
}

export class CommentsResponsePayload {
  comments: CommentResponseDTO[]
}
