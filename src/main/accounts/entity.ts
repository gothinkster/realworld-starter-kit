import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import * as bcrypt from 'bcrypt'

@Entity({ name: 'Account' })
export class AccountEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  private id: number

  @Column({ unique: true })
  email: string

  @Column()
  private hashedPassword: string

  constructor(email: string, password: string) {
    super()
    this.email = email
    this.changePassword(password)
  }

  changeEmail(email: string) {
    if (email) {
      this.email = email
    }
  }

  changePassword(password: string) {
    if (password) {
      this.hashedPassword = bcrypt.hashSync(password, 10)
    }
  }

  passwordMatch(password: string): boolean {
    return bcrypt.compareSync(password, this.hashedPassword)
  }

  getSubject(): string {
    return this.id.toString()
  }
}
