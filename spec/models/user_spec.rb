require 'rails_helper'

RSpec.describe User, type: :model do
  # 有効なファクトリを持つこと
  it "有効なファクトリを持つこと" do
    expect(FactoryBot.build(:user)).to be_valid
  end

  context '新規ユーザー登録ができる場合' do
    it "全ての項目の入力が存在すればユーザー登録できること" do
      user = FactoryBot.build(:user)
      expect(user).to be_valid
    end
  end
  
  context '新規ユーザー登録ができない場合' do
    it "名前が空の場合ユーザー登録できないこと" do
      user = FactoryBot.build(:user, username: nil)
      user.valid?
      expect(user.errors[:username]).to include("can't be blank")
    end

    it '名前が3文字未満だとユーザー登録できないこと' do
      user = FactoryBot.build(:user, username: 'ab')
      user.valid?
      expect(user.errors[:username]).to include('must be between 3 and 15 characters')
    end
  
    it '名前が16文字以上だとユーザー登録ができないこと' do
      user = FactoryBot.build(:user, username: 'a' * 16)
      user.valid?
      expect(user.errors[:username]).to include('must be between 3 and 15 characters')
    end
    
    it "メールアドレスが空の場合ユーザー登録できないこと" do
      user = FactoryBot.build(:user, email: nil)
      user.valid?
      expect(user.errors[:email]).to include("can't be blank")
    end

    it "メールアドレスが重複しているとユーザー登録できないこと" do
      FactoryBot.create(:user, email: "aaron@example.com")
      user = FactoryBot.build(:user, email: "aaron@example.com")
      user.valid?
      expect(user.errors[:email]).to include("has already been taken")
    end

        it "パスワードが空の場合ユーザー登録できないこと" do
          user = FactoryBot.build(:user, password: nil)
          user.valid?
          expect(user.errors[:password]).to include("can't be blank")
        end
    
        it "パスワードが6文字未満だとユーザー登録できないこと" do
          user = FactoryBot.build(:user, password: 'abc')
          user.valid?
          expect(user.errors[:password]).to include("is too short (minimum is 6 characters)")
        end

  end
end
