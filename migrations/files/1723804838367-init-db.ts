import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDb1723804838367 implements MigrationInterface {
    name = 'InitDb1723804838367'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_profile" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(50) NOT NULL, "password" character varying NOT NULL, "address" character varying(100), "first_name" character varying(50), "last_name" character varying(50), "gender" "public"."user_profile_gender_enum" NOT NULL DEFAULT 'male', "place_of_birth" character varying(50), "date_of_birth" date, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e336cc51b61c40b1b1731308aa5" UNIQUE ("email"), CONSTRAINT "PK_eee360f3bff24af1b6890765201" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "user_premium" ("premium_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "premium_type" "public"."user_premium_premium_type_enum" NOT NULL, "expired_at" date, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fab23a50f66633d2b1f10483b76" PRIMARY KEY ("premium_id"))`);
        await queryRunner.query(`CREATE TABLE "user_like" ("like_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "user_id_liked" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4f821a1706778c2f9d5ceb15af6" PRIMARY KEY ("like_id"))`);
        await queryRunner.query(`CREATE TABLE "user_activity" ("activity_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "visited_user_id" uuid, "description" character varying(100), "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0a2f7b9040d150a51eba21ba923" PRIMARY KEY ("activity_id"))`);
        await queryRunner.query(`ALTER TABLE "user_premium" ADD CONSTRAINT "FK_d5e3338274543d0be19129ff8c4" FOREIGN KEY ("user_id") REFERENCES "user_profile"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_like" ADD CONSTRAINT "FK_89075277d45653005a9decaaad3" FOREIGN KEY ("user_id") REFERENCES "user_profile"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_like" ADD CONSTRAINT "FK_01c43b67cb6be611b8d55044d11" FOREIGN KEY ("user_id_liked") REFERENCES "user_profile"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_activity" ADD CONSTRAINT "FK_11108754ec780c670440e32baad" FOREIGN KEY ("user_id") REFERENCES "user_profile"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_activity" ADD CONSTRAINT "FK_6b88ed47fcc6d9dcb2012664b9a" FOREIGN KEY ("visited_user_id") REFERENCES "user_profile"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_activity" DROP CONSTRAINT "FK_6b88ed47fcc6d9dcb2012664b9a"`);
        await queryRunner.query(`ALTER TABLE "user_activity" DROP CONSTRAINT "FK_11108754ec780c670440e32baad"`);
        await queryRunner.query(`ALTER TABLE "user_like" DROP CONSTRAINT "FK_01c43b67cb6be611b8d55044d11"`);
        await queryRunner.query(`ALTER TABLE "user_like" DROP CONSTRAINT "FK_89075277d45653005a9decaaad3"`);
        await queryRunner.query(`ALTER TABLE "user_premium" DROP CONSTRAINT "FK_d5e3338274543d0be19129ff8c4"`);
        await queryRunner.query(`DROP TABLE "user_activity"`);
        await queryRunner.query(`DROP TABLE "user_like"`);
        await queryRunner.query(`DROP TABLE "user_premium"`);
        await queryRunner.query(`DROP TABLE "user_profile"`);
    }

}
