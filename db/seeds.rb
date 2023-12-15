# ユーザーの作成
5.times do |i|
  user = User.create(
    # ユーザーモデルに適した属性を設定
    # 例:
    email: "user#{i + 1}@example.com",
    password: "password",
    username: "user#{i + 1}"
    # 他の必要な属性があればここに追加
  )

  # 各ユーザーに記事を作成して関連付ける
  3.times do |j|
    Article.create(
      title: "ユーザー#{i + 1}の記事 #{j + 1}",
      description: "これはユーザー#{i + 1}による記事の説明 #{j + 1}",
      body: "これはユーザー#{i + 1}による記事の本文です。記事番号は #{j + 1} です。",
      user_id: user.id
    )
  end
end
