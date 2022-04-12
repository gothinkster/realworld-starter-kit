import { IsString, MaxLength } from 'class-validator'
import { ProfileResponseDTO } from './profiles.dto'

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

export class CommentRequestPayload {
  comment: CommentDTO
}

export class CommentResponsePayload {
  comment: CommentResponseDTO
}

export class CommentsResponsePayload {
  comments: CommentResponseDTO[]
}
