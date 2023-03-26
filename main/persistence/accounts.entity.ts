import * as bcrypt from 'bcrypt'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'accounts' })
export class AccountEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  email: string

  @Column()
  private hashedPassword: string

  changeEmail(email: string): this {
    this.email = email ?? this.email
    return this
  }

  changePassword(password: string): this {
    if (password) {
      this.hashedPassword = bcrypt.hashSync(password, 10)
    }
    return this
  }

  passwordMatch(password: string): boolean {
    return bcrypt.compareSync(password, this.hashedPassword)
  }
}
