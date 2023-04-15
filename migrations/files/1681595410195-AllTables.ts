import { MigrationInterface, QueryRunner } from 'typeorm'

export class AllTables1681595410195 implements MigrationInterface {
  name = 'AllTables1681595410195'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`accounts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`hashed_password\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_ee66de6cdc53993296d1ceb8aa\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`authors\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`bio\` text NULL, \`image\` text NULL, \`account_id\` int NOT NULL, UNIQUE INDEX \`IDX_0abaae55952d5f8f9f6bfd8737\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`user_follows\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`follows_id\` int NOT NULL, UNIQUE INDEX \`IDX_23035240e9706a374d44cc7d43\` (\`user_id\`, \`follows_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`articles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`slug\` varchar(255) NOT NULL, \`title\` text NOT NULL, \`description\` text NULL, \`body\` text NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`published\` tinyint NOT NULL, \`author_id\` int NOT NULL, UNIQUE INDEX \`IDX_1123ff6815c5b8fec0ba9fec37\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`tags\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_d90243459a697eadb8ad56e909\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`articles_have_tags\` (\`id\` int NOT NULL AUTO_INCREMENT, \`tag_id\` int NOT NULL, \`article_id\` int NOT NULL, UNIQUE INDEX \`IDX_536438d8f0f121fd561a0929a5\` (\`tag_id\`, \`article_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
    await queryRunner.query(
      `CREATE TABLE \`comments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`body\` text NOT NULL, \`author_id\` int NOT NULL, \`article_id\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`comments\``)
    await queryRunner.query(
      `DROP INDEX \`IDX_536438d8f0f121fd561a0929a5\` ON \`articles_have_tags\``,
    )
    await queryRunner.query(`DROP TABLE \`articles_have_tags\``)
    await queryRunner.query(
      `DROP INDEX \`IDX_d90243459a697eadb8ad56e909\` ON \`tags\``,
    )
    await queryRunner.query(`DROP TABLE \`tags\``)
    await queryRunner.query(
      `DROP INDEX \`IDX_1123ff6815c5b8fec0ba9fec37\` ON \`articles\``,
    )
    await queryRunner.query(`DROP TABLE \`articles\``)
    await queryRunner.query(
      `DROP INDEX \`IDX_23035240e9706a374d44cc7d43\` ON \`user_follows\``,
    )
    await queryRunner.query(`DROP TABLE \`user_follows\``)
    await queryRunner.query(
      `DROP INDEX \`IDX_0abaae55952d5f8f9f6bfd8737\` ON \`authors\``,
    )
    await queryRunner.query(`DROP TABLE \`authors\``)
    await queryRunner.query(
      `DROP INDEX \`IDX_ee66de6cdc53993296d1ceb8aa\` ON \`accounts\``,
    )
    await queryRunner.query(`DROP TABLE \`accounts\``)
  }
}
