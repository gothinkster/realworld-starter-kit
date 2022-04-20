import * as bcrypt from 'bcrypt'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'Account' })
export class AccountEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  email: string

  @Column()
  private hashedPassword: string

  constructor(email: string, password: string) {
    super()
    this.email = email
    this.changePassword(password)
  }

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

  getAccountID(): number {
    return this.id
  }
}
